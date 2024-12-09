"use client";
// Habilita el modo cliente para que este componente se ejecute en el navegador.

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
// Importa herramientas para manejar estado, efectos y formularios.

import { useNavbar } from "@/context/NavbarContext";
// Contexto para actualizar la barra de navegación.

import FormFields from "@/components/Dashboard/Project/FormFields.jsx";
import ClientSelect from "@/components/Dashboard/Project/ClientSelect";
import AddressFields from "@/components/Dashboard/Project/AddressFields";
import FormButtons from "@/components/Dashboard/Project/FormButtons";
import getCookie from "@/components/Auth/getCookie";
import Popup from "@/components/Dashboard/Project/Popup";
// Importa componentes reutilizables y funciones necesarias para el formulario.

export default function NewProjectForm() {
    const { updateNavbar } = useNavbar();
    const [showPopup, setShowPopup] = useState(false);
    // Estado para controlar la visibilidad del popup.

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm();
    // Configuración del formulario utilizando `react-hook-form`.

    useEffect(() => {
        updateNavbar("Crear Proyecto", "Creación de proyectos");
        // Actualiza la barra de navegación con el título y descripción adecuados.
    }, [updateNavbar]);

    const onSubmit = async (data) => {
        const token = getCookie('jwt');
        // Obtiene el token JWT desde las cookies.

        if (token) {
            try {
                const response = await fetch("https://bildy-rpmaya.koyeb.app/api/project", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        'Authorization': `Bearer ${token}`,
                    },
                    body: JSON.stringify(data),
                });
                // Envía los datos del formulario al servidor para crear un nuevo proyecto.

                if (!response.ok) {
                    throw new Error("Error en la respuesta del servidor");
                }

                const result = await response.json();
                console.log("Proyecto creado:", result);
                // Resetea el formulario y muestra el popup tras una creación exitosa.
                reset();
                setShowPopup(true);
            } catch (error) {
                console.log("Error al crear proyecto:", error);
                // Maneja errores durante el proceso de creación.
            }
        }
    };

    return (
        <div className="p-8 border rounded-md shadow-sm">
            {/* Contenedor principal con diseño limpio y estilizado */}
            <h2 className="text-2xl font-bold mb-4">Nuevo Proyecto</h2>
            {/* Título del formulario */}

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                {/* Campos del formulario divididos en componentes reutilizables */}
                <FormFields register={register} errors={errors} />
                {/* Campos generales del proyecto */}
                <ClientSelect register={register} errors={errors} />
                {/* Selector para asignar un cliente */}
                <AddressFields register={register} errors={errors} />
                {/* Campos para ingresar dirección */}
                <FormButtons reset={reset} />
                {/* Botones para descartar o guardar el formulario */}
            </form>

            {showPopup && <Popup setShowPopup={setShowPopup} />}
            {/* Renderiza el popup si `showPopup` es verdadero */}
        </div>
    );
}