'use client'

interface InstallationStepsProps {
  service: 'movil' | 'fibra' | 'convergente' | 'tv' | 'seguridad' | 'energia'
}

export default function InstallationSteps({ service }: InstallationStepsProps) {
  
  const getServiceConfig = (service: string) => {
    switch (service) {
      case 'movil':
        return {
          title: 'Activa tu línea móvil',
          color: '#00b300',
          lightColor: '#e6ffe6',
          accentColor: '#00aa00',
          steps: [
            {
              number: 1,
              title: 'Contrata online',
              description: 'Elige tu tarifa y completa el proceso en 3 minutos',
              icon: '📱',
              duration: '3 min'
            },
            {
              number: 2,
              title: 'Recibe tu SIM',
              description: 'Te enviamos la SIM gratis a domicilio en 24-48h',
              icon: '📦',
              duration: '24-48h'
            },
            {
              number: 3,
              title: 'Activa tu línea',
              description: 'Inserta la SIM y sigue las instrucciones simples',
              icon: '🔄',
              duration: '5 min'
            },
            {
              number: 4,
              title: '¡Ya estás conectado!',
              description: 'Disfruta de tu nueva tarifa móvil sin complicaciones',
              icon: '✅',
              duration: 'Inmediato'
            }
          ]
        }

      case 'fibra':
        return {
          title: 'Instalación de fibra óptica',
          color: '#0066cc',
          lightColor: '#e6f2ff',
          accentColor: '#00aa00',
          steps: [
            {
              number: 1,
              title: 'Contrata tu fibra',
              description: 'Selecciona la velocidad perfecta para tu hogar',
              icon: '🌐',
              duration: '5 min'
            },
            {
              number: 2,
              title: 'Verificación técnica',
              description: 'Confirmamos cobertura y planificamos la instalación',
              icon: '🔍',
              duration: '24h'
            },
            {
              number: 3,
              title: 'Instalación profesional',
              description: 'Técnico especializado instala la fibra en tu hogar',
              icon: '👨‍🔧',
              duration: '2-3h'
            },
            {
              number: 4,
              title: 'Configuración y pruebas',
              description: 'Configuramos tu WiFi y verificamos la velocidad',
              icon: '⚡',
              duration: '30 min'
            },
            {
              number: 5,
              title: '¡Internet ultrarrápido!',
              description: 'Disfruta de tu conexión de fibra óptica',
              icon: '🚀',
              duration: 'Inmediato'
            }
          ]
        }

      case 'convergente':
        return {
          title: 'Instalación Fibra + Móvil',
          color: '#00a699',
          lightColor: '#e6fffe',
          accentColor: '#00aa00',
          steps: [
            {
              number: 1,
              title: 'Contrata tu pack',
              description: 'Fibra para casa + Móvil con máximo ahorro',
              icon: '🔗',
              duration: '5 min'
            },
            {
              number: 2,
              title: 'Activación móvil',
              description: 'Recibe y activa tu SIM en 24-48h',
              icon: '📱',
              duration: '24-48h',
              highlight: 'Móvil: Verde'
            },
            {
              number: 3,
              title: 'Instalación fibra',
              description: 'Técnico instala la fibra óptica en tu hogar',
              icon: '🌐',
              duration: '2-3h',
              highlight: 'Fibra: Azul'
            },
            {
              number: 4,
              title: 'Configuración completa',
              description: 'WiFi optimizado y línea móvil sincronizada',
              icon: '⚙️',
              duration: '30 min'
            },
            {
              number: 5,
              title: '¡Todo conectado!',
              description: 'Casa y móvil con la mejor conectividad',
              icon: '🏠',
              duration: 'Inmediato'
            }
          ]
        }

      case 'tv':
        return {
          title: 'Activación PrismaTV',
          color: '#9333ea',
          lightColor: '#f3e8ff',
          accentColor: '#00aa00',
          steps: [
            {
              number: 1,
              title: 'Contrata PrismaTV',
              description: 'Elige tu pack de canales favoritos',
              icon: '📺',
              duration: '3 min'
            },
            {
              number: 2,
              title: 'Acceso inmediato',
              description: 'Recibe credenciales por email al instante',
              icon: '📧',
              duration: 'Inmediato'
            },
            {
              number: 3,
              title: 'Descarga la app',
              description: 'Instala PrismaTV en tus dispositivos',
              icon: '📲',
              duration: '2 min'
            },
            {
              number: 4,
              title: '¡Disfruta tu contenido!',
              description: 'Más de 100 canales en cualquier dispositivo',
              icon: '🎬',
              duration: 'Inmediato'
            }
          ]
        }

      case 'seguridad':
        return {
          title: 'Instalación sistema de seguridad',
          color: '#475569',
          lightColor: '#f1f5f9',
          accentColor: '#00aa00',
          steps: [
            {
              number: 1,
              title: 'Contrata tu pack',
              description: 'Selecciona el nivel de seguridad para tu hogar',
              icon: '🛡️',
              duration: '5 min'
            },
            {
              number: 2,
              title: 'Visita técnica',
              description: 'Evaluamos tu hogar y diseñamos la instalación',
              icon: '🏠',
              duration: '1h'
            },
            {
              number: 3,
              title: 'Instalación profesional',
              description: 'Colocamos sensores, cámaras y central de alarma',
              icon: '📹',
              duration: '3-4h'
            },
            {
              number: 4,
              title: 'Configuración y pruebas',
              description: 'Configuramos la app y probamos todos los sistemas',
              icon: '📱',
              duration: '30 min'
            },
            {
              number: 5,
              title: '¡Hogar protegido!',
              description: 'Seguridad 24/7 con monitorización profesional',
              icon: '✅',
              duration: 'Inmediato'
            }
          ]
        }

      case 'energia':
        return {
          title: 'Proceso de auditoría energética',
          color: '#ea580c',
          lightColor: '#fff7ed',
          accentColor: '#00aa00',
          steps: [
            {
              number: 1,
              title: 'Solicitud online',
              description: 'Completa el formulario con datos de tu hogar',
              icon: '⚡',
              duration: '5 min'
            },
            {
              number: 2,
              title: 'Análisis personalizado',
              description: 'Estudiamos tu consumo y situación energética',
              icon: '📊',
              duration: '24h'
            },
            {
              number: 3,
              title: 'Propuesta de mejoras',
              description: 'Plan personalizado de eficiencia energética',
              icon: '💡',
              duration: '48h'
            },
            {
              number: 4,
              title: 'Implementación',
              description: 'Instalamos las soluciones acordadas',
              icon: '🔧',
              duration: '1-7 días'
            },
            {
              number: 5,
              title: '¡Ahorro garantizado!',
              description: 'Reduce tu factura hasta un 70%',
              icon: '💰',
              duration: 'Inmediato'
            }
          ]
        }

      default:
        return {
          title: 'Proceso de instalación',
          color: '#6b7280',
          lightColor: '#f9fafb',
          accentColor: '#00aa00',
          steps: []
        }
    }
  }

  const config = getServiceConfig(service)

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            {config.title}
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Proceso simple y transparente. Te acompañamos en cada paso.
          </p>
        </div>

        {/* Timeline de pasos */}
        <div className="relative max-w-4xl mx-auto">
          {/* Línea de conexión */}
          <div 
            className="absolute left-8 md:left-1/2 top-16 bottom-0 w-1 -translate-x-1/2"
            style={{ backgroundColor: config.color + '20' }}
          />

          <div className="space-y-8">
            {config.steps.map((step, index) => (
              <div 
                key={index}
                className={`relative flex items-start ${
                  index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                }`}
              >
                {/* Icono central */}
                <div 
                  className="absolute left-8 md:left-1/2 -translate-x-1/2 w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold text-white z-10 shadow-lg"
                  style={{ backgroundColor: config.color }}
                >
                  {step.icon}
                </div>

                {/* Contenido */}
                <div className={`flex-1 ml-20 md:ml-0 ${
                  index % 2 === 0 ? 'md:pr-12 md:text-right' : 'md:pl-12'
                }`}>
                  <div 
                    className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow"
                    style={{ borderLeft: `4px solid ${config.color}` }}
                  >
                    <div className="flex items-center justify-between mb-3">
                      <span 
                        className="text-sm font-semibold px-3 py-1 rounded-full text-white"
                        style={{ backgroundColor: config.color }}
                      >
                        Paso {step.number}
                      </span>
                      <span className="text-sm text-gray-500 font-medium">
                        {step.duration}
                      </span>
                    </div>
                    
                    <h3 className="text-xl font-bold text-gray-900 mb-2">
                      {step.title}
                    </h3>
                    
                    <p className="text-gray-600 mb-3">
                      {step.description}
                    </p>

                    {/* Highlight especial para convergente */}
                    {step.highlight && (
                      <div className="text-xs text-gray-500 italic">
                        {step.highlight}
                      </div>
                    )}

                    {/* Detalle de marca Prisma */}
                    {index === config.steps.length - 1 && (
                      <div className="mt-4 pt-4 border-t border-gray-100">
                        <div className="text-sm text-gray-600">
                          Con el respaldo de{' '}
                          <span 
                            className="font-semibold"
                            style={{ color: config.accentColor }}
                          >
                            Prisma Móvil
                          </span>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center mt-12">
          <button 
            className="px-8 py-4 rounded-xl font-bold text-white transition-all transform hover:scale-105 hover:shadow-lg"
            style={{ 
              backgroundColor: config.color,
              boxShadow: `0 10px 25px ${config.color}20`
            }}
          >
            {service === 'energia' ? 'Solicitar auditoría gratuita' : 'Contratar ahora'}
          </button>
          
          <p className="text-sm text-gray-500 mt-3">
            Sin permanencia • Instalación incluida • Soporte 24/7
          </p>
        </div>
      </div>
    </section>
  )
}
