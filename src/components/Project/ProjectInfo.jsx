export default function ClientInfo({ client }) {
    return (
      <div className="mb-6">
        <h2 className="text-2xl font-bold mb-4">Cliente</h2>
        {client && client.logo ? (
          <img src={client.logo} alt={client.name} className="h-16 w-16 rounded-full mb-4" />
        ) : (
          <img src="/clientPlaceholder.jpg" alt={client.name} className="h-16 w-16 rounded-full mb-4" />
        )}
        <p className="text-lg font-medium mb-2">{client ? client.name : 'Cliente no encontrado'}</p>
        <p className="text-gray-600">CIF: {client ? client.cif : 'No disponible'}</p>
        <div className="mt-4">
          <h3 className="text-xl font-semibold">Domicilio Fiscal</h3>
          <p>{client ? `${client.address.street} ${client.address.number}, ${client.address.city}, ${client.address.postal}` : 'Domicilio no disponible'}</p>
        </div>
      </div>
    );
  }