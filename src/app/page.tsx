import Link from 'next/link'

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <main className="flex flex-col items-center justify-center w-full flex-1 px-20 text-center">
        <h1 className="text-6xl font-bold text-primary">
          Welcome to the Test Management System
        </h1>
        <p className="mt-3 text-2xl text-gray-600">
          Start your internship journey here
        </p>
        <div className="flex flex-wrap items-center justify-around max-w-4xl mt-6 sm:w-full">
          <Link
            href="/register"
            className="p-6 mt-6 text-left border w-96 rounded-xl hover:text-primary focus:text-primary"
          >
            <h3 className="text-2xl font-bold">Register &rarr;</h3>
            <p className="mt-4 text-xl">
              Sign up for our internship program and showcase your skills.
            </p>
          </Link>

          <Link
            href="/dashboard"
            className="p-6 mt-6 text-left border w-96 rounded-xl hover:text-primary focus:text-primary"
          >
            <h3 className="text-2xl font-bold">Dashboard &rarr;</h3>
            <p className="mt-4 text-xl">
              View your progress and manage your application.
            </p>
          </Link>

          <Link
            href="/test"
            className="p-6 mt-6 text-left border w-96 rounded-xl hover:text-primary focus:text-primary"
          >
            <h3 className="text-2xl font-bold">Take Test &rarr;</h3>
            <p className="mt-4 text-xl">
              Start your coding test and showcase your skills.
            </p>
          </Link>
        </div>
      </main>
    </div>
  )
}