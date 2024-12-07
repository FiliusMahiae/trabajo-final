export default function FilterBar({ register, handleSubmit }) {
    return (
        <form onSubmit={handleSubmit} className="mb-4 p-4 bg-white shadow-md rounded-lg">
            <div className="flex space-x-4">
                <input
                    {...register('name')}
                    type="text"
                    placeholder="Filtrar por nombre"
                    className="w-1/3 p-2 border border-gray-300 rounded-md shadow-sm"
                />
                <input
                    {...register('email')}
                    type="text"
                    placeholder="Filtrar por email"
                    className="w-1/3 p-2 border border-gray-300 rounded-md shadow-sm"
                />
                <input
                    {...register('startDate')}
                    type="date"
                    placeholder="Fecha de inicio"
                    className="w-1/3 p-2 border border-gray-300 rounded-md shadow-sm"
                />
                <input
                    {...register('endDate')}
                    type="date"
                    placeholder="Fecha de fin"
                    className="w-1/3 p-2 border border-gray-300 rounded-md shadow-sm"
                />
                <button type="submit" className="p-2 bg-blue-500 text-white rounded-md hover:bg-blue-700 shadow-md transition-all duration-300">Buscar</button>
            </div>
        </form>
    );
}