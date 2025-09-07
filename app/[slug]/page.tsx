// v5/app/[slug]/page.tsx

// ✅ CORRECCIÓN: Importamos los componentes usando llaves {}
import  PricingCard from '@/components/ui/pricing-card';
import { InformationCard } from '@/components/ui/information-card';
import { FAQAccordionSafe } from '@/components/ui/faq-accordion-safe';
import { prisma } from '@/lib/prisma';
import { notFound } from 'next/navigation';

// Esta función obtiene los datos del servidor para la página específica (slug)
async function getPageData(slug: string) {
  // Obtenemos la configuración de la página para sacar el título y la descripción
  const pageConfig = await prisma.page.findUnique({
    where: { slug },
  });

  // Si la página no existe en la base de datos, mostramos un error 404
  if (!pageConfig) {
    notFound();
  }

  // Obtenemos las tarjetas de precios, info y FAQs para ese slug
  const pricingCards = await prisma.pricingCard.findMany({
    where: { page: slug, isActive: true },
    orderBy: { rateTier: 'asc' },
    include: { speeds: true, extras: true },
  });

  const informationCards = await prisma.informationCard.findMany({
    where: { page: slug, isActive: true },
    orderBy: { order: 'asc' },
  });

  const faqs = await prisma.fAQItem.findMany({
    where: { page: slug, isActive: true },
    orderBy: { order: 'asc' },
  });

  return { pageConfig, pricingCards, informationCards, faqs };
}

// Este es el componente de la página que se renderizará
export default async function SlugPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const { pageConfig, pricingCards, informationCards, faqs } = await getPageData(slug);

  return (
    <main className="container mx-auto px-4 py-12 md:py-20">
      <section className="text-center">
        <h1 className="text-4xl font-bold tracking-tight text-zinc-900 sm:text-6xl">
          {pageConfig.title}
        </h1>
        {pageConfig.description && (
          <p className="mt-6 text-lg leading-8 text-zinc-600">
            {pageConfig.description}
          </p>
        )}
      </section>

      <section className="mt-16">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {pricingCards.map((card) => (
            <PricingCard key={card.id} {...card} variant={card.variant as any} />
          ))}
        </div>
      </section>

      {informationCards.length > 0 && (
        <section className="mt-20">
          <div className="mt-10 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {informationCards.map((infoCard) => (
              <InformationCard key={infoCard.id} {...infoCard} />
            ))}
          </div>
        </section>
      )}

      {faqs.length > 0 && (
        <section className="mx-auto mt-20 max-w-4xl">
           <h2 className="text-center text-3xl font-bold text-zinc-900">
            Preguntas Frecuentes
          </h2>
          <div className="mt-10">
            <FAQAccordionSafe items={faqs} />
          </div>
        </section>
      )}
    </main>
  );
}