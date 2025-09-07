"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

type CoverageCheckProps = {
  className?: string
  backgroundClass?: string // e.g. "bg-yellow-400"
  buttonText?: string
  buttonClass?: string // e.g. "bg-green-600 hover:bg-green-700"
  onSubmitted?: () => void
  id?: string
}

export default function CoverageCheck({
  className,
  backgroundClass = "bg-yellow-400",
  buttonText = "Comprobar cobertura",
  buttonClass = "bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700",
  onSubmitted
}: CoverageCheckProps) {
  const [coveragePostal, setCoveragePostal] = useState("")
  const [coveragePhone, setCoveragePhone] = useState("")
  const [coverageName, setCoverageName] = useState("")

  const handleCoverageLead = () => {
    const lead = {
      id: `${Date.now()}-${Math.random().toString(36).slice(2,8)}`,
      planName: 'Consulta de cobertura',
      planPrice: 0,
      selectedSpeedLabel: 'Cobertura',
      selectedExtrasSummary: [],
      codigoPostal: coveragePostal,
      telefono: coveragePhone,
      nombre: coverageName,
      timestamp: new Date().toISOString(),
      status: 'new'
    }
    const existing = JSON.parse(localStorage.getItem('prisma-leads') || '[]')
    existing.push(lead)
    try {
      localStorage.setItem('prisma-leads', JSON.stringify(existing))
    } catch (err) {
      const trimmed = existing.slice(-100)
      try { localStorage.setItem('prisma-leads', JSON.stringify(trimmed)) } catch {}
    }
    try {
      window.dispatchEvent(new CustomEvent('leads-updated', { detail: { count: (JSON.parse(localStorage.getItem('prisma-leads') || '[]')).length } }))
    } catch {}
    setCoveragePostal("")
    setCoveragePhone("")
    setCoverageName("")
    if (onSubmitted) onSubmitted()
  }

  return (
    <section id="coverage" className={`${backgroundClass} py-8 ${className || ''}`}>
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-end justify-between gap-8">
          <div className="flex gap-8">
            <div>
              <label className="block text-sm font-medium text-black mb-2">Código Postal</label>
              <Input placeholder="" className="bg-white border-gray-300 w-48" value={coveragePostal} onChange={(e) => setCoveragePostal(e.target.value)} />
            </div>
            <div>
              <label className="block text-sm font-medium text-black mb-2">Teléfono de contacto</label>
              <Input type="tel" placeholder="" className="bg-white border-gray-300 w-64" value={coveragePhone} onChange={(e) => setCoveragePhone(e.target.value)} required />
            </div>
            <div>
              <label className="block text-sm font-medium text-black mb-2">Nombre</label>
              <Input placeholder="" className="bg-white border-gray-300 w-48" value={coverageName} onChange={(e) => setCoverageName(e.target.value)} />
            </div>
          </div>
          <Button onClick={handleCoverageLead} className={`${buttonClass} px-8 py-3 rounded-full`}>
            {buttonText}
          </Button>
        </div>
      </div>
    </section>
  )
}
