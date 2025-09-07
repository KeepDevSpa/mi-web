'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

interface NavItem {
  name: string
  href: string
  color: string
  description: string
  gradient: string
}

export default function ProfessionalNav() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const pathname = usePathname()

  // Servicios principales con paleta profesional
  const services: NavItem[] = [
    {
      name: 'Móvil',
      href: '/movil',
      color: '#00b300',
      description: 'Planes móviles con la mejor cobertura',
      gradient: 'from-green-500 to-emerald-600'
    },
    {
      name: 'Fibra',
      href: '/fibra',
      color: '#0066cc',
      description: 'Internet ultra rápido para tu hogar',
      gradient: 'from-blue-500 to-blue-700'
    },
    {
      name: 'Convergente',
      href: '/fibra-movil',
      color: '#00a699',
      description: 'Fibra + Móvil: la combinación perfecta',
      gradient: 'from-teal-500 to-cyan-600'
    },
    {
      name: 'PrismaTV',
      href: '/prisma-tv',
      color: '#9333ea',
      description: 'Entretenimiento sin límites',
      gradient: 'from-purple-500 to-indigo-600'
    },
    {
      name: 'Seguridad',
      href: '/alarmas',
      color: '#475569',
      description: 'Protección total para tu hogar',
      gradient: 'from-slate-500 to-gray-600'
    },
    {
      name: 'Energía',
      href: '/energia',
      color: '#ea580c',
      description: 'Ahorra en tu factura eléctrica',
      gradient: 'from-orange-500 to-red-500'
    }
  ]

  const additionalLinks = [
    { name: 'Empresa', href: '/empresa' },
    { name: 'Blog', href: '/blog' },
    { name: 'FAQ', href: '/faq' }
  ]

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${
      isScrolled 
        ? 'bg-white/95 backdrop-blur-md shadow-lg border-b border-gray-200' 
        : 'bg-white shadow-md'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href="/" className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-green-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl">P</span>
              </div>
              <div>
                <span className="font-bold text-xl text-gray-900">Prisma</span>
                <span className="font-normal text-gray-600"> Móvil</span>
              </div>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:block">
            <div className="flex items-center space-x-1">
              {services.map((service) => (
                <div key={service.name} className="group relative">
                  <Link
                    href={service.href}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 flex items-center space-x-2 ${
                      pathname.startsWith(service.href)
                        ? `text-white shadow-lg`
                        : 'text-gray-700 hover:text-white hover:shadow-md'
                    }`}
                    style={pathname.startsWith(service.href) ? {
                      background: `linear-gradient(135deg, ${service.color} 0%, ${service.color}dd 100%)`
                    } : {}}
                    onMouseEnter={(e) => {
                      if (!pathname.startsWith(service.href)) {
                        e.currentTarget.style.background = `linear-gradient(135deg, ${service.color}22 0%, ${service.color}11 100%)`
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (!pathname.startsWith(service.href)) {
                        e.currentTarget.style.background = 'transparent'
                      }
                    }}
                  >
                    <span>{service.name}</span>
                  </Link>

                  {/* Dropdown on hover */}
                  <div className="absolute top-full left-0 mt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                    <div className="bg-white rounded-xl shadow-xl border border-gray-200 p-4 min-w-64">
                      <div className={`inline-block px-3 py-1 rounded-full text-xs font-semibold text-white mb-2 bg-gradient-to-r ${service.gradient}`}>
                        {service.name}
                      </div>
                      <p className="text-sm text-gray-600">{service.description}</p>
                      <div className="mt-3">
                        <Link
                          href={service.href}
                          className={`inline-flex items-center text-sm font-medium hover:underline`}
                          style={{ color: service.color }}
                        >
                          Ver planes →
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              ))}

              {/* Additional Links */}
              <div className="border-l border-gray-300 ml-4 pl-4">
                {additionalLinks.map((link) => (
                  <Link
                    key={link.name}
                    href={link.href}
                    className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                      pathname === link.href
                        ? 'bg-green-100 text-green-800'
                        : 'text-gray-700 hover:text-green-600 hover:bg-green-50'
                    }`}
                  >
                    {link.name}
                  </Link>
                ))}
              </div>

              {/* CTA Button */}
              <div className="ml-4">
                <Link
                  href="/demo"
                  className="bg-gradient-to-r from-green-500 to-green-600 text-white px-6 py-2 rounded-xl font-semibold hover:from-green-600 hover:to-green-700 transition-all duration-200 shadow-lg hover:shadow-xl"
                >
                  Contratar
                </Link>
              </div>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="lg:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-gray-600 hover:text-gray-900 hover:bg-gray-100"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {mobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden absolute top-full left-0 w-full bg-white shadow-xl border-t border-gray-200">
            <div className="px-4 py-6 space-y-4">
              {services.map((service) => (
                <Link
                  key={service.name}
                  href={service.href}
                  className="block group"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <div className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors">
                    <div 
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: service.color }}
                    />
                    <div>
                      <div className="font-medium text-gray-900">{service.name}</div>
                      <div className="text-sm text-gray-600">{service.description}</div>
                    </div>
                  </div>
                </Link>
              ))}

              <div className="border-t border-gray-200 pt-4">
                {additionalLinks.map((link) => (
                  <Link
                    key={link.name}
                    href={link.href}
                    className="block px-3 py-2 text-gray-700 hover:text-green-600 font-medium"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {link.name}
                  </Link>
                ))}
              </div>

              <div className="pt-4">
                <Link
                  href="/demo"
                  className="block w-full text-center bg-gradient-to-r from-green-500 to-green-600 text-white px-6 py-3 rounded-xl font-semibold hover:from-green-600 hover:to-green-700 transition-all"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Contratar Ahora
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
