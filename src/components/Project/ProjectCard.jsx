"use client";

import React, { useEffect, useState } from 'react';

export default function ProjectCard({ project }) {
    const [client, setClient] = useState(null);
    const [loadingClient, setLoadingClient] = useState(true);
    const [clientError, setClientError] = useState(null);
  
    useEffect(() => {
      const fetchClient = async () => {
        const token = localStorage.getItem('jwt');
        if (token && project.clientId) {
          try {
            const response = await fetch(`https://bildy-rpmaya.koyeb.app/api/client/${project.clientId}`, {
              headers: {
                "Content-Type": "application/json",
                'Authorization': `Bearer ${token}`,
              },
            });
            if (!response.ok) {
              throw new Error('Failed to fetch client data');
            }
            const data = await response.json();
            setClient(data);
          } catch (err) {
            setClientError(err);
          } finally {
            setLoadingClient(false);
          }
        }
      };
  
      fetchClient();
    }, [project.clientId]);
  
    if (loadingClient) {
      return (
        <>
          <td className="w-1/6 px-4 py-5 text-left text-gray-800">{project.projectCode}</td>
          <td className="w-1/6 px-4 py-5 text-left text-gray-800">{new Date(project.createdAt).toLocaleDateString()}</td>
          <td className="w-1/6 px-4 py-5 text-left text-gray-800">{project.name}</td>
          <td className="w-1/6 px-4 py-5 text-left text-gray-800">Cargando cliente...</td>
          <td className="w-1/6 px-4 py-5 text-left text-gray-800">{project.email}</td>
        </>
      );
    }
  
    if (clientError) {
      return (
        <>
          <td className="w-1/6 px-4 py-5 text-left text-gray-800">{project.projectCode}</td>
          <td className="w-1/6 px-4 py-5 text-left text-gray-800">{new Date(project.createdAt).toLocaleDateString()}</td>
          <td className="w-1/6 px-4 py-5 text-left text-gray-800">{project.name}</td>
          <td className="w-1/6 px-4 py-5 text-left text-red-600">Error al cargar cliente</td>
          <td className="w-1/6 px-4 py-5 text-left text-gray-800">{project.email}</td>
        </>
      );
    }
  
    return (
      <>
        <td className="w-1/6 px-4 py-5 text-left text-gray-800">{project.projectCode}</td>
        <td className="w-1/6 px-4 py-5 text-left text-gray-800">{new Date(project.createdAt).toLocaleDateString()}</td>
        <td className="w-1/6 px-4 py-5 text-left text-gray-800">{project.name}</td>
        <td className="w-1/6 px-4 py-5 text-left text-gray-800">
          <div className="flex items-center">
            {client && client.logo ? 
                (<img src={client.logo} alt={client.name} className="h-8 w-8 rounded-full mr-2" />)
                :
                (<img src="/clientPlaceholder.jpg" alt={client.name} className="h-8 w-8 rounded-full mr-2" />)}
            <span>{client ? client.name : 'Cliente no encontrado'}</span>
          </div>
        </td>
        <td className="w-1/6 px-4 py-5 text-left text-gray-800">{project.email}</td>
      </>
    );
  }
