'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { IconMap, CORPORATE_COLOR_CLASSES, getThemedIcon } from '@/lib/icon-config';
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
  hasOperatorChoice?: boolean;
  operator?: string | null;
  isVIP?: boolean;
  isPremium?: boolean;
  hasCoverageSelector?: boolean;
  coverages?: any[];
  hasDataSelector?: boolean;
  dataOptions?: any[];
}

const headerGradients = {
  blue: 'bg-gradient-to-r from-[#0a3b7a] via-[#0d6efd] to-[#60a5fa]',
  lightgreen: 'bg-gradient-to-r from-[#065f46] via-[#10b981] to-[#6ee7b7]',
  golden: 'bg-gradient-to-r from-[#603512] via-[#c89629] to-[#e5d48d]',
  dark: 'bg-gradient-to-r from-[#111827] via-[#374151] to-[#6b7280]',
  purple: 'bg-gradient-to-r from-[#4c1d95] via-[#8b5cf6] to-[#c4b5fd]',
  light: 'bg-gradient-to-r from-[#e5e7eb] via-[#f3f4f6] to-[#f9fafb]',
  premium: 'bg-gradient-to-r from-[#312e81] via-[#4338ca] to-[#6366f1]',
  vodafone: 'bg-gradient-to-r from-[#7f1d1d] via-[#b91c1c] to-[#ef4444]',
  orange: 'bg-gradient-to-r from-[#7c2d12] via-[#c2410c] to-[#fb923c]',
  movistar: 'bg-gradient-to-r from-[#1e3a8a] via-[#1d4ed8] to-[#60a5fa]',
};

const textColors: Record<string, string> = {
  light: 'text-gray-800',
  default: 'text-white',
  blue: 'text-white',
  lightgreen: 'text-white',
  golden: 'text-white',
  dark: 'text-white',
  purple: 'text-white',
  premium: 'text-white',
  vodafone: 'text-white',
  orange: 'text-white',
  movistar: 'text-white',
};

const speedLabelColors: Record<string, string> = {
  default: 'bg-indigo-600 text-white',
  movistar: 'bg-blue-600 text-white',
  orange: 'bg-orange-600 text-white',
  vodafone: 'bg-red-600 text-white',
  vip: 'bg-purple-600 text-white',
};

