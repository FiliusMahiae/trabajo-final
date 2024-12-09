"use client";

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import getCookie from "@/components/Auth/getCookie";
import DeleteButton from './DeleteButton';

export default function ProjectCard({ project, onDelete }) {
    const [client, setClient] = useState(null);
    const [loadingClient, setLoadingClient] = useState(true);
    const [clientError, setClientError] = useState(null);

    useEffect(() => {
        const fetchClient = async () => {
            const token = getCookie('jwt');
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
                <div className="w-1/6 text-left text-gray-800">{project.projectCode}</div>
                <div className="w-1/6 text-left text-gray-800">{new Date(project.createdAt).toLocaleDateString()}</div>
                <div className="w-auto text-left text-gray-800">{project.name}</div>
                <div className="w-1/6 text-left text-gray-800">Cargando cliente...</div>
                <div className="w-1/6 text-left text-gray-800">{project.email}</div>
            </>
        );
    }

    if (clientError) {
        return (
            <>
                <div className="w-1/6 text-left text-gray-800">{project.projectCode}</div>
                <div className="w-1/6 text-left text-gray-800">{new Date(project.createdAt).toLocaleDateString()}</div>
                <div className="w-auto text-left text-gray-800">{project.name}</div>
                <div className="w-1/6 text-left text-red-600">Error al cargar cliente</div>
                <div className="w-1/6 text-left text-gray-800">{project.email}</div>
            </>
        );
    }

    return (
        <>
            <Link href={`/dashboard/projects/${project._id}`}>
                <div className="w-1/6 text-left text-gray-800 underline hover:scale-105">{project.projectCode}</div>
            </Link>
            <div className="w-1/6 text-left text-gray-800">{new Date(project.createdAt).toLocaleDateString()}</div>
            <div className="w-auto text-left text-gray-800">{project.name}</div>
            <div className="w-auto text-left text-gray-800">
                <div className="flex items-center">
                    <img
                        src={client.logo || "/clientPlaceholder.jpg"}
                        alt={client.name || "Cliente no encontrado"}
                        className="h-8 w-8 rounded-full mr-2"
                    />
                    <span>{client.name || "Cliente no encontrado"}</span>
                </div>
            </div>
            <div className="w-1/6 text-left text-gray-800">{project.email}</div>
            <DeleteButton
                itemId={project._id}
                deleteUrl="https://bildy-rpmaya.koyeb.app/api/project/{id}"
                onDelete={onDelete}
                confirmMessage="¿Estás seguro de que deseas eliminar este proyecto?"
            />
        </>
    );
}

