import { NextResponse } from 'next/server'
import { ObjectId } from 'mongodb'
import connectDB from '@/lib/mongodb'

type Submission = {
  _id: string
  username: string
  questionId: string
  code: string
  timestamp: string
}

export async function GET(request: Request) {
  try {
    const db = await connectDB()

    // Fetch all submissions from the "submissions" collection
    const submissions = await db.collection('submissions').find({}).toArray()

    // If there are no submissions
    if (submissions.length === 0) {
      return NextResponse.json({ message: 'No submissions found' }, { status: 404 })
    }

    // Map over the submissions to format the data
    const transformedSubmissions: Submission[] = submissions.map((submission) => ({
      _id: submission._id.toString(),
      username: submission.username,
      questionId: submission.questionId,
      code: submission.code,
      timestamp: new Date(submission.timestamp).toLocaleString(),
    }))

    return NextResponse.json(transformedSubmissions)
  } catch (error) {
    console.error('Error fetching submissions:', error)
    return NextResponse.json({ error: 'Failed to fetch submissions' }, { status: 500 })
  }
}
