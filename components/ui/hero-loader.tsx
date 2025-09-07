'use client';

import { useEffect, useState } from 'react';
import { UnifiedHero, UnifiedHeroProps } from '@/components/ui/unified-hero';

interface HeroLoaderProps {
  page: string;
  fallback?: UnifiedHeroProps;
}

export function HeroLoader({ page, fallback }: HeroLoaderProps) {
  const [config, setConfig] = useState<UnifiedHeroProps | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadConfig = async () => {
      try {
        setLoading(true);
        const res = await fetch(`/api/admin/unified-hero-config?page=${page}`);
        const data = await res.json();
        
        if (Array.isArray(data) && data.length > 0 && data[0].isActive) {
          setConfig(data[0]);
        } else {
          // Si no hay configuración activa, usar el fallback
          setConfig(fallback || null);
        }
      } catch (error) {
        console.error('Error cargando configuración de hero:', error);
        // En caso de error, también usar el fallback
        setConfig(fallback || null);
      } finally {
        setLoading(false);
      }
    };

    loadConfig();
  }, [page, fallback]);

  if (loading) {
    // Mientras carga, mostrar un placeholder o nada
    return <div className="h-[200px] bg-gray-100 animate-pulse"></div>;
  }

  if (!config) {
    // Si no hay configuración, no mostrar nada o un mensaje
    return null;
  }

  // Renderizar el hero con la configuración cargada
  return <UnifiedHero {...config} page={page} />;
}
