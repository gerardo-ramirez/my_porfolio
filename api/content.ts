import { createClient } from '@supabase/supabase-js';
import type { VercelRequest, VercelResponse } from '@vercel/node';

// Configuración de Supabase
const supabase = createClient(
  process.env.VITE_SUPABASE_URL || '',
  process.env.VITE_SUPABASE_ANON_KEY || ''
);

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // 1. Consulta a Supabase
  const { data, error } = await supabase
    .from('content')
    .select('*');

  if (error) {
    return res.status(500).json({ error: error.message });
  }

  // 2. Transformación y Sanitización de datos (La "Magia" del BFF)
  const enhancedData = data.map(item => {
    // A. Limpiamos la URL de cualquier carácter invisible como \r o \n
    const sanitizedUrl = item.url ? item.url.trim() : null;

    // B. Si es YouTube, generamos la miniatura
    if (item.type === 'youtube') {
      return {
        ...item,
        url: sanitizedUrl,
        thumbnail: `https://img.youtube.com/vi/${item.external_id}/hqdefault.jpg`
      };
    }

    // C. Para el resto (audios, imágenes), devolvemos el item con la URL limpia
    return {
      ...item,
      url: sanitizedUrl
    };
  });

  // 3. Respuesta final con datos impecables
  return res.status(200).json(enhancedData);
}