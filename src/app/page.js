'use client';
import Link from 'next/link';
import { CpuChipIcon, BoltIcon, CalendarIcon } from '@heroicons/react/24/outline';

export default function Home() {
  const cards = [
    {
      href: '/dashboard/devices',
      label: 'Devices',
      icon: <CpuChipIcon className="w-8 h-8 text-indigo-600" />,
    },
    {
      href: '/dashboard/scenes',
      label: 'Scenes',
      icon: <BoltIcon className="w-8 h-8 text-green-500" />,
    },
    {
      href: '/dashboard/schedules',
      label: 'Schedules',
      icon: <CalendarIcon className="w-8 h-8 text-yellow-500" />,
    },
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-3 text-gray-800">Smart Home Controller</h1>
      <p className="text-gray-600 mb-8 text-lg">
        Control devices, create scenes, and schedule automations effortlessly.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {cards.map((card) => (
          <Link
            key={card.href}
            href={card.href}
            className="flex flex-col items-center justify-center p-8 bg-white rounded-2xl shadow-md hover:shadow-xl transition-all hover:scale-105 text-center border border-gray-100"
          >
            <div className="mb-4">{card.icon}</div>
            <span className="text-xl font-medium text-gray-800">{card.label}</span>
          </Link>
        ))}
      </div>
    </div>
  );
}
