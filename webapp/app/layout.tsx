import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { SurveyProvider } from '@company/survey-sdk'
import type { SurveySDKConfig } from '@company/survey-sdk'
import { Toaster } from "@/components/ui/toaster"
import "./globals.css"
import { Footer } from '@/app/components/layout/Footer'
import { Header } from '@/app/components/layout/Header'

const inter = Inter({ subsets: ["latin"] })

// Configuración del SDK
const sdkConfig: SurveySDKConfig = {
  baseUrl: process.env.NEXT_PUBLIC_API_URL || "",
  useMockData: process.env.NEXT_PUBLIC_ROLL === "development", // Cambiar a false para API real o ir a el .env y asignar el roll de prod
  timeout: 10000,
  retryAttempts: 3,
}

export const metadata: Metadata = {
  title: "Survey Management Platform",
  description: "Advanced survey management with real-time analytics",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
      <html lang="en">
      <body id="root" className={`min-h-screen flex flex-col bg-gray-50 antialiasedl`}>
      <SurveyProvider config={sdkConfig}>
        <Header/>
        <div className="flex-1 flex flex-col">{children}</div>
        <Footer />
        <Toaster />
      </SurveyProvider>
      </body>
      </html>
  )
}
