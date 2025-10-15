// 'use client'
// import { useContext, useState } from 'react'
// import { DeviceContext } from '../../context/DeviceContext'
// import DeviceCard from './DeviceCard'
// import DeviceForm from './DeviceForm'


// export default function DevicesPage() {
// const { devices, refreshDevices } = useContext(DeviceContext)
// const [open, setOpen] = useState(false)


// return (
// <div className="max-w-6xl mx-auto">
// <div className="flex items-center justify-between mb-4">
// <h2 className="text-2xl font-semibold">Devices</h2>
// <div>
// <button onClick={() => { refreshDevices(); }} className="mr-2 btn">Refresh</button>
// <button onClick={() => setOpen(true)} className="btn bg-indigo-600 text-white">Add Device</button>
// </div>
// </div>


// <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
// {devices.map(d => <DeviceCard key={d._id} device={d} />)}
// </div>


// {open && <DeviceForm onClose={() => setOpen(false)} />}
// </div>
// )
// }
'use client'
import { useContext, useState } from 'react'
import { DeviceContext } from '../../context/DeviceContext'
import DeviceCard from './DeviceCard'
import DeviceForm from './DeviceForm'

export default function DevicesPage() {
  const { devices, refreshDevices } = useContext(DeviceContext)
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleRefresh = async () => {
    setLoading(true)          // start loading
    try {
      await refreshDevices()  // call context refresh
    } catch (err) {
      console.error('Failed to refresh devices:', err)
    } finally {
      setLoading(false)       // stop loading
    }
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 space-y-3 sm:space-y-0">
        <h2 className="text-3xl font-bold text-gray-800">Devices</h2>
        <div className="flex flex-wrap gap-3">
          <button
            onClick={handleRefresh}
            disabled={loading}
            className={`px-4 py-2 rounded-lg font-medium shadow-sm transition ${
              loading
                ? 'bg-gray-300 text-gray-600 cursor-not-allowed'
                : 'bg-gray-200 hover:bg-gray-300 text-gray-800'
            }`}
          >
            {loading ? 'Refreshing...' : 'Refresh'}
          </button>
          <button
            onClick={() => setOpen(true)}
            className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-lg shadow-sm transition"
          >
            Add Device
          </button>
        </div>
      </div>

      {/* Devices Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {devices.map(d => (
          <DeviceCard key={d._id} device={d} />
        ))}
      </div>

      {/* Device Form Modal */}
      {open && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-lg w-full max-w-md p-6 relative">
            <button
              onClick={() => setOpen(false)}
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
            >
              ✕
            </button>
            <DeviceForm onClose={() => setOpen(false)} />
          </div>
        </div>
      )}
    </div>
  )
}
