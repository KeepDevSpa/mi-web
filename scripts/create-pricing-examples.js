// Script para crear ejemplos de PricingCards con todas las variantes
const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const dbPath = path.join(__dirname, '..', 'prisma', 'dev.db');
const db = new sqlite3.Database(dbPath);

console.log('🎨 Creando ejemplos de PricingCards con todas las variantes...');

// Ejemplos de PricingCards con diferentes variantes y características
const exampleCards = [
  // Variantes de diseño básicas
  {
    id: 'example-card-dark',
    name: 'Plan Dark',
    page: 'ejemplos',
    currentPrice: 25.99,
    originalPrice: 35.99,
    variant: 'dark',
    hasSpeedSelector: false,
    features: '["Llamadas ilimitadas", "SMS ilimitados", "Internet 4G", "Roaming EU"]',
    isPopular: false,
    ctaText: 'Contratar Dark',
    rateTier: 1,
    isActive: 1,
    isHeroOffer: 0
  },
  {
    id: 'example-card-medium',
    name: 'Plan Medium',
    page: 'ejemplos',
    currentPrice: 35.99,
    originalPrice: 45.99,
    variant: 'medium',
    hasSpeedSelector: true,
    features: '["Todo del Plan Dark", "5G incluido", "Hotspot 15GB", "Soporte prioritario"]',
    isPopular: true,
    ctaText: 'Contratar Medium',
    rateTier: 2,
    isActive: 1,
    isHeroOffer: 0
  },
  {
    id: 'example-card-golden',
    name: 'Plan Golden',
    page: 'ejemplos',
    currentPrice: 49.99,
    originalPrice: 69.99,
    variant: 'golden',
    hasSpeedSelector: true,
    features: '["Todo del Plan Medium", "Datos ilimitados", "Netflix incluido", "Soporte VIP"]',
    isPopular: false,
    ctaText: 'Contratar Golden',
    rateTier: 3,
    isActive: 1,
    isHeroOffer: 0
  },
  {
    id: 'example-card-blue',
    name: 'Plan Blue',
    page: 'ejemplos',
    currentPrice: 19.99,
    originalPrice: 29.99,
    variant: 'blue',
    hasSpeedSelector: false,
    features: '["Fibra 300Mb", "WiFi 6 incluido", "Instalación gratis", "IP fija opcional"]',
    isPopular: false,
    ctaText: 'Contratar Blue',
    rateTier: 1,
    isActive: 1,
    isHeroOffer: 0
  },
  {
    id: 'example-card-light',
    name: 'Plan Light',
    page: 'ejemplos',
    currentPrice: 15.99,
    variant: 'light',
    hasSpeedSelector: false,
    features: '["Básico y económico", "Llamadas nacionales", "1GB internet", "Sin permanencia"]',
    isPopular: false,
    ctaText: 'Contratar Light',
    rateTier: 1,
    isActive: 1,
    isHeroOffer: 0
  },
  {
    id: 'example-card-lightgreen',
    name: 'Plan EcoFriendly',
    page: 'ejemplos',
    currentPrice: 29.99,
    originalPrice: 39.99,
    variant: 'lightgreen',
    hasSpeedSelector: false,
    features: '["Energía 100% renovable", "Compensación CO2", "Fibra sostenible", "App ecológica"]',
    isPopular: true,
    ctaText: 'Contratar Eco',
    rateTier: 2,
    isActive: 1,
    isHeroOffer: 0
  },
  {
    id: 'example-card-lightblue',
    name: 'Plan Aqua',
    page: 'ejemplos',
    currentPrice: 32.99,
    variant: 'lightblue',
    hasSpeedSelector: true,
    features: '["Streaming optimizado", "Gaming mode", "Baja latencia", "Ancho de banda garantizado"]',
    isPopular: false,
    ctaText: 'Contratar Aqua',
    rateTier: 2,
    isActive: 1,
    isHeroOffer: 0
  },
  {
    id: 'example-card-purple',
    name: 'Plan Purple Pro',
    page: 'ejemplos',
    currentPrice: 59.99,
    originalPrice: 79.99,
    variant: 'purple',
    hasSpeedSelector: true,
    features: '["Máximo rendimiento", "Soporte 24/7 VIP", "Múltiples IPs", "SLA 99.9% uptime"]',
    isPopular: false,
    ctaText: 'Contratar Purple',
    rateTier: 4,
    isActive: 1,
    isHeroOffer: 0
  },
  {
    id: 'example-card-green',
    name: 'Plan Green',
    page: 'ejemplos',
    currentPrice: 27.99,
    originalPrice: 37.99,
    variant: 'green',
    hasSpeedSelector: false,
    features: '["Diseño Prisma", "Fibra + Móvil", "Precio combinado", "Ahorro garantizado"]',
    isPopular: true,
    ctaText: 'Contratar Green',
    rateTier: 2,
    isActive: 1,
    isHeroOffer: 0
  },
  {
    id: 'example-card-premium',
    name: 'Plan Premium Elite',
    page: 'ejemplos',
    currentPrice: 89.99,
    originalPrice: 119.99,
    variant: 'premium',
    hasSpeedSelector: true,
    features: '["Todo incluido", "Sin límites", "Concierge service", "Acceso beta features"]',
    isPopular: false,
    ctaText: 'Contratar Elite',
    rateTier: 5,
    isActive: 1,
    isHeroOffer: 0
  }
];

// Speeds de ejemplo para las tarjetas con selector
const exampleSpeeds = [
  // Para Medium
  { id: 'speed-medium-1', label: '20GB', price: 35.99, originalPrice: 45.99, cardId: 'example-card-medium' },
  { id: 'speed-medium-2', label: '40GB', price: 42.99, originalPrice: 52.99, cardId: 'example-card-medium' },
  { id: 'speed-medium-3', label: '80GB', price: 49.99, originalPrice: 59.99, cardId: 'example-card-medium' },
  
  // Para Golden
  { id: 'speed-golden-1', label: '500Mb + 50GB', price: 49.99, originalPrice: 69.99, cardId: 'example-card-golden' },
  { id: 'speed-golden-2', label: '1Gb + 100GB', price: 59.99, originalPrice: 79.99, cardId: 'example-card-golden' },
  { id: 'speed-golden-3', label: '1Gb + Ilimitado', price: 69.99, originalPrice: 89.99, cardId: 'example-card-golden' },
  
  // Para Aqua
  { id: 'speed-aqua-1', label: 'Gaming 100Mb', price: 32.99, cardId: 'example-card-lightblue' },
  { id: 'speed-aqua-2', label: 'Gaming 300Mb', price: 39.99, cardId: 'example-card-lightblue' },
  { id: 'speed-aqua-3', label: 'Gaming 600Mb', price: 46.99, cardId: 'example-card-lightblue' },
  
  // Para Purple
  { id: 'speed-purple-1', label: 'Pro 1Gb', price: 59.99, originalPrice: 79.99, cardId: 'example-card-purple' },
  { id: 'speed-purple-2', label: 'Pro 2Gb', price: 79.99, originalPrice: 99.99, cardId: 'example-card-purple' },
  { id: 'speed-purple-3', label: 'Pro 10Gb', price: 149.99, originalPrice: 199.99, cardId: 'example-card-purple' },
  
  // Para Premium
  { id: 'speed-premium-1', label: 'Elite 2Gb + Todo', price: 89.99, originalPrice: 119.99, cardId: 'example-card-premium' },
  { id: 'speed-premium-2', label: 'Elite 5Gb + Todo', price: 129.99, originalPrice: 159.99, cardId: 'example-card-premium' },
  { id: 'speed-premium-3', label: 'Elite 10Gb + Todo', price: 199.99, originalPrice: 249.99, cardId: 'example-card-premium' }
];

// Extras de ejemplo
const exampleExtras = [
  // Extras comunes
  { id: 'extra-netflix', label: 'Netflix Premium', price: 15.99, description: 'Suscripción Netflix incluida', cardId: 'example-card-golden' },
  { id: 'extra-amazon', label: 'Amazon Prime', price: 8.99, description: 'Amazon Prime Video + envíos gratis', cardId: 'example-card-golden' },
  { id: 'extra-spotify', label: 'Spotify Premium', price: 9.99, description: 'Música sin límites', cardId: 'example-card-medium' },
  { id: 'extra-gaming', label: 'Gaming Pack', price: 12.99, description: 'Latencia ultra baja + servidores gaming', cardId: 'example-card-lightblue' },
  { id: 'extra-security', label: 'Security Suite', price: 5.99, description: 'Antivirus + VPN + backup', cardId: 'example-card-purple' },
  { id: 'extra-business', label: 'Business Tools', price: 19.99, description: 'Office 365 + Teams + soporte prioritario', cardId: 'example-card-premium' }
];

