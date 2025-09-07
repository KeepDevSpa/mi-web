"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Zap, 
  DollarSign, 
  Clock, 
  Smartphone, 
  Settings, 
  Shield,
  Globe,
  TrendingUp,
  X,
  Check
} from "lucide-react";

export default function VentajasDigitales() {
  const ventajas = [
    {
      id: 1,
      icono: <DollarSign className="w-8 h-8" />,
      titulo: "Precios Revolucionarios",
      descripcion: "Sin gastos de locales físicos = Más ahorro para ti",
      beneficio: "Hasta 50% más barato que operadoras tradicionales",
      comparacion: "Otros: Alquiler + Personal + Gastos → Precios altos",
      nosotros: "Prisma: 100% Digital → Precios reales",
      icono_color: "text-green-500",
      bg_color: "from-green-50 to-emerald-50"
    },
    {
      id: 2,
      icono: <Clock className="w-8 h-8" />,
      titulo: "Velocidad Extrema",
      descripcion: "Contratación en minutos, no en semanas",
      beneficio: "De 0 a cliente satisfecho en menos de 5 minutos",
      comparacion: "Otros: Citas, desplazamientos, papeleos → Semanas",
      nosotros: "Prisma: 3 clics online → Minutos",
      icono_color: "text-blue-500",
      bg_color: "from-blue-50 to-sky-50"
    },
    {
      id: 3,
      icono: <Globe className="w-8 h-8" />,
      titulo: "Disponibilidad Total",
      descripcion: "24/7/365 desde cualquier lugar del mundo",
      beneficio: "Nunca cerrado, siempre disponible para ti",
      comparacion: "Otros: Horarios limitados, ubicaciones específicas",
      nosotros: "Prisma: Siempre abierto, en todas partes",
      icono_color: "text-purple-500",
      bg_color: "from-purple-50 to-violet-50"
    },
    {
      id: 4,
      icono: <Smartphone className="w-8 h-8" />,
      titulo: "Control Total Mobile",
      descripcion: "Gestiona todo desde tu móvil, cuando quieras",
      beneficio: "Tu operadora en el bolsillo, siempre contigo",
      comparacion: "Otros: Depender de oficinas y horarios",
      nosotros: "Prisma: App completa, control absoluto",
      icono_color: "text-orange-500",
      bg_color: "from-orange-50 to-amber-50"
    },
    {
      id: 5,
      icono: <Settings className="w-8 h-8" />,
      titulo: "Flexibilidad Extrema",
      descripcion: "Cambios instantáneos, sin trabas burocráticas",
      beneficio: "Adapta tu tarifa a tu vida, no al revés",
      comparacion: "Otros: Cambios complicados, ataduras contractuales",
      nosotros: "Prisma: Cambios inmediatos, libertad total",
      icono_color: "text-indigo-500",
      bg_color: "from-indigo-50 to-blue-50"
    },
    {
      id: 6,
      icono: <Zap className="w-8 h-8" />,
      titulo: "Tecnología IA",
      descripcion: "Inteligencia artificial + toque humano",
      beneficio: "Soporte inteligente que aprende de ti",
      comparacion: "Otros: Bots básicos o solo atención humana lenta",
      nosotros: "Prisma: IA avanzada + humanos cuando importa",
      icono_color: "text-pink-500",
      bg_color: "from-pink-50 to-rose-50"
    },
    {
      id: 7,
      icono: <Shield className="w-8 h-8" />,
      titulo: "Transparencia Total",
      descripcion: "Cero letra pequeña, todo claro desde el día 1",
      beneficio: "Sabes exactamente qué pagas y qué recibes",
      comparacion: "Otros: Condiciones ocultas, sorpresas en factura",
      nosotros: "Prisma: Transparencia radical, sin trucos",
      icono_color: "text-teal-500",
      bg_color: "from-teal-50 to-cyan-50"
    }
  ];

  const comparativaCompetencia = [
    {
      aspecto: "Tiempo de contratación",
      competencia: "2-4 semanas",
      prisma: "3-5 minutos",
      ventaja: "98% más rápido"
    },
    {
      aspecto: "Disponibilidad atención",
      competencia: "L-V 9h-18h",
      prisma: "24/7/365",
      ventaja: "Siempre disponible"
    },
    {
      aspecto: "Costes operativos",
      competencia: "Locales + Personal",
      prisma: "Solo tecnología",
      ventaja: "50% menos costes"
    },
    {
      aspecto: "Flexibilidad cambios",
      competencia: "Gestiones presenciales",
      prisma: "Cambios instantáneos",
      ventaja: "Libertad total"
    }
  ];

  return (
    <div className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        
        {/* Header */}
        <div className="text-center mb-16">
          <Badge className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-4 py-2 mb-4">
            🚀 VENTAJAS DEL FUTURO
          </Badge>
          <h2 className="text-4xl font-bold text-gray-800 mb-4">
            7 razones por las que somos
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600"> diferentes</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Mientras otros siguen en el pasado con locales caros y procesos lentos, 
            nosotros ya estamos en el futuro. <strong>Y tú también puedes estar.</strong>
          </p>
        </div>

        {/* Grid de ventajas */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {ventajas.map((ventaja) => (
            <Card key={ventaja.id} className="group hover:shadow-xl transition-all duration-300 border-0 overflow-hidden">
              <CardContent className={`p-8 bg-gradient-to-br ${ventaja.bg_color} h-full`}>
                <div className="flex flex-col h-full">
                  
                  {/* Icono y título */}
                  <div className="mb-6">
                    <div className={`${ventaja.icono_color} mb-4 group-hover:scale-110 transition-transform`}>
                      {ventaja.icono}
                    </div>
                    <h3 className="text-xl font-black text-gray-800 mb-2">
                      {ventaja.titulo}
                    </h3>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      {ventaja.descripcion}
                    </p>
                  </div>

                  {/* Beneficio destacado */}
                  <div className="bg-white/70 backdrop-blur-sm rounded-lg p-4 mb-4 flex-grow">
                    <div className="flex items-start space-x-2">
                      <TrendingUp className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                      <p className="text-sm font-bold text-gray-800">
                        {ventaja.beneficio}
                      </p>
                    </div>
                  </div>

                  {/* Comparación rápida */}
                  <div className="space-y-2 text-xs">
                    <div className="flex items-center space-x-2 text-red-600">
                      <X className="w-4 h-4" />
                      <span className="line-through opacity-75">{ventaja.comparacion}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-green-600 font-bold">
                      <Check className="w-4 h-4" />
                      <span>{ventaja.nosotros}</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Comparativa directa con la competencia */}
        <div className="bg-white rounded-3xl p-8 shadow-xl border">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-gray-800 mb-4">
              📊 Prisma Digital vs Operadoras Tradicionales
            </h3>
            <p className="text-gray-600">
              Los números hablan por sí solos. <strong>No hay color.</strong>
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b-2 border-gray-200">
                  <th className="text-left py-4 px-4 font-bold text-gray-800">Aspecto</th>
                  <th className="text-center py-4 px-4 font-bold text-red-600">Competencia Tradicional</th>
                  <th className="text-center py-4 px-4 font-bold text-green-600">Prisma Digital</th>
                  <th className="text-center py-4 px-4 font-bold text-blue-600">Ventaja</th>
                </tr>
              </thead>
              <tbody>
                {comparativaCompetencia.map((item, index) => (
                  <tr key={index} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                    <td className="py-4 px-4 font-semibold text-gray-700">{item.aspecto}</td>
                    <td className="py-4 px-4 text-center text-red-600">
                      <div className="flex items-center justify-center space-x-2">
                        <X className="w-4 h-4" />
                        <span>{item.competencia}</span>
                      </div>
                    </td>
                    <td className="py-4 px-4 text-center text-green-600 font-bold">
                      <div className="flex items-center justify-center space-x-2">
                        <Check className="w-4 h-4" />
                        <span>{item.prisma}</span>
                      </div>
                    </td>
                    <td className="py-4 px-4 text-center">
                      <Badge variant="outline" className="border-blue-200 text-blue-700 bg-blue-50">
                        {item.ventaja}
                      </Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Call to action final */}
        <div className="mt-16 text-center">
          <div className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl p-8 text-white">
            <h3 className="text-2xl font-bold mb-4">
              ¿Preparado para el futuro? 🚀
            </h3>
            <p className="text-lg mb-6 opacity-90">
              Mientras otros siguen anclados en el pasado, 
              <strong> tú ya puedes estar en el futuro</strong>.
            </p>
            <div className="flex flex-col md:flex-row gap-4 justify-center items-center">
              <button className="bg-white text-purple-600 font-bold px-8 py-3 rounded-full hover:bg-gray-100 transition-colors">
                ¡Quiero ser del futuro! 🚀
              </button>
              <span className="text-sm opacity-75">
                Contratación en 3 minutos • Sin papeleos • Sin esperas
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
