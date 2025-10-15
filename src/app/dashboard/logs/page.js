'use client';
import { useContext, useEffect } from 'react';
import { DeviceContext } from '../../context/DeviceContext'

export default function LogsPage() {
  const { logs, fetchLogs } = useContext(DeviceContext);

  useEffect(() => { fetchLogs(); }, [fetchLogs]);

  return (
    <div className="max-w-6xl mx-auto py-6">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Activity Logs</h2>

      <div className="space-y-3">
        {logs.map((l, index) => (
          <div
            key={l._id || `${l.timestamp}-${index}`}
            className="bg-white rounded-xl shadow-sm p-4 flex justify-between items-center hover:shadow-md transition"
          >
            <div className="flex flex-col">
              <span className="text-xs text-gray-400 mb-1">
                {new Date(l.timestamp).toLocaleString()}
              </span>
              <span className="text-sm font-medium text-gray-700">
                {l.message}
              </span>
            </div>
            <span className={`px-2 py-1 rounded-full text-xs font-medium 
              ${l.status === 'success' ? 'bg-green-100 text-green-700' : ''}
              ${l.status === 'error' ? 'bg-red-100 text-red-700' : ''}
              ${l.status === 'pending' ? 'bg-yellow-100 text-yellow-700' : ''}`}>
              {l.status}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
