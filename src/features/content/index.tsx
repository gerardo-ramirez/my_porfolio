import { useEffect, useState } from "react";

export const Content=()=> {
  
  const [data, setData] = useState([]);

  useEffect(() => {
    // Llamamos a nuestro BFF (la carpeta /api se convierte en rutas de URL)
    fetch("/api/content")
      .then((res) => res.json())
      .then((json) => setData(json))
      .catch((err) => console.error("Error llamando al BFF:", err));
  }, []);
  return (
  <div className="space-y-6">
        <h1 className="text-3xl font-bold">Dashboard de Contenido TESTEAMOS EL CONTENIDO </h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {data.map((item: any) => (
            <div key={item.id} className="group relative bg-secondary/20 rounded-2xl border border-white/10 overflow-hidden hover:border-primary/50 transition-all">
  
{/* CONDICIONAL: Si es VIDEO (Asegúrate que en DB diga 'youtube' o 'video') */}
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

  {/* CONDICIONAL: Si es AUDIO */}
  {item.type === 'audio' && (
    <div className="p-6">
      <img 
        src={item.thumbnail_url || 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=400&q=80'} 
        alt={item.title}
        className="w-full h-48 object-cover rounded-xl mb-4 shadow-lg"
      />
      <audio controls className="w-full h-8">
        <source src={item.url} type="audio/mpeg" />
      </audio>
    </div>
  )}

  {/* CONDICIONAL: Si es IMAGE */}
  {item.type === 'image' && (
    <div className="w-full overflow-hidden">
      <img 
        src={item.url} 
        alt={item.title}
        className="w-full h-64 object-cover hover:scale-105 transition-transform duration-500 cursor-pointer"
      />
    </div>
  )}

  {/* Info común: Título y Descripción */}
  <div className="p-4">
    <h3 className="text-lg font-bold text-white">{item.title}</h3>
    <p className="text-sm text-gray-400 mt-2 line-clamp-2">
      {item.description || "Cargando descripción profesional..."}
    </p>
  </div>
</div>
          ))}
        </div>
      </div>
  )
}




