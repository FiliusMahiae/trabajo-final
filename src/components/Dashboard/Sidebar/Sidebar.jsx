"use client";

import SidebarItem from "./SidebarItem";
import Image from 'next/image';

export default function Sidebar() {
    return (
        <div className="h-screen bg-gray-50 p-4 border-r border-gray-200 shadow-lg">
            <div className="flex justify-center mb-8">
                <Image src="/logo.png" alt="Empresa Logo" width={100} height={100} className="rounded-full shadow-md" />
            </div>
            <div className="border-t border-gray-300 pt-4">
                <p className="text-gray-700 font-semibold text-lg tracking-wide mb-4">MENÚ</p>
                <div className="space-y-2">
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
                        icon="/icons/create-project.svg"
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
