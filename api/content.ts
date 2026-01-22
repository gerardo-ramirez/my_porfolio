import { createClient } from '@supabase/supabase-js';
import type { VercelRequest, VercelResponse } from '@vercel/node';

// 1. Definimos los headers de CORS para que el navegador confíe en el BFF
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'GET, OPTIONS',
};

// Configuración de Supabase
const supabase = createClient(
  process.env.VITE_SUPABASE_URL || '',
  process.env.VITE_SUPABASE_ANON_KEY || ''
);

export default async function handler(req: VercelRequest, res: VercelResponse) {
  
  // 2. Manejo del PREFLIGHT (Obligatorio para evitar errores de bloqueo en el navegador)
  if (req.method === 'OPTIONS') {
    return res.status(200).set(corsHeaders).send('ok');
  }

  try {
    // Aplicamos los headers a la respuesta final
    res.set(corsHeaders);

    // 3. Consulta a Supabase
    const { data, error } = await supabase
      .from('content')
      .select('*');

    if (error) {
      return res.status(500).json({ error: error.message });
    }

    // 4. Transformación y Sanitización de datos
    const enhancedData = data.map(item => {
      // Limpiamos la URL de saltos de línea y aplicamos encodeURI para manejar espacios
      const sanitizedUrl = item.url ? encodeURI(item.url.trim()) : null;

      if (item.type === 'youtube') {
        return {
          ...item,
          url: sanitizedUrl,
          thumbnail: `https://img.youtube.com/vi/${item.external_id}/hqdefault.jpg`
        };
      }

      return {
        ...item,
        url: sanitizedUrl
      };
    });

    return res.status(200).json(enhancedData);

  } catch (err: any) {
    return res.status(500).json({ error: err.message });
  }
}