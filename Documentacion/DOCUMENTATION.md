/**
 * @fileoverview Guía Completa de Documentación - Prisma Móvil v5.2
 * 
 * Esta guía proporciona información completa sobre la estructura,
 * funcionamiento y mantenimiento de la aplicación Prisma Móvil.
 * 
 * @author Prisma Móvil Team
 * @version 5.2.0
 * @date 2025-09-01
 */

# 📚 Guía Completa de Documentación
## Prisma Móvil v5.2

### 🏗️ ARQUITECTURA DEL PROYECTO

```
prisma-movil-v5.2/
├── 📱 app/                          # Next.js App Router
│   ├── 🏠 (root)/
│   │   ├── page.tsx                 # Página principal
│   │   ├── layout.tsx              # Layout raíz con seguridad
│   │   └── globals.css             # Estilos globales
│   ├── 📄 [páginas]/
│   │   ├── fibra/                  # Página de fibra óptica
│   │   ├── movil/                  # Página de móvil
│   │   ├── fibra-movil/            # Página combinada
│   │   ├── empresa/                # Página corporativa
│   │   ├── seguridad/               # Página de seguridad integral
│   │   ├── energia/                # Página de energía
│   │   ├── faq/                    # Preguntas frecuentes
│   │   ├── admin/                  # Panel de administración
│   │   └── componentes-demo/       # Demo de componentes
│   └── 🔌 api/                     # API Routes
│       └── admin/                  # Endpoints del admin
├── 🧩 components/                   # Componentes React
│   ├── ui/                         # Componentes de UI base
│   ├── security-provider.tsx       # Proveedor de seguridad
│   ├── error-boundary.tsx         # Boundary de errores
│   ├── header.tsx                 # Navegación principal
│   ├── footer.tsx                 # Pie de página
│   └── coverage-check.tsx         # Formulario de cobertura
├── 🛠️ lib/                        # Utilidades y configuración
│   ├── prisma.ts                  # Cliente de base de datos
│   ├── error-manager.ts           # Sistema de errores
│   ├── types.ts                   # Definiciones TypeScript
│   └── [configs]/                 # Configuraciones específicas
├── 🗄️ prisma/                     # Esquema de base de datos
│   ├── schema.prisma              # Definición del esquema
│   ├── dev.db                     # Base de datos SQLite
│   └── migrations/                # Historial de migraciones
├── 📊 public/                      # Recursos estáticos
│   ├── images/                    # Imágenes
│   ├── icons/                     # Iconos
│   └── [assets]/                  # Otros recursos
└── 📋 scripts/                     # Scripts de utilidad
    └── seed-cards.ts              # Seed de base de datos
```

---

## 🧭 COMPONENTES PRINCIPALES

### 🔒 SecurityProvider (`components/security-provider.tsx`)
**Propósito**: Protección del lado cliente contra acceso no autorizado

**Características**:
- ✅ Deshabilitación de clic derecho
- ✅ Bloqueo de teclas de desarrollador (F12, Ctrl+Shift+I, etc.)
- ✅ Prevención de selección de texto
- ✅ Detección de herramientas de desarrollador
- ✅ Logging de eventos de seguridad

**Uso**:
```tsx
<SecurityProvider
  disableRightClick={true}
  disableDevTools={true}
  disableF12={true}
  enableSecurityLogging={true}
>
  {children}
</SecurityProvider>
```

### 🚨 ErrorBoundary (`components/error-boundary.tsx`)
**Propósito**: Captura y manejo de errores de React

**Características**:
- ✅ Captura errores durante renderizado
- ✅ UI de fallback personalizada
- ✅ Logging estructurado
- ✅ Integración con ErrorManager
- ✅ Información detallada para desarrollo

**Uso**:
```tsx
<ErrorBoundary showErrorDetails={process.env.NODE_ENV === 'development'}>
  <ComponenteConPosiblesErrores />
</ErrorBoundary>
```

### 📊 ErrorManager (`lib/error-manager.ts`)
**Propósito**: Sistema centralizado de manejo de errores

