'use client'

import { useState } from 'react'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

type Submission = {
  id: number
  user: string
  question: string
  score: number
  submittedAt: string
}

export default function MonitorResults() {
  const [submissions, setSubmissions] = useState<Submission[]>([
    { id: 1, user: 'John Doe', question: 'Two Sum', score: 95, submittedAt: '2023-06-15 10:30' },
    { id: 2, user: 'Jane Smith', question: 'Reverse Linked List', score: 88, submittedAt: '2023-06-15 11:45' },
  ])

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Monitor Results</h1>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>User</TableHead>
            <TableHead>Question</TableHead>
            <TableHead>Score</TableHead>
            <TableHead>Submitted At</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {submissions.map((submission) => (
            <TableRow key={submission.id}>
              <TableCell>{submission.user}</TableCell>
              <TableCell>{submission.question}</TableCell>
              <TableCell>{submission.score}</TableCell>
              <TableCell>{submission.submittedAt}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}