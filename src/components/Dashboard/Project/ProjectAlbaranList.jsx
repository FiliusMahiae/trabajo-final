"use client";

import AlbaranForm from "./AlbaranForm";
import AlbaranList from "./AlbaranList";
import useFetchAlbaranes from "./useFetchAlbaranes";

export default function ProjectAlbaranList({ projectId, clientId }) {
  const { albaranes, loading, error, fetchAlbaranes } = useFetchAlbaranes(projectId);

  if (loading) {
    return <p>Cargando albaranes...</p>;
  }

  if (error) {
    return <p>Error al cargar albaranes: {error.message}</p>;
  }

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Albaranes del Proyecto</h2>
      <AlbaranForm 
        projectId={projectId} 
        clientId={clientId} 
        onNewAlbaran={fetchAlbaranes} 
      />
      <AlbaranList albaranes={albaranes} />
    </div>
  );
}
