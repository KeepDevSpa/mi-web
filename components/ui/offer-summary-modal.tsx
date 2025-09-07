'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';

interface OfferSummaryModalProps {
  offerId: string;
  onClose: () => void;
  onContactClick: (offerName: string, price: number) => void;
}

export default function OfferSummaryModal({ offerId, onClose, onContactClick }: OfferSummaryModalProps) {
  const [offer, setOffer] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOffer = async () => {
      try {
        setLoading(true);
        const response = await fetch(`/api/offers/${offerId}`);
        if (!response.ok) throw new Error('Error cargando oferta');
        const data = await response.json();
        setOffer(data);
      } catch (error) {
        console.error('Error cargando oferta:', error);
      } finally {
        setLoading(false);
      }
    };

    if (offerId) {
      fetchOffer();
    }
  }, [offerId]);

  if (!offer) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto relative">
        {/* Botón cerrar */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
        >
          <X className="w-6 h-6" />
        </button>

        {/* Contenido */}
        <div className="space-y-6">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-900">{offer.name}</h2>
            {offer.subtitle && (
              <p className="mt-2 text-lg text-gray-600">{offer.subtitle}</p>
            )}
          </div>

          {/* Precio */}
          <div className="text-center">
            <div className="text-3xl font-bold text-green-600">
              {offer.price}€<span className="text-base text-gray-600">/mes</span>
            </div>
            {offer.originalPrice && (
              <div className="text-sm text-gray-500 line-through">
                Antes: {offer.originalPrice}€/mes
              </div>
            )}
          </div>

          {/* Características principales */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="font-semibold mb-3">Características incluidas:</h3>
            <ul className="space-y-2">
              {offer.features?.map((feature: string, index: number) => (
                <li key={index} className="flex items-center gap-2">
                  <span className="text-green-500">✓</span>
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Botón de acción */}
          <div className="mt-6">
            <Button
              onClick={() => onContactClick(offer.name, offer.price)}
              className="w-full py-6 text-lg bg-green-600 hover:bg-green-700 text-white"
            >
              Me interesa esta oferta
            </Button>
          </div>

          {/* Notas legales */}
          {offer.legalNotes && (
            <div className="text-xs text-gray-500 mt-4">
              {offer.legalNotes}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
