"use client";

import { useEffect } from "react";
import { useNavbar } from "@/context/NavbarContext";

export default function pageAlbaranes(){
    const { updateNavbar } = useNavbar();

    // Usa useEffect para actualizar el estado después del renderizado inicial
    useEffect(() => {
      updateNavbar("Alabaranes", "Gestión de alabaranes");
    }, [updateNavbar]);

    return(
        <p className="text-gray-900">Albaranes</p>
    )
}