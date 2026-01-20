import { ReactNode } from "react";
// Aquí luego importaremos el Navbar

interface Props {
  children: ReactNode;
}

export const MainLayout = ({ children }: Props) => {
  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900">
      {/* Navbar Superior (Inicio de la F) */}
      <header className="sticky top-0 z-50 w-full border-b bg-white/80 backdrop-blur-md">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <span className="text-xl font-bold tracking-tight">Gerardo Ramirez <span className="text-blue-600">.dev</span></span>
          <nav className="hidden md:flex gap-6">
            <a href="#" className="text-sm font-medium hover:text-blue-600 transition-colors">Overview</a>
            <a href="#" className="text-sm font-medium hover:text-blue-600 transition-colors">Fraud Panel</a>
            <a href="#" className="text-sm font-medium hover:text-blue-600 transition-colors">Media</a>
          </nav>
        </div>
      </header>

      {/* Contenido Dinámico */}
      <main className="container mx-auto py-8 px-4">
        {children}
      </main>

      <footer className="border-t bg-white py-6">
        <div className="container mx-auto text-center text-sm text-slate-500">
          © 2026 Gerardo Ramirez - Full Stack Engineer
        </div>
      </footer>
    </div>
  );
};