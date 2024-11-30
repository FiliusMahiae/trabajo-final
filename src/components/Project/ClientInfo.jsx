export default function ProjectInfo({ project }) {
    return (
      <>
        <h1 className="text-3xl font-bold mb-4">{project.name}</h1>
        <div className="flex items-center mb-6">
          <span className="text-gray-600">Código Interno:</span>
          <span className="ml-2 font-medium">{project.projectCode}</span>
        </div>
        <div className="flex items-center mb-6">
          <span className="text-gray-600">Ubicación:</span>
          <span className="ml-2 font-medium">{project.address.street} {project.address.number}, {project.address.city}, {project.address.postal}</span>
        </div>
        <div className="flex items-center mb-6">
          <span className="text-gray-600">Fecha de Inicio:</span>
          <span className="ml-2 font-medium">{project.begin}</span>
        </div>
        <div className="flex items-center mb-6">
          <span className="text-gray-600">Fecha de Finalización:</span>
          <span className="ml-2 font-medium">{project.end}</span>
        </div>
      </>
    );
  }