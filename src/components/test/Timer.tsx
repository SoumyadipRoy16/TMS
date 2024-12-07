// src/components/test/Timer.tsx

'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

type TimerProps = {
  onTimeExpired: (questionIndex: number) => void
  totalQuestions: 3
}

export default function Timer({ onTimeExpired, totalQuestions }: TimerProps) {
  const TOTAL_TEST_TIME = 3600 // 1 hour total
  const TIME_PER_QUESTION = Math.floor(TOTAL_TEST_TIME / totalQuestions)

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [timeRemaining, setTimeRemaining] = useState(TIME_PER_QUESTION)
  const [totalTimeRemaining, setTotalTimeRemaining] = useState(TOTAL_TEST_TIME)

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeRemaining(prev => {
        if (prev <= 1) {
          // Move to next question when time expires
          onTimeExpired(currentQuestionIndex)
          setCurrentQuestionIndex(prev => prev + 1)
          return TIME_PER_QUESTION
        }
        return prev - 1
      })

      setTotalTimeRemaining(prev => (prev > 0 ? prev - 1 : 0))
    }, 1000)

    return () => clearInterval(timer)
  }, [currentQuestionIndex, onTimeExpired])

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60)
    const remainingSeconds = seconds % 60
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds
      .toString()
      .padStart(2, '0')}`
  }

  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle>Time Remaining</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <p className="text-lg">
            Current Question Time: <span className="font-bold text-primary">{formatTime(timeRemaining)}</span>
          </p>
          <p className="text-lg">
            Total Test Time: <span className="font-bold text-secondary">{formatTime(totalTimeRemaining)}</span>
          </p>
        </div>
      </CardContent>
    </Card>
  )
}