'use client';

import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Store, 
  UserCheck, 
  Smartphone, 
  Shield, 
  Zap, 
  DollarSign,
  CheckCircle,
  ArrowRight,
  Heart,
  Wifi,
  Clock,
  Award
} from 'lucide-react';

interface Advantage {
  id: string;
  icon: React.ReactNode;
  title: string;
  description: string;
  highlight?: string;
  stats?: string;
  color: string;
  bgColor: string;
}

const advantages: Advantage[] = [
  {
    id: 'tiendas',
    icon: <Store className="w-8 h-8" />,
    title: 'Red de tiendas propias',
    description: 'Atención cara a cara cuando la necesites, sin intermediarios ni franquicias.',
    highlight: '12 tiendas',
    stats: 'En toda España',
    color: 'text-blue-600',
    bgColor: 'bg-blue-50'
  },
  {
    id: 'humanos',
    icon: <UserCheck className="w-8 h-8" />,
    title: 'Sin bots, solo humanos',
    description: 'Habla con personas reales que entienden tus problemas y los resuelven.',
    highlight: '0 bots',
    stats: '100% atención humana',
    color: 'text-green-600',
    bgColor: 'bg-green-50'
  },
  {
    id: '5g',
    icon: <Smartphone className="w-8 h-8" />,
    title: 'Red propia 5G',
    description: 'Cobertura garantizada con nuestra propia infraestructura, no dependemos de terceros.',
    highlight: '98%',
    stats: 'Cobertura nacional',
    color: 'text-purple-600',
    bgColor: 'bg-purple-50'
  },
  {
    id: 'instalacion',
    icon: <Zap className="w-8 h-8" />,
    title: 'Instalación gratuita',
    description: 'Sin costes ocultos ni sorpresas. Lo que ves es lo que pagas, siempre.',
    highlight: '0€',
    stats: 'Valorada en 90€',
    color: 'text-orange-600',
    bgColor: 'bg-orange-50'
  },
  {
    id: 'rapidez',
    icon: <Clock className="w-8 h-8" />,
    title: 'Conexión en 5 días',
    description: 'El récord del sector. Mientras otros tardan semanas, tú navegas en días.',
    highlight: '5 días',
    stats: 'Media real',
    color: 'text-red-600',
    bgColor: 'bg-red-50'
  },
  {
    id: 'libertad',
    icon: <Shield className="w-8 h-8" />,
    title: 'Sin permanencia',
    description: 'Libertad total para cambiar cuando quieras. Confía en nosotros, no en contratos.',
    highlight: '0 meses',
    stats: 'Permanencia mínima',
    color: 'text-teal-600',
    bgColor: 'bg-teal-50'
  },
  {
    id: 'garantia',
    icon: <Award className="w-8 h-8" />,
    title: 'Garantía de velocidad',
    description: 'Si no tienes la velocidad prometida, te devolvemos el dinero. Sin excusas.',
    highlight: '100%',
    stats: 'Garantía o devolución',
    color: 'text-indigo-600',
    bgColor: 'bg-indigo-50'
  }
];

interface VentajasDiferencialesProps {
  showStats?: boolean;
  animateOnScroll?: boolean;
}

