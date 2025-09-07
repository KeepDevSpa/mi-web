'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';

export default function ContactModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [planName, setPlanName] = useState('');
  const [price, setPrice] = useState(0);
  const [ctaLink, setCtaLink] = useState('/contacto');
  const [planDetails, setPlanDetails] = useState('');

  // Solo se ejecuta en el navegador
  useEffect(() => {
    (window as any).showContactModal = (name: string, price: number, link: string, details?: string) => {
      setPlanName(name);
      setPrice(price);
      setCtaLink(link);
      setPlanDetails(details || '');
      setIsOpen(true);
    };
  }, []);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg p-6 max-w-md w-full max-h-screen overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-bold">Formulario de contacto</h3>
          <button
            onClick={() => setIsOpen(false)}
            className="text-gray-500 hover:text-gray-700"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="mb-6 bg-gray-50 p-4 rounded-lg">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm text-gray-600">PLAN SELECCIONADO</span>
            <span className="text-sm text-gray-600">Precio estimado</span>
          </div>
          <div className="flex justify-between items-center">
            <div>
              <div className="font-medium">{planName}</div>
              {planDetails && <div className="text-sm text-gray-600">{planDetails}</div>}
            </div>
            <div className="font-bold text-green-600">{price}€/mes</div>
          </div>
        </div>

        <form action={ctaLink} method="POST" className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Nombre*</label>
            <input
              type="text"
              name="name"
              required
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Apellidos*</label>
            <input
              type="text"
              name="lastname"
              required
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">DNI (sube uno o varios archivos, máx. 20MB por archivo)</label>
            <input
              type="file"
              name="dni"
              accept=".pdf,.jpg,.png"
              multiple
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Dirección</label>
            <input
              type="text"
              name="street"
              placeholder="Calle"
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>

          <div className="grid grid-cols-3 gap-2">
            <input
              type="text"
              name="number"
              placeholder="Número"
              className="p-2 border border-gray-300 rounded"
            />
            <input
              type="text"
              name="floor"
              placeholder="Piso"
              className="p-2 border border-gray-300 rounded"
            />
            <input
              type="text"
              name="letter"
              placeholder="Letra"
              className="p-2 border border-gray-300 rounded"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Código Postal*</label>
            <input
              type="text"
              name="postalCode"
              required
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Población</label>
            <input
              type="text"
              name="city"
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Provincia</label>
            <input
              type="text"
              name="province"
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Teléfono*</label>
            <input
              type="tel"
              name="phone"
              required
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input
              type="email"
              name="email"
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Observaciones</label>
            <textarea
              name="comments"
              rows={3}
              placeholder="Escribe cualquier comentario..."
              className="w-full p-2 border border-gray-300 rounded"
            ></textarea>
          </div>

          <div className="flex items-start space-x-2">
            <input type="checkbox" id="client" name="client" className="mt-1" />
            <label htmlFor="client" className="text-sm text-gray-700">Ya soy cliente de Prisma</label>
          </div>

          <div className="flex items-start space-x-2">
            <input type="checkbox" id="consent" name="consent" required className="mt-1" />
            <label htmlFor="consent" className="text-sm text-gray-700">Presto consentimiento expreso para el tratamiento de mis datos*</label>
          </div>

          <Button type="submit" className="w-full bg-green-600 hover:bg-green-700 text-white">
            Enviar
          </Button>
        </form>
      </div>
    </div>
  );
}