export default function ClientInfo({ client }) {
  // Componente `ClientInfo` que muestra información detallada de un cliente.

  return (
    <div className="flex items-center gap-6 mb-6 bg-gray-50 p-6 rounded-2xl">
      {/* Contenedor principal con diseño flexible y estilos para separación y fondo. */}

      <div className="flex-1">
        {/* Sección de texto con detalles del cliente. */}
        <h2 className="text-2xl font-bold mb-4 text-gray-800">Cliente</h2>
        <p className="text-lg font-medium text-gray-900 mb-2">
          {client ? client.name : 'Cliente no encontrado'}
          {/* Nombre del cliente o mensaje de error si no se encuentra. */}
        </p>
        <p className="text-gray-600 text-sm">
          CIF: {client ? client.cif : 'No disponible'}
          {/* Muestra el CIF o un mensaje si no está disponible. */}
        </p>
        <div className="mt-4">
          <h3 className="text-xl font-semibold text-gray-800 mb-1">Domicilio Fiscal</h3>
          <p className="text-gray-700 text-sm">
            {client
              ? `${client.address.street} ${client.address.number}, ${client.address.city}, ${client.address.postal}`
              : 'Domicilio no disponible'}
            {/* Dirección completa del cliente o mensaje de error si no está disponible. */}
          </p>
        </div>
      </div>

      <div>
        {/* Sección de imagen del cliente. */}
        {client && client.logo ? (
          <img
            src={client.logo}
            alt={client.name}
            className="h-24 w-24 rounded-full border-2 border-gray-200 shadow-md"
            // Muestra el logo del cliente con estilo redondeado y sombra.
          />
        ) : (
          <img
            src="/clientPlaceholder.jpg"
            alt="Cliente no disponible"
            className="h-24 w-24 rounded-full border-2 border-gray-200 shadow-md"
            // Muestra una imagen de marcador si no hay logo.
          />
        )}
      </div>
    </div>
  );
}

