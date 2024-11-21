'use client'

import { useEffect, useState } from 'react'
import { BookOpen } from 'lucide-react'

export default function RecommendationCard() {
  const [recommendations, setRecommendations] = useState<string[]>([])

  useEffect(() => {
    async function fetchRecommendations() {
      const response = await fetch('/api/recommendations')
      const data = await response.json()
      setRecommendations(data)
    }
    fetchRecommendations()
  }, [])

  if (recommendations.length === 0) {
    return <div>Loading...</div>
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">Recommendations</h2>
      <ul className="space-y-2">
        {recommendations.map((recommendation, index) => (
          <li key={index} className="flex items-start">
            <BookOpen className="text-blue-500 mr-2 mt-1 flex-shrink-0" />
            <span>{recommendation}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}