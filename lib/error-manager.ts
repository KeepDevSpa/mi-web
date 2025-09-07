/**
 * @fileoverview Sistema global de manejo y captura de errores
 * 
 * Proporciona utilidades centralizadas para el manejo de errores,
 * logging, y reportes de errores en la aplicación Prisma Móvil.
 * 
 * Características:
 * - Captura de errores JavaScript globales
 * - Sistema de logging estructurado
 * - Manejo de errores de base de datos
 * - Reportes de errores para desarrollo
 * 
 * @author Prisma Móvil Team
 * @version 5.2.0
 * @since 2025-09-01
 */

import React from 'react';

/**
 * Tipos de errores manejados por el sistema
 */
export enum ErrorType {
  DATABASE = 'DATABASE',
  API = 'API',
  VALIDATION = 'VALIDATION',
  NETWORK = 'NETWORK',
  AUTHENTICATION = 'AUTHENTICATION',
  PERMISSION = 'PERMISSION',
  UNKNOWN = 'UNKNOWN'
}

/**
 * Niveles de severidad para errores
 */
export enum ErrorSeverity {
  LOW = 'LOW',
  MEDIUM = 'MEDIUM',
  HIGH = 'HIGH',
  CRITICAL = 'CRITICAL'
}

/**
 * Interface para errores estructurados
 */
export interface StructuredError {
  id: string;
  type: ErrorType;
  severity: ErrorSeverity;
  message: string;
  details?: any;
  timestamp: Date;
  userAgent?: string;
  url?: string;
  userId?: string;
  stack?: string;
}

/**
 * Clase principal para manejo de errores
 */
export class ErrorManager {
  private static instance: ErrorManager;
  private errors: StructuredError[] = [];
  private isDevelopment = process.env.NODE_ENV === 'development';

  /**
   * Singleton pattern para el ErrorManager
   */
  static getInstance(): ErrorManager {
    if (!ErrorManager.instance) {
      ErrorManager.instance = new ErrorManager();
    }
    return ErrorManager.instance;
  }

