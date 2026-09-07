-- ============================================================================
-- PAPER STREET KISUMU CBD - SUPABASE DATABASE INITIALIZATION & PACKAGES SEED
-- ============================================================================

-- 1. DROP EXISTING TABLES TO RECREATE CLEANLY WITHOUT COLUMN CONFLICTS
DROP TABLE IF EXISTS client_passes CASCADE;
DROP TABLE IF EXISTS client_bookings CASCADE;
DROP TABLE IF EXISTS workspace_packages CASCADE;

-- 2. WORKSPACE PACKAGES CATALOG TABLE
CREATE TABLE workspace_packages (
  id SERIAL PRIMARY KEY,
  slug TEXT NOT NULL UNIQUE,
  name TEXT NOT NULL,
  category TEXT NOT NULL,                -- 'virtual', 'workspace', 'meeting'
  badge TEXT,                            -- 'Most Popular', 'Official Registration', 'Flexible Coworking', etc.
  tagline TEXT NOT NULL,
  description TEXT NOT NULL,
  annual_rate_kes NUMERIC(10, 2) NOT NULL DEFAULT 0,
  monthly_rate_kes NUMERIC(10, 2) NOT NULL DEFAULT 0,
  deposit_months INTEGER NOT NULL DEFAULT 0,
  deposit_amount_kes NUMERIC(10, 2) NOT NULL DEFAULT 0,
  billing_terms TEXT NOT NULL,
  tiers JSONB NOT NULL DEFAULT '[]'::jsonb,
  features JSONB NOT NULL DEFAULT '[]'::jsonb,
  is_popular BOOLEAN NOT NULL DEFAULT false,
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 3. INSERT ALL 5 PACKAGES WITH COMPLETE TIERS, PRICING & DEPOSIT RULES
INSERT INTO workspace_packages (
  slug,
  name,
  category,
  badge,
  tagline,
  description,
  annual_rate_kes,
  monthly_rate_kes,
  deposit_months,
  deposit_amount_kes,
  billing_terms,
  tiers,
  features,
  is_popular
)
VALUES
  (
    'virtual-office',
    'Virtual Office',
    'virtual',
    'Most Popular',
    'Comprehensive business presence in Kisumu CBD with digital mail scanning & meeting credits.',
    'Establish a verified corporate footprint on Oginga Odinga Street with official registered address, digital mail scanning (PDFs delivered to your portal), front desk reception greeting, and monthly boardroom hours.',
    96000,
    10000,
    1,
    10000,
    'Annual: KES 8,000/mo billed annually at KES 96,000 (Zero Deposit). Monthly: KES 10,000/mo + 1 Month Deposit (KES 10,000).',
    '[
      {"id": "annual", "name": "Annual Membership", "rateDisplay": "KES 8,000 / mo", "subtext": "Billed annually at KES 96,000 (Save KES 24,000/yr)", "rentAmountKES": 96000, "depositMonths": 0, "depositAmountKES": 0, "billingPeriod": "12 Months Paid Upfront", "isPopular": true},
      {"id": "monthly", "name": "Monthly Rolling Contract", "rateDisplay": "KES 10,000 / mo", "subtext": "Requires 1 month refundable security deposit (KES 10,000)", "rentAmountKES": 10000, "depositMonths": 1, "depositAmountKES": 10000, "billingPeriod": "Monthly Rolling"}
    ]'::jsonb,
    '[
      "Official commercial address on Oginga Odinga Street in Kisumu CBD",
      "Digital mail scanning (high-res PDFs delivered directly to your portal)",
      "Monthly executive boardroom booking hours included",
      "Professional front-desk reception & guest greeting",
      "Eligible for eCitizen BRS company registration & KRA PIN compliance",
      "Mail collection & safe physical holding for 60 days"
    ]'::jsonb,
    true
  ),

  (
    'business-address',
    'Business Address',
    'virtual',
    'Official Registration',
    'Official commercial registered office address for company incorporation & compliance.',
    'Use our verifiable commercial address in Kisumu CBD for eCitizen company registration, KRA PIN compliance, corporate banking KYC, and marketing materials without renting a physical office.',
    42000,
    5000,
    2,
    10000,
    'Annual: KES 3,500/mo billed annually at KES 42,000 (Zero Deposit). Monthly: KES 5,000/mo + 2 Months Deposit (KES 10,000).',
    '[
      {"id": "annual", "name": "Annual Plan (Save 30%)", "rateDisplay": "KES 3,500 / mo", "subtext": "Billed annually at KES 42,000 (Save KES 18,000/yr)", "rentAmountKES": 42000, "depositMonths": 0, "depositAmountKES": 0, "billingPeriod": "12 Months Paid Upfront", "isPopular": true},
      {"id": "monthly", "name": "Monthly Rolling Contract", "rateDisplay": "KES 5,000 / mo", "subtext": "Requires 2 months refundable security deposit (KES 10,000)", "rentAmountKES": 5000, "depositMonths": 2, "depositAmountKES": 10000, "billingPeriod": "Monthly Rolling"}
    ]'::jsonb,
    '[
      "Official Kisumu CBD commercial registered office address",
      "Instant proof of address certificate for bank account opening & KYC",
      "Company incorporation (eCitizen BRS) & KRA tax registration use",
      "Physical mail receiving, logging, and arrival notifications",
      "Authorised commercial branch presence in Western Kenya"
    ]'::jsonb,
    false
  ),

  (
    'hot-desk',
    'Hot Desk & Day Passes',
    'workspace',
    'Flexible Coworking',
    'Flexible daily, weekly and 10-day monthly flex passes with 100% generator backup.',
    'Walk in, plug in, and work with zero friction. Enjoy air-conditioned open workspaces, high-speed dual-carrier fibre Wi-Fi, 100% generator power backup, and quiet soundproof phone booths.',
    14000,
    14000,
    0,
    0,
    'Half-Day: KES 1,000. Full-Day: KES 1,500. 5-Day: KES 6,500. Monthly Flex (10 Days/mo): KES 14,000. No Security Deposit.',
    '[
      {"id": "half-day", "name": "Half-Day Pass (4 Hours)", "rateDisplay": "KES 1,000", "subtext": "Morning (08:00 - 12:00) or Afternoon (01:00 - 05:00)", "rentAmountKES": 1000, "depositMonths": 0, "depositAmountKES": 0, "billingPeriod": "4-Hour Single Session"},
      {"id": "full-day", "name": "Full-Day Pass (08:00 AM - 06:00 PM)", "rateDisplay": "KES 1,500", "subtext": "Unlimited day access with complimentary tea & coffee", "rentAmountKES": 1500, "depositMonths": 0, "depositAmountKES": 0, "billingPeriod": "Full Day Pass", "isPopular": true},
      {"id": "weekly", "name": "5-Day Weekly Pass", "rateDisplay": "KES 6,500", "subtext": "5 full working days of flexible workspace", "rentAmountKES": 6500, "depositMonths": 0, "depositAmountKES": 0, "billingPeriod": "5-Day Pass"},
      {"id": "monthly", "name": "Monthly Flex Membership (10 Days)", "rateDisplay": "KES 14,000 / mo", "subtext": "10 flexible working days per month with generator backup", "rentAmountKES": 14000, "depositMonths": 0, "depositAmountKES": 0, "billingPeriod": "10 Days / Month"}
    ]'::jsonb,
    '[
      "High-speed redundant fibre-optic Wi-Fi",
      "Automatic 100% standby generator power backup",
      "Ergonomic mesh chairs and spacious desks",
      "Soundproof phone booths for private calls",
      "Complimentary artisan tea and filtered drinking water",
      "Front-desk reception check-in and assistance"
    ]'::jsonb,
    false
  ),

  (
    'dedicated-desk',
    'Dedicated Desk',
    'workspace',
    'Resident Workstation',
    'Your permanent personal workstation with lockable storage & address included.',
    'Your own reserved desk that no one else uses. Leave your monitors, setup, and documents in your lockable storage unit. Includes commercial business address and monthly boardroom booking hours.',
    216000,
    20000,
    1,
    20000,
    'Annual: KES 18,000/mo billed annually at KES 216,000 (Zero Deposit). Monthly: KES 20,000/mo + 1 Month Deposit (KES 20,000).',
    '[
      {"id": "annual", "name": "Annual Commitment (Best Rate)", "rateDisplay": "KES 18,000 / mo", "subtext": "Billed annually at KES 216,000 (Save KES 24,000/yr)", "rentAmountKES": 216000, "depositMonths": 0, "depositAmountKES": 0, "billingPeriod": "12 Months Paid Upfront", "isPopular": true},
      {"id": "monthly", "name": "Monthly Rolling Contract", "rateDisplay": "KES 20,000 / mo", "subtext": "Requires 1 month refundable security deposit (KES 20,000)", "rentAmountKES": 20000, "depositMonths": 1, "depositAmountKES": 20000, "billingPeriod": "Monthly Rolling"}
    ]'::jsonb,
    '[
      "Permanently assigned desk (leave monitors, PC, and stationery in place)",
      "Lockable 3-tier steel drawer pedestal with private key",
      "Commercial Kisumu CBD business address & mail handling included",
      "5 hours monthly executive boardroom credits included",
      "100% standby generator backup & high-speed wired Ethernet",
      "24/7 keycard access option for resident members"
    ]'::jsonb,
    false
  ),

  (
    'meeting-rooms',
    'Meeting & Boardrooms',
    'meeting',
    'On-Demand Boardroom',
    'Private boardroom with 4K display, wireless screen casting & conference speakerphone.',
    'Impress clients, conduct board meetings, host team workshops, or close investments in our executive presentation boardroom in Kisumu CBD.',
    12000,
    2000,
    0,
    0,
    'Hourly: KES 2,000/hr. Half-Day (4 hrs): KES 7,000. Full-Day (8 hrs): KES 12,000. Zero Deposit.',
    '[
      {"id": "hourly", "name": "Hourly Booking", "rateDisplay": "KES 2,000 / hour", "subtext": "Flexible booking by the hour", "rentAmountKES": 2000, "depositMonths": 0, "depositAmountKES": 0, "billingPeriod": "Hourly Rate", "isPopular": true},
      {"id": "half-day", "name": "Half-Day Block (4 Hours)", "rateDisplay": "KES 7,000", "subtext": "4 consecutive hours (Save KES 1,000)", "rentAmountKES": 7000, "depositMonths": 0, "depositAmountKES": 0, "billingPeriod": "4-Hour Block"},
      {"id": "full-day", "name": "Full-Day Block (8 Hours)", "rateDisplay": "KES 12,000", "subtext": "Full working day (08:30 AM - 05:30 PM) (Save KES 4,000)", "rentAmountKES": 12000, "depositMonths": 0, "depositAmountKES": 0, "billingPeriod": "8-Hour Full Day Block"}
    ]'::jsonb,
    '[
      "6 to 12 executive ergonomic boardroom chairs",
      "4K presentation display with HDMI, USB-C & wireless screen casting",
      "Omnidirectional conference audio speakerphone & HD camera",
      "Magnetic whiteboard, dry-erase markers & flipchart",
      "Front-desk receptionist client greeting & direction",
      "Complimentary artisan tea and filtered water setup"
    ]'::jsonb,
    false
  );

