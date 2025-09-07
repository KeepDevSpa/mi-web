// app/api/admin/content/route.ts
import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    const content = await prisma.pageContent.findUnique({
      where: { id: 'default' }
    })
    return NextResponse.json(content || getDefaultContent())
  } catch (error) {
    console.error('Error fetching content:', error)
    return NextResponse.json(getDefaultContent(), { status: 500 })
  }
}

function getDefaultContent() {
  return {
    id: 'default',
    servicesTitle: "Descubre nuestros servicios incluidos en Fibra",
    services: [
      {
        title: "Servicio Pausa",
        description: "Suspende tu línea fija cuando no la necesites, sin pagar por ella hasta que la vuelvas a usar.",
        icon: "clock",
        gradient: "teal"
      },
      {
        title: "Tarifas Fijo",
        description: "Disfruta de tarifas competitivas para llamadas desde tu línea fija, con opciones que se adaptan a tus necesidades.",
        icon: "wifi",
        gradient: "green"
      }
    ],
    installationTitle: "Tu Fibra y móvil más rápida en menos de 1 semana",
    installationSubtitle: "Es la media de nuestras últimas 1.071 instalaciones",
    installationSteps: [
      { day: "Día 1", title: "¡Bienvenido!", description: "Contratas el servicio y recibes un correo de bienvenida con tu contrato." },
      { day: "Día 2-3", title: "Te contactamos", description: "Te contactamos para coordinar la instalación." },
      { day: "Día 4-5", title: "Instalación", description: "Nuestro técnico instala la fibra en tu casa en menos de 2 horas." },
      { day: "Día 5-6", title: "¡Listo!", description: "Disfruta de una conexión ultrarrápida." },
      { day: "Día 6-7", title: "Portabilidad", description: "Gestionamos la portabilidad de tu número si lo necesitas." },
      { day: "Día 8", title: "¡Listo!", description: "Habla y navega con Prisma desde el primer día." }
    ],
    faqTitle: "Preguntas frecuentes",
    faqCategories: [
      {
        title: "Fibra",
        questions: [
          { q: "¿Tiene cobertura de fibra en mi zona?", a: "Sí. Llevamos fibra a zonas donde otras no llegan." },
          { q: "¿Tiene fibra simétrica y sin límite de datos?", a: "Sí. Ofrecemos fibra simétrica de hasta 1 Gbps y datos ilimitados." }
        ]
      },
      {
        title: "Móvil",
        questions: [
          { q: "¿Tiene cobertura 5G?", a: "Sí. Nuestra red 5G cubre más del 95% del territorio." },
          { q: "¿Puedo tener solo datos?", a: "Sí. Ofrecemos planes solo datos desde 5€." }
        ]
      },
      {
        title: "Sostenibilidad",
        questions: [
          { q: "¿Es sostenible? ¿O es un servicio temporal hasta que “me vaya de aquí”?", a: "No. No es un servicio temporal. Es un compromiso real. Llevamos conectividad a zonas rurales para fijar población, crear oportunidades y eliminar la brecha digital." }
        ]
      },
      {
        title: "Servicios de TV",
        questions: [
          { q: "¿Puedo tener solo los canales que quiero, sin paquetes forzados?", a: "Sí. Personalizas tu TV. Puedes elegir TDT, deportes, cine o infantil. Sin packs innecesarios. Solo lo que ves." },
          { q: "¿Incluyen TDT? ¿Y si falla, me lo dan por internet?", a: "Sí. Si la señal no llega, te lo damos por internet." },
          { q: "¿Puedo tener canales de naturaleza y sostenibilidad?", a: "Sí. Puedes elegir paquetes que incluyan contenido de naturaleza, sostenibilidad o impacto social. Tu TV también puede tener propósito." },
          { q: "¿Puedo compartir la conexión con mi familia sin que se peleen por el mando?", a: "Sí. Cada miembro puede tener su perfil. Sin mando. Sin discusiones. Solo conexión." },
          { q: "¿Es parte de un servicio más amplio (fibra + móvil + TV) sin que me atrapen?", a: "Sí. Puedes combinar servicios, pero sin permanencia. Tú eliges. Tú controlas. Tú decides." }
        ]
      },
      {
        title: "Energía",
        questions: [
          { q: "¿Puedo ahorrar con ustedes? ¿Cuánto?", a: "Sí. Puedes ahorrar hasta un 20% en tu factura energética." },
          { q: "¿Usan energías renovables?", a: "Sí. Nuestra energía proviene al 100% de fuentes renovables." }
        ]
      }
    ],
    createdAt: new Date(),
    updatedAt: new Date()
  }
}