"use client";

import { useEffect } from "react";
import { useNavbar } from "@/context/NavbarContext";
import { useForm } from "react-hook-form";
import Link from "next/link";

import { useState } from "react";

export default function PageCreateClient() {
  const { updateNavbar } = useNavbar();
  const [message, setMessage] = useState(false);
  const { register, handleSubmit, formState: { errors }, reset } = useForm();

  // Usa useEffect para actualizar el estado después del renderizado inicial
  useEffect(() => {
    updateNavbar("Crear Cliente", "Creación de clientes");
  }, [updateNavbar]);

  // Manejador del formulario
  const showMessage = () => {
    setMessage(true);
    setTimeout(() => setMessage(false), 3000);
  };

  const onSubmit = async (data) => {
    const token = localStorage.getItem('jwt');
    if(token){
      try {
        const response = await fetch("https://bildy-rpmaya.koyeb.app/api/client", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify(data),
        });
        if (!response.ok) {
          throw new Error("Error en la respuesta del servidor");
        }
        const result = await response.json();
        console.log("Cliente creado:", result);
      reset();
      showMessage();
      } catch (error) {
        console.error("Error al crear cliente:", error);
      }
    }
  };

  return (
    <div className="text-gray-900 p-8">
      <h1 className="text-2xl font-bold mb-6">Crear Cliente</h1>
      {message && <div className="mb-4 p-4 bg-green-100 text-green-700 rounded">Cliente creado con éxito</div>}
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Nombre</label>
          <input
            type="text"
            {...register("name", { required: "El nombre es obligatorio", maxLength: { value: 50, message: 'El nombre debe tener menos de 50 caracteres' }})}
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
          <Link href="/dashboard/clients">
            <button
              type="button"
              className="w-full py-2 px-4 white text-red-600 border border-red-600 rounded-md hover:bg-red-600 hover:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50">
              Descartar
            </button>
          </Link>
          <button
            type="submit"
            className="w-full py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50">
            Crear Cliente
          </button> 
        </div>
      </form>
    </div>
  );
}

