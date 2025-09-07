'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  Star, 
  ChevronLeft, 
  ChevronRight, 
  MapPin, 
  Clock, 
  CheckCircle,
  Quote,
  Play,
  Heart,
  ThumbsUp
} from 'lucide-react';
import Image from 'next/image';

interface Testimonial {
  id: string;
  name: string;
  location: string;
  avatar: string;
  rating: number;
  title: string;
  content: string;
  date: string;
  verified: boolean;
  beforeOperator?: string;
  savingsAmount?: number;
  monthsAsClient?: number;
  videoUrl?: string;
  category: 'fibra' | 'movil' | 'fibra-movil' | 'empresa';
  highlights?: string[];
}

const testimonials: Testimonial[] = [
  {
    id: '1',
    name: 'María García',
    location: 'Madrid',
    avatar: '/placeholder-user.jpg',
    rating: 5,
    title: 'Instalación rapidísima y soporte increíble',
    content: 'La instalación fue rapidísima y el soporte increíble. Llevo 6 meses y cero problemas de conexión. Viniendo de Movistar es como pasar de un Seat del 92 a un Tesla.',
    date: '2025-08-15',
    verified: true,
    beforeOperator: 'Movistar',
    savingsAmount: 23,
    monthsAsClient: 6,
    category: 'fibra-movil',
    highlights: ['Instalación rápida', 'Sin problemas', 'Mejor que Movistar']
  },
  {
    id: '2',
    name: 'Antonio Ruiz',
    location: 'Barcelona',
    avatar: '/placeholder-user.jpg',
    rating: 5,
    title: 'Ahorro increíble, mejor servicio',
    content: 'Venía de Vodafone pagando 65€/mes. Con Prisma pago 28€ y tengo mejor servicio. No me lo podía creer cuando vi la diferencia en la primera factura.',
    date: '2025-08-10',
    verified: true,
    beforeOperator: 'Vodafone',
    savingsAmount: 37,
    monthsAsClient: 8,
    category: 'fibra-movil',
    highlights: ['Ahorro 37€/mes', 'Mejor servicio', 'Sorpresa positiva']
  },
  {
    id: '3',
    name: 'Laura Fernández',
    location: 'Valencia',
    avatar: '/placeholder-user.jpg',
    rating: 5,
    title: 'Atención al cliente ejemplar',
    content: 'El técnico vino un sábado sin coste extra. Ese detalle dice mucho de cómo tratan a sus clientes. Desde el primer día, velocidad perfecta.',
    date: '2025-08-05',
    verified: true,
    monthsAsClient: 4,
    category: 'fibra',
    highlights: ['Sábado sin coste', 'Trato excepcional', 'Velocidad perfecta']
  },
  {
    id: '4',
    name: 'Carlos Jiménez',
    location: 'Sevilla', 
    avatar: '/placeholder-user.jpg',
    rating: 5,
    title: 'Perfecto para mi empresa',
    content: 'Tengo una consultoría con 8 empleados y necesitábamos una conexión fiable. Prisma nos dio exactamente lo que prometió: velocidad real y soporte técnico cuando lo necesitamos.',
    date: '2025-07-28',
    verified: true,
    monthsAsClient: 10,
    category: 'empresa',
    videoUrl: '/testimonial-carlos.mp4',
    highlights: ['8 empleados', 'Conexión fiable', 'Soporte técnico']
  },
  {
    id: '5',
    name: 'Ana Martín',
    location: 'Bilbao',
    avatar: '/placeholder-user.jpg',
    rating: 5,
    title: 'De Orange a Prisma, mejor decisión',
    content: 'Con Orange tenía microcortes constantes trabajando desde casa. Con Prisma, 0 incidencias en 5 meses. Para teletrabajo es imprescindible tener una conexión seria.',
    date: '2025-07-20',
    verified: true,
    beforeOperator: 'Orange',
    monthsAsClient: 5,
    category: 'fibra',
    highlights: ['0 microcortes', 'Perfecto teletrabajo', 'Conexión seria']
  },
  {
    id: '6',
    name: 'Javier López',
    location: 'Zaragoza',
    avatar: '/placeholder-user.jpg',
    rating: 5,
    title: 'Llamadas cristalinas, datos que vuelan',
    content: 'El móvil va de lujo. En el pueblo de mis padres, donde otras operadoras no llegan, con Prisma tengo 4 barras y 5G real. Es increíble la diferencia.',
    date: '2025-07-15',
    verified: true,
    monthsAsClient: 7,
    category: 'movil',
    highlights: ['5G en pueblo', '4 barras cobertura', 'Diferencia increíble']
  }
];

