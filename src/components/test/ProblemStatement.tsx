'use client'

import { useEffect, useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

type CodingProblem = {
  title: string
  description: string
  examples: {
    input: string
    output: string
    explanation: string
  }[]
}

export default function ProblemStatement() {
  const [problem, setProblem] = useState<CodingProblem | null>(null)

  useEffect(() => {
    async function fetchProblem() {
      const response = await fetch('/api/coding-problem')
      const data = await response.json()
      setProblem(data)
    }
    fetchProblem()
  }, [])

  if (!problem) {
    return <div className="text-muted-foreground">Loading...</div>
  }

  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle>{problem.title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="prose dark:prose-invert">
          <p>{problem.description}</p>
          <h3 className="text-lg font-semibold mt-4 mb-2">Example:</h3>
          {problem.examples.map((example, index) => (
            <div key={index} className="bg-muted p-4 rounded-md my-2">
              <pre className="text-sm">
                <code>
                  {`Input: ${example.input}
Output: ${example.output}
Explanation: ${example.explanation}`}
                </code>
              </pre>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}