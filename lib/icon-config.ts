import React from 'react';
import { Shield, Users, Zap, Phone, Tv, Lock, Wifi, Settings, Clock, MapPin, Mail, Star } from 'lucide-react';

// Definición de colores corporativos
export const CORPORATE_COLORS = {
  PRIMARY: '#00aa00', // Verde Prisma
  SECONDARY: '#ffc100', // Dorado
  WHITE: '#ffffff',
  GRAY: '#d1d5db',
} as const;

// Clases de texto para los colores corporativos
export const CORPORATE_COLOR_CLASSES = {
  primary: 'text-[#00aa00]',
  secondary: 'text-[#ffc100]',
  white: 'text-white',
  gray: 'text-gray-300',
} as const;

// Mapeo de iconos planos con sus propiedades por defecto
export const IconMap = {
  Shield: (props: any) => <Shield {...props} strokeWidth={1.5} />,
  Users: (props: any) => <Users {...props} strokeWidth={1.5} />,
  Zap: (props: any) => <Zap {...props} strokeWidth={1.5} />,
  Phone: (props: any) => <Phone {...props} strokeWidth={1.5} />,
  Tv: (props: any) => <Tv {...props} strokeWidth={1.5} />,
  Lock: (props: any) => <Lock {...props} strokeWidth={1.5} />,
  Wifi: (props: any) => <Wifi {...props} strokeWidth={1.5} />,
  Settings: (props: any) => <Settings {...props} strokeWidth={1.5} />,
  Clock: (props: any) => <Clock {...props} strokeWidth={1.5} />,
  MapPin: (props: any) => <MapPin {...props} strokeWidth={1.5} />,
  Mail: (props: any) => <Mail {...props} strokeWidth={1.5} />,
  Star: (props: any) => <Star {...props} strokeWidth={1.5} />,
};

export type IconName = keyof typeof IconMap;

// Función helper para obtener un icono con color corporativo
export const getThemedIcon = (name: IconName, color: keyof typeof CORPORATE_COLOR_CLASSES = 'primary', className = '') => {
  const IconComponent = IconMap[name];
  return (
    <IconComponent 
      className={`${CORPORATE_COLOR_CLASSES[color]} ${className}`} 
      strokeWidth={1.5}
    />
  );
};
