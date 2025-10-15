'use client';
import { useContext, useState } from 'react';
import { DeviceContext } from '../../context/DeviceContext';
import SceneCard from './SceneCard';
import SceneForm from './SceneForm';

export default function ScenesPage() {
  const { scenes } = useContext(DeviceContext);
  const [open, setOpen] = useState(false);

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 gap-3">
        <h2 className="text-3xl font-semibold text-gray-800">Scenes</h2>
        <button
          className="px-4 py-2 bg-indigo-600 text-white rounded-lg font-medium shadow hover:bg-indigo-700 transition"
          onClick={() => setOpen(true)}
        >
          Create Scene
        </button>
      </div>

      {/* Scene Grid */}
      {scenes.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {scenes.map((s) => (
            <SceneCard key={s._id} scene={s} />
          ))}
        </div>
      ) : (
        <div className="text-center py-20 text-gray-500">
          No scenes created yet. Click "Create Scene" to add one.
        </div>
      )}

      {/* Scene Modal */}
      {open && <SceneForm onClose={() => setOpen(false)} />}
    </div>
  );
}
