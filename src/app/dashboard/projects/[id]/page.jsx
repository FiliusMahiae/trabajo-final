"use client";

import { useEffect, useState, use } from 'react';
import { useNavbar } from "@/context/NavbarContext";
import ClientInfo from '@/components/Project/ClientInfo';
import ProjectInfo from '@/components/Project/ProjectInfo';

export default function ProjectPage({ params }) {
  const { updateNavbar } = useNavbar();
  const [project, setProject] = useState(null);
  const [client, setClient] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    updateNavbar("Proyecto", "Datos de este Proyecto");
  }, [updateNavbar]);

  const { id } = use(params);

  useEffect(() => {
    const fetchProject = async () => {
      const token = localStorage.getItem('jwt');
      if (token && id) {
        try {
          // Fetch the project data
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

          // Fetch the client data for the project
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
        } catch (err) {
          setError(err);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchProject();
  }, [id]);

  if (loading) {
    return <div>Cargando proyecto...</div>;
  }

  if (error) {
    return <div>Error al cargar proyecto: {error.message}</div>;
  }

  return (
    <div className="container mx-auto p-8 bg-gradient-to-br from-gray-50 to-gray-100 rounded-3xl shadow-lg flex gap-8">
      {/* Información del Proyecto */}
      <div className="w-2/3 p-8 bg-white border border-gray-200 rounded-3xl shadow-md transition-transform hover:scale-105 hover:shadow-lg">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 border-b border-gray-300 pb-2">
          Información del Proyecto
        </h2>
        <ProjectInfo project={project} />
      </div>

      {/* Información del Cliente */}
      <div className="w-1/3 p-8 bg-white border border-gray-200 rounded-3xl shadow-md transition-transform hover:scale-105 hover:shadow-lg">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 border-b border-gray-300 pb-2">
          Información del Cliente
        </h2>
        <ClientInfo client={client} />
      </div>
    </div>


  );
}




