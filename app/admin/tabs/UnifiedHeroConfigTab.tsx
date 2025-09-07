'use client';

import { useState, useEffect } from 'react';
import { Plus, Trash2, Save } from 'lucide-react';
import dynamic from 'next/dynamic';

const TipTapEditor = dynamic(() => import('@/components/ui/tiptap-editor').then(mod => mod.TipTapEditor), { ssr: false });
const FileExplorer = dynamic(() => import('@/components/ui/file-explorer').then(mod => mod.FileExplorer), { ssr: false });

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

// Variantes disponibles
const VARIANTS = [
  { value: 'default', label: 'Por defecto (Gris)' },
  { value: 'green', label: 'Verde' },
  { value: 'light', label: 'Claro' },
  { value: 'dark', label: 'Oscuro' },
  { value: 'accent', label: 'Acento' },
  { value: 'security', label: 'Seguridad' },
  { value: 'energy', label: 'Energía' },
];

// Posiciones de contenido
const POSITIONS = [
  { value: 'left', label: 'Izquierda' },
  { value: 'center', label: 'Centro' },
  { value: 'right', label: 'Derecha' },
];

// Layouts de título
const TITLE_LAYOUTS = [
  { value: 'stacked', label: 'Apilado (uno bajo otro)' },
  { value: 'inline', label: 'En línea (uno al lado del otro)' },
  { value: 'separated', label: 'Separado (con espacio entre ellos)' },
];

// Tamaños de texto
const TEXT_SIZES = [
  { value: 'small', label: 'Pequeño' },
  { value: 'medium', label: 'Mediano' },
  { value: 'large', label: 'Grande' },
];

// Estilos de botones
const BUTTON_STYLES = [
  { value: 'primary', label: 'Principal (verde)' },
  { value: 'secondary', label: 'Secundario (blanco)' },
  { value: 'outline', label: 'Contorno' },
  { value: 'link', label: 'Enlace' },
];

// Estilos de highlights
const HIGHLIGHT_STYLES = [
  { value: 'pill', label: 'Píldora' },
  { value: 'icon', label: 'Icono con texto' },
  { value: 'badge', label: 'Insignia pequeña' },
];

