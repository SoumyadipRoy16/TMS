import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import connectDB from '@/lib/mongodb';
import User from '@/models/User';
import { sendOTPEmail, sendWelcomeEmail } from '@/lib/email';
import { verifyOTP } from '@/lib/redis';
import { writeFile } from 'fs/promises';
import path from 'path';

const ADMIN_CODE = process.env.ADMIN_CODE || 'default_admin_code';

export async function POST(request: Request) {
  await connectDB();
  const formData = await request.formData();
  
  // Convert FormData to an object
  const data: { [key: string]: any } = {};
  formData.forEach((value, key) => {
    data[key] = value;
  });

  const { 
    firstName, 
    lastName, 
    email, 
    password, 
    role, 
    adminCode, 
    otp,
    education,
    skills 
  } = data;

  try {
    // Resume handling for user registration
    let resumePath = null;
    if (role === 'user' && formData.get('resume')) {
      const resume = formData.get('resume') as File;
      
      // Generate unique filename
      const filename = `${Date.now()}_${resume.name}`;
      const uploadDir = path.join(process.cwd(), 'public', 'resumes');
      
      // Ensure directory exists
      await writeFile(
        path.join(uploadDir, filename), 
        Buffer.from(await resume.arrayBuffer())
      );

      resumePath = `/resumes/${filename}`;
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json(
        { success: false, message: 'User already exists' },
        { status: 400 }
      );
    }

    // Admin Registration (simplified for brevity)
    if (role === 'admin') {
      if (!adminCode || adminCode !== ADMIN_CODE) {
        return NextResponse.json(
          { success: false, message: 'Invalid admin code' },
          { status: 403 }
        );
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      const newAdmin = new User({
        firstName,
        lastName,
        email,
        password: hashedPassword,
        role,
      });

      await newAdmin.save();

      return NextResponse.json(
        {
          success: true,
          message: 'Admin registered successfully. Please log in.',
          redirect: '/login',
        },
        { status: 201 }
      );
    }

    // User Registration with OTP
    if (role === 'user') {
      // OTP sending logic
      if (!otp) {
        const otpSent = await sendOTPEmail(email);
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
                education,
                skills,
                resumePath,
              },
            },
            { status: 200 }
          );
        } else {
          return NextResponse.json(
            { success: false, message: 'Failed to send OTP' },
            { status: 500 }
          );
        }
      }

      // OTP Verification
      const isOTPValid = await verifyOTP(email, otp);
      if (!isOTPValid) {
        return NextResponse.json(
          { success: false, message: 'Invalid or expired OTP' },
          { status: 400 }
        );
      }

      // Hash the password
      const hashedPassword = await bcrypt.hash(password, 10);

      // Create new user with resume
      const newUser = new User({
        firstName,
        lastName,
        email,
        password: hashedPassword,
        role,
        education,
        skills,
        resume: resumePath ? {
          filename: resumePath.split('/').pop(),
          path: resumePath,
          mimetype: 'application/pdf'
        } : undefined,
      });

      await newUser.save();

      await sendWelcomeEmail(firstName, email);

      return NextResponse.json(
        {
          success: true,
          message: 'User registered successfully. Please log in.',
          redirect: '/login',
        },
        { status: 201 }
      );
    }

    // Invalid role
    return NextResponse.json(
      { success: false, message: 'Invalid role' },
      { status: 400 }
    );
  } catch (error) {
    console.error('Complete Registration Error:', error);
    return NextResponse.json(
      { success: false, message: 'Registration failed' },
      { status: 500 }
    );
  }
}