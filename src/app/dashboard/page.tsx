import ProfileOverview from '@/components/dashboard/ProfileOverview'
import TestPerformance from '@/components/dashboard/TestPerformance'
import ApplicationStatus from '@/components/dashboard/ApplicationStatus'
import RecommendationCard from '@/components/dashboard/RecommendationCard'

export default function Dashboard() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        <ProfileOverview />
        <TestPerformance />
        <ApplicationStatus />
        <RecommendationCard />
      </div>
    </div>
  )
}

