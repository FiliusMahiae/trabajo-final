'use client';

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import getCookie from "@/components/Auth/getCookie";

const DashboardPage = () => {
  const router = useRouter();

  useEffect(() => {
    const fetchClients = async () => {
      try {
        // Leer el token desde Cookies
        const token = getCookie('jwt');
        if (!token) {
          console.error("Token no encontrado. Redirigiendo al login...");
          router.push("/login");
          return;
        }

        // Realizar la solicitud a la API con las cabeceras
        const response = await fetch("https://bildy-rpmaya.koyeb.app/api/client", {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          console.error("Error al obtener los clientes. Redirigiendo al login...");
          router.push("/login");
          return;
        }

        const clients = await response.json();

        // Redirigir según el resultado
        if (clients.length > 0) {
          router.push("dashboard/clients");
        } else {
          router.push("dashboard/create-client");
        }
      } catch (error) {
        console.error("Error al obtener los clientes:", error.message);
        router.push("/login"); // Redirigir al login en caso de error
      }
    };

    fetchClients();
  }, [router]);

  return (
    <div className="text-gray-900 border border-red-600 h-full bg-white rounded">
      <p>Redirigiendo...</p>
    </div>
  );
};

export default DashboardPage;
