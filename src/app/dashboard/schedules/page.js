'use client';
import { useContext, useState } from 'react';
import { DeviceContext } from '../../context/DeviceContext';
import ScheduleCard from './ScheduleCard';
import ScheduleForm from './ScheduleForm';

export default function SchedulesPage() {
  const { schedules } = useContext(DeviceContext);
  const [open, setOpen] = useState(false);

  return (
    <div className="max-w-6xl mx-auto px-4 py-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 gap-4">
        <h2 className="text-3xl font-bold text-gray-800">Schedules</h2>
        <button
          onClick={() => setOpen(true)}
          className="px-4 py-2 bg-indigo-600 text-white font-medium rounded-lg shadow hover:bg-indigo-700 transition"
        >
          + New Schedule
        </button>
      </div>

      {/* Schedules Grid */}
      {schedules && schedules.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {schedules.map((s) => (
            <ScheduleCard key={s._id} schedule={s} />
          ))}
        </div>
      ) : (
        <div className="text-gray-500 text-center mt-10">
          No schedules found. Create one using the button above.
        </div>
      )}

      {/* Schedule Form Modal */}
      {open && <ScheduleForm onClose={() => setOpen(false)} />}
    </div>
  );
}
