
import { createClient } from '@supabase/supabase-js';

// Replace these with your Supabase credentials from your Supabase dashboard
// Go to Settings > API in your Supabase dashboard to find these values
const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL || 'https://your-project-id.supabase.co';
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY || 'your-anon-key';

// Create a single supabase client for interacting with your database
export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

console.log('Supabase client initialized with URL:', SUPABASE_URL);
