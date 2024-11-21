import { Github, Linkedin } from 'lucide-react'

export default function SocialMediaRegistration() {
  return (
    <div>
      <p className="text-center mb-4">Or register with</p>
      <div className="flex justify-center space-x-4">
        <button className="flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50 transition duration-300">
          <Github className="mr-2" size={20} />
          GitHub
        </button>
        <button className="flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50 transition duration-300">
          <Linkedin className="mr-2" size={20} />
          LinkedIn
        </button>
      </div>
    </div>
  )
}

