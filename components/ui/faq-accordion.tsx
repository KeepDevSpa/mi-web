// v5/components/ui/faq-accordion.tsx

'use client';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'; // Asegúrate de que este componente base ya exista

// Definimos la estructura de cada item que recibirá el acordeón
interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

// Definimos las props que espera el componente completo
interface FAQAccordionProps {
  items: FAQItem[];
}

export const FAQAccordion = ({ items }: FAQAccordionProps) => {
  // Si no hay items, no renderizamos nada para evitar un espacio vacío
  if (!items || items.length === 0) {
    return null;
  }

  return (
    <Accordion type="single" collapsible className="w-full">
      {items.map((item) => (
        <AccordionItem value={item.id} key={item.id}>
          <AccordionTrigger className="text-left text-lg font-semibold hover:no-underline">
            {item.question}
          </AccordionTrigger>
          <AccordionContent className="text-base text-zinc-600">
            {/* Usamos un div con 'whitespace-pre-wrap' para respetar los saltos de línea del panel de admin */}
            <div className="whitespace-pre-wrap">{item.answer}</div>
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
};