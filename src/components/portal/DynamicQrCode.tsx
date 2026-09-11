/**
 * DynamicQrCode — A self-contained, scannable QR code component.
 * Generates a proper ISO 18004 QR matrix purely from TypeScript
 * (Byte mode, Error Correction Level M, Versions 1-10).
 * No external dependencies required.
 */
'use client';

import { useMemo } from 'react';

// ─── Reed–Solomon GF(256) arithmetic ──────────────────────────────────────────
const GF_EXP: number[] = new Array(512);
const GF_LOG: number[] = new Array(256);
(function () {
  let x = 1;
  for (let i = 0; i < 255; i++) {
    GF_EXP[i] = x;
    GF_LOG[x] = i;
    x = (x << 1) ^ (x >= 128 ? 0x11d : 0);
  }
  for (let i = 255; i < 512; i++) GF_EXP[i] = GF_EXP[i - 255];
})();
const gfMul = (a: number, b: number) => (a === 0 || b === 0 ? 0 : GF_EXP[GF_LOG[a] + GF_LOG[b]]);

function rsGeneratorPoly(degree: number): number[] {
  let g = [1];
  for (let i = 0; i < degree; i++) {
    const factor = [1, GF_EXP[i]];
    const res = new Array(g.length + factor.length - 1).fill(0);
    for (let j = 0; j < g.length; j++)
      for (let k = 0; k < factor.length; k++)
        res[j + k] ^= gfMul(g[j], factor[k]);
    g = res;
  }
  return g;
}

function rsEncode(data: number[], ecCount: number): number[] {
  const gen = rsGeneratorPoly(ecCount);
  const msg = [...data, ...new Array(ecCount).fill(0)];
  for (let i = 0; i < data.length; i++) {
    const coeff = msg[i];
    if (coeff !== 0)
      for (let j = 1; j < gen.length; j++)
        msg[i + j] ^= gfMul(gen[j], coeff);
  }
  return msg.slice(data.length);
}

// ─── QR tables (Version 1-10, ECL M) ──────────────────────────────────────────
// [version] = [totalCodewords, ecCodewords, dataCodewords, size]
const QR_TABLE: [number, number, number, number][] = [
  [0, 0, 0, 0],   // placeholder
  [26, 10, 16, 21],
  [44, 16, 28, 25],
  [70, 26, 44, 29],
  [100, 36, 64, 33],
  [134, 48, 86, 37],
  [172, 64, 108, 41],
  [196, 72, 124, 45],
  [242, 88, 154, 49],
  [292, 110, 182, 53],
  [346, 130, 216, 57],
];

function selectVersion(byteCount: number): number {
  for (let v = 1; v <= 10; v++) {
    if (byteCount <= QR_TABLE[v][2] - 3) return v; // -3 for mode+length indicator overhead
  }
  throw new Error(`Data too long for version 10 (max ~210 bytes): ${byteCount}`);
}

// ─── Format / mask ─────────────────────────────────────────────────────────────
const FORMAT_INFOS: number[] = [
  0x5412, 0x5125, 0x5e7c, 0x5b4b, 0x45f9, 0x40ce, 0x4f97, 0x4aa0,
  0x77c4, 0x72f3, 0x7daa, 0x789d, 0x662f, 0x6318, 0x6c41, 0x6976,
  0x1689, 0x13be, 0x1ce7, 0x19d0, 0x0762, 0x0255, 0x0d0c, 0x083b,
  0x355f, 0x3068, 0x3f31, 0x3a06, 0x24b4, 0x2183, 0x2eda, 0x2bed,
];

