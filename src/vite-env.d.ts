/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_WHATSAPP_NUMBER: string;
  // Agrega aquí otras variables que vayas creando
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}