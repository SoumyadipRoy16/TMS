import { NextResponse } from 'next/server'

export async function GET() {
  // In a real application, this data would come from a database
  const recommendations = [
    'Review data structures and algorithms',
    'Practice coding challenges on LeetCode',
    'Build a personal project using React',
  ]

  return NextResponse.json(recommendations)
}

