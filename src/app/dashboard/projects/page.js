"use client";

import { useEffect } from "react";
import { useNavbar } from "@/context/NavbarContext";

export default function pageProjects(){
    const { updateNavbar } = useNavbar();

    // Usa useEffect para actualizar el estado después del renderizado inicial
    useEffect(() => {
      updateNavbar("Proyectos", "Gestión de proyectos");
    }, [updateNavbar]);

    return(
        <p className="text-gray-900">Proyectos</p>
    )
}