// v5/components/ui/information-card.tsx

import { IconMap, CORPORATE_COLOR_CLASSES, IconName, getIcon } from '@/lib/icon-config';

// === INTERFAZ DEL COMPONENTE ===
interface InformationCardProps {
  icon?: IconName; // Nombre del icono (ej: "Shield", "Phone", "Wifi")
  title: string;
  description: string;
  className?: string; // Para personalizar estilos desde fuera
}

/**
 * InformationCard - Tarjeta informativa con icono plano y estilo corporativo
 * 
 * ✅ Iconos planos de lucide-react
 * ✅ Color corporativo: verde Prisma (#00aa00)
 * ✅ Diseño limpio, profesional, sin efectos 3D
 * ✅ Totalmente reutilizable
 */
export const InformationCard = ({ 
  icon, 
  title, 
  description, 
  className = '' 
}: InformationCardProps) => {
  
  return (
    <div 
      className={`
        flex flex-col items-center rounded-xl border border-gray-200 bg-white p-6 text-center shadow-sm 
        hover:shadow-md transition-all duration-300 hover:scale-105
        ${className}
      `}
    >
      {/* Contenedor del icono */}
      {icon && (
        <div className="mb-4 flex h-12 w-12 items-center justify-center">
          {getIcon(icon, `${CORPORATE_COLOR_CLASSES.primary} h-6 w-6`)}
        </div>
      )}

      {/* Título */}
      <h3 className="text-lg font-bold text-gray-900 leading-tight">
        {title}
      </h3>

      {/* Descripción */}
      <p className="mt-2 text-sm text-gray-600 leading-relaxed">
        {description}
      </p>
    </div>
  );
};