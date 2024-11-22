'use client'

import { useEffect, useState } from 'react'
import { BookOpen } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

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
    return <div className="text-muted-foreground">Loading...</div>
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-foreground">Recommendations</CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="space-y-2">
          {recommendations.map((recommendation, index) => (
            <li key={index} className="flex items-start">
              <BookOpen className="text-primary mr-2 mt-1 flex-shrink-0" />
              <span className="text-foreground">{recommendation}</span>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  )
}