const VentajasDiferenciales = ({ 
  showStats = true,
  animateOnScroll = true 
}: VentajasDiferencialesProps) => {

  return (
    <section className="py-20 bg-white relative overflow-hidden">
      
      {/* Background Elements */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-blue-100 rounded-full -translate-x-36 -translate-y-36 opacity-50"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-green-100 rounded-full translate-x-48 translate-y-48 opacity-50"></div>
      
      <div className="max-w-7xl mx-auto px-4 relative z-10">
        
        {/* Header */}
        <div className="text-center mb-16">
          <Badge className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-2 text-sm font-bold mb-6">
            ⭐ LO QUE NOS HACE ÚNICOS
          </Badge>
          
          <h2 className="text-4xl lg:text-6xl font-black text-gray-900 mb-6">
            7 ventajas que
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
              {' '}solo Prisma{' '}
            </span>
            te ofrece
          </h2>
          
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            No somos una empresa de telecomunicaciones más. Somos la revolución que el sector necesitaba:
            <strong> transparente, humana y realmente centrada en ti</strong>.
          </p>
        </div>

        {/* Advantages Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-16">
          {advantages.map((advantage, index) => (
            <Card 
              key={advantage.id}
              className={`
                group hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2
                border-2 border-gray-100 hover:border-gray-200 overflow-hidden
                ${animateOnScroll ? 'opacity-0 animate-fade-in-up' : ''}
              `}
              style={{
                animationDelay: animateOnScroll ? `${index * 100}ms` : '0ms'
              }}
            >
              <CardContent className="p-6 h-full flex flex-col">
                
                {/* Icon Header */}
                <div className={`${advantage.bgColor} ${advantage.color} w-16 h-16 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                  {advantage.icon}
                </div>

                {/* Content */}
                <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">
                  {advantage.title}
                </h3>
                
                <p className="text-gray-600 mb-4 flex-grow text-sm leading-relaxed">
                  {advantage.description}
                </p>

                {/* Stats */}
                {showStats && advantage.highlight && (
                  <div className="border-t pt-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className={`text-2xl font-black ${advantage.color}`}>
                          {advantage.highlight}
                        </div>
                        <div className="text-xs text-gray-500">
                          {advantage.stats}
                        </div>
                      </div>
                      <ArrowRight 
                        size={20} 
                        className={`${advantage.color} opacity-0 group-hover:opacity-100 transform translate-x-2 group-hover:translate-x-0 transition-all duration-300`}
                      />
                    </div>
                  </div>
                )}

              </CardContent>
            </Card>
          ))}
        </div>

        {/* Comparison Section */}
        <div className="bg-gradient-to-br from-gray-50 to-blue-50 rounded-3xl p-8 md:p-12">
          <div className="text-center mb-10">
            <h3 className="text-3xl font-bold text-gray-900 mb-4">
              ¿Por qué cambiar a Prisma?
            </h3>
            <p className="text-lg text-gray-600">
              La comparación que otras operadoras no quieren que veas
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            
            {/* Otras Operadoras */}
            <Card className="border-2 border-red-200 bg-red-50">
              <CardContent className="p-6">
                <div className="text-center mb-6">
                  <Badge variant="destructive" className="px-4 py-1 text-sm font-bold mb-2">
                    ❌ OTRAS OPERADORAS
                  </Badge>
                  <h4 className="text-xl font-bold text-red-700">Lo que NO quieres</h4>
                </div>
                
                <div className="space-y-3">
                  {[
                    'Bots que no resuelven nada',
                    'Instalaciones que tardan semanas',
                    'Costes ocultos y letra pequeña', 
                    'Permanencias abusivas de 12-24 meses',
                    'Atención telefónica en el extranjero',
                    'Velocidad que nunca llega',
                    'Dependen de redes de terceros'
                  ].map((item, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <CheckCircle size={16} className="text-red-500 flex-shrink-0" />
                      <span className="text-red-700 text-sm">{item}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Prisma */}
            <Card className="border-2 border-green-200 bg-green-50 relative overflow-hidden">
              
              {/* Popular Badge */}
              <div className="absolute -top-2 -right-2 bg-gradient-to-r from-orange-400 to-red-500 text-white px-4 py-2 rounded-bl-xl font-bold text-sm">
                🏆 LA MEJOR OPCIÓN
              </div>
              
              <CardContent className="p-6">
                <div className="text-center mb-6">
                  <Badge className="bg-green-600 text-white px-4 py-1 text-sm font-bold mb-2">
                    ✅ PRISMA MÓVIL
                  </Badge>
                  <h4 className="text-xl font-bold text-green-700">Lo que SÍ tendrás</h4>
                </div>
                
                <div className="space-y-3">
                  {[
                    'Atención humana 100% española',
                    'Instalación en menos de 5 días',
                    'Transparencia total, sin sorpresas',
                    'Sin permanencia, libertad total',
                    'Tiendas propias para ayudarte',
                    'Velocidad real garantizada',
                    'Red propia 5G de última generación'
                  ].map((item, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <CheckCircle size={16} className="text-green-500 flex-shrink-0" />
                      <span className="text-green-700 text-sm font-semibold">{item}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

          </div>
        </div>

        {/* Final CTA */}
        <div className="text-center mt-16">
          <div className="max-w-2xl mx-auto">
            <h3 className="text-3xl font-bold text-gray-900 mb-4">
              ¿Listo para la diferencia?
            </h3>
            <p className="text-lg text-gray-600 mb-8">
              Únete a los miles de clientes que ya disfrutan de una conexión sin complicaciones
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold py-4 px-8 rounded-xl transform hover:scale-105 transition-all duration-200 shadow-lg">
                Comprobar cobertura
                <ArrowRight size={20} className="inline ml-2" />
              </button>
              <button className="border-2 border-gray-300 hover:border-gray-400 text-gray-700 hover:text-gray-900 font-bold py-4 px-8 rounded-xl transition-all duration-200">
                Llamar al 915691382
              </button>
            </div>

            {/* Trust Indicators */}
            <div className="flex items-center justify-center gap-8 mt-8 text-sm text-gray-500">
              <div className="flex items-center gap-1">
                <Heart size={16} className="text-red-500" />
                <span>+10.000 clientes</span>
              </div>
              <div className="flex items-center gap-1">
                <CheckCircle size={16} className="text-green-500" />
                <span>98% satisfacción</span>
              </div>
              <div className="flex items-center gap-1">
                <Shield size={16} className="text-blue-500" />
                <span>Sin permanencia</span>
              </div>
            </div>
          </div>
        </div>

      </div>

      {/* Add some CSS for animations */}
      <style jsx>{`
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-fade-in-up {
          animation: fade-in-up 0.6s ease-out forwards;
        }
      `}</style>
    </section>
  );
};

export default VentajasDiferenciales;
