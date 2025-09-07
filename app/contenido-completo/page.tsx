'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

// Interfaces para todos los tipos de contenido
interface InformationCard {
  id: string;
  page: string;
  section: string;
  icon?: string;
  title: string;
  description: string;
  content?: string;
  imageUrl?: string;
  linkUrl?: string;
  backgroundColor?: string;
  textColor?: string;
  order: number;
  isActive: boolean;
}

interface FAQItem {
  id: string;
  page: string;
  question: string;
  answer: string;
  order: number;
  isActive: boolean;
}

interface ContentBlock {
  id: string;
  type: string;
  title?: string;
  content?: string;
  imageUrl?: string;
  ctaText?: string;
  ctaUrl?: string;
  order: number;
  isActive: boolean;
}

interface PageData {
  id: string;
  slug: string;
  title: string;
  description?: string;
  metaTitle?: string;
  metaDescription?: string;
  isPublished: boolean;
  contentBlocks: ContentBlock[];
}

interface Speed {
  id: string;
  label: string;
  price: number;
  originalPrice?: number;
}

interface Extra {
  id: string;
  label: string;
  price: number;
  description?: string;
}

interface PricingCard {
  id: string;
  name: string;
  page: string;
  currentPrice: number;
  originalPrice?: number;
  variant: string;
  hasSpeedSelector: boolean;
  features: string;
  isPopular: boolean;
  ctaText: string;
  rateTier: number;
  isActive: boolean;
  isHeroOffer: boolean;
  speeds: Speed[];
  extras: Extra[];
}

const variantStyles = {
  dark: 'bg-gray-900 text-white border-gray-700',
  medium: 'bg-blue-50 border-blue-200',
  golden: 'bg-gradient-to-br from-yellow-50 to-amber-50 border-yellow-300',
  blue: 'bg-blue-600 text-white border-blue-700',
  light: 'bg-gray-50 border-gray-200',
  lightgreen: 'bg-green-50 border-green-200',
  lightblue: 'bg-cyan-50 border-cyan-200',
  purple: 'bg-purple-600 text-white border-purple-700',
  green: 'bg-green-600 text-white border-green-700',
  premium: 'bg-gradient-to-br from-purple-900 to-indigo-900 text-white border-purple-500'
};

