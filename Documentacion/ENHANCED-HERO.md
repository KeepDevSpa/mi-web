# Resumen de cambios realizados

## EnhancedHero
Se ha creado un nuevo componente `EnhancedHero` que unifica las funcionalidades de todos los héroes anteriores, incluyendo:

- Soporte para video (requerido en PrismaTV)
- Estilos consistentes para badges con transparencia y backdrop blur
- Múltiples variantes de diseño
- Soporte para logos
- Flexibilidad en la posición del contenido

## Migración realizada

Se han actualizado las siguientes páginas para usar el nuevo componente:
- app/prisma-tv/page.tsx (con soporte de video)
- app/movil/page.tsx
- app/fibra-movil/page.tsx
- app/home/page.tsx
- app/home/new-page.tsx

## Limpieza

Los siguientes componentes ya no son necesarios y pueden ser eliminados:
- components/ui/hero-movil.tsx
- components/ui/hero-fibra-movil.tsx
- components/ui/hero-home.tsx

## Instrucciones para usar EnhancedHero

El nuevo componente admite todas las propiedades de los héroes anteriores, más algunas adicionales:

```tsx
<EnhancedHero
  // Contenido básico
  title="Título principal"
  highlightedText="Texto destacado"
  description="Descripción más larga del héroe"
  
  // Imagen o video de fondo
  image="/ruta-a-imagen.jpg"
  videoSrc="/ruta-a-video.mp4" // Opcional, si se proporciona, se usa video en lugar de imagen
  videoPreviewImage="/imagen-previa-video.jpg" // Opcional
  
  // Estilos y variantes
  variant="default" // default, green, light, dark, accent, security, energy, prismatv
  className="clase-adicional"
  
  // Botones CTA
  primaryCta={{
    text: "Texto del botón",
    href: "#seccion",
    style: "primary" // primary, secondary, outline, link
  }}
  secondaryCta={{
    text: "Texto del botón secundario",
    href: "#otra-seccion",
    style: "outline"
  }}
  
  // Badges/Highlights
  highlights={[
    { 
      text: "Texto del badge", 
      style: "badge", // pill, icon, badge
      className: "bg-blue-600/60 backdrop-blur-md" 
    }
  ]}
  
  // Opciones de layout
  contentPosition="left" // left, center, right
  titleLayout="stacked" // inline, stacked, separated
  
  // Opciones avanzadas
  logo="/ruta-a-logo.png" // Opcional
  logoWidth={300}
  logoHeight={100}
  showButtons={true}
  overlayOpacity={0.4}
  textSize="medium" // small, medium, large
/>
```
