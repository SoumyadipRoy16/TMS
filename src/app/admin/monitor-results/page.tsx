'use client'

import { useState, useEffect } from 'react'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import EyeIcon from '@/components/ui/eye-icon' // Import EyeIcon component

type Submission = {
  _id: string
  username: string
  questionId: string
  code: string
  timestamp: string
}

export default function MonitorResults() {
  const [submissions, setSubmissions] = useState<Submission[]>([])
  const [scores, setScores] = useState<{ [key: string]: number }>({}) // Store scores by submission ID

  // Fetch submissions from the API
  useEffect(() => {
    async function fetchSubmissions() {
      try {
        const response = await fetch('/api/submissions')
        const data = await response.json()
        setSubmissions(data)
      } catch (error) {
        console.error('Error fetching submissions:', error)
      }
    }
    fetchSubmissions()
  }, [])

  // Handle score change
  const handleScoreChange = (submissionId: string, score: number) => {
    setScores((prevScores) => ({
      ...prevScores,
      [submissionId]: score,
    }))
  }

  // Handle submit action
  const handleSubmit = async (submissionId: string, username: string, questionId: string) => {
    const score = scores[submissionId]
    
    if (score === undefined) {
      alert("Please enter a score before submitting.")
      return
    }

    try {
      const response = await fetch('/api/results', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username,
          score,
          questionId,
        }),
      })

      if (response.ok) {
        alert('Result submitted successfully')
      } else {
        alert('Failed to submit result')
      }
    } catch (error) {
      console.error('Error submitting result:', error)
      alert('Error submitting result')
    }
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Monitor Results</h1>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>User</TableHead>
            <TableHead>Question</TableHead>
            <TableHead>Code</TableHead>
            <TableHead>Score</TableHead>
            <TableHead>Timestamp</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {submissions.map((submission) => (
            <TableRow key={submission._id}>
              <TableCell>{submission.username}</TableCell>
              <TableCell>{submission.questionId}</TableCell>
              <TableCell>
                <EyeIcon code={submission.code} />
              </TableCell>
              <TableCell>
                <input
                  type="number"
                  value={scores[submission._id] || ''}
                  onChange={(e) =>
                    handleScoreChange(submission._id, parseFloat(e.target.value))
                  }
                  className="border p-1"
                  placeholder="Enter score"
                />
              </TableCell>
              <TableCell>{new Date(submission.timestamp).toLocaleString()}</TableCell>
              <TableCell>
                <button
                  onClick={() =>
                    handleSubmit(submission._id, submission.username, submission.questionId)
                  }
                  className="bg-blue-500 text-white px-4 py-2 rounded"
                >
                  Submit
                </button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
