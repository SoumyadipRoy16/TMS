'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'

type FormData = {
  firstName: string
  lastName: string
  email: string
  password: string
  education: string
  skills: string
}

export default function RegistrationForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>()
  const [isSubmitting, setIsSubmitting] = useState(false)

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true)
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000))
    console.log(data)
    setIsSubmitting(false)
    // Handle successful registration (e.g., redirect to dashboard)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <label htmlFor="firstName" className="block mb-1 font-medium">
            First Name
          </label>
          <input
            type="text"
            id="firstName"
            {...register('firstName', { required: 'First name is required' })}
            className="w-full px-3 py-2 border rounded-md"
          />
          {errors.firstName && (
            <p className="text-red-500 text-sm mt-1">
              {errors.firstName.message}
            </p>
          )}
        </div>
        <div>
          <label htmlFor="lastName" className="block mb-1 font-medium">
            Last Name
          </label>
          <input
            type="text"
            id="lastName"
            {...register('lastName', { required: 'Last name is required' })}
            className="w-full px-3 py-2 border rounded-md"
          />
          {errors.lastName && (
            <p className="text-red-500 text-sm mt-1">
              {errors.lastName.message}
            </p>
          )}
        </div>
      </div>
      <div>
        <label htmlFor="email" className="block mb-1 font-medium">
          Email
        </label>
        <input
          type="email"
          id="email"
          {...register('email', {
            required: 'Email is required',
            pattern: {
              value: /\S+@\S+\.\S+/,
              message: 'Invalid email address',
            },
          })}
          className="w-full px-3 py-2 border rounded-md"
        />
        {errors.email && (
          <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
        )}
      </div>
      <div>
        <label htmlFor="password" className="block mb-1 font-medium">
          Password
        </label>
        <input
          type="password"
          id="password"
          {...register('password', {
            required: 'Password is required',
            minLength: {
              value: 8,
              message: 'Password must be at least 8 characters long',
            },
          })}
          className="w-full px-3 py-2 border rounded-md"
        />
        {errors.password && (
          <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
        )}
      </div>
      <div>
        <label htmlFor="education" className="block mb-1 font-medium">
          Education
        </label>
        <input
          type="text"
          id="education"
          {...register('education', { required: 'Education is required' })}
          className="w-full px-3 py-2 border rounded-md"
          placeholder="e.g., Computer Science, B.S."
        />
        {errors.education && (
          <p className="text-red-500 text-sm mt-1">
            {errors.education.message}
          </p>
        )}
      </div>
      <div>
        <label htmlFor="skills" className="block mb-1 font-medium">
          Skills
        </label>
        <input
          type="text"
          id="skills"
          {...register('skills', { required: 'Skills are required' })}
          className="w-full px-3 py-2 border rounded-md"
          placeholder="e.g., JavaScript, React, Node.js"
        />
        {errors.skills && (
          <p className="text-red-500 text-sm mt-1">{errors.skills.message}</p>
        )}
      </div>
      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition duration-300 disabled:opacity-50"
      >
        {isSubmitting ? 'Registering...' : 'Register'}
      </button>
    </form>
  )
}