**Características**:
- ✅ Categorización por tipo y severidad
- ✅ Captura de errores de base de datos
- ✅ Logging estructurado
- ✅ Limpieza automática de logs
- ✅ Estadísticas de errores

**Uso**:
```typescript
import { errorManager, ErrorType, ErrorSeverity } from '@/lib/error-manager'

// Capturar error básico
errorManager.captureError(
  new Error('Algo salió mal'),
  ErrorType.API,
  ErrorSeverity.MEDIUM
)

// Capturar error de base de datos
errorManager.captureDatabaseError(error, 'getUserData', { userId: 123 })
```

### 🗄️ Prisma Client (`lib/prisma.ts`)
**Propósito**: Cliente de base de datos con manejo de errores

**Características**:
- ✅ Configuración optimizada para desarrollo/producción
- ✅ Logging configurado por entorno
- ✅ Manejo de errores integrado
- ✅ Función wrapper segura para operaciones

**Uso**:
```typescript
import { prisma, safePrismaOperation } from '@/lib/prisma'

// Operación directa
const users = await prisma.user.findMany()

// Operación segura con manejo de errores
const users = await safePrismaOperation(
  () => prisma.user.findMany(),
  { operation: 'getUsersList', model: 'User' }
)
```

---

## 🎨 SISTEMA DE COMPONENTES ADMIN

### Componentes Disponibles
1. **Hero**: Secciones principales con banners
2. **PricingCards**: Tarjetas de precios dinámicas
3. **InformationCards**: Tarjetas informativas
4. **ContentBlocks**: Bloques de contenido flexible
5. **FAQ**: Sistema de preguntas frecuentes
6. **CoverageCheck**: Formulario de verificación de cobertura

### Ubicaciones de Demo
- **Página completa**: `/componentes-demo`
- **Hero**: `/seguridad`
- **PricingCards**: `/fibra`
- **InformationCards**: `/empresa`
- **ContentBlocks**: `/energia`
- **FAQ**: `/faq`
- **CoverageCheck**: Global en todas las páginas

---

## 🛡️ MEDIDAS DE SEGURIDAD IMPLEMENTADAS

### Frontend
- ✅ **Deshabilitación de DevTools**: F12, Inspect Element, etc.
- ✅ **Protección de contenido**: Clic derecho, selección de texto
- ✅ **Monitoreo de seguridad**: Logging de intentos de acceso
- ✅ **Error Boundary**: Captura de errores de React
- ✅ **Headers HTTP**: CSP, HSTS, X-Frame-Options, etc.

### Backend
- ✅ **Prisma ORM**: Prevención de SQL Injection
- ✅ **Validación de tipos**: TypeScript strict mode
- ✅ **Logging estructurado**: Sistema de errores centralizado
- ✅ **Redirects de seguridad**: Bloqueo de archivos sensibles

### Base de Datos
- ✅ **Queries preparadas**: Automáticas con Prisma
- ✅ **Validación de esquema**: Definición estricta
- ✅ **Migraciones**: Control de cambios estructurales

---

## 🔧 COMANDOS DE DESARROLLO

### Desarrollo
```bash
# Iniciar servidor de desarrollo
pnpm dev

# Generar cliente Prisma
pnpm exec prisma generate

# Aplicar migraciones
pnpm exec prisma db push

# Abrir Prisma Studio
pnpm exec prisma studio

# Seed de base de datos
pnpm exec ts-node scripts/seed-cards.ts
```

### Producción
```bash
# Build de producción
pnpm build

# Iniciar servidor de producción
pnpm start

# Análisis de bundle
pnpm analyze
```

### Base de Datos
```bash
# Crear migración
pnpm exec prisma migrate dev --name nombre_migracion

# Reset completo de base de datos
pnpm exec prisma migrate reset

# Deploy a producción
pnpm exec prisma migrate deploy
```

---

## 📝 CONVENCIONES DE CÓDIGO

