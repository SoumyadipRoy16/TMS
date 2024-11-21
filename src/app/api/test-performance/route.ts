import { NextResponse } from 'next/server'

export async function GET() {
  // In a real application, this data would come from a database
  const performanceData = [
    { name: 'Test 1', score: 75 },
    { name: 'Test 2', score: 82 },
    { name: 'Test 3', score: 88 },
    { name: 'Test 4', score: 90 },
  ]

  return NextResponse.json(performanceData)
}

