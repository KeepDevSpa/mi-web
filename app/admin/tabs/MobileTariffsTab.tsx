'use client';

import { useState, useEffect } from 'react';
import { PriceDisplay } from '@/components/ui/price-display';

export default function MobileTariffsTab() {
  const [tariffs, setTariffs] = useState<any[]>([]);
  const [editing, setEditing] = useState<any>(null);

  useEffect(() => {
    const load = async () => {
      try {
        const res = await fetch('/api/admin/mobile-tariffs');
        const data = await res.json();
        setTariffs(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error('Error cargando tarifas móviles:', error);
        alert('Error cargando tarifas móviles');
      }
    };
    load();
  }, []);

  const save = async () => {
    if (!editing) return;
    try {
      await fetch('/api/admin/mobile-tariffs', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editing),
      });
      setEditing(null);
      window.location.reload();
    } catch (error) {
      alert('Error guardando tarifa móvil');
    }
  };

  const addDataOption = () => {
    setEditing({
      ...editing,
      dataOptions: [...(editing.dataOptions || []), { id: `data-${Date.now()}`, label: '', price: 0 }],
    });
  };

  const addFeature = () => {
    setEditing({
      ...editing,
      features: [...(editing.features || []), ''],
    });
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Tarifas Móviles</h2>
        <button
          onClick={() =>
            setEditing({
              type: 'eleccion',
              name: 'Móvil',
              subtitle: '',
              dataAmount: '50 GB',
              price: 0,
              originalPrice: null,
              features: ['5G', 'Llamadas ilimitadas'],
              isPopular: false,
              isHighlighted: false,
              hasOperatorChoice: true,
              order: 1,
            })
          }
          className="bg-green-600 text-white px-4 py-2 rounded"
        >
          + Nueva Tarifa
        </button>
      </div>

      <table className="min-w-full bg-white border rounded-lg">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-sm font-medium">Nombre</th>
            <th className="px-6 py-3 text-left text-sm font-medium">Tipo</th>
            <th className="px-6 py-3 text-left text-sm font-medium">Precio</th>
            <th className="px-6 py-3 text-left text-sm font-medium">Destacada</th>
            <th className="px-6 py-3 text-left text-sm font-medium">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {tariffs.map((t) => (
            <tr key={t.id}>
              <td className="px-6 py-4">{t.name}</td>
              <td className="px-6 py-4">{t.type === 'vip' ? 'VIP' : 'Elección'}</td>
              <td className="px-6 py-4">
                <PriceDisplay price={t.price} size="sm" />
              </td>
              <td className="px-6 py-4">
                {t.isPopular ? (
                  <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded text-xs">Popular</span>
                ) : t.isHighlighted ? (
                  <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs">Destacada</span>
                ) : (
                  '—'
                )}
              </td>
              <td className="px-6 py-4">
                <button
                  onClick={() =>
                    setEditing({
                      ...t,
                      features: Array.isArray(t.features) ? t.features : [],
                      dataOptions: Array.isArray(t.dataOptions) ? t.dataOptions : [],
                    })
                  }
                  className="text-blue-600 mr-4"
                >
                  Editar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {editing && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg p-6 max-w-4xl w-full max-h-screen overflow-y-auto">
            <h3 className="text-xl font-bold mb-4">
              {editing.id?.includes('new-') ? 'Crear' : 'Editar'} Tarifa Móvil
            </h3>

            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Nombre del Plan</label>
                  <input
                    type="text"
                    value={editing.name || ''}
                    onChange={(e) => setEditing({ ...editing, name: e.target.value })}
                    className="w-full p-2 border border-gray-300 rounded"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Subtítulo (opcional)</label>
                  <input
                    type="text"
                    value={editing.subtitle || ''}
                    onChange={(e) => setEditing({ ...editing, subtitle: e.target.value })}
                    className="w-full p-2 border border-gray-300 rounded"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Tipo de Tarifa</label>
                  <div className="flex gap-4">
                    <label className="flex items-center">
                      <input
                        type="radio"
                        checked={editing.type === 'eleccion'}
                        onChange={() => setEditing({ ...editing, type: 'eleccion' })}
                        className="mr-2"
                      />
                      Elección
                    </label>
                    <label className="flex items-center">
                      <input
                        type="radio"
                        checked={editing.type === 'vip'}
                        onChange={() => setEditing({ ...editing, type: 'vip' })}
                        className="mr-2"
                      />
                      VIP
                    </label>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Cantidad de Datos</label>
                  <input
                    type="text"
                    value={editing.dataAmount || ''}
                    onChange={(e) => setEditing({ ...editing, dataAmount: e.target.value })}
                    className="w-full p-2 border border-gray-300 rounded"
                    placeholder="ej: 50 GB, Ilimitada"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Precio Base (€)</label>
                  <div className="flex items-center gap-4">
                    <input
                      type="number"
                      step="0.01"
                      value={editing.price || ''}
                      onChange={(e) => setEditing({ ...editing, price: parseFloat(e.target.value) || 0 })}
                      className="flex-1 p-2 border border-gray-300 rounded"
                    />
                    <div className="flex-shrink-0">
                      <PriceDisplay price={editing.price || 0} size="md" />
                    </div>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Precio Original (€)</label>
                  <input
                    type="number"
                    step="0.01"
                    value={editing.originalPrice || ''}
                    onChange={(e) =>
                      setEditing({
                        ...editing,
                        originalPrice: e.target.value ? parseFloat(e.target.value) : null,
                      })
                    }
                    className="w-full p-2 border border-gray-300 rounded"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Orden</label>
                  <input
                    type="number"
                    value={editing.order || 1}
                    onChange={(e) => setEditing({ ...editing, order: parseInt(e.target.value) })}
                    className="w-full p-2 border border-gray-300 rounded"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Características</label>
                <div className="space-y-2 mb-2">
                  {(editing.features || []).map((feature: string, i: number) => (
                    <div key={i} className="flex gap-2">
                      <input
                        value={feature || ''}
                        onChange={(e) => {
                          const newFeatures = [...(editing.features || [])];
                          newFeatures[i] = e.target.value;
                          setEditing({ ...editing, features: newFeatures });
                        }}
                        placeholder="Característica"
                        className="w-full p-2 border border-gray-300 rounded"
                      />
                    </div>
                  ))}
                </div>
                <button onClick={addFeature} className="text-sm bg-blue-600 text-white px-3 py-1 rounded">
                  + Añadir Característica
                </button>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="isPopular"
                    checked={editing.isPopular || false}
                    onChange={(e) => setEditing({ ...editing, isPopular: e.target.checked })}
                  />
                  <label htmlFor="isPopular" className="text-sm">
                    ¿Es popular?
                  </label>
                </div>
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="isHighlighted"
                    checked={editing.isHighlighted || false}
                    onChange={(e) => setEditing({ ...editing, isHighlighted: e.target.checked })}
                  />
                  <label htmlFor="isHighlighted" className="text-sm">
                    ¿Está destacada?
                  </label>
                </div>
              </div>

              {editing.type === 'eleccion' && (
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="hasOperatorChoice"
                    checked={editing.hasOperatorChoice !== false}
                    onChange={(e) => setEditing({ ...editing, hasOperatorChoice: e.target.checked })}
                  />
                  <label htmlFor="hasOperatorChoice" className="text-sm">
                    ¿Permite elección de operador?
                  </label>
                </div>
              )}
            </div>

            <div className="flex gap-3 mt-6">
              <button onClick={save} className="bg-green-600 text-white px-4 py-2 rounded">
                Guardar
              </button>
              <button
                onClick={() => setEditing(null)}
                className="bg-gray-300 px-4 py-2 rounded"
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}