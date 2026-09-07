-- Supabase Tables for Member & Client Dashboards

CREATE TABLE IF NOT EXISTS portal_subscriptions (
  id SERIAL PRIMARY KEY,
  user_id TEXT NOT NULL,
  plan TEXT NOT NULL,
  billing_cycle TEXT NOT NULL,
  status TEXT NOT NULL,
  monthly_price NUMERIC(10, 2) NOT NULL,
  annual_price NUMERIC(10, 2) NOT NULL,
  deposit_amount NUMERIC(10, 2) NOT NULL,
  next_billing_date DATE NOT NULL,
  renewal_date DATE NOT NULL,
  location TEXT NOT NULL,
  included_services TEXT[] NOT NULL DEFAULT '{}',
  last_payment_date DATE NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS portal_documents (
  id SERIAL PRIMARY KEY,
  user_id TEXT NOT NULL,
  name TEXT NOT NULL,
  category TEXT NOT NULL,
  status TEXT NOT NULL,
  description TEXT NOT NULL,
  issued_date DATE NOT NULL,
  updated_date DATE NOT NULL,
  download_url TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS client_bookings (
  id SERIAL PRIMARY KEY,
  user_id TEXT NOT NULL,
  service_type TEXT NOT NULL,
  location TEXT NOT NULL,
  booking_date DATE NOT NULL,
  start_time TEXT NOT NULL,
  end_time TEXT NOT NULL,
  attendees INTEGER NOT NULL DEFAULT 1,
  status TEXT NOT NULL DEFAULT 'confirmed',
  amount NUMERIC(10, 2) NOT NULL,
  payment_status TEXT NOT NULL DEFAULT 'paid',
  payment_method TEXT NOT NULL DEFAULT 'M-Pesa',
  notes TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS portal_activities (
  id SERIAL PRIMARY KEY,
  user_id TEXT NOT NULL,
  kind TEXT NOT NULL,
  label TEXT NOT NULL,
  detail TEXT NOT NULL,
  date DATE NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Enable RLS & policies
ALTER TABLE portal_subscriptions ENABLE ROW LEVEL SECURITY;
ALTER TABLE portal_documents ENABLE ROW LEVEL SECURITY;
ALTER TABLE client_bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE portal_activities ENABLE ROW LEVEL SECURITY;

DO $$ 
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Allow users to read their own subscriptions') THEN
    CREATE POLICY "Allow users to read their own subscriptions" ON portal_subscriptions FOR ALL USING (true);
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Allow users to read their own documents') THEN
    CREATE POLICY "Allow users to read their own documents" ON portal_documents FOR ALL USING (true);
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Allow users to read their own bookings') THEN
    CREATE POLICY "Allow users to read their own bookings" ON client_bookings FOR ALL USING (true);
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Allow users to read their own activities') THEN
    CREATE POLICY "Allow users to read their own activities" ON portal_activities FOR ALL USING (true);
  END IF;
END $$;
