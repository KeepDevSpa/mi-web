'use client';
import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import './prisma-essence.css';

export default function PrismaEssencePage() {
  // Estados y referencias
  const [showContactModal, setShowContactModal] = useState(false);
  const [formData, setFormData] = useState({ nombre: '', email: '', telefono: '', mensaje: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [visibleSections, setVisibleSections] = useState<Set<number>>(new Set());
  const [currentPoem, setCurrentPoem] = useState(0);
  const sectionRefs = useRef<(HTMLElement | null)[]>([]);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const verses = [
    "En un mundo que grita mentiras...",
    "Nosotros susurramos verdades.",
    "Donde otros prometen todo...",
    "Nosotros damos solo lo que somos.",
    "Auténticos. Reales. Tuyos."
  ];

  // Efectos visuales y animaciones
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentPoem((prev) => (prev + 1) % verses.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [verses.length]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const index = sectionRefs.current.indexOf(entry.target as HTMLElement);
          if (entry.isIntersecting && index !== -1) {
            setVisibleSections(prev => new Set([...prev, index]));
          }
        });
      },
      { threshold: 0.1, rootMargin: '100px 0px -50px 0px' }
    );
    sectionRefs.current.forEach((ref) => { if (ref) observer.observe(ref); });
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setShowContactModal(false);
    };
    if (showContactModal) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [showContactModal]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, source: 'Página de Esencia Prisma - Conexión Emocional', type: 'emotional_connection' }),
      });
      if (response.ok) {
        setShowContactModal(false);
        setFormData({ nombre: '', email: '', telefono: '', mensaje: '' });
        alert('Tu mensaje llegó a nuestro corazón. Te responderemos pronto.');
      } else {
        alert('Algo no salió bien. Inténtalo de nuevo.');
      }
    } catch (error) {
      alert('Error al enviar. Por favor, inténtalo de nuevo.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="essence-container">
      {/* Cursor personalizado */}
      <div className="custom-cursor" style={{ left: `${mousePosition.x}px`, top: `${mousePosition.y}px` }} />

      {/* Hero Poético */}
      <section ref={el => { sectionRefs.current[0] = el; }} className={`hero-poetry ${visibleSections.has(0) ? 'visible' : ''}`}>
        <div className="poetry-background">
          <div className="floating-light light-1"></div>
          <div className="floating-light light-2"></div>
          <div className="floating-light light-3"></div>
        </div>

        <div className="poetry-content">
          <div className="verse-container">
            {verses.map((verse, index) => (
              <div
                key={index}
                className={`verse ${currentPoem === index ? 'active' : ''}`}
              >
                {verse}
              </div>
            ))}
          </div>
          
          <div className="main-title">
            <h1>
              <span className="title-word">Esto</span>
              <span className="title-word highlight">es</span>
              <span className="title-word logo-container">
                <Image
                  src="/logo_prisma_movil_w.png"
                  alt="Prisma"
                  width={320}
                  height={96}
                  className="prisma-logo"
                />
              </span>
            </h1>
          </div>

          <div className="subtitle">
            <p>Donde la tecnología encuentra su alma</p>
          </div>

          <button 
            className="connect-button"
            onClick={() => setShowContactModal(true)}
          >
            <span>Conecta con nuestra esencia</span>
            <div className="button-ripple"></div>
          </button>
        </div>

        <div className="scroll-indicator">
          <div className="scroll-line"></div>
          <span>Descubre nuestra historia</span>
        </div>
      </section>

      {/* Sección: Nuestra Filosofía */}
      <section 
        ref={el => { sectionRefs.current[1] = el; }}
        className={`philosophy-section ${visibleSections.has(1) ? 'visible' : ''}`}
      >
        <div className="philosophy-container">
          <div className="philosophy-intro">
            <div className="prisma-definition">
              <div className="prisma-logo-main">
                <Image
                  src="/logo_prisma_movil_w.png"
                  alt="Prisma"
                  width={280}
                  height={84}
                  className="prisma-logo-hero"
                />
              </div>
              <h3 className="connection-subtitle">La Conexión Consciente</h3>
            </div>
            
            <div className="connection-statement">
              <p className="main-statement">Somos la nueva generación de OMV, la que realmente te cuida.</p>
            </div>
            
            <div className="mission-statement">
              <p>Nuestro trabajo es asegurar que nuestros clientes tengan:</p>
              <div className="mission-unified">
                <div className="mission-item">
                  <span className="mission-number">1</span>
                  <div className="mission-content">
                    <span className="mission-icon">📶</span>
                    <span>La mejor conexión posible, en el lugar que sea</span>
                  </div>
                </div>

                <div className="mission-item">
                  <span className="mission-number">2</span>
                  <div className="mission-content">
                    <span className="mission-icon">💰</span>
                    <span>Al precio más justo</span>
                  </div>
                </div>

                <div className="mission-item">
                  <span className="mission-number">3</span>
                  <div className="mission-content">
                    <span className="mission-icon">🆓</span>
                    <span>Con la máxima libertad</span>
                  </div>
                </div>

                <div className="mission-item">
                  <span className="mission-number">4</span>
                  <div className="mission-content">
                    <span className="mission-icon">🌍</span>
                    <span>Con un impacto positivo</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="final-call">
              <p className="conscience-message golden-phrase">Elige una conexión que te cuida a ti y al planeta</p>
            </div>
          </div>

          {/* Componente Integrado de Valores */}
          <div className="values-component">
            <div className="values-header">
              <h3 className="values-title">Esto es lo que creemos que la conectividad debería ser:</h3>
            </div>

            <div className="beliefs-grid">
              <div className="belief-card honest">
                <div className="belief-icon">💎</div>
                <h3>Honestidad Radical</h3>
                <p className="belief-subtitle">Porque mereces la verdad, siempre</p>
                <p>Sin letra pequeña. Sin sorpresas. Lo que ves es exactamente lo que obtienes.</p>
                <div className="belief-emotion">
                  <p>Imagina nunca más tener que leer páginas de condiciones. Imagina confiar completamente en tu operadora. <strong>Eso es lo que construimos contigo.</strong></p>
                </div>
                <div className="belief-promise">
                  <span>"Tu confianza vale más que cualquier ganancia"</span>
                </div>
              </div>

              <div className="belief-card human">
                <div className="belief-icon">🤝</div>
                <h3>Conexión Humana</h3>
                <p className="belief-subtitle">Personas reales para momentos reales</p>
                <p>Detrás de cada llamada, cada mensaje, cada problema resuelto, hay una persona real que se preocupa por ti.</p>
                <div className="belief-emotion">
                  <p>Cuando llames, no hablarás con un robot. Hablarás con alguien que entiende que tu tiempo es valioso, que tu problema importa, que <strong>tú importas.</strong></p>
                </div>
                <div className="belief-promise">
                  <span>"Contigo, no eres un número. Eres familia."</span>
                </div>
              </div>

              <div className="belief-card innovation">
                <div className="belief-icon">🚀</div>
                <h3>Innovación Consciente</h3>
                <p className="belief-subtitle">Tecnología que mejora tu vida, no la complica</p>
                <p>Avanzamos no por avanzar, sino para mejorar realmente tu día a día.</p>
                <div className="belief-emotion">
                  <p>Cada nueva función que desarrollamos tiene un solo objetivo: <strong>hacerte la vida más fácil y feliz.</strong> No innovamos por presumir, innovamos por ti.</p>
                </div>
                <div className="belief-promise">
                  <span>"La tecnología debe servir a las personas, no al revés"</span>
                </div>
              </div>

              <div className="belief-card sustainability">
                <div className="belief-icon">🌱</div>
                <h3>Futuro Sostenible</h3>
                <p className="belief-subtitle">Pensando en el mundo de mañana</p>
                <p>Cada decisión la tomamos pensando en el impacto a largo plazo.</p>
                <div className="belief-emotion">
                  <p>Cuando miras a tus hijos a los ojos, quieres saber que estás construyendo un futuro mejor para ellos. <strong>Nosotros también.</strong></p>
                </div>
                <div className="belief-promise">
                  <span>"Tu conectividad, su planeta"</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Sección: Los Tres Pilares Únicos */}
      <section 
        ref={el => { sectionRefs.current[2] = el; }}
        className={`pillars-section ${visibleSections.has(2) ? 'visible' : ''}`}
      >
        <div className="pillars-container">
          {/* Componente de Pilares */}
          <div className="pillars-component">
            <div className="pillars-header">
              <h2 className="pillars-main-title">
                Los Tres Pilares Únicos de{' '}
                <Image
                  src="/logo_prisma_movil_w.png"
                  alt="Prisma"
                  width={180}
                  height={54}
                  className="prisma-logo-inline"
                />
              </h2>
              
              <div className="pillars-poetic-intro">
                <p className="pillar-verse first">Tres pilares que sostienen</p>
                <p className="pillar-verse second">todo lo que hacemos por ti.</p>
                <p className="pillar-verse highlight">Únicos, sólidos, tuyos.</p>
              </div>
            </div>

            <div className="pillars-grid">
              <div className="pillar-card justice">
                <div className="pillar-icon">⚖️</div>
                <h3>Justicia Tarifaria</h3>
                <p className="pillar-subtitle">Porque mereces transparencia absoluta</p>
                <div className="pillar-features">
                  <div className="pillar-feature">
                    <span className="feature-bullet">•</span>
                    <p>Precios transparentes sin trucos ni subidas ocultas</p>
                  </div>
                  <div className="pillar-feature">
                    <span className="feature-bullet">•</span>
                    <p>IA que optimiza tu plan según tu uso real</p>
                  </div>
                  <div className="pillar-feature">
                    <span className="feature-bullet">•</span>
                    <p>Sin permanencias abusivas - libertad total</p>
                  </div>
                </div>
              </div>

              <div className="pillar-card connectivity">
                <div className="pillar-icon">📡</div>
                <h3>Conectividad Total</h3>
                <p className="pillar-subtitle">Donde otros fallan, nosotros conectamos</p>
                <div className="pillar-features">
                  <div className="pillar-feature">
                    <span className="feature-bullet">•</span>
                    <p>Doble cobertura móvil (+Orange y Movistar en una SIM)</p>
                  </div>
                  <div className="pillar-feature">
                    <span className="feature-bullet">•</span>
                    <p>Fibra Plus con calidad empresarial para hogares exigentes</p>
                  </div>
                  <div className="pillar-feature">
                    <span className="feature-bullet">•</span>
                    <p>eSIM global para +200 países desde tu app</p>
                  </div>
                  <div className="pillar-feature">
                    <span className="feature-bullet">•</span>
                    <p>Internet rural donde otros no llegan (Satélite o Internet portátil)</p>
                  </div>
                </div>
              </div>

              <div className="pillar-card ecosystem">
                <div className="pillar-icon">🛡️</div>
                <h3>Ecosistema de Tranquilidad</h3>
                <p className="pillar-subtitle">Tu vida digital y física, protegida</p>
                <div className="pillar-features">
                  <div className="pillar-feature">
                    <span className="feature-bullet">•</span>
                    <p>Seguridad física y digital integral</p>
                  </div>
                  <div className="pillar-feature">
                    <span className="feature-bullet">•</span>
                    <p>Asesoramiento energético gratuito</p>
                  </div>
                  <div className="pillar-feature">
                    <span className="feature-bullet">•</span>
                    <p>TDT incluido sin complicaciones</p>
                  </div>
                  <div className="pillar-feature">
                    <span className="feature-bullet">•</span>
                    <p>Soporte humano 24/7 sin robots</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="pillars-conclusion">
              <p>Estos tres pilares no son solo promesas.</p>
              <p className="highlight-verse">Son la base sobre la que construimos tu confianza.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Sección: Compromisos Triple */}
      <section 
        ref={el => { sectionRefs.current[3] = el; }}
        className={`commitments-section ${visibleSections.has(3) ? 'visible' : ''}`}
      >
        <div className="commitments-container">
          <div className="commitments-header">
            <h2>Nuestro Compromiso Triple</h2>
            <p className="commitments-intro">Porque cada promesa que hacemos tiene tres dimensiones:</p>
            <div className="intro-verse">
              <p className="verse-line">Contigo, con la sociedad,</p>
              <p className="verse-line">con la tecnología del mañana,</p>
              <p className="verse-line highlight-verse">y con el planeta que compartimos.</p>
            </div>
          </div>

          <div className="commitments-grid">
            <div className="commitment-card social">
              <div className="commitment-icon">🤝</div>
              <h3>Compromiso Social</h3>
              <p className="commitment-subtitle">Nadie se queda atrás</p>
              <div className="commitment-list">
                <div className="commitment-item">
                  <span className="bullet">•</span>
                  <p>Eliminamos la brecha digital rural.</p>
                </div>
                <div className="commitment-item">
                  <span className="bullet">•</span>
                  <p>Fijamos población y creamos oportunidades locales.</p>
                </div>
                <div className="commitment-item">
                  <span className="bullet">•</span>
                  <p>Nadie se queda atrás por vivir lejos.</p>
                </div>
                <div className="commitment-item special">
                  <span className="bullet">•</span>
                  <p><strong>¿No te llega la señal TDT o se corta?</strong> Con nuestros servicios te ofrecemos los principales canales del TDT <span className="highlight-text">¡GRATIS!</span></p>
                </div>
              </div>
            </div>

            <div className="commitment-card tech">
              <div className="commitment-icon">🚀</div>
              <h3>Compromiso Tecnológico</h3>
              <p className="commitment-subtitle">Innovación con propósito</p>
              <div className="commitment-list">
                <div className="commitment-item">
                  <span className="bullet">•</span>
                  <p>IA que trabaja para tu ahorro, no para nuestro beneficio.</p>
                </div>
                <div className="commitment-item">
                  <span className="bullet">•</span>
                  <p>Tecnología multi-red de última generación.</p>
                </div>
                <div className="commitment-item">
                  <span className="bullet">•</span>
                  <p>Conectividad sin fronteras, hoy.</p>
                </div>
              </div>
            </div>

            <div className="commitment-card environmental">
              <div className="commitment-icon">🌱</div>
              <h3>Compromiso Ambiental</h3>
              <p className="commitment-subtitle">Tu futuro, nuestro planeta</p>
              <div className="commitment-list">
                <div className="commitment-item">
                  <span className="bullet">•</span>
                  <p><strong>1% de ingresos + 1€ de cada cuota</strong> de nuestros clientes a propuestas ambientales votadas por la comunidad.</p>
                </div>
                <div className="commitment-item">
                  <span className="bullet">•</span>
                  <p>Transparencia total: informe anual de impacto</p>
                </div>
                <div className="commitment-item">
                  <span className="bullet">•</span>
                  <p>Potencialización de eSIM. Menos contaminación por plástico.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="commitment-promise">
            <p>Cada euro que nos confías se convierte en progreso.</p>
            <p className="highlight-verse">Cada cliente que se suma, suma al cambio.</p>
          </div>
        </div>
      </section>

      {/* Sección: La Historia Detrás */}
      <section 
        ref={el => { sectionRefs.current[4] = el; }}
        className={`story-section ${visibleSections.has(4) ? 'visible' : ''}`}
      >
        <div className="story-container">
          <div className="story-visual">
            <div className="story-circle main-circle">
              <span>TÚ</span>
            </div>
            <div className="story-circle satellite-1">
              <span>Familia</span>
            </div>
            <div className="story-circle satellite-2">
              <span>Trabajo</span>
            </div>
            <div className="story-circle satellite-3">
              <span>Pasiones</span>
            </div>
            <div className="story-circle satellite-4">
              <span>Futuro</span>
            </div>
            <div className="connection-lines"></div>
          </div>

          <div className="story-content">
            <h2>Todo empezó con una pregunta simple:</h2>
            <blockquote>
              "¿Y si una operadora realmente te conociera? ¿Y si entendiera que no eres solo un número de teléfono, sino una persona con sueños, miedos, familia, trabajo, pasiones?"
            </blockquote>
            
            <p>Esa pregunta nos obsesionó. Nos desveló. Nos hizo repensar todo.</p>
            
            <p>Porque nos dimos cuenta de que la tecnología no debería complicar tu vida, sino simplificarla. No debería distanciarte de lo que amas, sino acercarte.</p>

            <div className="story-highlight">
              <h3><Image
                  src="/logo_prisma_movil_w.png"
                  alt="Prisma"
                  width={160}
                  height={48}
                  className="prisma-logo-inline"
                />&nbsp;no es solo conectividad</h3>
              <p>Es el puente entre quién eres hoy y quién quieres llegar a ser mañana.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Sección: Propuestas Diferenciadoras */}
      <section 
        ref={el => { sectionRefs.current[5] = el; }}
        className={`differentiators-section ${visibleSections.has(5) ? 'visible' : ''}`}
      >
        <div className="differentiators-container">
          <h2>Por qué elegir Prisma es diferente</h2>
          <p className="differentiators-intro">No son solo servicios. Son razones por las que nuestros clientes nunca se van.</p>
          
          <div className="differentiators-showcase">
            {/* Tarifa Única Evolutiva */}
            <div className="differentiator-horizontal evolutionary">
              <div className="differentiator-visual">
                <div className="evolutionary-chart">
                  <div className="chart-bar year-1">
                    <span className="year-label">Año 1</span>
                    <div className="bar-fill">100%</div>
                  </div>
                  <div className="chart-bar year-2">
                    <span className="year-label">Año 2</span>
                    <div className="bar-fill">98%</div>
                  </div>
                  <div className="chart-bar year-3">
                    <span className="year-label">Año 3</span>
                    <div className="bar-fill">96%</div>
                  </div>
                </div>
              </div>
              <div className="differentiator-content">
                <h3>Tarifa Única Evolutiva</h3>
                <p>Todos los clientes tienen la misma tarifa. Si las tarifas mejoran, todos nuestros clientes se benefician. Además, recibirás un 2% de descuento por cada año que estés con nosotros.</p>
                <div className="communication-quote">
                  "Una tarifa, un precio. Sin laberintos. Y mejora cada año que estás con nosotros, porque tu lealtad tiene valor."
                </div>
              </div>
            </div>

            {/* Soporte Híbrido */}
            <div className="differentiator-horizontal hybrid-support">
              <div className="differentiator-content">
                <h3>Soporte Híbrido (IA + Expertos)</h3>
                <p>El tiempo de los clientes es oro. Por eso tendrás un servicio de IA 24h para información e incidencias simples, y nuestro equipo humano de expertos para cuestiones complejas.</p>
                <div className="communication-quote">
                  "Te ofrecemos un asistente de inteligencia artificial 24h. Para todo lo demás, hablarás con el equipo 'humano' de expertos de Prisma."
                </div>
              </div>
              <div className="differentiator-visual">
                <div className="support-flow">
                  <div className="support-step ai">
                    <div className="support-icon">🤖</div>
                    <span>IA 24/7</span>
                  </div>
                  <div className="flow-arrow">→</div>
                  <div className="support-step human">
                    <div className="support-icon">👨‍💼</div>
                    <span>Expertos</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Asesor de Ahorro */}
            <div className="differentiator-horizontal savings-advisor">
              <div className="differentiator-visual">
                <div className="savings-meter">
                  <div className="meter-circle">
                    <div className="meter-fill"></div>
                    <div className="meter-center">
                      <span className="savings-amount">€15</span>
                      <span className="savings-label">ahorrados</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="differentiator-content">
                <h3>Tu asesor de ahorro inteligente</h3>
                <p>Nuestra IA analiza tu consumo para asegurarse de que siempre estés en la tarifa óptima. Los primeros meses estudiará tu uso real para ofrecerte la mejor alternativa.</p>
                <div className="communication-quote">
                  "Nuestro objetivo no es que gastes más, es que pagues lo justo."
                </div>
              </div>
            </div>

            {/* Contrato de Confianza */}
            <div className="differentiator-horizontal trust-contract">
              <div className="differentiator-content">
                <h3>Nuestro Contrato de confianza</h3>
                <p>Un contrato de una sola hoja con lo que acordamos, más el Anexo de tranquilidad con todas las condiciones legales. Tu red de seguridad para máxima protección.</p>
                <div className="communication-quote">
                  "Tu relación, tus facturas y a quién llamas si algo pasa, es siempre con nosotros. El resto es solo tu red de seguridad."
                </div>
              </div>
              <div className="differentiator-visual">
                <div className="contract-stack">
                  <div className="contract-page main">
                    <div className="contract-header">Tu Contrato</div>
                    <div className="contract-lines"></div>
                  </div>
                  <div className="contract-page annex">
                    <div className="contract-header">Anexo Seguridad</div>
                    <div className="contract-lines small"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Pacto de Libertad */}
          <div className="freedom-pact">
            <h3>Pacto de Libertad Total: Elimina la permanencia</h3>
            <p>Tu libertad y ahorro son nuestros compromisos. En Prisma, tú tienes el control. Elige tu pacto de confianza.</p>
            
            <div className="pact-options">
              <div className="pact-option freedom">
                <h4>EL PACTO LIBERTAD TOTAL</h4>
                <p>Pagas la instalación una sola vez y eres libre desde el primer día. Sin permanencia, sin preguntas.</p>
                <div className="pact-highlight">
                  <p><strong>Y aquí está nuestro compromiso:</strong> Si después de 12 meses sigues con nosotros, te devolvemos el 100% del coste de la instalación.</p>
                  <p>Sí, has leído bien. Confiamos tanto en que querrás quedarte que, si nos das tu confianza durante un año, te devolvemos tu inversión inicial.</p>
                </div>
                <button className="pact-button freedom-btn">QUIERO LIBERTAD TOTAL</button>
              </div>

              <div className="pact-option trust">
                <h4>EL PACTO CONFIANZA MUTUA</h4>
                <p>Nosotros cubrimos el coste de la instalación por ti. A cambio, solo te pedimos que nos acompañes durante 12 meses.</p>
                <div className="pact-highlight">
                  <p>Si decides marcharte antes, simplemente abonas la parte proporcional que falte por cubrir. Sin sorpresas.</p>
                  <p>Es la opción ideal si prefieres no hacer ningún desembolso inicial.</p>
                </div>
                <button className="pact-button trust-btn">QUIERO CONFIANZA MUTUA</button>
              </div>
            </div>
          </div>

          {/* Más Diferenciadoras */}
          <div className="additional-differentiators-showcase">
            {/* Cobertura Flexible */}
            <div className="differentiator-horizontal coverage-flex">
              <div className="differentiator-visual">
                <div className="coverage-selector">
                  <div className="coverage-title">Cobertura</div>
                  <div className="network-options-container">
                    <div className="network-option movistar active">Movistar</div>
                    <div className="network-option orange">Orange</div>
                    <div className="network-option vodafone">Vodafone</div>
                  </div>
                </div>
              </div>
              <div className="differentiator-content">
                <h3>Móvil elección: Tu elección es tu libertad</h3>
                <p>¿Por qué casarte con una sola cobertura para siempre? Tienes acceso a las 3 grandes redes de España. Si la cobertura falla, te cambiamos a la red que mejor funcione. Gratis. Las veces que necesites.</p>
                <div className="communication-quote">
                  "Tu conexión se adapta a tu vida, no al revés. Se acabó el 'aquí no tengo cobertura'."
                </div>
              </div>
            </div>

            {/* TDT Gratuito */}
            <div className="differentiator-horizontal tdt-service">
              <div className="differentiator-content">
                <h3>TDT gratuito donde no llegue</h3>
                <p>En muchas zonas de España, estar conectado es más que tener WhatsApp. Es no sentirse aislado. Si la señal de TDT te falla, te la regalamos a través de tu conexión a internet.</p>
                <div className="communication-quote">
                  "Porque conectar de verdad va más allá de los megas."
                </div>
              </div>
              <div className="differentiator-visual">
                <div className="tdt-transition">
                  <div className="signal-weak">
                    <img 
                      src="/tdt_noSignal.png" 
                      alt="TDT Sin Señal" 
                      className="tdt-icon no-signal"
                    />
                    <div className="signal-bars weak no-signal-bars">
                      <div className="bar bar-1"></div>
                      <div className="bar bar-2 inactive"></div>
                      <div className="bar bar-3 inactive"></div>
                      <div className="bar bar-4 inactive"></div>
                    </div>
                  </div>
                  <div className="transition-arrow">→</div>
                  <div className="signal-strong">
                    <img 
                      src="/prismatv.png" 
                      alt="Prisma TV" 
                      className="tdt-icon prisma-tv"
                    />
                    <div className="signal-bars strong prismatv">
                      <div className="bar bar-1"></div>
                      <div className="bar bar-2"></div>
                      <div className="bar bar-3"></div>
                      <div className="bar bar-4"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Compromiso Medioambiental */}
            <div className="differentiator-horizontal environmental">
              <div className="differentiator-visual">
                <div className="environmental-impact">
                  <div className="tree-icon">🌱</div>
                  <div className="impact-counter">
                    <span className="counter-number">1€</span>
                    <span className="counter-label">por factura</span>
                  </div>
                  <div className="plus-sign">+</div>
                  <div className="impact-counter">
                    <span className="counter-number">1%</span>
                    <span className="counter-label">ingresos</span>
                  </div>
                </div>
              </div>
              <div className="differentiator-content">
                <h3>Compromiso medioambiental</h3>
                <p>Destinamos 1€ de tu tarifa mensual a proyectos de reforestación y recogida de plásticos. Además, aportamos el 1% de nuestros ingresos anuales al mismo proyecto.</p>
                <div className="communication-quote">
                  "Cada vez que pagas tu factura, sabes que estás colaborando a cuidar el medioambiente."
                </div>
              </div>
            </div>

            {/* Detalle Inesperado */}
            <div className="differentiator-horizontal nfc-detail">
              <div className="differentiator-content">
                <h3>El Detalle Inesperado (Pegatina NFC)</h3>
                <p>En tu carta de bienvenida encontrarás una pegatina NFC para tu router que te permitirá compartir tu WiFi de manera sencilla. Pero es más que eso: es un símbolo de pertenencia a nuestra revolución.</p>
                <div className="communication-quote">
                  "Tu pegatina te ayuda a conectar a los que más quieres y a hacer esta comunidad mucho más grande."
                </div>
              </div>
              <div className="differentiator-visual">
                <div className="nfc-demo">
                  <div className="router-visual">
                    <div className="router-body"></div>
                    <div className="nfc-sticker"></div>
                  </div>
                  <div className="nfc-waves"></div>
                  <div className="phone-connect">📱</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Sección: Tu Momento Prisma */}
      <section 
        ref={el => { sectionRefs.current[6] = el; }}
        className={`moment-section ${visibleSections.has(6) ? 'visible' : ''}`}
      >
        <div className="moment-container">
          <h2>Imagina por un momento...</h2>
          
          <div className="moments-grid">
            <div className="moment-card">
              <div className="moment-time">7:00 AM</div>
              <p>Te despiertas y tu casa ya está perfecta: la temperatura ideal, tu música favorita, el café listo.</p>
            </div>

            <div className="moment-card">
              <div className="moment-time">12:30 PM</div>
              <p>En el trabajo, tu conexión nunca falla. Esa videollamada importante sale perfecta.</p>
            </div>

            <div className="moment-card">
              <div className="moment-time">19:00 PM</div>
              <p>Llegas a casa y tu familia puede disfrutar juntos, sin interrupciones, sin problemas técnicos.</p>
            </div>

            <div className="moment-card">
              <div className="moment-time">22:00 PM</div>
              <p>Te vas a dormir tranquilo, sabiendo que todo está protegido y funcionando como debe ser.</p>
            </div>
          </div>

          <div className="moment-conclusion">
            <h3>Eso es un día con&nbsp;<Image
                src="/logo_prisma_movil_w.png"
                alt="Prisma"
                width={140}
                height={42}
                className="prisma-logo-inline"
              /></h3>
            <p>No es solo un servicio. Es paz mental. Es tiempo para lo que realmente importa.</p>
          </div>
        </div>
      </section>

      {/* Sección: Invitación Final */}
      <section 
        ref={(el) => { sectionRefs.current[7] = el; }}
        className={`invitation-section final-invitation ${visibleSections.has(7) ? 'visible' : ''}`}
      >
        <div className="poetry-background">
          <div className="floating-light light-1"></div>
          <div className="floating-light light-2"></div>
          <div className="floating-light light-3"></div>
        </div>
        <div className="invitation-container">
          <div className="invitation-content" style={{textAlign: 'center'}}>
            <div className="invitation-content mx-auto text-center" style={{ maxWidth: '600px' }}>
			  <h2 className="text-4xl font-extrabold mb-4 text-white drop-shadow-lg animate-bounce">
				¿Listo para sentir la diferencia?
			  </h2>
            </div>
            <p className="text-xl text-white/90 mb-8 animate-fade-in">
              Prisma no es solo una operadora. Es una comunidad de personas que creen en la conexión auténtica, la libertad y el impacto positivo. Aquí, cada cliente es parte de algo más grande.
            </p>
            <div className="invitation-poem mb-8 animate-fade-in">
              <p className="font-semibold text-white/80">No buscamos clientes, buscamos aliados.</p>
              <p className="font-semibold text-white/80">No prometemos perfección, prometemos humanidad.</p>
              <p className="font-semibold text-white/80">No vendemos megas, creamos momentos.</p>
            </div>
            <div className="community-icons mb-8 animate-fade-in" style={{display:'flex',justifyContent:'center',gap:'2rem'}}>
              <span className="icon-heart" style={{fontSize:'2.5rem'}}>💚</span>
              <span className="icon-people" style={{fontSize:'2.5rem'}}>🤝</span>
              <span className="icon-globe" style={{fontSize:'2.5rem'}}>🌍</span>
            </div>
            <div className="invitation-cta">
              <h3 className="text-2xl font-bold text-white mb-4 animate-fade-in">¿Quieres formar parte de Prisma?</h3>
              <p className="text-lg text-white/80 mb-6 animate-fade-in">Únete a una comunidad que te cuida, te escucha y te hace sentir orgulloso de tu elección.</p>
              <button 
                className="invitation-button heart-beat animate-pulse"
                style={{fontSize:'1.3rem',padding:'1rem 2.5rem',background:'#1a2f23',color:'#ffc100',fontWeight:'bold',borderRadius:'40px',boxShadow:'0 4px 24px rgba(34,197,94,0.15)'}}
                onClick={() => setShowContactModal(true)}
              >
                Quiero ser parte de Prisma
              </button>
              <div className="mt-6">
                <button 
                  className="cta-secondary"
                  style={{fontSize:'1rem',padding:'0.7rem 2rem',background:'rgba(255,255,255,0.10)',color:'#fff',borderRadius:'30px',border:'1px solid #fff',marginRight:'1rem'}}
                  onClick={() => setShowContactModal(true)}
                >
                  Quiero saber más
                </button>
              </div>
            </div>
            <div className="mt-10 animate-fade-in">
              <p className="text-white/70 italic">Prisma es tu espacio. Tu voz importa. Tu historia suma. <br/>Haz que tu conexión sea parte de algo grande.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Modal de Contacto Emocional */}
      {showContactModal && (
        <div className="modal-overlay" onClick={() => setShowContactModal(false)}>
          <div className="modal-content emotional" onClick={e => e.stopPropagation()}>
            <button 
              className="modal-close"
              onClick={() => setShowContactModal(false)}
            >
              ✕
            </button>

            <div className="modal-header">
              <h3>Conectemos</h3>
              <p>Cuéntanos un poco de ti para empezar esta conversación</p>
            </div>

            <form onSubmit={handleSubmit} className="contact-form emotional">
              <div className="form-group">
                <label>¿Cómo te llamas?</label>
                <input
                  type="text"
                  value={formData.nombre}
                  onChange={(e) => setFormData(prev => ({...prev, nombre: e.target.value}))}
                  placeholder="Tu nombre"
                  required
                />
              </div>

              <div className="form-group">
                <label>¿Cómo podemos contactarte?</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData(prev => ({...prev, email: e.target.value}))}
                  placeholder="tu@email.com"
                  required
                />
              </div>

              <div className="form-group">
                <label>Tu teléfono (opcional)</label>
                <input
                  type="tel"
                  value={formData.telefono}
                  onChange={(e) => setFormData(prev => ({...prev, telefono: e.target.value}))}
                  placeholder="Tu teléfono"
                />
              </div>

              <div className="form-group">
                <label>¿Qué te gustaría que sepamos?</label>
                <textarea
                  value={formData.mensaje}
                  onChange={(e) => setFormData(prev => ({...prev, mensaje: e.target.value}))}
                  placeholder="Cuéntanos qué te interesa, qué necesitas, o simplemente salúdanos..."
                  rows={4}
                  required
                />
              </div>

              <button 
                type="submit" 
                className={`submit-button ${isSubmitting ? 'submitting' : ''}`}
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Enviando...' : 'Conectar'}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
