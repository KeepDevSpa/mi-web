'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Plus, Minus } from 'lucide-react';
import { PriceDisplay } from './price-display';

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

interface PricingCardProps {
  variant?: 
    | 'blue' 
    | 'lightgreen' 
    | 'golden' 
    | 'dark' 
    | 'purple' 
    | 'light' 
    | 'premium'
    | 'vodafone'
    | 'orange'
    | 'movistar';
  planName: string;
  subtitle?: string;
  price: number | null | undefined;
  originalPrice?: number | null;
  hasSpeedSelector?: boolean;
  speeds?: Speed[];
  features: string[];
  extras?: Extra[];
  isPopular?: boolean;
  ctaText?: string;
  ctaLink?: string;
  isModal?: boolean;
  page?: string;
  hasCoverageSelector?: boolean;
  coverages?: any[];
  hasDataSelector?: boolean;
  dataOptions?: any[];
  showHeaderSelectors?: boolean;
}

// Mapeo de variantes a degradados oscuro a claro
const headerGradients: { [key: string]: string } = {
  blue: 'bg-gradient-to-t from-blue-900 to-blue-600',
  lightgreen: 'bg-gradient-to-t from-green-900 to-green-600',
  golden: 'bg-gradient-to-t from-yellow-800 to-yellow-500',
  dark: 'bg-gradient-to-t from-gray-900 to-gray-700',
  purple: 'bg-gradient-to-t from-purple-900 to-purple-600',
  light: 'bg-gradient-to-t from-gray-200 to-white',
  premium: 'bg-gradient-to-t from-[#00aa00] to-[#008800]',
  
  // ✅ Variantes para operadores
  vodafone: 'bg-gradient-to-t from-red-900 to-red-600',   // Rojo Vodafone
  orange: 'bg-gradient-to-t from-orange-900 to-orange-600', // Naranja Orange
  movistar: 'bg-gradient-to-t from-blue-750 to-blue-500',  // Azul Movistar
};

// ✅ Texto blanco para todas las variantes de operadores
const textColors: { [key: string]: string } = {
  vodafone: 'text-white',
  orange: 'text-white',
  movistar: 'text-white',
  blue: 'text-white',
  lightgreen: 'text-white',
  golden: 'text-white',
  dark: 'text-white',
  purple: 'text-white',
  light: 'text-gray-900',
  premium: 'text-white',
};

export default function PricingCard({
  variant = 'blue',
  planName,
  subtitle,
  price,
  originalPrice = null,
  hasSpeedSelector = false,
  speeds = [],
  features = [],
  extras = [],
  isPopular = false,
  ctaText = 'Contratar ahora',
  ctaLink = '/contacto',
  isModal = false,
  page,
}: PricingCardProps) {
  const [selectedSpeed, setSelectedSpeed] = useState(speeds[0]);
  const [isExtrasOpen, setIsExtrasOpen] = useState(false);
  
  // Si hay selector de velocidad, usa el precio de la velocidad seleccionada
  // Si no, usa el precio base proporcionado
  const displayPrice = hasSpeedSelector ? (selectedSpeed?.price || price) : price;
  const displayOriginalPrice = hasSpeedSelector ? selectedSpeed?.originalPrice : originalPrice;

  return (
    <div
      className="border border-gray-200 rounded-lg overflow-hidden transition-all duration-300 bg-white hover:shadow-lg"
      style={{ minHeight: '580px', display: 'flex', flexDirection: 'column' }}
    >
      {/* Cabecera con degradado según operador */}
      <div className={`${headerGradients[variant]} px-6 py-5 font-semibold ${textColors[variant] || 'text-white'}`}>
        <div className="flex justify-between items-center">
          <div>
            <div className="font-bold text-xl">{planName}</div>
            {subtitle && <div className="text-sm opacity-90 mt-1">{subtitle}</div>}
          </div>
          {isPopular && (
            <div
              className="bg-white text-black px-3 py-1 rounded-full text-xs"
              style={{ fontWeight: 400 }}
            >
              Más popular
            </div>
          )}
        </div>
      </div>

      {/* Cuerpo */}
      <div className="p-6 space-y-6 flex-1 flex flex-col">
        {/* Precio */}
        <div className="my-6">
          {displayOriginalPrice && (
            <div className="text-left">
              <span className="text-sm text-gray-400 line-through">
                {displayOriginalPrice}€
              </span>
            </div>
          )}
          <div className="text-center mt-2">
            <PriceDisplay price={displayPrice} size="lg" />
          </div>
        </div>

        {/* Selector de velocidad */}
        {hasSpeedSelector && speeds.length > 1 && (
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">Velocidad</label>
            <select
              value={selectedSpeed?.id}
              onChange={(e) => setSelectedSpeed(speeds.find(s => s.id === e.target.value)!)}
              className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              {speeds.map((speed) => (
                <option key={speed.id} value={speed.id}>
                  {speed.label} - <PriceDisplay price={speed.price} size="sm" showCurrency={false} />€/mes
                </option>
              ))}
            </select>
          </div>
        )}

        {/* Características */}
        <ul className="space-y-2 flex-1">
          {features.map((feature, i) => (
            <li key={i} className="flex items-center gap-2 text-sm text-gray-700">
              <div className="w-2 h-2 rounded-full bg-green-500"></div>
              {feature}
            </li>
          ))}
        </ul>

        {/* Extras */}
        {extras.length > 0 && (
          <div className="border-t pt-4">
            <button
              onClick={() => setIsExtrasOpen(!isExtrasOpen)}
              className="flex items-center gap-2 text-sm font-medium text-gray-700 hover:text-gray-900 w-full text-left"
            >
              {isExtrasOpen ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
              Añade extras ({extras.length})
            </button>
            {isExtrasOpen && (
              <div className="mt-3 space-y-2 pl-6">
                {extras.map((extra) => (
                  <div key={extra.id} className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      id={`extra-${extra.id}`}
                      onChange={(e) => {
                        const isChecked = e.target.checked;
                        // TODO: Implementar lógica de selección
                      }}
                      className="w-4 h-4 rounded border-gray-300 flex-shrink-0"
                    />
                    <label htmlFor={`extra-${extra.id}`} className="flex-1 text-sm">
                      {extra.label}
                    </label>
                    <div className="flex items-baseline text-gray-900">
                      <span className="text-sm mr-1">+</span>
                      <PriceDisplay 
                        price={extra.price} 
                        size="sm" 
                        showCurrency={true} 
                        className="text-gray-900" 
                      />
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      {/* CTA */}
      <div className="p-6 pt-0">
        <Button
          onClick={() => (window as any).showContactModal?.(planName, displayPrice, ctaLink)}
          className="w-full bg-black text-white hover:bg-gray-800 font-medium py-6"
        >
          {ctaText}
        </Button>
      </div>
    </div>
  );
}
