import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { SurveyProvider } from '@company/survey-sdk'
import type { SurveySDKConfig } from '@company/survey-sdk'
import { Toaster } from "@/components/ui/toaster"
import "./globals.css"

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
      <body className={`${inter.className} min-h-screen bg-gray-50 antialiased`}>
      <SurveyProvider config={sdkConfig}>
        <div id="root">{children}</div>
        <Toaster />
      </SurveyProvider>
      </body>
    </html>
  )
}
