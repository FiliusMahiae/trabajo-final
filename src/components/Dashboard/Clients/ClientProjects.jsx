"use client";

import { useEffect, useState } from "react";
import ClientProjectCard from "@/components/Dashboard/Clients/ClientProjectCard";

export default function ClientProjects({ clientId }) {
  const [projects, setProjects] = useState([]);
  const [error, setError] = useState(null);

  // Obtener la lista de proyectos del cliente
  const fetchProjects = async () => {
    const token = localStorage.getItem('jwt');
    if (token) {
      try {
        const response = await fetch("https://bildy-rpmaya.koyeb.app/api/project", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            'Authorization': `Bearer ${token}`
          },
        });
        if (!response.ok) {
          throw new Error("Error al obtener la lista de proyectos");
        }
        const data = await response.json();
        // Filtrar los proyectos por el cliente seleccionado
        const clientProjects = data.filter(project => project.clientId === clientId);
        setProjects(clientProjects);
      } catch (error) {
        setError(error.message);
      }
    }
  };

  useEffect(() => {
    if (clientId) {
      fetchProjects();
    }
  }, [clientId]);

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="mt-8">
      <h2 className="text-xl font-bold mb-4">Proyectos del Cliente</h2>
      {projects.length > 0 ? (
        <div>
          <div className="flex font-bold mb-2">
            <div className="w-1/12">Num.</div>
            <div className="w-3/12">Nombre</div>
            <div className="w-2/12">Código</div>
            <div className="w-3/12">Ciudad</div>
          </div>
          <div className="grid gap-4">
            {projects.map((project, index) => (
              <ClientProjectCard key={project._id} project={project} index={index + 1} />
            ))}
          </div>
        </div>
      ) : (
        <p>Este cliente no tiene proyectos asociados.</p>
      )}
    </div>
  );
}
