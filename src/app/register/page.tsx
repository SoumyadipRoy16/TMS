// /register/page.tsx

'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { UserRegistrationForm } from '@/components/registration/UserRegistrationForm'
import { AdminRegistrationForm } from '@/components/registration/AdminRegistrationForm'
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Toast } from "@/components/ui/toast"
import { UserFormData, AdminFormData } from '@/types/registration'

export default function Register() {
  const [isUser, setIsUser] = useState(true)
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

  const handleRegistration = async (formData: UserFormData | AdminFormData) => {
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

      const result = await response.json();

      if (result.success) {
        showToast("Registration successful!", "default")
      } else {
        showToast(result.message || "Registration failed", "destructive")
      }
    } catch (error) {
      showToast("Registration failed. Please try again.", "destructive")
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
                <UserRegistrationForm onSubmit={handleRegistration} />
              ) : (
                <AdminRegistrationForm onSubmit={handleRegistration} />
              )}
            </motion.div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}