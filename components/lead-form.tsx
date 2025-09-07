"use client"

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

interface LeadFormProps {
  planName: string
  planPrice: number
  selectedSpeedLabel?: string
  selectedExtrasSummary?: string[]
  selectedExtrasDetail?: { label: string; price: number }[]
  onClose: () => void
  transparentBg?: boolean
}

export default function LeadForm({ planName, planPrice, selectedSpeedLabel, selectedExtrasSummary = [], selectedExtrasDetail = [], onClose, transparentBg = false }: LeadFormProps) {
  const [formData, setFormData] = useState({
    nombre: '',
    apellidos: '',
    dniFiles: [] as { name: string; type: string; size: number; url?: string }[],
    calle: '',
    numero: '',
    piso: '',
    letra: '',
    codigoPostal: '',
    poblacion: '',
    provincia: '',
    telefono: '',
    email: '',
    observaciones: '',
    isExistingClient: false,
    consent: false
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const MAX_BYTES = 20 * 1024 * 1024

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    // Upload files first (limit 20MB), collect URLs
    const uploaded: { name: string; type: string; size: number; url?: string }[] = []
    try {
      // @ts-ignore
      const pending: File[] = (formData as any)._rawFiles || []
      for (const f of pending) {
        if (f.size > MAX_BYTES) {
          alert(`El archivo ${f.name} supera 20MB`)
          continue
        }
        const body = new FormData()
        body.append('file', f)
        const res = await fetch('/api/upload', { method: 'POST', body })
        if (!res.ok) throw new Error('upload failed')
        const { url } = await res.json()
        uploaded.push({ name: f.name, type: f.type, size: f.size, url })
      }
    } catch (err) {
      console.error('Upload error', err)
    }
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 300))
    
    const leadData = {
      id: `${Date.now()}-${Math.random().toString(36).slice(2,8)}`,
      ...formData,
      dniFiles: uploaded,
      planName,
      planPrice,
      selectedSpeedLabel,
      selectedExtrasSummary,
      planDetails: {
        speedLabel: selectedSpeedLabel || '',
        extras: selectedExtrasDetail.length > 0 ? selectedExtrasDetail : (selectedExtrasSummary || []).map(s => ({ label: s, price: 0 }))
      },
      timestamp: new Date().toISOString(),
      status: 'new'
    }
    
    // Store in localStorage (urls + metadata only)
    const existingLeads = JSON.parse(localStorage.getItem('prisma-leads') || '[]')
    existingLeads.push(leadData)
    try {
      localStorage.setItem('prisma-leads', JSON.stringify(existingLeads))
    } catch (err) {
      const trimmed = existingLeads.slice(-100)
      try {
        localStorage.setItem('prisma-leads', JSON.stringify(trimmed))
      } catch {}
    }
    try {
      window.dispatchEvent(new CustomEvent('leads-updated', { detail: { count: (JSON.parse(localStorage.getItem('prisma-leads') || '[]')).length } }))
    } catch {}
    
    setIsSubmitting(false)
    setIsSubmitted(true)
    setTimeout(() => { onClose() }, 3000)
  }

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const handleDniFiles = async (files: FileList | null) => {
    if (!files) return
    const toArray = Array.from(files)
    // store raw files for upload on submit, but do not keep in localStorage
    setFormData(prev => ({ ...prev, dniFiles: toArray.map(f => ({ name: f.name, type: f.type, size: f.size })), ...(prev as any), _rawFiles: toArray } as any))
  }

  if (isSubmitted) {
    return (
      <div className={`fixed inset-0 ${transparentBg ? 'bg-transparent' : 'bg-black/60 backdrop-blur-[2px]'} overflow-y-auto h-full w-full z-50`}>
        <div className="relative top-24 mx-auto p-8 border w-[92%] max-w-xl shadow-2xl rounded-2xl bg-white text-center">
          <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h3 className="text-2xl font-semibold text-gray-900 mb-2">¡Gracias por tu interés!</h3>
          <p className="text-gray-600">Nos pondremos en contacto contigo pronto para completar tu contratación.</p>
        </div>
      </div>
    )
  }

  return (
    <div className={`fixed inset-0 ${transparentBg ? 'bg-transparent' : 'bg-black/60 backdrop-blur-[2px]'} overflow-y-auto h-full w-full z-50`}>
      <div className="relative top-10 mx-auto p-0 w-[92%] max-w-2xl shadow-2xl rounded-2xl bg-white overflow-hidden">
        <div className="flex justify-between items-center px-6 py-4 bg-gradient-to-r from-[#005724] via-[#007c31] to-[#005724]">
          <h3 className="text-lg sm:text-xl font-semibold text-white">Formulario de contacto</h3>
          <button
            onClick={onClose}
            className="text-white/80 hover:text-white"
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        <div className="px-6 py-5">
          <div className="mb-5 p-4 rounded-xl border border-gray-200 bg-gray-50">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
              <div>
                <p className="text-xs uppercase tracking-wide text-gray-500">Plan seleccionado</p>
                <p className="text-base font-semibold text-gray-900">{planName}</p>
                {selectedSpeedLabel && (
                  <p className="text-sm text-gray-700">Velocidad/Plan: {selectedSpeedLabel}</p>
                )}
              </div>
              <div className="text-right">
                <p className="text-xs text-gray-500">Valor estimado de tu experiencia</p>
                <p className="text-2xl font-bold text-[#005724]">€{planPrice}<span className="text-sm font-medium text-gray-600">/mes</span></p>
              </div>
            </div>
            {selectedExtrasSummary.length > 0 && (
              <div className="mt-3">
                <div className="text-sm font-medium text-gray-800 mb-1">Extras seleccionados</div>
                <ul className="text-sm text-gray-700 list-disc list-inside space-y-0.5">
                  {selectedExtrasSummary.map((s, i) => (
                    <li key={i}>{s}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
          {/* Personal Data */}
          <div className="grid grid-cols-1 gap-3">
            <div className="grid grid-cols-1 gap-3">
              <label className="text-sm font-medium text-gray-700">Datos personales</label>
              <div className="grid grid-cols-1 gap-3">
                <Input placeholder="Nombre*" required value={formData.nombre} onChange={(e) => handleInputChange('nombre', e.target.value)} />
                <Input placeholder="Apellidos*" required value={formData.apellidos} onChange={(e) => handleInputChange('apellidos', e.target.value)} />
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">DNI (sube uno o varios archivos, máx. 20MB por archivo)</label>
                  <input
                    type="file"
                    multiple
                    accept="image/*,application/pdf"
                    onChange={(e) => handleDniFiles(e.target.files)}
                    className="block w-full text-sm text-gray-700 border border-gray-300 rounded-md px-3 py-2"
                  />
                </div>
              </div>
            </div>
          </div>
          
          {/* Address */}
          <div className="grid grid-cols-1 gap-3">
            <label className="text-sm font-medium text-gray-700">Dirección</label>
            <Input placeholder="Calle" value={formData.calle} onChange={(e) => handleInputChange('calle', e.target.value)} />
            <div className="grid grid-cols-3 gap-3">
              <Input placeholder="Número" value={formData.numero} onChange={(e) => handleInputChange('numero', e.target.value)} />
              <Input placeholder="Piso" value={formData.piso} onChange={(e) => handleInputChange('piso', e.target.value)} />
              <Input placeholder="Letra" value={formData.letra} onChange={(e) => handleInputChange('letra', e.target.value)} />
            </div>
            <Input placeholder="Código Postal*" required value={formData.codigoPostal} onChange={(e) => handleInputChange('codigoPostal', e.target.value)} />
            <Input placeholder="Población" value={formData.poblacion} onChange={(e) => handleInputChange('poblacion', e.target.value)} />
            <Input placeholder="Provincia" value={formData.provincia} onChange={(e) => handleInputChange('provincia', e.target.value)} />
          </div>
          
          {/* Contact */}
          <div className="grid grid-cols-1 gap-3">
            <label className="text-sm font-medium text-gray-700">Contacto</label>
            <Input type="tel" placeholder="Teléfono*" required value={formData.telefono} onChange={(e) => handleInputChange('telefono', e.target.value)} />
            <Input type="email" placeholder="Email" value={formData.email} onChange={(e) => handleInputChange('email', e.target.value)} />
          </div>
          
          {/* Comments */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Observaciones</label>
            <textarea
              className="w-full border rounded-md p-2 text-sm"
              rows={3}
              placeholder="Escribe cualquier comentario..."
              value={formData.observaciones}
              onChange={(e) => handleInputChange('observaciones', e.target.value)}
            />
          </div>
          
          <div className="flex items-center space-x-3">
            <input
              type="checkbox"
              id="existingClient"
              checked={formData.isExistingClient}
              onChange={(e) => handleInputChange('isExistingClient', e.target.checked)}
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
            <label htmlFor="existingClient" className="text-sm text-gray-700">
              Ya soy cliente de Prisma
            </label>
          </div>
          
          <div className="flex items-center space-x-3">
            <input
              type="checkbox"
              id="consent"
              required
              checked={formData.consent}
              onChange={(e) => handleInputChange('consent', e.target.checked)}
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
            <label htmlFor="consent" className="text-sm text-gray-700">
              Presto consentimiento expreso para el tratamiento de mis datos*
            </label>
          </div>
          
          <div className="pt-2">
            <Button
              type="submit"
              disabled={isSubmitting || !formData.consent}
              className="w-full bg-[#005724] hover:bg-[#007c31] text-white py-3 px-4 rounded-xl font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-md"
            >
              {isSubmitting ? 'Enviando...' : 'Enviar'}
            </Button>
          </div>
          </form>
        </div>
      </div>
    </div>
  )
}
