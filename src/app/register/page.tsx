import RegistrationForm from '@/components/registration/RegistrationForm'
import SocialMediaRegistration from '@/components/registration/SocialMediaRegistration'

export default function Register() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-center">
        Register for Internship
      </h1>
      <div className="max-w-2xl mx-auto">
        <RegistrationForm />
        <div className="mt-8">
          <SocialMediaRegistration />
        </div>
      </div>
    </div>
  )
}

