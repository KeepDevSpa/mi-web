/**
 * Componente Textarea reutilizable
 * Componente básico para áreas de texto con estilos consistentes
 */

import React from 'react';

/**
 * Props para el componente Textarea
 */
interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  className?: string;
}

/**
 * Componente Textarea con estilos predefinidos
 * 
 * @param props - Props del textarea incluyendo className y atributos HTML estándar
 * @returns Elemento textarea estilizado
 */
export const Textarea: React.FC<TextareaProps> = ({ 
  className = '', 
  ...props 
}) => {
  const baseClasses = "w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-vertical";
  
  return (
    <textarea
      className={`${baseClasses} ${className}`}
      {...props}
    />
  );
};
