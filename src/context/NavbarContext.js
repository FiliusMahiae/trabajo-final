"use client";
// Habilita el modo cliente en Next.js, asegurando que este código se ejecute en el cliente.

import { createContext, useContext, useState } from "react";
// Importa herramientas esenciales de React: 
// `createContext` para crear un contexto, 
// `useContext` para consumirlo y 
// `useState` para manejar el estado interno.


// Crear el contexto
const NavbarContext = createContext();
// `NavbarContext` es un contexto global que permite compartir el estado de la barra de navegación (título y descripción).

// Crear el proveedor
export const NavbarProvider = ({ children }) => {
  const [title, setTitle] = useState(""); // Estado para el título de la barra de navegación.
  const [desc, setDesc] = useState("");  // Estado para la descripción de la barra de navegación.

  // Función para actualizar título y descripción
  const updateNavbar = (newTitle, newDesc) => {
    setTitle(newTitle); // Actualiza el estado `title` con el nuevo valor.
    setDesc(newDesc);   // Actualiza el estado `desc` con el nuevo valor.
  };

  return (
    <NavbarContext.Provider value={{ title, desc, updateNavbar }}>
      {/* Proporciona `title`, `desc` y `updateNavbar` a cualquier componente que consuma este contexto */}
      {children}
      {/* Renderiza los hijos que rodean el proveedor */}
    </NavbarContext.Provider>
  );
};

// Hook para consumir el contexto fácilmente
export const useNavbar = () => useContext(NavbarContext);
// Un hook personalizado para acceder al contexto `NavbarContext` de forma más sencilla.
