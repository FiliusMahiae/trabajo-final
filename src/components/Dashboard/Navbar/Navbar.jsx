"use client";

import UserProfile from "./UserProfile";
import { useNavbar } from "../../../context/NavbarContext";

export default function Navbar() {
    const { title, desc } = useNavbar();

    return (
        <div className="flex items-center justify-between bg-white text-gray-800 shadow-md h-20 px-6">
            {/* Section Title and Description */}
            <div>
                <h1 className="text-xl font-semibold">{title}</h1>
                <p className="text-sm text-gray-500">{desc}</p>
            </div>

            {/* Search Bar */}
            <div className="flex-1 mx-6">
                <input
                    type="text"
                    placeholder="Buscar..."
                    className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
            </div>

            {/* User Icon and Name */}
            <UserProfile />
        </div>
    );
}

