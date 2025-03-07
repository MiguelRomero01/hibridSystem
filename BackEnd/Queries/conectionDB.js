import { createClient } from "https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm";

import { SUPABASE_URL, SUPABASE_ANON_KEY } from "../../env.js"

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
