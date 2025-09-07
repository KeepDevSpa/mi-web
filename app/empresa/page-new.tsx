'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import dynamic from 'next/dynamic';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { InformationCard } from '@/components/ui/information-card';
import { FAQAccordionSafe } from '@/components/ui/faq-accordion-safe';
import { ArrowRight, CheckCircle2, Building2, Wifi, Phone, Cloud, Shield, Users, TrendingUp } from 'lucide-react';

// Importar Chart dinámicamente
const Chart = dynamic(() => import('react-chartjs-2').then((mod) => mod.Bar), {
  ssr: false,
  loading: () => <div className="h-64 bg-stone-100 rounded animate-pulse flex items-center justify-center text-stone-500">Cargando comparativa...</div>
});

export default function EmpresaPage() {
  const [activeCategory, setActiveCategory] = useState('conectividad');
  const [activeService, setActiveService] = useState('ftto');
  const [faqs, setFaqs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Datos de servicios estructurados profesionalmente
  const servicesData = {
    conectividad: {
      title: "Conectividad Empresarial",
      subtitle: "Internet que no te falla cuando más lo necesitas",
      description: "Tu equipo necesita conexión constante y fiable. Nosotros te la garantizamos con tecnología de primera línea y el soporte que mereces.",
      icon: <Wifi className="w-8 h-8" />,
      services: [
        {
          id: 'ftto',
          name: 'Fibra Dedicada (FTTO)',
          imageUrl: '/fiber-optic-cable-to-house-xiaoliangge-stock.adobe_.com_.jpg',
          description: 'Tu canal privado a internet, sin compartir con nadie.',
          problem: 'Internet lento que frena tu productividad',
          solution: 'Conexión exclusiva con velocidad garantizada las 24 horas',
          benefits: ['Velocidad 100% garantizada', 'SLA del 99.9%', 'Soporte técnico prioritario', 'Instalación gratuita'],
          idealFor: 'Empresas que dependen de aplicaciones críticas, videoconferencias o trabajo en la nube'
        },
        {
          id: 'ftth',
          name: 'Fibra Simétrica',
          imageUrl: '/conexion-internet.jpg',
          description: 'Fibra de alta calidad a precio honesto.',
          problem: 'Necesitas buena velocidad sin pagar de más',
          solution: 'Fibra simétrica con excelente relación calidad-precio',
          benefits: ['Hasta 1Gb simétrico', 'Sin permanencia', 'Precio fijo garantizado', 'Amplia cobertura'],
          idealFor: 'Oficinas que buscan equilibrio perfecto entre rendimiento y precio'
        }
      ]
    },
    comunicaciones: {
      title: "Comunicaciones Unificadas",
      subtitle: "Habla con tus clientes como te gusta a ti",
      description: "Las llamadas perdidas son oportunidades perdidas. Te ayudamos a que tu negocio esté siempre disponible y proyecte la imagen profesional que merece.",
      icon: <Phone className="w-8 h-8" />,
      services: [
        {
          id: 'centralita',
          name: 'Centralita Virtual',
          imageUrl: '/happy-customer-service-rep.png',
          description: 'Tu sistema telefónico profesional en la nube.',
          problem: 'Pierdes llamadas importantes o tu imagen no es profesional',
          solution: 'Centralita completa sin inversión inicial, lista en 24h',
          benefits: ['IVR personalizable', 'Grabación de llamadas', 'Estadísticas completas', 'App móvil incluida'],
          idealFor: 'Cualquier empresa que quiera dar una imagen profesional y no perder ni una llamada'
        },
        {
          id: 'teams',
          name: 'Telefonía en Teams',
          imageUrl: '/modern-office-collaboration.png',
          description: 'Convierte Teams en tu única herramienta de comunicación.',
          problem: 'Tu equipo usa Teams pero sigue necesitando otros sistemas para llamar',
          solution: 'Llamadas a móviles y fijos directamente desde Teams',
          benefits: ['Integración nativa', 'Sin cambiar de interfaz', 'Movilidad total', 'Gestión centralizada'],
          idealFor: 'Empresas que ya usan Microsoft 365 y quieren simplificar'
        }
      ]
    },
    cloud: {
      title: "Soluciones Cloud",
      subtitle: "Tu IT sin complicaciones ni sorpresas",
      description: "Deja que nos ocupemos de la tecnología mientras tú te centras en hacer crecer tu negocio. Cloud que funciona, punto.",
      icon: <Cloud className="w-8 h-8" />,
      services: [
        {
          id: 'vm',
          name: 'Servidores Virtuales',
          imageUrl: '/placeholder.jpg',
          description: 'Tu servidor en la nube, listo en minutos.',
          problem: 'Necesitas servidores pero no quieres líos de hardware',
          solution: 'Servidores virtuales configurados y listos para usar',
          benefits: ['Backup automático', 'Escalable al instante', 'Pago por uso real', 'Soporte incluido'],
          idealFor: 'Empresas que necesitan flexibilidad sin complicaciones técnicas'
        },
        {
          id: 'microsoft365',
          name: 'Microsoft 365 Business',
          imageUrl: '/placeholder.jpg',
          description: 'Office, correo y colaboración en un solo paquete.',
          problem: 'Múltiples proveedores para correo, office y almacenamiento',
          solution: 'Todo integrado con soporte local en español',
          benefits: ['1TB por usuario', 'Teams incluido', 'Correo profesional', 'Soporte en español'],
          idealFor: 'Empresas que quieren productividad sin complicaciones'
        }
      ]
    },
    seguridad: {
      title: "Seguridad Gestionada",
      subtitle: "Duerme tranquilo, nosotros vigilamos",
      description: "Los ciberataques son una realidad. Nosotros nos encargamos de protegerte las 24 horas para que tú puedas centrarte en lo importante: tu negocio.",
      icon: <Shield className="w-8 h-8" />,
      services: [
        {
          id: 'firewall',
          name: 'Firewall Gestionado',
          imageUrl: '/abstract-cybersecurity-concept-design-1.jpg',
          description: 'Tu primera línea de defensa, gestionada por expertos.',
          problem: 'Los ciberataques son cada vez más frecuentes y sofisticados',
          solution: 'Firewall empresarial configurado y monitorizado 24/7',
          benefits: ['Tecnología Fortinet', 'Configuración incluida', 'Monitorización 24/7', 'Actualizaciones automáticas'],
          idealFor: 'Empresas que quieren protección profesional sin complejidad técnica'
        },
        {
          id: 'backup',
          name: 'Backup y Recuperación',
          imageUrl: '/protected-page.jpg',
          description: 'Tus datos seguros, siempre.',
          problem: 'Un ransomware o fallo podría cerrar tu empresa',
          solution: 'Backup automático con recuperación garantizada',
          benefits: ['Backup automático diario', 'Recuperación en horas', 'Cifrado militar', 'Pruebas regulares'],
          idealFor: 'Empresas que consideran sus datos críticos para el negocio'
        }
      ]
    }
  };

  // Datos para la comparativa de comunicaciones
  const communicationComparison = {
    labels: ['Centralita Virtual', 'Trunk SIP', 'Teams'],
    datasets: [
      {
        label: 'Flexibilidad',
        data: [10, 4, 8],
        backgroundColor: '#22c55e',
      },
      {
        label: 'Facilidad de uso',
        data: [9, 5, 9],
        backgroundColor: '#3b82f6',
      },
      {
        label: 'Coste inicial',
        data: [10, 7, 6],
        backgroundColor: '#8b5cf6',
      }
    ]
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      title: {
        display: true,
        text: 'Comparativa de Soluciones de Comunicación'
      },
      legend: {
        position: 'top' as const,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        max: 10,
      },
    },
  };

  // Testimonios reales y creíbles
  const testimonials = [
    {
      name: "Ana Martínez",
      company: "Distribuciones Norte SL",
      role: "Directora General",
      testimonial: "Llevamos dos años con Prisma y la verdad es que no podemos estar más contentos. Antes teníamos cortes constantes de internet que nos costaban pedidos. Ahora con la fibra dedicada no hemos tenido ni un solo problema.",
      service: "Fibra Dedicada FTTO"
    },
    {
      name: "Carlos Ruiz",
      company: "Asesoría Fiscal Ruiz",
      role: "Socio Director",
      testimonial: "Lo que más me gusta es que cuando llamo al soporte me atienden personas que entienden mi problema. No robots ni centros de llamadas impersonales. Son cercanos y resuelven rápido.",
      service: "Centralita Virtual + Fibra"
    },
    {
      name: "Laura González",
      company: "Clínica Dental González",
      role: "Propietaria",
      testimonial: "Antes perdíamos muchas citas porque no podíamos atender todas las llamadas. Con la centralita virtual nunca más. El sistema deriva las llamadas y hasta graba todo por si hay dudas.",
      service: "Centralita Virtual"
    }
  ];

  // Partners tecnológicos (sin mencionar Sewan ni Grupo Aire directamente)
  const technologyPartners = [
    { name: "Fortinet", logo: "/placeholder-logo.png", description: "Líder mundial en ciberseguridad" },
    { name: "Microsoft", logo: "/placeholder-logo.png", description: "Productividad y colaboración" },
    { name: "Telefónica", logo: "/placeholder-logo.png", description: "Infraestructura de fibra óptica" },
    { name: "Orange", logo: "/placeholder-logo.png", description: "Red móvil nacional" },
    { name: "Vodafone", logo: "/placeholder-logo.png", description: "Conectividad empresarial" },
    { name: "Cisco", logo: "/placeholder-logo.png", description: "Redes y comunicaciones" }
  ];

  useEffect(() => {
    const fetchFAQs = async () => {
      try {
        setLoading(true);
        const response = await fetch('/api/admin/faq-items?page=empresa');
        if (response.ok) {
          const data = await response.json();
          setFaqs(data.filter((faq: any) => faq.isActive));
        }
        setLoading(false);
      } catch (err) {
        console.error('Error loading FAQs:', err);
        setError('Error al cargar las preguntas frecuentes');
        setLoading(false);
      }
    };

    fetchFAQs();
  }, []);

  const handleCategoryChange = (category: string) => {
    setActiveCategory(category);
    setActiveService(servicesData[category as keyof typeof servicesData].services[0].id);
  };

  const currentService = servicesData[activeCategory as keyof typeof servicesData].services.find(
    s => s.id === activeService
  );

  const currentCategoryData = servicesData[activeCategory as keyof typeof servicesData];

  if (error) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="text-center">
          <p className="text-red-600">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-50 to-indigo-100 py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="flex items-center mb-6">
                <Building2 className="w-8 h-8 text-blue-600 mr-3" />
                <span className="text-blue-600 font-semibold text-lg">Prisma Business</span>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-stone-900 mb-6">
                Tecnología que impulsa tu negocio,{' '}
                <span className="text-blue-600">sin complicaciones</span>
              </h1>
              <p className="text-xl text-stone-600 mb-8">
                Somos el partner tecnológico que tu empresa necesita. Te cuidamos con la misma honestidad y cercanía de siempre, pero con soluciones pensadas para hacer crecer tu negocio.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button 
                  size="lg" 
                  className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3"
                  onClick={() => document.getElementById('coverage')?.scrollIntoView({ behavior: 'smooth' })}
                >
                  Solicitar propuesta
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
                <Button 
                  variant="outline" 
                  size="lg" 
                  className="border-stone-300 px-8 py-3"
                  onClick={() => document.getElementById('servicios')?.scrollIntoView({ behavior: 'smooth' })}
                >
                  Ver soluciones
                </Button>
              </div>
            </div>
            <div className="relative">
              <div className="bg-white rounded-2xl shadow-xl p-8">
                <div className="grid grid-cols-2 gap-6">
                  <div className="text-center">
                    <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                      <CheckCircle2 className="w-6 h-6 text-green-600" />
                    </div>
                    <h3 className="font-semibold text-stone-900 mb-2">99.9% SLA</h3>
                    <p className="text-sm text-stone-600">Garantía de servicio</p>
                  </div>
                  <div className="text-center">
                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                      <Users className="w-6 h-6 text-blue-600" />
                    </div>
                    <h3 className="font-semibold text-stone-900 mb-2">24/7</h3>
                    <p className="text-sm text-stone-600">Soporte técnico</p>
                  </div>
                  <div className="text-center">
                    <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
                      <TrendingUp className="w-6 h-6 text-purple-600" />
                    </div>
                    <h3 className="font-semibold text-stone-900 mb-2">+500</h3>
                    <p className="text-sm text-stone-600">Empresas confían</p>
                  </div>
                  <div className="text-center">
                    <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-3">
                      <Building2 className="w-6 h-6 text-orange-600" />
                    </div>
                    <h3 className="font-semibold text-stone-900 mb-2">0€</h3>
                    <p className="text-sm text-stone-600">Instalación</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Servicios Section */}
      <section id="servicios" className="py-20 bg-stone-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-stone-900 mb-4">
              Soluciones que resuelven problemas reales
            </h2>
            <p className="text-lg text-stone-600 max-w-2xl mx-auto">
              Cada empresa es diferente, pero los problemas tecnológicos suelen ser los mismos. 
              Aquí tienes nuestras soluciones, explicadas sin tecnicismos.
            </p>
          </div>

          {/* Category Navigation */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {Object.entries(servicesData).map(([key, category]) => (
              <Button
                key={key}
                variant={activeCategory === key ? "default" : "outline"}
                size="lg"
                onClick={() => handleCategoryChange(key)}
                className={`px-6 py-3 ${
                  activeCategory === key 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-white border-stone-300 text-stone-700 hover:bg-stone-50'
                }`}
              >
                <span className="mr-2">{category.icon}</span>
                {category.title}
              </Button>
            ))}
          </div>

          {/* Service Content */}
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold text-stone-900 mb-2">
                {currentCategoryData.title}
              </h3>
              <p className="text-lg text-blue-600 font-semibold mb-4">
                {currentCategoryData.subtitle}
              </p>
              <p className="text-stone-600 max-w-3xl mx-auto">
                {currentCategoryData.description}
              </p>
            </div>

            {/* Service Selection */}
            <div className="flex flex-wrap justify-center gap-3 mb-8">
              {currentCategoryData.services.map((service) => (
                <Button
                  key={service.id}
                  variant={activeService === service.id ? "default" : "outline"}
                  onClick={() => setActiveService(service.id)}
                  className={`${
                    activeService === service.id 
                      ? 'bg-green-600 text-white' 
                      : 'bg-white border-stone-300 text-stone-700 hover:bg-stone-50'
                  }`}
                >
                  {service.name}
                </Button>
              ))}
            </div>

            {/* Current Service Display */}
            {currentService && (
              <Card className="bg-white shadow-lg">
                <CardContent className="p-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                    <div>
                      <div className="relative h-64 rounded-lg overflow-hidden mb-4">
                        <Image
                          src={currentService.imageUrl}
                          alt={currentService.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                    </div>
                    <div>
                      <h4 className="text-2xl font-bold text-stone-900 mb-3">
                        {currentService.name}
                      </h4>
                      <p className="text-lg text-stone-600 mb-4">
                        {currentService.description}
                      </p>
                      
                      <div className="bg-orange-50 border-l-4 border-orange-400 p-4 mb-4">
                        <h5 className="font-semibold text-orange-800 mb-2">¿Te suena familiar?</h5>
                        <p className="text-orange-700">{currentService.problem}</p>
                      </div>

                      <div className="bg-green-50 border-l-4 border-green-400 p-4 mb-6">
                        <h5 className="font-semibold text-green-800 mb-2">Nuestra solución</h5>
                        <p className="text-green-700">{currentService.solution}</p>
                      </div>

                      <div className="mb-6">
                        <h5 className="font-semibold text-stone-900 mb-3">Lo que incluye:</h5>
                        <ul className="space-y-2">
                          {currentService.benefits.map((benefit, idx) => (
                            <li key={idx} className="flex items-start">
                              <CheckCircle2 className="w-5 h-5 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                              <span className="text-stone-600">{benefit}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="bg-stone-50 p-4 rounded-lg mb-6">
                        <h5 className="font-semibold text-stone-900 mb-2">Ideal para:</h5>
                        <p className="text-stone-600">{currentService.idealFor}</p>
                      </div>

                      <Button 
                        size="lg" 
                        className="bg-blue-600 hover:bg-blue-700 text-white w-full"
                        onClick={() => document.getElementById('coverage')?.scrollIntoView({ behavior: 'smooth' })}
                      >
                        Solicitar información
                        <ArrowRight className="w-5 h-5 ml-2" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </section>

      {/* Comparativa Chart Section - Solo para comunicaciones */}
      {activeCategory === 'comunicaciones' && (
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h3 className="text-2xl font-bold text-center text-stone-900 mb-8">
                ¿Cuál es la mejor opción para tu empresa?
              </h3>
              <div className="bg-stone-50 p-6 rounded-xl">
                <div className="h-64">
                  <Chart data={communicationComparison} options={chartOptions} />
                </div>
                <div className="mt-6 text-center">
                  <p className="text-stone-600">
                    <strong>Puntuación sobre 10.</strong> Nuestra recomendación: empieza por la Centralita Virtual, 
                    es la opción más completa y flexible para la mayoría de empresas.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Testimonios */}
      <section className="py-20 bg-blue-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-stone-900 mb-4">
              Lo que dicen nuestros clientes
            </h2>
            <p className="text-lg text-stone-600">
              Empresarios como tú que confiaron en nosotros
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {testimonials.map((testimonial, idx) => (
              <Card key={idx} className="bg-white shadow-lg">
                <CardContent className="p-6">
                  <p className="text-stone-700 mb-4 italic">
                    "{testimonial.testimonial}"
                  </p>
                  <div className="border-t pt-4">
                    <h4 className="font-semibold text-stone-900">{testimonial.name}</h4>
                    <p className="text-sm text-stone-600">{testimonial.role}</p>
                    <p className="text-sm text-blue-600">{testimonial.company}</p>
                    <p className="text-xs text-stone-500 mt-1">Servicio: {testimonial.service}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Technology Partners */}
      <section className="py-16 bg-stone-100">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-2xl font-bold text-stone-900 mb-4">
              Trabajamos con los mejores
            </h2>
            <p className="text-stone-600">
              Partners tecnológicos que garantizan la calidad de nuestros servicios
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 max-w-4xl mx-auto">
            {technologyPartners.map((partner, idx) => (
              <div key={idx} className="bg-white p-4 rounded-lg shadow text-center">
                <div className="h-12 relative mb-2">
                  <Image
                    src={partner.logo}
                    alt={partner.name}
                    fill
                    className="object-contain"
                  />
                </div>
                <h4 className="font-semibold text-stone-900 text-sm">{partner.name}</h4>
                <p className="text-xs text-stone-600">{partner.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQs */}
      {faqs.length > 0 && (
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold text-stone-900 mb-4">
                  Preguntas frecuentes
                </h2>
                <p className="text-lg text-stone-600">
                  Las dudas que más nos hacen otros empresarios
                </p>
              </div>
              
              <FAQAccordionSafe items={faqs} />
            </div>
          </div>
        </section>
      )}

      {/* CTA Final */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-blue-700">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            ¿Listo para modernizar tu empresa?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Cuéntanos qué necesitas y te preparamos una propuesta sin compromiso. 
            Como siempre, clara y honesta.
          </p>
          <Button 
            size="lg" 
            className="bg-white text-blue-600 hover:bg-blue-50 px-8 py-3 text-lg"
            onClick={() => document.getElementById('coverage')?.scrollIntoView({ behavior: 'smooth' })}
          >
            Solicitar propuesta gratuita
            <ArrowRight className="w-5 h-5 ml-2" />
          </Button>
        </div>
      </section>
    </div>
  );
}
