"use client";

import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import LoadingSpinner from '@/components/Project/LoadingSpinner';
import ErrorNotification from '@/components/Project/ErrorNotification';
import ProjectsTable from '@/components/Project/ProjectsTable';
import FilterBar from '@/components/Project/FilterBar';

export default function ProjectsPage() {
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

  useEffect(() => {
    const fetchProjects = async () => {
      const token = localStorage.getItem('jwt');
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
        } catch (err) {
          setError(err);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchProjects();
  }, []);

  const onSubmit = (filters) => {
    let filtered = projects;
    if (filters.name) {
      filtered = filtered.filter(project => project.name && project.name.toLowerCase().includes(filters.name.toLowerCase()));
    }
    if (filters.email) {
      filtered = filtered.filter(project => project.email && project.email.toLowerCase().includes(filters.email.toLowerCase()));
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
  }; 

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorNotification message={error.message} />;
  if (projects.length === 0) return <ErrorNotification message="No hay proyectos disponibles" />;

  return (
    <div className="p-4">
      <FilterBar register={register} handleSubmit={handleSubmit(onSubmit)} />
      <ProjectsTable projects={filteredProjects} />
    </div>
  );
}
