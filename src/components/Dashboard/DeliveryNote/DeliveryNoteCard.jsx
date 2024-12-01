"use client";

import React from 'react';
import Link from 'next/link';
import DownloadButton from './DownloadButton';

export default function DeliveryNoteCard({ note, index }) {
  const statusStyles = note.pending
    ? "bg-yellow-100 text-yellow-700 border-yellow-400"
    : "bg-green-100 text-green-700 border-green-400";

  return (
    <div className={`grid grid-cols-6 gap-4 border-b px-4 py-5 ${index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}`}>
      <Link href={`/dashboard/projects/${note.projectId._id}`}>
        <div className="w-1/6 cursor-pointer underline text-blue-500">{note._id}</div>
      </Link>
      <div className="w-1/6">{new Date(note.createdAt).toLocaleDateString()}</div>
      <div className="w-1/6">{note.description}</div>
      <div className="w-1/6">{note.hours}</div>
      <div className="w-1/6">
        <span className={`px-3 py-1 text-sm font-medium border rounded-md ${statusStyles}`}>
          {note.pending ? 'Pendiente' : 'Firmado'}
        </span>
      </div>
      <div className="w-1/6 flex justify-center">
        <DownloadButton noteId={note._id} />
      </div>
    </div>
  );
}