console.log('📦 Insertando PricingCards de ejemplo...');

// Insertar las tarjetas
const insertCards = () => {
  return new Promise((resolve) => {
    let completed = 0;
    const total = exampleCards.length;

    exampleCards.forEach((card) => {
      const stmt = db.prepare(`
        INSERT OR REPLACE INTO PricingCard (
          id, name, page, currentPrice, originalPrice, variant, hasSpeedSelector,
          features, isPopular, ctaText, rateTier, isActive, isHeroOffer, createdAt, updatedAt
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `);
      
      const now = new Date().toISOString();
      
      stmt.run([
        card.id, card.name, card.page, card.currentPrice, card.originalPrice,
        card.variant, card.hasSpeedSelector, card.features, card.isPopular,
        card.ctaText, card.rateTier, card.isActive, card.isHeroOffer, now, now
      ], function(err) {
        if (err) {
          console.error('Error insertando PricingCard:', err);
        } else {
          console.log(`✅ PricingCard: ${card.name} (${card.variant})`);
        }
        
        completed++;
        if (completed === total) {
          stmt.finalize();
          resolve();
        }
      });
    });
  });
};

// Insertar speeds
const insertSpeeds = () => {
  return new Promise((resolve) => {
    let completed = 0;
    const total = exampleSpeeds.length;

    if (total === 0) {
      resolve();
      return;
    }

    exampleSpeeds.forEach((speed) => {
      const stmt = db.prepare(`
        INSERT OR REPLACE INTO Speed (
          id, label, price, originalPrice, pricingCardId
        ) VALUES (?, ?, ?, ?, ?)
      `);
      
      stmt.run([
        speed.id, speed.label, speed.price, speed.originalPrice, speed.cardId
      ], function(err) {
        if (err) {
          console.error('Error insertando Speed:', err);
        } else {
          console.log(`✅ Speed: ${speed.label} -> ${speed.cardId}`);
        }
        
        completed++;
        if (completed === total) {
          stmt.finalize();
          resolve();
        }
      });
    });
  });
};

// Insertar extras
const insertExtras = () => {
  return new Promise((resolve) => {
    let completed = 0;
    const total = exampleExtras.length;

    if (total === 0) {
      resolve();
      return;
    }

    exampleExtras.forEach((extra) => {
      const stmt = db.prepare(`
        INSERT OR REPLACE INTO Extra (
          id, label, price, description, pricingCardId
        ) VALUES (?, ?, ?, ?, ?)
      `);
      
      stmt.run([
        extra.id, extra.label, extra.price, extra.description, extra.cardId
      ], function(err) {
        if (err) {
          console.error('Error insertando Extra:', err);
        } else {
          console.log(`✅ Extra: ${extra.label} -> ${extra.cardId}`);
        }
        
        completed++;
        if (completed === total) {
          stmt.finalize();
          resolve();
        }
      });
    });
  });
};

// Ejecutar todas las inserciones
async function insertAllPricingExamples() {
  try {
    await insertCards();
    console.log('\n🚀 Insertando Speeds...');
    await insertSpeeds();
    console.log('\n🎁 Insertando Extras...');
    await insertExtras();
    
    console.log('\n🎉 ¡Ejemplos de PricingCards insertados correctamente!');
    console.log('\n📊 Resumen:');
    console.log(`- ${exampleCards.length} PricingCards con diferentes variantes`);
    console.log(`- ${exampleSpeeds.length} Speeds asociadas`);
    console.log(`- ${exampleExtras.length} Extras asociadas`);
    
  } catch (error) {
    console.error('Error en la inserción:', error);
  } finally {
    db.close((err) => {
      if (err) {
        console.error('Error cerrando la base de datos:', err);
      } else {
        console.log('✅ Base de datos cerrada correctamente');
      }
    });
  }
}

insertAllPricingExamples();
