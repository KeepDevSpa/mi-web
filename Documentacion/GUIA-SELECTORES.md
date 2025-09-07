# Sistema de Selectores de Página - Guía Completa

## 📋 Descripción General

El sistema de selectores de página permite crear y administrar botones de selección dinámicos en las páginas de Prisma Móvil. Los usuarios pueden cambiar entre diferentes categorías de contenido (como "Planes Básicos" vs "Planes Premium") y ver tarjetas de precios filtradas según su selección.

## 🏗️ Arquitectura del Sistema

### Componentes Principales

1. **Base de Datos**
   - `PageSelector`: Modelo que almacena los selectores
   - `PricingCard`: Extendido con campo `selectorKey` para filtrado

2. **API**
   - `/api/admin/page-selectors`: CRUD para selectores
   - `/api/admin/cards`: Extendida para filtrar por página y selector

3. **Hook Personalizado**
   - `usePageSelectors`: Gestiona estado y lógica de selectores

4. **Componentes UI**
   - `PageSelectorsAdmin`: Panel de administración
   - Páginas actualizadas: `movil`, `fibra-movil`

## 🚀 Cómo Usar el Sistema

### 1. Administrar Selectores

**Acceder al Panel:**
```
http://localhost:3003/admin/page-selectors
```

**Campos del Selector:**
- **Página**: En qué página aparece (`movil`, `fibra-movil`, etc.)
- **Clave única**: Identificador interno (`basico`, `premium`, `vip`)
- **Título**: Texto del botón ("Planes Básicos")
- **Subtítulo**: Texto secundario opcional ("Para uso moderado")
- **Descripción**: Información adicional
- **Orden**: Posición en la interfaz
- **Activo**: Si el selector está visible

### 2. Asociar Tarjetas con Selectores

Para que las tarjetas aparezcan al seleccionar una opción:

1. Edita una tarjeta existente en `/admin`
2. Asigna el campo `selectorKey` con la clave del selector
3. Las tarjetas sin `selectorKey` aparecen en el selector por defecto

### 3. Implementar en Páginas

**Ejemplo básico:**
```tsx
import { usePageSelectors } from '@/lib/hooks/usePageSelectors';

export default function MiPagina() {
  const {
    selectors,
    selectedKey, 
    filteredCards,
    handleSelectorChange,
    getSelectorButtonClass
  } = usePageSelectors('mi-pagina');

  return (
    <div>
      {/* Botones de selección */}
      {selectors.map(selector => (
        <button
          key={selector.key}
          onClick={() => handleSelectorChange(selector.key)}
          className={getSelectorButtonClass(selector.key)}
        >
          <div>
            <div className="font-semibold">{selector.title}</div>
            {selector.subtitle && (
              <div className="text-sm opacity-90">{selector.subtitle}</div>
            )}
          </div>
        </button>
      ))}

      {/* Tarjetas filtradas */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {filteredCards.map(card => (
          <PricingCard key={card.id} {...card} />
        ))}
      </div>
    </div>
  );
}
```

## 🛠️ Configuración Inicial

### 1. Estructura de Base de Datos

El modelo `PageSelector` se agrega al schema de Prisma:

```prisma
model PageSelector {
  id          String   @id @default(cuid())
  page        String   // Página donde aparece
  key         String   // Clave única
  title       String   // Título del botón
  subtitle    String?  // Subtítulo opcional
  description String?  // Descripción
  order       Int      @default(0)
  isActive    Boolean  @default(true)
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt

  @@unique([page, key])
}
```

### 2. Scripts de Población

Ejecutar para crear datos iniciales:
```bash
node scripts/insert-selectors.js
```

## 📊 Ejemplos de Uso

### Página Móvil con 2 Selectores

```javascript
// Selectores creados en admin
{
  page: 'movil',
  key: 'basico',
  title: 'Planes Básicos',
  subtitle: 'Para uso moderado'
}

{
  page: 'movil', 
  key: 'premium',
  title: 'Planes Premium',
  subtitle: 'Para usuarios intensivos'
}
```

### Página Fibra-Móvil con 3 Selectores

```javascript
// Ya implementado en la página actual
{
  page: 'fibra-movil',
  key: 'fibra',
  title: 'Velocidad Fibra Óptica',
  subtitle: 'Fibra sin límites'
}

{
  page: 'fibra-movil',
  key: 'contenido', 
  title: 'Selección Contenido',
  subtitle: 'Máximo contenido más flexibilidad'
}

{
  page: 'fibra-movil',
  key: 'vip',
  title: 'Selección Fibra Óptica VIP',
  subtitle: 'Máximo Fibra Óptica premium'
}
```

