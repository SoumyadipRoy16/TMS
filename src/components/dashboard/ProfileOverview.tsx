'use client'

import { User } from 'lucide-react'
import { useEffect, useState } from 'react'

type UserData = {
  firstName: string
  lastName: string
  email: string
  education: string
  skills: string[]
}

export default function ProfileOverview() {
  const [userData, setUserData] = useState<UserData | null>(null)

  useEffect(() => {
    async function fetchUserData() {
      const response = await fetch('/api/user')
      const data = await response.json()
      setUserData(data)
    }
    fetchUserData()
  }, [])

  if (!userData) {
    return <div>Loading...</div>
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">Profile Overview</h2>
      <div className="flex items-center mb-4">
        <User size={48} className="text-gray-400 mr-4" />
        <div>
          <p className="font-medium">
            {userData.firstName} {userData.lastName}
          </p>
          <p className="text-sm text-gray-500">{userData.email}</p>
        </div>
      </div>
      <div className="space-y-2">
        <p>
          <span className="font-medium">Education:</span> {userData.education}
        </p>
        <p>
          <span className="font-medium">Skills:</span>{' '}
          {userData.skills.join(', ')}
        </p>
      </div>
    </div>
  )
}