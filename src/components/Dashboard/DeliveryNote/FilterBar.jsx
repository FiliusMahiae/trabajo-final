export default function FilterBar({ register, handleSubmit }) {
    return (
      <form onSubmit={handleSubmit} className="mb-4 p-4 bg-white shadow-md rounded-lg">
        <div className="flex space-x-4">
          <input
            {...register('description')}
            type="text"
            placeholder="Filtrar por descripción"
            className="w-1/3 p-2 border border-gray-300 rounded-md"
          />
          <select {...register('pending')} className="w-1/3 p-2 border border-gray-300 rounded-md">
            <option value="">Todos</option>
            <option value="true">Pendientes</option>
            <option value="false">Firmados</option>
          </select>
          <input
            {...register('startDate')}
            type="date"
            placeholder="Fecha de inicio"
            className="w-1/3 p-2 border border-gray-300 rounded-md"
          />
          <input
            {...register('endDate')}
            type="date"
            placeholder="Fecha de fin"
            className="w-1/3 p-2 border border-gray-300 rounded-md"
          />
          <button type="submit" className="p-2 bg-blue-500 text-white rounded-md hover:bg-blue-700 shadow-md transition-all duration-300">Buscar</button>
        </div>
      </form>
    );
  }
  