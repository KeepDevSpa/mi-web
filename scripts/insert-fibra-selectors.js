// Script para insertar selectores de fibra
const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const dbPath = path.join(__dirname, '..', 'prisma', 'dev.db');
const db = new sqlite3.Database(dbPath);

// Insertar selectores para la página fibra
const fibra_selectors = [
  {
    page: 'fibra',
    key: 'plus',
    title: 'Fibra Plus',
    subtitle: 'Para uso doméstico',
    description: 'Perfecta para hogares con uso moderado de internet',
    order: 1,
    isActive: 1
  },
  {
    page: 'fibra',
    key: 'vip',
    title: 'Fibra VIP',
    subtitle: 'Para power users',
    description: 'Ideal para hogares con alto consumo y múltiples dispositivos',
    order: 2,
    isActive: 1
  }
];

console.log('Insertando selectores de fibra...');

// Insertar los selectores
fibra_selectors.forEach((selector, index) => {
  const stmt = db.prepare(`
    INSERT OR REPLACE INTO PageSelector (id, page, key, title, subtitle, description, "order", isActive, createdAt, updatedAt)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `);
  
  const id = `fibra-selector-${index + 1}`;
  const now = new Date().toISOString();
  
  stmt.run([
    id,
    selector.page,
    selector.key,
    selector.title,
    selector.subtitle,
    selector.description,
    selector.order,
    selector.isActive,
    now,
    now
  ], function(err) {
    if (err) {
      console.error('Error insertando selector:', err);
    } else {
      console.log(`✅ Selector insertado: ${selector.title}`);
    }
  });
  
  stmt.finalize();
});

// Cerrar la base de datos
setTimeout(() => {
  db.close((err) => {
    if (err) {
      console.error('Error cerrando la base de datos:', err);
    } else {
      console.log('✅ Base de datos cerrada correctamente');
      console.log('🎉 Selectores de fibra insertados exitosamente');
    }
  });
}, 1000);
