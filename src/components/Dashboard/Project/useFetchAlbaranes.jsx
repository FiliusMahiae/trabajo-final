"use client";
// Habilita el modo cliente para que este hook funcione en el navegador.

import getCookie from "@/components/Auth/getCookie";
// Importa una función para obtener cookies, utilizada aquí para recuperar el token de autenticación.

import { useState, useEffect } from "react";
// Importa hooks de React para manejar el estado y efectos secundarios.

export default function useFetchAlbaranes(projectId) {
  // Hook personalizado para obtener albaranes asociados a un proyecto específico.

  const [albaranes, setAlbaranes] = useState([]);
  // Estado para almacenar los albaranes obtenidos.

  const [loading, setLoading] = useState(true);
  // Estado para indicar si los datos están cargando.

  const [error, setError] = useState(null);
  // Estado para manejar errores en la obtención de datos.

  const fetchAlbaranes = async () => {
    // Función asíncrona que realiza la solicitud para obtener los albaranes.
    const token = getCookie("jwt");
    // Obtiene el token de autenticación de las cookies.

    if (token && projectId) {
      try {
        setLoading(true);
        setError(null);
        // Realiza la solicitud a la API con el token y el `projectId`.
        const response = await fetch(
          `https://bildy-rpmaya.koyeb.app/api/deliverynote/project/${projectId}`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (!response.ok) throw new Error("Error al obtener albaranes");
        // Manejo de errores si la respuesta no es satisfactoria.
        const data = await response.json();
        setAlbaranes(data);
        // Actualiza el estado con los datos obtenidos.
      } catch (err) {
        setError(err);
        // Maneja errores durante la solicitud.
      } finally {
        setLoading(false);
        // Asegura que el estado de carga sea falso al finalizar.
      }
    }
  };

  useEffect(() => {
    fetchAlbaranes();
    // Llama a `fetchAlbaranes` cada vez que `projectId` cambie.
  }, [projectId]);

  return { albaranes, loading, error, fetchAlbaranes };
  // Retorna el estado y la función para ser usados en componentes.
}