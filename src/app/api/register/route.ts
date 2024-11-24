// /api/register/route.ts

import { NextResponse } from 'next/server'
import bcrypt from 'bcryptjs'
import connectDB from '@/lib/mongodb'
import User from '@/models/User'

const ADMIN_CODE = process.env.ADMIN_CODE || 'default_admin_code'

export async function POST(request: Request) {
  await connectDB()

  const body = await request.json()
  const { firstName, lastName, email, password, role, adminCode } = body

  try {
    // Check if user already exists
    const existingUser = await User.findOne({ email })
    if (existingUser) {
      return NextResponse.json({ success: false, message: 'User already exists' }, { status: 400 })
    }

    // Validate admin code if registering as admin
    if (role === 'admin') {
      if (!adminCode || adminCode !== ADMIN_CODE) {
        return NextResponse.json({ success: false, message: 'Invalid admin code' }, { status: 403 })
      }
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10)

    // Create new user
    const newUser = new User({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      role
    })

    await newUser.save()

    return NextResponse.json({ 
      success: true, 
      message: 'User registered successfully',
      user: { firstName, lastName, email, role } 
    })
  } catch (error) {
    console.error('Registration error:', error)
    return NextResponse.json({ success: false, message: 'Registration failed' }, { status: 500 })
  }
}