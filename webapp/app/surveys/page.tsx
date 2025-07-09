'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { LoadingSpinner, useSurveyContext } from '@company/survey-sdk'
import { EmptyState } from '@company/survey-sdk'
import type { Survey } from '@company/survey-sdk'

export default function SurveysPage() {
  const { api } = useSurveyContext()
  const [surveys, setSurveys] = useState<Survey[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    api
        .getSurveys()
        .then(setSurveys)
        .catch((err) => setError(err.message))
        .finally(() => setLoading(false))
  }, [api])

  return (
      <main className="flex-1 flex flex-col py-12">
        <div className="flex-1 flex flex-col container">
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Available Surveys</h1>
            <p className="text-xl text-gray-600">
              Choose a survey to participate in and share your valuable feedback.
            </p>
          </div>

          {loading && (
              <div className="flex justify-center py-12">
                <div className="text-center">
                  <LoadingSpinner size="lg"/>
                  <p className="mt-4 text-gray-600">Loading surveys...</p>
                </div>
              </div>
          )}

          {error && (
              <div className="card bg-red-50 border-red-200">
                <EmptyState
                    title="Failed to load surveys"
                    description={error}
                    action={
                      <button onClick={() => window.location.reload()} className="btn-primary">
                        Try Again
                      </button>
                    }
                />
              </div>
          )}

          {!loading && !error && surveys.length === 0 && (
              <div className="card">
                <EmptyState
                    title="No surveys available"
                    description="There are no surveys available at the moment. Please check back later."
                    icon={
                      <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center">
                        <svg className="w-8 h-8 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                          />
                        </svg>
                      </div>
                    }
                />
              </div>
          )}

          {!loading && !error && surveys.length > 0 && (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {surveys.map((survey) => (
                    <div key={survey.id} className="card hover:shadow-lg transition-shadow group">
                      <div className="flex items-start justify-between mb-4">
                        <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                          <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor"
                               viewBox="0 0 24 24">
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                            />
                          </svg>
                        </div>
                        <span
                            className="text-sm text-gray-500">{new Date(survey.createdAt).toLocaleDateString()}</span>
                      </div>

                      <h3 className="text-xl font-semibold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">
                        {survey.title}
                      </h3>

                      <p className="text-gray-600 mb-6">
                        Share your thoughts and help us improve our services through this comprehensive survey.
                      </p>

                      <div className="flex space-x-3">
                        <Link href={`/surveys/${survey.id}`} className="btn-primary flex-1 text-center">
                          Take Survey
                        </Link>
                        <Link href={`/surveys/${survey.id}/metrics`} className="btn-secondary">
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                            />
                          </svg>
                        </Link>
                      </div>
                    </div>
                ))}
              </div>
          )}
        </div>
      </main>
  )
}
