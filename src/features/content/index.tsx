import { createClient } from '@supabase/supabase-js';
import type { VercelRequest, VercelResponse } from '@vercel/node';

// 1. Definimos los headers
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'GET, OPTIONS',
};

const supabase = createClient(
  process.env.VITE_SUPABASE_URL || '',
  process.env.VITE_SUPABASE_ANON_KEY || ''
);

export default async function handler(req: VercelRequest, res: VercelResponse) {
  
  // 2. Manejo del OPTIONS (Preflight)
  if (req.method === 'OPTIONS') {
    // En Vercel Response se usa setHeader uno por uno
    Object.entries(corsHeaders).forEach(([key, value]) => res.setHeader(key, value));
    return res.status(200).send('ok');
  }

  try {
    // 3. Aplicamos headers a la respuesta final
    Object.entries(corsHeaders).forEach(([key, value]) => res.setHeader(key, value));

    const { data, error } = await supabase.from('content').select('*');

    if (error) return res.status(500).json({ error: error.message });

    const enhancedData = data.map(item => {
      const sanitizedUrl = item.url ? encodeURI(item.url.trim()) : null;

      if (item.type === 'youtube') {
        return {
          ...item,
          url: sanitizedUrl,
          thumbnail: `https://img.youtube.com/vi/${item.external_id}/hqdefault.jpg`
        };
      }

      return { ...item, url: sanitizedUrl };
    });

    return res.status(200).json(enhancedData);

  } catch (err: any) {
    return res.status(500).json({ error: err.message });
  }
}