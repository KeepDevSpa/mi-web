/**
 * @fileoverview Componente de header/navegación principal
 * 
 * Este componente renderiza la bar              <Button size="sm" className="bg-[#00aa00] text-white hover:bg-[#008800] shadow-lg">
                <MapPin className="h-4 w-4" />
                Ofertas personalizadas
              </Button>e navegación principal de la aplicación,
 * incluyendo el logo, menú de navegación y botones de acción.
 * 
 * Características:
 * - Navegación responsive con menú móvil
 * - Logo enlazado a la página principal
 * - Teléfono dinámico desde localStorage
 * - Enlaces a todas las secciones principales
 * - Botón de ofertas personalizadas
 * 
 * @author Prisma Móvil Team
 * @version 5.2.0
 * @since 2025-09-01
 */

"use client"

import { Button } from '@/components/ui/button'
import { IconMap, CORPORATE_COLOR_CLASSES } from '@/lib/icon-config'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'

/**
 * Componente Header principal de la aplicación
 * 
 * Maneja la navegación principal y el teléfono de contacto dinámico.
 * El teléfono se obtiene del localStorage y se actualiza en tiempo real
 * cuando cambia desde otros componentes (como TopContactBar).
 * 
 * @returns JSX.Element - Header con navegación y botones de acción
 */
export default function Header() {
  // Estado para el número de teléfono dinámico
  const [phone, setPhone] = useState('915691382')
  const pathname = usePathname()
  const isEmpresaPage = pathname?.startsWith('/empresa')

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

  return (
    <header className={`${isEmpresaPage ? 'bg-white/90 backdrop-blur-lg sticky top-0' : 'bg-white relative'} shadow-sm z-20`}>
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Link href="/" className="hover:opacity-80 transition-opacity">
              <img src="/logo-prisma.svg" alt="Prisma" className="h-12 w-auto" />
            </Link>
          </div>

          <nav className="hidden md:flex items-center space-x-8">
            {isEmpresaPage ? (
              // Navegación empresarial con estilo normal
              <>
                <Link href="#conectividad" className="text-gray-700 hover:text-green-600 transition-colors">
                  Conectividad
                </Link>
                <Link href="#comunicaciones" className="text-gray-700 hover:text-green-600 transition-colors">
                  Comunicaciones
                </Link>
                <Link href="#cloud" className="text-gray-700 hover:text-green-600 transition-colors">
                  Cloud
                </Link>
                <Link href="#seguridad" className="text-gray-700 hover:text-green-600 transition-colors">
                  Seguridad
                </Link>
              </>
            ) : (
              // Navegación normal
              <>
                <Link href="/fibra-movil" className="text-gray-700 hover:text-gray-900 transition-colors">
                  Fibra y Móvil
                </Link>
                <Link href="/fibra" className="text-gray-700 hover:text-gray-900 transition-colors">
                  Fibra
                </Link>
                <Link href="/movil" className="text-gray-700 hover:text-gray-900 transition-colors">
                  Móvil
                </Link>
                <Link href="/prisma-tv" className="text-gray-700 hover:text-gray-900 transition-colors">
                  PrismaTV
                </Link>
                <Link href="/seguridad" className="text-gray-700 hover:text-gray-900 transition-colors">
                  Seguridad
                </Link>
                <Link href="/energia" className="text-gray-700 hover:text-blue-700 transition-colors font-semibold">
                  Energía
                </Link>
                <Link href="/blog" className="text-gray-700 hover:text-gray-900 transition-colors">
                  Blog
                </Link>
              </>
            )}
          </nav>

          <div className="flex items-center gap-3">
            {isEmpresaPage ? (
              <Link href="#cta-final">
                <Button size="sm" className="bg-yellow-400 text-black hover:bg-yellow-500">
                  Solicitar Asesoramiento
                </Button>
              </Link>
            ) : (
              <a href="#coverage" title={`Llámanos al ${phone}`}>
                <Button size="sm" className="bg-yellow-400 text-black hover:bg-yellow-500">
                  {IconMap.MapPin({ className: `${CORPORATE_COLOR_CLASSES.white} w-4 h-4 mr-1` })}
                  Ofertas personalizadas
                </Button>
              </a>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}
