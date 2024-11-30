"use client";

import Link from 'next/link';

export default function ClientProjectCard({ project, index }) {
  return (
    <div className="p-4 border rounded-md shadow-sm flex">
      <div className="w-1/12 font-medium">{index < 10 ? `0${index}` : index}</div>
      <div className="w-3/12 font-medium underline">
        <Link href={`/dashboard/projects/${project._id}`}>{project.name}</Link>
      </div>
      <div className="w-2/12">{project.projectCode}</div>
      <div className="w-3/12">{project.address.city}</div>
    </div>
  );
}