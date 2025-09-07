'use client';

import { useState, useEffect } from 'react';
import { Shield, Users, Zap, Phone, Tv, Lock, Wifi, Settings, Plus, Trash2, Save } from 'lucide-react';
import dynamic from 'next/dynamic';

// Importamos los componentes con carga dinámica para evitar problemas de SSR
const FileExplorer = dynamic(() => import('@/components/ui/file-explorer').then(mod => mod.FileExplorer), { ssr: false });
const TipTapEditor = dynamic(() => import('@/components/ui/tiptap-editor').then(mod => mod.TipTapEditor), { ssr: false });

// Iconos disponibles (deben coincidir con lucide-react)
const AVAILABLE_ICONS = [
  'Shield', 'Users', 'Zap', 'Phone', 'Tv', 'Lock', 'Wifi', 'Settings', 'Clock', 'MapPin', 'Mail', 'Star'
];

// Colores corporativos
const CORPORATE_COLORS = [
  { name: 'Verde Prisma', value: 'text-[#00aa00]' },
  { name: 'Dorado', value: 'text-[#ffc100]' },
  { name: 'Blanco', value: 'text-white' },
  { name: 'Gris claro', value: 'text-gray-300' },
];

// Páginas disponibles
const PAGES = [
  { value: 'home', label: '🏠 Inicio' },
  { value: 'movil', label: '📱 Móvil' },
  { value: 'fibra', label: '🌐 Fibra' },
  { value: 'fibra-movil', label: '🔁 Combo' },
  { value: 'empresa', label: '🏢 Empresa' },
  { value: 'prisma-tv', label: '📺 Prisma TV' },
  { value: 'seguridad', label: '🔐 Seguridad' },
  { value: 'energia', label: '⚡ Energía' },
];

// Tipos
interface HeroHighlight {
  icon: string;
  text: string;
  color: string;
}

interface HeroConfig {
  id?: string;
  page: string;
  isActive: boolean;
  title: string;
  subtitle: string;
  description: string;
  heroImage: string;
  backgroundType: 'image' | 'gradient' | 'solid';
  variant: 'default' | 'light' | 'dark' | 'accent';
  primaryCta: {
    text: string;
    href: string;
  };
  secondaryCta: {
    text: string;
    href: string;
  };
  highlights: HeroHighlight[];
}

const DEFAULT_CONFIG: Omit<HeroConfig, 'id'> = {
  page: 'home',
  isActive: true,
  title: 'Bienvenido a',
  subtitle: 'Prisma Móvil',
  description: 'Descubre nuestros servicios de internet y telefonía.',
  heroImage: '/Hero-Banner.webp',
  backgroundType: 'image',
  variant: 'default',
  primaryCta: { text: 'Descubre más', href: '#' },
  secondaryCta: { text: 'Contacto', href: '/contacto' },
  highlights: []
};

