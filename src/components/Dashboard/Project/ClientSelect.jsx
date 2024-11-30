import useFetchClients from "./useFetchClients";

export default function ClientSelect({ register, errors }) {
    const clients = useFetchClients();

    return (
        <div>
            <label className="block text-sm font-medium mb-2">Cliente</label>
            <select
                {...register("clientId", { required: "El cliente es obligatorio" })}
                className="w-full p-2 border rounded-md"
            >
                <option value="">Selecciona un cliente</option>
                {clients.map(client => (
                    <option key={client._id} value={client._id}>{client.name}</option>
                ))}
            </select>
            {errors.clientId && <span className="text-red-500 text-sm">{errors.clientId.message}</span>}
        </div>
    );
}