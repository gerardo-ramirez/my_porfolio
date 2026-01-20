import { createClient } from '@supabase/supabase-js';
import type { VercelRequest, VercelResponse } from '@vercel/node';

// Usamos las variables de entorno que configuraremos en Vercel
const supabase = createClient(
  process.env.VITE_SUPABASE_URL || '',
  process.env.VITE_SUPABASE_ANON_KEY || ''
); 

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Aquí el BFF consulta a Supabase
  const { data, error } = await supabase
    .from('content')
    .select('*');

  if (error) {
    return res.status(500).json({ error: error.message });
  }

  // El BFF puede transformar los datos antes de enviarlos
  // Por ejemplo, podríamos agregar la URL de la miniatura de YouTube aquí mismo
  const enhancedData = data.map(item => {
    if (item.type === 'youtube') {
      return {
        ...item,
        thumbnail: `https://img.youtube.com/vi/${item.external_id}/hqdefault.jpg`
      };
    }
    return item;
  });

  return res.status(200).json(enhancedData);
}