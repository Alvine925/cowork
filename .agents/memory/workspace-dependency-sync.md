---
name: Workspace dependency sync
description: Replit workspace behavior when artifacts are added after the initial dependency install
---

When a new artifact is added after dependencies were installed, rerun the workspace package install before diagnosing missing local binaries such as Vite or TypeScript.

**Why:** Artifact additions can expand the pnpm workspace after the original install, leaving the new package without its local dependency links even when other artifacts run correctly.

**How to apply:** After automatic artifact updates, run the workspace install once, then restart only the affected workflow and rerun its typecheck/build.