"use client"

import { useState, useEffect } from "react"
import type { Survey } from "../types"
import { useSurveyContext } from "../context/SurveyProvider"

interface UseSurveyState {
  survey: Survey | null
  loading: boolean
  error: Error | null
  refetch: () => void
}

export function useSurvey(surveyId: number): UseSurveyState {
  const { api } = useSurveyContext()
  const [state, setState] = useState<UseSurveyState>({
    survey: null,
    loading: true,
    error: null,
    refetch: () => {},
  })

  const fetchSurvey = async () => {
    try {
      setState((prev) => ({ ...prev, loading: true, error: null }))
      const survey = await api.getSurvey(surveyId)
      setState((prev) => ({ ...prev, survey, loading: false }))
    } catch (error) {
      setState((prev) => ({
        ...prev,
        error: error as Error,
        loading: false,
      }))
    }
  }

  useEffect(() => {
    fetchSurvey()
  }, [surveyId])

  return {
    ...state,
    refetch: fetchSurvey,
  }
}
