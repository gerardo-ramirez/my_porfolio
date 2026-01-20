import { createClient } from '@supabase/supabase-js';

// Usamos import.meta.env porque estamos en Vite
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.error("⚠️ Error: Falta configurar las variables de Supabase en el .env");
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);