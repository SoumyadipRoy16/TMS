// src/app/test/page.tsx

'use client'

import { useEffect, useState } from 'react'
import { useAuth } from '@/contexts/AuthContext'
import { useRouter } from 'next/navigation'
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
  const router = useRouter()
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

  const handleTestComplete = (shouldReattempt: boolean) => {
    if (shouldReattempt) {
      // Reset the test and start from the beginning
      fetchQuestion()
      showToast("Starting your final attempt", "default")
    } else {
      setIsComplete(true)
      // Redirect to dashboard after 5 seconds
      setTimeout(() => {
        router.push('/dashboard')
      }, 5000)
    }
  }

  if (isComplete) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-background/95">
        <div className="max-w-2xl mx-auto text-center px-4">
          <h1 className="text-3xl font-bold mb-4">Test Completed</h1>
          <p className="text-muted-foreground text-lg">
            Please wait for us to review your code(s). Till then head back to your dashboard...
          </p>
        </div>
      </div>
    )
  }

  const { user } = useAuth()

  if (!user) {
    return <div className="text-center text-foreground">Please log in to take the test.</div>
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
            onTestComplete={handleTestComplete}
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