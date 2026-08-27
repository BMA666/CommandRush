import { createClient } from "https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/+esm";

const SUPABASE_URL = "https://pwxykhzmjdjbfzoitzye.supabase.co";
const SUPABASE_KEY = "sb_publishable_XIZ9FIrO_G4LMITxgh48_g_upRykMey";

export const supabase = createClient(
    SUPABASE_URL,
    SUPABASE_KEY
);