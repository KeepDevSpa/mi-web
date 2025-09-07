# 🎨 Sistema de Diseño Visual Coherente - Prisma

## 📐 Estructura Visual Estándar

### **Hero Section Pattern (OBLIGATORIO para todas las páginas):**
```css
- Altura fija: h-[500px]
- Background: Imagen + overlay gradient
- Overlay: bg-gradient-to-r from-black/70 to-black/30
- Contenido: max-w-2xl, text-white
- Tipografía: text-4xl md:text-6xl font-extrabold
- Subtítulo coloreado: text-[color]-300
- Descripción: text-xl text-zinc-300
- CTAs: Primario (gradient) + Secundario (outline white)
```

### **Secciones Alternas Pattern:**
```css
1. Hero: Imagen + overlay oscuro
2. Primera sección: Fondo de color de marca (bg-[color]-700)
3. Segunda sección: Fondo blanco (bg-white)
4. Tercera sección: Fondo gris claro (bg-zinc-50 opcional)
5. CTA Final: Fondo oscuro (bg-zinc-900)
```

## 🎨 Paleta de Colores Unificada

### **Backgrounds principales:**
- `bg-zinc-900` - Headers oscuros y CTAs finales
- `bg-[brand-color]-700` - Secciones de productos (green-700, blue-700, purple-700)
- `bg-white` - Secciones de información
- `bg-zinc-50` - Secciones alternativas suaves

### **Textos coherentes:**
- `text-zinc-800` - Títulos en fondos claros
- `text-white` - Títulos en fondos oscuros
- `text-zinc-600` - Textos descriptivos
- `text-zinc-300` - Textos en fondos oscuros

### **Cards y elementos:**
- `bg-white` con `shadow-xl hover:shadow-2xl`
- `hover:scale-105` en cards interactivas
- `rounded-xl` o `rounded-2xl` para consistencia
- `transition-all` para efectos suaves

## 📝 Tipografía Estándar

### **Títulos principales:**
```css
- H1 Hero: text-4xl md:text-6xl font-extrabold tracking-tight
- H2 Sección: text-3xl md:text-4xl font-bold
- H3 Card: text-xl font-bold
```

### **Textos descriptivos:**
```css
- Hero desc: text-xl text-zinc-300 max-w-lg
- Sección desc: text-lg text-[color]-200 max-w-4xl mx-auto
- Card desc: text-zinc-600 leading-relaxed
```

## 🧩 Componentes Reutilizables

### **Badges informativos:**
```jsx
<div className="bg-[color]-100/20 text-white border border-white/30 rounded-full px-4 py-2 text-sm font-medium inline-block mb-4">
  🎯 TEXTO DESCRIPTIVO
</div>
```

### **Cards de servicio estándar:**
```jsx
<div className="bg-white text-zinc-800 rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all hover:scale-105">
  <div className="h-48 bg-gradient-to-br from-[color1]-500 to-[color2]-500 relative">
    <div className="absolute inset-0 bg-black/20"></div>
    <div className="relative z-10 p-8 text-white">
      // Contenido del header de la card
    </div>
  </div>
  <div className="p-8">
    // Contenido del body de la card
  </div>
</div>
```

### **Ventajas/Features estándar:**
```jsx
<div className="text-center p-6 bg-zinc-50 rounded-xl hover:bg-zinc-100 transition-colors">
  <div className="w-16 h-16 bg-[color]-100 rounded-full flex items-center justify-center mx-auto mb-4">
    <span className="text-2xl">{emoji}</span>
  </div>
  <h3 className="text-xl font-bold text-zinc-800 mb-3">{title}</h3>
  <p className="text-zinc-600 leading-relaxed">{description}</p>
</div>
```

## 🔧 Implementación por Páginas

### **Colores de marca por servicio:**
- **Fibra:** green-700, green-500
- **Móvil:** blue-700, blue-500  
- **PrismaTV:** purple-700, purple-500
- **Combo:** blue-700 to purple-700 (gradiente)
- **General:** zinc-900, zinc-700

### **Imágenes hero por página:**
- Home: `/pool-selfie-hero.jpeg`
- Móvil: `/chica_con_movil.webp`
- Fibra: `/wifi-router-home-setup.png`
- Demo: `/Hero-Banner.webp`
- PrismaTV: Fondo sólido con logo
- Fibra-Móvil: `/conexion-internet.jpg`

## ✅ Checklist de Coherencia Visual

### **Cada página DEBE tener:**
- [ ] Hero con imagen + overlay + altura 500px
- [ ] Sección de color de marca después del hero
- [ ] Tipografía consistente (extrabold, bold, regular)
- [ ] Cards con hover effects y shadows
- [ ] CTA final con fondo zinc-900
- [ ] Espaciado consistente (py-16 para secciones)
- [ ] Transiciones suaves en todos los elementos interactivos

### **Elementos prohibidos:**
- ❌ Fondos de gradiente pastel (blue-50, green-50, etc.)
- ❌ Colores gray-* (usar zinc-* en su lugar)
- ❌ Texto negro puro (#000) (usar zinc-800)
- ❌ Buttons sin hover effects
- ❌ Cards sin sombras
- ❌ Tipografía inconsistente entre páginas

## 🎯 Páginas que siguen el estándar:
✅ `/movil` - REFERENCIA PERFECTA
✅ `/prisma-tv` - REFERENCIA PERFECTA
✅ `/demo` - ACTUALIZADA ✅
✅ `/fibra` - ACTUALIZADA ✅

## 🔄 Páginas pendientes de actualizar:
🔄 `/fibra-movil` - Necesita aplicar patrón
🔄 `/seguridad` - ✅ Aplicado patrón
🔄 `/energia` - Necesita aplicar patrón
🔄 Páginas dinámicas `/[slug]` - Necesita aplicar patrón

---

**Principio fundamental:** Cada página debe sentirse como parte del mismo producto premium, manteniendo la identidad visual de Prisma como operadora que "realmente te cuida" a través de un diseño sofisticado y coherente.
