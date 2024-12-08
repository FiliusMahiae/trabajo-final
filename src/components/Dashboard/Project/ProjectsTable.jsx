"use client";

import { useState, useEffect } from "react";
import ProjectCard from "./ProjectCard";

export default function ProjectsTable({ projects }) {
  // Estado para los proyectos que se están mostrando en la tabla
  const [displayedProjects, setDisplayedProjects] = useState(projects);
  // Configuración de ordenamiento actual (clave y dirección)
  const [sortConfig, setSortConfig] = useState({ key: null, direction: null });

  // Actualiza los proyectos mostrados cuando la lista de proyectos cambia
  useEffect(() => {
    setDisplayedProjects(projects);
  }, [projects]);

  // Maneja el ordenamiento de la tabla basado en la clave seleccionada
  const handleSort = (key) => {
    let direction = "asc"; // Dirección inicial: ascendente

    // Cambia la dirección si la clave ya está seleccionada
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc"; // Cambiar a descendente
    } else if (sortConfig.key === key && sortConfig.direction === "desc") {
      direction = null; // Elimina el orden
    }

    // Crea una copia de los proyectos mostrados para evitar modificar el estado directamente
    let sorted = [...displayedProjects];

    // Si se ha definido una dirección (ascendente o descendente)
    if (direction) {
      sorted.sort((a, b) => {
        // Compara los valores según la clave seleccionada
        if (a[key] < b[key]) return direction === "asc" ? -1 : 1; // Ordena ascendente o descendente
        if (a[key] > b[key]) return direction === "asc" ? 1 : -1; // Ordena ascendente o descendente
        return 0; // Si son iguales, no cambia el orden
      });
    } else {
      // Si no hay dirección, restaura el orden original de los proyectos
      sorted = projects;
    }

    // Actualiza el estado con los proyectos ordenados o restaurados
    setDisplayedProjects(sorted);
    // Actualiza la configuración de ordenamiento con la clave y dirección actuales
    setSortConfig({ key, direction });
  };

  // Obtiene el icono de orden basado en la clave seleccionada
  const getSortIcon = (key) => {
    if (sortConfig.key !== key) return null; // Sin icono si no coincide la clave
    if (sortConfig.direction === "asc") return "↑"; // Icono ascendente
    if (sortConfig.direction === "desc") return "↓"; // Icono descendente
    return null; // Sin icono si no hay orden
  };

  return (
    <div className="overflow-x-auto w-full shadow-md rounded-lg border border-gray-200">
      <div className="min-w-full bg-white">
        {/* Encabezados de la tabla con opciones de ordenamiento */}
        <div className="bg-gray-100 grid grid-cols-6 gap-4 px-4 py-3 font-semibold text-gray-700">
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
          <div
            className="w-1/6 flex items-end gap-2"
          >
            Acciones
          </div>
        </div>

        {/* Filas de la tabla para cada proyecto */}
        {displayedProjects.map((project, index) => (
          <div
            key={project._id}
            className={`grid grid-cols-6 gap-4 border-b px-4 py-5 ${index % 2 === 0 ? "bg-gray-50" : "bg-white"
              }`}
          >
            <ProjectCard
              key={project._id}
              project={project}
              onDelete={(deletedId) =>
                setDisplayedProjects((prev) => prev.filter((p) => p._id !== deletedId))
              }
            />
          </div>
        ))}
      </div>
    </div>
  );
}

