'use client';
import { useState, useContext } from 'react';
import { DeviceContext } from '../../context/DeviceContext';
import axios from '../../api/axios';

export default function ScheduleForm({ onClose }) {
  const { scenes, addScheduleToState } = useContext(DeviceContext);
  const [name, setName] = useState('');
  const [sceneId, setSceneId] = useState(scenes[0]?._id || '');
  const [time, setTime] = useState('19:00');
  const [days, setDays] = useState(['Mon','Tue','Wed','Thu','Fri']);
  const [loading, setLoading] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post('/schedules', { name, sceneId, time, days });
      addScheduleToState(res.data);
      onClose();
    } catch (err) {
      console.error(err);
      alert('Failed to create schedule');
    }
    setLoading(false);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/40 z-50">
      <form 
        onSubmit={submit} 
        className="bg-white rounded-2xl shadow-xl p-6 w-full max-w-lg space-y-4 transition-transform transform scale-100 animate-fadeIn"
      >
        <h3 className="text-xl font-bold text-gray-800">Create Schedule</h3>

        <div className="flex flex-col gap-2">
          <input
            value={name}
            onChange={e => setName(e.target.value)}
            placeholder="Schedule name"
            className="input border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
            required
          />

          <select
            value={sceneId}
            onChange={e => setSceneId(e.target.value)}
            className="input border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
          >
            {scenes.map(s => (
              <option key={s._id} value={s._id}>{s.name}</option>
            ))}
          </select>

          <div className="flex gap-2">
            <label className="flex-1 flex flex-col text-gray-700 text-sm">
              Time
              <input
                type="time"
                value={time}
                onChange={e => setTime(e.target.value)}
                className="input border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
              />
            </label>

            <label className="flex-1 flex flex-col text-gray-700 text-sm">
              Days (comma separated)
              <input
                value={days.join(',')}
                onChange={e => setDays(e.target.value.split(',').map(x => x.trim()))}
                className="input border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
              />
            </label>
          </div>
        </div>

        <div className="flex justify-end gap-3">
          <button 
            type="button" 
            onClick={onClose} 
            className="px-4 py-2 rounded-lg border border-gray-300 hover:bg-gray-100 transition"
          >
            Cancel
          </button>
          <button 
            type="submit" 
            disabled={loading}
            className={`px-4 py-2 rounded-lg text-white font-medium transition 
              ${loading ? 'bg-indigo-300 cursor-not-allowed' : 'bg-indigo-600 hover:bg-indigo-700'}`}
          >
            {loading ? 'Saving…' : 'Save'}
          </button>
        </div>
      </form>
    </div>
  );
}
