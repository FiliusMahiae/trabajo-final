"use client";
// Habilita el modo cliente para que este componente funcione en el navegador.

import React, { useEffect, useState } from 'react';
// Importa React y los hooks `useEffect` y `useState` para manejar estado y efectos secundarios.

import Link from 'next/link';
// Importa `Link` de Next.js para manejar la navegación interna optimizada.

import getCookie from "@/components/Auth/getCookie";
// Importa una función para obtener cookies, utilizada aquí para recuperar el token de autenticación.

import DeleteButton from './DeleteButton';
// Importa el componente `DeleteButton`, que se usa para eliminar proyectos.

export default function ProjectCard({ project, onDelete }) {
    // Componente que representa una tarjeta para mostrar información de un proyecto.

    const [client, setClient] = useState(null);
    // Estado para almacenar los datos del cliente asociado al proyecto.

    const [loadingClient, setLoadingClient] = useState(true);
    // Estado para indicar si los datos del cliente están cargando.

    const [clientError, setClientError] = useState(null);
    // Estado para manejar errores al obtener los datos del cliente.

    useEffect(() => {
        const fetchClient = async () => {
            const token = getCookie('jwt');
            // Obtiene el token de autenticación de las cookies.

            if (token && project.clientId) {
                // Verifica que exista un token y un `clientId` válido antes de realizar la solicitud.
                try {
                    const response = await fetch(
                        `https://bildy-rpmaya.koyeb.app/api/client/${project.clientId}`,
                        {
                            headers: {
                                "Content-Type": "application/json",
                                'Authorization': `Bearer ${token}`,
                            },
                        }
                    );
                    if (!response.ok) {
                        throw new Error('Failed to fetch client data');
                        // Lanza un error si la respuesta no es satisfactoria.
                    }
                    const data = await response.json();
                    setClient(data);
                    // Actualiza el estado con los datos del cliente.
                } catch (err) {
                    setClientError(err);
                    // Maneja cualquier error que ocurra durante la solicitud.
                } finally {
                    setLoadingClient(false);
                    // Asegura que el estado de carga sea falso al finalizar.
                }
            }
        };

        fetchClient();
        // Llama a `fetchClient` cada vez que `project.clientId` cambie.
    }, [project.clientId]);

    if (loadingClient) {
        // Si los datos del cliente están cargando, muestra un indicador de carga.
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
        // Si hay un error al cargar el cliente, muestra un mensaje de error.
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

    // Si los datos del cliente se cargaron correctamente, muestra la información del cliente y el proyecto.
    return (
        <>
            <Link href={`/dashboard/projects/${project._id}`} className='self-center'>
                {/* Enlace al detalle del proyecto con estilo interactivo. */}
                <div className="w-1/6 text-left self-center text-gray-800 underline hover:scale-105">{project.projectCode}</div>
            </Link>
            <div className="w-1/6 text-left self-center text-gray-800">{new Date(project.createdAt).toLocaleDateString()}</div>
            <div className="w-auto text-left self-center text-gray-800">{project.name}</div>
            <div className="w-auto text-left self-center text-gray-800">
                <div className="flex items-center">
                    <img
                        src={client.logo || "/clientPlaceholder.jpg"}
                        alt={client.name || "Cliente no encontrado"}
                        className="h-8 w-8 rounded-full mr-2"
                    />
                    {/* Muestra el logo del cliente o una imagen predeterminada si no existe. */}
                    <span>{client.name || "Cliente no encontrado"}</span>
                    {/* Muestra el nombre del cliente o un mensaje de error si no está disponible. */}
                </div>
            </div>
            <div className="w-1/6 text-left self-center text-gray-800">{project.email}</div>
            <DeleteButton
                itemId={project._id}
                deleteUrl="https://bildy-rpmaya.koyeb.app/api/project/{id}"
                onDelete={onDelete}
                confirmMessage="¿Estás seguro de que deseas eliminar este proyecto?"
            />
            {/* Botón para eliminar el proyecto con confirmación de acción. */}
        </>
    );
}