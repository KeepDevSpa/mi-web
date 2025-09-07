// lib/utils.ts

import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// --- Función para formatear precios ---
export function formatPrice(price: number | null | undefined): string {
  // Si el precio es null o undefined, devolver "0,00"
  if (price === null || price === undefined) {
    return "0,00";
  }

  // Asegurarnos de que el precio sea un número
  const numPrice = Number(price);
  if (isNaN(numPrice)) {
    return "0,00";
  }

  // Redondear a dos decimales
  const roundedPrice = Math.round(numPrice * 100) / 100;
  
  try {
    // Convertir a cadena y dividir en parte entera y decimal
    const parts = roundedPrice.toFixed(2).split('.');
    const integerPart = parts[0];
    const decimalPart = parts[1] || '00';
    
    // Formatear la parte decimal para asegurar que tenga siempre dos dígitos
    const formattedDecimal = decimalPart.padEnd(2, '0');
    
    // Unir con coma como separador decimal
    return `${integerPart},${formattedDecimal}`;
  } catch (error) {
    console.error('Error formatting price:', error);
    return "0,00";
  }
}

// --- Función para formatear precio con etiqueta ---
export function formatPriceWithLabel(price: number): string {
  const formattedPrice = formatPrice(price);
  return `${formattedPrice} €/mes`;
}

