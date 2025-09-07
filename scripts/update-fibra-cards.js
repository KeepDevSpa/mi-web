// Script para actualizar las tarjetas de fibra con selectorKey
const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const dbPath = path.join(__dirname, '..', 'prisma', 'dev.db');
const db = new sqlite3.Database(dbPath);

console.log('Actualizando tarjetas de fibra con selectorKey...');

// Primero, veamos qué tarjetas de fibra tenemos
db.all("SELECT id, name, rateTier FROM PricingCard WHERE page = 'fibra' AND isActive = 1 ORDER BY rateTier", (err, cards) => {
  if (err) {
    console.error('Error obteniendo tarjetas:', err);
    return;
  }

  console.log('Tarjetas de fibra encontradas:', cards);

  if (cards.length === 0) {
    console.log('No se encontraron tarjetas de fibra. Creando tarjetas de ejemplo...');
    
    // Crear tarjetas de ejemplo para fibra
    const fibraCards = [
      {
        id: 'fibra-plus-600',
        name: 'Fibra Plus 600Mb',
        page: 'fibra',
        selectorKey: 'plus',
        currentPrice: 29.99,
        originalPrice: 39.99,
        variant: 'green',
        hasSpeedSelector: false,
        features: '["600Mb de velocidad", "WiFi 6 incluido", "Instalación gratuita", "Soporte 24/7"]',
        isPopular: false,
        ctaText: 'Contratar Fibra Plus',
        rateTier: 1,
        isActive: 1,
        isHeroOffer: 0
      },
      {
        id: 'fibra-plus-1gb',
        name: 'Fibra Plus 1Gb',
        page: 'fibra',
        selectorKey: 'plus',
        currentPrice: 39.99,
        originalPrice: 49.99,
        variant: 'green',
        hasSpeedSelector: false,
        features: '["1Gb de velocidad", "WiFi 6 incluido", "Instalación gratuita", "Soporte 24/7", "IP estática incluida"]',
        isPopular: true,
        ctaText: 'Contratar Fibra Plus',
        rateTier: 2,
        isActive: 1,
        isHeroOffer: 0
      },
      {
        id: 'fibra-vip-1gb',
        name: 'Fibra VIP 1Gb',
        page: 'fibra',
        selectorKey: 'vip',
        currentPrice: 49.99,
        originalPrice: 69.99,
        variant: 'premium',
        hasSpeedSelector: false,
        features: '["1Gb de velocidad", "WiFi 6 Pro incluido", "Instalación premium", "Soporte VIP 24/7", "IP estática incluida", "Antivirus premium"]',
        isPopular: false,
        ctaText: 'Contratar Fibra VIP',
        rateTier: 3,
        isActive: 1,
        isHeroOffer: 0
      },
      {
        id: 'fibra-vip-2gb',
        name: 'Fibra VIP 2Gb',
        page: 'fibra',
        selectorKey: 'vip',
        currentPrice: 69.99,
        originalPrice: 89.99,
        variant: 'premium',
        hasSpeedSelector: false,
        features: '["2Gb de velocidad", "WiFi 6 Pro incluido", "Instalación premium", "Soporte VIP 24/7", "2 IPs estáticas", "Antivirus premium", "Backup en la nube"]',
        isPopular: true,
        ctaText: 'Contratar Fibra VIP',
        rateTier: 4,
        isActive: 1,
        isHeroOffer: 0
      }
    ];

    fibraCards.forEach((card) => {
      const stmt = db.prepare(`
        INSERT OR REPLACE INTO PricingCard (
          id, name, page, selectorKey, currentPrice, originalPrice, variant, hasSpeedSelector, 
          features, isPopular, ctaText, rateTier, isActive, isHeroOffer, createdAt, updatedAt
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `);
      
      const now = new Date().toISOString();
      
      stmt.run([
        card.id, card.name, card.page, card.selectorKey, card.currentPrice, card.originalPrice,
        card.variant, card.hasSpeedSelector, card.features, card.isPopular, card.ctaText,
        card.rateTier, card.isActive, card.isHeroOffer, now, now
      ], function(err) {
        if (err) {
          console.error('Error insertando tarjeta:', err);
        } else {
          console.log(`✅ Tarjeta insertada: ${card.name} (${card.selectorKey})`);
        }
      });
      
      stmt.finalize();
    });

  } else {
    // Actualizar tarjetas existentes con selectorKey
    cards.forEach((card, index) => {
      let selectorKey;
      
      // Asignar según el rateTier o posición
      if (index < Math.floor(cards.length / 2)) {
        selectorKey = 'plus';
      } else {
        selectorKey = 'vip';
      }

      const stmt = db.prepare('UPDATE PricingCard SET selectorKey = ?, updatedAt = ? WHERE id = ?');
      const now = new Date().toISOString();
      
      stmt.run([selectorKey, now, card.id], function(err) {
        if (err) {
          console.error('Error actualizando tarjeta:', err);
        } else {
          console.log(`✅ Tarjeta actualizada: ${card.name} -> ${selectorKey}`);
        }
      });
      
      stmt.finalize();
    });
  }

  // Cerrar la base de datos después de un breve retraso
  setTimeout(() => {
    db.close((err) => {
      if (err) {
        console.error('Error cerrando la base de datos:', err);
      } else {
        console.log('✅ Base de datos cerrada correctamente');
        console.log('🎉 Tarjetas de fibra actualizadas exitosamente');
      }
    });
  }, 2000);
});
