'use client'
import Link from 'next/link'
import { Header } from '../../components/layout/Header'
import { Footer } from '../../components/layout/Footer'
import type { CreateResponseInput } from '@company/survey-sdk'
import { SurveyWidget } from '@company/survey-sdk'
import { use } from 'react'
import { useToast } from '@/hooks/use-toast'

interface PageProps {
  params: Promise<{ id: string }>
}

export default function SurveyPage({ params }: PageProps) {
  const { id } = use(params)
  const { toast } = useToast()
  const surveyId = Number.parseInt(id, 10)

  const handleComplete = (responses: CreateResponseInput) => {
    console.log('Survey completed with responses:', responses)
    toast({
      title: '¡Encuesta Enviada!',
      description: 'Gracias por tu tiempo. Tus respuestas han sido registradas exitosamente.',
    })
  }

  const handleError = (error: Error) => {
    console.error('Survey error:', error)
    toast({
      variant: 'destructive',
      title: 'Error al Enviar Encuesta',
      description: 'Hubo un problema al procesar tu encuesta. Por favor intenta de nuevo.',
    })
  }

  return (
      <>
        <Header/>
        <main className="py-12">
          <div className="container max-w-4xl">
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
                <li className="text-gray-900 font-medium">Survey #{surveyId}</li>
              </ol>
            </nav>

            {/* Survey Widget */}
            <SurveyWidget
                surveyId={surveyId}
                onComplete={handleComplete}
                onError={handleError}
                className="max-w-3xl mx-auto p-20 rounded-xl border shadow-lg"
            />

            {/* Additional Actions */}
            <div className="mt-8 text-center">
              <Link
                  href={`/surveys/${surveyId}/metrics`}
                  className="inline-flex items-center space-x-2 text-blue-600 hover:text-blue-700 font-medium"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                  />
                </svg>
                <span>View Survey Analytics</span>
              </Link>
            </div>
          </div>
        </main>
        <Footer/>
      </>
  )
}
