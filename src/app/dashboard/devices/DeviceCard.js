// 'use client';
// import { useContext, useState } from 'react';
// import { DeviceContext } from '../../context/DeviceContext';
// import DeviceStatusBadge from '../../components/DeviceStatusBadge';

// export default function DeviceCard({ device }) {
//   const { toggleDevice } = useContext(DeviceContext);
//   const [loading, setLoading] = useState(false);

//   const handleToggle = async () => {
//     setLoading(true);
//     await toggleDevice(device._id);
//     setLoading(false);
//   };

//   return (
//     <div className="card">
//       <div className="flex items-start justify-between">
//         <div>
//           <h3 className="font-medium">{device.name}</h3>
//           <p className="text-sm text-gray-500">
//             {device.room} • {device.type}
//           </p>
//         </div>
//         <DeviceStatusBadge status={device.status} />
//       </div>

//       <div className="mt-4 flex items-center justify-between">
//         <div className="text-sm text-gray-600">
//           Brightness: {device.status?.brightness ?? '—'}
//         </div>
//         <button
//           onClick={handleToggle}
//           disabled={loading}
//           className="px-3 py-1 rounded-md border"
//         >
//           {loading ? '…' : device.status?.power === 'on' ? 'Turn off' : 'Turn on'}
//         </button>
//       </div>
//     </div>
//   );
// }


'use client';
import { useContext, useState } from 'react';
import { DeviceContext } from '../../context/DeviceContext';
import DeviceStatusBadge from '../../components/DeviceStatusBadge';

export default function DeviceCard({ device }) {
  const { toggleDevice } = useContext(DeviceContext);
  const [loading, setLoading] = useState(false);

  const handleToggle = async () => {
    setLoading(true);
    await toggleDevice(device._id);
    setLoading(false);
  };

  return (
    <div className="bg-white rounded-xl shadow-md p-5 hover:shadow-xl transition-shadow duration-200">
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="text-lg font-semibold text-gray-800">{device.name}</h3>
          <p className="text-sm text-gray-500 mt-1">
            {device.room} • {device.type}
          </p>
        </div>
        <DeviceStatusBadge status={device.status} />
      </div>

      {/* Info */}
      <div className="flex items-center justify-between text-sm text-gray-600 mb-4">
        <span>Brightness: {device.status?.brightness ?? '—'}</span>
        <span>Power: {device.status?.power ?? '—'}</span>
      </div>

      {/* Toggle Button (smaller) */}
      <button
        onClick={handleToggle}
        disabled={loading}
        className={`px-3 py-1 rounded-md font-medium transition-colors duration-200 ${
          device.status?.power === 'on'
            ? 'bg-red-500 hover:bg-red-600 text-white'
            : 'bg-green-500 hover:bg-green-600 text-white'
        } ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
      >
        {loading ? '…' : device.status?.power === 'on' ? 'Turn off' : 'Turn on'}
      </button>
    </div>
  );
}
