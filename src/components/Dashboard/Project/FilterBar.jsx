export default function FilterBar({ register, handleSubmit }) {
    return (
        <form onSubmit={handleSubmit} className="mb-4 p-4 bg-white shadow-md rounded-lg">
            <div className="flex space-x-4">
                <input
                    {...register('name')}
                    type="text"
                    placeholder="Filtrar por nombre"
                    className="w-1/3 p-2 border border-gray-300 rounded-md"
                />
                <input
                    {...register('email')}
                    type="text"
                    placeholder="Filtrar por email"
                    className="w-1/3 p-2 border border-gray-300 rounded-md"
                />
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
                <button type="submit" className="p-2 bg-blue-500 text-white rounded-md">Buscar</button>
            </div>
        </form>
    );
}