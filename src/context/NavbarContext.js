"use client";

import { createContext, useContext, useState } from "react";

// Crear el contexto
const NavbarContext = createContext();

// Crear el proveedor
export const NavbarProvider = ({ children }) => {
  const [title, setTitle] = useState(""); // Estado para el título
  const [desc, setDesc] = useState("");  // Estado para la descripción

  // Función para actualizar título y descripción
  const updateNavbar = (newTitle, newDesc) => {
    setTitle(newTitle);
    setDesc(newDesc);
  };

  return (
    <NavbarContext.Provider value={{ title, desc, updateNavbar }}>
      {children}
    </NavbarContext.Provider>
  );
};

// Hook para consumir el contexto fácilmente
export const useNavbar = () => useContext(NavbarContext);