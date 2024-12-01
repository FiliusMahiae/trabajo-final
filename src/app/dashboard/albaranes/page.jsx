"use client";

import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import LoadingSpinner from '@/components/Dashboard/Project/LoadingSpinner';
import ErrorNotification from '@/components/Dashboard/Project/ErrorNotification';
import DeliveryNotesTable from '@/components/Dashboard/DeliveryNote/DeliveryNotesTable';
import FilterBar from '@/components/Dashboard/DeliveryNote/FilterBar';
import { useNavbar } from "@/context/NavbarContext";
import getCookie from "@/components/Auth/getCookie";

export default function DeliveryNotesPage() {
  const { updateNavbar } = useNavbar();
  const [deliveryNotes, setDeliveryNotes] = useState([]);
  const [filteredDeliveryNotes, setFilteredDeliveryNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { register, handleSubmit } = useForm({
    defaultValues: {
      description: '',
      pending: '',
      startDate: '',
      endDate: '',
    },
  });

  useEffect(() => {
    updateNavbar("Albaranes", "Lista de albaranes");
  }, [updateNavbar]);

  useEffect(() => {
    const fetchDeliveryNotes = async () => {
      const token = getCookie('jwt');
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
        } catch (err) {
          setError(err);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchDeliveryNotes();
  }, []);

  const onSubmit = (filters) => {
    let filtered = deliveryNotes;
    if (filters.description) {
      filtered = filtered.filter(note => note.description && note.description.toLowerCase().includes(filters.description.toLowerCase()));
    }
    if (filters.pending !== '') {
      filtered = filtered.filter(note => note.pending === (filters.pending === 'true'));
    }
    if (filters.startDate && filters.endDate) {
      const startDate = new Date(filters.startDate).setHours(0, 0, 0, 0);
      const endDate = new Date(filters.endDate).setHours(23, 59, 59, 999);
      filtered = filtered.filter(note => {
        const creationDate = new Date(note.createdAt).setHours(0, 0, 0, 0);
        return creationDate >= startDate && creationDate <= endDate;
      });
    }
    setFilteredDeliveryNotes(filtered);
  };

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorNotification message={error.message} />;
  if (deliveryNotes.length === 0) return <ErrorNotification message="No hay albaranes disponibles" />;

  return (
    <div className="p-4">
      <FilterBar register={register} handleSubmit={handleSubmit(onSubmit)} />
      <DeliveryNotesTable deliveryNotes={filteredDeliveryNotes} />
    </div>
  );
}
