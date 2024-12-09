"use client";
// Habilita el modo cliente.

import { useForm } from "react-hook-form";
import { useEffect } from "react";
import getCookie from "@/components/Auth/getCookie";
// Importa herramientas para manejar formularios, efectos y autenticación.

import DeleteClientButton from "./DeleteClientButton";
// Botón para eliminar el cliente.

export default function ClientDetails({ client, onEdit, onDelete }) {
    // Componente para editar y mostrar detalles de un cliente.
    const { register, handleSubmit, formState: { errors }, reset } = useForm({
        defaultValues: { ...client },
    });
    // Configura el formulario con valores iniciales del cliente.

    useEffect(() => {
        reset({ ...client });
        // Restaura los valores del formulario cuando el cliente cambia.
    }, [client, reset]);

    const onSubmit = async (data) => {
        if (client && client._id) {
            const token = getCookie('jwt');
            // Obtiene el token JWT para autenticar la solicitud.
            try {
                const response = await fetch(`https://bildy-rpmaya.koyeb.app/api/client/${client._id}`, {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                        'Authorization': `Bearer ${token}`,
                    },
                    body: JSON.stringify(data),
                });
                if (!response.ok) throw new Error("Error al actualizar el cliente");
                onEdit();
                // Llama al callback tras una actualización exitosa.
            } catch (error) {
                console.error("Error al actualizar el cliente:", error);
            }
        }
    };

    return (
        <div className="p-8 border rounded-md shadow-sm">
            {/* Contenedor principal con bordes y sombra */}
            <div className="flex justify-between items-center mb-4">
                <div>
                    <h2 className="text-2xl font-bold mb-4">Editar Cliente</h2>
                    <p className="text-lg text-gray-600 mb-4">Datos de este cliente</p>
                </div>
                <img
                    src={client.logo || "/clientPlaceholder.jpg"}
                    alt="Cliente Logo"
                    className="w-20 h-20 object-cover rounded-full border border-gray-300"
                />
                {/* Muestra el logo del cliente o un marcador si no está disponible */}
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                {/* Campo de nombre */}
                <div>
                    <label className="block text-sm font-medium text-gray-700">Nombre</label>
                    <input
                        type="text"
                        {...register("name", { required: "El nombre es obligatorio", maxLength: { value: 50, message: 'El nombre debe tener menos de 50 caracteres' } })}
                        className="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm"
                    />
                    {errors.name && <span className="text-red-500 text-sm">{errors.name.message}</span>}
                </div>

                {/* Campo de CIF */}
                <div>
                    <label className="block text-sm font-medium text-gray-700">CIF</label>
                    <input
                        type="text"
                        {...register("cif", { required: "El CIF es obligatorio", minLength: 9, maxLength: 9 })}
                        className="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm"
                    />
                    {errors.cif && <span className="text-red-500 text-sm">{errors.cif.message}</span>}
                </div>

                {/* Dirección */}
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Calle</label>
                        <input
                            type="text"
                            {...register("address.street", { required: "La calle es obligatoria" })}
                            className="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm"
                        />
                        {errors.address?.street && <span className="text-red-500 text-sm">{errors.address.street.message}</span>}
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Número</label>
                        <input
                            type="number"
                            {...register("address.number", { required: "El número es obligatorio" })}
                            className="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm"
                        />
                        {errors.address?.number && <span className="text-red-500 text-sm">{errors.address.number.message}</span>}
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Código Postal</label>
                        <input
                            type="number"
                            {...register("address.postal", { required: "El código postal es obligatorio", maxLength: 5, minLength: 5 })}
                            className="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm"
                        />
                        {errors.address?.postal && <span className="text-red-500 text-sm">{errors.address.postal.message}</span>}
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Ciudad</label>
                        <input
                            type="text"
                            {...register("address.city", { required: "La ciudad es obligatoria" })}
                            className="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm"
                        />
                        {errors.address?.city && <span className="text-red-500 text-sm">{errors.address.city.message}</span>}
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700">Provincia</label>
                    <input
                        type="text"
                        {...register("address.province", { required: "La provincia es obligatoria" })}
                        className="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm"
                    />
                    {errors.address?.province && <span className="text-red-500 text-sm">{errors.address.province.message}</span>}
                </div>

                {/* Botones de acción */}
                <div className="grid grid-cols-2 gap-4">
                    <button
                        type="submit"
                        className="py-2 px-4 bg-blue-600 text-white rounded-md shadow-md hover:bg-blue-800"
                    >
                        Editar Cliente
                    </button>
                    <DeleteClientButton clientId={client._id} onDelete={onDelete} />
                </div>
            </form>
        </div>
    );
}