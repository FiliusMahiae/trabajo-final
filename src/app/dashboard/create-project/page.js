"use client";

import React, { useEffect, useState } from 'react';
import ProjectCard from '@/components/Project/ProjectCard';

export default function ProjectsPage() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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
        } catch (err) {
          setError(err);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchProjects();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Something went wrong: {error.message}</p>;

  return (
    <div className="p-4">
      <div className="overflow-x-auto w-full">
        <table className="min-w-full bg-white">
          <thead>
            <tr>
              <th className="w-1/6 px-4 py-2 text-left text-gray-600">Código</th>
              <th className="w-1/6 px-4 py-2 text-left text-gray-600">Fecha</th>
              <th className="w-1/6 px-4 py-2 text-left text-gray-600">Nombre</th>
              <th className="w-1/6 px-4 py-2 text-left text-gray-600">Cliente</th>
              <th className="w-1/6 px-4 py-2 text-left text-gray-600">Email</th>
            </tr>
          </thead>
          <tbody>
            {projects.map((project) => (
              <tr key={project._id} className="border-b">
                <ProjectCard project={project} />
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

