'use client';

// Componente temporal de respaldo para evitar errores
interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

interface FAQAccordionProps {
  items: FAQItem[];
}

export const FAQAccordionSafe = ({ items }: FAQAccordionProps) => {
  // Si no hay items, no renderizamos nada
  if (!items || items.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-500">No hay preguntas frecuentes disponibles en este momento.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {items.map((item, index) => (
        <details key={item.id || index} className="border border-gray-200 rounded-lg">
          <summary className="cursor-pointer p-4 font-semibold hover:bg-gray-50">
            {item.question}
          </summary>
          <div className="p-4 pt-0 text-gray-600 border-t border-gray-100">
            <div className="whitespace-pre-wrap">{item.answer}</div>
          </div>
        </details>
      ))}
    </div>
  );
};
