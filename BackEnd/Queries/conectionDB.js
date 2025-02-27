const SUPABASE_URL = "https://ubwdquvaehxeaparemsb.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVid2RxdXZhZWh4ZWFwYXJlbXNiIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc0MDY2NDQ0MSwiZXhwIjoyMDU2MjQwNDQxfQ.G5MyQ3ov7HGWOkbSyamSRAAO4VfleUkSPV6nPdYfSSc";

// Asegurar que window.supabase está definido
if (window.supabase) {
    window.supabaseClient = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
} else {
    console.error("Supabase no se ha cargado correctamente desde el CDN.");
}

export const supabase = window.supabaseClient;
