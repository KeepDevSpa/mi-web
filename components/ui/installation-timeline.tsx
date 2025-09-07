'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  CheckCircle, 
  Clock, 
  UserCheck, 
  Wrench, 
  Zap, 
  ArrowRight, 
  Phone,
  Mail,
  Settings,
  Wifi
} from 'lucide-react';

interface TimelineStep {
  day: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  status: 'completed' | 'current' | 'upcoming';
  details?: string[];
}

interface InstallationTimelineProps {
  totalInstallations?: number;
  averageDays?: number;
  showStats?: boolean;
}

const InstallationTimeline = ({ 
  totalInstallations = 1071,
  averageDays = 5,
  showStats = true 
}: InstallationTimelineProps) => {
  const [currentStep, setCurrentStep] = useState(1);

  const steps: TimelineStep[] = [
    {
      day: "DÍA 1",
      title: "¡Bienvenido!",
      description: "Contratas el servicio y recibes confirmación inmediata",
      icon: <CheckCircle className="w-6 h-6" />,
      status: 'completed',
      details: [
        "Contrato enviado por email",
        "SMS de confirmación",
        "Número de seguimiento asignado"
      ]
    },
    {
      day: "DÍA 2",
      title: "Te contactamos",
      description: "Te llamamos para coordinar la instalación",
      icon: <Phone className="w-6 h-6" />,
      status: 'current',
      details: [
        "Llamada del equipo técnico",
        "Coordinamos fecha y hora",
        "Confirmación por WhatsApp"
      ]
    },
    {
      day: "DÍA 3-4",
      title: "Instalación",
      description: "Nuestro técnico instala la fibra en tu casa",
      icon: <Wrench className="w-6 h-6" />,
      status: 'upcoming',
      details: [
        "Técnico especializado",
        "Instalación completa en 2 horas",
        "Configuración y pruebas incluidas"
      ]
    },
    {
      day: "DÍA 5",
      title: "¡Listo!",
      description: "Disfruta de tu conexión ultrarrápida",
      icon: <Zap className="w-6 h-6" />,
      status: 'upcoming',
      details: [
        "Velocidad máxima desde el primer día",
        "App Prisma configurada",
        "Soporte 24/7 disponible"
      ]
    }
  ];

  // Simular progreso automático para demo
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentStep(prev => (prev >= steps.length ? 1 : prev + 1));
    }, 3000);

    return () => clearInterval(interval);
  }, [steps.length]);

  return (
    <section className="py-16 bg-gradient-to-br from-blue-50 to-white">
      <div className="max-w-6xl mx-auto px-4">
        
        {/* Header */}
        <div className="text-center mb-12">
          <Badge className="bg-green-100 text-green-800 px-4 py-2 text-sm font-semibold mb-4">
            ⚡ INSTALACIÓN EXPRESS
          </Badge>
          
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            Tu conexión en menos de
            <span className="text-blue-600"> {averageDays} días</span>
          </h2>
          
          {showStats && (
            <p className="text-xl text-gray-600 mb-2">
              Es la media de nuestras últimas{' '}
              <span className="font-bold text-blue-600">{totalInstallations.toLocaleString()}</span>{' '}
              instalaciones
            </p>
          )}
          
          <div className="flex items-center justify-center gap-2 text-green-600">
            <CheckCircle size={20} />
            <span className="font-semibold">Garantía de puntualidad o instalación gratuita</span>
          </div>
        </div>

        {/* Timeline */}
        <div className="relative">
          
          {/* Progress Line */}
          <div className="absolute top-16 left-8 right-8 h-1 bg-gray-200 hidden lg:block">
            <div 
              className="h-full bg-gradient-to-r from-blue-500 to-green-500 transition-all duration-1000 ease-in-out"
              style={{ width: `${(currentStep / steps.length) * 100}%` }}
            />
          </div>

          {/* Steps Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {steps.map((step, index) => {
              const isActive = index + 1 === currentStep;
              const isCompleted = index + 1 < currentStep;
              
              return (
                <div key={index} className="relative">
                  
                  {/* Step Card */}
                  <Card className={`
                    transition-all duration-500 transform hover:scale-105
                    ${isActive ? 'ring-4 ring-blue-400 shadow-2xl bg-blue-50' : ''}
                    ${isCompleted ? 'bg-green-50 border-green-200' : ''}
                    ${!isActive && !isCompleted ? 'hover:shadow-lg' : ''}
                  `}>
                    <CardContent className="p-6 text-center">
                      
                      {/* Day Badge */}
                      <Badge 
                        variant={isCompleted ? "default" : isActive ? "secondary" : "outline"}
                        className={`
                          mb-4 px-3 py-1 font-bold
                          ${isCompleted ? 'bg-green-600 text-white' : ''}
                          ${isActive ? 'bg-blue-600 text-white animate-pulse' : ''}
                        `}
                      >
                        {step.day}
                      </Badge>

                      {/* Icon */}
                      <div className={`
                        w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center transition-all
                        ${isCompleted ? 'bg-green-500 text-white' : ''}
                        ${isActive ? 'bg-blue-500 text-white animate-bounce' : ''}
                        ${!isActive && !isCompleted ? 'bg-gray-100 text-gray-400' : ''}
                      `}>
                        {step.icon}
                      </div>

                      {/* Content */}
                      <h3 className="text-xl font-bold text-gray-900 mb-2">
                        {step.title}
                      </h3>
                      
                      <p className="text-gray-600 mb-4">
                        {step.description}
                      </p>

                      {/* Details */}
                      {isActive && step.details && (
                        <div className="space-y-2 text-left">
                          {step.details.map((detail, i) => (
                            <div key={i} className="flex items-center gap-2 text-sm text-blue-700">
                              <CheckCircle size={14} />
                              <span>{detail}</span>
                            </div>
                          ))}
                        </div>
                      )}

                    </CardContent>
                  </Card>

                  {/* Arrow (Desktop only) */}
                  {index < steps.length - 1 && (
                    <div className="hidden lg:block absolute -right-4 top-1/2 transform -translate-y-1/2 z-10">
                      <ArrowRight 
                        size={24} 
                        className={`
                          ${isCompleted ? 'text-green-500' : 'text-gray-300'}
                          transition-colors duration-500
                        `}
                      />
                    </div>
                  )}

                </div>
              );
            })}
          </div>
        </div>

        {/* Bottom Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16">
          
          <div className="text-center p-6 bg-white rounded-xl shadow-lg">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <Clock className="w-6 h-6 text-blue-600" />
            </div>
            <div className="text-3xl font-bold text-blue-600 mb-1">2h</div>
            <div className="text-gray-600">Duración media instalación</div>
          </div>

          <div className="text-center p-6 bg-white rounded-xl shadow-lg">
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <UserCheck className="w-6 h-6 text-green-600" />
            </div>
            <div className="text-3xl font-bold text-green-600 mb-1">98%</div>
            <div className="text-gray-600">Instalaciones a la primera</div>
          </div>

          <div className="text-center p-6 bg-white rounded-xl shadow-lg">
            <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <Wifi className="w-6 h-6 text-purple-600" />
            </div>
            <div className="text-3xl font-bold text-purple-600 mb-1">24/7</div>
            <div className="text-gray-600">Soporte técnico</div>
          </div>

        </div>

        {/* CTA */}
        <div className="text-center mt-12">
          <p className="text-lg text-gray-600 mb-4">
            ¿Listo para disfrutar de la mejor conexión?
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-lg transition-colors">
              Comprobar cobertura
            </button>
            <button className="border-2 border-blue-600 text-blue-600 hover:bg-blue-50 font-bold py-3 px-8 rounded-lg transition-colors">
              Llamar al 915691382
            </button>
          </div>
        </div>

      </div>
    </section>
  );
};

export default InstallationTimeline;
