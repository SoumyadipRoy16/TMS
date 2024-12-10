import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight, Code, BarChart2, Users } from 'lucide-react'
import { Button } from "@/components/ui/button"

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-secondary dark:from-background dark:to-secondary-dark overflow-hidden relative">
      {/* Ribbon effect */}
      <div className="ribbon-container">
        <div className="ribbon ribbon-1"></div>
        <div className="ribbon ribbon-2"></div>
        <div className="ribbon ribbon-3"></div>
      </div>

      {/* Glowing orbs */}
      <div className="glow-container">
        <div className="glow glow-1"></div>
        <div className="glow glow-2"></div>
        <div className="glow glow-3"></div>
      </div>

      <main className="relative z-10 flex flex-col items-center justify-center w-full px-4 py-16 text-center">
        <h1 className="text-5xl md:text-7xl font-extrabold text-primary mb-6 animate-text-gradient bg-gradient-to-r from-primary via-purple-500 to-pink-500 bg-clip-text text-transparent">
          Test Management System
        </h1>
        <p className="mt-3 text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto mb-8">
          Elevate your internship journey with our advanced platform. Showcase your skills, tackle challenging problems, and track your progress in real-time.
        </p>
        
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          <Link href="/register">
            <Button size="lg" className="text-lg">
              Get Started
              <ArrowRight className="ml-2" />
            </Button>
          </Link>
          <Link href="#features">
            <Button size="lg" variant="outline" className="text-lg">
              Learn More
            </Button>
          </Link>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          <FeatureCard
            icon={<Code className="w-12 h-12 text-primary" />}
            title="Advanced Coding Tests"
            description="Take on real-world coding challenges in a professional-grade environment."
          />
          <FeatureCard
            icon={<BarChart2 className="w-12 h-12 text-primary" />}
            title="Performance Analytics"
            description="Get detailed insights into your test performance and progress over time."
          />
          <FeatureCard
            icon={<Users className="w-12 h-12 text-primary" />}
            title="Peer Comparison"
            description="See how you stack up against other applicants and identify areas for improvement."
          />
        </div>

        <div className="mt-16">
          <h2 className="text-3xl font-bold mb-6">Trusted by Leading Tech Companies</h2>
          <div className="flex flex-wrap justify-center items-center gap-8">
            <Image src="https://media.licdn.com/dms/image/v2/D560BAQES977bWAfoIg/company-logo_200_200/company-logo_200_200/0/1721977526454/synexoo_logo?e=1741824000&v=beta&t=ksEdcx0-VIqwLM5SCHMTexxPl4dUXuaHtwXFJUlYrcQ" alt="Synexoo" width={120} height={40} />
            <Image src="https://th.bing.com/th/id/OIP.D4XI2Rda44z6l59KWzRwWwHaEZ?w=626&h=372&rs=1&pid=ImgDetMain" alt="GeekForGeeks" width={120} height={40} />
            <Image src="https://miro.medium.com/v2/resize:fit:1118/1*xwh3VrV-PAG89ROdLj6oXg.png" alt="Leetcode" width={120} height={40} />
            <Image src="https://th.bing.com/th/id/OIP.tQ4ewLt9ddhBlXFmvhMLoAHaD4?w=1500&h=785&rs=1&pid=ImgDetMain" alt="Code Ninjas" width={120} height={40} />
          </div>
        </div>
      </main>
    </div>
  )
}

function FeatureCard({ icon, title, description }: FeatureCardProps) {
  return (
    <div className="bg-card text-card-foreground p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 border border-border">
      <div className="mb-4">{icon}</div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-muted-foreground">{description}</p>
    </div>
  )
}