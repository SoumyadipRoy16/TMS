'use client'

import { User } from 'lucide-react'
import { useEffect, useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

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
    return <div className="text-muted-foreground">Loading...</div>
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-foreground">Profile Overview</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-center mb-4">
          <User size={48} className="text-primary mr-4" />
          <div>
            <p className="font-medium text-foreground">
              {userData.firstName} {userData.lastName}
            </p>
            <p className="text-sm text-muted-foreground">{userData.email}</p>
          </div>
        </div>
        <div className="space-y-2">
          <p className="text-foreground">
            <span className="font-medium">Education:</span> {userData.education}
          </p>
          <p className="text-foreground">
            <span className="font-medium">Skills:</span>{' '}
            {userData.skills.join(', ')}
          </p>
        </div>
      </CardContent>
    </Card>
  )
}