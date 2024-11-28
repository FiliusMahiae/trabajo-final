"use client";

import { useForm } from "react-hook-form";
import { useEffect } from "react";
import { useNavbar } from "@/context/NavbarContext";
import  FormFields  from "@/components/Project/FormFields.jsx";
import  ClientSelect  from "@/components/Project/ClientSelect";
import  AddressFields  from "@/components/Project/AddressFields";
import  FormButtons  from "@/components/Project/FormButtons";

export default function NewProjectForm() {
    const { updateNavbar } = useNavbar();
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm();

    useEffect(() => {
        updateNavbar("Crear Proyecto", "Creación de proyectos");
    }, [updateNavbar]);

    const onSubmit = async (data) => {
        const token = localStorage.getItem('jwt');
        console.log(data);
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
                if (!response.ok) {
                    throw new Error("Error en la respuesta del servidor");
                }
                const result = await response.json();
                console.log("Proyecto creado:", result);
                reset();
            } catch (error) {
                console.log("Error al crear proyecto:", error);
            }
        }
    };

    return (
        <div className="p-8 border rounded-md shadow-sm">
            <h2 className="text-2xl font-bold mb-4">Nuevo Proyecto</h2>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <FormFields register={register} errors={errors} />
                <ClientSelect register={register} errors={errors} />
                <AddressFields register={register} errors={errors} />
                <FormButtons reset={reset} />
            </form>
        </div>
    );
}
