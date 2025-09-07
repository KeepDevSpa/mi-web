"use client"

import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { IconMap, CORPORATE_COLOR_CLASSES } from '@/lib/icon-config'

export default function TopContactBar() {
  const [phone, setPhone] = useState('915691382')

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

  const [pathname, setPathname] = useState<string>('')

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setPathname(window.location.pathname)
    }
  }, [])

  return (
    <div className="text-white text-sm py-2 px-4" style={{backgroundColor:'#005620'}}>
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <div className="flex gap-4">
            <a
            href="/"
            className={`hover:underline ${pathname !== '/empresa' ? 'text-yellow-400' : ''}`}
            >
            Soy particular
            </a>
          <span>|</span>
            <a href="/empresa" className={`hover:underline ${pathname === '/empresa' ? 'text-yellow-400' : ''}`}>
            Soy empresa / autónomo
            </a>
        </div>
        <div className="flex items-center gap-4">
            <a href="/faq" className="hover:underline">
            Preguntas frecuentes
            </a>
            <a href="/prisma" className="hover:underline">
            Nuestro Proyecto
            </a>
          <Button variant="outline" size="sm" className="bg-green-400 text-black border-green-400 hover:bg-green-500">
            {IconMap.Phone({ className: `${CORPORATE_COLOR_CLASSES.secondary} w-4 h-4 mr-1` })}
            Llámanos al {phone}
          </Button>
        </div>
      </div>
    </div>
  )
}