### Estructura de Archivos
```typescript
/**
 * @fileoverview Descripción del archivo
 * 
 * Descripción detallada de la funcionalidad,
 * propósito y características principales.
 * 
 * @author Prisma Móvil Team
 * @version 5.2.0
 * @since 2025-09-01
 */

// Imports agrupados
import React from 'react'
import { NextPage } from 'next'
import { prisma } from '@/lib/prisma'

// Tipos e interfaces
interface ComponentProps {
  title: string
  children: React.ReactNode
}

// Componente principal
export default function Component({ title, children }: ComponentProps) {
  return (
    <div>
      <h1>{title}</h1>
      {children}
    </div>
  )
}
```

### Nombres de Variables y Funciones
- **Componentes**: PascalCase (`HeaderComponent`)
- **Funciones**: camelCase (`getUserData`)
- **Variables**: camelCase (`usersList`)
- **Constantes**: UPPER_SNAKE_CASE (`API_ENDPOINT`)
- **Archivos**: kebab-case (`user-profile.tsx`)

### Comentarios JSDoc
```typescript
/**
 * Descripción concisa de la función
 * 
 * @param param1 - Descripción del parámetro
 * @param param2 - Descripción del parámetro
 * @returns Descripción del retorno
 * 
 * @example
 * ```typescript
 * const result = myFunction('valor1', 'valor2')
 * ```
 */
function myFunction(param1: string, param2: string): string {
  return `${param1} ${param2}`
}
```

---

## 🐛 DEBUGGING Y TROUBLESHOOTING

### Errores Comunes

#### 1. Error de Prisma Client
```
PrismaClient is not configured
```
**Solución**:
```bash
pnpm exec prisma generate
```

#### 2. Error de Base de Datos
```
Database connection failed
```
**Solución**:
```bash
pnpm exec prisma db push
```

#### 3. Error de TypeScript
```
Module not found
```
**Solución**: Verificar paths en `tsconfig.json` y estructura de carpetas

#### 4. Error de Componentes
```
Hydration mismatch
```
**Solución**: Verificar diferencias entre server-side y client-side rendering

### Herramientas de Debug

#### Logs del Sistema
```typescript
import { errorManager } from '@/lib/error-manager'

// Ver estadísticas de errores
console.log(errorManager.getErrorStats())
```

#### Prisma Studio
```bash
pnpm exec prisma studio
# Abre interfaz web en http://localhost:5555
```

#### Next.js Debug
```bash
DEBUG=* pnpm dev
```

---

## 🚀 DESPLIEGUE

### Variables de Entorno
```env
# Base de datos
DATABASE_URL="file:./dev.db"

# Next.js
NEXT_PUBLIC_SITE_URL="https://prismamovil.com"

# Seguridad
NEXT_PUBLIC_SECURITY_ENABLED="true"
```

### Build y Deploy
```bash
# 1. Instalar dependencias
pnpm install

# 2. Generar Prisma Client
pnpm exec prisma generate

# 3. Ejecutar migraciones
pnpm exec prisma migrate deploy

# 4. Build de producción
pnpm build

# 5. Iniciar servidor
pnpm start
```

### Checklist de Despliegue
- [ ] Variables de entorno configuradas
- [ ] Migraciones de base de datos ejecutadas
- [ ] Build de producción exitoso
- [ ] Headers de seguridad configurados
- [ ] Certificados SSL válidos
- [ ] Monitoreo de errores activo

---

## 📞 SOPORTE Y CONTACTO

### Desarrollo
- **Email**: dev@prismamovil.com
- **Documentación**: Este archivo
- **Issues**: GitHub Issues

### Seguridad
- **Email**: security@prismamovil.com
- **Reporte de vulnerabilidades**: `SECURITY-ANALYSIS.md`

### Administración
- **Panel Admin**: `/admin`
- **Email**: admin@prismamovil.com

---

## 📅 ROADMAP

### Próximas Versiones
- **v5.3**: Sistema de autenticación robusto
- **v5.4**: Rate limiting y throttling
- **v5.5**: Monitoreo en tiempo real
- **v6.0**: Refactor completo con App Router

### Mantenimiento
- **Diario**: Monitoreo de errores
- **Semanal**: Actualización de dependencias
- **Mensual**: Análisis de seguridad
- **Trimestral**: Auditoría completa

---

*Documentación generada el 01/09/2025*  
*Última actualización: v5.2.0*
