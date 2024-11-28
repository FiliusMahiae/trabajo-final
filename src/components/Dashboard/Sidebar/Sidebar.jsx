"use client";

import SidebarItem from "./SidebarItem";
import Image from 'next/image';

export default function Sidebar() {
    

    return (
        <div className="h-screen bg-gray-100 p-4 border border-red-600">
            <div className="flex justify-center mb-6 border border-red-600 ">
                <Image src="/logo.png" alt="Empresa Logo" width={120} height={120} />
            </div>
            <div className="border border-red-600">
                <p className="text-gray-900">MENÚ</p>
                <div className="mt-2">
                    <SidebarItem
                        title="Clientes"
                        icon="/icons/clients.svg"
                        href="/dashboard/clients"
                    />
                    <SidebarItem
                        title="Añadir Cliente"
                        icon="/icons/create-client.svg"
                        href="/dashboard/create-client"
                    />
                    <SidebarItem
                        title="Proyectos"
                        icon="/icons/projects.svg"
                        href="/dashboard/projects"
                    />
                    <SidebarItem
                        title="Crear Proyecto"
                        icon="/icons/projects.svg"
                        href="/dashboard/create-project"
                    />
                    <SidebarItem
                        title="Albaranes"
                        icon="/icons/albaranes.svg"
                        href="/dashboard/albaranes"
                    />
                </div>
            </div>
        </div>
    );
}