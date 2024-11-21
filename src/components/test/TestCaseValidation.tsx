'use client'

import { useEffect, useState } from 'react'

type TestCase = {
  input: string
  output: string
}

export default function TestCaseValidation() {
  const [testCases, setTestCases] = useState<TestCase[]>([])

  useEffect(() => {
    async function fetchTestCases() {
      const response = await fetch('/api/coding-problem')
      const data = await response.json()
      setTestCases(data.testCases)
    }
    fetchTestCases()
  }, [])

  if (testCases.length === 0) {
    return <div>Loading...</div>
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">Test Cases</h2>
      <div className="space-y-4">
        {testCases.map((testCase, index) => (
          <div key={index} className="border-b pb-4 last:border-b-0">
            <p>
              <span className="font-medium">Input:</span> {testCase.input}
            </p>
            <p>
              <span className="font-medium">Expected Output:</span>{' '}
              {testCase.output}
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}