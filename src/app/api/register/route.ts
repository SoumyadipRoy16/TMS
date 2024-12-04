import { NextResponse } from 'next/server'
import bcrypt from 'bcryptjs'
import connectDB from '@/lib/mongodb'
import User from '@/models/User'
import { sendOTPEmail } from '@/lib/email'
import { verifyOTP } from '@/lib/redis'

const ADMIN_CODE = process.env.ADMIN_CODE || 'default_admin_code'

export async function POST(request: Request) {
  await connectDB()
  const body = await request.json()
  const { firstName, lastName, email, password, role, adminCode, otp } = body

  console.log('Registration Request Body:', {
    email,
    role,
    otpProvided: !!otp,
    otp: otp ? 'REDACTED' : 'NOT PROVIDED'
  });

  try {
    // Check if user already exists
    const existingUser = await User.findOne({ email })
    if (existingUser) {
      console.log('User already exists:', email);
      return NextResponse.json(
        { success: false, message: 'User already exists' }, 
        { status: 400 }
      )
    }

    // Validate admin code if registering as admin
    if (role === 'admin') {
      if (!adminCode || adminCode !== ADMIN_CODE) {
        console.log('Invalid admin code for:', email);
        return NextResponse.json(
          { success: false, message: 'Invalid admin code' }, 
          { status: 403 }
        )
      }
    }

    // OTP is always required
    if (!otp) {
      console.log('Sending OTP to:', email);
      const otpSent = await sendOTPEmail(email)
      if (otpSent) {
        return NextResponse.json(
          { 
            success: true, 
            message: 'OTP sent to email', 
            otpRequired: true,
            registrationData: { 
              firstName, 
              lastName, 
              email, 
              password, 
              role, 
              adminCode,
              education: body.education,
              skills: body.skills
            }
          }, 
          { status: 200 }
        )
      } else {
        console.log('Failed to send OTP to:', email);
        return NextResponse.json(
          { success: false, message: 'Failed to send OTP' }, 
          { status: 500 }
        )
      }
    }

    // OTP Verification Step
    if (otp) {
      console.log('Attempting OTP Verification for:', email);
      const isOTPValid = await verifyOTP(email, otp)
      
      console.log('OTP Verification Result:', isOTPValid);

      if (!isOTPValid) {
        console.log('Invalid OTP for email:', email);
        return NextResponse.json(
          { success: false, message: 'Invalid or expired OTP' }, 
          { status: 400 }
        )
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
      role,
      education: body.education,
      skills: body.skills
    })

    await newUser.save()

    console.log('User registered successfully:', email);

    return NextResponse.json(
      { 
        success: true, 
        message: 'User registered successfully', 
        user: { 
          firstName, 
          lastName, 
          email, 
          role 
        } 
      }, 
      { status: 201 }
    )
  } catch (error) {
    console.error('Complete Registration Error:', error)
    return NextResponse.json(
      { success: false, message: 'Registration failed' }, 
      { status: 500 }
    )
  }
}