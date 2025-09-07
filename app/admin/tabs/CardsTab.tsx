'use client';

import { useState, useEffect } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { PriceDisplay } from '@/components/ui/price-display';

export default function CardsTab() {
  const [activeTab, setActiveTab] = useState('fixed');
  const [cards, setCards] = useState<any[]>([]);
  const [editing, setEditing] = useState<any>(null);
  const [mobileTariffs, setMobileTariffs] = useState<any[]>([]);
  const [editingMobile, setEditingMobile] = useState<any>(null);

  useEffect(() => {
    const loadCards = async () => {
      try {
        const res = await fetch('/api/admin/cards');
        const data = await res.json();
        setCards(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error('Error cargando tarifas fijas:', error);
        alert('Error cargando tarifas fijas');
      }
    };
    
    const loadMobile = async () => {
      try {
        const res = await fetch('/api/admin/mobile-tariffs');
        const data = await res.json();
        setMobileTariffs(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error('Error cargando tarifas móviles:', error);
        alert('Error cargando tarifas móviles');
      }
    };
    
    loadCards();
    loadMobile();
  }, []);

  // Guardar tarifa fija
  const saveCard = async () => {
    if (!editing) return;
    try {
      const method = editing.id?.startsWith('new-') || !editing.id ? 'POST' : 'PUT';
      const url = '/api/admin/cards';

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editing),
      });

      if (response.ok) {
        setEditing(null);
        window.location.reload();
      } else {
        const errorData = await response.json();
        alert(`Error: ${errorData.error || 'No se pudo guardar'}`);
      }
    } catch (error) {
      console.error('Error saving card:', error);
      alert('Error de red al guardar la tarifa.');
    }
  };
  
  // Guardar tarifa móvil
  const saveMobile = async () => {
    if (!editingMobile) return;
    try {
      await fetch('/api/admin/mobile-tariffs', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editingMobile),
      });
      setEditingMobile(null);
      window.location.reload();
    } catch (error) {
      alert('Error guardando tarifa móvil');
    }
  };

  const addSpeed = () => {
    setEditing({
      ...editing,
      speeds: [...(editing.speeds || []), { id: `speed-${Date.now()}`, label: '', price: 0 }],
    });
  };

  const addFeature = () => {
    setEditing({
      ...editing,
      features: [...(editing.features || []), ''],
    });
  };

  const addExtra = () => {
    setEditing({
      ...editing,
      extras: [...(editing.extras || []), { id: `extra-${Date.now()}`, label: '', price: 0 }],
    });
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Tarifas</h2>
        <button
          onClick={() =>
            setEditing({
              id: `new-${Date.now()}`,
              name: 'Nueva Tarifa',
              page: 'movil',
              currentPrice: 0,
              originalPrice: null,
              variant: 'blue',
              hasSpeedSelector: false,
              speeds: [],
              features: [],
              extras: [],
              isPopular: false,
              isHeroOffer: false, // ✅ Añadido
              ctaText: 'Contratar ahora',
              selectorKey: null,
              operator: null,
              hasOperatorChoice: false,
              isPremium: false,
              isVIP: false,
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
            <th className="px-6 py-3 text-left text-sm font-medium">Página</th>
            <th className="px-6 py-3 text-left text-sm font-medium">Precio</th>
            <th className="px-6 py-3 text-left text-sm font-medium">Destacada</th>
            <th className="px-6 py-3 text-left text-sm font-medium">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {cards.map((card) => (
            <tr key={card.id}>
              <td className="px-6 py-4">{card.name}</td>
              <td className="px-6 py-4">{card.page}</td>
              <td className="px-6 py-4">{card.currentPrice}€</td>
              <td className="px-6 py-4">
                {card.isPopular ? (
                  <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded text-xs">Popular</span>
                ) : (
                  '—'
                )}
              </td>
              <td className="px-6 py-4">
                {card.isHeroOffer ? (
                  <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs">Hero</span>
                ) : (
                  '—'
                )}
              </td>
              <td className="px-6 py-4">
                <button
                  onClick={() => setEditing({
                    ...card,
                    speeds: Array.isArray(card.speeds) ? card.speeds : [],
                    features: Array.isArray(card.features) ? card.features : [],
                    extras: Array.isArray(card.extras) ? card.extras : [],
                  })}
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
              {editing.id?.includes('new-') ? 'Crear' : 'Editar'} Tarifa
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
                  <label className="block text-sm font-medium mb-1">Página</label>
                  <select
                    value={editing.page || 'movil'}
                    onChange={(e) => setEditing({ ...editing, page: e.target.value })}
                    className="w-full p-2 border border-gray-300 rounded"
                  >
                    <option value="movil">Móvil</option>
                    <option value="fibra">Fibra</option>
                    <option value="fibra-movil">Fibra-Móvil</option>
                    <option value="empresa">Empresa</option>
                    <option value="home">Home</option>
                    <option value="prisma-tv">PrismaTV</option>
                    <option value="seguridad">VIP</option>
                    <option value="energia">Otros</option>

                  </select>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Precio Base (€)</label>
                  <input
                    type="number"
                    step="0.01"
                    value={editing.currentPrice || ''}
                    onChange={(e) => setEditing({ ...editing, currentPrice: parseFloat(e.target.value) || 0 })}
                    className="w-full p-2 border border-gray-300 rounded"
                  />
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
                  <label className="block text-sm font-medium mb-1">Variante</label>
                  <select
                    value={editing.variant || 'blue'}
                    onChange={(e) => setEditing({ ...editing, variant: e.target.value })}
                    className="w-full p-2 border border-gray-300 rounded"
                  >
                    <option value="blue">Azul Prisma</option>
                    <option value="lightgreen">Verde Claro</option>
                    <option value="golden">Dorado</option>
                    <option value="dark">Oscuro</option>
                    <option value="purple">Púrpura</option>
                    <option value="premium">Premium</option>
                    <option value="vodafone">🔴 Vodafone (Rojo)</option>
                    <option value="orange">🟠 Orange (Naranja)</option>
                    <option value="movistar">🔵 Movistar (Azul Oscuro)</option>
                  </select>
                </div>
              </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Velocidades</label>
                  <div className="flex items-center mb-2">
                    <input
                      type="checkbox"
                      id="hasSpeedSelector"
                      checked={editing.hasSpeedSelector || false}
                      onChange={(e) =>
                        setEditing({ ...editing, hasSpeedSelector: e.target.checked })
                      }
                      className="mr-2"
                    />
                    <label htmlFor="hasSpeedSelector" className="text-sm">
                      ¿Tiene selector de velocidad?
                    </label>
                  </div>
                  {editing.hasSpeedSelector && (
                    <div className="space-y-2 mb-2">
                      {(editing.speeds || []).map((speed: any, i: number) => (
                        <div key={speed.id || i} className="flex gap-2">
                          <input
                            placeholder="Etiqueta"
                            value={speed.label || ''}
                            onChange={(e) => {
                              const newSpeeds = [...(editing.speeds || [])];
                              newSpeeds[i].label = e.target.value;
                              setEditing({ ...editing, speeds: newSpeeds });
                            }}
                            className="flex-1 p-2 border border-gray-300 rounded"
                          />
                          <input
                            type="number"
                            placeholder="Precio"
                            value={speed.price || ''}
                            onChange={(e) => {
                              const newSpeeds = [...(editing.speeds || [])];
                              newSpeeds[i].price = parseFloat(e.target.value) || 0;
                              setEditing({ ...editing, speeds: newSpeeds });
                            }}
                            className="w-32 p-2 border border-gray-300 rounded"
                          />
                          <button 
                            onClick={() => {
                              const newSpeeds = [...(editing.speeds || [])];
                              newSpeeds.splice(i, 1);
                              setEditing({ ...editing, speeds: newSpeeds });
                            }}
                            className="bg-red-600 text-white p-2 rounded"
                            title="Eliminar velocidad"
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                              <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                            </svg>
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                  <button onClick={addSpeed} className="text-sm bg-blue-600 text-white px-3 py-1 rounded">
                    + Añadir Velocidad
                  </button>
                </div>              <div>
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
                      <button 
                        onClick={() => {
                          const newFeatures = [...(editing.features || [])];
                          newFeatures.splice(i, 1);
                          setEditing({ ...editing, features: newFeatures });
                        }}
                        className="bg-red-600 text-white p-2 rounded"
                        title="Eliminar característica"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                        </svg>
                      </button>
                    </div>
                  ))}
                </div>
                <button
                  onClick={addFeature}
                  className="text-sm bg-blue-600 text-white px-3 py-1 rounded"
                >
                  + Añadir Característica
                </button>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Extras</label>
                <div className="space-y-2 mb-2">
                  {(editing.extras || []).map((extra: any, i: number) => (
                    <div key={extra.id || i} className="flex gap-2">
                      <input
                        placeholder="Nombre"
                        value={extra.label || ''}
                        onChange={(e) => {
                          const newExtras = [...(editing.extras || [])];
                          newExtras[i].label = e.target.value;
                          setEditing({ ...editing, extras: newExtras });
                        }}
                        className="flex-1 p-2 border border-gray-300 rounded"
                      />
                      <input
                        type="number"
                        placeholder="Precio"
                        value={extra.price || ''}
                        onChange={(e) => {
                          const newExtras = [...(editing.extras || [])];
                          newExtras[i].price = parseFloat(e.target.value) || 0;
                          setEditing({ ...editing, extras: newExtras });
                        }}
                        className="w-32 p-2 border border-gray-300 rounded"
                      />
                      <button 
                        onClick={() => {
                          const newExtras = [...(editing.extras || [])];
                          newExtras.splice(i, 1);
                          setEditing({ ...editing, extras: newExtras });
                        }}
                        className="bg-red-600 text-white p-2 rounded"
                        title="Eliminar extra"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                        </svg>
                      </button>
                    </div>
                  ))}
                </div>
                <button onClick={addExtra} className="text-sm bg-blue-600 text-white px-3 py-1 rounded">
                  + Añadir Extra
                </button>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Texto del Botón</label>
                  <input
                    type="text"
                    value={editing.ctaText || 'Contratar ahora'}
                    onChange={(e) => setEditing({ ...editing, ctaText: e.target.value })}
                    className="w-full p-2 border border-gray-300 rounded"
                  />
                </div>
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
                    id="isHeroOffer"
                    checked={editing.isHeroOffer || false}
                    onChange={(e) => setEditing({ ...editing, isHeroOffer: e.target.checked })}
                  />
                  <label htmlFor="isHeroOffer" className="text-sm">
                    ¿Es Hero Offer?
                  </label>
                </div>
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="isPremium"
                    checked={editing.isPremium || false}
                    onChange={(e) => setEditing({ ...editing, isPremium: e.target.checked })}
                  />
                  <label htmlFor="isPremium" className="text-sm">
                    ¿Es Premium?
                  </label>
                </div>
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="isVIP"
                    checked={editing.isVIP || false}
                    onChange={(e) => setEditing({ ...editing, isVIP: e.target.checked })}
                  />
                  <label htmlFor="isVIP" className="text-sm">
                    ¿Es VIP?
                  </label>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Clave del Selector</label>
                  <input
                    type="text"
                    value={editing.selectorKey || ''}
                    onChange={(e) => setEditing({ ...editing, selectorKey: e.target.value })}
                    className="w-full p-2 border border-gray-300 rounded"
                    placeholder="ej: fibra, contenido, vip"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Operador</label>
                  <div className="flex items-center mb-2">
                    <input
                      type="checkbox"
                      id="hasOperatorChoice"
                      checked={editing.hasOperatorChoice || false}
                      onChange={(e) =>
                        setEditing({ ...editing, hasOperatorChoice: e.target.checked })
                      }
                      className="mr-2"
                    />
                    <label htmlFor="hasOperatorChoice" className="text-sm">
                      ¿Permite elegir operador?
                    </label>
                  </div>
                  <select
                    value={editing.operator || ''}
                    onChange={(e) => setEditing({ ...editing, operator: e.target.value || null })}
                    className="w-full p-2 border border-gray-300 rounded"
                    disabled={!editing.hasOperatorChoice}
                  >
                    <option value="">Selecciona un operador</option>
                    <option value="vodafone">Vodafone</option>
                    <option value="orange">Orange</option>
                    <option value="movistar">Movistar</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="flex gap-3 mt-6">
              <button onClick={saveCard} className="bg-green-600 text-white px-4 py-2 rounded">
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