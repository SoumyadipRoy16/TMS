'use client'

import { useEffect, useState } from 'react'
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts'

type PerformanceData = {
  name: string
  score: number
}

export default function TestPerformance() {
  const [performanceData, setPerformanceData] = useState<PerformanceData[]>([])

  useEffect(() => {
    async function fetchPerformanceData() {
      const response = await fetch('/api/test-performance')
      const data = await response.json()
      setPerformanceData(data)
    }
    fetchPerformanceData()
  }, [])

  if (performanceData.length === 0) {
    return <div>Loading...</div>
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">Test Performance</h2>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={performanceData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="score"
              stroke="#3b82f6"
              strokeWidth={2}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}