'use client'

import { use, useState, useEffect } from 'react'
import Link from 'next/link'
import { LoadingSpinner, useSurveyContext } from '@company/survey-sdk'
import { EmptyState } from '@company/survey-sdk'
import type { QuestionMetrics } from '@company/survey-sdk'


interface PageProps {
  params: Promise<{ id: string }>
}

export default function MetricsPage({ params }: PageProps) {
  const { id } = use(params)
  const { api } = useSurveyContext()
  const surveyId = Number.parseInt(id, 10)
  const [metrics, setMetrics] = useState<QuestionMetrics[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)


  useEffect(() => {
    // 👈 Usar la API del SDK en lugar de fetch manual
    api
        .getMetrics(surveyId)
        .then(setMetrics)
        .catch((err) => setError(err.message))
        .finally(() => setLoading(false))
  }, [surveyId, api])

  const getTotalResponses = () => {
    // ✅ Actualizado para usar 'results' en lugar de 'optionsCount'
    const multipleChoiceQuestion = metrics.find((m) => m.type === 'MULTIPLE_CHOICE' && m.results)
    if (multipleChoiceQuestion?.results) {
      return multipleChoiceQuestion.results.reduce((sum, option) => sum + option.count, 0)
    }
    return 0
  }

  const getPercentage = (count: number, total: number) => {
    return total > 0 ? Math.round((count / total) * 100) : 0
  }

  if (loading) {
    return (
        <main className="flex-1 flex flex-col py-12">
          <div className="flex-1 flex flex-col container">
            <div className="flex justify-center py-20">
              <div className="text-center">
                <LoadingSpinner size="lg"/>
                <h3 className="text-lg font-semibold mt-4 mb-2">Loading Analytics</h3>
                <p className="text-gray-600">Analyzing survey responses...</p>
              </div>
            </div>
          </div>
        </main>
    )
  }

  if (error) {
    return (
        <main className="flex-1 flex flex-col py-12">
          <div className="flex-1 flex flex-col container">
            <div className="card max-w-2xl mx-auto">
              <EmptyState
                  title="Failed to load metrics"
                  description={error}
                  action={
                    <button onClick={() => window.location.reload()} className="btn-primary">
                      Try Again
                    </button>
                  }
              />
            </div>
          </div>
        </main>
    )
  }

  const totalResponses = getTotalResponses()

  return (
      <main className="flex-1 flex flex-col py-12">
        <div className="flex-1 flex flex-col container">
          {/* Breadcrumb */}
          <nav className="mb-8">
            <ol className="flex items-center space-x-2 text-sm text-gray-600">
              <li>
                <Link href="/" className="hover:text-gray-900">
                  Home
                </Link>
              </li>
              <li>/</li>
              <li>
                <Link href="/surveys" className="hover:text-gray-900">
                  Surveys
                </Link>
              </li>
              <li>/</li>
              <li>
                <Link href={`/surveys/${surveyId}`} className="hover:text-gray-900">
                  Survey #{surveyId}
                </Link>
              </li>
              <li>/</li>
              <li className="text-gray-900 font-medium">Analytics</li>
            </ol>
          </nav>

          {/* Header */}
          <div className="mb-8">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between">
              <div>
                <h1 className="text-4xl font-bold text-gray-900 mb-2">Survey Analytics</h1>
                <p className="text-xl text-gray-600">Detailed insights from survey responses</p>
              </div>
              <div className="mt-4 md:mt-0">
                <Link href={`/surveys/${surveyId}`} className="btn-primary">
                  Take Survey
                </Link>
              </div>
            </div>
          </div>

          {/* Stats Overview */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="card text-center">
              <div className="text-3xl font-bold text-blue-600 mb-2">{totalResponses}</div>
              <div className="text-gray-600">Total Responses</div>
            </div>
            <div className="card text-center">
              <div className="text-3xl font-bold text-green-600 mb-2">{metrics.length}</div>
              <div className="text-gray-600">Questions Analyzed</div>
            </div>
            <div className="card text-center">
              <div className="text-3xl font-bold text-purple-600 mb-2">
                {Math.round((totalResponses / 100) * 100) || 0}%
              </div>
              <div className="text-gray-600">Completion Rate</div>
            </div>
          </div>

          {/* Questions Analytics */}
          <div className="space-y-8">
            {metrics.map((question, index) => (
                <div key={question.questionId} className="card">
                  <div className="mb-6">
                    <div className="flex items-start space-x-3">
                      <span
                          className="flex-shrink-0 w-8 h-8 bg-blue-100 text-blue-800 rounded-full flex items-center justify-center text-sm font-semibold">
                        {index + 1}
                      </span>
                      <div>
                        <h3 className="text-xl font-semibold text-gray-900 mb-2">{question.questionText}</h3>
                        <span
                            className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                          {question.type === 'MULTIPLE_CHOICE' ? 'Multiple Choice' : 'Text Response'}
                        </span>
                      </div>
                    </div>
                  </div>

                  {question.type === 'MULTIPLE_CHOICE' && question.results ? (
                      <div className="space-y-4">
                        {question.results.map((option) => {
                          const percentage = getPercentage(option.count, totalResponses)
                          return (
                              <div key={option.optionId} className="space-y-2">
                                <div className="flex justify-between items-center">
                                  <span className="text-sm font-medium text-gray-700">{option.optionText}</span>
                                  <span className="text-sm text-gray-600">
                                    {option.count} ({percentage}%)
                                  </span>
                                </div>
                                <div className="w-full bg-gray-200 rounded-full h-3">
                                  <div
                                      className="bg-blue-600 h-3 rounded-full transition-all duration-500"
                                      style={{ width: `${percentage}%` }}
                                  />
                                </div>
                              </div>
                          )
                        })}
                      </div>
                  ) : (
                      <div className="space-y-3">
                        <h4 className="font-medium text-gray-900 mb-3">Recent Responses
                          ({question.responses?.length})</h4>
                        <div className="grid gap-3 max-h-64 overflow-y-auto">
                          {question.responses?.map((answer, answerIndex) => (
                              <div key={answerIndex} className="p-3 bg-gray-50 rounded-lg border-l-4 border-blue-500">
                                <p className="text-gray-700 text-sm">"{answer}"</p>
                              </div>
                          ))}
                        </div>
                      </div>
                  )}
                </div>
            ))}
          </div>

          {/* Actions */}
          <div className="mt-12 text-center space-y-4">
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href={`/surveys/${surveyId}`} className="btn-primary">
                Take This Survey
              </Link>
              <Link href="/surveys" className="btn-secondary">
                Browse All Surveys
              </Link>
            </div>
            <p className="text-sm text-gray-600">Data updates in real-time as new responses are submitted</p>
          </div>
        </div>
      </main>
  )
}
