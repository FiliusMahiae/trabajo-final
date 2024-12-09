"use client";
// Habilita el modo cliente.

import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
// Importa herramientas para manejar estado, efectos y formularios.

import LoadingSpinner from '@/components/Dashboard/Project/LoadingSpinner';
import ErrorNotification from '@/components/Dashboard/Project/ErrorNotification';
import ProjectsTable from '@/components/Dashboard/Project/ProjectsTable';
import FilterBar from '@/components/Dashboard/Project/FilterBar';
// Importa componentes reutilizables para la página de proyectos.

import { useNavbar } from "@/context/NavbarContext";
import getCookie from "@/components/Auth/getCookie";
// Herramientas para manejar contexto de navegación y autenticación.

export default function ProjectsPage() {
  const { updateNavbar } = useNavbar();
  const [projects, setProjects] = useState([]);
  const [filteredProjects, setFilteredProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { register, handleSubmit } = useForm({
    defaultValues: {
      name: '',
      email: '',
      startDate: '',
      endDate: '',
    },
  });
  // Maneja el formulario de filtros.

  useEffect(() => {
    updateNavbar("Proyectos", "Lista de proyectos");
    // Actualiza la barra de navegación.
  }, [updateNavbar]);

  useEffect(() => {
    const fetchProjects = async () => {
      const token = getCookie('jwt');
      if (token) {
        try {
          const response = await fetch('https://bildy-rpmaya.koyeb.app/api/project', {
            headers: {
              "Content-Type": "application/json",
              'Authorization': `Bearer ${token}`,
            },
          });
          const data = await response.json();
          setProjects(data);
          setFilteredProjects(data);
          // Carga y filtra los proyectos.
        } catch (err) {
          setError(err);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchProjects();
    // Carga los proyectos al montar el componente.
  }, []);

  const onSubmit = (filters) => {
    let filtered = projects;

    if (filters.name) {
      filtered = filtered.filter(project =>
        project.name && project.name.toLowerCase().includes(filters.name.toLowerCase())
      );
    }
    if (filters.email) {
      filtered = filtered.filter(project =>
        project.email && project.email.toLowerCase().includes(filters.email.toLowerCase())
      );
    }
    if (filters.startDate && filters.endDate) {
      const startDate = new Date(filters.startDate).setHours(0, 0, 0, 0);
      const endDate = new Date(filters.endDate).setHours(23, 59, 59, 999);
      filtered = filtered.filter(project => {
        const creationDate = new Date(project.createdAt).setHours(0, 0, 0, 0);
        return creationDate >= startDate && creationDate <= endDate;
      });
    }

    setFilteredProjects(filtered);
    // Filtra los proyectos según los criterios seleccionados.
  };

  if (loading) return <LoadingSpinner />;
  // Muestra un spinner mientras los datos se cargan.

  if (error) return <ErrorNotification message={error.message} />;
  // Muestra un mensaje de error si ocurre un problema.

  if (projects.length === 0) return <ErrorNotification message="No hay proyectos disponibles" />;
  // Muestra un mensaje si no hay proyectos.

  return (
    <div className="p-4">
      <FilterBar register={register} handleSubmit={handleSubmit(onSubmit)} />
      {/* Barra de filtros para buscar proyectos. */}
      <ProjectsTable projects={filteredProjects} />
      {/* Tabla que muestra los proyectos filtrados. */}
    </div>
  );
}

