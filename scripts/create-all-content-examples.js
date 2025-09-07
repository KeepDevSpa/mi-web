// Script completo para crear ejemplos de todos los tipos de contenido
const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const dbPath = path.join(__dirname, '..', 'prisma', 'dev.db');
const db = new sqlite3.Database(dbPath);

console.log('🎨 Creando ejemplos completos de todos los tipos de contenido...');

// 1. INFORMATION CARDS - Ejemplos para diferentes páginas y secciones
const informationCards = [
  // Home - Sección Ventajas
  {
    id: 'info-home-ventaja-1',
    page: 'home',
    section: 'ventajas',
    icon: '🏠',
    title: 'Instalación gratuita',
    description: 'Te instalamos la fibra en tu hogar sin coste adicional',
    content: 'Nuestro equipo técnico especializado se encarga de toda la instalación sin que tengas que pagar nada extra. Incluye configuración del router y pruebas de velocidad.',
    imageUrl: '/wifi-router-home-setup.png',
    backgroundColor: '#f0f9ff',
    textColor: '#0c4a6e',
    order: 1,
    isActive: 1
  },
  {
    id: 'info-home-ventaja-2',
    page: 'home',
    section: 'ventajas',
    icon: '🚀',
    title: 'Velocidad garantizada',
    description: 'Te aseguramos la velocidad que contratas o te devolvemos el dinero',
    content: 'Con nuestra red de fibra propia, garantizamos el 100% de la velocidad contratada. Mediciones 24/7 y compensación automática si no cumplimos.',
    imageUrl: '/5g-network.png',
    backgroundColor: '#f0fdf4',
    textColor: '#14532d',
    order: 2,
    isActive: 1
  },
  {
    id: 'info-home-ventaja-3',
    page: 'home',
    section: 'ventajas',
    icon: '📞',
    title: 'Soporte humano 24/7',
    description: 'Atención personalizada con personas reales, no bots',
    content: 'Nuestro equipo de soporte está disponible las 24 horas, los 7 días de la semana. Habla siempre con una persona real que entiende tus necesidades.',
    imageUrl: '/happy-customer-service-rep.png',
    backgroundColor: '#fdf2f8',
    textColor: '#be185d',
    order: 3,
    isActive: 1
  },
  
  // Móvil - Sección Características
  {
    id: 'info-movil-carac-1',
    page: 'movil',
    section: 'caracteristicas',
    icon: '📱',
    title: '5G incluido',
    description: 'Acceso a la red 5G más rápida sin coste extra',
    content: 'Disfruta de la velocidad 5G en las principales ciudades españolas. Velocidades de hasta 1Gbps en tu móvil.',
    imageUrl: '/5g-mtc.jpg',
    backgroundColor: '#f8fafc',
    textColor: '#1e293b',
    order: 1,
    isActive: 1
  },
  {
    id: 'info-movil-carac-2',
    page: 'movil',
    section: 'caracteristicas',
    icon: '🌍',
    title: 'Roaming europeo gratis',
    description: 'Usa tus gigas y minutos en toda Europa sin coste adicional',
    content: 'Viaja por los 27 países de la UE y utiliza tu tarifa como si estuvieras en España. Sin sorpresas en la factura.',
    backgroundColor: '#f0f9ff',
    textColor: '#0c4a6e',
    order: 2,
    isActive: 1
  },
  
  // Fibra - Sección Ventajas Técnicas
  {
    id: 'info-fibra-tech-1',
    page: 'fibra',
    section: 'tecnologia',
    icon: '⚡',
    title: 'Fibra simétrica',
    description: 'Misma velocidad de subida y bajada',
    content: 'Nuestra fibra es 100% simétrica. Si contratas 600Mb, tendrás 600Mb tanto para descargar como para subir contenido.',
    imageUrl: '/conexion-internet.jpg',
    backgroundColor: '#f0fdf4',
    textColor: '#14532d',
    order: 1,
    isActive: 1
  },
  {
    id: 'info-fibra-tech-2',
    page: 'fibra',
    section: 'tecnologia',
    icon: '🔒',
    title: 'Red propia y segura',
    description: 'Infraestructura 100% propia para máxima seguridad',
    content: 'Nuestra red de fibra es completamente propia, lo que nos permite garantizar la máxima seguridad y estabilidad de tu conexión.',
    backgroundColor: '#fef2f2',
    textColor: '#991b1b',
    order: 2,
    isActive: 1
  },

  // Fibra-móvil - Sección Combos
  {
    id: 'info-combo-ahorro-1',
    page: 'fibra-movil',
    section: 'ahorro',
    icon: '💰',
    title: 'Ahorra hasta 25€/mes',
    description: 'Contratando fibra y móvil juntos obtienes el mejor precio',
    content: 'Al contratar nuestros packs combinados ahorras hasta 25€ al mes comparado con contratar los servicios por separado.',
    backgroundColor: '#fffbeb',
    textColor: '#92400e',
    order: 1,
    isActive: 1
  }
];

