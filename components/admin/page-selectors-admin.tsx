/**
 * Componente de administración para gestionar selectores de página
 * Permite crear, editar y eliminar selectores que aparecen en las páginas
 */

'use client';

import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

/**
 * Interfaz para los datos de un selector de página
 */
interface PageSelector {
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
 * Interfaz para el formulario de selector
 */
interface SelectorForm {
  page: string;
  key: string;
  title: string;
  subtitle: string;
  description: string;
  order: number;
  isActive: boolean;
}

const initialForm: SelectorForm = {
  page: '',
  key: '',
  title: '',
  subtitle: '',
  description: '',
  order: 0,
  isActive: true
};

/**
 * Componente principal para administrar selectores de página
 */
export default function PageSelectorsAdmin() {
  const [selectors, setSelectors] = useState<PageSelector[]>([]);
  const [form, setForm] = useState<SelectorForm>(initialForm);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>('');
  const [success, setSuccess] = useState<string>('');

  /**
   * Carga todos los selectores de página desde la API
   */
  const fetchSelectors = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/admin/page-selectors');
      if (!response.ok) throw new Error('Error al cargar selectores');
      
      const data = await response.json();
      setSelectors(data);
    } catch (err) {
      setError('Error al cargar los selectores');
      console.error('Error fetching selectors:', err);
    } finally {
      setLoading(false);
    }
  };

  /**
   * Guarda un selector (crear o actualizar)
   */
  const handleSave = async () => {
    try {
      setLoading(true);
      setError('');
      
      const method = editingId ? 'PUT' : 'POST';
      const url = editingId 
        ? `/api/admin/page-selectors/${editingId}`
        : '/api/admin/page-selectors';
      
      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Error al guardar');
      }

      setSuccess(editingId ? 'Selector actualizado' : 'Selector creado');
      setForm(initialForm);
      setEditingId(null);
      fetchSelectors();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al guardar');
    } finally {
      setLoading(false);
    }
  };

  /**
   * Inicia la edición de un selector
   */
  const handleEdit = (selector: PageSelector) => {
    setForm({
      page: selector.page,
      key: selector.key,
      title: selector.title,
      subtitle: selector.subtitle || '',
      description: selector.description || '',
      order: selector.order,
      isActive: selector.isActive
    });
    setEditingId(selector.id);
  };

  /**
   * Elimina un selector
   */
  const handleDelete = async (id: string) => {
    if (!confirm('¿Estás seguro de que quieres eliminar este selector?')) {
      return;
    }

    try {
      setLoading(true);
      const response = await fetch(`/api/admin/page-selectors/${id}`, {
        method: 'DELETE'
      });

      if (!response.ok) throw new Error('Error al eliminar');

      setSuccess('Selector eliminado');
      fetchSelectors();
    } catch (err) {
      setError('Error al eliminar el selector');
    } finally {
      setLoading(false);
    }
  };

  /**
   * Cancela la edición
   */
  const handleCancel = () => {
    setForm(initialForm);
    setEditingId(null);
    setError('');
  };

  /**
   * Actualiza un campo del formulario
   */
  const updateForm = (field: keyof SelectorForm, value: any) => {
    setForm(prev => ({ ...prev, [field]: value }));
  };

  // Cargar selectores al montar el componente
  useEffect(() => {
    fetchSelectors();
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Gestión de Selectores de Página</h1>
        <Button onClick={fetchSelectors} disabled={loading}>
          {loading ? 'Cargando...' : 'Actualizar'}
        </Button>
      </div>

      {/* Mensajes de estado */}
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
          {error}
        </div>
      )}
      {success && (
        <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded">
          {success}
        </div>
      )}

      {/* Formulario */}
      <Card className="p-6">
        <h2 className="text-xl font-semibold mb-4">
          {editingId ? 'Editar Selector' : 'Crear Nuevo Selector'}
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-2">
              Página *
            </label>
            <select
              value={form.page}
              onChange={(e) => updateForm('page', e.target.value)}
              className="w-full p-2 border rounded-md"
              required
            >
              <option value="">Seleccionar página</option>
              <option value="movil">Móvil</option>
              <option value="fibra-movil">Fibra + Móvil</option>
              <option value="fibra">Fibra</option>
              <option value="empresa">Empresa</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">
              Clave única *
            </label>
            <Input
              type="text"
              value={form.key}
              onChange={(e) => updateForm('key', e.target.value)}
              placeholder="ej: fibra, contenido, vip"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">
              Título *
            </label>
            <Input
              type="text"
              value={form.title}
              onChange={(e) => updateForm('title', e.target.value)}
              placeholder="Título del selector"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">
              Subtítulo
            </label>
            <Input
              type="text"
              value={form.subtitle}
              onChange={(e) => updateForm('subtitle', e.target.value)}
              placeholder="Subtítulo opcional"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">
              Orden
            </label>
            <Input
              type="number"
              value={form.order}
              onChange={(e) => updateForm('order', parseInt(e.target.value))}
              min="0"
            />
          </div>

          <div className="flex items-center">
            <input
              type="checkbox"
              id="isActive"
              checked={form.isActive}
              onChange={(e) => updateForm('isActive', e.target.checked)}
              className="mr-2"
            />
            <label htmlFor="isActive" className="text-sm font-medium">
              Activo
            </label>
          </div>
        </div>

        <div className="mt-4">
          <label className="block text-sm font-medium mb-2">
            Descripción
          </label>
          <Textarea
            value={form.description}
            onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => updateForm('description', e.target.value)}
            placeholder="Descripción adicional"
            rows={3}
          />
        </div>

        <div className="flex gap-3 mt-6">
          <Button 
            onClick={handleSave}
            disabled={loading || !form.page || !form.key || !form.title}
          >
            {loading ? 'Guardando...' : (editingId ? 'Actualizar' : 'Crear')}
          </Button>
          
          {editingId && (
            <Button variant="outline" onClick={handleCancel}>
              Cancelar
            </Button>
          )}
        </div>
      </Card>

      {/* Lista de selectores */}
      <div className="grid gap-4">
        <h2 className="text-xl font-semibold">Selectores Existentes</h2>
        
        {selectors.length === 0 ? (
          <Card className="p-6 text-center text-gray-500">
            No hay selectores configurados
          </Card>
        ) : (
          selectors.map((selector) => (
            <Card key={selector.id} className="p-4">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="font-semibold">{selector.title}</h3>
                    <Badge variant="outline">{selector.page}</Badge>
                    <Badge variant="secondary">{selector.key}</Badge>
                    {!selector.isActive && (
                      <Badge variant="destructive">Inactivo</Badge>
                    )}
                  </div>
                  
                  {selector.subtitle && (
                    <p className="text-sm text-gray-600 mb-1">
                      {selector.subtitle}
                    </p>
                  )}
                  
                  {selector.description && (
                    <p className="text-sm text-gray-500">
                      {selector.description}
                    </p>
                  )}
                  
                  <p className="text-xs text-gray-400 mt-2">
                    Orden: {selector.order} | 
                    Creado: {new Date(selector.createdAt).toLocaleDateString()}
                  </p>
                </div>
                
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleEdit(selector)}
                    disabled={loading}
                  >
                    Editar
                  </Button>
                  <Button
                    size="sm"
                    variant="destructive"
                    onClick={() => handleDelete(selector.id)}
                    disabled={loading}
                  >
                    Eliminar
                  </Button>
                </div>
              </div>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}
