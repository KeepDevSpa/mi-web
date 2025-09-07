"use client";

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Phone, CheckCircle } from 'lucide-react';
import dynamic from 'next/dynamic';
import { InformationCard } from '@/components/ui/information-card';
import { FAQAccordionSafe } from '@/components/ui/faq-accordion-safe';
import './empresa-styles.css';
import VodafoneVisuals from './vodafone-visuals';
import HeroProfesional from '@/components/ui/hero-profesional';

// Componente para los botones de servicio
const ServiceButton = ({ 
  isActive, 
  category, 
  serviceId, 
  name, 
  onClick 
}: { 
  isActive: boolean; 
  category: string; 
  serviceId: string; 
  name: string; 
  onClick: (category: string, serviceId: string) => void; 
}) => {
  return (
    <button 
      className={`text-sm md:text-base px-4 py-2 rounded-lg transition-colors duration-300 flex items-center gap-2 shadow-lg ${isActive 
        ? 'bg-gradient-to-br from-green-500 to-green-600 text-white font-semibold' 
        : 'bg-stone-100 text-stone-700 hover:bg-green-100'}`}
      onClick={() => onClick(category, serviceId)}
    >
      {name}
    </button>
  );
};

// Componente para el contenido del servicio
const ServiceContent = ({ service, ctaId }: { service: any, ctaId: string }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-5 gap-8 items-start">
      <div className="md:col-span-3">
        <p className="text-lg font-semibold text-orange-600 mb-2">{service.need}</p>
        <h3 className="text-2xl font-bold mb-4">{service.name}</h3>
        <p className="text-stone-600 mb-6">{service.solution}</p>
        <h4 className="font-bold mb-2">Características Principales:</h4>
        <ul className="space-y-2 text-stone-600 mb-6">
          {service.features.map((feature: string, idx: number) => (
            <li key={idx} className="flex items-start">
              <span className="text-green-500 mr-2 mt-1">▪</span>
              <span>{feature}</span>
            </li>
          ))}
        </ul>
        <a 
          href={`#${ctaId}`} 
          className="cta-button inline-block bg-green-600 text-white font-semibold px-6 py-2 rounded-lg text-sm shadow-md mt-4 hover:bg-green-700 transition-all duration-200 hover:translate-y-[-2px] hover:shadow-lg"
        >
          Me interesa esta solución
        </a>
      </div>
      <div className="md:col-span-2">
        <div className="relative w-full aspect-[3/2] rounded-xl overflow-hidden shadow-lg mb-6">
          <Image 
            src={service.imageUrl} 
            alt={service.name}
            fill
            className="object-cover"
          />
        </div>
        <div className="bg-green-50/50 border border-green-200 p-4 rounded-lg">
          <h4 className="font-bold mb-2">Ideal para:</h4>
          <p className="text-stone-700 text-sm">{service.ideal}</p>
        </div>
      </div>
    </div>
  );
};

