import { Button } from "@/components/ui/button"

export const ContactButton = () => {
  const phoneNumber =  import.meta.env.VITE_WHATSAPP_NUMBER; 
  const message = "Hola Gerardo, vi tu portfolio...";
  const encodedMessage = encodeURIComponent(message);

  const handleContact = () => {
    // Intentamos usar el protocolo 'whatsapp://' que fuerza la apertura de la APP
    // Si falla (porque estamos en PC), el fallback es 'https://wa.me'
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
    window.open(whatsappUrl, "_blank", "noreferrer");
  };

  return (
    <Button 
      onClick={handleContact}
      className="bg-[#25D366] hover:bg-[#20ba5a] text-white"
    >
      Contactar por WhatsApp
    </Button>
  );
};