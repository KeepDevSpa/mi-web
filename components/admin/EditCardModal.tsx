// components/admin/EditCardModal.tsx
import { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Plus, Trash2, Edit, Eye, EyeOff, Check, X,
  Percent, ArrowUpDown, Lock, Key, ShieldCheck, Info, HelpCircle, CheckCircle,
  XCircle, MinusCircle, FileText, Link, Hash, Palette, Grid3X3, List, RefreshCw
} from 'lucide-react';

// === INTERFACES ===
interface AdminDropdownOption {
  id: string;
  label: string;
  price: number;
  color?: 'gray' | 'green' | 'blue';
}

interface Extra {
  id: string;
  label: string;
  price: number;
  description?: string;
  isDropdown?: boolean;
  dropdownOptions?: AdminDropdownOption[];
}

interface SpeedOption {
  id: string;
  label: string;
  price: number;
  originalPrice?: number;
}

interface AdminPricingCard {
  id: string;
  name: string;
  page: string;
  currentPrice: number;
  originalPrice: number;
  variant: string;
  hasSpeedSelector: boolean;
  speeds: SpeedOption[];
  features: string[];
  extras: Extra[];
  extraOptionsCount?: number; // Debe ser number, no ?: number para coincidir con el schema y el modal
  showExtraDropdowns?: boolean; // Campo añadido
  isPopular: boolean;
  ctaText: string;
  rateTier: 1 | 2 | 3 | 4;
  isActive: boolean;
  isHeroOffer?: boolean; // Campo añadido
  createdAt: string;
  updatedAt: string;
}

interface EditCardModalProps {
  card: AdminPricingCard;
  onSave: (card: AdminPricingCard) => void;
  onClose: () => void;
}

