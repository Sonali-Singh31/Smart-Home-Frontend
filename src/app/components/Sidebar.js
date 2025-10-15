'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  CubeIcon,
  BoltIcon,
  CalendarIcon,
  ClipboardDocumentListIcon
} from '@heroicons/react/24/outline'; // correct imports

export default function Sidebar() {
  const pathname = usePathname();

  const links = [
    { href: '/dashboard/devices', label: 'Devices', icon: <CubeIcon className="w-5 h-5 mr-2" /> },
    { href: '/dashboard/scenes', label: 'Scenes', icon: <BoltIcon className="w-5 h-5 mr-2" /> },
    { href: '/dashboard/schedules', label: 'Schedules', icon: <CalendarIcon className="w-5 h-5 mr-2" /> },
    { href: '/dashboard/logs', label: 'Logs', icon: <ClipboardDocumentListIcon className="w-5 h-5 mr-2" /> },
  ];

  return (
    <aside className="w-64 bg-white border-r min-h-screen p-6 shadow-md flex flex-col">
      <h2 className="text-3xl font-bold mb-8 text-black">Controller</h2>
      <nav className="flex flex-col gap-2">
        {links.map(link => {
          const isActive = pathname === link.href;
          return (
            <Link
              key={link.href}
              href={link.href}
              className={`flex items-center px-4 py-2 rounded-lg transition 
                ${isActive ? 'bg-indigo-100 text-indigo-700 font-semibold' : 'hover:bg-gray-100 text-gray-700'}`}
            >
              {link.icon}
              {link.label}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