-- 4. CLIENT BOOKINGS TABLE
CREATE TABLE client_bookings (
  id SERIAL PRIMARY KEY,
  user_id TEXT NOT NULL DEFAULT 'guest_user',
  client_name TEXT NOT NULL,
  client_email TEXT NOT NULL,
  client_phone TEXT NOT NULL,
  company_name TEXT,
  service_title TEXT NOT NULL,
  location TEXT NOT NULL DEFAULT 'Kisumu CBD (CBD Commercial Center)',
  booking_date DATE NOT NULL,
  start_time TEXT NOT NULL DEFAULT '09:00 AM',
  end_time TEXT NOT NULL DEFAULT '06:00 PM',
  duration_hours NUMERIC(4, 1) NOT NULL DEFAULT 8,
  attendees INTEGER NOT NULL DEFAULT 1,
  rent_amount_kes NUMERIC(10, 2) NOT NULL DEFAULT 0,
  deposit_amount_kes NUMERIC(10, 2) NOT NULL DEFAULT 0,
  total_amount_kes NUMERIC(10, 2) NOT NULL,
  status TEXT NOT NULL DEFAULT 'confirmed',
  payment_status TEXT NOT NULL DEFAULT 'paid',
  payment_method TEXT NOT NULL DEFAULT 'M-Pesa',
  mpesa_reference TEXT,
  special_requests TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 5. CLIENT ENTRY PASSES TABLE
CREATE TABLE client_passes (
  id SERIAL PRIMARY KEY,
  user_id TEXT NOT NULL DEFAULT 'guest_user',
  booking_id INTEGER REFERENCES client_bookings(id) ON DELETE CASCADE,
  pass_code TEXT NOT NULL UNIQUE,
  service_title TEXT NOT NULL,
  location TEXT NOT NULL DEFAULT 'Kisumu CBD (CBD Commercial Center)',
  valid_date DATE NOT NULL,
  qr_data TEXT NOT NULL DEFAULT '{}',
  status TEXT NOT NULL DEFAULT 'active',
  wifi_network TEXT NOT NULL DEFAULT 'PaperStreet-CBD-5G',
  wifi_pass TEXT NOT NULL DEFAULT 'PaperStreet2026!',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 6. ENABLE ROW LEVEL SECURITY (RLS)
ALTER TABLE workspace_packages ENABLE ROW LEVEL SECURITY;
ALTER TABLE client_bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE client_passes ENABLE ROW LEVEL SECURITY;

-- 7. PUBLIC ACCESS POLICIES
CREATE POLICY "Allow public read workspace_packages" ON workspace_packages FOR SELECT USING (true);
CREATE POLICY "Allow public insert client_bookings" ON client_bookings FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow public read client_bookings" ON client_bookings FOR SELECT USING (true);
CREATE POLICY "Allow public insert client_passes" ON client_passes FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow public read client_passes" ON client_passes FOR SELECT USING (true);

-- 8. INDEXES FOR PERFORMANCE
CREATE INDEX idx_workspace_packages_slug ON workspace_packages(slug);
CREATE INDEX idx_client_bookings_email ON client_bookings(client_email);
CREATE INDEX idx_client_bookings_date ON client_bookings(booking_date);
CREATE INDEX idx_client_passes_code ON client_passes(pass_code);
