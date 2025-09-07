/**
 * Hook personalizado para gestionar selectores de página
 * Proporciona funcionalidad para obtener selectores y tarjetas filtradas
 */

import { useState, useEffect } from 'react';

/**
 * Interfaz para los datos de un selector de página
 */
export interface PageSelector {
  id: string;
  page: string;
  key: string;
  title: string;
  subtitle?: string;
  description?: string;
  order: number;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

/**
 * Interfaz para las tarjetas de precios
 */
export interface PricingCardData {
  id: string;
  name: string;
  page: string;
  selectorKey?: string;
  currentPrice: number;
  originalPrice?: number;
  variant: string;
  hasSpeedSelector: boolean;
  features: string[];
  isPopular: boolean;
  ctaText?: string;
  rateTier: number;
  isActive: boolean;
  speeds: Array<{
    id: string;
    label: string;
    price: number;
    originalPrice?: number;
  }>;
  extras: any[];
}

/**
 * Hook personalizado para gestionar selectores de página
 * 
 * @param page - Nombre de la página para filtrar selectores
 * @returns Objeto con selectores, tarjetas filtradas, loading y funciones de control
 */
export function usePageSelectors(page: string) {
  const [selectors, setSelectors] = useState<PageSelector[]>([]);
  const [allCards, setAllCards] = useState<PricingCardData[]>([]);
  const [selectedKey, setSelectedKey] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>('');

  /**
   * Obtiene los selectores de página desde la API
   */
  const fetchSelectors = async () => {
    try {
      setLoading(true);
      const response = await fetch(`/api/admin/page-selectors?page=${page}`);
      if (!response.ok) throw new Error('Error al cargar selectores');
      
      const data = await response.json();
      const activeSelectors = data.filter((s: PageSelector) => s.isActive);
      setSelectors(activeSelectors);
      
      // Establecer el primer selector como seleccionado por defecto
      if (activeSelectors.length > 0 && !selectedKey) {
        setSelectedKey(activeSelectors[0].key);
      }
    } catch (err) {
      setError('Error al cargar los selectores');
      console.error('Error fetching selectors:', err);
    } finally {
      setLoading(false);
    }
  };

  /**
   * Obtiene las tarjetas de precios desde la API
   */
  const fetchCards = async () => {
    try {
      const response = await fetch(`/api/admin/cards?page=${page}`);
      if (!response.ok) throw new Error('Error al cargar tarjetas');
      
      const data = await response.json();
      setAllCards(data.filter((card: PricingCardData) => card.isActive));
    } catch (err) {
      console.error('Error fetching cards:', err);
    }
  };

  /**
   * Filtra las tarjetas según el selector seleccionado
   */
  const getFilteredCards = (): PricingCardData[] => {
    if (!selectedKey) return [];
    
    return allCards.filter(card => {
      // Si la tarjeta no tiene selectorKey, se muestra solo cuando no hay selector seleccionado
      // Si tiene selectorKey, se muestra solo cuando coincide con el selector seleccionado
      return card.selectorKey === selectedKey || 
             (!card.selectorKey && selectedKey === (selectors[0]?.key || ''));
    }).sort((a, b) => a.rateTier - b.rateTier);
  };

  /**
   * Cambia el selector seleccionado
   */
  const handleSelectorChange = (key: string) => {
    setSelectedKey(key);
  };

  /**
   * Obtiene la clase CSS para un botón selector
   */
  const getSelectorButtonClass = (key: string) => {
    const baseClass = "px-6 py-3 rounded-full font-medium transition-colors cursor-pointer text-center";
    const activeClass = "bg-[#00aa00] text-white hover:bg-[#008800] shadow-lg";
    const inactiveClass = "bg-gray-200 text-gray-700 hover:bg-gray-300";
    
    return `${baseClass} ${selectedKey === key ? activeClass : inactiveClass}`;
  };

  // Cargar datos al montar el componente o cambiar la página
  useEffect(() => {
    fetchSelectors();
    fetchCards();
  }, [page]);

  return {
    selectors,
    selectedKey,
    filteredCards: getFilteredCards(),
    loading,
    error,
    handleSelectorChange,
    getSelectorButtonClass,
    refetch: () => {
      fetchSelectors();
      fetchCards();
    }
  };
}
