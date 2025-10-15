'use client';
import { useContext, useState } from 'react';
import { DeviceContext } from '../../context/DeviceContext';
import { XMarkIcon, PlusIcon } from '@heroicons/react/24/solid';
import axios from '../../api/axios';

export default function SceneForm({ onClose }) {
  const { devices, addSceneToState } = useContext(DeviceContext);
  const [name, setName] = useState('');
  const [actions, setActions] = useState([]);

  const addAction = () =>
    setActions(prev => [...prev, { deviceId: devices[0]?._id || '', command: 'on', value: '' }]);
  const updateAction = (i, patch) =>
    setActions(prev => prev.map((a, idx) => (idx === i ? { ...a, ...patch } : a)));
  const removeAction = i => setActions(prev => prev.filter((_, idx) => idx !== i));

  const submit = async e => {
    e.preventDefault();
    try {
      const res = await axios.post('/scenes', { name, actions });
      addSceneToState(res.data);
      onClose();
    } catch (e) {
      console.error(e);
      alert('Failed to create scene');
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/40 z-50 p-4">
      <form
        onSubmit={submit}
        className="bg-white rounded-2xl shadow-lg w-full max-w-2xl p-6 relative space-y-4"
      >
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 transition"
        >
          <XMarkIcon className="w-6 h-6" />
        </button>

        <h3 className="text-2xl font-bold text-gray-800">Create Scene</h3>

        {/* Scene Name */}
        <input
          value={name}
          onChange={e => setName(e.target.value)}
          className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
          placeholder="Scene name"
          required
        />

        {/* Actions List */}
        <div className="space-y-3 max-h-72 overflow-y-auto">
          {actions.map((a, i) => (
            <div
              key={i}
              className="flex gap-2 items-center bg-gray-50 p-2 rounded-lg shadow-sm hover:bg-gray-100 transition"
            >
              <select
                value={a.deviceId}
                onChange={e => updateAction(i, { deviceId: e.target.value })}
                className="flex-1 px-3 py-2 rounded-lg border border-gray-300 focus:ring-1 focus:ring-indigo-400"
              >
                {devices.map(d => (
                  <option key={d._id} value={d._id}>
                    {d.name} ({d.room})
                  </option>
                ))}
              </select>
              <select
                value={a.command}
                onChange={e => updateAction(i, { command: e.target.value })}
                className="w-28 px-3 py-2 rounded-lg border border-gray-300 focus:ring-1 focus:ring-indigo-400"
              >
                <option value="on">ON</option>
                <option value="off">OFF</option>
                <option value="set_brightness">Set Brightness</option>
              </select>
              <input
                placeholder="Value"
                value={a.value}
                onChange={e => updateAction(i, { value: e.target.value })}
                className="w-24 px-3 py-2 rounded-lg border border-gray-300 focus:ring-1 focus:ring-indigo-400"
              />
              <button
                type="button"
                onClick={() => removeAction(i)}
                className="text-red-500 hover:text-red-700 transition"
              >
                ✕
              </button>
            </div>
          ))}
        </div>

        {/* Add Action */}
        <button
          type="button"
          onClick={addAction}
          className="flex items-center gap-2 px-4 py-2 bg-indigo-50 text-indigo-600 rounded-lg hover:bg-indigo-100 transition"
        >
          <PlusIcon className="w-5 h-5" /> Add Action
        </button>

        {/* Form Buttons */}
        <div className="flex justify-end gap-2 mt-4">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-lg border border-gray-300 hover:bg-gray-100 transition"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 rounded-lg bg-indigo-600 text-white font-semibold hover:bg-indigo-700 transition"
          >
            Create
          </button>
        </div>
      </form>
    </div>
  );
}
