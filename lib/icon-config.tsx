import React, { ReactElement } from 'react';
import {
  Shield, Users, Zap, Phone, Tv, Lock, Wifi, Settings, Clock, MapPin, Mail, Star,
  ArrowRight, CheckCircle, Plus, Trash2, Save, X, Search, HelpCircle,
  Calculator, Upload, FileText, TrendingDown, Menu, Check, Smartphone,
  Globe, Timer, Heart, Gift, ChevronDown, Minus
} from 'lucide-react';

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
  ArrowRight: (props: any) => <ArrowRight {...props} strokeWidth={1.5} />,
  CheckCircle: (props: any) => <CheckCircle {...props} strokeWidth={1.5} />,
  Plus: (props: any) => <Plus {...props} strokeWidth={1.5} />,
  Trash2: (props: any) => <Trash2 {...props} strokeWidth={1.5} />,
  Save: (props: any) => <Save {...props} strokeWidth={1.5} />,
  X: (props: any) => <X {...props} strokeWidth={1.5} />,
  Search: (props: any) => <Search {...props} strokeWidth={1.5} />,
  HelpCircle: (props: any) => <HelpCircle {...props} strokeWidth={1.5} />,
  Calculator: (props: any) => <Calculator {...props} strokeWidth={1.5} />,
  Upload: (props: any) => <Upload {...props} strokeWidth={1.5} />,
  FileText: (props: any) => <FileText {...props} strokeWidth={1.5} />,
  TrendingDown: (props: any) => <TrendingDown {...props} strokeWidth={1.5} />,
  Menu: (props: any) => <Menu {...props} strokeWidth={1.5} />,
  Check: (props: any) => <Check {...props} strokeWidth={1.5} />,
  Smartphone: (props: any) => <Smartphone {...props} strokeWidth={1.5} />,
  Globe: (props: any) => <Globe {...props} strokeWidth={1.5} />,
  Timer: (props: any) => <Timer {...props} strokeWidth={1.5} />,
  Heart: (props: any) => <Heart {...props} strokeWidth={1.5} />,
  Gift: (props: any) => <Gift {...props} strokeWidth={1.5} />,
  ChevronDown: (props: any) => <ChevronDown {...props} strokeWidth={1.5} />,
  Minus: (props: any) => <Minus {...props} strokeWidth={1.5} />,
};

export type IconComponent = (props: any) => ReactElement;
export type IconName = 'Shield' | 'Users' | 'Zap' | 'Phone' | 'Tv' | 'Lock' | 'Wifi' | 
  'Settings' | 'Clock' | 'MapPin' | 'Mail' | 'Star' | 'ArrowRight' | 
  'CheckCircle' | 'Plus' | 'Trash2' | 'Save' | 'X' | 'Search' | 
  'HelpCircle' | 'Calculator' | 'Upload' | 'FileText' | 'TrendingDown' | 
  'Menu' | 'Check' | 'Smartphone' | 'Globe' | 'Timer' | 'Heart' | 
  'Gift' | 'ChevronDown' | 'Minus';

// Helper para obtener un icono específico
export const getIcon = (name: IconName, className?: string): ReactElement => {
  const Icon = IconMap[name];
  if (!Icon) {
    console.warn(`Icon "${name}" not found in IconMap`);
    return <></>;
  }
  return <Icon className={className || CORPORATE_COLOR_CLASSES.primary} strokeWidth={1.5} />;
};

// Función helper para obtener un icono con color corporativo
export const getThemedIcon = (name: IconName, color: keyof typeof CORPORATE_COLOR_CLASSES = 'primary', className = '') => {
  const IconComponent = IconMap[name];
  
  // Verificación de seguridad - si el icono no existe, devolvemos un componente vacío
  if (!IconComponent) {
    console.warn(`Icon "${name}" not found in IconMap`);
    return <span className={`${CORPORATE_COLOR_CLASSES[color]} ${className}`}></span>;
  }
  
  return (
    <IconComponent 
      className={`${CORPORATE_COLOR_CLASSES[color]} ${className}`} 
      strokeWidth={1.5}
    />
  );
};
