'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import Image from 'next/image';

// Interfaces para los tipos de contenido
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

export default function ContentExamplesPage() {
  const [informationCards, setInformationCards] = useState<InformationCard[]>([]);
  const [faqs, setFaqs] = useState<FAQItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeSection, setActiveSection] = useState('all');

  useEffect(() => {
    const fetchContent = async () => {
      try {
        const [infoResponse, faqResponse] = await Promise.all([
          fetch('/api/admin/information-cards'),
          fetch('/api/admin/faq-items')
        ]);

        if (infoResponse.ok) {
          const infoData = await infoResponse.json();
          setInformationCards(infoData);
        }

        if (faqResponse.ok) {
          const faqData = await faqResponse.json();
          setFaqs(faqData);
        }
      } catch (error) {
        console.error('Error fetching content:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchContent();
  }, []);

  // Agrupar InformationCards por página y sección
  const groupedCards = informationCards.reduce((groups, card) => {
    const key = `${card.page}-${card.section}`;
    if (!groups[key]) {
      groups[key] = [];
    }
    groups[key].push(card);
    return groups;
  }, {} as Record<string, InformationCard[]>);

  // Agrupar FAQs por página
  const groupedFAQs = faqs.reduce((groups, faq) => {
    if (!groups[faq.page]) {
      groups[faq.page] = [];
    }
    groups[faq.page].push(faq);
    return groups;
  }, {} as Record<string, FAQItem[]>);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Cargando ejemplos de contenido...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            🎨 Galería de Contenidos
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Ejemplos de todos los tipos de contenido disponibles en el sistema de administración
          </p>
        </div>

        {/* Filtros */}
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {['all', 'home', 'movil', 'fibra', 'fibra-movil'].map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveSection(filter)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                activeSection === filter
                  ? 'bg-green-600 text-white'
                  : 'bg-white text-gray-600 hover:bg-gray-100'
              }`}
            >
              {filter === 'all' ? 'Todo' : filter.charAt(0).toUpperCase() + filter.slice(1)}
            </button>
          ))}
        </div>

        {/* Estadísticas */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-12">
          <Card>
            <CardContent className="p-6 text-center">
              <div className="text-3xl font-bold text-green-600 mb-2">
                {informationCards.length}
              </div>
              <div className="text-sm text-gray-600">Information Cards</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 text-center">
              <div className="text-3xl font-bold text-blue-600 mb-2">
                {faqs.length}
              </div>
              <div className="text-sm text-gray-600">FAQ Items</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 text-center">
              <div className="text-3xl font-bold text-purple-600 mb-2">
                {Object.keys(groupedCards).length}
              </div>
              <div className="text-sm text-gray-600">Secciones</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 text-center">
              <div className="text-3xl font-bold text-orange-600 mb-2">
                {Object.keys(groupedFAQs).length}
              </div>
              <div className="text-sm text-gray-600">Páginas con FAQ</div>
            </CardContent>
          </Card>
        </div>

        {/* Information Cards por sección */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            📋 Information Cards
          </h2>
          
          {Object.entries(groupedCards).map(([key, cards]) => {
            const [page, section] = key.split('-');
            if (activeSection !== 'all' && page !== activeSection) return null;

            return (
              <div key={key} className="mb-12">
                <div className="flex items-center gap-3 mb-6">
                  <Badge variant="outline" className="text-lg px-4 py-2">
                    {page}
                  </Badge>
                  <h3 className="text-2xl font-semibold text-gray-800">
                    Sección: {section}
                  </h3>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {cards
                    .sort((a, b) => a.order - b.order)
                    .map((card) => (
                    <Card 
                      key={card.id}
                      className="overflow-hidden hover:shadow-lg transition-shadow"
                      style={{
                        backgroundColor: card.backgroundColor || '#ffffff',
                        color: card.textColor || '#000000'
                      }}
                    >
                      {card.imageUrl && (
                        <div className="relative h-48 w-full">
                          <Image
                            src={card.imageUrl}
                            alt={card.title}
                            fill
                            className="object-cover"
                          />
                        </div>
                      )}
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          {card.icon && <span className="text-2xl">{card.icon}</span>}
                          {card.title}
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm mb-3 font-medium">{card.description}</p>
                        {card.content && (
                          <p className="text-sm opacity-90">{card.content}</p>
                        )}
                        {card.linkUrl && (
                          <a
                            href={card.linkUrl}
                            className="text-sm font-semibold hover:underline mt-2 inline-block"
                          >
                            Saber más →
                          </a>
                        )}
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            );
          })}
        </section>

        {/* FAQs por página */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            ❓ Preguntas Frecuentes (FAQs)
          </h2>
          
          {Object.entries(groupedFAQs).map(([page, faqList]) => {
            if (activeSection !== 'all' && page !== activeSection) return null;

            return (
              <div key={page} className="mb-8">
                <div className="flex items-center gap-3 mb-6">
                  <Badge variant="outline" className="text-lg px-4 py-2">
                    {page}
                  </Badge>
                  <h3 className="text-2xl font-semibold text-gray-800">
                    FAQs de {page}
                  </h3>
                </div>
                
                <Card>
                  <CardContent className="p-6">
                    <Accordion type="single" collapsible>
                      {faqList
                        .sort((a, b) => a.order - b.order)
                        .map((faq) => (
                        <AccordionItem key={faq.id} value={faq.id}>
                          <AccordionTrigger className="text-left">
                            {faq.question}
                          </AccordionTrigger>
                          <AccordionContent>
                            {faq.answer}
                          </AccordionContent>
                        </AccordionItem>
                      ))}
                    </Accordion>
                  </CardContent>
                </Card>
              </div>
            );
          })}
        </section>

        {/* Información técnica */}
        <section className="bg-white rounded-lg p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            🔧 Information Técnica
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
            <div>
              <h3 className="font-semibold text-gray-800 mb-3">Information Cards</h3>
              <ul className="space-y-1 text-gray-600">
                <li>• Agrupadas por página y sección</li>
                <li>• Soporte para iconos, imágenes y colores personalizados</li>
                <li>• Enlaces opcionales a páginas externas</li>
                <li>• Ordenación configurable</li>
                <li>• Estado activo/inactivo</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-gray-800 mb-3">FAQ Items</h3>
              <ul className="space-y-1 text-gray-600">
                <li>• Agrupadas por página</li>
                <li>• Interfaz accordion desplegable</li>
                <li>• Ordenación configurable</li>
                <li>• Estado activo/inactivo</li>
                <li>• Búsqueda y filtrado automático</li>
              </ul>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
