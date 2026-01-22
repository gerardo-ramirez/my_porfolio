import { useEffect, useState } from "react";

export const Content = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    // TÉCNICA 1: Rompemos el caché (304) agregando un timestamp a la petición del BFF
    const nocache = `?t=${new Date().getTime()}`;
    fetch("/api/content" + nocache)
      .then((res) => res.json())
      .then((json) => setData(json))
      .catch((err) => console.error("Error llamando al BFF:", err));
  }, []);

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold uppercase tracking-tighter">Creative Lab Content</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {data.map((item: any) => (
          <div key={item.id} className="group relative bg-secondary/20 rounded-2xl border border-white/10 overflow-hidden hover:border-primary/50 transition-all">
            
            {/* VIDEO */}
            {item.type === 'youtube' && (
              <div className="aspect-video w-full">
                <iframe
                  src={`https://www.youtube.com/embed/${item.external_id}`}
                  title={item.title}
                  className="w-full h-full"
                  allowFullScreen
                />
              </div>
            )}

            {/* AUDIO */}
            {item.type === 'audio' && (
              <div className="p-6">
                <img 
                  src={item.thumbnail_url} 
                  alt={item.title}
                  className="w-full h-48 object-cover rounded-xl mb-4 shadow-lg"
                  // No ponemos crossOrigin aquí si viene de Unsplash (ellos lo manejan distinto)
                />
                <audio controls className="w-full h-8" crossOrigin="anonymous">
                  {/* TÉCNICA 2: El trim() ya lo hace el BFF, pero aquí nos aseguramos */}
                  <source src={item.url?.trim()} type="audio/mpeg" />
                </audio>
              </div>
            )}

            {/* IMAGE - AQUÍ ESTÁ EL AJUSTE CRÍTICO */}
            {item.type === 'image' && (
              <div className="w-full overflow-hidden aspect-square">
                <img 
                  // TÉCNICA 3: Quitamos crossOrigin="anonymous" temporalmente. 
                  // A veces Supabase público rebota el header si el bucket no tiene configurado CORS explícito.
                  src={item.url?.trim()} 
                  alt={item.title}
                  loading="lazy"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500 cursor-pointer"
                  onError={(e) => {
                    // Fallback visual si la imagen falla
                    (e.target as HTMLImageElement).src = "https://placehold.co/600x400/000000/FFFFFF/png?text=Error+Cargando+Imagen";
                  }}
                />
              </div>
            )}

            <div className="p-4">
              <h3 className="text-lg font-bold text-white">{item.title}</h3>
              <p className="text-sm text-gray-400 mt-2 line-clamp-2">
                {item.description || "Análisis creativo en proceso..."}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};