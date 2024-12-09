"use client";
// Habilita el modo cliente para que este componente se ejecute en el navegador.

import { useEffect, useState, Suspense } from "react";
// Importa hooks para manejar estado, efectos y carga diferida de componentes.

import { useNavbar } from "@/context/NavbarContext";
// Contexto para actualizar la barra de navegación.

import ClientsList from "@/components/Dashboard/Clients/ClientList";
import ClientDetails from "@/components/Dashboard/Clients/ClientDetails";
import ClientProjects from "@/components/Dashboard/Clients/ClientProjects";
// Importa componentes reutilizables para la lista de clientes, detalles y proyectos asociados.

import getCookie from "@/components/Auth/getCookie";
// Función para obtener el token JWT desde las cookies.

export default function PageClients() {
    const { updateNavbar } = useNavbar();
    const [clients, setClients] = useState([]);
    const [selectedClient, setSelectedClient] = useState(null);
    const [error, setError] = useState(null);
    // Estados para manejar la lista de clientes, cliente seleccionado y errores.

    useEffect(() => {
        updateNavbar("Clientes", "Gestión de clientes");
        // Actualiza la barra de navegación con el título y descripción adecuados.
    }, [updateNavbar]);

    const fetchClients = async () => {
        const token = getCookie("jwt");
        // Obtiene el token JWT para autenticar la solicitud.

        if (token) {
            try {
                const response = await fetch("https://bildy-rpmaya.koyeb.app/api/client", {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                });

                if (!response.ok) {
                    throw new Error("Error al obtener la lista de clientes");
                }

                const data = await response.json();
                setClients(data);
                // Almacena la lista de clientes en el estado.
            } catch (error) {
                setError(error.message);
                // Maneja errores al obtener los clientes.
            }
        }
    };

    useEffect(() => {
        fetchClients();
        // Carga la lista de clientes al montar el componente.
    }, []);

    if (error) {
        return <div>Error: {error}</div>;
        // Muestra un mensaje de error si ocurre un problema al obtener los datos.
    }

    const handleClientEdit = () => {
        fetchClients();
        // Actualiza la lista de clientes tras editar un cliente.
    };

    const handleClientDelete = (deletedClientId) => {
        fetchClients();
        setSelectedClient(null);
        // Actualiza la lista de clientes y limpia el cliente seleccionado tras eliminarlo.
    };

    return (
        <div className="flex p-8 gap-8">
            {/* Contenedor principal con diseño de columnas para lista y detalles. */}
            <div className="w-1/3">
                <h1 className="text-2xl font-bold mb-6">Lista de Clientes</h1>
                {/* Encabezado de la sección de lista de clientes. */}
                <Suspense fallback={<div>Cargando clientes...</div>}>
                    <ClientsList clients={clients} onSelect={setSelectedClient} />
                    {/* Componente que muestra la lista de clientes con soporte para selección. */}
                </Suspense>
            </div>

            <div className="w-2/3">
                <h1 className="text-2xl font-bold mb-6">Detalles del cliente</h1>
                {/* Encabezado de la sección de detalles del cliente. */}
                {selectedClient ? (
                    <>
                        <ClientDetails
                            client={selectedClient}
                            onEdit={handleClientEdit}
                            onDelete={handleClientDelete}
                            // Pasa las funciones de edición y eliminación al componente de detalles.
                        />
                        <ClientProjects clientId={selectedClient._id} />
                        {/* Componente para mostrar proyectos asociados al cliente seleccionado. */}
                    </>
                ) : (
                    <div className="p-8 border rounded-md shadow-sm">
                        <p>Seleccione un cliente de la lista para ver los detalles.</p>
                        {/* Muestra un mensaje si no hay un cliente seleccionado. */}
                    </div>
                )}
            </div>
        </div>
    );
}