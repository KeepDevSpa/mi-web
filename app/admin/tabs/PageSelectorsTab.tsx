'use client';

import { useState, useEffect } from 'react';

export default function PageSelectorsTab() {
  const [selectors, setSelectors] = useState<any[]>([]);
  const [page, setPage] = useState('movil');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadSelectors();
  }, [page]);

  const loadSelectors = async () => {
    try {
      setLoading(true);
      const res = await fetch(`/api/admin/page-selectors?page=${page}`);
      const data = await res.json();
      // Ordenar por `order`
      setSelectors(data.sort((a, b) => a.order - b.order));
    } catch (error) {
      alert('Error cargando selectores');
    } finally {
      setLoading(false);
    }
  };

  const saveSelectors = async () => {
    try {
      await Promise.all(
        selectors.map((s) =>
          fetch('/api/admin/page-selectors', {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(s),
          })
        )
      );
      alert('Guardado correctamente');
    } catch (error) {
      alert('Error guardando selectores');
    }
  };

  const addSelector = () => {
    const newSelector = {
      page,
      key: '',
      title: '',
      subtitle: '',
      description: '',
      order: selectors.length + 1,
      isActive: true,
    };
    setSelectors([...selectors, newSelector]);
  };

  const updateSelector = (index: number, field: string, value: any) => {
    const newSelectors = [...selectors];
    newSelectors[index] = { ...newSelectors[index], [field]: value };
    setSelectors(newSelectors);
  };

  const removeSelector = (index: number) => {
    if (window.confirm('¿Eliminar este selector?')) {
      const newSelectors = [...selectors];
      newSelectors.splice(index, 1);
      setSelectors(newSelectors);
    }
  };

  const moveUp = (index: number) => {
    if (index === 0) return;
    const newSelectors = [...selectors];
    [newSelectors[index - 1], newSelectors[index]] = [newSelectors[index], newSelectors[index - 1]];
    // Actualizar el orden
    newSelectors.forEach((s, i) => (s.order = i + 1));
    setSelectors(newSelectors);
  };

  const moveDown = (index: number) => {
    if (index === selectors.length - 1) return;
    const newSelectors = [...selectors];
    [newSelectors[index + 1], newSelectors[index]] = [newSelectors[index], newSelectors[index + 1]];
    // Actualizar el orden
    newSelectors.forEach((s, i) => (s.order = i + 1));
    setSelectors(newSelectors);
  };

  if (loading) {
    return <p>Cargando selectores...</p>;
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Selectores de Página</h2>
        <div className="flex gap-4 items-center">
          <select
            value={page}
            onChange={(e) => setPage(e.target.value)}
            className="p-2 border border-gray-300 rounded"
          >
            <option value="movil">Móvil</option>
            <option value="fibra">Fibra</option>
            <option value="fibra-movil">Fibra-Móvil</option>
            <option value="empresa">Empresa</option>
          </select>
          <button onClick={addSelector} className="bg-green-600 text-white px-4 py-2 rounded">
            + Añadir Selector
          </button>
        </div>
      </div>

      <div className="space-y-4 mb-6">
        {selectors.map((s, index) => (
          <div
            key={s.id || index}
            className="border border-gray-300 rounded-lg p-4 bg-white shadow-sm"
          >
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium mb-1">Clave</label>
                <input
                  type="text"
                  value={s.key}
                  onChange={(e) => updateSelector(index, 'key', e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded text-sm"
                  placeholder="ej: basico, vip"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Título</label>
                <input
                  type="text"
                  value={s.title}
                  onChange={(e) => updateSelector(index, 'title', e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded text-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Subtítulo</label>
                <input
                  type="text"
                  value={s.subtitle}
                  onChange={(e) => updateSelector(index, 'subtitle', e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded text-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Descripción</label>
                <input
                  type="text"
                  value={s.description}
                  onChange={(e) => updateSelector(index, 'description', e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded text-sm"
                />
              </div>
              <div className="flex items-end space-x-2">
                <label className="flex items-center text-sm">
                  <input
                    type="checkbox"
                    checked={s.isActive}
                    onChange={(e) => updateSelector(index, 'isActive', e.target.checked)}
                    className="mr-2"
                  />
                  Activo
                </label>
                <button
                  onClick={() => removeSelector(index)}
                  className="text-red-600 hover:text-red-800 text-sm"
                >
                  ✕
                </button>
              </div>
            </div>

            <div className="flex space-x-2">
              <button
                onClick={() => moveUp(index)}
                disabled={index === 0}
                className="text-xs bg-gray-200 hover:bg-gray-300 px-2 py-1 rounded disabled:opacity-50"
              >
                ↑ Subir
              </button>
              <button
                onClick={() => moveDown(index)}
                disabled={index === selectors.length - 1}
                className="text-xs bg-gray-200 hover:bg-gray-300 px-2 py-1 rounded disabled:opacity-50"
              >
                ↓ Bajar
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-end">
        <button onClick={saveSelectors} className="bg-green-600 text-white px-6 py-2 rounded">
          Guardar Todo
        </button>
      </div>
    </div>
  );
}