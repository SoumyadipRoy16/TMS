import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import jwt from 'jsonwebtoken'

export async function POST(request: Request) {
  const { email, password } = await request.json()

  // In a real application, you would validate the email and password against your database
  // For this example, we'll use a mock user
  const user = { id: 1, email: 'user@example.com', role: 'user' }

  if (email === user.email && password === 'password') {
    // Create a JWT token
    const token = jwt.sign(
      { userId: user.id, email: user.email, role: user.role },
      process.env.JWT_SECRET || 'fallback_secret',
      { expiresIn: '1h' }
    )

    // Set the token in a cookie
    cookies().set('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 3600, // 1 hour
      path: '/',
    })

    return NextResponse.json({ success: true, user: { email: user.email, role: user.role } })
  }

  return NextResponse.json({ success: false, message: 'Invalid credentials' }, { status: 401 })
}