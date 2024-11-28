"use client";

import { useEffect, useState, Suspense } from "react";
import { useNavbar } from "@/context/NavbarContext";
import ClientsList from "@/components/Dashboard/Clients/ClientList";
import ClientDetails from "@/components/Dashboard/Clients/ClientDetails";

export default function PageClients() {
  const { updateNavbar } = useNavbar();
  const [clients, setClients] = useState([]);
  const [selectedClient, setSelectedClient] = useState(null);
  const [error, setError] = useState(null);

  // Usa useEffect para actualizar el estado después del renderizado inicial
  useEffect(() => {
    updateNavbar("Clientes", "Gestión de clientes");
  }, [updateNavbar]);

  // Obtener la lista de clientes
  useEffect(() => {
    const fetchClients = async () => {
      const token = localStorage.getItem('jwt');
      if (token) {
        try {
          const response = await fetch("https://bildy-rpmaya.koyeb.app/api/client", {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              'Authorization': `Bearer ${token}`
            },
          });
          if (!response.ok) {
            throw new Error("Error al obtener la lista de clientes");
          }
          const data = await response.json();
          setClients(data);
        } catch (error) {
          setError(error.message);
        }
      }
    };
    fetchClients();
  }, []);

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="flex p-8 gap-8">
      <div className="w-1/3">
        <h1 className="text-2xl font-bold mb-6">Lista de Clientes</h1>
        <Suspense fallback={<div>Cargando clientes...</div>}>
          <ClientsList clients={clients} onSelect={setSelectedClient} />
        </Suspense>
      </div>
      <div className="w-2/3">
        <h1 className="text-2xl font-bold mb-6">Detalles del cliente</h1>
        {selectedClient ? (
          <ClientDetails client={selectedClient} />
        ) : (
          <div className="p-8 border rounded-md shadow-sm">
            <p>Seleccione un cliente de la lista para ver los detalles.</p>
          </div>
        )}
      </div>
    </div>
  );
}