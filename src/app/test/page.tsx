'use client'

import { useEffect, useState } from 'react'
import CodeEditor from '@/components/test/CodeEditor'
import ProblemStatement from '@/components/test/ProblemStatement'
import TestCaseValidation from '@/components/test/TestCaseValidation'
import Timer from '@/components/test/Timer'
import { useToast, ToastProvider } from "@/components/ui/use-toast"

type Question = {
  id: string
  title: string
  description: string
  difficulty: 'Easy' | 'Medium' | 'Hard'
  testCases: Array<{
    input: string
    output: string
  }>
  examples?: Array<{
    input: string
    output: string
    explanation: string
  }>
}

function TestContent() {
  const [question, setQuestion] = useState<Question | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isComplete, setIsComplete] = useState(false)
  const { showToast } = useToast()

  const fetchQuestion = async (currentQuestionId?: string) => {
    try {
      setIsLoading(true)
      const url = '/api/coding-problem' + (currentQuestionId ? `?currentQuestionId=${currentQuestionId}` : '')
      const response = await fetch(url)
      
      if (!response.ok) {
        const data = await response.json()
        if (response.status === 404) {
          setIsComplete(true)
          return
        }
        throw new Error(data.error || 'Failed to fetch question')
      }

      const data = await response.json()
      setQuestion(data)
    } catch (error) {
      showToast("Failed to load question. Please refresh the page.", "destructive")
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchQuestion()
  }, [])

  const handleQuestionChange = (newQuestion: Question) => {
    setQuestion(newQuestion)
  }

  if (isComplete) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto text-center">
          <h1 className="text-3xl font-bold mb-4">Test Complete!</h1>
          <p className="text-muted-foreground mb-8">
            You have completed all available questions.
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-foreground">Coding Test</h1>
        <Timer />
      </div>
      
      <div className="grid lg:grid-cols-2 gap-6">
        <div className="space-y-6">
          <ProblemStatement
            title={question?.title ?? ''}
            description={question?.description ?? ''}
            examples={question?.examples}
            isLoading={isLoading}
          />
          <TestCaseValidation
            testCases={question?.testCases ?? []}
            isLoading={isLoading}
          />
        </div>
        <div>
          <CodeEditor
            currentQuestionId={question?.id ?? ''}
            onQuestionChange={handleQuestionChange}
          />
        </div>
      </div>
    </div>
  )
}

export default function Test() {
  return (
    <ToastProvider>
      <TestContent />
    </ToastProvider>
  )
}