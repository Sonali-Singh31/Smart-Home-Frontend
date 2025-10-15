'use client';
import { useContext, useState } from 'react';
import { DeviceContext } from '../../context/DeviceContext';
import axios from '../../api/axios';

export default function SceneCard({ scene }) {
  const { emitLog } = useContext(DeviceContext);
  const [running, setRunning] = useState(false);

  const runScene = async () => {
    setRunning(true);
    try {
      const res = await axios.post(`/scenes/${scene._id}/execute`);
      emitLog(res.data);
      alert('Scene executed successfully!');
    } catch (e) {
      console.error('Scene execution failed:', e.response?.data || e.message);
      alert('Failed to run scene');
    }
    setRunning(false);
  };

  return (
    <div className="bg-white rounded-xl shadow-md border border-gray-200 p-5 flex flex-col justify-between hover:shadow-lg transition">
      {/* Header */}
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-lg font-semibold text-gray-800">{scene.name}</h3>
          <p className="text-sm text-gray-500 mt-1">{scene.actions.length} actions</p>
        </div>
        <button
          onClick={runScene}
          disabled={running}
          className={`px-4 py-2 rounded-md font-medium transition 
            ${running ? 'bg-indigo-200 cursor-not-allowed' : 'bg-indigo-600 text-white hover:bg-indigo-700'}`}
        >
          {running ? 'Running…' : 'Run'}
        </button>
      </div>

      {/* Actions List */}
      <ul className="mt-4 text-sm text-gray-600 space-y-2 max-h-40 overflow-y-auto">
        {scene.actions.map((a, i) => (
          <li key={i} className="flex justify-between items-center p-1 rounded hover:bg-gray-50">
            <span>{a.deviceId?.name || 'Unknown'}</span>
            <span className="text-gray-500">
              {a.command} {a.value ?? ''}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
