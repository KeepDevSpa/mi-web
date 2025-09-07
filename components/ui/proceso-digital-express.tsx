"use client";

import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  MousePointer, 
  FileText, 
  CheckCircle, 
  Zap,
  Clock,
  Smartphone,
  ArrowRight,
  Play
} from "lucide-react";

export default function ProcesoDigitalExpress() {
  const [pasoActivo, setPasoActivo] = useState(0);
  const [simulacionActiva, setSimulacionActiva] = useState(false);

  const pasos = [
    {
      id: 1,
      icono: <MousePointer className="w-8 h-8" />,
      titulo: "ELIGES",
      tiempo: "30 segundos",
      descripcion: "Selecciona tu tarifa ideal con nuestro configurador inteligente",
      detalles: [
        "🎯 Configurador que aprende de tus hábitos",
        "📊 Comparativa automática de planes", 
        "💡 Recomendaciones personalizadas",
        "⚡ Sin complicaciones ni letra pequeña"
      ],
      color: "from-blue-500 to-cyan-500",
      bgColor: "from-blue-50 to-cyan-50"
    },
    {
      id: 2,
      icono: <FileText className="w-8 h-8" />,
      titulo: "CONFIRMAS",
      tiempo: "90 segundos", 
      descripcion: "Datos básicos y confirmación. Sin papeleos innecesarios.",
      detalles: [
        "📝 Formulario express inteligente",
        "🔒 Máxima seguridad y privacidad",
        "📱 Firma digital válida legalmente",
        "🚫 Sin documentación física"
      ],
      color: "from-green-500 to-emerald-500", 
      bgColor: "from-green-50 to-emerald-50"
    },
    {
      id: 3,
      icono: <CheckCircle className="w-8 h-8" />,
      titulo: "¡ACTIVADO!",
      tiempo: "Inmediato",
      descripcion: "Bienvenido a Prisma. Ya eres parte del futuro.",
      detalles: [
        "🎉 Activación automática instantánea",
        "📧 Email de bienvenida con todo",
        "📱 App descargada y configurada",
        "🎁 Beneficios activos desde el minuto 1"
      ],
      color: "from-purple-500 to-pink-500",
      bgColor: "from-purple-50 to-pink-50"
    }
  ];

  // Simulación automática
  useEffect(() => {
    if (simulacionActiva) {
      const interval = setInterval(() => {
        setPasoActivo((prev) => (prev + 1) % pasos.length);
      }, 2000);
      return () => clearInterval(interval);
    }
  }, [simulacionActiva, pasos.length]);

  const tiempoTotal = "3-5 minutos";
  
  return (
    <div className="py-16 bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="container mx-auto px-4">
        
        {/* Header con impacto */}
        <div className="text-center mb-16">
          <Badge className="bg-gradient-to-r from-green-500 to-blue-500 text-white px-6 py-2 mb-4 text-sm font-bold">
            ⚡ PROCESO REVOLUCIONARIO
          </Badge>
          
          <h2 className="text-4xl md:text-5xl font-black text-gray-800 mb-4">
            De 0 a cliente feliz en
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-green-500 to-blue-500 text-5xl md:text-6xl">
              {tiempoTotal}
            </span>
          </h2>
          
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Mientras otros te hacen esperar <strong>semanas</strong> con papeleos y citas, 
            nosotros te activamos en <strong>minutos</strong>. Esto sí es el futuro.
          </p>

          {/* Botón de simulación */}
          <div className="flex flex-col md:flex-row gap-4 justify-center items-center mb-12">
            <Button 
              onClick={() => setSimulacionActiva(!simulacionActiva)}
              className={`px-8 py-3 font-bold text-lg transition-all ${
                simulacionActiva 
                  ? 'bg-red-500 hover:bg-red-600' 
                  : 'bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600'
              } text-white`}
            >
              <Play className="w-5 h-5 mr-2" />
              {simulacionActiva ? 'Parar simulación' : 'Ver simulación en vivo'}
            </Button>
            <span className="text-sm text-gray-500">
              👆 Mira lo rápido que es en realidad
            </span>
          </div>
        </div>

        {/* Comparativa de tiempos */}
        <div className="bg-white rounded-2xl p-8 shadow-xl mb-16 border">
          <h3 className="text-center text-xl font-bold text-gray-800 mb-6">
            📊 Comparativa de tiempos reales
          </h3>
          <div className="grid md:grid-cols-2 gap-8">
            {/* Competencia tradicional */}
            <div className="text-center">
              <div className="text-red-500 text-3xl font-black mb-2">2-4 semanas</div>
              <div className="text-gray-600 font-bold mb-4">Operadoras tradicionales</div>
              <div className="space-y-2 text-sm text-gray-500">
                <div>📞 Llamada para información</div>
                <div>📅 Cita en tienda física</div>
                <div>📋 Papeleos y documentación</div>
                <div>⏳ Esperas y validaciones</div>
                <div>🔧 Instalación programada</div>
                <div className="text-red-600 font-bold">😤 Estrés incluido</div>
              </div>
            </div>
            
            {/* Prisma Digital */}
            <div className="text-center">
              <div className="text-green-500 text-3xl font-black mb-2">{tiempoTotal}</div>
              <div className="text-gray-600 font-bold mb-4">Prisma Digital</div>
              <div className="space-y-2 text-sm text-gray-500">
                <div>🎯 Configurador inteligente</div>
                <div>📝 Formulario express</div>
                <div>⚡ Activación automática</div>
                <div>📱 Todo desde tu móvil</div>
                <div>🚀 Inmediato y sin esperas</div>
                <div className="text-green-600 font-bold">😊 Tranquilidad total</div>
              </div>
            </div>
          </div>
          
          {/* Destacado de ventaja */}
          <div className="mt-8 p-4 bg-gradient-to-r from-green-100 to-blue-100 rounded-lg text-center">
            <p className="text-lg font-bold text-gray-800">
              🏆 <span className="text-green-600">96% más rápido</span> que la competencia tradicional
            </p>
          </div>
        </div>

        {/* Proceso paso a paso */}
        <div className="grid lg:grid-cols-3 gap-8 mb-16">
          {pasos.map((paso, index) => (
            <Card 
              key={paso.id} 
              className={`relative overflow-hidden transition-all duration-500 cursor-pointer ${
                pasoActivo === index ? 'ring-4 ring-blue-400 shadow-2xl scale-105' : 'hover:shadow-lg'
              }`}
              onClick={() => setPasoActivo(index)}
            >
              <div className={`absolute top-0 right-0 w-16 h-16 bg-gradient-to-br ${paso.color} opacity-10 rounded-bl-full`}></div>
              
              {/* Badge de paso */}
              <div className={`absolute -top-2 -left-2 w-8 h-8 rounded-full bg-gradient-to-r ${paso.color} flex items-center justify-center text-white font-bold text-sm z-10`}>
                {index + 1}
              </div>

              <CardContent className={`p-8 bg-gradient-to-br ${paso.bgColor} h-full`}>
                <div className="flex flex-col h-full">
                  
                  {/* Header del paso */}
                  <div className="mb-6">
                    <div className={`text-gray-600 mb-4 transition-transform ${
                      pasoActivo === index ? 'scale-110' : ''
                    }`}>
                      {paso.icono}
                    </div>
                    
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-xl font-black text-gray-800">
                        {paso.titulo}
                      </h3>
                      <Badge variant="outline" className="text-xs font-bold">
                        <Clock className="w-3 h-3 mr-1" />
                        {paso.tiempo}
                      </Badge>
                    </div>
                    
                    <p className="text-gray-600 text-sm leading-relaxed">
                      {paso.descripcion}
                    </p>
                  </div>

                  {/* Detalles del paso */}
                  <div className={`space-y-2 transition-all duration-300 ${
                    pasoActivo === index ? 'opacity-100' : 'opacity-75'
                  }`}>
                    {paso.detalles.map((detalle, idx) => (
                      <div key={idx} className="flex items-start space-x-2 text-xs text-gray-600">
                        <span>{detalle}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Conexión entre pasos */}
        <div className="hidden lg:block absolute left-1/2 transform -translate-x-1/2 -mt-32">
          <div className="flex items-center space-x-8">
            <ArrowRight className="text-blue-400 w-8 h-8" />
            <ArrowRight className="text-green-400 w-8 h-8" />
          </div>
        </div>

        {/* Estadísticas de satisfacción */}
        <div className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-3xl p-8 text-white text-center">
          <h3 className="text-2xl font-bold mb-6">
            📊 Satisfacción del proceso digital
          </h3>
          
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="text-3xl font-black text-yellow-300 mb-2">98.7%</div>
              <div className="text-sm opacity-90">Satisfacción general</div>
            </div>
            <div>
              <div className="text-3xl font-black text-green-300 mb-2">4.2 min</div>
              <div className="text-sm opacity-90">Tiempo medio real</div>
            </div>
            <div>
              <div className="text-3xl font-black text-blue-300 mb-2">99.1%</div>
              <div className="text-sm opacity-90">Procesos sin errores</div>
            </div>
            <div>
              <div className="text-3xl font-black text-pink-300 mb-2">24/7</div>
              <div className="text-sm opacity-90">Disponibilidad</div>
            </div>
          </div>

          <div className="bg-white/20 backdrop-blur-sm rounded-xl p-6 max-w-2xl mx-auto">
            <p className="text-lg italic mb-4">
              "No me podía creer lo fácil que fue. En 3 minutos tenía todo listo. 
              <strong>Esto sí es el futuro de las telecomunicaciones.</strong>"
            </p>
            <p className="text-sm text-purple-200">
              - Laura M., primera contratación digital, Madrid
            </p>
          </div>
        </div>

        {/* CTA final */}
        <div className="mt-16 text-center">
          <Button 
            className="bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white font-black px-12 py-4 text-xl shadow-xl transform hover:scale-105 transition-all"
          >
            <Zap className="w-6 h-6 mr-2" />
            ¡Empezar ahora mismo! (3 minutos)
          </Button>
          <p className="text-sm text-gray-500 mt-3">
            ⚡ Proceso inmediato • 🔒 100% seguro • 📱 Todo online
          </p>
        </div>
      </div>
    </div>
  );
}
