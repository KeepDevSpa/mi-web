'use client'

interface ConnectionMessageProps {
  service: 'movil' | 'fibra' | 'convergente' | 'tv' | 'seguridad' | 'energia'
  variant?: 'hero' | 'connection' | 'conversion'
}

interface HeroConfig {
  headline: string
  subheadline: string
  color: string
  accent: string
}

interface ConnectionConfig {
  title: string
  message: string
  highlight: string
  color: string
}

interface ConversionConfig {
  urgency: string
  social_proof: string
  guarantee: string
  color: string
}

// Type guards
function isHeroConfig(config: HeroConfig | ConnectionConfig | ConversionConfig): config is HeroConfig {
  return 'headline' in config && 'subheadline' in config
}

function isConnectionConfig(config: HeroConfig | ConnectionConfig | ConversionConfig): config is ConnectionConfig {
  return 'title' in config && 'message' in config && 'highlight' in config
}

function isConversionConfig(config: HeroConfig | ConnectionConfig | ConversionConfig): config is ConversionConfig {
  return 'urgency' in config && 'social_proof' in config && 'guarantee' in config
}

export default function ConnectionMessage({ service, variant = 'connection' }: ConnectionMessageProps) {
  
  const getServiceMessages = (service: string, variant: string): HeroConfig | ConnectionConfig | ConversionConfig => {
    const messages = {
      movil: {
        hero: {
          headline: 'Móvil sin líos, con la libertad que buscas',
          subheadline: 'Cambia de operador cuando quieras. Elige tu cobertura favorita. Sin permanencia, sin excusas.',
          color: '#00b300',
          accent: '#00aa00'
        },
        connection: {
          title: 'La libertad de elegir tu cobertura',
          message: 'Con Prisma Móvil tienes algo único: puedes cambiar entre redes Movistar, Orange y Vodafone cuando quieras, sin penalización ni justificación. ¿Tu operador no te da cobertura en casa? Cámbialo al instante.',
          highlight: 'Único operador con 3 redes a tu disposición',
          color: '#00b300'
        },
        conversion: {
          urgency: '⏰ Solo hoy: Sin gastos de activación',
          social_proof: '🎯 Más de 50.000 clientes ya han cambiado',
          guarantee: '✅ 15 días de prueba gratis o te devolvemos el dinero',
          color: '#00b300'
        }
      },
      fibra: {
        hero: {
          headline: 'Internet que funciona, sin sorpresas en la factura',
          subheadline: 'Velocidad real garantizada, instalación profesional incluida y precio fijo para siempre.',
          color: '#0066cc',
          accent: '#00aa00'
        },
        connection: {
          title: 'Velocidad real, no marketing',
          message: 'No te prometemos 1000MB "hasta". Te garantizamos la velocidad que contratas, las 24 horas del día. Si no la tienes, reducimos tu factura automáticamente hasta que se solucione.',
          highlight: 'Garantía de velocidad real o descuento automático',
          color: '#0066cc'
        },
        conversion: {
          urgency: '🚀 Instalación esta semana sin coste adicional',
          social_proof: '⚡ Velocidad media real: 97% de lo contratado',
          guarantee: '🔧 Instalación profesional incluida + Router WiFi 6',
          color: '#0066cc'
        }
      },
      convergente: {
        hero: {
          headline: 'Casa y móvil conectados, precio inteligente',
          subheadline: 'La combinación perfecta: fibra ultrarrápida para casa + móvil con 3 redes disponibles.',
          color: '#00a699',
          accent: '#00aa00'
        },
        connection: {
          title: 'Más que un pack, una experiencia integrada',
          message: 'Tu WiFi de casa y tu móvil trabajando juntos. Llamadas WiFi automáticas, gestión unificada y un solo contacto para todo. Además, máximo ahorro al contratar juntos.',
          highlight: 'Ahorra hasta 25€/mes contratando fibra + móvil',
          color: '#00a699'
        },
        conversion: {
          urgency: '💰 Promoción pack: 2 meses gratis de móvil',
          social_proof: '🏆 Pack más elegido por familias',
          guarantee: '📞 Soporte unificado 24/7 para todo',
          color: '#00a699'
        }
      },
      tv: {
        hero: {
          headline: 'Tu entretenimiento, en cualquier pantalla',
          subheadline: 'Más de 100 canales premium, disponibles donde estés. Smart TV, móvil, tablet o ordenador.',
          color: '#9333ea',
          accent: '#00aa00'
        },
        connection: {
          title: 'Libertad total de entretenimiento',
          message: 'No dependas de un decodificador. PrismaTV funciona en cualquier dispositivo con internet. Empezaste una serie en el sofá, continúala en el metro. Dos pantallas simultáneas incluidas.',
          highlight: '100+ canales en cualquier dispositivo, 2 pantallas simultáneas',
          color: '#9333ea'
        },
        conversion: {
          urgency: '🎬 Primer mes gratis + acceso inmediato',
          social_proof: '📺 +50 canales en HD y 4K incluidos',
          guarantee: '🔄 Cancela cuando quieras, sin equipo que devolver',
          color: '#9333ea'
        }
      },
      seguridad: {
        hero: {
          headline: 'Tu hogar protegido las 24 horas',
          subheadline: 'Seguridad profesional con tecnología inteligente. Controla todo desde tu móvil.',
          color: '#475569',
          accent: '#00aa00'
        },
        connection: {
          title: 'Seguridad que piensa por ti',
          message: 'No solo alertas. Nuestro sistema aprende tus rutinas y se adapta automáticamente. Diferencia entre una mascota y un intruso, reconoce a la familia y te avisa solo de lo importante.',
          highlight: 'IA que reduce falsas alarmas en un 95%',
          color: '#475569'
        },
        conversion: {
          urgency: '🛡️ Instalación inmediata disponible',
          social_proof: '🏠 Central receptora de alarmas 24/7',
          guarantee: '📱 App móvil incluida + Cámaras en tiempo real',
          color: '#475569'
        }
      },
      energia: {
        hero: {
          headline: 'Reduce tu factura de luz hasta un 70%',
          subheadline: 'Auditoría energética gratuita y soluciones personalizadas para tu hogar.',
          color: '#ea580c',
          accent: '#00aa00'
        },
        connection: {
          title: 'Cada hogar es único, cada solución también',
          message: 'No vendemos productos estándar. Analizamos tu consumo real, tus hábitos y tu vivienda para crear un plan energético personalizado. Solo pagas por las mejoras que realmente te van a ahorrar dinero.',
          highlight: 'Auditoría energética gratuita + Plan personalizado',
          color: '#ea580c'
        },
        conversion: {
          urgency: '⚡ Auditoría gratuita esta semana',
          social_proof: '💰 Ahorro medio de clientes: 52% en factura',
          guarantee: '📊 Plan personalizado sin compromiso',
          color: '#ea580c'
        }
      }
    }

    return messages[service as keyof typeof messages]?.[variant as keyof typeof messages.movil] || messages.movil.connection
  }

  const config = getServiceMessages(service, variant)

  if (variant === 'hero' && isHeroConfig(config)) {
    return (
      <div className="text-center space-y-6">
        <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-6 tracking-tight">
          {config.headline}
        </h1>
        <p className="text-xl text-zinc-300 max-w-3xl mx-auto leading-relaxed">
          {config.subheadline}
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
          <button 
            className="px-8 py-4 font-semibold rounded-xl transition-all transform hover:scale-105 hover:shadow-2xl text-white"
            style={{ 
              background: `linear-gradient(135deg, ${config.color} 0%, ${config.color}dd 100%)` 
            }}
          >
            Ver ofertas
          </button>
          <button className="px-8 py-4 border border-white text-white font-semibold rounded-xl hover:bg-white hover:text-zinc-900 transition-all">
            Más información
          </button>
        </div>
      </div>
    )
  }

  if (variant === 'connection' && isConnectionConfig(config)) {
    return (
      <section className="py-16 bg-gradient-to-r from-gray-50 to-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="mb-8">
              <div 
                className="inline-flex items-center px-4 py-2 rounded-full text-sm font-semibold text-white mb-6"
                style={{ backgroundColor: config.color }}
              >
                <span className="mr-2">⭐</span>
                Lo que nos diferencia
              </div>
              
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                {config.title}
              </h2>
              
              <p className="text-lg text-gray-600 leading-relaxed mb-8">
                {config.message}
              </p>
              
              <div 
                className="inline-block px-6 py-3 rounded-xl font-semibold text-white"
                style={{ backgroundColor: config.color }}
              >
                {config.highlight}
              </div>
            </div>

            {/* Detalle de marca Prisma */}
            <div className="mt-12 pt-8 border-t border-gray-200">
              <p className="text-gray-600">
                <span style={{ color: '#00aa00' }} className="font-semibold">
                  Prisma Móvil
                </span>{' '}
                - Conecta con lo que realmente importa
              </p>
            </div>
          </div>
        </div>
      </section>
    )
  }

  if (variant === 'conversion' && isConversionConfig(config)) {
    return (
      <div className="bg-white border rounded-xl p-6 shadow-lg">
        <div className="text-center space-y-4">
          <h3 className="text-xl font-bold text-gray-900 mb-4">
            ¿Por qué elegir este plan?
          </h3>
          
          <div className="space-y-3 text-left">
            <div className="flex items-start space-x-3">
              <div className="text-lg">{config.urgency.charAt(0)}</div>
              <div>
                <div className="font-semibold text-gray-900">
                  {config.urgency.slice(2)}
                </div>
                <div className="text-sm text-gray-600">
                  Promoción limitada
                </div>
              </div>
            </div>
            
            <div className="flex items-start space-x-3">
              <div className="text-lg">{config.social_proof.charAt(0)}</div>
              <div>
                <div className="font-semibold text-gray-900">
                  {config.social_proof.slice(2)}
                </div>
                <div className="text-sm text-gray-600">
                  Respaldo de la comunidad
                </div>
              </div>
            </div>
            
            <div className="flex items-start space-x-3">
              <div className="text-lg">{config.guarantee.charAt(0)}</div>
              <div>
                <div className="font-semibold text-gray-900">
                  {config.guarantee.slice(2)}
                </div>
                <div className="text-sm text-gray-600">
                  Sin riesgos
                </div>
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-gray-100">
            <div className="text-xs text-gray-500">
              Con{' '}
              <span style={{ color: '#00aa00' }} className="font-semibold">
                Prisma Móvil
              </span>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return null
}
