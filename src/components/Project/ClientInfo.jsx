export default function ClientInfo({ client }) {
  return (
    <div className="flex items-center gap-6 mb-6 bg-gray-50 p-6 rounded-2xl">
      {/* Texto a la izquierda */}
      <div className="flex-1">
        <h2 className="text-2xl font-bold mb-4 text-gray-800">Cliente</h2>
        <p className="text-lg font-medium text-gray-900 mb-2">
          {client ? client.name : 'Cliente no encontrado'}
        </p>
        <p className="text-gray-600 text-sm">
          CIF: {client ? client.cif : 'No disponible'}
        </p>
        <div className="mt-4">
          <h3 className="text-xl font-semibold text-gray-800 mb-1">Domicilio Fiscal</h3>
          <p className="text-gray-700 text-sm">
            {client
              ? `${client.address.street} ${client.address.number}, ${client.address.city}, ${client.address.postal}`
              : 'Domicilio no disponible'}
          </p>
        </div>
      </div>

      {/* Imagen a la derecha */}
      <div>
        {client && client.logo ? (
          <img
            src={client.logo}
            alt={client.name}
            className="h-24 w-24 rounded-full border-2 border-gray-200 shadow-md"
          />
        ) : (
          <img
            src="/clientPlaceholder.jpg"
            alt="Cliente no disponible"
            className="h-24 w-24 rounded-full border-2 border-gray-200 shadow-md"
          />
        )}
      </div>
    </div>
  );
}
