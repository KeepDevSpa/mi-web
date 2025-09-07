'use client';

import { useState, useCallback } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { TitleEditor } from '@/components/ui/title-editor'
import { Textarea } from '@/components/ui/textarea'
import { Card } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Save } from 'lucide-react'
import { useToast } from '@/components/ui/use-toast'
import { FileExplorer } from '@/components/ui/file-explorer'

interface HeroConfig {
  id?: string;
  page: string;
  title: string;
  highlightedText: string;
  description: string;
  heroImage: string;
  isActive: boolean;
  variant: 'default' | 'light' | 'dark' | 'accent';
}

export default function HeroConfigFibraMovil() {
  const [config, setConfig] = useState<HeroConfig>({
    page: 'fibra-movil',
    title: '¿Qué tarifa de',
    highlightedText: 'Fibra y Móvil',
    description: 'Combina nuestra conexión de alta velocidad con la tarifa móvil que mejor se adapte a tus necesidades.',
    heroImage: '/fibra-movil-hero.webp',
    isActive: true,
    variant: 'default'
  });
  const [isSaving, setIsSaving] = useState(false);
  const { toast } = useToast();



  const saveConfig = async () => {
    try {
      setIsSaving(true);
      
      // Here you would make a POST request to your API
      const response = await fetch('/api/admin/hero-config', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(config),
      });

      if (!response.ok) throw new Error('Error al guardar');

      toast({
        title: "Configuración guardada",
        description: "Los cambios se han guardado correctamente.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "No se pudo guardar la configuración.",
        variant: "destructive",
      });
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="space-y-6">
      <Card className="p-6">
        <div className="space-y-6">
          <div className="space-y-2">
            <Label>Título</Label>
            <TitleEditor
              content={config.title}
              onChange={(content) => setConfig({ ...config, title: content })}
            />
          </div>

          <div className="space-y-2">
            <Label>Texto Destacado</Label>
            <TitleEditor
              content={config.highlightedText}
              onChange={(content) => setConfig({ ...config, highlightedText: content })}
            />
          </div>

          <div className="space-y-2">
            <Label>Variante</Label>
            <select 
              className="w-full p-2 border rounded-md"
              value={config.variant}
              onChange={(e) => setConfig({ ...config, variant: e.target.value as HeroConfig['variant'] })}
            >
              <option value="default">Por defecto (Verde)</option>
              <option value="light">Clara</option>
              <option value="dark">Oscura</option>
              <option value="accent">Acento</option>
            </select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Descripción</Label>
            <Textarea
              id="description"
              value={config.description}
              onChange={(e) => setConfig({ ...config, description: e.target.value })}
              placeholder="Describe el servicio..."
              rows={3}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="heroImage">Imagen de Hero</Label>
            <div className="flex items-center gap-4">
              <FileExplorer
                onSelect={(filePath: string) => {
                  setConfig(prev => ({ ...prev, heroImage: filePath }));
                }}
                currentImage={config.heroImage}
              />
            </div>
          </div>

          <Button
            onClick={saveConfig}
            disabled={isSaving}
            className="w-full"
          >
            <Save className="w-4 h-4 mr-2" />
            {isSaving ? 'Guardando...' : 'Guardar Cambios'}
          </Button>
        </div>
      </Card>
    </div>
  );
}
