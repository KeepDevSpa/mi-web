'use client'

import { usePathname } from 'next/navigation'
import TopContactBar from "@/components/top-contact-bar"
import Header from "@/components/header"
import ProfessionalFooter from "@/components/ui/professional-footer"
import CoverageCheck from "@/components/coverage-check"

interface LayoutWrapperProps {
  children: React.ReactNode
}

export function LayoutWrapper({ children }: LayoutWrapperProps) {
  const pathname = usePathname()
  
  return (
    <>
      <TopContactBar />
      <Header />
      <main className="min-h-screen">
        {children}
      </main>
      <CoverageCheck 
        backgroundClass="bg-[#ffc600]"
        buttonText="Comprobar cobertura"
        buttonClass="bg-[#00b300] text-white hover:bg-[#009e00]"
      />
      <ProfessionalFooter />
    </>
  )
}
