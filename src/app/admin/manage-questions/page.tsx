'use client'

import { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Toast } from "@/components/ui/toast"

type Question = {
  id: string
  title: string
  description: string
  difficulty: 'Easy' | 'Medium' | 'Hard'
}

type QuestionFormData = Omit<Question, 'id'>

type ToastState = {
  visible: boolean
  message: string
  variant: 'default' | 'destructive'
}

export default function ManageQuestions() {
  const [questions, setQuestions] = useState<Question[]>([])
  const { register, handleSubmit, reset, setValue } = useForm<QuestionFormData>()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [toast, setToast] = useState<ToastState>({
    visible: false,
    message: '',
    variant: 'default'
  })

  useEffect(() => {
    fetchQuestions()
  }, [])

  // Hide toast after 3 seconds
  useEffect(() => {
    if (toast.visible) {
      const timer = setTimeout(() => {
        setToast(prev => ({ ...prev, visible: false }))
      }, 3000)
      return () => clearTimeout(timer)
    }
  }, [toast.visible])

  const showToast = (message: string, variant: 'default' | 'destructive') => {
    setToast({
      visible: true,
      message,
      variant
    })
  }

  const fetchQuestions = async () => {
    try {
      const response = await fetch('/api/admin/questions')
      if (response.ok) {
        const data = await response.json()
        setQuestions(data)
      } else {
        showToast('Failed to fetch questions', 'destructive')
      }
    } catch (error) {
      console.error('Error fetching questions:', error)
      showToast('An unexpected error occurred while fetching questions', 'destructive')
    }
  }

  const onSubmit = async (data: QuestionFormData) => {
    setIsSubmitting(true)
    try {
      const response = await fetch('/api/admin/questions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })

      if (response.ok) {
        showToast('Question added successfully', 'default')
        reset()
        fetchQuestions()
      } else {
        showToast('Failed to add question', 'destructive')
      }
    } catch (error) {
      console.error('Error adding question:', error)
      showToast('An unexpected error occurred while adding the question', 'destructive')
    }
    setIsSubmitting(false)
  }

  const deleteQuestion = async (id: string) => {
    try {
      const response = await fetch(`/api/admin/questions?id=${id}`, {
        method: 'DELETE',
      })

      if (response.ok) {
        showToast('Question deleted successfully', 'default')
        fetchQuestions()
      } else {
        showToast('Failed to delete question', 'destructive')
      }
    } catch (error) {
      console.error('Error deleting question:', error)
      showToast('An unexpected error occurred while deleting the question', 'destructive')
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {toast.visible && (
        <Toast
          message={toast.message}
          variant={toast.variant}
          state="visible"
        />
      )}
      <h1 className="text-3xl font-bold mb-6">Manage Questions</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="mb-8 space-y-4">
        <div className="space-y-2">
          <Label htmlFor="title">Question Title</Label>
          <Input
            id="title"
            {...register('title', { required: 'Title is required' })}
            placeholder="Enter question title"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="description">Question Description</Label>
          <Textarea
            id="description"
            {...register('description', { required: 'Description is required' })}
            placeholder="Enter question description"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="difficulty">Difficulty</Label>
          <Select onValueChange={(value) => setValue('difficulty', value as 'Easy' | 'Medium' | 'Hard')}>
            <SelectTrigger>
              <SelectValue placeholder="Select difficulty" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Easy">Easy</SelectItem>
              <SelectItem value="Medium">Medium</SelectItem>
              <SelectItem value="Hard">Hard</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Adding...' : 'Add Question'}
        </Button>
      </form>
      <div className="space-y-4">
        {questions.map((question) => (
          <div key={question.id} className="border p-4 rounded-md">
            <h3 className="text-xl font-semibold">{question.title}</h3>
            <p className="text-gray-600">{question.description}</p>
            <p className="text-sm text-gray-500">Difficulty: {question.difficulty}</p>
            <Button variant="destructive" onClick={() => deleteQuestion(question.id)} className="mt-2">
              Delete
            </Button>
          </div>
        ))}
      </div>
    </div>
  )
}