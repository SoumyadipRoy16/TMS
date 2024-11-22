'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"

type Question = {
  id: number
  title: string
  description: string
  difficulty: string
}

export default function ManageQuestions() {
  const [questions, setQuestions] = useState<Question[]>([
    { id: 1, title: 'Two Sum', description: 'Find two numbers that add up to a target', difficulty: 'Easy' },
    { id: 2, title: 'Reverse Linked List', description: 'Reverse a singly linked list', difficulty: 'Medium' },
  ])
  const [newQuestion, setNewQuestion] = useState({ title: '', description: '', difficulty: '' })

  const addQuestion = () => {
    setQuestions([...questions, { id: Date.now(), ...newQuestion }])
    setNewQuestion({ title: '', description: '', difficulty: '' })
  }

  const deleteQuestion = (id: number) => {
    setQuestions(questions.filter(q => q.id !== id))
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Manage Questions</h1>
      <div className="mb-8 space-y-4">
        <Input
          placeholder="Question Title"
          value={newQuestion.title}
          onChange={(e) => setNewQuestion({ ...newQuestion, title: e.target.value })}
        />
        <Textarea
          placeholder="Question Description"
          value={newQuestion.description}
          onChange={(e) => setNewQuestion({ ...newQuestion, description: e.target.value })}
        />
        <Input
          placeholder="Difficulty"
          value={newQuestion.difficulty}
          onChange={(e) => setNewQuestion({ ...newQuestion, difficulty: e.target.value })}
        />
        <Button onClick={addQuestion}>Add Question</Button>
      </div>
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