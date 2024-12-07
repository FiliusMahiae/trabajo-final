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
          console.log("Token no encontrado. Redirigiendo al login...");
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
          console.log("Error al obtener los clientes. Redirigiendo al login...");
          return;
        }

        const clients = await response.json();

        // Redirigir según el resultado
        if (clients.length > 0) {
          router.push("/dashboard/clients");
        } else {
          router.push("/dashboard/create-client");
        }
      } catch (error) {
        console.log("Error al obtener los clientes:", error.message);
      }
    };

    fetchClients();
  }, [router]);

  return (
    <div className="text-gray-900 h-full bg-white rounded">
      <p>Redirigiendo...</p>
    </div>
  );
};

export default DashboardPage;
