import { Inter } from 'next/font/google'
import '../globals.css'
import { ThemeProvider } from "@/components/theme-provider"
import HeaderProfesional from "@/components/header-profesional"

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Prisma Móvil - Telecomunicaciones Profesionales',
  description: 'Tu operadora de telecomunicaciones de confianza para fibra óptica, móvil y servicios empresariales',
}

export default function ProfesionalLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem={false}
          disableTransitionOnChange
        >
          <HeaderProfesional />
          <main className="min-h-screen">
            {children}
          </main>
        </ThemeProvider>
      </body>
    </html>
  )
}
