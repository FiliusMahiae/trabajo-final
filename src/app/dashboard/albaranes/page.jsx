"use client";
// Habilita el modo cliente para que este componente se ejecute en el navegador.

import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
// Importa herramientas para manejar estado, efectos y formularios.

import LoadingSpinner from '@/components/Dashboard/Project/LoadingSpinner';
import ErrorNotification from '@/components/Dashboard/Project/ErrorNotification';
import DeliveryNotesTable from '@/components/Dashboard/DeliveryNote/DeliveryNotesTable';
import FilterBar from '@/components/Dashboard/DeliveryNote/FilterBar';
// Componentes reutilizables para mostrar una tabla de albaranes, barra de filtros, y notificaciones de carga o error.

import { useNavbar } from "@/context/NavbarContext";
import getCookie from "@/components/Auth/getCookie";
// Funciones para actualizar la barra de navegación y manejar autenticación.

export default function DeliveryNotesPage() {
  const { updateNavbar } = useNavbar();
  const [deliveryNotes, setDeliveryNotes] = useState([]);
  const [filteredDeliveryNotes, setFilteredDeliveryNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  // Estados para manejar la lista de albaranes, filtros, carga y errores.

  const { register, handleSubmit } = useForm({
    defaultValues: {
      description: '',
      pending: '',
      startDate: '',
      endDate: '',
    },
  });
  // Configuración del formulario con valores predeterminados para los filtros.

  useEffect(() => {
    updateNavbar("Albaranes", "Lista de albaranes");
    // Actualiza la barra de navegación con el título y descripción adecuados.
  }, [updateNavbar]);

  useEffect(() => {
    const fetchDeliveryNotes = async () => {
      const token = getCookie('jwt');
      // Obtiene el token JWT para autenticar la solicitud.

      if (token) {
        try {
          const response = await fetch('https://bildy-rpmaya.koyeb.app/api/deliverynote', {
            headers: {
              "Content-Type": "application/json",
              'Authorization': `Bearer ${token}`,
            },
          });

          const data = await response.json();
          setDeliveryNotes(data);
          setFilteredDeliveryNotes(data);
          // Almacena los albaranes en el estado y los prepara para ser filtrados.
        } catch (err) {
          setError(err);
          // Maneja errores durante la solicitud de datos.
        } finally {
          setLoading(false);
          // Finaliza el estado de carga.
        }
      }
    };

    fetchDeliveryNotes();
    // Llama a la función para cargar los albaranes al montar el componente.
  }, []);

  const onSubmit = (filters) => {
    let filtered = deliveryNotes;
    // Comienza con la lista completa de albaranes.

    // Filtrar por descripción
    if (filters.description) {
        filtered = filtered.filter(note => 
            note.description && 
            note.description.toLowerCase().includes(filters.description.toLowerCase())
        );
        // Verifica si la descripción del albarán existe y contiene la palabra clave ingresada, ignorando mayúsculas/minúsculas.
    }

    // Filtrar por estado (pendiente o firmado)
    if (filters.pending !== '') {
        filtered = filtered.filter(note => 
            note.pending === (filters.pending === 'true')
        );
        // Compara el estado del albarán con el valor booleano derivado de la selección del usuario ('true' o 'false').
    }

    // Filtrar por rango de fechas (fecha de inicio y fin)
    if (filters.startDate && filters.endDate) {
        const startDate = new Date(filters.startDate).setHours(0, 0, 0, 0);
        const endDate = new Date(filters.endDate).setHours(23, 59, 59, 999);
        // Convierte las fechas ingresadas en rangos completos para incluir todo el día.

        filtered = filtered.filter(note => {
            const creationDate = new Date(note.createdAt).setHours(0, 0, 0, 0);
            // Convierte la fecha de creación del albarán en un rango comparable.

            return creationDate >= startDate && creationDate <= endDate;
            // Filtra los albaranes que tienen una fecha de creación dentro del rango especificado.
        });
    }

    setFilteredDeliveryNotes(filtered);
    // Actualiza el estado con la lista filtrada de albaranes.
};


  if (loading) return <LoadingSpinner />;
  // Muestra un spinner mientras los datos se cargan.

  if (error) return <ErrorNotification message={error.message} />;
  // Muestra un mensaje de error si ocurre algún problema.

  if (deliveryNotes.length === 0) return <ErrorNotification message="No hay albaranes disponibles" />;
  // Muestra un mensaje si no hay albaranes disponibles.

  return (
    <div className="p-4">
      <FilterBar register={register} handleSubmit={handleSubmit(onSubmit)} />
      {/* Barra de filtros para buscar albaranes. */}
      <DeliveryNotesTable deliveryNotes={filteredDeliveryNotes} />
      {/* Tabla que muestra los albaranes filtrados. */}
    </div>
  );
}