// 2. FAQ ITEMS - Preguntas frecuentes para diferentes páginas
const faqItems = [
  // Home - FAQs generales
  {
    id: 'faq-home-1',
    page: 'home',
    question: '¿Cuánto tiempo tarda la instalación?',
    answer: 'La instalación se realiza en un plazo de 1 a 7 días laborables desde la contratación. Nuestro equipo técnico te contactará para coordinar una cita que se ajuste a tu horario.',
    order: 1,
    isActive: 1
  },
  {
    id: 'faq-home-2',
    page: 'home',
    question: '¿Hay permanencia en los contratos?',
    answer: 'No tenemos permanencia obligatoria. Puedes darte de baja cuando quieras sin penalizaciones. Solo pedimos un preaviso de 30 días.',
    order: 2,
    isActive: 1
  },
  {
    id: 'faq-home-3',
    page: 'home',
    question: '¿Qué incluye el precio de la tarifa?',
    answer: 'El precio incluye la conexión, el router WiFi 6, la instalación, el mantenimiento y el soporte técnico 24/7. No hay costes ocultos.',
    order: 3,
    isActive: 1
  },

  // Móvil - FAQs específicas de móvil
  {
    id: 'faq-movil-1',
    page: 'movil',
    question: '¿Puedo mantener mi número actual?',
    answer: 'Sí, nos encargamos gratuitamente de la portabilidad de tu número. El proceso es automático y no tendrás cortes de servicio.',
    order: 1,
    isActive: 1
  },
  {
    id: 'faq-movil-2',
    page: 'movil',
    question: '¿Qué cobertura tiene la red móvil?',
    answer: 'Tenemos cobertura 4G en el 99.5% del territorio español y 5G en las principales ciudades. Puedes consultar la cobertura en tu zona desde nuestra web.',
    order: 2,
    isActive: 1
  },

  // Fibra - FAQs técnicas de fibra
  {
    id: 'faq-fibra-1',
    page: 'fibra',
    question: '¿Qué velocidad real obtendré?',
    answer: 'Garantizamos el 100% de la velocidad contratada. Con nuestro sistema de medición continua, si no alcanzas la velocidad contratada, te compensamos económicamente.',
    order: 1,
    isActive: 1
  },
  {
    id: 'faq-fibra-2',
    page: 'fibra',
    question: '¿Necesito obras en mi edificio?',
    answer: 'En el 90% de los casos no son necesarias obras. Si tu edificio no tiene fibra, gestionamos gratuitamente los permisos y la instalación comunitaria.',
    order: 2,
    isActive: 1
  }
];

// 3. CONTENT BLOCKS - Contenido adicional para páginas
const pages = [
  {
    id: 'page-home',
    slug: 'home',
    title: 'Prisma Móvil - Tu operadora de confianza',
    description: 'Las mejores tarifas de fibra y móvil con atención personalizada'
  },
  {
    id: 'page-about',
    slug: 'nosotros',
    title: 'Sobre Nosotros',
    description: 'Conoce la historia y valores de Prisma Móvil'
  }
];

const contentBlocks = [
  {
    id: 'content-home-hero-text',
    pageId: 'page-home',
    section: 'hero-text',
    title: '¿Por qué elegir Prisma?',
    content: 'Somos más que una operadora. Somos tu compañía de telecomunicaciones de confianza, comprometida con ofrecerte la mejor conectividad y el trato más cercano.',
    imageUrl: '/empresa.webp',
    ctaText: 'Conocer más',
    ctaLink: '/nosotros',
    order: 1,
    isActive: 1
  },
  {
    id: 'content-home-values',
    pageId: 'page-home',
    section: 'valores',
    title: 'Nuestros valores',
    content: 'Transparencia, calidad y cercanía son los pilares que nos definen. No creemos en las letras pequeñas ni en los compromisos confusos. Todo claro, todo sencillo.',
    order: 2,
    isActive: 1
  },
  {
    id: 'content-about-history',
    pageId: 'page-about',
    section: 'historia',
    title: 'Nuestra historia',
    content: 'Prisma nació en 2018 con una misión clara: revolucionar las telecomunicaciones españolas ofreciendo un servicio transparente, de calidad y con atención humana.',
    imageUrl: '/placeholder.jpg',
    order: 1,
    isActive: 1
  }
];

