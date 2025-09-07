'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Menu, X, Phone, MapPin } from 'lucide-react'

interface NavigationItem {
  label: string
  href: string
  isActive?: boolean
  children?: NavigationItem[]
}

const navigationItems: NavigationItem[] = [
  {
    label: 'Fibra',
    href: '/fibra',
    children: [
      { label: 'Fibra + Móvil', href: '/fibra-movil' },
      { label: 'Solo Fibra', href: '/fibra' },
      { label: 'Cobertura', href: '/fibra#cobertura' }
    ]
  },
  {
    label: 'Móvil',
    href: '/movil',
    children: [
      { label: 'Tarifas Móvil', href: '/movil' },
      { label: 'Portabilidad', href: '/movil#portabilidad' },
      { label: '5G Premium', href: '/movil#5g' }
    ]
  },
  {
    label: 'Empresas',
    href: '/empresa',
    children: [
      { label: 'Soluciones Empresas', href: '/empresa' },
      { label: 'Centralitas', href: '/empresa#centralitas' },
      { label: 'Conectividad', href: '/empresa#conectividad' }
    ]
  },
  {
    label: 'PrismaTV',
    href: '/prisma-tv',
    children: [
      { label: 'Entretenimiento', href: '/prisma-tv' },
      { label: 'Deportes', href: '/prisma-tv#deportes' },
      { label: 'Dispositivos', href: '/prisma-tv#dispositivos' }
    ]
  },
  {
    label: 'Soporte',
    href: '/faq',
    children: [
      { label: 'Preguntas Frecuentes', href: '/faq' },
      { label: 'Contacto', href: '/contacto' },
      { label: 'Área Cliente', href: '/cliente' }
    ]
  }
]

export default function HeaderProfesional() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)
  const [contactPhone, setContactPhone] = useState<string>('')

  useEffect(() => {
    // Cargar teléfono de contacto desde localStorage o API
    const phone = localStorage.getItem('prisma-contact-phone') || '900 123 456'
    setContactPhone(phone)
  }, [])

  return (
    <header className="bg-white shadow-lg relative z-50 border-b-2 border-blue-100">
      {/* Top Contact Bar */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-2">
        <div className="max-w-7xl mx-auto px-4 flex justify-between items-center text-sm">
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <Phone className="w-4 h-4" />
              <span>Atención humana 24/7: {contactPhone}</span>
            </div>
            <div className="hidden md:flex items-center gap-2">
              <MapPin className="w-4 h-4" />
              <span>Cobertura nacional garantizada</span>
            </div>
          </div>
          <div className="hidden md:block">
            <Link href="/empresa" className="hover:text-blue-200 transition-colors">
              ¿Eres empresa? Descubre nuestras soluciones
            </Link>
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" className="hover:opacity-80 transition-opacity">
              <img 
                src="/logo-prisma.svg" 
                alt="Prisma - La operadora que realmente te cuida" 
                className="h-12 w-auto" 
              />
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-1">
            {navigationItems.map((item) => (
              <div
                key={item.label}
                className="relative group"
                onMouseEnter={() => setActiveDropdown(item.label)}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <Link
                  href={item.href}
                  className="flex items-center px-4 py-2 text-gray-700 hover:text-blue-600 font-semibold transition-colors rounded-lg hover:bg-blue-50"
                >
                  {item.label}
                  {item.children && (
                    <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  )}
                </Link>

                {/* Dropdown */}
                {item.children && activeDropdown === item.label && (
                  <div className="absolute top-full left-0 mt-2 w-64 bg-white rounded-lg shadow-xl border border-gray-200 py-2 z-50">
                    {item.children.map((child) => (
                      <Link
                        key={child.label}
                        href={child.href}
                        className="block px-4 py-3 text-sm text-gray-700 hover:text-blue-600 hover:bg-blue-50 transition-colors"
                      >
                        <div className="font-medium">{child.label}</div>
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </nav>

          {/* CTA Button */}
          <div className="hidden md:flex items-center gap-4">
            <Link href="/contacto">
              <Button 
                variant="outline"
                className="border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white transition-all"
              >
                <Phone className="w-4 h-4 mr-2" />
                Contactar
              </Button>
            </Link>
            <Link href="/fibra-movil">
              <Button className="bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:shadow-lg transition-all">
                Ver ofertas
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden p-2 text-gray-600 hover:text-blue-600"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="lg:hidden mt-4 pb-4 border-t border-gray-200">
            <div className="space-y-2 pt-4">
              {navigationItems.map((item) => (
                <div key={item.label} className="space-y-2">
                  <Link
                    href={item.href}
                    className="block px-4 py-2 text-gray-700 hover:text-blue-600 font-semibold transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.label}
                  </Link>
                  {item.children && (
                    <div className="pl-4 space-y-1">
                      {item.children.map((child) => (
                        <Link
                          key={child.label}
                          href={child.href}
                          className="block px-4 py-2 text-sm text-gray-600 hover:text-blue-600 transition-colors"
                          onClick={() => setIsMenuOpen(false)}
                        >
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
            
            {/* Mobile CTAs */}
            <div className="flex flex-col gap-2 mt-4 pt-4 border-t border-gray-200">
              <Link href="/contacto" onClick={() => setIsMenuOpen(false)}>
                <Button variant="outline" className="w-full border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white">
                  <Phone className="w-4 h-4 mr-2" />
                  Contactar
                </Button>
              </Link>
              <Link href="/fibra-movil" onClick={() => setIsMenuOpen(false)}>
                <Button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white">
                  Ver ofertas
                </Button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </header>
  )
}
