import { NextResponse } from 'next/server'

export async function GET() {
  // In a real application, this data would come from a database
  const userData = {
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@example.com',
    education: 'Computer Science, B.S.',
    skills: ['JavaScript', 'React', 'Node.js'],
  }

  return NextResponse.json(userData)
}

