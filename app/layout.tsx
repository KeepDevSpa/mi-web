import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { ThemeProvider } from "@/components/theme-provider"
import { SecurityProvider } from "@/components/security-provider"
import TopContactBar from "@/components/top-contact-bar"
import Header from "@/components/header"
import ProfessionalFooter from "@/components/ui/professional-footer"
import CoverageCheck from "@/components/coverage-check"
import { LayoutWrapper } from "@/components/layout-wrapper"
import ContactModal from '@/components/ui/contact-modal';

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Prisma - La operadora que realmente te cuida',
  description: 'Experiencias premium de fibra y móvil con tecnología de vanguardia y atención humana real. Porque lo importante para nosotros eres tú.',
  keywords: 'fibra, móvil, internet, telefonía, Prisma, premium, calidad, atención humana',
  authors: [{ name: 'Prisma Móvil Team' }],
  robots: 'index, follow',
  openGraph: {
    title: 'Prisma - La operadora que realmente te cuida',
    description: 'Experiencias premium de fibra y móvil con tecnología de vanguardia y atención humana real.',
    type: 'website',
    locale: 'es_ES',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Prisma - La operadora que realmente te cuida',
    description: 'Experiencias premium de fibra y móvil con tecnología de vanguardia y atención humana real.',
  },
}
export const viewport = 'width=device-width, initial-scale=1';

export default function RootLayout({
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
            <LayoutWrapper>
              {children}
              <ContactModal />
            </LayoutWrapper>
          </SecurityProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
