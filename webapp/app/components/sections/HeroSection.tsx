import Link from "next/link"

export function HeroSection() {
  return (
    <section className="bg-gradient-to-br from-blue-50 to-indigo-100 py-20">
      <div className="container">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            Advanced Survey
            <span className="text-blue-600"> Management</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Create, distribute, and analyze surveys with our powerful SDK. Built for developers, designed for everyone.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Link href="/surveys/1" className="btn-primary text-lg px-8 py-4">
              Try Demo Survey
            </Link>
            <Link href="/surveys" className="btn-secondary text-lg px-8 py-4">
              Browse All Surveys
            </Link>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-2xl mx-auto">
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600 mb-2">99.9%</div>
              <div className="text-gray-600">Uptime</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600 mb-2">&lt; 200ms</div>
              <div className="text-gray-600">Response Time</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600 mb-2">TypeScript</div>
              <div className="text-gray-600">First</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
