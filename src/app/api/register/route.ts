import { NextResponse } from 'next/server'
import bcrypt from 'bcryptjs'

export async function POST(request: Request) {
  const body = await request.json()
  const { firstName, lastName, email, password, role } = body

  // In a real application, you would save this data to your database
  // For this example, we'll just log it and return a success message

  // Hash the password
  const hashedPassword = await bcrypt.hash(password, 10)

  console.log('Registering new user:', { firstName, lastName, email, role })

  // Here you would typically save the user to your database
  // const newUser = await db.user.create({ firstName, lastName, email, password: hashedPassword, role })

  return NextResponse.json({ success: true, message: 'User registered successfully' })
}