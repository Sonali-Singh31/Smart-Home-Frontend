'use client';
import { useState, useContext } from 'react';
import axios from '../../api/axios';
import { DeviceContext } from '../../context/DeviceContext';

export default function DeviceForm({ onClose }) {
  const { addDeviceToState } = useContext(DeviceContext);
  const [name, setName] = useState('');
  const [room, setRoom] = useState('Living Room');
  const [type, setType] = useState('light');
  const [loading, setLoading] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post('/devices', { name, room, type });
      addDeviceToState(res.data);
      onClose();
    } catch (e) {
      console.error(e);
      alert('Failed to add device');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
      <form
        onSubmit={submit}
        className="bg-white rounded-2xl shadow-xl p-6 w-full max-w-md animate-fadeIn"
      >
        <h3 className="text-2xl font-semibold mb-6 text-gray-800">Add Device</h3>

        <label className="block mb-4">
          <span className="text-sm font-medium text-gray-700">Name</span>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="mt-1 block w-full px-4 py-2 rounded-lg border border-gray-300 focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:outline-none"
            placeholder="Device Name"
          />
        </label>

        <label className="block mb-4">
          <span className="text-sm font-medium text-gray-700">Room</span>
          <input
            value={room}
            onChange={(e) => setRoom(e.target.value)}
            className="mt-1 block w-full px-4 py-2 rounded-lg border border-gray-300 focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:outline-none"
            placeholder="Room Name"
          />
        </label>

        <label className="block mb-6">
          <span className="text-sm font-medium text-gray-700">Type</span>
          <select
            value={type}
            onChange={(e) => setType(e.target.value)}
            className="mt-1 block w-full px-4 py-2 rounded-lg border border-gray-300 focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:outline-none"
          >
            <option value="light">Light</option>
            <option value="plug">Plug</option>
            <option value="thermostat">Thermostat</option>
          </select>
        </label>

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
            className="px-4 py-2 rounded-lg bg-indigo-600 text-white font-medium hover:bg-indigo-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Adding…' : 'Add Device'}
          </button>
        </div>
      </form>
    </div>
  );
}