export default function HeroConfigTab() {
  const [configs, setConfigs] = useState<HeroConfig[]>([]);
  const [editing, setEditing] = useState<HeroConfig>({ ...DEFAULT_CONFIG });
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    loadConfigs();
  }, []);

  const loadConfigs = async () => {
    try {
      setLoading(true);
      const res = await fetch('/api/admin/hero-config');
      const data = await res.json();
      setConfigs(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error('Error cargando configuraciones:', error);
      alert('Error al cargar las configuraciones del hero');
    } finally {
      setLoading(false);
    }
  };

  const saveConfig = async () => {
    if (!editing) return;

    try {
      // Asegurar que solo una por página esté activa
      if (editing.isActive) {
        await fetch('/api/admin/hero-config/deactivate-others', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ page: editing.page, id: editing.id }),
        });
      }

      const method = editing.id ? 'PUT' : 'POST';
      const url = '/api/admin/hero-config';

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editing),
      });

      if (!response.ok) {
        throw new Error('Error al guardar');
      }

      await loadConfigs();
      setIsEditing(false);
      setEditing({ ...DEFAULT_CONFIG });
    } catch (error) {
      console.error('Error guardando configuración:', error);
      alert('Error al guardar la configuración');
    }
  };

  const addNewConfig = () => {
    setEditing({ ...DEFAULT_CONFIG });
    setIsEditing(true);
  };

  const startEditing = (config: HeroConfig) => {
    setEditing({
      ...DEFAULT_CONFIG,
      ...config,
      highlights: Array.isArray(config.highlights) ? config.highlights : []
    });
    setIsEditing(true);
  };

  const addHighlight = () => {
    setEditing({
      ...editing,
      highlights: [
        ...editing.highlights,
        { icon: 'Shield', text: 'Nuevo beneficio', color: 'text-[#00aa00]' },
      ],
    });
  };

  const removeHighlight = (index: number) => {
    const newHighlights = [...editing.highlights];
    newHighlights.splice(index, 1);
    setEditing({ ...editing, highlights: newHighlights });
  };

  const updateHighlight = (index: number, field: keyof HeroHighlight, value: string) => {
    const newHighlights = [...editing.highlights];
    newHighlights[index] = { ...newHighlights[index], [field]: value };
    setEditing({ ...editing, highlights: newHighlights });
  };

  if (loading) {
    return (
      <div className="p-6">
        <p>Cargando configuraciones...</p>
      </div>
    );
  }

  if (!isEditing) {
    return (
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Configuración del Hero</h2>
          <button
            onClick={addNewConfig}
            className="bg-[#00aa00] text-white px-4 py-2 rounded flex items-center gap-2 hover:bg-[#008800] transition-colors"
          >
            <Plus className="w-4 h-4" /> Nueva Configuración
          </button>
        </div>

        <table className="min-w-full bg-white border rounded-lg">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-medium">Página</th>
              <th className="px-6 py-3 text-left text-sm font-medium">Título</th>
              <th className="px-6 py-3 text-left text-sm font-medium">Activo</th>
              <th className="px-6 py-3 text-left text-sm font-medium">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {configs.map((config) => (
              <tr key={config.id} className="hover:bg-gray-50">
                <td className="px-6 py-4">{PAGES.find(p => p.value === config.page)?.label || config.page}</td>
                <td className="px-6 py-4">{config.title}</td>
                <td className="px-6 py-4">
                  {config.isActive ? (
                    <span className="bg-[#00aa00] text-white px-2 py-1 rounded text-xs">Sí</span>
                  ) : (
                    <span className="bg-gray-200 text-gray-600 px-2 py-1 rounded text-xs">No</span>
                  )}
                </td>
                <td className="px-6 py-4">
                  <button
                    onClick={() => startEditing(config)}
                    className="text-blue-600 hover:text-blue-800"
                  >
                    Editar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="bg-white p-6 rounded-lg border">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">{editing.id ? 'Editar Hero' : 'Nuevo Hero'}</h2>
          <button
            onClick={() => {
              setIsEditing(false);
              setEditing({ ...DEFAULT_CONFIG });
            }}
            className="text-gray-600 hover:text-gray-800"
          >
            Volver al listado
          </button>
        </div>

        {/* Formulario */}
        <div className="space-y-6">
          {/* Página */}
          <div>
            <label className="block text-sm font-medium mb-1">Página</label>
            <select
              value={editing.page}
              onChange={(e) => setEditing({ ...editing, page: e.target.value })}
              className="w-full p-2 border border-gray-300 rounded"
            >
              {PAGES.map((page) => (
                <option key={page.value} value={page.value}>
                  {page.label}
                </option>
              ))}
            </select>
          </div>

          {/* Título */}
          <div>
            <label className="block text-sm font-medium mb-1">Título</label>
            <TipTapEditor
              content={editing.title}
              onChange={(content: string) => setEditing({ ...editing, title: content })}
              placeholder="Ingrese el título"
            />
          </div>

          {/* Subtítulo */}
          <div>
            <label className="block text-sm font-medium mb-1">Subtítulo</label>
            <TipTapEditor
              content={editing.subtitle}
              onChange={(content: string) => setEditing({ ...editing, subtitle: content })}
              placeholder="Ingrese el subtítulo"
            />
          </div>

          {/* Descripción */}
          <div>
            <label className="block text-sm font-medium mb-1">Descripción</label>
            <TipTapEditor
              content={editing.description}
              onChange={(content: string) => setEditing({ ...editing, description: content })}
              placeholder="Ingrese la descripción"
            />
          </div>

          {/* CTA Primario */}
          <div>
            <label className="block text-sm font-medium mb-2">CTA Primario</label>
            <div className="grid grid-cols-2 gap-4">
              <input
                type="text"
                value={editing.primaryCta.text}
                onChange={(e) =>
                  setEditing({
                    ...editing,
                    primaryCta: { ...editing.primaryCta, text: e.target.value },
                  })
                }
                className="p-2 border border-gray-300 rounded"
                placeholder="Texto del botón"
              />
              <input
                type="text"
                value={editing.primaryCta.href}
                onChange={(e) =>
                  setEditing({
                    ...editing,
                    primaryCta: { ...editing.primaryCta, href: e.target.value },
                  })
                }
                className="p-2 border border-gray-300 rounded"
                placeholder="URL del botón"
              />
            </div>
          </div>

          {/* CTA Secundario */}
          <div>
            <label className="block text-sm font-medium mb-2">CTA Secundario</label>
            <div className="grid grid-cols-2 gap-4">
              <input
                type="text"
                value={editing.secondaryCta.text}
                onChange={(e) =>
                  setEditing({
                    ...editing,
                    secondaryCta: { ...editing.secondaryCta, text: e.target.value },
                  })
                }
                className="p-2 border border-gray-300 rounded"
                placeholder="Texto del botón"
              />
              <input
                type="text"
                value={editing.secondaryCta.href}
                onChange={(e) =>
                  setEditing({
                    ...editing,
                    secondaryCta: { ...editing.secondaryCta, href: e.target.value },
                  })
                }
                className="p-2 border border-gray-300 rounded"
                placeholder="URL del botón"
              />
            </div>
          </div>

          {/* Imagen del Hero */}
          <div>
            <label className="block text-sm font-medium mb-1">Imagen del Hero</label>
            <div className="space-y-2">
              <FileExplorer />
              <input
                type="text"
                value={editing.heroImage}
                onChange={(e) => setEditing({ ...editing, heroImage: e.target.value })}
                className="w-full p-2 border border-gray-300 rounded"
                placeholder="/ruta-a-la-imagen.webp"
              />
            </div>
          </div>

          {/* Tipo de fondo */}
          <div>
            <label className="block text-sm font-medium mb-1">Tipo de fondo</label>
            <select
              value={editing.backgroundType}
              onChange={(e) =>
                setEditing({ ...editing, backgroundType: e.target.value as any })
              }
              className="w-full p-2 border border-gray-300 rounded"
            >
              <option value="image">Imagen</option>
              <option value="gradient">Gradiente</option>
              <option value="solid">Sólido</option>
            </select>
          </div>

          {/* Variante */}
          <div>
            <label className="block text-sm font-medium mb-1">Variante</label>
            <select
              value={editing.variant}
              onChange={(e) => setEditing({ ...editing, variant: e.target.value as HeroConfig['variant'] })}
              className="w-full p-2 border border-gray-300 rounded"
            >
              <option value="default">Por defecto (Verde)</option>
              <option value="light">Clara</option>
              <option value="dark">Oscura</option>
              <option value="accent">Acento</option>
            </select>
          </div>

          {/* Highlights/Beneficios */}
          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="block text-sm font-medium">Beneficios</label>
              <button
                onClick={addHighlight}
                className="text-[#00aa00] text-sm flex items-center gap-1"
              >
                <Plus className="w-4 h-4" /> Añadir
              </button>
            </div>
            {(editing.highlights || []).map((highlight, index) => (
              <div
                key={index}
                className="flex flex-col md:flex-row gap-2 mb-2 p-3 border border-gray-200 rounded"
              >
                <div className="flex-1">
                  <select
                    value={highlight.icon}
                    onChange={(e) => updateHighlight(index, 'icon', e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded text-sm"
                  >
                    {AVAILABLE_ICONS.map((icon) => (
                      <option key={icon} value={icon}>
                        {icon}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="flex-[2]">
                  <input
                    type="text"
                    value={highlight.text}
                    onChange={(e) => updateHighlight(index, 'text', e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded text-sm"
                    placeholder="Texto del beneficio"
                  />
                </div>
                <div className="flex-1">
                  <select
                    value={highlight.color}
                    onChange={(e) => updateHighlight(index, 'color', e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded text-sm"
                  >
                    {CORPORATE_COLORS.map((color) => (
                      <option key={color.value} value={color.value}>
                        {color.name}
                      </option>
                    ))}
                  </select>
                </div>
                <button
                  onClick={() => removeHighlight(index)}
                  className="text-red-600 hover:text-red-800 p-2"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>

          {/* Activo */}
          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={editing.isActive}
              onChange={(e) => setEditing({ ...editing, isActive: e.target.checked })}
              className="w-4 h-4 text-[#00aa00] border-gray-300 rounded"
            />
            <label className="text-sm font-medium">Activo</label>
          </div>

          {/* Botones de acción */}
          <div className="flex justify-end gap-4">
            <button
              onClick={() => {
                setIsEditing(false);
                setEditing({ ...DEFAULT_CONFIG });
              }}
              className="px-4 py-2 text-gray-600 hover:text-gray-800"
            >
              Cancelar
            </button>
            <button
              onClick={saveConfig}
              className="px-4 py-2 bg-[#00aa00] text-white rounded hover:bg-[#008800] flex items-center gap-2"
            >
              <Save className="w-4 h-4" /> Guardar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
