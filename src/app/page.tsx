import Link from 'next/link'

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <main className="flex flex-col items-center justify-center w-full flex-1 px-4 sm:px-20 text-center">
        <h1 className="text-4xl sm:text-6xl font-bold text-primary mb-4">
          Welcome to the Test Management System
        </h1>
        <p className="mt-3 text-xl text-muted-foreground mb-8">
          Start your internship journey here
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-4xl">
          <Link
            href="/register"
            className="p-6 text-left border rounded-xl hover:border-primary transition-colors duration-300"
          >
            <h3 className="text-2xl font-bold text-foreground mb-2">Register &rarr;</h3>
            <p className="text-muted-foreground">
              Sign up for our internship program and showcase your skills.
            </p>
          </Link>

          <Link
            href="/dashboard"
            className="p-6 text-left border rounded-xl hover:border-primary transition-colors duration-300"
          >
            <h3 className="text-2xl font-bold text-foreground mb-2">Dashboard &rarr;</h3>
            <p className="text-muted-foreground">
              View your progress and manage your application.
            </p>
          </Link>

          <Link
            href="/test"
            className="p-6 text-left border rounded-xl hover:border-primary transition-colors duration-300"
          >
            <h3 className="text-2xl font-bold text-foreground mb-2">Take Test &rarr;</h3>
            <p className="text-muted-foreground">
              Start your coding test and showcase your skills.
            </p>
          </Link>
        </div>
      </main>
    </div>
  )
}