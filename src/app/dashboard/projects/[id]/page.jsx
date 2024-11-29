"use client";

import { useEffect, useState, use } from 'react';

export default function ProjectPage({ params }) {
  const [project, setProject] = useState(null);
  const [client, setClient] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Desestructurar `params` usando `use()`
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
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">{project.name}</h1>
      <div className="flex items-center mb-6">
        <span className="text-gray-600">Código de proyecto:</span>
        <span className="ml-2 font-medium">{project.projectCode}</span>
      </div>
      <div className="flex items-center mb-6">
        <span className="text-gray-600">Cliente:</span>
        {client && client.logo ? (
          <img src={client.logo} alt={client.name} className="h-8 w-8 rounded-full ml-2 mr-2" />
        ) : (
          <img src="/clientPlaceholder.jpg" alt={client.name} className="h-8 w-8 rounded-full ml-2 mr-2" />
        )}
        <span className="font-medium">{client ? client.name : 'Cliente no encontrado'}</span>
      </div>
      <div className="mb-6">
        <h2 className="text-xl font-semibold">Dirección del Proyecto</h2>
        <p>{project.address.street} {project.address.number}, {project.address.postal}</p>
        <p>{project.address.city}, {project.address.province}</p>
      </div>
      <div className="mb-6">
        <h2 className="text-xl font-semibold">Contacto</h2>
        <p>{project.email}</p>
      </div>
    </div>
  );
}



