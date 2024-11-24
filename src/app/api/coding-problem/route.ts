import { NextResponse } from 'next/server'
import { ObjectId } from 'mongodb'
import connectDB from '@/lib/mongodb'

// Types
type TestCase = {
  input: string
  output: string
}

type Question = {
  id: string
  title: string
  description: string
  difficulty: 'Easy' | 'Medium' | 'Hard'
  testCases: TestCase[]
}

type Submission = {
  userId: string
  questionId: string
  code: string
  language: string
  timestamp: Date
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const currentQuestionId = searchParams.get('currentQuestionId')
    
    const db = await connectDB()
    let query = {}
    
    if (currentQuestionId) {
      // Get the next question after the current one
      const currentQuestion = await db.collection('questions').findOne({
        _id: new ObjectId(currentQuestionId)
      })
      
      if (currentQuestion) {
        query = {
          _id: { $gt: new ObjectId(currentQuestionId) }
        }
      }
    }
    
    const question = await db.collection('questions')
      .findOne(query, { sort: { _id: 1 } })
    
    if (!question) {
      return NextResponse.json(
        { message: 'No more questions available' },
        { status: 404 }
      )
    }
    
    const transformedQuestion: Question = {
      id: question._id.toString(),
      title: question.title,
      description: question.description,
      difficulty: question.difficulty,
      testCases: question.testCases
    }
    
    return NextResponse.json(transformedQuestion)
  } catch (error) {
    console.error('GET Question Error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch question' },
      { status: 500 }
    )
  }
}

export async function POST(request: Request) {
  try {
    const submission = await request.json()
    
    // Validate submission
    if (!submission.questionId || !submission.code || !submission.language) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }
    
    const db = await connectDB()
    
    // Save the submission
    const submissionWithTimestamp: Submission = {
      ...submission,
      timestamp: new Date()
    }
    
    await db.collection('submissions').insertOne(submissionWithTimestamp)
    
    // Get the next question
    const nextQuestion = await db.collection('questions').findOne(
      { _id: { $gt: new ObjectId(submission.questionId) } },
      { sort: { _id: 1 } }
    )
    
    if (!nextQuestion) {
      return NextResponse.json(
        { message: 'No more questions available', isComplete: true },
        { status: 200 }
      )
    }
    
    const transformedQuestion: Question = {
      id: nextQuestion._id.toString(),
      title: nextQuestion.title,
      description: nextQuestion.description,
      difficulty: nextQuestion.difficulty,
      testCases: nextQuestion.testCases
    }
    
    return NextResponse.json({
      message: 'Submission successful',
      nextQuestion: transformedQuestion
    })
  } catch (error) {
    console.error('POST Submission Error:', error)
    return NextResponse.json(
      { error: 'Failed to submit code' },
      { status: 500 }
    )
  }
}