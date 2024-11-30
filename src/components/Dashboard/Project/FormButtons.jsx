export default function FormButtons({ reset }) {
    return (
        <div className="flex justify-end gap-4">
            <button 
                type="button" 
                onClick={() => reset()} 
                className="px-4 py-2 border rounded-md text-white bg-red-500 hover:bg-red-600 shadow-md hover:shadow-lg transition-all duration-300"
            >
                Descartar
            </button>
            <button 
                type="submit" 
                className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 shadow-md hover:shadow-lg transition-all duration-300"
            >
                Guardar
            </button>
        </div>
    );
}
