"use client";

import UserProfile from "./UserProfile";
import { useNavbar } from "../../../context/NavbarContext";

export default function Navbar() {
    const { title, desc } = useNavbar();

    return (
        <div className="flex items-center justify-between text-gray-900 border border-red-600 h-20 p-4">
            {/* Section Title and Description */}
            <div>
                <h1 className="text-xl font-bold">{title}</h1>
                <p className="text-sm text-gray-600">{desc}</p>
            </div>

            {/* Search Bar */}
            <div className="flex-1 mx-4">
                <input
                    type="text"
                    placeholder="Search..."
                    className="w-full p-2 border border-gray-300 rounded-md"
                />
            </div>

            {/* User Icon and Name */}
            <UserProfile />
        </div>
    );
}
