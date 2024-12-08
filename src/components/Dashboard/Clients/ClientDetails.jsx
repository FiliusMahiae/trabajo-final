"use client";

import { useForm } from "react-hook-form";
import { useEffect } from "react";
import getCookie from "@/components/Auth/getCookie";
import DeleteClientButton from "./DeleteClientButton";

export default function ClientDetails({ client, onEdit, onDelete }) {
    const { register, handleSubmit, formState: { errors }, reset } = useForm({
        defaultValues: {
            ...client
        },
    });

    useEffect(() => {
        reset({
            ...client
        });
    }, [client, reset]);

    const onSubmit = async (data) => {
        const token = getCookie('jwt');
        try {
            const response = await fetch(`https://bildy-rpmaya.koyeb.app/api/client/${client._id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(data),
            });

            if (!response.ok) {
                throw new Error("Error al actualizar el cliente");
            }

            const updatedClient = await response.json();
            onEdit();
        } catch (error) {
            console.error("Error al actualizar el cliente:", error);
        }
    };

    return (
        <div className="p-8 border rounded-md shadow-sm">
            <div className="flex justify-between items-center mb-4">
                <div>
                    <h2 className="text-2xl font-bold mb-4">Editar Cliente</h2>
                    <p className="text-lg text-gray-600 mb-4">Datos de este cliente</p>
                </div>
                {client.logo ?
                    (<img src={client.logo} alt="Cliente Logo" className=" w-20 h-20 object-cover rounded-full border border-gray-300" />) :
                    (<img src="\clientPlaceholder.jpg" alt="Cliente Logo" className=" w-20 h-20 object-cover rounded-full border border-gray-300" />)}
            </div>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700">Nombre</label>
                    <input
                        type="text"
                        {...register("name", { required: "El nombre es obligatorio", maxLength: { value: 50, message: 'El nombre debe tener menos de 50 caracteres' } })}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-opacity-50"
                    />
                    {errors.name && <span className="text-red-500 text-sm">{errors.name.message}</span>}
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700">CIF</label>
                    <input
                        type="text"
                        {...register("cif", { required: "El CIF es obligatorio", maxLength: { value: 9, message: 'El CIF debe tener 9 carácteres' }, minLength: { value: 9, message: 'El CIF debe tener 9 carácteres' } })}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-opacity-50"
                    />
                    {errors.cif && <span className="text-red-500 text-sm">{errors.cif.message}</span>}
                </div>

                <div className="mb-4 grid grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Calle</label>
                        <input
                            type="text"
                            {...register("address.street", { required: "La calle es obligatoria" })}
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-opacity-50"
                        />
                        {errors.address?.street && <span className="text-red-500 text-sm">{errors.address.street.message}</span>}
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Número (Portal)</label>
                        <input
                            type="number"
                            {...register("address.number", { required: "El número es obligatorio" })}
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-opacity-50"
                        />
                        {errors.address?.number && <span className="text-red-500 text-sm">{errors.address.number.message}</span>}
                    </div>
                </div>

                <div className="mb-4 grid grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Código Postal</label>
                        <input
                            type="number"
                            {...register("address.postal", { required: "El código postal es obligatorio", maxLength: { value: 5, message: 'El Código Postal debe tener 9 carácteres' }, minLength: { value: 5, message: 'El Código Postal debe tener 9 carácteres' } })}
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-opacity-50"
                        />
                        {errors.address?.postal && <span className="text-red-500 text-sm">{errors.address.postal.message}</span>}
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Ciudad</label>
                        <input
                            type="text"
                            {...register("address.city", { required: "La ciudad es obligatoria" })}
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-opacity-50"
                        />
                        {errors.address?.city && <span className="text-red-500 text-sm">{errors.address.city.message}</span>}
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700">Provincia</label>
                    <input
                        type="text"
                        {...register("address.province", { required: "La provincia es obligatoria" })}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-opacity-50"
                    />
                    {errors.address?.province && <span className="text-red-500 text-sm">{errors.address.province.message}</span>}
                </div>

                <div className="mb-4 grid grid-cols-2 gap-4">
                    <DeleteClientButton
                        clientId={client._id}
                        onDelete={onDelete}
                    />
                    <button
                        type="submit"
                        className="w-full py-2 px-4 bg-blue-600 text-white rounded-md shadow-md hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition-all duration-300"
                    >
                        Editar Cliente
                    </button>
                </div>

            </form>
        </div>
    );
}
