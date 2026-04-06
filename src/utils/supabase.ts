import { createClient } from "@supabase/supabase-js";

/**
 * WatchOut Supabase Client
 * 
 * NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY are required
 * in the root .env.local file.
 */

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn("Supabase configuration missing. Ensure environment variables are set.");
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