export default function ContentShowcasePage() {
  const [informationCards, setInformationCards] = useState<InformationCard[]>([]);
  const [faqs, setFaqs] = useState<FAQItem[]>([]);
  const [pages, setPages] = useState<PageData[]>([]);
  const [pricingCards, setPricingCards] = useState<PricingCard[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedPage, setSelectedPage] = useState('all');

  useEffect(() => {
    const fetchContent = async () => {
      try {
        const [infoResponse, faqResponse, pagesResponse, pricingResponse] = await Promise.all([
          fetch('/api/admin/information-cards'),
          fetch('/api/admin/faq-items'),
          fetch('/api/admin/pages'),
          fetch('/api/admin/pricing-cards')
        ]);

        if (infoResponse.ok) {
          const infoData = await infoResponse.json();
          setInformationCards(infoData);
        }

        if (faqResponse.ok) {
          const faqData = await faqResponse.json();
          setFaqs(faqData);
        }

        if (pagesResponse.ok) {
          const pagesData = await pagesResponse.json();
          setPages(pagesData);
        }

        if (pricingResponse.ok) {
          const pricingData = await pricingResponse.json();
          setPricingCards(pricingData);
        }

      } catch (error) {
        console.error('Error fetching content:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchContent();
  }, []);

  if (loading) {
    return <div className="container mx-auto px-4 py-8">Cargando ejemplos de contenido...</div>;
  }

  const uniquePages = ['all', ...Array.from(new Set([
    ...informationCards.map(card => card.page),
    ...faqs.map(faq => faq.page),
    ...pricingCards.map(card => card.page),
    ...pages.map(page => page.slug)
  ]))];

  const filteredCards = selectedPage === 'all' ? informationCards : informationCards.filter(card => card.page === selectedPage);
  const filteredFaqs = selectedPage === 'all' ? faqs : faqs.filter(faq => faq.page === selectedPage);
  const filteredPricing = selectedPage === 'all' ? pricingCards : pricingCards.filter(card => card.page === selectedPage);
  const filteredPages = selectedPage === 'all' ? pages : pages.filter(page => page.slug === selectedPage);

  const parseFeatures = (featuresString: string): string[] => {
    try {
      return JSON.parse(featuresString);
    } catch {
      return featuresString.split(',').map(f => f.trim());
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">
          Showcase Completo de Contenido
        </h1>
        <p className="text-xl text-gray-600 mb-6">
          Visualización de todos los tipos de contenido disponibles en el sistema de administración
        </p>
        
        {/* Filtro por página */}
        <Select value={selectedPage} onValueChange={setSelectedPage}>
          <SelectTrigger className="w-64">
            <SelectValue placeholder="Filtrar por página" />
          </SelectTrigger>
          <SelectContent>
            {uniquePages.map(page => (
              <SelectItem key={page} value={page}>
                {page === 'all' ? 'Todas las páginas' : page}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardContent className="p-6">
            <div className="text-2xl font-bold text-blue-600">{filteredCards.length}</div>
            <div className="text-sm text-gray-600">Information Cards</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="text-2xl font-bold text-green-600">{filteredFaqs.length}</div>
            <div className="text-sm text-gray-600">FAQ Items</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="text-2xl font-bold text-purple-600">{filteredPricing.length}</div>
            <div className="text-sm text-gray-600">Pricing Cards</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="text-2xl font-bold text-orange-600">{filteredPages.reduce((acc, page) => acc + page.contentBlocks.length, 0)}</div>
            <div className="text-sm text-gray-600">Content Blocks</div>
          </CardContent>
        </Card>
      </div>

      {/* Contenido en pestañas */}
      <Tabs defaultValue="pricing" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="pricing">Pricing Cards ({filteredPricing.length})</TabsTrigger>
          <TabsTrigger value="information">Information Cards ({filteredCards.length})</TabsTrigger>
          <TabsTrigger value="faqs">FAQs ({filteredFaqs.length})</TabsTrigger>
          <TabsTrigger value="pages">Pages ({filteredPages.length})</TabsTrigger>
        </TabsList>

        {/* PricingCards */}
        <TabsContent value="pricing" className="space-y-6">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">Pricing Cards - Todas las Variantes</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPricing.map((card) => (
              <Card key={card.id} className={`relative ${variantStyles[card.variant as keyof typeof variantStyles] || ''}`}>
                {card.isPopular && (
                  <div className="absolute -top-3 left-4 px-3 py-1 bg-orange-500 text-white text-sm font-semibold rounded-full">
                    Popular
                  </div>
                )}
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span>{card.name}</span>
                    <Badge variant={card.variant === 'dark' || card.variant === 'blue' || card.variant === 'purple' || card.variant === 'green' || card.variant === 'premium' ? 'secondary' : 'default'}>
                      Tier {card.rateTier}
                    </Badge>
                  </CardTitle>
                  <div className="space-y-2">
                    <div className="flex items-baseline gap-2">
                      <span className="text-3xl font-bold">€{card.currentPrice}</span>
                      {card.originalPrice && (
                        <span className="text-lg line-through text-gray-500">€{card.originalPrice}</span>
                      )}
                    </div>
                    <Badge variant="outline" className="w-fit">
                      Variante: {card.variant}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {/* Features */}
                    <div>
                      <h4 className="font-semibold mb-2">Características:</h4>
                      <ul className="space-y-1">
                        {parseFeatures(card.features).map((feature, index) => (
                          <li key={index} className="text-sm flex items-center">
                            <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Speeds */}
                    {card.hasSpeedSelector && card.speeds.length > 0 && (
                      <div>
                        <h4 className="font-semibold mb-2">Velocidades disponibles:</h4>
                        <div className="space-y-1">
                          {card.speeds.map((speed) => (
                            <div key={speed.id} className="text-sm flex justify-between items-center p-2 bg-black/5 rounded">
                              <span>{speed.label}</span>
                              <div>
                                <span className="font-semibold">€{speed.price}</span>
                                {speed.originalPrice && (
                                  <span className="text-xs line-through text-gray-500 ml-1">€{speed.originalPrice}</span>
                                )}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Extras */}
                    {card.extras.length > 0 && (
                      <div>
                        <h4 className="font-semibold mb-2">Extras disponibles:</h4>
                        <div className="space-y-1">
                          {card.extras.map((extra) => (
                            <div key={extra.id} className="text-sm flex justify-between items-center p-2 bg-black/5 rounded">
                              <div>
                                <div className="font-medium">{extra.label}</div>
                                {extra.description && <div className="text-xs text-gray-600">{extra.description}</div>}
                              </div>
                              <span className="font-semibold">+€{extra.price}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    <Button className="w-full mt-4">
                      {card.ctaText}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Information Cards */}
        <TabsContent value="information" className="space-y-6">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">Information Cards</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCards.map((card) => (
              <Card key={card.id} className="h-full" style={{ 
                backgroundColor: card.backgroundColor || undefined,
                color: card.textColor || undefined 
              }}>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    {card.icon && <span className="text-2xl">{card.icon}</span>}
                    <span>{card.title}</span>
                  </CardTitle>
                  <div className="flex gap-2">
                    <Badge variant="secondary">{card.page}</Badge>
                    <Badge variant="outline">{card.section}</Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm mb-4">{card.description}</p>
                  {card.content && (
                    <div className="text-sm text-gray-600 mb-4">
                      <strong>Contenido:</strong> {card.content}
                    </div>
                  )}
                  {card.imageUrl && (
                    <div className="mb-4">
                      <strong>Imagen:</strong> <span className="text-sm text-blue-600">{card.imageUrl}</span>
                    </div>
                  )}
                  {card.linkUrl && (
                    <div>
                      <strong>Link:</strong> <span className="text-sm text-blue-600">{card.linkUrl}</span>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* FAQs */}
        <TabsContent value="faqs" className="space-y-6">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">Preguntas Frecuentes</h2>
          {Object.entries(
            filteredFaqs.reduce((acc, faq) => {
              if (!acc[faq.page]) acc[faq.page] = [];
              acc[faq.page].push(faq);
              return acc;
            }, {} as Record<string, FAQItem[]>)
          ).map(([page, pageFaqs]) => (
            <Card key={page}>
              <CardHeader>
                <CardTitle>FAQs - {page}</CardTitle>
              </CardHeader>
              <CardContent>
                <Accordion type="single" collapsible className="w-full">
                  {pageFaqs.map((faq) => (
                    <AccordionItem key={faq.id} value={faq.id}>
                      <AccordionTrigger className="text-left">
                        {faq.question}
                      </AccordionTrigger>
                      <AccordionContent>
                        <p className="text-gray-700">{faq.answer}</p>
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        {/* Pages */}
        <TabsContent value="pages" className="space-y-6">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">Páginas y Content Blocks</h2>
          {filteredPages.map((page) => (
            <Card key={page.id}>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>{page.title}</span>
                  <Badge variant={page.isPublished ? "default" : "secondary"}>
                    {page.isPublished ? "Publicada" : "Borrador"}
                  </Badge>
                </CardTitle>
                <div className="text-sm text-gray-600">
                  <p><strong>Slug:</strong> {page.slug}</p>
                  {page.description && <p><strong>Descripción:</strong> {page.description}</p>}
                  {page.metaTitle && <p><strong>Meta Title:</strong> {page.metaTitle}</p>}
                </div>
              </CardHeader>
              <CardContent>
                <h4 className="font-semibold mb-3">Content Blocks ({page.contentBlocks.length}):</h4>
                <div className="space-y-3">
                  {page.contentBlocks.map((block) => (
                    <Card key={block.id} className="p-4 bg-gray-50">
                      <div className="flex items-center gap-2 mb-2">
                        <Badge variant="outline">{block.type}</Badge>
                        <span className="text-sm text-gray-500">Orden: {block.order}</span>
                      </div>
                      {block.title && (
                        <h5 className="font-medium mb-2">{block.title}</h5>
                      )}
                      {block.content && (
                        <p className="text-sm text-gray-700 mb-2">{block.content}</p>
                      )}
                      {block.imageUrl && (
                        <p className="text-sm text-blue-600 mb-2">Imagen: {block.imageUrl}</p>
                      )}
                      {block.ctaText && block.ctaUrl && (
                        <div className="flex items-center gap-2 text-sm">
                          <Badge variant="secondary">{block.ctaText}</Badge>
                          <span className="text-blue-600">→ {block.ctaUrl}</span>
                        </div>
                      )}
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>
      </Tabs>
    </div>
  );
}