export function EditCardModal({ card, onSave, onClose }: EditCardModalProps) {
  const [localCard, setLocalCard] = useState<AdminPricingCard>({
    ...card,
    // Asegura que isHeroOffer tenga un valor por defecto si no existe en 'card'
    isHeroOffer: card.isHeroOffer ?? false,
    extraOptionsCount: card.extraOptionsCount ?? -1, // Valor por defecto -1
    showExtraDropdowns: card.showExtraDropdowns ?? false, // Valor por defecto false
  });

  // Refs para nuevos extras y dropdowns
  const newExtraIdRef = useRef<HTMLInputElement>(null);
  const newExtraLabelRef = useRef<HTMLInputElement>(null);
  const newExtraPriceRef = useRef<HTMLInputElement>(null);
  const newExtraDescriptionRef = useRef<HTMLInputElement>(null);
  const newDropdownIdRef = useRef<HTMLInputElement>(null);
  const newDropdownNameRef = useRef<HTMLInputElement>(null);

  // --- Estados para gestionar velocidades ---
  const [speeds, setSpeeds] = useState<SpeedOption[]>(localCard.speeds || []);
  const [isEditingSpeed, setIsEditingSpeed] = useState<number | null>(null);
  const [editingSpeed, setEditingSpeed] = useState<SpeedOption | null>(null);

  // --- Estados para gestionar extras ---
  const [extras, setExtras] = useState<Extra[]>(localCard.extras || []);

  // --- Estados para gestionar dropdowns ---
  const [dropdowns, setDropdowns] = useState<{ id: string; label: string; price: number; color: string }[]>([]);
  const [selectedExtraForDropdown, setSelectedExtraForDropdown] = useState<string | null>(null);
  const [isConvertingToDropdown, setIsConvertingToDropdown] = useState<string | null>(null);

  // --- Manejadores para velocidades ---
  const addSpeed = () => {
    const newSpeed: SpeedOption = {
      id: `speed-${Date.now()}`,
      label: 'Nueva Velocidad',
      price: 0,
      originalPrice: 0,
    };
    setSpeeds([...speeds, newSpeed]);
  };

  const updateSpeed = (index: number, field: string, value: string | number) => {
    const updatedSpeeds = [...speeds];
    // @ts-ignore - TS no infiere bien el tipo dinámico aquí
    if (field === 'originalPrice' && typeof value === 'number') {
        updatedSpeeds[index].originalPrice = value;
    } else {
        // @ts-ignore
        updatedSpeeds[index][field] = value;
    }
    setSpeeds(updatedSpeeds);
  };

  const removeSpeed = (index: number) => {
    const updatedSpeeds = speeds.filter((_, i) => i !== index);
    setSpeeds(updatedSpeeds);
  };

  const startEditingSpeed = (index: number) => {
    setIsEditingSpeed(index);
    setEditingSpeed({ ...speeds[index] });
  };

  const saveEditingSpeed = () => {
    if (editingSpeed) {
      const updatedSpeeds = [...speeds];
      updatedSpeeds[isEditingSpeed!] = editingSpeed;
      setSpeeds(updatedSpeeds);
      setIsEditingSpeed(null);
      setEditingSpeed(null);
    }
  };

  const cancelEditingSpeed = () => {
    setIsEditingSpeed(null);
    setEditingSpeed(null);
  };

  // --- Manejadores para extras ---
  const addExtra = () => {
    const id = newExtraIdRef.current?.value || `extra-${Date.now()}`;
    const label = newExtraLabelRef.current?.value || 'Nuevo Extra';
    const price = parseFloat(newExtraPriceRef.current?.value || '0') || 0;
    const description = newExtraDescriptionRef.current?.value || '';

    if (!id || !label) return;

    const newExtra: Extra = {
      id,
      label,
      price,
      description,
    };

    setExtras([...extras, newExtra]);

    // Limpiar inputs
    if (newExtraIdRef.current) newExtraIdRef.current.value = '';
    if (newExtraLabelRef.current) newExtraLabelRef.current.value = '';
    if (newExtraPriceRef.current) newExtraPriceRef.current.value = '';
    if (newExtraDescriptionRef.current) newExtraDescriptionRef.current.value = '';
  };

const updateExtra = (index: number, field: string, value: string | number | boolean) => {
  setLocalCard(prev => {
    const updatedExtras = [...prev.extras];
    const extra = updatedExtras[index];
    
    // Manejar el caso especial de isDropdown
    if (field === 'isDropdown' && typeof value === 'boolean') {
      extra.isDropdown = value;
      // Si se marca como dropdown y no tiene opciones, inicializar
      if (value && !extra.dropdownOptions) {
        extra.dropdownOptions = [];
      }
    } else {
      // @ts-ignore - TS no infiere bien el tipo dinámico aquí
      extra[field] = value;
    }
    
    return {
      ...prev,
      extras: updatedExtras
    };
  });
};

  const removeExtra = (index: number) => {
    setLocalCard(prev => {
      const updatedExtras = prev.extras.filter((_, i) => i !== index);
      return {
        ...prev,
        extras: updatedExtras
      };
    });
  };

  // --- Manejadores para dropdowns ---
const addDropdownOption = (extraIndex: number) => {
  const id = newDropdownIdRef.current?.value || `dropdown-${Date.now()}`;
  const label = newDropdownNameRef.current?.value || 'Nueva Opción';
  const price = 0; // Precio por defecto

  if (!id || !label) return;

  setLocalCard(prev => {
    const updatedExtras = [...prev.extras];
    const extra = updatedExtras[extraIndex];
    
    // Asegurarse de que dropdownOptions exista
    if (!extra.dropdownOptions) {
      extra.dropdownOptions = [];
    }
    
    // Agregar la nueva opción
    extra.dropdownOptions.push({ 
      id, 
      label, 
      price,
      // Añade color si es parte de tu interfaz
      // color: 'gray' 
    });
    
    return {
      ...prev,
      extras: updatedExtras
    };
  });

  // Limpiar inputs
  if (newDropdownIdRef.current) newDropdownIdRef.current.value = '';
  if (newDropdownNameRef.current) newDropdownNameRef.current.value = '';
};

const updateDropdownOption = (extraIndex: number, optionIndex: number, field: string, value: string | number) => {
  setLocalCard(prev => {
    const updatedExtras = [...prev.extras];
    const extra = updatedExtras[extraIndex];
    
    // Asegurarse de que dropdownOptions exista
    if (!extra.dropdownOptions) {
      extra.dropdownOptions = [];
    }
    
    // Crear una copia de dropdownOptions para evitar mutaciones directas
    const updatedDropdownOptions = [...extra.dropdownOptions];
    
    // Actualizar el campo específico de la opción
    updatedDropdownOptions[optionIndex] = {
      ...updatedDropdownOptions[optionIndex],
      [field]: value
    };
    
    // Actualizar el extra con las nuevas opciones
    updatedExtras[extraIndex] = {
      ...extra,
      dropdownOptions: updatedDropdownOptions
    };
    
    return {
      ...prev,
      extras: updatedExtras
    };
  });
};

const removeDropdownOption = (extraIndex: number, optionIndex: number) => {
  setLocalCard(prev => {
    const updatedExtras = [...prev.extras];
    const extra = updatedExtras[extraIndex];
    
    // Verificar que dropdownOptions exista antes de intentar filtrar
    if (extra.dropdownOptions) {
      extra.dropdownOptions = extra.dropdownOptions.filter((_, i) => i !== optionIndex);
    }
    
    return {
      ...prev,
      extras: updatedExtras
    };
  });
};

  // --- Manejadores para convertir a dropdown configurable ---
  const convertToConfigurableDropdown = (extraId: string) => {
    const updatedExtras = [...extras];
    const extraIndex = updatedExtras.findIndex(extra => extra.id === extraId);
    if (extraIndex !== -1) {
      // Inicializa dropdownOptions si no existe
      if (!updatedExtras[extraIndex].dropdownOptions) {
        updatedExtras[extraIndex].dropdownOptions = [];
      }
      // Marca como dropdown
      updatedExtras[extraIndex].isDropdown = true;
    }
    setExtras(updatedExtras);
    setIsConvertingToDropdown(null);
  };

  // --- Manejadores para guardar y cerrar ---
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Crear un nuevo objeto con todos los datos actualizados
    const updatedCard = {
      ...localCard,
      speeds,
      extras,
    };

    // Enviar el objeto actualizado
    onSave(updatedCard);
  };

  const handleCancel = () => {
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center p-4 border-b">
          <h3 className="text-xl font-semibold">Editar: {localCard.name}</h3>
          <button onClick={handleCancel} className="text-gray-500 hover:text-gray-700">
            <X className="w-6 h-6" />
          </button>
        </div>
        <div className="p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Información Básica */}
            <div className="bg-blue-50 p-4 rounded-lg">
              <h4 className="font-semibold mb-3">📋 Información Básica</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Nombre del Plan</label>
                  <Input
                    value={localCard.name}
                    onChange={(e) => setLocalCard({ ...localCard, name: e.target.value })}
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Página</label>
                  <select
                    className="w-full p-2 border rounded"
                    value={localCard.page}
                    onChange={(e) => setLocalCard({ ...localCard, page: e.target.value })}
                  >
                    <option value="fibra">Fibra</option>
                    <option value="movil">Móvil</option>
                    <option value="fibra-movil">Fibra + Móvil</option>
                    <option value="alarma">Alarmas</option>
                    <option value="prisma-tv">Prisma TV</option>
                    <option value="cloud-storage">Cloud Storage</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Velocidades & Precios */}
            <div className="bg-yellow-50 p-4 rounded-lg">
              <div className="flex justify-between items-center mb-3">
                <h4 className="font-semibold">⚡ Velocidades & Precios</h4>
                <div className="flex items-center space-x-2">
                  <span className="text-xs font-medium text-gray-700">Con Selector de Velocidad</span>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => setLocalCard({ ...localCard, hasSpeedSelector: !localCard.hasSpeedSelector })}
                  >
                    {localCard.hasSpeedSelector ? 'Desactivar' : 'Activar'}
                  </Button>
                </div>
              </div>
              
              {localCard.hasSpeedSelector ? (
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium text-gray-700">Precio Base:</span>
                    <span className="text-green-600 font-bold">{localCard.currentPrice.toFixed(2)}€</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium text-gray-700">Precio Original:</span>
                    <span className="text-red-600 font-bold">{localCard.originalPrice.toFixed(2)}€</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium text-gray-700">Descuento:</span>
                    <span className="text-orange-600 font-bold">{((localCard.originalPrice - localCard.currentPrice) / localCard.originalPrice * 100).toFixed(0)}%</span>
                  </div>
                  
                  <div className="mt-4">
                    <Button type="button" onClick={addSpeed} variant="outline" size="sm">
                      <Plus className="w-4 h-4 mr-1" /> Añadir Velocidad
                    </Button>
                  </div>
                  
                  {speeds.map((speed, index) => (
                    <div key={index} className="flex flex-wrap gap-2 items-center p-2 bg-white border rounded">
                      <div className="flex-grow">
                        <label className="block text-xs font-medium mb-1">Etiqueta</label>
                        <Input
                          value={speed.label}
                          onChange={(e) => updateSpeed(index, 'label', e.target.value)}
                          className="text-xs"
                        />
                      </div>
                      <div className="flex-grow">
                        <label className="block text-xs font-medium mb-1">Precio (€)</label>
                        <Input
                          type="number"
                          step="0.01"
                          value={speed.price}
                          onChange={(e) => updateSpeed(index, 'price', parseFloat(e.target.value) || 0)}
                          className="text-xs w-20"
                        />
                      </div>
                      <div className="flex-grow">
                        <label className="block text-xs font-medium mb-1">Precio Original (€)</label>
                        <Input
                          type="number"
                          step="0.01"
                          value={speed.originalPrice || ''}
                          onChange={(e) => updateSpeed(index, 'originalPrice', parseFloat(e.target.value) || 0)}
                          className="text-xs w-20"
                        />
                      </div>
                      <Button type="button" onClick={() => removeSpeed(index)} variant="outline" size="sm" className="text-red-500">
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="p-4 bg-gray-100 rounded-lg">
                  <p className="text-sm text-gray-600">Esta tarjeta no tiene selector de velocidad.</p>
                </div>
              )}
            </div>

            {/* Características */}
            <div className="bg-purple-50 p-4 rounded-lg">
              <h4 className="font-semibold mb-3">✨ Características</h4>
              <div className="space-y-2">
                {localCard.features.map((feature, index) => (
                  <div key={index} className="flex items-center">
                    <Input
                      value={feature}
                      onChange={(e) => {
                        const updatedFeatures = [...localCard.features];
                        updatedFeatures[index] = e.target.value;
                        setLocalCard({ ...localCard, features: updatedFeatures });
                      }}
                      className="flex-grow"
                    />
                    <Button type="button" onClick={() => {
                      const updatedFeatures = localCard.features.filter((_, i) => i !== index);
                      setLocalCard({ ...localCard, features: updatedFeatures });
                    }} variant="outline" size="sm" className="ml-2 text-red-500">
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                ))}
                <Button type="button" onClick={() => {
                  const updatedFeatures = [...localCard.features, 'Nueva característica'];
                  setLocalCard({ ...localCard, features: updatedFeatures });
                }} variant="outline" size="sm" className="bg-green-600 hover:bg-green-700 text-white">
                  <Plus className="w-4 h-4 mr-1" /> Agregar Característica
                </Button>
              </div>
            </div>

            {/* Gestión de Dropdowns/Extras */}
            <div className="bg-indigo-50 p-4 rounded-lg">
              <h4 className="font-semibold mb-3">⚙️ Gestión de Dropdowns/Extras</h4>
              <div className="space-y-4">
                {extras.map((extra, extraIndex) => (
                  <div key={extraIndex} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex justify-between items-center mb-3">
                      <span className="font-medium">{extra.label}</span>
                      <Button type="button" onClick={() => removeExtra(extraIndex)} variant="outline" size="sm" className="text-red-500">
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                    
                    {/* ID, Etiqueta, Precio, Descripción */}
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-2 mb-4">
                      <div>
                        <label className="block text-xs font-medium mb-1">ID</label>
                        <Input
                          value={extra.id}
                          onChange={(e) => updateExtra(extraIndex, 'id', e.target.value)}
                          className="text-xs"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-medium mb-1">Etiqueta</label>
                        <Input
                          value={extra.label}
                          onChange={(e) => updateExtra(extraIndex, 'label', e.target.value)}
                          className="text-xs"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-medium mb-1">Precio (€)</label>
                        <Input
                          type="number"
                          step="0.01"
                          value={extra.price}
                          onChange={(e) => updateExtra(extraIndex, 'price', parseFloat(e.target.value) || 0)}
                          className="text-xs w-20"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-medium mb-1">Descripción</label>
                        <Input
                          value={extra.description || ''}
                          onChange={(e) => updateExtra(extraIndex, 'description', e.target.value)}
                          className="text-xs"
                        />
                      </div>
                    </div>

                    {/* Opciones del Dropdown */}
                    {extra.isDropdown && extra.dropdownOptions && (
                      <div className="mt-4">
                        <h5 className="text-sm font-medium mb-2">Opciones del Dropdown:</h5>
                        {extra.dropdownOptions.map((option, optionIndex) => (
                          <div key={optionIndex} className="flex flex-wrap gap-2 items-center p-2 bg-gray-50 rounded">
                            <div className="flex-grow">
                              <label className="block text-xs font-medium mb-1">ID</label>
                              <Input
                                value={option.id}
                                onChange={(e) => {
                                  const updatedDropdowns = [...(extra.dropdownOptions || [])];
                                  updatedDropdowns[optionIndex].id = e.target.value;
                                  const updatedExtras = [...extras];
                                  updatedExtras[extraIndex].dropdownOptions = updatedDropdowns;
                                  setExtras(updatedExtras);
                                }}
                                className="text-xs"
                              />
                            </div>
                            <div className="flex-grow">
                              <label className="block text-xs font-medium mb-1">Etiqueta</label>
                              <Input
                                value={option.label}
                                onChange={(e) => {
                                  const updatedDropdowns = [...extra.dropdownOptions];
                                  updatedDropdowns[optionIndex].label = e.target.value;
                                  const updatedExtras = [...extras];
                                  updatedExtras[extraIndex].dropdownOptions = updatedDropdowns;
                                  setExtras(updatedExtras);
                                }}
                                className="text-xs"
                              />
                            </div>
                            <div className="flex-grow">
                              <label className="block text-xs font-medium mb-1">Precio (€)</label>
                              <Input
                                type="number"
                                step="0.01"
                                value={option.price}
                                onChange={(e) => {
                                  const updatedDropdowns = [...extra.dropdownOptions];
                                  updatedDropdowns[optionIndex].price = parseFloat(e.target.value) || 0;
                                  const updatedExtras = [...extras];
                                  updatedExtras[extraIndex].dropdownOptions = updatedDropdowns;
                                  setExtras(updatedExtras);
                                }}
                                className="text-xs w-20"
                              />
                            </div>
                            <div className="flex-grow">
                              <label className="block text-xs font-medium mb-1">Color</label>
                              <select
                                className="w-full p-1 border rounded text-xs"
                                value={option.color || 'gray'}
                                onChange={(e) => {
                                  const updatedDropdowns = [...extra.dropdownOptions];
                                  updatedDropdowns[optionIndex].color = e.target.value as 'gray' | 'green' | 'blue';
                                  const updatedExtras = [...extras];
                                  updatedExtras[extraIndex].dropdownOptions = updatedDropdowns;
                                  setExtras(updatedExtras);
                                }}
                              >
                                <option value="gray">Gris</option>
                                <option value="green">Verde</option>
                                <option value="blue">Azul</option>
                              </select>
                            </div>
                            <Button type="button" onClick={() => removeDropdownOption(extraIndex, optionIndex)} variant="outline" size="sm" className="text-red-500">
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        ))}
                        
                        <div className="mt-3 p-2 bg-green-50 rounded border border-green-200">
                          <div className="flex items-center space-x-2 mb-2">
                            <Plus className="w-4 h-4 text-green-600" />
                            <span className="text-sm font-medium text-green-800">Agregar Nueva Opción</span>
                          </div>
                          <div className="grid grid-cols-1 md:grid-cols-4 gap-2">
                            <div>
                              <label className="block text-xs font-medium mb-1">ID de la opción</label>
                              <Input
                                ref={newDropdownIdRef}
                                placeholder="ID"
                                className="text-xs"
                              />
                            </div>
                            <div>
                              <label className="block text-xs font-medium mb-1">Etiqueta de la opción</label>
                              <Input
                                ref={newDropdownNameRef}
                                placeholder="Etiqueta"
                                className="text-xs"
                              />
                            </div>
                            <div>
                              <label className="block text-xs font-medium mb-1">Precio (€)</label>
                              <Input
                                type="number"
                                step="0.01"
                                placeholder="Precio"
                                className="text-xs w-20"
                              />
                            </div>
                            <div>
                              <label className="block text-xs font-medium mb-1">Color</label>
                              <select
                                className="w-full p-1 border rounded text-xs"
                                defaultValue="gray"
                              >
                                <option value="gray">Gris</option>
                                <option value="green">Verde</option>
                                <option value="blue">Azul</option>
                              </select>
                            </div>
                          </div>
                          <Button type="button" onClick={() => addDropdownOption(extraIndex)} variant="outline" size="sm" className="mt-2 bg-green-600 hover:bg-green-700 text-white">
                            Agregar Opción
                          </Button>
                        </div>
                      </div>
                    )}

                    {/* Convertir a Dropdown Configurable */}
                    {!extra.isDropdown && (
                      <div className="mt-4 p-3 bg-blue-50 rounded border border-blue-200">
                        <div className="flex items-center space-x-2 mb-2">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                          </svg>
                          <span className="text-sm font-medium text-blue-800">Convertir a Dropdown Configurable</span>
                        </div>
                        <p className="text-xs text-blue-700 mb-2">
                          Convierte este extra hardcodeado en un dropdown completamente editable:
                        </p>
                        <Button type="button" onClick={() => convertToConfigurableDropdown(extra.id)} variant="outline" size="sm" className="bg-blue-600 hover:bg-blue-700 text-white">
                          Convertir a Dropdown Configurable
                        </Button>
                      </div>
                    )}
                  </div>
                ))}

                <div className="flex items-center space-x-2">
                  <Button type="button" onClick={() => {
                    const newExtra: Extra = {
                      id: `extra-${Date.now()}`,
                      label: 'Nuevo Extra',
                      price: 0,
                      description: '',
                    };
                    setExtras([...extras, newExtra]);
                  }} variant="outline" size="sm" className="bg-green-600 hover:bg-green-700 text-white">
                    <Plus className="w-4 h-4 mr-1" /> Agregar Nuevo Extra
                  </Button>
                </div>
              </div>
            </div>

            {/* Botones de Acción */}
            <div className="flex justify-end space-x-3 pt-4">
              <Button type="button" onClick={handleCancel} variant="outline">
                Cancelar
              </Button>
              <Button type="submit">
                Guardar Cambios
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}