// Componente para el gráfico de comparación (simplificado)
const ComparationChart = () => {
  return (
    <div className="mt-12">
      <h3 className="text-2xl font-bold text-center mb-6">Comparativa de Soluciones de Voz</h3>
      <div className="bg-gradient-to-r from-stone-50 to-stone-100 p-6 rounded-xl border border-stone-200 max-w-3xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
          <div className="bg-white p-4 rounded-lg shadow">
            <h4 className="font-semibold text-green-600 mb-2">Centralita Virtual</h4>
            <div className="text-sm text-stone-600 space-y-1">
              <p>🚀 <strong>Movilidad:</strong> 5/5</p>
              <p>💰 <strong>Baja Inversión:</strong> 5/5</p>
              <p>🔧 <strong>Flexibilidad:</strong> 5/5</p>
              <p className="text-green-600 font-medium mt-2">Ideal para empresas modernas</p>
            </div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow">
            <h4 className="font-semibold text-blue-600 mb-2">Trunk SIP</h4>
            <div className="text-sm text-stone-600 space-y-1">
              <p>🚀 <strong>Movilidad:</strong> 2/5</p>
              <p>💰 <strong>Baja Inversión:</strong> 4/5</p>
              <p>🔧 <strong>Flexibilidad:</strong> 1/5</p>
              <p className="text-blue-600 font-medium mt-2">Para centralitas existentes</p>
            </div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow">
            <h4 className="font-semibold text-purple-600 mb-2">Teams</h4>
            <div className="text-sm text-stone-600 space-y-1">
              <p>🚀 <strong>Movilidad:</strong> 5/5</p>
              <p>💰 <strong>Baja Inversión:</strong> 3/5</p>
              <p>🔧 <strong>Flexibilidad:</strong> 4/5</p>
              <p className="text-purple-600 font-medium mt-2">Perfecto para usuarios Teams</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Componente principal
export default function EmpresaPage() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [faqs, setFaqs] = useState<any[]>([]);
  const [heroConfig, setHeroConfig] = useState<any>(null);

  // Datos de servicios
  const servicesData = {
    conectividad: {
      title: "Conectividad: La Base de su Negocio Digital",
      description: "Una conexión a internet fiable y de alto rendimiento es la base sobre la que se construye cualquier empresa moderna. Ofrecemos una gama completa de soluciones para garantizar que su negocio esté siempre online.",
      services: [
                { id: 'ftto', name: 'Fibra Dedicada (FTTO)', imageUrl: '/fiber-optic-cable-to-house-xiaoliangge-stock.adobe_.com_.jpg', need: '¿Su conexión a internet es lenta o inestable y frena a su equipo?', solution: 'Le proporciona un canal exclusivo a internet. El ancho de banda es 100% garantizado y no se comparte, eliminando cuellos de botella y asegurando máxima productividad.', features: ['Caudal 100% garantizado', 'Máxima fiabilidad (SLA)', 'Seguridad superior', 'Baja latencia'], ideal: 'Empresas con aplicaciones críticas en la nube, voz sobre IP ...' },
        { id: 'ftth', name: 'Fibra Compartida (FTTH)', imageUrl: '/placeholder.jpg', need: '¿Busca la mejor relación velocidad-precio para sus oficinas?', solution: 'Ofrece alta velocidad de conexión a un coste competitivo. Disponemos de una amplia cobertura nacional para dar servicio a todas sus sedes.', features: ['Alta velocidad hasta 1 Gbps', 'Amplia cobertura nacional', 'Excelente relación rendimiento/precio'], ideal: 'Oficinas y sedes que requieren una conexión rápida para el trabajo diario.' },
        { id: 'satelital', name: 'Conectividad Satelital', imageUrl: '/5g-network.png', need: '¿Su negocio está en una zona rural o sin acceso a fibra?', solution: 'Llevamos internet de alta velocidad y baja latencia a cualquier lugar, por remoto que sea, a través de la red de satélites de Starlink.', features: ['Cobertura total del territorio', 'Baja latencia', 'Alta velocidad de descarga'], ideal: 'Negocios en zonas rurales, eventos remotos o como solución de backup definitiva.' },
        { id: '4g5g', name: '4G/5G y Radioenlace', imageUrl: '/5g-mtc.jpg', need: '¿Necesita una conexión rápida de desplegar o una alternativa a la fibra?', solution: 'Ofrecemos conexiones inalámbricas de alta capacidad para garantizar la conectividad donde la fibra no es una opción.', features: ['Radioenlace dedicado PTP', 'Conectividad móvil 4G/5G', 'Despliegue inmediato', 'Backup de conectividad'], ideal: 'Conexión principal en zonas sin fibra o como sistema de backup automático.' },
        { id: 'sdwan', name: 'SD-WAN: Red Inteligente', imageUrl: '/modern-office-collaboration.png', need: '¿Gestiona múltiples sedes y necesita optimizar el tráfico?', solution: 'Transforma su red tradicional en una red inteligente, flexible y segura, priorizando las aplicaciones críticas para su negocio.', features: ['Optimización de ancho de banda', 'Gestión centralizada', 'Mejora de la seguridad', 'Priorización de aplicaciones'], ideal: 'Empresas con múltiples delegaciones que utilizan aplicaciones en la nube.' },
        { id: 'ftth', name: 'Fibra Compartida (FTTH)', imageUrl: '/placeholder.jpg', need: '¿Busca la mejor relación velocidad-precio para sus oficinas?', solution: 'Ofrece alta velocidad de conexión a un coste competitivo. Disponemos de una amplia cobertura nacional para dar servicio a todas sus sedes.', features: ['Alta velocidad hasta 1 Gbps', 'Amplia cobertura nacional', 'Excelente relación rendimiento/precio'], ideal: 'Oficinas y sedes que requieren una conexión rápida para el trabajo diario.' },
        { id: 'satelital', name: 'Conectividad Satelital', imageUrl: '/placeholder.jpg', need: '¿Su negocio está en una zona rural o sin acceso a fibra?', solution: 'Llevamos internet de alta velocidad y baja latencia a cualquier lugar, por remoto que sea, a través de la red de satélites de Starlink.', features: ['Cobertura total del territorio', 'Baja latencia', 'Alta velocidad de descarga'], ideal: 'Negocios en zonas rurales, eventos remotos o como solución de backup definitiva.' },
        { id: '4g5g', name: '4G/5G y Radioenlace', imageUrl: '/placeholder.jpg', need: '¿Necesita una conexión rápida de desplegar o una alternativa a la fibra?', solution: 'Ofrecemos conexiones inalámbricas de alta capacidad para garantizar la conectividad donde la fibra no es una opción.', features: ['Radioenlace dedicado PTP', 'Conectividad móvil 4G/5G', 'Despliegue inmediato', 'Backup de conectividad'], ideal: 'Conexión principal en zonas sin fibra o como sistema de backup automático.' },
        { id: 'sdwan', name: 'SD-WAN: Red Inteligente', imageUrl: '/placeholder.jpg', need: '¿Gestiona múltiples sedes y necesita optimizar el tráfico?', solution: 'Transforma su red tradicional en una red inteligente, flexible y segura, priorizando las aplicaciones críticas para su negocio.', features: ['Optimización de ancho de banda', 'Gestión centralizada', 'Mejora de la seguridad', 'Priorización de aplicaciones'], ideal: 'Empresas con múltiples delegaciones que utilizan aplicaciones en la nube.' }
      ]
    },
    comunicaciones: {
      title: "Comunicaciones Unificadas: Colaboración sin Barreras",
      description: "Unifique sus herramientas de comunicación (voz, vídeo, mensajería) en una única plataforma. Facilite la colaboración, mejore la atención al cliente y optimice sus costes.",
      services: [
                { id: 'centralita', name: 'Centralita Virtual', imageUrl: '/happy-customer-service-rep.png', need: '¿Pierde llamadas de clientes importantes o su sistema actual es obsoleto?', solution: 'Un sistema de telefonía avanzado en la nube que proyecta una imagen profesional y asegura que nunca pierda una oportunidad de negocio, con funcionalidades avanzadas.', features: ['Operadora Automática (IVR)', 'Grupos de llamada', 'Buzón de voz a email', 'Estadísticas y grabación'], ideal: 'Cualquier empresa que quiera modernizar su ...' },
        { id: 'trunk', name: 'Trunk SIP', imageUrl: '/home-office-remote-work.png', need: '¿Su factura telefónica es demasiado alta pero quiere mantener su centralita?', solution: 'Conecte su centralita actual a la red telefónica a través de internet y reduzca drásticamente sus costes con planes de llamadas ilimitadas.', features: ['Ahorro en la factura', 'Llamadas ilimitadas', 'Numeración nacional/internacional', 'Certificado con principales fabricantes'], ideal: 'Empresas con una centralita física que bus...' },
        { id: 'teams', name: 'Telefonía en M. Teams', imageUrl: '/modern-office-collaboration.png', need: '¿Su equipo ya trabaja en Teams y quiere simplificar herramientas?', solution: 'Convierta Teams en su única herramienta de comunicación. Realice y reciba llamadas a fijos y móviles desde la misma interfaz que ya utiliza a diario.', features: ['Unifica comunicaciones', 'Simplifica la gestión', 'Aprovecha herramienta conocida', 'Movilidad total'], ideal: 'Empresas que han adoptado Microsoft Teams como su principal herram...' },
        { id: 'movil', name: 'Telefonía Móvil', imageUrl: '/sim-cards-2500-1200.jpg', need: '¿Necesita planes móviles para empresa flexibles y con servicios de valor?', solution: 'Ofrecemos una completa gama de tarifas móviles con cobertura 5G y servicios de valor añadido pensados para el profesional.', features: ['Cobertura 5G', 'Hasta 250GB de datos', 'Roaming en Europa', 'MultiSIM, eSIM, IP Fija'], ideal: 'Equipos que necesitan conectividad móvil fiable y flexible para su trabajo diario.' },
        { id: 'trunk', name: 'Trunk SIP', imageUrl: '/placeholder.jpg', need: '¿Su factura telefónica es demasiado alta pero quiere mantener su centralita?', solution: 'Conecte su centralita actual a la red telefónica a través de internet y reduzca drásticamente sus costes con planes de llamadas ilimitadas.', features: ['Ahorro en la factura', 'Llamadas ilimitadas', 'Numeración nacional/internacional', 'Certificado with principales fabricantes'], ideal: 'Empresas con una centralita física que buscan optimizar sus costes de comunicación.' },
        { id: 'teams', name: 'Telefonía en M. Teams', imageUrl: '/placeholder.jpg', need: '¿Su equipo ya trabaja en Teams y quiere simplificar herramientas?', solution: 'Convierta Teams en su única herramienta de comunicación. Realice y reciba llamadas a fijos y móviles desde la misma interfaz que ya utiliza a diario.', features: ['Unifica comunicaciones', 'Simplifica la gestión', 'Aprovecha herramienta conocida', 'Movilidad total'], ideal: 'Empresas que han adoptado Microsoft Teams como su principal herramienta de colaboración.' },
        { id: 'movil', name: 'Telefonía Móvil', imageUrl: '/placeholder.jpg', need: '¿Necesita planes móviles para empresa flexibles y con servicios de valor?', solution: 'Ofrecemos una completa gama de tarifas móviles con cobertura 5G y servicios de valor añadido pensados para el profesional.', features: ['Cobertura 5G', 'Hasta 250GB de datos', 'Roaming en Europa', 'MultiSIM, eSIM, IP Fija'], ideal: 'Equipos que necesitan conectividad móvil fiable y flexible para su trabajo diario.' }
      ]
    },
    cloud: {
      title: "Cloud y Data Center: Su Infraestructura, a su Manera",
      description: "Potencia, flexibilidad y seguridad para alojar sus aplicaciones y datos. Le ofrecemos desde máquinas virtuales hasta el alojamiento físico de sus servidores en Data Centers de última generación.",
      services: [
                { id: 'vm', name: 'Cloud VM', imageUrl: '/placeholder.jpg', need: '¿Necesita servidores pero quiere evitar la inversión y mantenimiento de hardware?', solution: 'Despliegue servidores virtuales en la nube en minutos. Pague solo por los recursos que utiliza y olvídese de la gestión del hardware físico.', features: ['Alta disponibilidad', 'Backups automáticos', 'Configuración a medida', 'Facturación por consumo real'], ideal: 'Aplicaciones de negocio, servidores web, bases de datos y e...' },
        { id: 'colocation', name: 'Alojamiento y Colocation', imageUrl: '/placeholder.jpg', need: '¿Tiene servidores propios y necesita un entorno profesional que garantice su funcionamiento 24/7?', solution: 'Aloje sus equipos en nuestros Data Centers con la máxima seguridad física, ambiental y conectividad redundante.', features: ['Múltiples ubicaciones', 'Sistemas N+1', 'Seguridad 24/7', 'Neutralidad de operadores'], ideal: 'Empresas que prefieren mantener su propio hardware en un entorno profesional y seguro.' },
        { id: 'privado', name: 'Cloud Privado e Híbrido', imageUrl: '/placeholder.jpg', need: '¿Requiere un entorno cloud exclusivo o combinar lo mejor de nubes públicas y privadas?', solution: 'Diseñamos soluciones de nube a medida para entornos de misión crítica, combinando la seguridad de un entorno privado con la flexibilidad de la nube pública.', features: ['Infraestructura dedicada', 'Alto rendimiento', 'Integración con nube pública', 'Máxima flexibilidad'], ideal: 'Cargas de trabajo con requisitos específ...' },
        { id: 'colocation', name: 'Alojamiento y Colocation', imageUrl: '/placeholder.jpg', need: '¿Tiene servidores propios y necesita un entorno profesional que garantice su funcionamiento 24/7?', solution: 'Aloje sus equipos en nuestros Data Centers con la máxima seguridad física, ambiental y conectividad redundante.', features: ['Múltiples ubicaciones', 'Sistemas N+1', 'Seguridad 24/7', 'Neutralidad de operadores'], ideal: 'Empresas que prefieren mantener su propio hardware en un entorno profesional y seguro.' },
        { id: 'privado', name: 'Cloud Privado e Híbrido', imageUrl: '/placeholder.jpg', need: '¿Requiere un entorno cloud exclusivo o combinar lo mejor de nubes públicas y privadas?', solution: 'Diseñamos soluciones de nube a medida para entornos de misión crítica, combinando la seguridad de un entorno privado con la flexibilidad de la nube pública.', features: ['Infraestructura dedicada', 'Alto rendimiento', 'Integración con nube pública', 'Máxima flexibilidad'], ideal: 'Cargas de trabajo con requisitos específicos de rendimiento, seguridad o cumplimiento normativo.' }
      ]
    },
    seguridad: {
      title: "Seguridad Gestionada: Protección Integral para su Tranquilidad",
      description: "Proteja sus activos más valiosos con nuestras soluciones de seguridad gestionada. Desde la defensa perimetral hasta la monitorización 24/7, nos encargamos de su ciberseguridad para que usted no tenga que hacerlo.",
      services: [
        { id: 'firewall', name: 'Cloud Firewall Gestionado', imageUrl: '/abstract-cybersecurity-concept-design-1.jpg', need: '¿Está su empresa realmente protegida contra ciberataques y pérdida de datos?', solution: 'Implementamos su primera línea de defensa. Una solución de seguridad perimetral en la nube basada en tecnología Fortinet, gestionada por expertos.', features: ['Firewall de última generación', 'Antivirus de red e IPS', 'Filtrado web y de aplicaciones', 'Acceso remoto seguro (VPN)'], ideal: 'Toda empresa que desee proteger su red de amenazas externas de forma proactiva.' },
        { id: 'backup', name: 'Backup y SOC', imageUrl: '/protected-page.jpg', need: '¿Su negocio sobreviviría a un ciberataque o a una pérdida total de datos?', solution: 'Garantizamos la continuidad de su negocio con copias de seguridad automatizadas y un Centro de Operaciones de Seguridad (SOC) que monitoriza y responde a amenazas 24/7.', features: ['Backup como Servicio (BaaS)', 'Monitorización de amenazas 24/7', 'Análisis y respuesta a incidentes', 'Recuperación ante desastres'], ideal: 'Empresas que consideran sus datos un activo crítico y buscan la máxima protección y resiliencia.' }
      ]
    }
  };

  // Estado para gestionar los servicios activos
  const [activeServices, setActiveServices] = useState<Record<string, string>>({
    conectividad: 'ftto',
    comunicaciones: 'centralita',
    cloud: 'vm',
    seguridad: 'firewall'
  });

  // Función para cambiar el servicio activo
  const handleServiceChange = (category: string, serviceId: string) => {
    setActiveServices(prev => ({
      ...prev,
      [category]: serviceId
    }));
  };

  // Función para obtener el servicio activo por categoría
  const getActiveService = (category: string) => {
    const serviceId = activeServices[category];
    return servicesData[category as keyof typeof servicesData].services.find(s => s.id === serviceId);
  };

  // Cargar FAQs y Hero desde la API
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        
        // Cargar FAQs
        const faqResponse = await fetch('/api/admin/faq-items?page=empresa');
        if (faqResponse.ok) {
          const faqData = await faqResponse.json();
          setFaqs(faqData.filter((faq: any) => faq.isActive));
        }

        // Cargar configuración del hero
        const heroRes = await fetch('/api/admin/hero-config?page=empresa');
        if (heroRes.ok) {
          const data = await heroRes.json();
          const activeHero = Array.isArray(data)
            ? data.find((c: any) => c.isActive)
            : (data.isActive ? data : null);
          
          if (activeHero) {
            const parsedConfig = {
              ...activeHero,
              highlights: activeHero.highlights ? (
                typeof activeHero.highlights === 'string' 
                  ? JSON.parse(activeHero.highlights)
                  : activeHero.highlights
              ) : [],
              primaryCta: typeof activeHero.primaryCta === 'string' 
                ? JSON.parse(activeHero.primaryCta) 
                : activeHero.primaryCta,
              secondaryCta: typeof activeHero.secondaryCta === 'string' 
                ? JSON.parse(activeHero.secondaryCta) 
                : activeHero.secondaryCta,
            };
            setHeroConfig(parsedConfig);
          }
        }

        setLoading(false);
      } catch (err) {
        console.error('Error loading data:', err);
        setError('Error al cargar los datos');
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (error) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="text-center text-red-600">
          <p>Error al cargar la página: {error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen">
      {/* Hero Section sin contenedor para que ocupe todo el ancho */}
      {heroConfig ? (
        <HeroProfesional {...heroConfig} />
      ) : (
        <div className="h-96 bg-gradient-to-r from-green-900 to-green-600 flex items-center justify-center">
          <p className="text-white text-xl">Cargando hero...</p>
        </div>
      )}
      
      {/* Contenido con el contenedor para el resto de secciones */}
      <div className="container mx-auto px-6">
        <div className="text-center mt-8">
          <a 
            href="#cta-final" 
            className="cta-button inline-block bg-green-600 text-white font-bold px-8 py-4 rounded-lg text-lg shadow-lg transition-all duration-200 hover:translate-y-[-2px] hover:shadow-lg"
          >
            Descubra cómo podemos ayudarle
          </a>
        </div>

        {/* Por qué confiar en Prisma */}
        <section id="porque-prisma" className="py-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-3">¿Por Qué Confiar en Prisma?</h2>
            <p className="text-stone-600 max-w-3xl mx-auto">
              Entendemos los desafíos de los empresarios. Por eso, hemos construido nuestro servicio sobre tres pilares fundamentales:
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto mb-16">
            <div className="bg-white p-8 rounded-xl shadow-lg border border-stone-200/50 text-center">
              <h3 className="font-bold text-xl mb-3">✓ Un Único Interlocutor</h3>
              <p className="text-stone-600">
                Olvídese de gestionar múltiples proveedores. Centralizamos toda su tecnología para darle una solución única y coherente, ahorrándole tiempo y problemas.
              </p>
            </div>
            <div className="bg-white p-8 rounded-xl shadow-lg border border-stone-200/50 text-center">
              <h3 className="font-bold text-xl mb-3">✓ Soluciones de Élite</h3>
              <p className="text-stone-600">
                No experimentamos con su negocio. Integramos solo las mejores soluciones del mercado, probadas y respaldadas por los líderes de la industria.
              </p>
            </div>
            <div className="bg-white p-8 rounded-xl shadow-lg border border-stone-200/50 text-center">
              <h3 className="font-bold text-xl mb-3">✓ Asesoramiento Estratégico</h3>
              <p className="text-stone-600">
                No somos simples vendedores. Somos sus asesores. Entendemos sus objetivos y le guiamos para implementar la tecnología que realmente impulsará su crecimiento.
              </p>
            </div>
          </div>
          <div className="text-center">
            <h4 className="text-lg font-semibold text-stone-500 mb-6">Nuestros Partners Tecnológicos de Confianza</h4>
            <div className="flex flex-wrap justify-center items-center gap-x-12 gap-y-4 grayscale opacity-70">
              <Image src="/logo-3cx.png" alt="3CX" width={100} height={40} />
              <Image src="/logo-cisco.png" alt="Cisco" width={100} height={40} />
              <Image src="/logo-fortinet.png" alt="Fortinet" width={100} height={40} />
              <Image src="/logo-starlink.png" alt="Starlink" width={100} height={40} />
              <Image src="/logo-microsoft.png" alt="Microsoft" width={100} height={40} />
            </div>
          </div>
        </section>

        {/* Secciones de Servicios */}
        {Object.entries(servicesData).map(([categoryKey, categoryData]) => (
          <section 
            id={categoryKey} 
            key={categoryKey} 
            className="pt-20 -mt-20 mb-20 scroll-mt-24"
          >
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-3">{categoryData.title}</h2>
              <p className="text-stone-600 max-w-2xl mx-auto">{categoryData.description}</p>
            </div>
            
            <div className="flex flex-wrap justify-center gap-2 mb-8 border-b border-stone-200 pb-4">
              {categoryData.services.map((service) => {
                const isActive = activeServices[categoryKey] === service.id;
                return (
                  <ServiceButton
                    key={service.id}
                    isActive={isActive}
                    category={categoryKey}
                    serviceId={service.id}
                    name={service.name}
                    onClick={handleServiceChange}
                  />
                );
              })}
            </div>
            
            <div className="bg-white p-8 rounded-2xl shadow-lg border border-stone-200/60 min-h-[400px]">
              <ServiceContent service={getActiveService(categoryKey)} ctaId="cta-final" />
            </div>
            
            {categoryKey === 'comunicaciones' && (
              <ComparationChart />
            )}
          </section>
        ))}

        {/* Testimonios */}
        <section id="testimonios" className="py-20 bg-white -mx-6 px-6 rounded-2xl shadow-inner border">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-3">Empresas que ya Confían en Nosotros</h2>
            <p className="text-stone-600 max-w-2xl mx-auto">La tranquilidad de nuestros clientes es nuestro mayor logro.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            <div className="bg-stone-50 p-8 rounded-xl border border-stone-200">
              <p className="text-stone-600 italic mb-4">"Desde que trabajamos con Prisma, nuestra infraestructura de comunicaciones es más robusta que nunca. El cambio a la centralita virtual fue transparente y el soporte es excepcional."</p>
              <p className="font-bold text-right">- CEO, Empresa de Logística</p>
            </div>
            <div className="bg-stone-50 p-8 rounded-xl border border-stone-200">
              <p className="text-stone-600 italic mb-4">"La seguridad de nuestra red era una preocupación constante. El equipo de Prisma implementó un firewall gestionado y ahora tenemos la tranquilidad que necesitábamos para crecer."</p>
              <p className="font-bold text-right">- Director de IT, Consultora Financiera</p>
            </div>
          </div>
        </section>

        {/* FAQ Section - Manteniendo compatibilidad con el sistema existente */}
        {faqs.length > 0 && (
          <section id="preguntas-frecuentes" className="py-16 bg-white -mx-6 px-6 my-10 rounded-2xl shadow-lg border border-stone-100">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Preguntas Frecuentes
              </h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                Resolvemos todas sus dudas sobre nuestros servicios empresariales.
              </p>
            </div>
            <div className="max-w-4xl mx-auto">
              <FAQAccordionSafe items={faqs} />
            </div>
          </section>
        )}

        {/* CTA Final */}
        <section id="cta-final" className="bg-green-600 text-white text-center py-20 my-20 rounded-2xl shadow-2xl -mx-6 px-6 scroll-mt-24">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Dé el Siguiente Paso Hacia su Tranquilidad Tecnológica</h2>
          <p className="max-w-2xl mx-auto mb-8 text-green-100">
            Permítanos analizar su situación actual y proponerle un plan de mejora sin compromiso. Descubra los puntos débiles de su infraestructura y cómo podemos fortalecerlos.
          </p>
          <a 
            href="mailto:contacto@prisma.com?subject=Solicitud de Auditoría Gratuita" 
            className="cta-button inline-block bg-white text-green-700 font-bold px-10 py-4 rounded-lg text-lg shadow-lg transition-all duration-200 hover:translate-y-[-2px] hover:shadow-lg"
          >
            Agendar una Auditoría Gratuita
          </a>
        </section>
      </div>
    </div>
  );
}
