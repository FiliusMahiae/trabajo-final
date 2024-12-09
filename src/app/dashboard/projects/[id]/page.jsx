"use client";
// Habilita el modo cliente para que este componente se ejecute en el navegador.

import { useEffect, useState, use } from 'react';
// Importa hooks para manejar estado, efectos y parámetros de la URL.

import { useNavbar } from '@/context/NavbarContext';
// Contexto para actualizar la barra de navegación.

import ClientInfo from '@/components/Dashboard/Project/ClientInfo';
import ProjectInfo from '@/components/Dashboard/Project/ProjectInfo';
import ProjectAlbaranList from '@/components/Dashboard/Project/ProjectAlbaranList';
// Componentes para mostrar información del cliente, proyecto y lista de albaranes.

import getCookie from "@/components/Auth/getCookie";
// Función para obtener el token de autenticación desde las cookies.

export default function ProjectPage({ params }) {
  const { updateNavbar } = useNavbar();
  const [project, setProject] = useState(null);
  const [client, setClient] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  // Estados para manejar datos del proyecto, cliente, errores y estado de carga.

  useEffect(() => {
    updateNavbar("Proyecto", "Datos de este Proyecto");
    // Actualiza el título y la descripción de la barra de navegación.
  }, [updateNavbar]);

  const { id } = use(params);
  // Extrae el ID del proyecto desde los parámetros de la URL.

  useEffect(() => {
    const fetchProject = async () => {
      const token = getCookie('jwt');
      // Obtiene el token JWT desde las cookies.

      if (token && id) {
        try {
          // Solicita los datos del proyecto.
          const projectResponse = await fetch(`https://bildy-rpmaya.koyeb.app/api/project/one/${id}`, {
            headers: {
              "Content-Type": "application/json",
              'Authorization': `Bearer ${token}`,
            },
          });

          if (!projectResponse.ok) {
            throw new Error('Failed to fetch project data');
          }

          const projectData = await projectResponse.json();
          setProject(projectData);
          // Almacena los datos del proyecto.

          // Solicita los datos del cliente asociado al proyecto.
          const clientResponse = await fetch(`https://bildy-rpmaya.koyeb.app/api/client/${projectData.clientId}`, {
            headers: {
              "Content-Type": "application/json",
              'Authorization': `Bearer ${token}`,
            },
          });

          if (!clientResponse.ok) {
            throw new Error('Failed to fetch client data');
          }

          const clientData = await clientResponse.json();
          setClient(clientData);
          // Almacena los datos del cliente.

        } catch (err) {
          setError(err);
          // Maneja errores durante las solicitudes.
        } finally {
          setLoading(false);
          // Finaliza el estado de carga.
        }
      }
    };

    fetchProject();
    // Llama a la función para cargar los datos del proyecto y cliente.
  }, [id]);

  if (loading) {
    return <div>Cargando proyecto...</div>;
    // Muestra un mensaje de carga mientras se obtienen los datos.
  }

  if (error) {
    return <div>Error al cargar proyecto: {error.message}</div>;
    // Muestra un mensaje de error si ocurre algún problema.
  }

  return (
    <div className="container mx-auto p-8 bg-gradient-to-br from-gray-50 to-gray-100 rounded-3xl shadow-lg flex flex-col gap-8">
      {/* Contenedor principal con diseño limpio y responsivo. */}

      <div className="w-full p-8 bg-white border border-gray-200 rounded-3xl shadow-md transition-transform hover:scale-105 hover:shadow-lg">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 border-b border-gray-300 pb-2">
          Información del Proyecto
        </h2>
        <ProjectInfo project={project} />
        {/* Muestra los detalles del proyecto utilizando `ProjectInfo`. */}
      </div>

      <div className="w-full p-8 bg-white border border-gray-200 rounded-3xl shadow-md transition-transform hover:scale-105 hover:shadow-lg">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 border-b border-gray-300 pb-2">
          Información del Cliente
        </h2>
        <ClientInfo client={client} />
        {/* Muestra los detalles del cliente utilizando `ClientInfo`. */}
      </div>

      <div className="w-full p-8 bg-white border border-gray-200 rounded-3xl shadow-md transition-transform hover:scale-105 hover:shadow-lg">
        <ProjectAlbaranList projectId={project._id} clientId={project.clientId} />
        {/* Lista de albaranes asociados al proyecto utilizando `ProjectAlbaranList`. */}
      </div>
    </div>
  );
}