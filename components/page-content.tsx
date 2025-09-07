"use client"

import { useState, useEffect } from 'react'
import { Card } from '@/components/ui/card'
import { Clock, Wifi, Shield, CheckCircle } from 'lucide-react'

interface ServiceCard {
  id: string
  icon: 'clock' | 'wifi' | 'shield'
  title: string
  description: string
  gradient: 'teal' | 'green' | 'blue'
}

interface WhyChoosePoint {
  id: string
  text: string
  boldText: string
  description: string
  bullets: string[]
}

interface InstallationStep {
  id: string
  day: string
  title: string
  description: string
  color: 'lime' | 'cyan'
}

interface PageContentConfig {
  servicesTitle: string
  services: ServiceCard[]
  whyChooseTitle: string
  whyChoosePoints: WhyChoosePoint[]
  whyChooseCtaText: string
  installationTitle: string
  installationSubtitle: string
  installationSteps: InstallationStep[]
}

const defaultConfig: PageContentConfig = {
  servicesTitle: "Descubre nuestros servicios incluidos en Fibra",
  services: [
    {
      id: "servicio-pausa",
      icon: "clock",
      title: "Servicio Pausa",
      description: "El Servicio Pausa de Prisma te permite suspender de manera temporal tu servicio de fibra cuando no lo necesites, y no pagar por él hasta que lo reactives. Y lo mejor de todo es que es totalmente gratuito hasta un máximo de 180 días al año.",
      gradient: "teal"
    },
    {
      id: "tarifas-fijo",
      icon: "wifi",
      title: "Tarifas Fijo",
      description: "Disfruta de tarifas competitivas para llamadas desde tu línea fija, con opciones que se adaptan a tus necesidades de comunicación. Mantente conectado con tus seres queridos sin preocuparte por los costes adicionales.",
      gradient: "green"
    },
    {
      id: "wifi-cobertura",
      icon: "shield",
      title: "WiFi Cobertura+",
      description: "Mejora la forma en la que conectas tu hogar a internet con mayor cobertura en cada rincón, estabilidad de la red y mayor duración con tu velocidad contratada.",
      gradient: "blue"
    }
  ],
  whyChooseTitle: "Nuestros valores",
  whyChoosePoints: [
    {
      id: "precios-ajustados",
      text: "Precios ajustados a la realidad.",
      boldText: "Precios ajustados a la realidad.",
      description: "Compramos la energía en el mercado, incluímos los márgenes necesarios para sostenernos como empresa y te la vendemos. Lo de atraerte con precios bajísimos para subírtelos porque sí o cobrarte extras se lo dejamos a otras.",
      bullets: []
    },
    {
      id: "sorpresas-cumpleanos",
      text: "Las sorpresas, para los cumpleaños.",
      boldText: "Las sorpresas, para los cumpleaños.",
      description: "Recibir una factura que no entiendes, descubrir un coste extra del que nadie te ha informado o que tu fidelidad se premie con precios inflados. Son cosas que nunca verás aquí.",
      bullets: []
    },
    {
      id: "menos-es-mas",
      text: "Menos es más.",
      boldText: "Menos es más.",
      description: "Nunca vamos a liarte para que contrates servicios de mantenimiento que no querías. Nuestras facturas son sin sorpresas, sin costes extra que no pediste y con muuuuuuucho ahorro.",
      bullets: []
    },
    {
      id: "tiempo-es-oro",
      text: "Tu tiempo es oro.",
      boldText: "Tu tiempo es oro.",
      description: "Así que cuando llames o nos escribas, nunca vas perder horas hablando con contestadores automáticos o pasando de un departamento a otro. El ahorro también es en tiempo.",
      bullets: []
    },
    {
      id: "solucionamos-problemas",
      text: "Solucionamos problemas.",
      boldText: "Solucionamos problemas.",
      description: "Si podemos eliminar las facturas de luz y gas de tu listado de “cosas de las que preocuparme”, lo haremos. De hecho, mejor si no tienes que pensar en ellas nunca más.",
      bullets: []
    },
    {
      id: "estar-donde-quieras",
      text: "Debes estar donde quieras estar.",
      boldText: "Debes estar donde quieras estar.",
      description: "Algunas compañías llaman fidelizar a incluir permanencias a sus clientes. Aquí preferimos convencerte con hechos y que seas libre de marcharte cuando no lo hagamos.",
      bullets: []
    },
    {
      id: "no-molestar",
      text: "No vamos a molestarte.",
      boldText: "No vamos a molestarte.",
      description: "Seamos honestos, nunca hemos oído a alguien decir “¡Estoy deseando hablar con mi compañía de luz!”. Por eso, nunca vamos a molestarte con llamadas o mensajes comerciales.",
      bullets: []
    }
  ],
  whyChooseCtaText: "Contrata la mejor fibra con Prisma",
  installationTitle: "Tu Fibra y móvil más rápida en menos de 1 semana",
  installationSubtitle: "Es la media de nuestras últimas 1.071 instalaciones",
  installationSteps: [
    {
      id: "bienvenido",
      day: "Día 1",
      title: "¡Bienvenido!",
      description: "Contratas el servicio y recibes un correo de bienvenida con tu contrato.",
      color: "lime"
    },
    {
      id: "contacto",
      day: "Día 2-3",
      title: "Te contactamos",
      description: "Te contactamos para coordinar la instalación.",
      color: "lime"
    },
    {
      id: "instalacion",
      day: "Día 4-5",
      title: "Instalación",
      description: "Nuestro técnico instala la fibra en tu casa en menos de 2 horas.",
      color: "lime"
    },
    {
      id: "listo-fibra",
      day: "Día 5-6",
      title: "¡Listo!",
      description: "Disfruta de una conexión ultrarrápida.",
      color: "lime"
    },
    {
      id: "recibes-sim",
      day: "Día 2-3",
      title: "Recibes la SIM",
      description: "Recibes tu tarjeta SIM. Si es un número nuevo, ya estará activa.",
      color: "cyan"
    },
    {
      id: "portabilidad",
      day: "Día 4-5",
      title: "Portabilidad",
      description: "Gestionamos la portabilidad de tu número si lo necesitas.",
      color: "cyan"
    },
    {
      id: "dia-cambio",
      day: "Día 6",
      title: "Día de cambio",
      description: "Llega la madrugada, introduces la SIM de Prisma en tu móvil.",
      color: "cyan"
    },
    {
      id: "listo-movil",
      day: "Día 7",
      title: "¡Listo!",
      description: "Habla y navega con Prisma desde el primer día.",
      color: "cyan"
    }
  ]
}

