"use client"

import React, { createContext, useContext, useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'

type User = {
  name: string
  role: 'user' | 'admin'
} | null

type TestStatus = {
  completed: boolean
  reattempted: boolean
  attemptsRemaining: number
}

type AuthContextType = {
  user: User
  testStatus: TestStatus
  login: (user: User) => void
  logout: () => void
  markTestAsCompleted: () => void
  resetTestCompletion: () => void
  initiateReattempt: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User>(null)
  const [testStatus, setTestStatus] = useState<TestStatus>({
    completed: false,
    reattempted: false,
    attemptsRemaining: 1
  })
  const router = useRouter()

  useEffect(() => {
    // Check for saved user and test status in localStorage on initial load
    const savedUser = localStorage.getItem('user')
    const savedTestStatus = localStorage.getItem('testStatus')
    
    if (savedUser) {
      setUser(JSON.parse(savedUser))
    }
    
    if (savedTestStatus) {
      setTestStatus(JSON.parse(savedTestStatus))
    }
  }, [])

  const login = (userData: User) => {
    setUser(userData)
    localStorage.setItem('user', JSON.stringify(userData))
  }

  const logout = () => {
    setUser(null)
    setTestStatus({
      completed: false,
      reattempted: false,
      attemptsRemaining: 1
    })
    localStorage.removeItem('user')
    localStorage.removeItem('testStatus')
    router.push('/')
  }

  const markTestAsCompleted = () => {
    const newTestStatus = {
      ...testStatus,
      completed: true
    }
    setTestStatus(newTestStatus)
    localStorage.setItem('testStatus', JSON.stringify(newTestStatus))
  }

  const resetTestCompletion = () => {
    const newTestStatus = {
      completed: false,
      reattempted: false,
      attemptsRemaining: 1
    }
    setTestStatus(newTestStatus)
    localStorage.removeItem('testStatus')
  }

  const initiateReattempt = () => {
    if (testStatus.attemptsRemaining > 0) {
      const newTestStatus = {
        ...testStatus,
        reattempted: true,
        attemptsRemaining: testStatus.attemptsRemaining - 1
      }
      setTestStatus(newTestStatus)
      localStorage.setItem('testStatus', JSON.stringify(newTestStatus))
    }
  }

  return (
    <AuthContext.Provider value={{ 
      user, 
      testStatus, 
      login, 
      logout, 
      markTestAsCompleted,
      resetTestCompletion,
      initiateReattempt
    }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}