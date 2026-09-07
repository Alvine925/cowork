-- ============================================================================
-- PAPER STREET EXPANDED CLIENT PORTAL SCHEMA & SEED DATA
-- Tables: workspace_packages, client_bookings, client_passes, client_feedback, client_invoices
-- ============================================================================

-- 1. WORKSPACE PACKAGES TABLE
CREATE TABLE IF NOT EXISTS workspace_packages (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  category TEXT NOT NULL, -- 'Day Pass', 'Meeting Room', 'Boardroom', 'Podcast Studio', 'Dedicated Desk', 'Virtual Office'
  price_kes NUMERIC(10, 2) NOT NULL,
  period_unit TEXT NOT NULL, -- 'per day', 'per hour', 'per month', 'bundle'
  description TEXT NOT NULL,
  location_options TEXT[] NOT NULL DEFAULT '{"Westlands (Delta Corner)", "Riverside Drive", "Kilimani"}',
  features JSONB NOT NULL DEFAULT '[]'::jsonb,
  is_popular BOOLEAN NOT NULL DEFAULT false,
  badge TEXT,
  capacity TEXT,
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 2. CLIENT BOOKINGS TABLE
CREATE TABLE IF NOT EXISTS client_bookings (
  id SERIAL PRIMARY KEY,
  user_id TEXT NOT NULL,
  client_name TEXT NOT NULL,
  client_email TEXT NOT NULL,
  client_phone TEXT,
  package_id INTEGER REFERENCES workspace_packages(id) ON DELETE SET NULL,
  service_title TEXT NOT NULL,
  location TEXT NOT NULL,
  booking_date DATE NOT NULL,
  start_time TEXT NOT NULL,
  end_time TEXT NOT NULL,
  duration_hours NUMERIC(4, 1) NOT NULL DEFAULT 1,
  attendees INTEGER NOT NULL DEFAULT 1,
  total_amount_kes NUMERIC(10, 2) NOT NULL,
  status TEXT NOT NULL DEFAULT 'confirmed', -- 'confirmed', 'pending', 'cancelled', 'completed'
  payment_status TEXT NOT NULL DEFAULT 'paid', -- 'paid', 'pending', 'refunded'
  payment_method TEXT NOT NULL DEFAULT 'M-Pesa',
  mpesa_reference TEXT,
  special_requests TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 3. CLIENT ENTRY PASSES TABLE
CREATE TABLE IF NOT EXISTS client_passes (
  id SERIAL PRIMARY KEY,
  user_id TEXT NOT NULL,
  booking_id INTEGER REFERENCES client_bookings(id) ON DELETE CASCADE,
  pass_code TEXT NOT NULL UNIQUE,
  service_title TEXT NOT NULL,
  location TEXT NOT NULL,
  valid_date DATE NOT NULL,
  qr_data TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'active', -- 'active', 'checked_in', 'expired'
  wifi_network TEXT NOT NULL DEFAULT 'PaperStreet-Guest-5G',
  wifi_password TEXT NOT NULL DEFAULT 'Westlands2026!',
  checked_in_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 4. CLIENT COMPLAINTS & FEEDBACK TABLE
CREATE TABLE IF NOT EXISTS client_feedback (
  id SERIAL PRIMARY KEY,
  user_id TEXT NOT NULL,
  client_name TEXT NOT NULL,
  client_email TEXT NOT NULL,
  category TEXT NOT NULL, -- 'Facilities & Maintenance', 'WiFi & Connectivity', 'Meeting Room AV', 'Cleanliness', 'Billing & Receipts', 'Staff & Concierge', 'General Suggestion'
  priority TEXT NOT NULL DEFAULT 'medium', -- 'low', 'medium', 'urgent'
  subject TEXT NOT NULL,
  message TEXT NOT NULL,
  location TEXT DEFAULT 'Westlands (Delta Corner)',
  status TEXT NOT NULL DEFAULT 'open', -- 'open', 'under_review', 'resolved'
  admin_notes TEXT,
  resolution_date TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 5. CLIENT INVOICES TABLE
CREATE TABLE IF NOT EXISTS client_invoices (
  id SERIAL PRIMARY KEY,
  user_id TEXT NOT NULL,
  booking_id INTEGER REFERENCES client_bookings(id) ON DELETE SET NULL,
  invoice_number TEXT NOT NULL UNIQUE,
  description TEXT NOT NULL,
  amount_kes NUMERIC(10, 2) NOT NULL,
  payment_method TEXT NOT NULL DEFAULT 'M-Pesa',
  status TEXT NOT NULL DEFAULT 'paid', -- 'paid', 'pending', 'cancelled'
  pdf_url TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ============================================================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- ============================================================================
ALTER TABLE workspace_packages ENABLE ROW LEVEL SECURITY;
ALTER TABLE client_bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE client_passes ENABLE ROW LEVEL SECURITY;
ALTER TABLE client_feedback ENABLE ROW LEVEL SECURITY;
ALTER TABLE client_invoices ENABLE ROW LEVEL SECURITY;

DO $$ 
BEGIN
  -- Packages can be read by everyone
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Public packages read') THEN
    CREATE POLICY "Public packages read" ON workspace_packages FOR SELECT USING (true);
  END IF;

  -- Bookings RLS
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Client bookings access') THEN
    CREATE POLICY "Client bookings access" ON client_bookings FOR ALL USING (true) WITH CHECK (true);
  END IF;

  -- Passes RLS
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Client passes access') THEN
    CREATE POLICY "Client passes access" ON client_passes FOR ALL USING (true) WITH CHECK (true);
  END IF;

  -- Feedback RLS
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Client feedback access') THEN
    CREATE POLICY "Client feedback access" ON client_feedback FOR ALL USING (true) WITH CHECK (true);
  END IF;

  -- Invoices RLS
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Client invoices access') THEN
    CREATE POLICY "Client invoices access" ON client_invoices FOR ALL USING (true) WITH CHECK (true);
  END IF;
END $$;

-- ============================================================================
-- SEED WORKSPACE PACKAGES
-- ============================================================================
INSERT INTO workspace_packages (name, slug, category, price_kes, period_unit, description, location_options, features, is_popular, badge, capacity)
VALUES
  (
    'Full-Day Hot Desk Pass',
    'hot-desk-day-pass',
    'Day Pass',
    2000.00,
    'per day',
    'Flexible ergonomic desk space in our open-plan workspace with high-speed Wi-Fi, artisan coffee, and power backup.',
    '{"Westlands (Delta Corner)", "Riverside Drive Hub", "Kilimani Office", "CBD Hub"}',
    '["200Mbps fiber internet & power backup", "Unlimited specialty Kenyan tea & barista coffee", "Access from 8:00 AM to 6:00 PM", "Quiet phone booth access (up to 30 mins)", "Reception guest greeting"]'::jsonb,
    true,
    'Most Popular',
    '1 Person'
  ),
  (
    '5-Day Flexi Desk Pass Bundle',
    'flexi-desk-5-day-bundle',
    'Day Pass',
    9000.00,
    'bundle',
    'A flexible 5-day bundle valid for 60 days. Ideal for hybrid consultants and visiting founders.',
    '{"Westlands (Delta Corner)", "Riverside Drive Hub", "Kilimani Office"}',
    '["5 full-day hot desk passes (use anytime over 60 days)", "200Mbps Wi-Fi & uninterrupted generator backup", "Specialty espresso & teas included", "1 hour complimentary podcast or meeting booth credit", "Priority seating reservation"]'::jsonb,
    false,
    'Value Bundle',
    '1 Person'
  ),
  (
    'The Glasshouse Meeting Suite (6 Pax)',
    'glasshouse-meeting-room-6pax',
    'Meeting Room',
    2500.00,
    'per hour',
    'Acoustically isolated 6-person glass meeting room with 4K interactive presentation display and whiteboard.',
    '{"Westlands (Delta Corner)", "Riverside Drive Hub", "CBD Hub"}',
    '["65-inch 4K UHD presentation screen (HDMI & Wireless Cast)", "Logitech 4K ConferenceCam with beamforming mic", "Tempered glass dry-erase wall", "Fresh bottled water & stationery", "Barista coffee service to table"]'::jsonb,
    true,
    'Recommended',
    'Up to 6 Persons'
  ),
  (
    'Executive Boardroom Suite (12 Pax)',
    'executive-boardroom-12pax',
    'Boardroom',
    4500.00,
    'per hour',
    'Premier 12-person boardroom with ergonomic executive leather seating, dual 4K video conferencing, and dedicated catering service.',
    '{"Westlands (Delta Corner)", "Riverside Drive Hub"}',
    '["Dual 75-inch 4K video conference display walls", "Neat Bar Pro studio-quality zoom video & audio", "Motorized table power sockets & fast USB-C chargers", "Executive leather seating & mahogany table", "Dedicated receptionist & beverage service"]'::jsonb,
    false,
    'Executive Suite',
    'Up to 14 Persons'
  ),
  (
    'Podcast & Audio Studio Booth',
    'podcast-audio-studio-booth',
    'Podcast Studio',
    3500.00,
    'per hour',
    'State-of-the-art acoustic sound booth equipped with Shure broadcast microphones, Rodecaster Pro II, and customizable video lighting.',
    '{"Westlands (Delta Corner)", "Riverside Drive Hub"}',
    '["2x Shure SM7B Broadcast Dynamic Microphones", "Rodecaster Pro II audio production console", "Elgato Key Light Air LED panels with multi-hue lighting", "Triple-glazed acoustic isolation (NC-25 quiet rating)", "Instant multi-track WAV/MP3 recording to SD or USB"]'::jsonb,
    false,
    'Creative Studio',
    'Up to 3 Persons'
  ),
  (
    'Dedicated Desk (Monthly Resident)',
    'dedicated-desk-monthly',
    'Dedicated Desk',
    25000.00,
    'per month',
    'Your own personal dedicated workstation with lockable pedestal storage, 24/7 biometric access, and 5 monthly boardroom hours.',
    '{"Westlands (Delta Corner)", "Riverside Drive Hub", "Kilimani Office"}',
    '["Permanent assigned desk with lockable storage drawer", "24/7 biometric fingerprint & mobile access", "5 complimentary meeting room hours per month", "Official business address & mail receipt handling", "High-speed wired Ethernet + Gigabit Wi-Fi"]'::jsonb,
    false,
    'Resident Tier',
    '1 Person'
  )
ON CONFLICT (slug) DO UPDATE SET
  price_kes = EXCLUDED.price_kes,
  description = EXCLUDED.description,
  features = EXCLUDED.features;
