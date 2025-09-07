// Script para marcar una tarjeta como hero offer
const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const dbPath = path.join(__dirname, '..', 'prisma', 'dev.db');
const db = new sqlite3.Database(dbPath);

console.log('Configurando tarjeta hero...');

// Primero, vemos qué tarjetas tenemos disponibles
db.all("SELECT id, name, page FROM PricingCard WHERE isActive = 1", (err, cards) => {
  if (err) {
    console.error('Error obteniendo tarjetas:', err);
    return;
  }

  console.log('Tarjetas disponibles:', cards);
  
  // Marcar una tarjeta específica como hero offer (por ejemplo, la primera de fibra)
  const heroCardId = 'fibra-evolution'; // O puedes cambiarlo por la tarjeta que prefieras
  
  // Primero, desmarcar todas las tarjetas hero existentes
  const clearHeroStmt = db.prepare('UPDATE PricingCard SET isHeroOffer = 0');
  clearHeroStmt.run((err) => {
    if (err) {
      console.error('Error desmarcando hero cards:', err);
      return;
    }
    
    console.log('✅ Todas las tarjetas hero desmarcadas');
    clearHeroStmt.finalize();
    
    // Ahora marcar la nueva tarjeta como hero
    const setHeroStmt = db.prepare('UPDATE PricingCard SET isHeroOffer = 1 WHERE id = ?');
    setHeroStmt.run([heroCardId], function(err) {
      if (err) {
        console.error('Error marcando tarjeta como hero:', err);
      } else if (this.changes > 0) {
        console.log(`✅ Tarjeta ${heroCardId} marcada como hero offer`);
      } else {
        console.log(`❌ No se encontró la tarjeta ${heroCardId}`);
      }
      
      setHeroStmt.finalize();
      
      db.close((err) => {
        if (err) {
          console.error('Error cerrando la base de datos:', err);
        } else {
          console.log('✅ Base de datos cerrada correctamente');
          console.log('🎉 Configuración hero completada');
        }
      });
    });
  });
});
