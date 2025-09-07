"use client";

export default function SectionPrismaValues() {

  const nuestrosValores = [
    {
      numero: "01.",
      titulo: "Te cuidamos como mereces",
      descripcion: "Atención personal, soporte humano real y tecnología premium. Porque tu tranquilidad no tiene precio.",
      icono: "atencion-personal.gif", 
      alt: "Persona real sonriente atendiendo con cuidado y profesionalidad",
      detalles: "María, Carlos o Ana te atienden en menos de 30 segundos. Sin menús, sin esperas, sin frustraciones.",
      cta: "🤝 Conocer a tu equipo",
      beneficioEconomico: "Atención premium"
    },
    {
      numero: "02.",
      titulo: "Libertad total (como debe ser)",
      descripcion: "Sin permanencias porque confiamos en cuidarte bien. Te quedas por gusto, no por obligación.",
      icono: "libertad-total.gif",
      alt: "Puerta abriéndose simbolizando libertad de elección y respeto",
      detalles: "2,400 clientes han vuelto después de irse. Porque cuando tratas bien, la gente vuelve.",
      cta: "�️ Probar sin compromiso",
      beneficioEconomico: "Libertad real"
    },
    {
      numero: "03.",
      titulo: "Instalación que no falla",
      descripcion: "Técnicos profesionales, puntuales y que hacen las cosas bien. Como siempre debió ser.",
      icono: "instalacion-profesional.gif", 
      alt: "Técnico profesional instalando con cuidado y explicando el proceso",
      detalles: "97% puntual. Trabajan limpio. Te explican todo. Y si algo falla, lo arreglamos.",
      cta: "🔧 Reservar técnico profesional",
      beneficioEconomico: "Instalación premium"
    },
    {
      numero: "04.",
      titulo: "Tecnología que funciona de verdad",
      descripcion: "Equipos premium, fibra real y velocidad constante. Porque pagajas por calidad, no por problemas.",
      icono: "tecnologia-premium.gif",
      alt: "Equipos modernos funcionando perfectamente con indicadores de calidad",
      detalles: "Fibra simétrica real. Sin cortes. Sin ralentizaciones. Tecnología que justifica cada euro.",
      cta: "⚡ Ver la diferencia técnica",
      beneficioEconomico: "Calidad premium"
    }
  ];

  return (
    <section className="bg-white py-32">
      <div className="container mx-auto px-4 max-w-6xl">
        
        {/* Header - Enfocado en VALOR y EXPERIENCIA */}
        <div className="text-center mb-20">
          <h1 className="text-5xl md:text-7xl font-black text-gray-900 mb-8 leading-tight">
            La operadora que <span className="text-blue-600">realmente</span>
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
              te cuida
            </span>
            <span className="block text-gray-900 text-3xl md:text-4xl mt-4">
              como mereces
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-600 max-w-4xl mx-auto mb-8 leading-relaxed">
            <strong>Calidad premium</strong> con atención humana real. 
            Porque tu tiempo y tranquilidad <strong>valen más que todo</strong>.
          </p>
          
          {/* Propuesta de valor premium */}
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200 rounded-2xl p-6 max-w-2xl mx-auto mb-8">
            <div className="flex items-center justify-center space-x-2 mb-2">
              <span className="text-2xl">�</span>
              <span className="font-bold text-blue-600">EXPERIENCIA PREMIUM</span>
            </div>
            <p className="text-lg text-gray-700">
              <strong>No somos los más baratos</strong>, pero sí los que más te cuidamos. 
              <strong>Tecnología + humanidad</strong>
            </p>
            <p className="text-sm text-gray-600 mt-2">
              Porque mereces respeto, no solo un precio bajo
            </p>
          </div>
          
          {/* CTA principal - Enfocado en experiencia */}
          <div className="flex flex-col md:flex-row gap-4 justify-center items-center mb-8">
            <button className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-12 py-5 rounded-full font-bold text-xl shadow-2xl transform hover:scale-105 transition-all">
              🌟 Vivir la experiencia Prisma
            </button>
            <button className="border-2 border-blue-600 text-blue-600 px-8 py-4 rounded-full font-bold text-lg hover:bg-blue-50 transition-all duration-300">
              � Hablar con un humano real
            </button>
          </div>
          
          {/* Prueba social enfocada en satisfacción */}
          <div className="flex items-center justify-center space-x-6 text-sm text-gray-600">
            <div className="flex items-center">
              <span className="text-yellow-500 mr-1">⭐⭐⭐⭐⭐</span>
              <span>4.8/5 satisfacción cliente</span>
            </div>
            <div className="flex items-center">
              <span className="text-blue-600 mr-1">🤝</span>
              <span><strong>94% nos recomiendan</strong></span>
            </div>
          </div>
        </div>

        {/* El problema real del sector */}
        <div className="mb-20">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">¿Cansado de que te traten mal?</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8 leading-relaxed">
              El verdadero problema no es el precio. Son las <strong>horas perdidas en llamadas</strong>, 
              la frustración diaria y <strong>sentirte invisible</strong>.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-16">
            <div className="text-center bg-white rounded-2xl p-8 shadow-lg border border-red-100">
              <div className="text-5xl mb-4">😤</div>
              <h3 className="text-xl font-bold text-red-600 mb-4">Lo que NO queremos</h3>
              <ul className="text-left space-y-2 text-gray-600 text-sm">
                <li>• Menús telefónicos infinitos</li>
                <li>• "Su llamada es importante"</li>
                <li>• Técnicos que no vienen</li>
                <li>• Subidas sorpresa</li>
                <li>• Ser solo un número</li>
              </ul>
              <div className="bg-red-50 rounded-lg p-3">
                <p className="text-red-700 font-bold">€780 al año</p>
              </div>
            </div>
            <div className="text-center bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl p-8 shadow-xl border-2 border-blue-200">
              <div className="text-5xl mb-4">🌟</div>
              <h3 className="text-xl font-bold text-blue-600 mb-4">La experiencia Prisma</h3>
              <ul className="text-left space-y-2 text-gray-700 text-sm">
                <li>• Humanos reales en 30 segundos</li>
                <li>• "Hola María, ¿cómo podemos ayudarte?"</li>
                <li>• Técnico puntual y profesional</li>
                <li>• Precio justo, calidad premium</li>
                <li>• Eres lo más importante para nosotros</li>
              </ul>
              <div className="bg-blue-100 rounded-lg p-3">
                <p className="text-blue-700 font-bold">Experiencia premium</p>
              </div>
            </div>
            <div className="text-center bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
              <div className="text-5xl mb-4">🤷‍♂️</div>
              <h3 className="text-xl font-bold text-gray-600 mb-4">Otras opciones</h3>
              <ul className="text-left space-y-2 text-gray-600 text-sm">
                <li>• Precio bajo, experiencia peor</li>
                <li>• "Lo barato sale caro"</li>
                <li>• Sin soporte cuando lo necesitas</li>
                <li>• Te dejan tirado con problemas</li>
                <li>• Solo importa que pagues</li>
              </ul>
              <div className="bg-gray-50 rounded-lg p-3">
                <p className="text-gray-700 font-bold">Frustración garantizada</p>
              </div>
            </div>
          </div>

          <div className="text-center bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-8 max-w-4xl mx-auto">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              � En Prisma, <span className="text-blue-600">tú eres lo más importante</span>
            </h3>
            <p className="text-xl text-gray-700 mb-6">
              No somos los más baratos, pero sí los que <strong>más te cuidamos</strong>. 
              Porque creemos que mereces <strong>respeto y atención real</strong>.
            </p>
            <button className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-full font-bold text-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
              🤝 Conocer la diferencia Prisma
            </button>
          </div>
        </div>

        {/* Nuestros valores premium */}
        <div className="mb-20">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-800 mb-8">Los valores que nos definen</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Cada detalle pensado para <strong>cuidarte mejor</strong>. Porque la tecnología 
              debe estar al servicio de las personas, <strong>no al revés</strong>.
            </p>
          </div>

          <div className="space-y-16">
            {nuestrosValores.map((valor, index) => (
              <div key={index} className={`flex flex-col ${index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'} items-center gap-12 bg-white rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300`}>
                
                {/* Contenido enfocado en valores premium */}
                <div className="flex-1 text-center lg:text-left">
                  <div className="flex items-center mb-4">
                    <div className="text-5xl font-black text-gray-300 mr-4">{valor.numero}</div>
                    <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-2 rounded-full font-bold">
                      {valor.beneficioEconomico}
                    </div>
                  </div>
                  
                  <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">{valor.titulo}</h3>
                  <p className="text-xl text-gray-700 mb-4 leading-relaxed">{valor.descripcion}</p>
                  <p className="text-lg text-gray-600 mb-6 leading-relaxed">{valor.detalles}</p>
                  
                  {/* CTA específico por valor */}
                  <button className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-full font-bold text-lg hover:shadow-lg transition-all duration-300 transform hover:scale-105">
                    {valor.cta}
                  </button>
                </div>

                {/* GIF + Datos de conversión */}
                <div className="flex-shrink-0">
                  <div className="relative">
                    {/* Placeholder para GIF */}
                    <div className="w-64 h-64 bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl flex items-center justify-center shadow-lg">
                      <img 
                        src={`/gifs/${valor.icono}`}
                        alt={valor.alt}
                        className="w-48 h-48 object-contain"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.style.display = 'none';
                          const parent = target.parentElement;
                          if (parent) {
                            parent.innerHTML = `<span class="text-6xl">${index === 0 ? '💰' : index === 1 ? '🔓' : index === 2 ? '⚡' : '👥'}</span>`;
                          }
                        }}
                      />
                    </div>
                    
                    {/* Badge de beneficio económico */}
                    <div className="absolute -top-3 -right-3 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-bold animate-bounce">
                      {valor.beneficioEconomico}
                    </div>
                  </div>
                  
                  {/* Prueba social específica */}
                  <div className="mt-4 text-center bg-gray-50 rounded-lg p-3">
                    <div className="text-sm text-gray-600">
                      {index === 0 && "💡 Ahorro medio real verificado"}
                      {index === 1 && "🔄 2,439 clientes han vuelto"}
                      {index === 2 && "⏱️ 97% instalado en <24h"}
                      {index === 3 && "⭐ 4.8/5 satisfacción soporte"}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section - Enfocado en experiencia premium */}
        <div className="text-center bg-gradient-to-r from-blue-900 to-purple-900 rounded-3xl p-12 text-white">
          <h2 className="text-3xl font-bold mb-6">¿Preparado para ser tratado como mereces?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Miles de personas ya disfrutan de la <strong>experiencia Prisma</strong>. 
            Únete a la nueva generación de telecomunicaciones.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-6">
            <button className="bg-gradient-to-r from-blue-400 to-purple-500 text-white px-10 py-4 rounded-full font-bold text-xl hover:shadow-xl transition-all duration-300 transform hover:scale-105">
              🌟 VIVIR LA EXPERIENCIA PRISMA
            </button>
            <button className="border-2 border-white text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-white hover:text-purple-900 transition-all duration-300">
              � Hablar con un humano real
            </button>
          </div>
          
          <div className="flex items-center justify-center space-x-6 text-sm">
            <div className="flex items-center">
              <span className="text-blue-400 mr-2">✨</span>
              <span>Atención personal</span>
            </div>
            <div className="flex items-center">
              <span className="text-blue-400 mr-2">🤝</span>
              <span>Respeto por tu tiempo</span>
            </div>
            <div className="flex items-center">
              <span className="text-blue-400 mr-2">💎</span>
              <span>Calidad premium</span>
            </div>
          </div>
        </div>
        
      </div>
    </section>
  );
}
