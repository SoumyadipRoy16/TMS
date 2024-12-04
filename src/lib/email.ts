import nodemailer from 'nodemailer'
import { setOTP } from './redis'

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: parseInt(process.env.SMTP_PORT || '587'),
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
})

export const generateOTP = () => {
  return Math.floor(100000 + Math.random() * 900000).toString()
}

export const sendOTPEmail = async (email: string) => {
  const otp = generateOTP()
  
  try {
    console.log('Generating OTP:', {
      email,
      otp
    });

    // Store OTP in Upstash Redis with explicit conversion
    await setOTP(email, otp)
    
    console.log('OTP Stored for:', email);

    await transporter.sendMail({
        from: {
            name: 'TMS System',
            address: process.env.SMTP_FROM_EMAIL!
          },
      to: email,
      subject: 'Your OTP for Registration',
      text: `Your OTP is: ${otp}. This OTP will expire in 10 minutes.`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 500px; margin: 0 auto;">
          <h2>OTP Verification</h2>
          <p>Your One-Time Password (OTP) is:</p>
          <h3 style="background-color: #f0f0f0; padding: 10px; text-align: center; letter-spacing: 5px;">${otp}</h3>
          <p>This OTP will expire in 10 minutes. Do not share it with anyone.</p>
        </div>
      `
    })
    
    console.log('OTP Email sent successfully to:', email);
    return true
  } catch (error) {
    console.error('OTP Generation and Email Error:', error)
    return false
  }
}