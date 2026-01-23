import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import "./globals.css"
import RemoveNextDevBadge from "./RemoveNextDevBadge"
import Link from "next/link"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
})

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
})

export const metadata: Metadata = {
  title: "Chatoo – Smart Chat, Voice & Video Calls",
  description:
    "Connect instantly with Chatoo using real-time messaging, secure voice calls, and seamless video calling in one powerful app.",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        suppressHydrationWarning
      >
        <RemoveNextDevBadge />

     

        {/* 🔹 Page Content */}
        <main className="min-h-screen px-6 py-6">
          {children}
        </main>

       
      </body>
    </html>
  )
}
