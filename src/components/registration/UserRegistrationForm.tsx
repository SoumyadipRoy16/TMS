// src/components/registration/UserRegistrationForm.tsx
'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { UserFormData, RegistrationFormProps } from '@/types/registration'

export function UserRegistrationForm({ onSubmit }: RegistrationFormProps<UserFormData>) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UserFormData>()
  
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [otpSent, setOtpSent] = useState(false)

  const submitHandler = async (data: UserFormData) => {
    if (onSubmit) {
      setIsSubmitting(true)
      try {
        await onSubmit(data)
      } catch (error) {
        console.error('Submission error:', error)
      } finally {
        setIsSubmitting(false)
      }
    }
  }

  return (
    <div className="space-y-6">
      <form onSubmit={handleSubmit(submitHandler)} className="space-y-4">
        {!otpSent && (
          <>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="firstName">First Name</Label>
                <Input
                  id="firstName"
                  {...register('firstName', { required: 'First name is required' })}
                />
                {errors.firstName && (
                  <p className="text-sm text-destructive">{errors.firstName.message}</p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName">Last Name</Label>
                <Input
                  id="lastName"
                  {...register('lastName', { required: 'Last name is required' })}
                />
                {errors.lastName && (
                  <p className="text-sm text-destructive">{errors.lastName.message}</p>
                )}
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                {...register('email', {
                  required: 'Email is required',
                  pattern: {
                    value: /\S+@\S+\.\S+/,
                    message: 'Invalid email address',
                  },
                })}
              />
              {errors.email && (
                <p className="text-sm text-destructive">{errors.email.message}</p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                {...register('password', {
                  required: 'Password is required',
                  minLength: {
                    value: 8,
                    message: 'Password must be at least 8 characters long',
                  },
                })}
              />
              {errors.password && (
                <p className="text-sm text-destructive">{errors.password.message}</p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="education">Education</Label>
              <Input
                id="education"
                {...register('education', { required: 'Education is required' })}
                placeholder="e.g., Computer Science, B.S."
              />
              {errors.education && (
                <p className="text-sm text-destructive">{errors.education.message}</p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="skills">Skills</Label>
              <Input
                id="skills"
                {...register('skills', { required: 'Skills are required' })}
                placeholder="e.g., JavaScript, React, Node.js"
              />
              {errors.skills && (
                <p className="text-sm text-destructive">{errors.skills.message}</p>
              )}
            </div>
          </>
        )}

        {/* OTP verification field */}
        {otpSent && (
          <div className="space-y-2">
            <Label htmlFor="otp">Enter OTP</Label>
            <Input
              id="otp"
              type="text"
              {...register('otp', { 
                required: 'OTP is required',
                minLength: {
                  value: 6,
                  message: 'OTP must be 6 digits'
                },
                maxLength: {
                  value: 6,
                  message: 'OTP must be 6 digits'
                }
              })}
              placeholder="Enter 6-digit OTP"
            />
            {errors.otp && (
              <p className="text-sm text-destructive">{errors.otp.message}</p>
            )}
          </div>
        )}

        <Button 
          type="submit" 
          disabled={isSubmitting} 
          className="w-full"
        >
          {isSubmitting 
            ? otpSent 
              ? 'Verifying OTP...' 
              : 'Sending OTP...'
            : otpSent 
              ? 'Verify OTP' 
              : 'Send OTP'
          }
        </Button>
      </form>
    </div>
  )
}