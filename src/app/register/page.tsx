'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { UserRegistrationForm } from '@/components/registration/UserRegistrationForm'
import { AdminRegistrationForm } from '@/components/registration/AdminRegistrationForm'
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

export default function Register() {
  const [isUser, setIsUser] = useState(true)

  return (
    <div className="container mx-auto px-4 py-8">
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
              {isUser ? <UserRegistrationForm /> : <AdminRegistrationForm />}
            </motion.div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}