"use client";

import ProjectCard from './ProjectCard';

export default function ProjectsTable({ projects }) {
    return (
      <div className="overflow-x-auto w-full shadow-md rounded-lg border border-gray-200">
        <table className="min-w-full bg-white">
          <thead>
            <tr className="bg-gray-100">
              <th className="w-1/6 px-4 py-3 text-left text-gray-700 font-semibold">Código</th>
              <th className="w-1/6 px-4 py-3 text-left text-gray-700 font-semibold">Fecha de creación</th>
              <th className="w-1/6 px-4 py-3 text-left text-gray-700 font-semibold">Nombre</th>
              <th className="w-1/6 px-4 py-3 text-left text-gray-700 font-semibold">Cliente</th>
              <th className="w-1/6 px-4 py-3 text-left text-gray-700 font-semibold">Email</th>
            </tr>
          </thead>
          <tbody>
            {projects.map((project, index) => (
              <tr key={project._id} className={`border-b ${index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}`}>
                <ProjectCard project={project} />
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }