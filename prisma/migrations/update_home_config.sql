-- Update the existing home page config
UPDATE "HeroConfig"
SET 
  "title" = 'Descubre Nuestra',
  "subtitle" = 'Nueva Fibra + Móvil',
  "description" = 'Conectividad de alta velocidad con los mejores precios y sin permanencia. Disfruta de Internet y móvil sin límites.',
  "primaryCta" = '{"text":"Ver ofertas","href":"#ofertas"}',
  "secondaryCta" = '{"text":"Comprobar cobertura","href":"#coverage-form"}',
  "heroImage" = '/home-hero.webp',
  "backgroundType" = 'gradient',
  "variant" = 'default',
  "highlights" = '[{"text":"Fibra hasta 1Gbps","className":"bg-gradient-to-r from-[#00aa00]/60 to-[#008800]/60 hover:from-[#00aa00]/80 hover:to-[#008800]/80 backdrop-blur-md transition"},{"text":"Móvil con 5G","className":"bg-gradient-to-r from-[#0066cc]/60 to-[#0055aa]/60 hover:from-[#0066cc]/80 hover:to-[#0055aa]/80 backdrop-blur-md transition"},{"text":"Sin permanencia","className":"bg-gradient-to-r from-amber-500/60 to-amber-600/60 hover:from-amber-500/80 hover:to-amber-600/80 backdrop-blur-md transition"}]',
  "showButtons" = true,
  "isActive" = true,
  "updatedAt" = CURRENT_TIMESTAMP
WHERE "page" = 'home';
