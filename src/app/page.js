/*
  NOTA DE AUTOR:
  Este proyecto es fruto de una práctica intensa de clase, muchas horas frente a la pantalla, 
  y esa dosis de "¡¿Por qué no funciona?!" que todos los estudiantes de programación conocemos.

  Si algo no funciona, recuerda que está diseñado así... para que el profesor tenga de qué hablar jajaja. 
  Si todo funciona perfecto, probablemente el café hizo efecto justo a tiempo y mi esfuerzos han dado resultados.

  PD: Profe, si está leyendo esto, ¡prometo que lo he entregado con todo mi esfuerzo!

  Con humor (y algo de estrés),
  El Estudiante (y su taza de café número 27)
*/


"use client";
// Habilita el modo cliente para que este componente se ejecute en el navegador.

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
// Importa hooks para manejar efectos y navegación.

const MainPage = () => {
  const router = useRouter();
  // Obtiene el objeto `router` para realizar redirecciones.

  useEffect(() => {
    router.push('/login');
    // Redirige automáticamente a la página de inicio de sesión al cargar el componente.
  }, [router]);

  return null;
  // No renderiza ningún contenido en pantalla.
};

export default MainPage;
