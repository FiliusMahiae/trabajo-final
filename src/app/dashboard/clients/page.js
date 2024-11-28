"use client";

import { useEffect } from "react";
import { useNavbar } from "@/context/NavbarContext";

export default function PageClients() {
  const { updateNavbar } = useNavbar();

  // Usa useEffect para actualizar el estado después del renderizado inicial
  useEffect(() => {
    updateNavbar("Clientes", "Gestión de clientes");
  }, [updateNavbar]);

  return <p className="text-gray-900">Clients</p>;
}
