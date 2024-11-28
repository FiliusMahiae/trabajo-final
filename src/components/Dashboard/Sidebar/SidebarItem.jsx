"use client";

import Link from 'next/link';
import Image from 'next/image';

export default function SidebarItem({ title, icon, href}) {

  return (
    <Link href={href}>
      <div className="flex items-center p-3 hover:bg-gray-200 rounded-md transition-colors">
        <Image
          src={icon}
          alt={`${title} icon`}
          width={24}
          height={24}
          className="w-6 h-6 mr-3 text-gray-600"
        />
        <span className="text-gray-800 font-medium">{title}</span>
      </div>
    </Link>
  );
}