interface UnifiedHeroConfig {
  id?: string;
  page: string;
  title: string;
  highlightedText?: string;
  description?: string;
  image?: string;
  variant: string;
  primaryCta?: {
    text: string;
    href: string;
    style?: string;
    icon?: string;
  };
  secondaryCta?: {
    text: string;
    href: string;
    style?: string;
    icon?: string;
  };
  highlights?: Array<{
    text: string;
    icon?: string;
    color?: string;
    className?: string;
    style?: string;
  }>;
  showButtons: boolean;
  contentPosition: string;
  titleLayout: string;
  overlayOpacity: number;
  textSize: string;
  isActive: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

const DEFAULT_CONFIG: UnifiedHeroConfig = {
  page: 'home',
  title: 'Bienvenido a',
  highlightedText: 'Prisma Móvil',
  description: 'Descubre nuestras ofertas y servicios de telecomunicaciones.',
  image: '/Hero-Banner.webp',
  variant: 'default',
  primaryCta: {
    text: 'Descubre más',
    href: '#planes',
    style: 'primary'
  },
  secondaryCta: {
    text: 'Contacto',
    href: '/contacto',
    style: 'outline'
  },
  highlights: [],
  showButtons: true,
  contentPosition: 'left',
  titleLayout: 'stacked',
  overlayOpacity: 0.4,
  textSize: 'medium',
  isActive: true
};

export default function UnifiedHeroConfigTab() {
  const [configs, setConfigs] = useState<UnifiedHeroConfig[]>([]);
  const [editing, setEditing] = useState<UnifiedHeroConfig>({ ...DEFAULT_CONFIG });
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    loadConfigs();
  }, []);

  const loadConfigs = async () => {
    try {
      setLoading(true);
      const res = await fetch('/api/admin/unified-hero-config');
      const data = await res.json();
      setConfigs(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error('Error cargando configuraciones:', error);
      alert('Error al cargar las configuraciones del hero unificado');
    } finally {
      setLoading(false);
    }
  };

  const saveConfig = async () => {
    if (!editing) return;

    try {
      const method = editing.id ? 'PUT' : 'POST';
      const url = '/api/admin/unified-hero-config';

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

  const startEditing = (config: UnifiedHeroConfig) => {
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
        ...(editing.highlights || []),
        { text: 'Nuevo beneficio', style: 'pill', className: 'bg-[#00aa00]' },
      ],
    });
  };

  const removeHighlight = (index: number) => {
    const newHighlights = [...(editing.highlights || [])];
    newHighlights.splice(index, 1);
    setEditing({ ...editing, highlights: newHighlights });
  };

  const updateHighlight = (index: number, field: string, value: string) => {
    const newHighlights = [...(editing.highlights || [])];
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
          <h2 className="text-2xl font-bold">Hero Unificado</h2>
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
              <th className="px-6 py-3 text-left text-sm font-medium">Variante</th>
              <th className="px-6 py-3 text-left text-sm font-medium">Activo</th>
              <th className="px-6 py-3 text-left text-sm font-medium">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {configs.map((config) => (
              <tr key={config.id} className="hover:bg-gray-50">
                <td className="px-6 py-4">{PAGES.find(p => p.value === config.page)?.label || config.page}</td>
                <td className="px-6 py-4">{config.title}</td>
                <td className="px-6 py-4">{config.variant}</td>
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

          {/* Texto destacado */}
          <div>
            <label className="block text-sm font-medium mb-1">Texto destacado</label>
            <TipTapEditor
              content={editing.highlightedText || ''}
              onChange={(content: string) => setEditing({ ...editing, highlightedText: content })}
              placeholder="Ingrese el texto destacado"
            />
            <p className="text-xs text-gray-500 mt-1">
              Este texto se mostrará resaltado con color destacado según el tema seleccionado.
            </p>
          </div>

          {/* Descripción */}
          <div>
            <label className="block text-sm font-medium mb-1">Descripción</label>
            <textarea
              value={editing.description || ''}
              onChange={(e) => setEditing({ ...editing, description: e.target.value })}
              className="w-full p-2 border border-gray-300 rounded"
              rows={3}
              placeholder="Ingrese la descripción"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Layout del título */}
            <div>
              <label className="block text-sm font-medium mb-1">Layout del Título</label>
              <select
                value={editing.titleLayout}
                onChange={(e) => setEditing({ ...editing, titleLayout: e.target.value })}
                className="w-full p-2 border border-gray-300 rounded"
              >
                {TITLE_LAYOUTS.map((layout) => (
                  <option key={layout.value} value={layout.value}>
                    {layout.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Tamaño del texto */}
            <div>
              <label className="block text-sm font-medium mb-1">Tamaño del Texto</label>
              <select
                value={editing.textSize}
                onChange={(e) => setEditing({ ...editing, textSize: e.target.value })}
                className="w-full p-2 border border-gray-300 rounded"
              >
                {TEXT_SIZES.map((size) => (
                  <option key={size.value} value={size.value}>
                    {size.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Variante */}
            <div>
              <label className="block text-sm font-medium mb-1">Variante</label>
              <select
                value={editing.variant}
                onChange={(e) => setEditing({ ...editing, variant: e.target.value })}
                className="w-full p-2 border border-gray-300 rounded"
              >
                {VARIANTS.map((variant) => (
                  <option key={variant.value} value={variant.value}>
                    {variant.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Posición del contenido */}
            <div>
              <label className="block text-sm font-medium mb-1">Posición del Contenido</label>
              <select
                value={editing.contentPosition}
                onChange={(e) => setEditing({ ...editing, contentPosition: e.target.value })}
                className="w-full p-2 border border-gray-300 rounded"
              >
                {POSITIONS.map((position) => (
                  <option key={position.value} value={position.value}>
                    {position.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Imagen del Hero */}
          <div>
            <label className="block text-sm font-medium mb-1">Imagen del Hero</label>
            <div className="space-y-2">
              <FileExplorer
                currentImage={editing.image || ''}
                onSelect={(path: string) => setEditing({ ...editing, image: path })}
              />
              <input
                type="text"
                value={editing.image || ''}
                onChange={(e) => setEditing({ ...editing, image: e.target.value })}
                className="w-full p-2 border border-gray-300 rounded"
                placeholder="/ruta-a-la-imagen.webp"
              />
            </div>
          </div>

          {/* Opacidad de overlay */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Opacidad del Overlay: {Math.round(editing.overlayOpacity * 100)}%
            </label>
            <input
              type="range"
              min="0"
              max="1"
              step="0.05"
              value={editing.overlayOpacity}
              onChange={(e) => setEditing({ ...editing, overlayOpacity: parseFloat(e.target.value) })}
              className="w-full"
            />
          </div>

          {/* CTA Primario */}
          <div>
            <label className="block text-sm font-medium mb-2">CTA Primario</label>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <input
                type="text"
                value={editing.primaryCta?.text || ''}
                onChange={(e) =>
                  setEditing({
                    ...editing,
                    primaryCta: { ...editing.primaryCta, text: e.target.value } as any,
                  })
                }
                className="p-2 border border-gray-300 rounded"
                placeholder="Texto del botón"
              />
              <input
                type="text"
                value={editing.primaryCta?.href || ''}
                onChange={(e) =>
                  setEditing({
                    ...editing,
                    primaryCta: { ...editing.primaryCta, href: e.target.value } as any,
                  })
                }
                className="p-2 border border-gray-300 rounded"
                placeholder="URL del botón"
              />
              <select
                value={editing.primaryCta?.style || 'primary'}
                onChange={(e) =>
                  setEditing({
                    ...editing,
                    primaryCta: { ...editing.primaryCta, style: e.target.value } as any,
                  })
                }
                className="p-2 border border-gray-300 rounded"
              >
                {BUTTON_STYLES.map((style) => (
                  <option key={style.value} value={style.value}>
                    {style.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* CTA Secundario */}
          <div>
            <label className="block text-sm font-medium mb-2">CTA Secundario</label>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <input
                type="text"
                value={editing.secondaryCta?.text || ''}
                onChange={(e) =>
                  setEditing({
                    ...editing,
                    secondaryCta: { ...editing.secondaryCta, text: e.target.value } as any,
                  })
                }
                className="p-2 border border-gray-300 rounded"
                placeholder="Texto del botón"
              />
              <input
                type="text"
                value={editing.secondaryCta?.href || ''}
                onChange={(e) =>
                  setEditing({
                    ...editing,
                    secondaryCta: { ...editing.secondaryCta, href: e.target.value } as any,
                  })
                }
                className="p-2 border border-gray-300 rounded"
                placeholder="URL del botón"
              />
              <select
                value={editing.secondaryCta?.style || 'outline'}
                onChange={(e) =>
                  setEditing({
                    ...editing,
                    secondaryCta: { ...editing.secondaryCta, style: e.target.value } as any,
                  })
                }
                className="p-2 border border-gray-300 rounded"
              >
                {BUTTON_STYLES.map((style) => (
                  <option key={style.value} value={style.value}>
                    {style.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Highlights/Beneficios */}
          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="block text-sm font-medium">Highlights (Píldoras)</label>
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
                  <input
                    type="text"
                    value={highlight.text || ''}
                    onChange={(e) => updateHighlight(index, 'text', e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded text-sm"
                    placeholder="Texto del highlight"
                  />
                </div>
                <div className="flex-1">
                  <select
                    value={highlight.style || 'pill'}
                    onChange={(e) => updateHighlight(index, 'style', e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded text-sm"
                  >
                    {HIGHLIGHT_STYLES.map((style) => (
                      <option key={style.value} value={style.value}>
                        {style.label}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="flex-1">
                  <input
                    type="text"
                    value={highlight.className || ''}
                    onChange={(e) => updateHighlight(index, 'className', e.target.value)}
                    placeholder="Clase CSS (ej: bg-[#00aa00])"
                    className="w-full p-2 border border-gray-300 rounded text-sm"
                  />
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

          <div className="flex gap-4">
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

            {/* Mostrar botones */}
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={editing.showButtons}
                onChange={(e) => setEditing({ ...editing, showButtons: e.target.checked })}
                className="w-4 h-4 text-[#00aa00] border-gray-300 rounded"
              />
              <label className="text-sm font-medium">Mostrar botones CTA</label>
            </div>
          </div>

          {/* Botones de acción */}
          <div className="flex justify-end gap-4 mt-6">
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
