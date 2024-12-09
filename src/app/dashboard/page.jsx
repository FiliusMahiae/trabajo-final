'use client';
// Habilita el modo cliente para que este componente se ejecute en el navegador.

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import getCookie from "@/components/Auth/getCookie";
// Importa herramientas para efectos, navegación y autenticación.

const DashboardPage = () => {
  const router = useRouter();
  // Instancia del enrutador para realizar redirecciones.

  useEffect(() => {
    const fetchClients = async () => {
      try {
        const token = getCookie('jwt');
        // Obtiene el token JWT desde las cookies.

        if (!token) {
          console.log("Token no encontrado. Redirigiendo al login...");
          return;
        }

        const response = await fetch("https://bildy-rpmaya.koyeb.app/api/client", {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
        });
        // Solicita la lista de clientes usando el token para autenticación.

        if (!response.ok) {
          console.log("Error al obtener los clientes. Redirigiendo al login...");
          return;
        }

        const clients = await response.json();
        // Procesa la respuesta de la API.

        if (clients.length > 0) {
          router.push("/dashboard/clients");
          // Redirige a la lista de clientes si hay clientes disponibles.
        } else {
          router.push("/dashboard/create-client");
          // Redirige a la creación de cliente si no hay clientes.
        }
      } catch (error) {
        console.log("Error al obtener los clientes:", error.message);
      }
    };

    fetchClients();
  }, [router]);
  // Ejecuta `fetchClients` cuando se monta el componente.

  return (
    <div className="text-gray-900 h-full bg-white rounded">
      <p>Redirigiendo...</p>
      {/* Mensaje mientras se realiza la redirección. */}
    </div>
  );
};

export default DashboardPage;