interface TestimoniosAvanzadosProps {
  category?: 'all' | 'fibra' | 'movil' | 'fibra-movil' | 'empresa';
  showStats?: boolean;
  autoplay?: boolean;
}

const TestimoniosAvanzados = ({ 
  category = 'all',
  showStats = true,
  autoplay = true 
}: TestimoniosAvanzadosProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(autoplay);

  const filteredTestimonials = category === 'all' 
    ? testimonials 
    : testimonials.filter(t => t.category === category);

  // Auto-advance testimonials
  useEffect(() => {
    if (!isPlaying) return;
    
    const interval = setInterval(() => {
      setCurrentIndex(prev => (prev + 1) % filteredTestimonials.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isPlaying, filteredTestimonials.length]);

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % filteredTestimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + filteredTestimonials.length) % filteredTestimonials.length);
  };

  const currentTestimonial = filteredTestimonials[currentIndex];

  if (filteredTestimonials.length === 0) return null;

  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50 relative overflow-hidden">
      
      {/* Background Elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-blue-200 to-purple-200 rounded-full opacity-20 transform translate-x-48 -translate-y-48"></div>
      
      <div className="max-w-7xl mx-auto px-4 relative z-10">
        
        {/* Header */}
        <div className="text-center mb-16">
          <Badge className="bg-gradient-to-r from-green-500 to-blue-500 text-white px-6 py-3 text-base font-bold mb-6 inline-flex items-center gap-2">
            <Heart size={18} />
            LO QUE DICEN NUESTROS CLIENTES
          </Badge>
          
          <h2 className="text-4xl lg:text-6xl font-black text-gray-900 mb-6">
            Más de{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-500 to-blue-500">
              10.000 clientes
            </span>
            <br />nos recomiendan
          </h2>
          
          {showStats && (
            <div className="flex justify-center gap-8 text-center mt-8">
              <div>
                <div className="text-3xl font-bold text-green-600">4.9★</div>
                <div className="text-gray-600">Valoración media</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-blue-600">98%</div>
                <div className="text-gray-600">Nos recomiendan</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-purple-600">24h</div>
                <div className="text-gray-600">Respuesta media</div>
              </div>
            </div>
          )}
        </div>

        {/* Main Testimonial Card */}
        <div className="relative max-w-5xl mx-auto">
          
          {/* Navigation Arrows */}
          <Button
            variant="outline"
            size="icon"
            className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10 bg-white/90 backdrop-blur shadow-lg border-gray-200 hover:bg-white"
            onClick={prevTestimonial}
          >
            <ChevronLeft size={20} />
          </Button>
          
          <Button
            variant="outline"
            size="icon"
            className="absolute right-4 top-1/2 transform -translate-y-1/2 z-10 bg-white/90 backdrop-blur shadow-lg border-gray-200 hover:bg-white"
            onClick={nextTestimonial}
          >
            <ChevronRight size={20} />
          </Button>

          {/* Testimonial Card */}
          <Card className="bg-white/80 backdrop-blur shadow-2xl border-0">
            <CardContent className="p-8 md:p-12">
              
              <div className="grid md:grid-cols-3 gap-8 items-center">
                
                {/* Left: User Info */}
                <div className="text-center md:text-left">
                  
                  {/* Avatar */}
                  <div className="relative w-32 h-32 mx-auto md:mx-0 mb-6">
                    <Image
                      src={currentTestimonial.avatar}
                      alt={currentTestimonial.name}
                      fill
                      className="rounded-full object-cover"
                    />
                    {currentTestimonial.verified && (
                      <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                        <CheckCircle size={16} className="text-white" />
                      </div>
                    )}
                  </div>

                  {/* User Details */}
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">
                    {currentTestimonial.name}
                  </h3>
                  
                  <div className="flex items-center justify-center md:justify-start gap-2 text-gray-600 mb-4">
                    <MapPin size={16} />
                    <span>{currentTestimonial.location}</span>
                  </div>

                  {/* Rating */}
                  <div className="flex items-center justify-center md:justify-start gap-1 mb-4">
                    {[...Array(currentTestimonial.rating)].map((_, i) => (
                      <Star key={i} size={20} className="text-yellow-400 fill-current" />
                    ))}
                  </div>

                  {/* Client Info */}
                  <div className="space-y-2 text-sm">
                    {currentTestimonial.monthsAsClient && (
                      <div className="flex items-center justify-center md:justify-start gap-2">
                        <Clock size={14} />
                        <span>Cliente desde hace {currentTestimonial.monthsAsClient} meses</span>
                      </div>
                    )}
                    {currentTestimonial.beforeOperator && (
                      <Badge variant="outline" className="text-xs">
                        Antes: {currentTestimonial.beforeOperator}
                      </Badge>
                    )}
                  </div>

                </div>

                {/* Center: Testimonial Content */}
                <div className="md:col-span-2">
                  
                  {/* Quote Icon */}
                  <Quote size={48} className="text-blue-200 mb-4" />
                  
                  {/* Title */}
                  <h4 className="text-2xl font-bold text-gray-900 mb-4">
                    {currentTestimonial.title}
                  </h4>
                  
                  {/* Content */}
                  <p className="text-lg text-gray-700 leading-relaxed mb-6">
                    "{currentTestimonial.content}"
                  </p>

                  {/* Highlights */}
                  {currentTestimonial.highlights && (
                    <div className="flex flex-wrap gap-2 mb-6">
                      {currentTestimonial.highlights.map((highlight, i) => (
                        <Badge key={i} variant="secondary" className="text-xs">
                          {highlight}
                        </Badge>
                      ))}
                    </div>
                  )}

                  {/* Savings */}
                  {currentTestimonial.savingsAmount && (
                    <div className="bg-green-50 rounded-lg p-4 mb-6">
                      <div className="flex items-center gap-2 text-green-700">
                        <ThumbsUp size={16} />
                        <span className="font-semibold">
                          Ahorra {currentTestimonial.savingsAmount}€/mes con Prisma
                        </span>
                      </div>
                    </div>
                  )}

                  {/* Video */}
                  {currentTestimonial.videoUrl && (
                    <Button variant="outline" className="flex items-center gap-2">
                      <Play size={16} />
                      Ver testimonio en vídeo
                    </Button>
                  )}

                  {/* Date */}
                  <div className="text-sm text-gray-500 mt-4">
                    Opinión verificada • {new Date(currentTestimonial.date).toLocaleDateString('es-ES', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </div>

                </div>

              </div>

            </CardContent>
          </Card>

        </div>

        {/* Indicators */}
        <div className="flex justify-center mt-8 gap-2">
          {filteredTestimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentIndex ? 'bg-blue-600 w-8' : 'bg-gray-300'
              }`}
            />
          ))}
        </div>

        {/* Mini Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16">
          {filteredTestimonials
            .filter((_, i) => i !== currentIndex)
            .slice(0, 3)
            .map((testimonial) => (
            <Card key={testimonial.id} className="bg-white/60 backdrop-blur hover:bg-white/80 transition-all duration-300 cursor-pointer" onClick={() => setCurrentIndex(filteredTestimonials.indexOf(testimonial))}>
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-3">
                  <Image
                    src={testimonial.avatar}
                    alt={testimonial.name}
                    width={40}
                    height={40}
                    className="rounded-full"
                  />
                  <div>
                    <div className="font-semibold text-sm">{testimonial.name}</div>
                    <div className="text-xs text-gray-500">{testimonial.location}</div>
                  </div>
                </div>
                <div className="flex mb-2">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} size={14} className="text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-sm text-gray-600 line-clamp-2">
                  "{testimonial.content}"
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* CTA Section */}
        <div className="text-center mt-16 bg-white/60 backdrop-blur rounded-2xl p-8">
          <h3 className="text-3xl font-bold text-gray-900 mb-4">
            ¿Quieres ser el próximo?
          </h3>
          <p className="text-lg text-gray-600 mb-8">
            Únete a los miles de clientes que ya disfrutan de la mejor conexión
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button className="bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white font-bold py-3 px-8">
              Ver ofertas disponibles
            </Button>
            <Button variant="outline" className="border-2 border-gray-300 hover:border-gray-400">
              Leer más opiniones
            </Button>
          </div>
        </div>

      </div>
    </section>
  );
};

export default TestimoniosAvanzados;
