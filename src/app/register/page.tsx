'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { UserRegistrationForm } from '@/components/registration/UserRegistrationForm'
import { AdminRegistrationForm } from '@/components/registration/AdminRegistrationForm'
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { useRouter } from 'next/navigation'
import { Toast } from "@/components/ui/toast"
import { UserFormData, AdminFormData, OTPVerificationResponse } from '@/types/registration'

export default function Register() {
  const [isUser, setIsUser] = useState(true)
  const [otpSent, setOtpSent] = useState(false)
  const router = useRouter()
  const [registrationData, setRegistrationData] = useState<Partial<UserFormData | AdminFormData>>({})
  const [toast, setToast] = useState<{
    message: string, 
    variant?: "default" | "destructive", 
    visible: boolean
  }>({
    message: "",
    variant: "default",
    visible: false
  })

  const showToast = (message: string, variant: "default" | "destructive" = "destructive") => {
    setToast({ message, variant, visible: true })
    
    setTimeout(() => {
      setToast(prev => ({ ...prev, visible: false }))
    }, 3000)
  }

  const handleInitialRegistration = async (formData: UserFormData) => {
    try {
      const response = await fetch('/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          role: isUser ? 'user' : 'admin'
        })
      });

      const result: OTPVerificationResponse = await response.json();

      if (result.otpRequired && result.registrationData) {
        // OTP is required, switch to OTP input mode
        setOtpSent(true)
        setRegistrationData(result.registrationData)
        showToast("OTP sent to your email. Please verify.", "default")
      } else if (result.success) {
        // Direct registration success (for admin or other scenarios)
        showToast("Registration successful!", "default")
        router.push('/login')
      } else {
        // Registration failed
        showToast(result.message || "Registration failed", "destructive")
      }
    } catch (error) {
      showToast("Registration failed. Please try again.", "destructive")
    }
  }

  const handleOTPVerification = async (formData: UserFormData) => {
    try {
      const response = await fetch('/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          ...registrationData, 
          otp: formData.otp 
        })
      });

      const result: OTPVerificationResponse = await response.json();

      if (result.success) {
        showToast("Registration successful!", "default")
        // You might want to redirect or reset the form here
        setOtpSent(false)
        setRegistrationData({})
      } else {
        showToast(result.message || "OTP verification failed", "destructive")
        // Optionally, you can reset OTP state to allow retrying
        setOtpSent(false)
      }
    } catch (error) {
      showToast("OTP verification failed. Please try again.", "destructive")
      setOtpSent(false)
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {toast.visible && (
        <Toast 
          message={toast.message} 
          variant={toast.variant} 
          state={toast.visible ? "visible" : "hidden"}
          className="absolute top-4 left-1/2 -translate-x-1/2"
        />
      )}
      
      <h1 className="text-3xl font-bold mb-6 text-center">Register</h1>
      <div className="max-w-md mx-auto">
        <div className="flex justify-center space-x-4 mb-6">
          <Button
            onClick={() => setIsUser(true)}
            variant={isUser ? "default" : "outline"}
          >
            Register as User
          </Button>
          <Button
            onClick={() => setIsUser(false)}
            variant={!isUser ? "default" : "outline"}
          >
            Register as Admin
          </Button>
        </div>
        <Card className="w-full">
          <CardContent className="p-6">
            <motion.div
              initial={false}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3 }}
              key={isUser ? 'user' : 'admin'}
            >
              {isUser ? (
                <UserRegistrationForm 
                  onSubmit={!otpSent ? handleInitialRegistration : handleOTPVerification} 
                />
              ) : (
                <AdminRegistrationForm onSubmit={handleInitialRegistration} />
              )}
            </motion.div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}