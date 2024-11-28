export default function ClientCard({ client, onSelect }) {
    return (
      <li key={client._id} className="p-4 border rounded-md shadow-sm hover:shadow-md transition-shadow">
        <button onClick={() => onSelect(client)} className="block text-lg font-medium text-blue-600 hover:underline">
          {client.name}
        </button>
        <p className="text-sm text-gray-600">CIF: {client.cif}</p>
        <p className="text-sm text-gray-600">Dirección: {client.address.street}, {client.address.number}, {client.address.postal}, {client.address.city}, {client.address.province}</p>
        <p className="text-sm text-gray-600">Proyectos Activos: {client.activeProjects}</p>
        <p className="text-sm text-gray-600">Albaranes Pendientes: {client.pendingDeliveryNotes}</p>
      </li>
    );
  }
  