  /**
   * Captura y procesa un error
   * 
   * @param error - El error a procesar
   * @param type - Tipo de error
   * @param severity - Severidad del error
   * @param context - Contexto adicional del error
   * @returns ID único del error procesado
   */
  captureError(
    error: Error | any,
    type: ErrorType = ErrorType.UNKNOWN,
    severity: ErrorSeverity = ErrorSeverity.MEDIUM,
    context?: any
  ): string {
    const errorId = `err_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    
    const structuredError: StructuredError = {
      id: errorId,
      type,
      severity,
      message: error?.message || String(error),
      details: context,
      timestamp: new Date(),
      userAgent: typeof window !== 'undefined' ? window.navigator.userAgent : undefined,
      url: typeof window !== 'undefined' ? window.location.href : undefined,
      stack: error?.stack
    };

    // Almacenar error
    this.errors.push(structuredError);

    // Log según severidad
    this.logError(structuredError);

    // En desarrollo, mostrar detalles completos
    if (this.isDevelopment) {
      this.devLog(structuredError);
    }

    return errorId;
  }

  /**
   * Manejo específico de errores de base de datos
   */
  captureDatabaseError(error: any, operation: string, context?: any): string {
    const severity = this.getDatabaseErrorSeverity(error);
    
    return this.captureError(
      error,
      ErrorType.DATABASE,
      severity,
      {
        operation,
        prismaErrorCode: error?.code,
        ...context
      }
    );
  }

  /**
   * Manejo específico de errores de API
   */
  captureAPIError(error: any, endpoint: string, method: string, context?: any): string {
    return this.captureError(
      error,
      ErrorType.API,
      ErrorSeverity.HIGH,
      {
        endpoint,
        method,
        status: error?.status,
        ...context
      }
    );
  }

  /**
   * Determina la severidad de errores de base de datos
   */
  private getDatabaseErrorSeverity(error: any): ErrorSeverity {
    const code = error?.code;
    
    // Códigos críticos de Prisma
    if (['P2002', 'P2003', 'P2025'].includes(code)) {
      return ErrorSeverity.HIGH;
    }
    
    // Errores de conexión
    if (['P1001', 'P1008', 'P1017'].includes(code)) {
      return ErrorSeverity.CRITICAL;
    }
    
    return ErrorSeverity.MEDIUM;
  }

  /**
   * Sistema de logging estructurado
   */
  private logError(error: StructuredError): void {
    const logMessage = `[${error.severity}] ${error.type}: ${error.message}`;
    
    switch (error.severity) {
      case ErrorSeverity.CRITICAL:
      case ErrorSeverity.HIGH:
        console.error(logMessage, error);
        break;
      case ErrorSeverity.MEDIUM:
        console.warn(logMessage, error);
        break;
      case ErrorSeverity.LOW:
        console.log(logMessage, error);
        break;
    }
  }

  /**
   * Log detallado para desarrollo
   */
  private devLog(error: StructuredError): void {
    console.group(`🚨 Error Capturado: ${error.id}`);
    console.log('📋 Tipo:', error.type);
    console.log('⚠️ Severidad:', error.severity);
    console.log('💬 Mensaje:', error.message);
    console.log('🕒 Timestamp:', error.timestamp.toISOString());
    if (error.details) console.log('📄 Detalles:', error.details);
    if (error.stack) console.log('📚 Stack:', error.stack);
    console.groupEnd();
  }

  /**
   * Obtiene estadísticas de errores
   */
  getErrorStats() {
    const now = new Date();
    const oneHourAgo = new Date(now.getTime() - 60 * 60 * 1000);
    
    const recentErrors = this.errors.filter(e => e.timestamp > oneHourAgo);
    
    return {
      total: this.errors.length,
      lastHour: recentErrors.length,
      byType: this.groupByType(),
      bySeverity: this.groupBySeverity(),
      critical: this.errors.filter(e => e.severity === ErrorSeverity.CRITICAL).length
    };
  }

  /**
   * Agrupa errores por tipo
   */
  private groupByType() {
    return this.errors.reduce((acc, error) => {
      acc[error.type] = (acc[error.type] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);
  }

  /**
   * Agrupa errores por severidad
   */
  private groupBySeverity() {
    return this.errors.reduce((acc, error) => {
      acc[error.severity] = (acc[error.severity] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);
  }

  /**
   * Limpia errores antiguos (más de 24 horas)
   */
  cleanup(): void {
    const oneDayAgo = new Date(Date.now() - 24 * 60 * 60 * 1000);
    this.errors = this.errors.filter(error => error.timestamp > oneDayAgo);
  }
}

/**
 * Instancia global del manejador de errores
 */
export const errorManager = ErrorManager.getInstance();

/**
 * Hook para manejo de errores en componentes
 */
export function useErrorHandler() {
  return {
    captureError: errorManager.captureError.bind(errorManager),
    captureDatabaseError: errorManager.captureDatabaseError.bind(errorManager),
    captureAPIError: errorManager.captureAPIError.bind(errorManager)
  };
}

/**
 * Manejo global de errores no capturados
 */
if (typeof window !== 'undefined') {
  // Errores JavaScript globales
  window.addEventListener('error', (event) => {
    errorManager.captureError(
      event.error,
      ErrorType.UNKNOWN,
      ErrorSeverity.HIGH,
      {
        filename: event.filename,
        lineno: event.lineno,
        colno: event.colno
      }
    );
  });

  // Promesas rechazadas
  window.addEventListener('unhandledrejection', (event) => {
    errorManager.captureError(
      new Error(event.reason),
      ErrorType.UNKNOWN,
      ErrorSeverity.HIGH,
      { type: 'unhandled-promise-rejection' }
    );
  });

  // Limpieza periódica
  setInterval(() => {
    errorManager.cleanup();
  }, 60 * 60 * 1000); // Cada hora
}
