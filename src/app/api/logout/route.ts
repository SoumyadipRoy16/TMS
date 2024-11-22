import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'

export async function POST() {
  // Clear the token cookie
  cookies().set('token', '', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    expires: new Date(0),
    path: '/',
  })

  return NextResponse.json({ success: true })
}