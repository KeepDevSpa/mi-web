/**
 * @fileoverview Layout específico para la sección empresa/business
 * 
 * Este layout mantiene la estructura del layout principal pero utiliza
 * un header específico para clientes empresariales con navegación
 * adaptada a servicios B2B.
 * 
 * Mantiene:
 * - TopContactBar del layout principal
 * - ProfessionalFooter del layout principal
 * - CoverageCheck adaptado para empresas
 * - ThemeProvider y SecurityProvider
 * 
 * Reemplaza:
 * - Header principal por HeaderBusiness específico
 * 
 * @author Prisma Móvil Team
 * @version 5.2.0
 * @since 2025-09-02
 */

import { ThemeProvider } from "@/components/theme-provider"
import { SecurityProvider } from "@/components/security-provider"
import ProfessionalFooter from "@/components/ui/professional-footer"
import CoverageCheck from "@/components/coverage-check"
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import '../globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Prisma Business - Soluciones Tecnológicas para Empresas',
  description: 'Soluciones empresariales de conectividad, comunicaciones, cloud y seguridad. Su socio tecnológico para el crecimiento empresarial.',
  keywords: 'empresas, B2B, conectividad empresarial, centralita virtual, cloud, seguridad gestionada, fibra dedicada, comunicaciones unificadas',
  authors: [{ name: 'Prisma Business Team' }],
  robots: 'index, follow',
  openGraph: {
    title: 'Prisma Business - Soluciones Tecnológicas para Empresas',
    description: 'Tecnología que impulsa su negocio, sin complicaciones. Soluciones empresariales integrales.',
    type: 'website',
    locale: 'es_ES',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Prisma Business - Soluciones Tecnológicas para Empresas',
    description: 'Tecnología que impulsa su negocio, sin complicaciones.',
  },
}

export const viewport = {
  width: 'device-width',
  initialScale: 1,
}

export default function EmpresaLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/logo-prisma.svg" />
        <meta name="theme-color" content="#16a34a" />
      </head>
      <body className={`${inter.className} antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem={false}
          disableTransitionOnChange
        >
          <SecurityProvider>
            {/* Elimina TopContactBar y ProfessionalFooter para evitar duplicados, solo layout global */}
            <main className="min-h-screen bg-white">
              {children}
            </main>
            <CoverageCheck 
              backgroundClass="bg-gradient-to-r from-green-600 to-green-700"
              buttonText="Consultar soluciones para mi empresa"
              buttonClass="bg-white text-green-700 hover:bg-gray-50 font-semibold"
            />
          </SecurityProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
