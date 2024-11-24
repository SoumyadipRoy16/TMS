// /api/results/route.ts

import { NextResponse } from 'next/server'
import connectDB from '@/lib/mongodb'

type Result = {
  username: string
  score: number
  questionId: string
}

export async function POST(request: Request) {
  try {
    const { username, score, questionId }: Result = await request.json()

    // Validate input
    if (!username || score === undefined || !questionId) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Connect to the database
    const db = await connectDB()

    // Insert the result into the 'results' collection
    const result = {
      username,
      score,
      questionId,
      timestamp: new Date(), // Store the timestamp when the result is submitted
    }

    await db.collection('results').insertOne(result)

    return NextResponse.json({ message: 'Result submitted successfully' })

  } catch (error) {
    console.error('Error submitting result:', error)
    return NextResponse.json(
      { error: 'Failed to submit result' },
      { status: 500 }
    )
  }
}