console.log('📋 Insertando InformationCards...');

// Función para insertar InformationCards
const insertInformationCards = () => {
  return new Promise((resolve, reject) => {
    let completed = 0;
    const total = informationCards.length;

    informationCards.forEach((card) => {
      const stmt = db.prepare(`
        INSERT OR REPLACE INTO InformationCard (
          id, page, section, icon, title, description, content, imageUrl, 
          backgroundColor, textColor, "order", isActive, createdAt
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `);
      
      const now = new Date().toISOString();
      
      stmt.run([
        card.id, card.page, card.section, card.icon, card.title, card.description,
        card.content, card.imageUrl, card.backgroundColor, card.textColor,
        card.order, card.isActive, now
      ], function(err) {
        if (err) {
          console.error('Error insertando InformationCard:', err);
        } else {
          console.log(`✅ InformationCard: ${card.title} (${card.page}/${card.section})`);
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

// Función para insertar FAQs
const insertFAQs = () => {
  return new Promise((resolve, reject) => {
    let completed = 0;
    const total = faqItems.length;

    faqItems.forEach((faq) => {
      const stmt = db.prepare(`
        INSERT OR REPLACE INTO FAQItem (
          id, page, question, answer, "order", isActive, createdAt
        ) VALUES (?, ?, ?, ?, ?, ?, ?)
      `);
      
      const now = new Date().toISOString();
      
      stmt.run([
        faq.id, faq.page, faq.question, faq.answer, faq.order, faq.isActive, now
      ], function(err) {
        if (err) {
          console.error('Error insertando FAQ:', err);
        } else {
          console.log(`✅ FAQ: ${faq.question.substring(0, 50)}... (${faq.page})`);
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

// Función para insertar Pages y ContentBlocks
const insertPagesAndContent = () => {
  return new Promise((resolve, reject) => {
    let completed = 0;
    const totalPages = pages.length;
    const totalBlocks = contentBlocks.length;

    // Insertar páginas primero
    pages.forEach((page) => {
      const stmt = db.prepare(`
        INSERT OR REPLACE INTO Page (
          id, slug, title, description, createdAt, updatedAt
        ) VALUES (?, ?, ?, ?, ?, ?)
      `);
      
      const now = new Date().toISOString();
      
      stmt.run([
        page.id, page.slug, page.title, page.description, now, now
      ], function(err) {
        if (err) {
          console.error('Error insertando Page:', err);
        } else {
          console.log(`✅ Page: ${page.title}`);
        }
        
        completed++;
        if (completed === totalPages) {
          stmt.finalize();
          // Ahora insertar content blocks
          insertContentBlocks(resolve);
        }
      });
    });
  });
};

const insertContentBlocks = (resolve) => {
  let completed = 0;
  const total = contentBlocks.length;

  contentBlocks.forEach((block) => {
    const stmt = db.prepare(`
      INSERT OR REPLACE INTO ContentBlock (
        id, pageId, section, title, content, imageUrl, ctaText, ctaLink, 
        "order", isActive, createdAt, updatedAt
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `);
    
    const now = new Date().toISOString();
    
    stmt.run([
      block.id, block.pageId, block.section, block.title, block.content,
      block.imageUrl, block.ctaText, block.ctaLink, block.order, block.isActive, now, now
    ], function(err) {
      if (err) {
        console.error('Error insertando ContentBlock:', err);
      } else {
        console.log(`✅ ContentBlock: ${block.title} (${block.section})`);
      }
      
      completed++;
      if (completed === total) {
        stmt.finalize();
        resolve();
      }
    });
  });
};

// Ejecutar todas las inserciones
async function insertAllExamples() {
  try {
    await insertInformationCards();
    console.log('\n📝 Insertando FAQs...');
    await insertFAQs();
    console.log('\n📄 Insertando Pages y ContentBlocks...');
    await insertPagesAndContent();
    
    console.log('\n🎉 ¡Todos los ejemplos insertados correctamente!');
    console.log('\n📊 Resumen:');
    console.log(`- ${informationCards.length} InformationCards`);
    console.log(`- ${faqItems.length} FAQs`);
    console.log(`- ${pages.length} Pages`);
    console.log(`- ${contentBlocks.length} ContentBlocks`);
    
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

insertAllExamples();
