"use client"

import { createContext, useContext, type ReactNode } from "react"
import { APIClient } from "../api/client"
import { SurveyAPI } from "../api/surveys"
import type { SurveySDKConfig } from "../types"

interface SurveyContextValue {
  api: SurveyAPI
  config: SurveySDKConfig
}

const SurveyContext = createContext<SurveyContextValue | null>(null)

interface SurveyProviderProps {
  config: SurveySDKConfig
  children: ReactNode
}

export function SurveyProvider({ config, children }: SurveyProviderProps) {
  const client = new APIClient(config)
  const api = new SurveyAPI(client)

  return <SurveyContext.Provider value={{ api, config }}>{children}</SurveyContext.Provider>
}

export function useSurveyContext() {
  const context = useContext(SurveyContext)
  if (!context) {
    throw new Error("useSurveyContext must be used within a SurveyProvider")
  }
  return context
}
