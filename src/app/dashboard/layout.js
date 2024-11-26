"use client";

import Sidebar from '../../components/Dashboard/Sidebar/Sidebar';
import Navbar from '../../components/Dashboard/Navbar';

import { useState } from 'react';

const DashboardLayout = ({ children }) => {

    const [navBarTitle, setNavbarTitle] = useState("");
    const [navBarDesc, setNavbarDesc] = useState("");

    const handleNavbarChange = (title, desc) => {
        setNavbarTitle(title);
        setNavbarDesc(desc);
    };

    return (
        <div className="flex h-screen bg-gray-100 overflow-hidden">
            <div className="w-1/5">
                <Sidebar navBarChangeHandler={handleNavbarChange} />
            </div>

            <div className="w-4/5 flex flex-col">
                <Navbar sectionName={navBarTitle} sectionDesc={navBarDesc} />
                <main className="flex-1 overflow-auto p-3 bg-slate-200">{children}</main>
            </div>
        </div>
    );
};

export default DashboardLayout;
