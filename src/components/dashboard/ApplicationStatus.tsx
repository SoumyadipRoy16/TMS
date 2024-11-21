'use client'

import { useEffect, useState } from 'react'
import { CheckCircle, Clock, XCircle } from 'lucide-react'

type Stage = {
  name: string
  status: 'complete' | 'current' | 'upcoming'
}

export default function ApplicationStatus() {
  const [stages, setStages] = useState<Stage[]>([])

  useEffect(() => {
    async function fetchApplicationStatus() {
      const response = await fetch('/api/application-status')
      const data = await response.json()
      setStages(data)
    }
    fetchApplicationStatus()
  }, [])

  if (stages.length === 0) {
    return <div>Loading...</div>
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">Application Status</h2>
      <ul className="space-y-4">
        {stages.map((stage, index) => (
          <li key={index} className="flex items-center">
            {stage.status === 'complete' && (
              <CheckCircle className="text-green-500 mr-2" />
            )}
            {stage.status === 'current' && (
              <Clock className="text-blue-500 mr-2" />
            )}
            {stage.status === 'upcoming' && (
              <XCircle className="text-gray-300 mr-2" />
            )}
            <span
              className={
                stage.status === 'current'
                  ? 'font-medium'
                  : stage.status === 'upcoming'
                  ? 'text-gray-500'
                  : ''
              }
            >
              {stage.name}
            </span>
          </li>
        ))}
      </ul>
    </div>
  )
}