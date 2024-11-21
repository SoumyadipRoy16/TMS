'use client'

import { useEffect, useState } from 'react'

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
    return <div>Loading...</div>
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-md mb-6">
      <h2 className="text-xl font-semibold mb-4">{problem.title}</h2>
      <div className="prose">
        <p>{problem.description}</p>
        <h3>Example:</h3>
        {problem.examples.map((example, index) => (
          <div key={index}>
            <pre>
              <code>
                {`Input: ${example.input}
Output: ${example.output}
Explanation: ${example.explanation}`}
              </code>
            </pre>
          </div>
        ))}
      </div>
    </div>
  )
}