export default function FilterBar({ register, handleSubmit }) {
  // Componente `FilterBar` que renderiza un formulario para filtrar datos.
  // Recibe `register` para vincular los campos al formulario y `handleSubmit` para manejar el envío.

  return (
    <form onSubmit={handleSubmit} className="mb-4 p-4 bg-white shadow-md rounded-lg">
      {/* Formulario con estilos para espaciado, sombra y bordes redondeados. */}

      <div className="flex space-x-4">
        {/* Contenedor con diseño flexible y separación horizontal entre campos. */}

        <input
          {...register('description')}
          type="text"
          placeholder="Filtrar por descripción"
          className="w-1/3 p-2 border border-gray-300 rounded-md"
        // Campo para filtrar por descripción, ocupando un tercio del ancho.
        />

        <select {...register('pending')} className="w-1/3 p-2 border border-gray-300 rounded-md">
          {/* Selector para filtrar elementos según estado (pendientes o firmados). */}
          <option value="">Todos</option>
          <option value="true">Pendientes</option>
          <option value="false">Firmados</option>
        </select>

        <input
          {...register('startDate')}
          type="date"
          placeholder="Fecha de inicio"
          className="w-1/3 p-2 border border-gray-300 rounded-md"
        // Campo para filtrar por fecha de inicio.
        />

        <input
          {...register('endDate')}
          type="date"
          placeholder="Fecha de fin"
          className="w-1/3 p-2 border border-gray-300 rounded-md"
        // Campo para filtrar por fecha de fin.
        />

        <button
          type="submit"
          className="p-2 bg-blue-500 text-white rounded-md hover:bg-blue-700 shadow-md transition-all duration-300"
        // Botón para enviar el formulario con estilos interactivos.
        >
          Buscar
        </button>
      </div>
    </form>
  );
}
