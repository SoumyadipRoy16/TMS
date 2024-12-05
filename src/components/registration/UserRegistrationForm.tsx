// src/components/registration/UserRegistrationForm.tsx
'use client'

import { ChangeEvent, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useRouter } from 'next/navigation'
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { UserFormData, RegistrationFormProps } from '@/types/registration'

export function UserRegistrationForm({ onSubmit }: RegistrationFormProps<UserFormData>) {
  const router = useRouter()
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    reset
  } = useForm<UserFormData>()
  
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [otpSent, setOtpSent] = useState(false)
  const [resumeFile, setResumeFile] = useState<File | null>(null)

  const handleResumeChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      // Validate PDF
      if (file.type !== 'application/pdf') {
        alert('Only PDF files are allowed')
        e.target.value = '' // Clear the input
        return
      }
      
      // Validate file size (optional, e.g., max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        alert('File size should be less than 5MB')
        e.target.value = '' // Clear the input
        return
      }

      setResumeFile(file)
      setValue('resume', file)
    }
  }

  const submitHandler = async (data: UserFormData) => {
    if (onSubmit) {
      setIsSubmitting(true)
      try {
        if (!otpSent) {
          // Ensure resume is uploaded for user registration
          if (!resumeFile) {
            alert('Please upload your resume')
            setIsSubmitting(false)
            return
          }
        }

        await onSubmit({
          ...data,
          resume: resumeFile
        })
        // If OTP is sent, we'll let the parent component handle the state
        if (!otpSent) {
          setOtpSent(true)
        }else{
          router.push('/login')
        }
      } catch (error) {
        console.error('Submission error:', error)
      } finally {
        setIsSubmitting(false)
      }
    }
  }

  const renderInitialRegistrationForm = () => (
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
      <div className="space-y-2">
        <Label htmlFor="resume">Upload Resume (PDF only)</Label>
        <Input
          id="resume"
          type="file"
          accept=".pdf"
          onChange={handleResumeChange}
          required
        />
        {resumeFile && (
          <p className="text-sm text-muted-foreground">
            Selected file: {resumeFile.name}
          </p>
        )}
        {!resumeFile && (
          <p className="text-sm text-destructive">Resume is required</p>
        )}
      </div>
    </>
  )

  const renderOTPVerificationForm = () => (
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
  )

  return (
    <div className="space-y-6">
      <form onSubmit={handleSubmit(submitHandler)} className="space-y-4">
        {!otpSent ? renderInitialRegistrationForm() : renderOTPVerificationForm()}

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