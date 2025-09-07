// lib/types.ts

// === TIPOS COMPARTIDOS PARA ENTIDADES DEL SISTEMA ===

// Define la estructura de una Tarjeta de Información
export type InformationCard = {
  id: string;
  page: string;
  icon?: string | null;
  title: string;
  description: string;
  order: number;
  isActive: boolean;
  // Estos son campos extra que tu componente de la home parece usar, los hacemos opcionales
  backgroundColor?: string;
  textColor?: string;
  imageUrl?: string | null;
  content?: string;
  linkUrl?: string | null;
  section?: string;
};

// Tipo para los bloques de contenido
export interface ContentBlock {
  id: string;
  title?: string;
  content: string;
  page: string;
  section: string;
  order: number;
  isActive: boolean;
  createdAt: string; // ISO string desde la API
  updatedAt: string; // ISO string desde la API
};

// Define la estructura de una Pregunta Frecuente (FAQ)
export type FAQItem = {
    id: string;
    page: string;
    question: string;
    answer: string;
    order: number;
    isActive: boolean;
};

// Tipo para la configuración de páginas dinámicas
export interface PageConfig {
  id: string;
  slug: string;
  title: string;
  showInHeader: boolean;
  components: string[]; // Ej: ["Hero", "PricingCards", "InformationCards", "FAQ"]
  isActive: boolean;
  createdAt: string; // ISO string desde la API
  updatedAt: string; // ISO string desde la API
};

// Tipo para los leads (puede ampliarse según los datos del formulario)
export interface Lead {
  id: string;
  [key: string]: any; // Permite campos dinámicos como 'nombre', 'telefono', 'formName', 'page', etc.
  // Campos específicos que sabemos que existen
  formName?: string;
  page?: string;
  status: 'new' | 'contacted' | 'closed' | 'converted';
  data?: Record<string, any>; // Datos del formulario
  createdAt: string; // ISO string desde la API
  updatedAt: string; // ISO string desde la API
};

// Define la estructura de una opción de Velocidad/Gigas
export type Speed = {
  id: string;
  label: string;
  price: number;
  originalPrice?: number | null;
};


// Define la estructura de un Extra
export type Extra = {
  id:string;
  label: string;
  price: number;
  description?: string | null;
}; 

// Define la estructura completa de una Tarifa de Precios (PricingCard)
export type PricingCard = {
  id: string;
  name: string;
  page: string;
  currentPrice: number;
  originalPrice?: number | null;
  variant: string;
  hasSpeedSelector: boolean;
  features: string[];
  isPopular: boolean;
  ctaText?: string | null;
  rateTier: number;
  isActive: boolean;
  isHeroOffer: boolean;
  // Incluye las relaciones
  speeds: Speed[];
  extras: Extra[];
};

// Si necesitas extender AdminPricingCard con tipos más específicos para el frontend
// que no están en lib/admin-card-config.ts, puedes hacerlo aquí también.
// Por ahora, asumiremos que lib/admin-card-config.ts es suficiente.