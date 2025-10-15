
'use client'

export default function DeviceStatusBadge({ status }) {
  // Extract readable status text
  let displayStatus = 'UNKNOWN'

  if (typeof status === 'string') {
    displayStatus = status.toUpperCase()
  } else if (status && typeof status === 'object' && status.power) {
    displayStatus = status.power.toUpperCase()
  }

  const cls =
    displayStatus === 'ON'
      ? 'bg-green-100 text-green-700'
      : 'bg-gray-100 text-gray-700'

  return (
    <span className={`px-2 py-0.5 rounded-full text-sm ${cls}`}>
      {displayStatus}
    </span>
  )
}