const operatorLabels = {
  default: null,
  vodafone: (
    <div className="flex items-center mt-2">
      <div className="h-5 w-5 rounded-full bg-red-600 mr-2"></div>
      <div className="text-xl font-bold">Vodafone</div>
    </div>
  ),
  orange: (
    <div className="flex items-center mt-2">
      <div className="h-5 w-5 rounded-full bg-orange-600 mr-2"></div>
      <div className="text-xl font-bold">Orange</div>
    </div>
  ),
  movistar: (
    <div className="flex items-center mt-2">
      <div className="h-5 w-5 rounded-full bg-blue-700 mr-2"></div>
      <div className="text-xl font-bold">Movistar</div>
    </div>
  ),
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
  hasOperatorChoice = false,
  operator = null,
  isVIP = false,
  isPremium = false,
  hasCoverageSelector = false,
  coverages = [],
}: PricingCardProps) {
  const [selectedSpeed, setSelectedSpeed] = useState(speeds[0]);
  const [isExtrasOpen, setIsExtrasOpen] = useState(false);
  const [selectedExtras, setSelectedExtras] = useState<Set<string>>(new Set());
  // Simplificamos la gestión de operadores
  const [selectedOperator, setSelectedOperator] = useState<'movistar' | 'orange' | 'vodafone' | null>(operator as 'movistar' | 'orange' | 'vodafone' | null);
  
  // Si hay selector de velocidad, usa el precio de la velocidad seleccionada
  // Si no, usa el precio base proporcionado
  const basePrice = hasSpeedSelector ? (selectedSpeed?.price || price || 0) : (price || 0);
  const displayOriginalPrice = hasSpeedSelector ? selectedSpeed?.originalPrice : originalPrice;
  
  // Calcular el precio total sumando los extras seleccionados
  const displayPrice = basePrice + extras
    .filter(extra => selectedExtras.has(extra.id))
    .reduce((sum, extra) => sum + extra.price, 0);
  
  // Asegurar que selectedOperator solo puede ser uno de los valores permitidos en el tipo
  type OperatorType = 'movistar' | 'orange' | 'vodafone' | null;
  
  const validOperator = (
    selectedOperator === 'movistar' || 
    selectedOperator === 'orange' || 
    selectedOperator === 'vodafone'
  ) ? selectedOperator as OperatorType : null;
  
  // Determinar la variante a mostrar según el operador seleccionado
  const activeVariant = validOperator || variant;

  return (
    <div className="flex flex-col space-y-4">
      <div
        className="border border-gray-200 rounded-lg overflow-hidden transition-all duration-300 bg-white hover:shadow-sm"
        style={{ display: 'flex', flexDirection: 'column' }}
      >
        {/* Cabecera con degradado según operador */}
        <div 
          className={`${headerGradients[activeVariant as keyof typeof headerGradients] || headerGradients.blue} px-5 py-4 ${textColors[activeVariant] || 'text-white'} relative`} 
          style={{ 
            minHeight: '88px',
            background: headerGradients[activeVariant as keyof typeof headerGradients]?.includes('bg-gradient') 
              ? '' 
              : 'linear-gradient(to right, #0a3b7a, #0d6efd, #60a5fa)' // Fallback gradient si no se encuentra
          }}
        >
          <div className="flex flex-col pr-20">
            <div className="font-bold text-xl leading-tight">{planName || 'Tarifa Ejemplo'}</div>
            {subtitle && <div className="text-sm opacity-90 mt-1">{subtitle}</div>}
          </div>
        </div>
        
        {/* Etiquetas justo debajo de la cabecera, en la parte derecha */}
        <div className="relative h-0">
          {isPopular && (
            <div
              className="bg-white text-black px-3 py-1 rounded-full text-xs absolute right-4 shadow-sm border border-gray-200"
              style={{ fontWeight: 500, top: '-10px' }}
            >
              Más popular
            </div>
          )}
          {!isPopular && isPremium && (
            <div
              className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-3 py-1 rounded-full text-xs absolute right-4 shadow-sm"
              style={{ fontWeight: 500, top: '-10px' }}
            >
              Premium
            </div>
          )}
          {!isPopular && isVIP && !isPremium && (
            <div
              className="bg-gradient-to-r from-amber-500 to-yellow-400 text-black px-3 py-1 rounded-full text-xs absolute right-4 shadow-sm"
              style={{ fontWeight: 500, top: '-10px' }}
            >
              VIP
            </div>
          )}
        </div>

        {/* Cuerpo */}
        <div className="p-5 space-y-4 flex-1 flex flex-col">
          {/* Precio */}
          <div className="mt-4 mb-5" style={{ height: '85px' }}>
            {displayOriginalPrice && (
              <div className="text-left ml-2">
                <span className="text-xs text-gray-400 line-through">
                  antes {displayOriginalPrice}€
                </span>
              </div>
            )}
            <div className="text-left mt-1 ml-2">
              <div className="relative" style={{display: 'inline-block'}}>
                <span className="text-6xl font-black text-gray-900 leading-none tracking-tight">{Math.floor(displayPrice)}</span>
                <div className="absolute" style={{top: '5px', right: '-55px', textAlign: 'left'}}>
                  <div className="text-xl font-bold text-gray-900">,{((displayPrice % 1) * 100).toFixed(0).padStart(2, '0')}</div>
                  <div className="text-sm text-gray-600 mt-0">€/mes</div>
                </div>
              </div>
            </div>
          </div>

          {/* Selector de velocidad */}
          {hasSpeedSelector && speeds.length > 0 && (
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-800">Velocidad</label>
              <div className="flex flex-wrap gap-2">
                {speeds.map((speed) => {
                  // Determinar el color de etiqueta basado en operador o estado VIP
                  let labelColorClass = speedLabelColors.default;
                  if (selectedOperator && selectedOperator in speedLabelColors) {
                    labelColorClass = speedLabelColors[selectedOperator];
                  } else if (isVIP) {
                    labelColorClass = speedLabelColors.vip;
                  }
                  
                  const isSelected = selectedSpeed?.id === speed.id;
                  
                  return (
                    <button
                      key={speed.id}
                      onClick={() => setSelectedSpeed(speed)}
                      className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${
                        isSelected 
                          ? 'bg-green-500 text-white' 
                          : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                      }`}
                    >
                      {speed.label}
                    </button>
                  );
                })}
              </div>
            </div>
          )}



          {/* Características */}
          <ul className="space-y-3 flex-1 mt-2" style={{ minHeight: '180px' }}>
            {features.map((feature, i) => (
              <li key={i} className="flex items-start gap-2.5 text-sm text-gray-700">
                <div className="w-2 h-2 mt-1.5 rounded-full bg-green-500 flex-shrink-0"></div>
                <span>{feature}</span>
              </li>
            ))}
          </ul>

          {/* Extras */}
          {extras.length > 0 && (
            <div className="pt-4 mt-2 border-t border-gray-100">
              <button
                onClick={() => setIsExtrasOpen(!isExtrasOpen)}
                className="flex items-center gap-2 text-sm font-medium text-gray-700 hover:text-gray-900 w-full text-left"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  {isExtrasOpen ? (
                    <line x1="5" y1="12" x2="19" y2="12"></line>
                  ) : (
                    <>
                      <line x1="12" y1="5" x2="12" y2="19"></line>
                      <line x1="5" y1="12" x2="19" y2="12"></line>
                    </>
                  )}
                </svg>
                <span className="flex-1">Añade extras</span>
                <span className="text-gray-500">({extras.length})</span>
              </button>
              {isExtrasOpen && (
                <div className="mt-3 space-y-2 pl-6 pb-4">
                  {extras.map((extra) => (
                    <div key={extra.id} className="flex items-center gap-3">
                      <input
                        type="checkbox"
                        id={`extra-${extra.id}`}
                        checked={selectedExtras.has(extra.id)}
                        onChange={(e) => {
                          const newSelectedExtras = new Set(selectedExtras);
                          if (e.target.checked) {
                            newSelectedExtras.add(extra.id);
                          } else {
                            newSelectedExtras.delete(extra.id);
                          }
                          setSelectedExtras(newSelectedExtras);
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
        <div className="px-5 pb-5 pt-3" style={{ height: '65px' }}>
          <Button
            onClick={() => {
              const details = features?.length > 0 ? `Velocidad/Plan: ${features[0]}` : '';
              (window as any).showContactModal?.(planName, displayPrice, ctaLink, details);
            }}
            className="w-full bg-black text-white hover:bg-gray-800 font-semibold py-3 rounded-sm text-center"
          >
            {hasOperatorChoice ? 'Elegir Red' : ctaText || 'Contratar ahora'}
          </Button>
        </div>
      </div>
    </div>
  );
}

export { PricingCard };
