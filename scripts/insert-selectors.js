/**
 * Script simple para insertar datos de selectores usando SQL directo
 */

const sqlite3 = require('sqlite3').verbose();
const path = require('path');

// Ruta a la base de datos SQLite
const dbPath = path.join(__dirname, '..', 'prisma', 'dev.db');

const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error('Error abriendo base de datos:', err);
    return;
  }
  console.log('✅ Conectado a la base de datos SQLite');
});

async function insertSelectors() {
  console.log('🌱 Insertando selectores de página...');

  // Función para generar ID único tipo cuid
  const generateId = () => {
    return 'c' + Math.random().toString(36).substr(2, 9) + Date.now().toString(36);
  };

  const selectorsData = [
    // Selectores para móvil
    {
      id: generateId(),
      page: 'movil',
      key: 'basico',
      title: 'Planes Básicos',
      subtitle: 'Para uso moderado',
      description: 'Perfectos para llamadas y uso básico de internet',
      order: 1,
      isActive: 1,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    },
    {
      id: generateId(),
      page: 'movil',
      key: 'premium',
      title: 'Planes Premium', 
      subtitle: 'Para usuarios intensivos',
      description: 'Máximo rendimiento con datos ilimitados',
      order: 2,
      isActive: 1,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    },
    // Selectores para fibra-movil
    {
      id: generateId(),
      page: 'fibra-movil',
      key: 'fibra',
      title: 'Velocidad Fibra Óptica',
      subtitle: 'Fibra sin límites',
      description: 'Conexiones de alta velocidad con diferentes opciones',
      order: 1,
      isActive: 1,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    },
    {
      id: generateId(),
      page: 'fibra-movil',
      key: 'contenido',
      title: 'Selección Contenido',
      subtitle: 'Máximo contenido más flexibilidad', 
      description: 'Incluye plataformas de streaming y televisión',
      order: 2,
      isActive: 1,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    },
    {
      id: generateId(),
      page: 'fibra-movil',
      key: 'vip',
      title: 'Selección Fibra Óptica VIP',
      subtitle: 'Máximo Fibra Óptica premium',
      description: 'Servicios profesionales con soporte dedicado',
      order: 3,
      isActive: 1,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }
  ];

  return new Promise((resolve, reject) => {
    // Primero verificar si la tabla existe
    db.get("SELECT name FROM sqlite_master WHERE type='table' AND name='PageSelector'", (err, row) => {
      if (err) {
        reject(err);
        return;
      }

      if (!row) {
        console.log('❌ La tabla PageSelector no existe. Ejecuta "pnpm exec prisma db push" primero.');
        reject(new Error('Tabla no existe'));
        return;
      }

      // Limpiar datos existentes
      db.run("DELETE FROM PageSelector", (err) => {
        if (err) {
          console.error('Error limpiando tabla:', err);
          reject(err);
          return;
        }

        console.log('🧹 Tabla limpiada');

        // Insertar nuevos datos
        const stmt = db.prepare(`
          INSERT INTO PageSelector (id, page, key, title, subtitle, description, "order", isActive, createdAt, updatedAt)
          VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        `);

        let completed = 0;
        const total = selectorsData.length;

        selectorsData.forEach((selector, index) => {
          stmt.run([
            selector.id,
            selector.page,
            selector.key,
            selector.title,
            selector.subtitle,
            selector.description,
            selector.order,
            selector.isActive,
            selector.createdAt,
            selector.updatedAt
          ], function(err) {
            if (err) {
              console.error(`❌ Error insertando selector ${selector.title}:`, err);
            } else {
              console.log(`  ✅ Insertado: ${selector.title} (${selector.page})`);
            }
            
            completed++;
            if (completed === total) {
              stmt.finalize();
              console.log(`\n🎉 ${total} selectores insertados correctamente!`);
              resolve();
            }
          });
        });
      });
    });
  });
}

// Ejecutar script
insertSelectors()
  .then(() => {
    console.log('\n✨ Script completado exitosamente');
    db.close();
  })
  .catch((error) => {
    console.error('❌ Error:', error);
    db.close();
    process.exit(1);
  });
