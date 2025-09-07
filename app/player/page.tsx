"use client"
import Link from 'next/link'
import { useState, useEffect } from "react"
import { X } from "lucide-react"


// Componente de modal con iframe
function IframeModal({ url, onClose }: { url: string; onClose: () => void }) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-20 p-4 backdrop-blur-sm">
      <button
        onClick={onClose}
        className="absolute top-4 right-4 z-10 text-white bg-gray-800 rounded-full p-2 hover:bg-gray-700 transition-colors"
        aria-label="Cerrar"
      >
        <X className="w-6 h-6" />
      </button>
      <iframe
        src={url}
        title="PrismaTV Player"
        className="w-full h-full border-none"
        allowFullScreen
      ></iframe>
    </div>
  )
}


export default function PrismaTV() {
  const [showIframeModal, setShowIframeModal] = useState(false)
  return (
    <div className="min-h-screen bg-black">
      {/* Hero Section para el iframe en pantalla completa sin margen superior */}
      <section className="bg-black text-white">
        {/* Usamos un div contenedor con overflow-hidden para ocultar la barra de desplazamiento */}
        <div className="w-full h-screen overflow-hidden">
          <style jsx global>{`
            .scroll-hide::-webkit-scrollbar {
              display: none;
            }
            .scroll-hide {
              -ms-overflow-style: none; /* Internet Explorer y Edge */
              scrollbar-width: none; /* Firefox */
            }
          `}</style>
          <iframe
            src="https://player.masmediatv.com/"
            title="PrismaTV Player"
            className="w-full h-full border-none scroll-hide"
            allowFullScreen
          ></iframe>
        </div>
      </section>
    </div>
  )
}