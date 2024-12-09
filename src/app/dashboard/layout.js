import { NavbarProvider } from "../../context/NavbarContext";
// Proporciona el contexto para gestionar el estado de la barra de navegación.

import Sidebar from '../../components/Dashboard/Sidebar/Sidebar';
import Navbar from '../../components/Dashboard/Navbar/Navbar';
// Importa componentes reutilizables de la barra lateral y la barra de navegación.

const DashboardLayout = ({ children }) => {
  // Diseña la disposición principal del panel de control.

  return (
    <NavbarProvider>
      {/* Proporciona el contexto a todos los componentes hijos. */}
      <div className="flex h-screen bg-gray-100 overflow-hidden">
        {/* Contenedor principal con diseño de flexbox y fondo gris claro. */}
        
        <div className="w-1/5">
          <Sidebar />
          {/* Barra lateral que ocupa un quinto del ancho. */}
        </div>

        <div className="w-4/5 flex flex-col">
          {/* Contenedor principal de contenido, ocupa el resto del ancho. */}
          <Navbar />
          {/* Barra de navegación superior. */}
          <main className="flex-1 overflow-auto p-3 bg-slate-400">
            {/* Contenido principal con relleno y fondo gris oscuro. */}
            <div className="text-gray-900 bg-slate-100 border p-3 h-auto rounded-xl">
              {children}
              {/* Contenido dinámico del panel de control. */}
            </div>
          </main>
        </div>
      </div>
    </NavbarProvider>
  );
};

export default DashboardLayout;

