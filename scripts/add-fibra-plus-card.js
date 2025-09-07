// Script para agregar una tarjeta adicional a Fibra Plus
const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const dbPath = path.join(__dirname, '..', 'prisma', 'dev.db');
const db = new sqlite3.Database(dbPath);

console.log('Agregando tarjeta adicional a Fibra Plus...');

const newCard = {
  id: 'fibra-plus-starter',
  name: 'Fibra Plus Starter',
  page: 'fibra',
  selectorKey: 'plus',
  currentPrice: 24.99,
  originalPrice: 34.99,
  variant: 'green',
  hasSpeedSelector: false,
  features: '["300Mb de velocidad", "WiFi incluido", "Instalación gratuita", "Soporte técnico"]',
  isPopular: false,
  ctaText: 'Contratar Plus',
  rateTier: 1,
  isActive: 1,
  isHeroOffer: 0
};

const stmt = db.prepare(`
  INSERT OR REPLACE INTO PricingCard (
    id, name, page, selectorKey, currentPrice, originalPrice, variant, hasSpeedSelector, 
    features, isPopular, ctaText, rateTier, isActive, isHeroOffer, createdAt, updatedAt
  ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
`);

const now = new Date().toISOString();

stmt.run([
  newCard.id, newCard.name, newCard.page, newCard.selectorKey, newCard.currentPrice, newCard.originalPrice,
  newCard.variant, newCard.hasSpeedSelector, newCard.features, newCard.isPopular, newCard.ctaText,
  newCard.rateTier, newCard.isActive, newCard.isHeroOffer, now, now
], function(err) {
  if (err) {
    console.error('Error insertando tarjeta:', err);
  } else {
    console.log(`✅ Tarjeta insertada: ${newCard.name} (${newCard.selectorKey})`);
  }
  
  stmt.finalize();
  
  // También vamos a actualizar la tarjeta Evolution para que sea rateTier 2
  const updateStmt = db.prepare('UPDATE PricingCard SET rateTier = ? WHERE id = ?');
  updateStmt.run([2, 'fibra-evolution'], function(err) {
    if (err) {
      console.error('Error actualizando rateTier:', err);
    } else {
      console.log('✅ RateTier de Fibra Evolution actualizado a 2');
    }
    
    updateStmt.finalize();
    
    db.close((err) => {
      if (err) {
        console.error('Error cerrando la base de datos:', err);
      } else {
        console.log('✅ Base de datos cerrada correctamente');
        console.log('🎉 Tarjeta adicional agregada exitosamente');
      }
    });
  });
});
