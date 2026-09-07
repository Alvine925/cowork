import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://kmxijhmnmnrpmqolxnxv.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtteGlqaG1ubW5ycG1xb2x4bnh2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODcwMzU1NDQsImV4cCI6MjEwMjYxMTU0NH0.k90AFc17Mf1EXUx0o2cCFAtnnOIdbk1bQZXO9rLeF_4';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