## 🔧 Características Técnicas

### Hook `usePageSelectors`

**Parámetros:**
- `page`: Nombre de la página para filtrar selectores

**Retorna:**
- `selectors`: Array de selectores activos
- `selectedKey`: Selector actualmente seleccionado
- `filteredCards`: Tarjetas filtradas por el selector
- `loading`: Estado de carga
- `error`: Mensajes de error
- `handleSelectorChange`: Función para cambiar selector
- `getSelectorButtonClass`: Clases CSS para botones
- `refetch`: Función para recargar datos

### Filtrado de Tarjetas

```javascript
// Lógica de filtrado en el hook
const getFilteredCards = () => {
  if (!selectedKey) return [];
  
  return allCards.filter(card => {
    // Tarjetas con selectorKey específico
    return card.selectorKey === selectedKey || 
           // Tarjetas sin selectorKey (aparecen en selector por defecto)
           (!card.selectorKey && selectedKey === (selectors[0]?.key || ''));
  }).sort((a, b) => a.rateTier - b.rateTier);
};
```

## 🎨 Personalización UI

### Estilos de Botones

```javascript
const getSelectorButtonClass = (key) => {
  const baseClass = "px-6 py-3 rounded-full font-medium transition-colors cursor-pointer text-center";
  const activeClass = "bg-green-600 text-white hover:bg-green-700";
  const inactiveClass = "bg-gray-200 text-gray-700 hover:bg-gray-300";
  
  return `${baseClass} ${selectedKey === key ? activeClass : inactiveClass}`;
};
```

### Layout Responsivo

```tsx
{/* Botones adaptables */}
<div className="flex flex-wrap justify-center gap-4 mb-8">
  {selectors.map(selector => (
    <button key={selector.key} /* ... */ >
      <div className="text-center">
        <div className="font-semibold">{selector.title}</div>
        {selector.subtitle && (
          <div className="text-sm opacity-90">{selector.subtitle}</div>
        )}
      </div>
    </button>
  ))}
</div>
```

## 🚨 Mejores Prácticas

### 1. Naming Conventions

- **Keys de Selectors**: Usar kebab-case (`basico`, `premium`, `fibra-optica`)
- **Títulos**: Descriptivos y claros ("Planes Básicos")
- **Páginas**: Coincidir con rutas de Next.js (`movil`, `fibra-movil`)

### 2. Gestión de Estado

- El hook maneja automáticamente la selección por defecto
- Usar `loading` y `error` para UX adecuada
- `refetch()` para actualizar datos tras cambios en admin

### 3. Mantenimiento

- Revisar selectores inactivos periódicamente
- Mantener coherencia en orden y estilos
- Probar filtrado de tarjetas tras cambios

## 🐛 Resolución de Problemas

### Problema: No aparecen tarjetas
**Solución:** Verificar que las tarjetas tengan `selectorKey` asignado y que coincida con la clave del selector.

### Problema: Selector no funciona
**Solución:** Comprobar que el selector esté activo (`isActive: true`) y que la página coincida.

### Problema: Error 404 en API
**Solución:** Verificar que las rutas de API estén creadas y que el servidor esté ejecutándose.

## 📈 Métricas y Analytics

El sistema puede extenderse para tracking:

```javascript
// Ejemplo de tracking de selecciones
const handleSelectorChange = (key) => {
  setSelectedKey(key);
  
  // Analytics opcional
  if (typeof gtag !== 'undefined') {
    gtag('event', 'selector_change', {
      page: page,
      selector: key,
      timestamp: new Date().toISOString()
    });
  }
};
```

## 🔄 Actualización y Migración

### Migrar Páginas Existentes

1. Convertir página de SSR a CSR (`'use client'`)
2. Importar y usar el hook `usePageSelectors`
3. Reemplazar datos estáticos con datos dinámicos
4. Crear selectores iniciales en admin

### Extender a Nuevas Páginas

1. Crear selectores en `/admin/page-selectors`
2. Asignar `selectorKey` a tarjetas existentes
3. Implementar hook en la nueva página
4. Probar filtrado y funcionalidad

---

## 🎯 Resumen

El sistema de selectores de página proporciona:

- ✅ **Administración visual** sin necesidad de código
- ✅ **Filtrado dinámico** de contenido
- ✅ **UI consistente** y responsive
- ✅ **Extensibilidad** a nuevas páginas
- ✅ **Mantenimiento sencillo** desde el admin

Este sistema elimina la necesidad de hardcodear selectores en componentes y permite que los administradores gestionen el contenido dinámicamente.
