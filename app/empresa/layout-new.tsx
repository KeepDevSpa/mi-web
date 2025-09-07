import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import '../globals.css'
import { ThemeProvider } from "@/components/theme-provider"
import { SecurityProvider } from "@/components/security-provider"
import TopContactBar from "@/components/top-contact-bar"
import HeaderBusiness from "@/components/header-business"
import ProfessionalFooter from "@/components/ui/professional-footer"
import CoverageCheck from "@/components/coverage-check"

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
        <meta name="theme-color" content="#3b82f6" />
      </head>
      <body className={`${inter.className} antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem={false}
          disableTransitionOnChange
        >
          <SecurityProvider>
            <TopContactBar />
            <HeaderBusiness />
            <main className="min-h-screen">
              {children}
            </main>
            <CoverageCheck 
              backgroundClass="bg-[#ffc600]"
              buttonText="Comprobar cobertura"
              buttonClass="bg-[#00b300] text-white hover:bg-[#009e00]"
            />
            <ProfessionalFooter />
          </SecurityProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
