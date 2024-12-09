import useFetchClients from "./useFetchClients";
// Hook personalizado para obtener la lista de clientes.

export default function ClientSelect({ register, errors }) {
    // Componente `ClientSelect` para seleccionar un cliente.
    // Recibe `register` para vincular el campo al formulario y `errors` para mostrar errores de validación.

    const clients = useFetchClients();
    // Obtiene la lista de clientes usando el hook `useFetchClients`.

    return (
        <div>
            <label className="block text-sm font-medium mb-2">Cliente</label>
            {/* Etiqueta del campo de selección. */}
            
            <select
                {...register("clientId", { required: "El cliente es obligatorio" })}
                // Campo vinculado al formulario con validación `required`.
                className="w-full p-2 border rounded-md"
            >
                <option value="">Selecciona un cliente</option>
                {/* Opción predeterminada. */}
                
                {clients.map(client => (
                    <option key={client._id} value={client._id}>{client.name}</option>
                    // Genera opciones dinámicamente con los datos de los clientes.
                ))}
            </select>
            {errors.clientId && <span className="text-red-500 text-sm">{errors.clientId.message}</span>}
            {/* Muestra un mensaje de error si no se selecciona un cliente. */}
        </div>
    );
}
