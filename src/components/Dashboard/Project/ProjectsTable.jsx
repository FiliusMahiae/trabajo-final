"use client";

import { useState, useEffect } from "react";
import ProjectCard from "./ProjectCard";

export default function ProjectsTable({ projects }) {
  const [displayedProjects, setDisplayedProjects] = useState(projects); // Proyectos mostrados
  const [sortConfig, setSortConfig] = useState({ key: null, direction: null });

  useEffect(() => {
    setDisplayedProjects(projects); // Actualizar cuando cambian los proyectos
  }, [projects]);

  const handleSort = (key) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    } else if (sortConfig.key === key && sortConfig.direction === "desc") {
      direction = null; // Sin orden
    }

    let sorted = [...displayedProjects];
    if (direction) {
      sorted.sort((a, b) => {
        if (a[key] < b[key]) return direction === "asc" ? -1 : 1;
        if (a[key] > b[key]) return direction === "asc" ? 1 : -1;
        return 0;
      });
    } else {
      sorted = projects; // Restaurar el orden original
    }

    setDisplayedProjects(sorted);
    setSortConfig({ key, direction });
  };

  const getSortIcon = (key) => {
    if (sortConfig.key !== key) return null;
    if (sortConfig.direction === "asc") return "↑";
    if (sortConfig.direction === "desc") return "↓";
    return null;
  };

  return (
    <div className="overflow-x-auto w-full shadow-md rounded-lg border border-gray-200">
      <div className="min-w-full bg-white">
        <div className="bg-gray-100 grid grid-cols-5 gap-4 px-4 py-3 font-semibold text-gray-700">
          <div
            className="w-1/6 cursor-pointer flex items-center gap-2"
            onClick={() => handleSort("projectCode")}
          >
            Código
            <span>{getSortIcon("projectCode")}</span>
          </div>
          <div
            className="w-1/6 cursor-pointer flex items-center gap-2"
            onClick={() => handleSort("createdAt")}
          >
            Creación
            <span>{getSortIcon("createdAt")}</span>
          </div>
          <div
            className="w-1/6 cursor-pointer flex items-center gap-2"
            onClick={() => handleSort("name")}
          >
            Nombre
            <span>{getSortIcon("name")}</span>
          </div>
          <div className="w-1/6">Cliente</div>
          <div
            className="w-1/6 cursor-pointer flex items-center gap-2"
            onClick={() => handleSort("email")}
          >
            Email
            <span>{getSortIcon("email")}</span>
          </div>
        </div>
        {displayedProjects.map((project, index) => (
          <div
            key={project._id}
            className={`grid grid-cols-5 gap-4 border-b px-4 py-5 ${
              index % 2 === 0 ? "bg-gray-50" : "bg-white"
            }`}
          >
            <ProjectCard project={project} />
          </div>
        ))}
      </div>
    </div>
  );
}