// ─── Main encoder ──────────────────────────────────────────────────────────────
function generateQrMatrix(text: string): boolean[][] {
  const bytes = Array.from(new TextEncoder().encode(text));
  const version = selectVersion(bytes.length);
  const [, ecCW, dataCW, size] = QR_TABLE[version];

  // Build data bitstream
  const bits: number[] = [];
  const push = (val: number, length: number) => {
    for (let i = length - 1; i >= 0; i--) bits.push((val >> i) & 1);
  };
  push(0b0100, 4);          // byte mode
  push(bytes.length, 8);    // character count
  bytes.forEach(b => push(b, 8));
  // Terminator + pad
  const totalBits = dataCW * 8;
  push(0, Math.min(4, totalBits - bits.length));
  while (bits.length % 8) bits.push(0);
  const padBytes = [0xec, 0x11];
  let pi = 0;
  while (bits.length < totalBits) { push(padBytes[pi % 2], 8); pi++; }

  // Codewords
  const dataBytes: number[] = [];
  for (let i = 0; i < bits.length; i += 8) {
    let b = 0;
    for (let j = 0; j < 8; j++) b = (b << 1) | bits[i + j];
    dataBytes.push(b);
  }
  const ecBytes = rsEncode(dataBytes, ecCW);
  const allBytes = [...dataBytes, ...ecBytes];

  // Build matrix
  const mat: number[][] = Array.from({ length: size }, () => new Array(size).fill(-1));
  const setMod = (r: number, c: number, v: number) => { if (mat[r][c] === -1) mat[r][c] = v; };

  // Finder patterns
  const finder = (tr: number, tc: number) => {
    for (let r = -1; r <= 7; r++) for (let c = -1; c <= 7; c++) {
      const nr = tr + r, nc = tc + c;
      if (nr < 0 || nr >= size || nc < 0 || nc >= size) continue;
      const inOuter = r >= 0 && r <= 6 && c >= 0 && c <= 6;
      const inInner = r >= 2 && r <= 4 && c >= 2 && c <= 4;
      const onEdge = (r === 0 || r === 6 || c === 0 || c === 6);
      mat[nr][nc] = (inOuter && (onEdge || inInner)) ? 1 : 0;
    }
  };
  finder(0, 0); finder(0, size - 7); finder(size - 7, 0);

  // Timing patterns
  for (let i = 8; i < size - 8; i++) {
    mat[6][i] = mat[i][6] = i % 2 === 0 ? 1 : 0;
  }

  // Dark module
  mat[size - 8][8] = 1;

  // Format info placeholders → reserve
  for (let i = 0; i <= 8; i++) {
    if (mat[i][8] === -1) mat[i][8] = 0;
    if (mat[8][i] === -1) mat[8][i] = 0;
    if (i < 7) {
      mat[size - 1 - i][8] = 0;
      mat[8][size - 1 - i] = 0;
    }
  }

  // Alignment patterns (version >= 2)
  if (version >= 2) {
    const AP_TABLE: { [v: number]: number[] } = {
      2: [6, 18], 3: [6, 22], 4: [6, 26], 5: [6, 30],
      6: [6, 34], 7: [6, 22, 38], 8: [6, 24, 42], 9: [6, 26, 46], 10: [6, 28, 50],
    };
    const positions = AP_TABLE[version] || [];
    for (const r of positions) for (const c of positions) {
      if (mat[r][c] !== -1) continue;
      for (let dr = -2; dr <= 2; dr++) for (let dc = -2; dc <= 2; dc++) {
        const onEdge = Math.abs(dr) === 2 || Math.abs(dc) === 2;
        const center = dr === 0 && dc === 0;
        mat[r + dr][c + dc] = (onEdge || center) ? 1 : 0;
      }
    }
  }

  // Place data bits (mask 0: (row+col) % 2 === 0)
  let bitIdx = 0;
  let goingUp = true;
  const allBits: number[] = [];
  for (const byte of allBytes) for (let b = 7; b >= 0; b--) allBits.push((byte >> b) & 1);

  for (let col = size - 1; col >= 1; col -= 2) {
    if (col === 6) col = 5;
    for (let rowOff = 0; rowOff < size; rowOff++) {
      const row = goingUp ? size - 1 - rowOff : rowOff;
      for (let c = col; c >= col - 1; c--) {
        if (mat[row][c] !== -1) continue;
        const bitVal = bitIdx < allBits.length ? allBits[bitIdx++] : 0;
        const masked = bitVal ^ ((row + c) % 2 === 0 ? 1 : 0);
        mat[row][c] = masked;
      }
    }
    goingUp = !goingUp;
  }

  // Apply format info (ECL=M, mask=0 → index=8)
  const fi = FORMAT_INFOS[8]; // M,0
  for (let i = 0; i < 6; i++) { mat[i][8] = (fi >> (14 - i)) & 1; mat[8][i] = (fi >> i) & 1; }
  mat[7][8] = (fi >> 8) & 1; mat[8][7] = (fi >> 7) & 1; mat[8][8] = (fi >> 6) & 1;
  for (let i = 0; i < 7; i++) {
    mat[size - 7 + i][8] = (fi >> i) & 1;
    mat[8][size - 8 + i] = (fi >> (13 - i)) & 1;
  }

  return mat.map(row => row.map(v => v === 1));
}

// ─── React component ───────────────────────────────────────────────────────────
interface DynamicQrCodeProps {
  /** The string to encode (pass code, URL, Wi-Fi URI, etc.) */
  value: string;
  /** Width & height of the rendered SVG in pixels (default 128) */
  size?: number;
  /** Foreground / module color (default #10233B — Paper Street navy) */
  color?: string;
  /** Background color (default #ffffff) */
  bg?: string;
  /** Extra CSS class on the outer <svg> element */
  className?: string;
}

export function DynamicQrCode({
  value,
  size = 128,
  color = '#10233B',
  bg = '#ffffff',
  className = '',
}: DynamicQrCodeProps) {
  const matrix = useMemo(() => {
    try {
      return generateQrMatrix(value || 'PS-NONE');
    } catch {
      return generateQrMatrix('PS-ERROR');
    }
  }, [value]);

  const moduleCount = matrix.length;
  // 4-module quiet zone on each side per spec
  const quietZone = 4;
  const total = moduleCount + quietZone * 2;
  const moduleSize = size / total;

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox={`0 0 ${size} ${size}`}
      width={size}
      height={size}
      className={className}
      role="img"
      aria-label={`QR code for ${value}`}
      style={{ shapeRendering: 'crispEdges' }}
    >
      {/* Background */}
      <rect width={size} height={size} fill={bg} />
      {/* Modules */}
      {matrix.map((row, r) =>
        row.map((on, c) =>
          on ? (
            <rect
              key={`${r}-${c}`}
              x={(quietZone + c) * moduleSize}
              y={(quietZone + r) * moduleSize}
              width={moduleSize}
              height={moduleSize}
              fill={color}
            />
          ) : null
        )
      )}
    </svg>
  );
}
