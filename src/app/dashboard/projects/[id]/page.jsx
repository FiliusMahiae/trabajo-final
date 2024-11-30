"use client";

import { useEffect, useState, use } from 'react';
import { useNavbar } from "@/context/NavbarContext";
import ClientInfo from '@/components/Project/ProjectInfo';
import ProjectInfo from '@/components/Project/ClientInfo';

export default function ProjectPage({ params }) {
  const { updateNavbar } = useNavbar();
  const [project, setProject] = useState(null);
  const [client, setClient] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    updateNavbar("Peatonalización", "Datos de este Proyecto");
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
    <div className="container mx-auto p-4 flex">

      {/* Project Information - 2/3 of the page */}
      <div className="w-2/3 p-4">
        <ProjectInfo project={project} />
      </div>

      {/* Client Information - 1/3 of the page */}
      <div className="w-1/3 p-4">
        <ClientInfo client={client} />
      </div>
    </div>
  );
}




