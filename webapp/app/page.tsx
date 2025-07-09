import Link from 'next/link'
import { HeroSection } from './components/sections/HeroSection'
import { FeaturesSection } from './components/sections/FeaturesSection'

export default function HomePage() {
  return (
      <main className="flex-1 flex flex-col">
        <HeroSection/>
        <FeaturesSection/>

        {/* Quick Access Section */}
        <section className="py-16 bg-white">
          <div className="container">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Get Started Now</h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Explore our survey platform and see how easy it is to create, manage, and analyze surveys.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              <Link href="/surveys" className="group">
                <div className="card hover:shadow-lg transition-shadow group-hover:border-blue-200">
                  <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-4">
                    <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                      />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold mb-2 group-hover:text-blue-600 transition-colors">
                    Browse Surveys
                  </h3>
                  <p className="text-gray-600">
                    View all available surveys and participate in the ones that interest you.
                  </p>
                </div>
              </Link>

              <Link href="/surveys/1" className="group">
                <div className="card hover:shadow-lg transition-shadow group-hover:border-green-200">
                  <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mb-4">
                    <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                      />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold mb-2 group-hover:text-green-600 transition-colors">
                    Take Survey
                  </h3>
                  <p className="text-gray-600">
                    Experience our survey widget by taking a sample customer satisfaction survey.
                  </p>
                </div>
              </Link>

              <Link href="/surveys/1/metrics" className="group">
                <div className="card hover:shadow-lg transition-shadow group-hover:border-purple-200">
                  <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mb-4">
                    <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                      />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold mb-2 group-hover:text-purple-600 transition-colors">
                    View Analytics
                  </h3>
                  <p className="text-gray-600">Explore detailed analytics and insights from survey responses.</p>
                </div>
              </Link>
            </div>
          </div>
        </section>
      </main>
  )
}
