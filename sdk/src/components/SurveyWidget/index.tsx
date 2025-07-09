"use client"

import type React from "react"
import { useState, useCallback } from "react"
import type { SurveyWidgetProps, CreateResponseInput } from "../../types"
import { useSurvey } from "../../hooks/useSurvey"
import { useSurveyResponse } from "../../hooks/useSurveyResponse"
import { LoadingSpinner } from "../ui/LoadingSpinner"
import { ErrorBoundary } from "../ui/ErrorBoundary"
import { EmptyState } from "../ui/EmptyState"

export function SurveyWidget({ surveyId, onComplete, onError, className = "", theme = "light" }: SurveyWidgetProps) {
  const { survey, loading, error, refetch } = useSurvey(surveyId)
  const { submitResponse, loading: submitting, success, error: submitError } = useSurveyResponse()
  const [answers, setAnswers] = useState<Record<number, { answerText?: string; optionId?: number }>>({})

  const handleAnswerChange = useCallback((questionId: number, answer: { answerText?: string; optionId?: number }) => {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: answer,
    }))
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!survey) return

    const responseData: CreateResponseInput = {
      surveyId: survey.id,
      answers: Object.entries(answers).map(([questionId, answer]) => ({
        questionId: Number.parseInt(questionId),
        ...answer,
      })),
    }

    try {
      await submitResponse(responseData)
      onComplete?.(responseData)
    } catch (err) {
      onError?.(err as Error)
    }
  }

  const themeClasses =
    theme === "dark" ? "bg-gray-900 text-white border-gray-700" : "bg-white text-gray-900 border-gray-200"

  if (loading) {
    return (
      <div className={`p-8 rounded-xl border shadow-lg ${themeClasses} ${className}`}>
        <div className="flex flex-col items-center justify-center space-y-4">
          <LoadingSpinner size="lg" />
          <div className="text-center">
            <h3 className="text-lg font-semibold mb-2">Loading Survey</h3>
            <p className="text-gray-600">Please wait while we fetch your survey...</p>
          </div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className={`p-8 rounded-xl border shadow-lg ${themeClasses} ${className}`}>
        <EmptyState
          title="Failed to load survey"
          description={error.message}
          action={
            <button
              onClick={refetch}
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
            >
              Try Again
            </button>
          }
          icon={
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center">
              <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"
                />
              </svg>
            </div>
          }
        />
      </div>
    )
  }

  if (!survey || !survey.questions.length) {
    return (
      <div className={`p-8 rounded-xl border shadow-lg ${themeClasses} ${className}`}>
        <EmptyState
          title="No questions available"
          description="This survey doesn't have any questions yet. Please check back later."
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
    )
  }

  if (success) {
    return (
      <div className={`p-8 rounded-xl border shadow-lg ${themeClasses} ${className}`}>
        <div className="text-center">
          <div className="mx-auto mb-6 w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
            <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h3 className="text-2xl font-bold text-green-800 mb-3">Thank You!</h3>
          <p className="text-green-600 text-lg">Your responses have been submitted successfully.</p>
          <p className="text-gray-600 mt-2">We appreciate your feedback and will use it to improve our services.</p>
        </div>
      </div>
    )
  }

  return (
    <ErrorBoundary onError={onError}>
      <div className={`p-20 rounded-xl border shadow-lg ${themeClasses} ${className}`}>
        <div className="mb-8">
          <h2 className="text-3xl font-bold mb-3">{survey.title}</h2>
          <p className="text-gray-600 text-lg">
            Please take a few minutes to answer the following questions. Your feedback is valuable to us.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {survey.questions.map((question, index) => (
            <div key={question.id} className="space-y-4">
              <div className="flex items-start space-x-3">
                <span className="flex-shrink-0 w-8 h-8 bg-blue-100 text-blue-800 rounded-full flex items-center justify-center text-sm font-semibold">
                  {index + 1}
                </span>
                <div className="flex-1">
                  <label className="block text-lg font-medium mb-4">
                    {question.text}
                    <span className="text-red-500 ml-1">*</span>
                  </label>

                  {question.type === "TEXT" ? (
                    <textarea
                      className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none transition-colors"
                      rows={4}
                      placeholder="Please share your thoughts..."
                      value={answers[question.id]?.answerText || ""}
                      onChange={(e) => handleAnswerChange(question.id, { answerText: e.target.value })}
                      required
                    />
                  ) : (
                    <div className="space-y-3">
                      {question.options.map((option) => (
                        <label
                          key={option.id}
                          className="flex items-center space-x-3 p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors"
                        >
                          <input
                            type="radio"
                            name={`question-${question.id}`}
                            value={option.id}
                            checked={answers[question.id]?.optionId === option.id}
                            onChange={() => handleAnswerChange(question.id, { optionId: option.id })}
                            className="w-4 h-4 text-blue-600 focus:ring-blue-500"
                            required
                          />
                          <span className="text-base">{option.text}</span>
                        </label>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}

          {submitError && (
            <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
              <div className="flex items-center space-x-2">
                <svg className="w-5 h-5 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <p className="text-red-800 font-medium">Error submitting survey</p>
              </div>
              <p className="text-red-600 text-sm mt-1">{submitError.message}</p>
            </div>
          )}

          <div className="pt-6 border-t border-gray-200">
            <button
              type="submit"
              disabled={submitting}
              className="w-full py-4 px-6 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center text-lg font-medium transition-colors"
            >
              {submitting ? (
                <>
                  <LoadingSpinner size="sm" className="mr-3" />
                  Submitting Your Responses...
                </>
              ) : (
                "Submit Survey"
              )}
            </button>
          </div>
        </form>
      </div>
    </ErrorBoundary>
  )
}
