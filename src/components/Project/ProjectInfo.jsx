export default function ProjectInfo({ project }) {
  return (
    <div className="bg-gradient-to-br from-white via-gray-50 to-gray-100 p-4 rounded-xl shadow-md">
      <h1 className="text-3xl font-bold text-gray-900 mb-4 border-b border-gray-300 pb-2">
        {project.name}
      </h1>

      {/* Código Interno */}
      <div className="mb-4">
        <h3 className="text-base font-semibold text-gray-600 uppercase tracking-wide">Código Interno</h3>
        <p className="text-gray-800 text-sm mt-1">{project.projectCode}</p>
      </div>

      {/* Ubicación */}
      <div className="mb-4">
        <h3 className="text-base font-semibold text-gray-600 uppercase tracking-wide">Ubicación</h3>
        <p className="text-gray-800 text-sm mt-1">
          {project.address.street} {project.address.number}, {project.address.city}, {project.address.postal}
        </p>
      </div>

      {/* Fecha de Inicio */}
      <div className="mb-4">
        <h3 className="text-base font-semibold text-gray-600 uppercase tracking-wide">Fecha de Inicio</h3>
        <p className="text-gray-800 text-sm mt-1">{new Date(project.createdAt).toLocaleDateString()}</p>
      </div>
    </div>
  );
}



  