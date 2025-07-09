"use client"

import { useState } from "react"
import type { CreateResponseInput } from "../types"
import { useSurveyContext } from "../context/SurveyProvider"

interface UseSurveyResponseState {
  loading: boolean
  error: Error | null
  success: boolean
  submitResponse: (response: CreateResponseInput) => Promise<void>
  reset: () => void
}

export function useSurveyResponse(): UseSurveyResponseState {
  const { api } = useSurveyContext()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<Error | null>(null)
  const [success, setSuccess] = useState(false)

  const submitResponse = async (response: CreateResponseInput) => {
    try {
      setLoading(true)
      setError(null)
      setSuccess(false)

      await api.submitResponse(response)

      setSuccess(true)
    } catch (err) {
      setError(err as Error)
    } finally {
      setLoading(false)
    }
  }

  const reset = () => {
    setLoading(false)
    setError(null)
    setSuccess(false)
  }

  return {
    loading,
    error,
    success,
    submitResponse,
    reset,
  }
}
