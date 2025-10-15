'use client';
import { useState, useContext } from 'react';
import { DeviceContext } from '../../context/DeviceContext';
import axios from '../../api/axios';

export default function ScheduleCard({ schedule }) {
  const [toggling, setToggling] = useState(false);
  const { updateScheduleInState } = useContext(DeviceContext);

  const toggle = async () => {
    setToggling(true);
    try {
      const res = await axios.post(`/schedules/${schedule._id}/toggle`);
      updateScheduleInState(res.data);
    } catch (err) {
      console.error(err);
      alert('Failed to toggle schedule');
    }
    setToggling(false);
  };

  return (
    <div className="bg-white border border-gray-200 rounded-xl shadow-md p-5 flex flex-col justify-between hover:shadow-lg transition">
      {/* Header */}
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-lg font-semibold text-gray-800">{schedule.name}</h3>
          <p className="text-sm text-gray-500 mt-1">
            {schedule.time} • {(schedule.days || []).join(', ')}
          </p>
        </div>

        {/* Status Badge */}
        <button
          onClick={toggle}
          disabled={toggling}
          className={`px-4 py-1 rounded-md font-medium transition 
            ${schedule.enabled 
              ? 'bg-green-100 text-green-800 hover:bg-green-200' 
              : 'bg-red-100 text-red-800 hover:bg-red-200'} 
            ${toggling ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
          {toggling ? '…' : schedule.enabled ? 'Active' : 'Disabled'}
        </button>
      </div>

      {/* Optional: Additional info */}
      <div className="mt-3 text-sm text-gray-600">
        {schedule.description || 'No additional details.'}
      </div>
    </div>
  );
}