const getGradientClasses = (gradient: string) => {
  switch (gradient) {
    case 'teal': return 'bg-gradient-to-br from-teal-500 to-teal-600'
    case 'green': return 'bg-gradient-to-br from-green-600 to-green-700'
    case 'blue': return 'bg-gradient-to-br from-blue-500 to-blue-600'
    default: return 'bg-gradient-to-br from-teal-500 to-teal-600'
  }
}

const getIconComponent = (icon: string) => {
  switch (icon) {
    case 'clock': return <Clock className="w-12 h-12 mx-auto mb-4" />
    case 'wifi': return <Wifi className="w-12 h-12 mx-auto mb-4" />
    case 'shield': return <Shield className="w-12 h-12 mx-auto mb-4" />
    default: return <Clock className="w-12 h-12 mx-auto mb-4" />
  }
}

const getColorClasses = (color: string) => {
  switch (color) {
    case 'lime': return 'bg-green-400 text-black'
    case 'cyan': return 'bg-cyan-400 text-black'
    default: return 'bg-green-400 text-black'
  }
}

export default function PageContent() {
  const [config, setConfig] = useState<PageContentConfig>(defaultConfig)
  const [activeIndex, setActiveIndex] = useState(0)

  // Split steps into two arrays
  const fiberSteps = config.installationSteps.filter(step => step.color === 'lime');
  const mobileSteps = config.installationSteps.filter(step => step.color === 'cyan');

  useEffect(() => {
    // Load configuration from localStorage
    const savedConfig = localStorage.getItem('prisma-page-content')
    if (savedConfig) {
      try {
        setConfig(JSON.parse(savedConfig))
      } catch (error) {
        console.error('Error parsing page content config:', error)
      }
    }

    // Listen for updates from admin panel
    const handleStorageUpdate = () => {
      const updatedConfig = localStorage.getItem('prisma-page-content')
      if (updatedConfig) {
        try {
          setConfig(JSON.parse(updatedConfig))
        } catch (error) {
          console.error('Error parsing updated page content config:', error)
        }
      }
    }

    window.addEventListener('storage', handleStorageUpdate)
    window.addEventListener('localStorage-updated', handleStorageUpdate)

    return () => {
      window.removeEventListener('storage', handleStorageUpdate)
      window.removeEventListener('localStorage-updated', handleStorageUpdate)
    }
  }, [])

  return (
    <>
      {/* Services Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">{config.servicesTitle}</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {config.services.map((service) => (
              <Card key={service.id} className={`p-6 text-center rounded-2xl shadow-lg ${getGradientClasses(service.gradient)} text-white`}>
                {getIconComponent(service.icon)}
                <h3 className="text-xl font-bold mb-3">{service.title}</h3>
                <p className="text-sm opacity-90">{service.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      ---

      {/* Why Choose Section */}
      <section className="flex w-full justify-center py-12">
        <div className="max-w-7xl mx-auto px-4 w-full flex flex-col py-10 items-center">
          {/* Header Section */}
          <div className="flex flex-col gap-4 items-center md:items-start w-full">
            <h2 className="text-center md:text-left text-4xl md:text-7xl md:mt-12">
              Nuestros<br /> <span className="text-4xl md:text-7xl">valores</span>
            </h2>
            <p className="max-w-[300px] md:max-w-md text-center md:text-left text-base md:text-xl">
              Gracias a tener claro lo que no queremos ser, sabemos muy bien lo que sí queremos hacer.
            </p>
          </div>
          <div className="hidden md:flex flex-row w-full py-20 gap-24">
            {/* Number Navigation */}
            <div className="flex flex-col justify-start pt-1 flex-shrink-0">
              {config.whyChoosePoints.map((_, index) => (
                <p
                  key={index}
                  className={`text-4xl font-bold hover:cursor-pointer transition-colors ${activeIndex === index ? 'text-gray-900' : 'text-gray-500'}`}
                  onClick={() => setActiveIndex(index)}
                >
                  {String(index + 1).padStart(2, '0')}.
                </p>
              ))}
            </div>

            {/* Content Display in two columns */}
            {config.whyChoosePoints[activeIndex] && (
              <div className="flex w-full justify-between gap-16">
                {/* Title and Image Column */}
                <div className="flex-1 flex flex-col items-start justify-start">
                  <p className="text-4xl font-bold">{config.whyChoosePoints[activeIndex].text}</p>
                  <div className="mt-8 flex justify-start items-start">
                     {/* Aquí va tu imagen o GIF */}
                     {/* <img src="/path-to-your-image.png" alt="Descripción del valor" className="max-w-full h-auto" /> */}
                  </div>
                </div>
                {/* Description Column */}
                <div className="flex-1 flex flex-col justify-start">
                  <p className="text-lg text-gray-700">{config.whyChoosePoints[activeIndex].description}</p>
                </div>
              </div>
            )}
          </div>

          {/* Mobile View (hidden on desktop) */}
          <div className="md:hidden contents">
            <div className="flex w-full py-12 px-4">
              <div className="w-full">
                {config.whyChoosePoints.map((point, index) => (
                  <div key={point.id} className="flex flex-row gap-7 justify-between items-center border-b border-gray-300 cursor-pointer py-4">
                    <div className="flex flex-row items-center gap-4">
                      <p className="text-[45px] uppercase bold text-gray-900 min-w-[60px]">{index + 1}</p>
                      <p className="text-xl font-semibold">{point.text}</p>
                    </div>
                    <div className="flex justify-end">
                      <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 24 24" aria-hidden="true" height="24" width="24" xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd" d="M12.97 3.97a.75.75 0 011.06 0l7.5 7.5a.75.75 0 010 1.06l-7.5 7.5a.75.75 0 11-1.06-1.06l6.22-6.22H3a.75.75 0 010-1.5h16.19l-6.22-6.22a.75.75 0 010-1.06z" clipRule="evenodd"></path>
                      </svg>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      ---

      {/* Installation Steps Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-4">{config.installationTitle}</h2>
          <p className="text-center text-gray-600 mb-12">{config.installationSubtitle}</p>
          
          <div className="bg-gray-100 rounded-2xl p-8 space-y-12">
            
            {/* Fibra Installation Timeline */}
            <div>
              <h3 className="text-xl font-bold text-gray-800 mb-6 text-center md:text-left">Instalación de Fibra</h3>
              <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0 md:space-x-4">
                {fiberSteps.map((step, index) => (
                  <div key={step.id} className="flex flex-col items-center flex-1 w-full md:w-auto">
                    <div className="bg-gray-300 px-3 py-1 rounded-full text-sm font-medium mb-4">
                      {step.day}
                    </div>
                    <Card className={`${getColorClasses(step.color)} p-4 rounded-xl text-center shadow-lg w-full`}>
                      <h4 className="font-bold text-sm mb-2">{step.title}</h4>
                      <p className="text-xs">{step.description}</p>
                    </Card>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Línea Móvil Timeline */}
            <div>
              <h3 className="text-xl font-bold text-gray-800 mb-6 text-center md:text-left">Línea Móvil y Portabilidad</h3>
              <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0 md:space-x-4">
                {mobileSteps.map((step, index) => (
                  <div key={step.id} className="flex flex-col items-center flex-1 w-full md:w-auto">
                    <div className="bg-gray-300 px-3 py-1 rounded-full text-sm font-medium mb-4">
                      {step.day}
                    </div>
                    <Card className={`${getColorClasses(step.color)} p-4 rounded-xl text-center shadow-lg w-full`}>
                      <h4 className="font-bold text-sm mb-2">{step.title}</h4>
                      <p className="text-xs">{step.description}</p>
                    </Card>
                  </div>
                ))}
              </div>
            </div>
            
          </div>
        </div>
      </section>
    </>
  )
}