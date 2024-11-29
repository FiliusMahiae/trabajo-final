"use client";

import ProjectCard from './ProjectCard';

export default function ProjectsTable({ projects }) {
  return (
    <div className="overflow-x-auto w-full shadow-md rounded-lg border border-gray-200">
      <div className="min-w-full bg-white">
        <div className="bg-gray-100 grid grid-cols-5 gap-4 px-4 py-3 font-semibold text-gray-700">
          <div className="w-1/6">Código</div>
          <div className="w-1/6">Creación</div>
          <div className="w-1/6">Nombre</div>
          <div className="w-1/6">Cliente</div>
          <div className="w-1/6">Email</div>
        </div>
        {projects.map((project, index) => (
          <div key={project._id} className={`grid grid-cols-5 gap-4 border-b px-4 py-5 ${index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}`}>
            <ProjectCard project={project} />
          </div>
        ))}
      </div>
    </div>
  );
}