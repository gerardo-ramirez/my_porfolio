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
            <div key={item.id} className="border rounded-lg p-4 bg-white shadow-sm overflow-hidden">
              {item.type === 'youtube' && (
                <img 
                  src={item.thumbnail} 
                  alt={item.title} 
                  className="w-full h-48 object-cover rounded-md mb-4"
                />
              )}
              <h3 className="font-semibold text-lg">{item.title}</h3>
              <p className="text-slate-500 text-sm">{item.description}</p>
              <span className="mt-2 inline-block px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded">
                {item.type.toUpperCase()}
              </span>
            </div>
          ))}
        </div>
      </div>
  )
}




