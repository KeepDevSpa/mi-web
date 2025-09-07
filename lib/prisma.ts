// v5/lib/prisma.ts

/**
 * @fileoverview Cliente de Prisma ORM configurado para la aplicación
 * 
 * Este archivo configura y exporta la instancia de Prisma Client
 * utilizada en toda la aplicación para interactuar con la base de datos SQLite.
 * 
 * Características:
 * - Singleton pattern para evitar múltiples instancias
 * - Configuración optimizada para desarrollo y producción
 * - Manejo de conexiones en modo desarrollo con hot reload
 * - Logging configurado según el entorno
 * 
 * Modelos principales:
 * - PricingCard: Tarjetas de precios con speeds y extras
 * - InformationCard: Tarjetas informativas
 * - FAQItem: Preguntas frecuentes
 * - User: Usuarios del sistema admin
 * 
 * @author Prisma Móvil Team
 * @version 5.2.0
 * @since 2025-09-01
 */

import { PrismaClient } from '@prisma/client'
import { errorManager, ErrorType, ErrorSeverity } from './error-manager';

const globalForPrisma = global as unknown as { prisma: PrismaClient };

/**
 * Configuración del cliente Prisma con manejo de errores integrado
 * 
 * @returns Instancia configurada de PrismaClient
 */
const createPrismaClient = (): PrismaClient => {
  try {
    return new PrismaClient({
      log: process.env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
      errorFormat: 'pretty',
    })
  } catch (error) {
    errorManager.captureDatabaseError(error, 'createPrismaClient', {
      environment: process.env.NODE_ENV,
      timestamp: new Date().toISOString()
    })
    throw error
  }
}

/**
 * Instancia global de Prisma Client
 * 
 * En desarrollo, reutiliza la instancia existente para evitar
 * el agotamiento de conexiones durante hot reloads.
 * En producción, crea una nueva instancia.
 */
export const prisma =
  globalForPrisma.prisma ||
  createPrismaClient();

// En desarrollo, almacenar en global para reutilización
if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.prisma = prisma;
}

/**
 * Wrapper seguro para operaciones de base de datos
 * 
 * @param operation - Función de operación de Prisma a ejecutar
 * @param context - Contexto adicional para logging
 * @returns Resultado de la operación o error manejado
 */
export async function safePrismaOperation<T>(
  operation: () => Promise<T>,
  context: { operation: string; model?: string; [key: string]: any } = { operation: 'unknown' }
): Promise<T | null> {
  try {
    return await operation()
  } catch (error) {
    const errorId = errorManager.captureDatabaseError(error, context.operation, {
      model: context.model,
      context: context,
      timestamp: new Date().toISOString()
    })
    
    console.error(`[Prisma Error ${errorId}] Operación falló:`, context.operation)
    return null
  }
}