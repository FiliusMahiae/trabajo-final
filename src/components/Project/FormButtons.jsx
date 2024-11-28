export function FormButtons({ reset }) {
    return (
        <div className="flex justify-end gap-4">
            <button type="button" onClick={() => reset()} className="px-4 py-2 border rounded-md">
                Descartar
            </button>
            <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded-md">
                Guardar
            </button>
        </div>
    );
}