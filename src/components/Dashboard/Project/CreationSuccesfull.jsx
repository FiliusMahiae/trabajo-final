export default function Modal({ message, onClose }) {
    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-white p-8 rounded shadow-lg text-center max-w-sm mx-auto">
                <img
                    src="/like.svg"
                    alt="Success Tick"
                    className="mx-auto mb-4 w-16 h-16"
                />
                <h2 className="text-2xl font-bold mb-4">{message || "¡Acción completada con éxito!"}</h2>
                <button
                    onClick={onClose}
                    className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                >
                    Continuar
                </button>
            </div>
        </div>
    );
}