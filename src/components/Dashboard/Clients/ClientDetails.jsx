import React from "react";

export default function ClientDetails({ client }) {
  return (
    <div className="p-8 border rounded-md shadow-sm">
      <h2 className="text-2xl font-bold mb-4">{client.name}</h2>
      <p className="text-sm text-gray-600">CIF: {client.cif}</p>
      <p className="text-sm text-gray-600">Dirección: {client.address.street}, {client.address.number}, {client.address.postal}, {client.address.city}, {client.address.province}</p>
      <p className="text-sm text-gray-600">Proyectos Activos: {client.activeProjects}</p>
      <p className="text-sm text-gray-600">Albaranes Pendientes: {client.pendingDeliveryNotes}</p>
    </div>
  );
}