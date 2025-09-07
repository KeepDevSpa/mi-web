/**
 * @fileoverview Componente de header específico para clientes empresariales
 * 
 * Este componente renderiza la navegación principal para la sección empresa,
 * manteniendo el estilo y funcionalidades del header principal pero adaptado
 * a las necesidades de navegación de clientes empresariales.
 * 
 * Características:
 * - Navegación específica para servicios empresariales
 * - Logo enlazado a la página principal (igual al header general)
 * - Teléfono dinámico desde localStorage
 * - Enlaces a secciones empresariales (Conectividad, Comunicaciones, Cloud, Seguridad)
 * - Botón "Ofertas personalizadas" igual al header general
 * - Diseño responsive con menú móvil
 * 
 * @author Prisma Móvil Team
 * @version 5.2.0
 * @since 2025-09-02
 */

"use client"

import { Button } from '@/components/ui/button'
import { MapPin, Menu, X } from 'lucide-react'
import Link from 'next/link'
import { useEffect, useState } from 'react'

/**
 * Componente Header para sección empresarial
 * 
 * Maneja la navegación específica para clientes empresariales y el teléfono
 * de contacto dinámico. El teléfono se obtiene del localStorage y se actualiza
 * en tiempo real cuando cambia desde otros componentes.
 * 
 * @returns JSX.Element - Header empresarial con navegación específica
 */
export default function HeaderBusiness() {
  // Estado para el número de teléfono dinámico
  const [phone, setPhone] = useState('915691382')
  // Estado para el menú móvil
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  /**
   * Efecto para sincronizar el teléfono con localStorage
   * Escucha cambios en localStorage tanto desde esta ventana
   * como desde otros tabs/componentes
   */
  useEffect(() => {
    const readPhone = () => {
      try {
        const stored = localStorage.getItem('prisma-contact-phone')
        if (stored && stored.trim()) setPhone(stored)
      } catch {}
    }

    readPhone()

    const onStorage = (e: StorageEvent) => {
      if (e.key === 'prisma-contact-phone') readPhone()
    }
    const onLocalUpdate = () => readPhone()
    window.addEventListener('storage', onStorage)
    window.addEventListener('localStorage-updated', onLocalUpdate as EventListener)
    return () => {
      window.removeEventListener('storage', onStorage)
      window.removeEventListener('localStorage-updated', onLocalUpdate as EventListener)
    }
  }, [])

  /**
   * Enlaces de navegación empresarial actualizada
   */
  const navigationLinks = [
    { href: '#servicios', label: 'Servicios' },
    { href: '#servicios-detallados', label: 'Soluciones' },
    { href: '#confianza', label: 'Clientes' },
    { href: '#contacto', label: 'Contacto' },
  ]

  /**
   * Maneja el scroll suave a las secciones
   */
  const handleSmoothScroll = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault()
    if (href.startsWith('#')) {
      const element = document.getElementById(href.substring(1))
      if (element) {
        element.scrollIntoView({ 
          behavior: 'smooth',
          block: 'start',
          inline: 'nearest'
        })
      }
    }
    setIsMenuOpen(false) // Cerrar menú móvil después del click
  }

  return (
    <header className="bg-white shadow-sm relative z-20">
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo - Igual al header general */}
          <div className="flex items-center">
            <Link href="/" className="hover:opacity-80 transition-opacity">
              <img src="/logo-prisma.svg" alt="Prisma" className="h-12 w-auto" />
            </Link>
          </div>

          {/* Navegación Desktop */}
          <nav className="hidden md:flex items-center space-x-8">
            {navigationLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => handleSmoothScroll(e, link.href)}
                className="text-gray-700 hover:text-gray-900 transition-colors"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Botón Solicitar Asesoramiento */}
          <div className="flex items-center gap-3">
            <a href="#contacto" title={`Solicitar Asesoramiento`}>
              <Button size="sm" className="bg-yellow-400 text-black hover:bg-yellow-500">
                <MapPin className="w-4 h-4 mr-1" />
                Solicitar Asesoramiento
              </Button>
            </a>
          </div>

          {/* Botón menú móvil */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2"
            >
              {isMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </Button>
          </div>
        </div>

        {/* Menú móvil */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 pb-4 border-t border-gray-200">
            <div className="flex flex-col space-y-3 pt-4">
              {navigationLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => handleSmoothScroll(e, link.href)}
                  className="text-gray-700 hover:text-gray-900 transition-colors py-2"
                >
                  {link.label}
                </a>
              ))}
              <div className="pt-3 border-t border-gray-200">
                <a href="#contacto" className="block">
                  <Button size="sm" className="bg-yellow-400 text-black hover:bg-yellow-500 w-full">
                    <MapPin className="w-4 h-4 mr-1" />
                    Solicitar Asesoramiento
                  </Button>
                </a>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  )
}
