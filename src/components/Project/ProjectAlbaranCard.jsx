"use client";

import Link from 'next/link';

export default function ProjectAlbaranCard({ albaran }) {
  return (
    <div className="p-4 border rounded-md shadow-sm flex flex-col gap-2">
      <div className="font-medium">Formato: {albaran.format}</div>
      <div>Horas: {albaran.hours}</div>
      <div>Descripción: {albaran.description}</div>
      <div>Firmado: {albaran.sign ? <Link href={albaran.sign}>Ver Firma</Link> : "No disponible"}</div>
      <div>Estado: {albaran.pending ? "Pendiente" : "Completado"}</div>
      <div>Creado el: {new Date(albaran.createdAt).toLocaleDateString()}</div>
    </div>
  );
}