import Hero from '@/components/landing/Hero'
import Features from '@/components/landing/Features'
import Testimonials from '@/components/landing/Testimonials'

export default function Home() {
  return (
    <div className="container mx-auto px-4">
      <Hero />
      <Features />
      <Testimonials />
    </div>
  )
}