"use client";

import UserProfile from "./UserProfile";

export default function Navbar({ sectionName, sectionDesc }) {
    return (
        <div className="flex items-center justify-between text-gray-900 border border-red-600 h-20 p-4">
            {/* Section Title and Description */}
            <div>
                <h1 className="text-xl font-bold">{sectionName}</h1>
                <p className="text-sm text-gray-600">{sectionDesc}</p>
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
