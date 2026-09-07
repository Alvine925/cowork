-- Upgrade Client Bookings table with Overtime, Smart Scheduling, Check-in, and Attribution fields
ALTER TABLE client_bookings 
  ADD COLUMN IF NOT EXISTS calculated_end_time TEXT,
  ADD COLUMN IF NOT EXISTS overtime_hours NUMERIC DEFAULT 0,
  ADD COLUMN IF NOT EXISTS overtime_fee_kes NUMERIC DEFAULT 0,
  ADD COLUMN IF NOT EXISTS check_in_status TEXT DEFAULT 'pending',
  ADD COLUMN IF NOT EXISTS checked_in_at TIMESTAMPTZ,
  ADD COLUMN IF NOT EXISTS checked_in_by TEXT,
  ADD COLUMN IF NOT EXISTS qr_code_token TEXT,
  ADD COLUMN IF NOT EXISTS utm_source TEXT,
  ADD COLUMN IF NOT EXISTS utm_medium TEXT,
  ADD COLUMN IF NOT EXISTS utm_campaign TEXT,
  ADD COLUMN IF NOT EXISTS utm_referrer TEXT,
  ADD COLUMN IF NOT EXISTS payment_hold_expires_at TIMESTAMPTZ,
  ADD COLUMN IF NOT EXISTS email_sent BOOLEAN DEFAULT false,
  ADD COLUMN IF NOT EXISTS admin_alert_sent BOOLEAN DEFAULT false,
  ADD COLUMN IF NOT EXISTS email_sent_at TIMESTAMPTZ;

-- Indexes for efficient lookup
CREATE INDEX IF NOT EXISTS idx_client_bookings_qr_token ON client_bookings(qr_code_token);
CREATE INDEX IF NOT EXISTS idx_client_bookings_checkin ON client_bookings(check_in_status);
CREATE INDEX IF NOT EXISTS idx_client_bookings_date_status ON client_bookings(booking_date, status);
