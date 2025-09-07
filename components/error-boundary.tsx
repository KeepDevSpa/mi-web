/**
 * @fileoverview Error Boundary para captura de errores de React
 * 
 * Implementa un Error Boundary que captura errores durante el renderizado,
 * en métodos del ciclo de vida y en constructores de todo el árbol de componentes.
 * 
 * Características:
 * - Captura errores de JavaScript y React
 * - Interfaz de usuario de fallback personalizable
 * - Logging automático de errores
 * - Integración con el sistema de manejo de errores global
 * - Reportes detallados para debugging
 * 
 * @author Prisma Móvil Team
 * @version 5.2.0
 * @since 2025-09-01
 */

'use client';

import React, { Component, ErrorInfo, ReactNode } from 'react';
import { errorManager, ErrorType, ErrorSeverity } from '@/lib/error-manager';

/**
 * Props para el Error Boundary
 */
interface ErrorBoundaryProps {
  children: ReactNode;
  fallback?: ReactNode;
  onError?: (error: Error, errorInfo: ErrorInfo) => void;
  showErrorDetails?: boolean;
}

/**
 * State del Error Boundary
 */
interface ErrorBoundaryState {
  hasError: boolean;
  error?: Error;
  errorInfo?: ErrorInfo;
  errorId?: string;
}

/**
 * Error Boundary personalizado para la aplicación Prisma Móvil
 * 
 * Captura y maneja errores que ocurren en cualquier lugar del árbol
 * de componentes React, mostrando una UI de fallback en lugar de
 * la pantalla blanca predeterminada.
 */
export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  /**
   * Método estático que actualiza el state cuando ocurre un error
   * 
   * @param error - Error que fue lanzado
   * @returns Nuevo state con información del error
   */
  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return {
      hasError: true,
      error
    };
  }

  /**
   * Se ejecuta cuando se captura un error
   * 
   * @param error - Error capturado
   * @param errorInfo - Información adicional sobre el error
   */
  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    // Capturar error con el sistema global
    const errorId = errorManager.captureError(
      error,
      ErrorType.UNKNOWN,
      ErrorSeverity.HIGH,
      {
        componentStack: errorInfo.componentStack,
        errorBoundary: true,
        timestamp: new Date().toISOString(),
        userAgent: typeof window !== 'undefined' ? window.navigator.userAgent : undefined,
        url: typeof window !== 'undefined' ? window.location.href : undefined
      }
    );

    // Actualizar state con información del error
    this.setState({
      error,
      errorInfo,
      errorId
    });

    // Ejecutar callback personalizado si existe
    if (this.props.onError) {
      this.props.onError(error, errorInfo);
    }

    // Log detallado en consola para desarrollo
    if (process.env.NODE_ENV === 'development') {
      console.group(`🚨 Error Boundary Activado - ID: ${errorId}`);
      console.error('Error:', error);
      console.error('Error Info:', errorInfo);
      console.error('Component Stack:', errorInfo.componentStack);
      console.groupEnd();
    }
  }

  /**
   * Resetea el error boundary
   */
  resetError = (): void => {
    this.setState({
      hasError: false,
      error: undefined,
      errorInfo: undefined,
      errorId: undefined
    });
  };

  /**
   * Recarga la página completa
   */
  reloadPage = (): void => {
    if (typeof window !== 'undefined') {
      window.location.reload();
    }
  };

  render(): ReactNode {
    if (this.state.hasError) {
      // Si se proporciona un fallback personalizado, usarlo
      if (this.props.fallback) {
        return this.props.fallback;
      }

      // UI de fallback predeterminada
      return (
        <ErrorFallbackUI
          error={this.state.error}
          errorInfo={this.state.errorInfo}
          errorId={this.state.errorId}
          onReset={this.resetError}
          onReload={this.reloadPage}
          showDetails={this.props.showErrorDetails}
        />
      );
    }

    return this.props.children;
  }
}

/**
 * Props para la UI de fallback de error
 */
interface ErrorFallbackUIProps {
  error?: Error;
  errorInfo?: ErrorInfo;
  errorId?: string;
  onReset: () => void;
  onReload: () => void;
  showDetails?: boolean;
}

/**
 * Componente de UI de fallback cuando ocurre un error
 */
function ErrorFallbackUI({
  error,
  errorInfo,
  errorId,
  onReset,
  onReload,
  showDetails = false
}: ErrorFallbackUIProps): React.ReactElement {
  const [showFullError, setShowFullError] = React.useState(false);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          {/* Icono de error */}
          <div className="mx-auto h-24 w-24 text-red-500 mb-4">
            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1"
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"
              />
            </svg>
          </div>

          {/* Título */}
          <h1 className="text-3xl font-extrabold text-gray-900 mb-2">
            ¡Ups! Algo salió mal
          </h1>

          {/* Descripción */}
          <p className="text-gray-600 mb-6">
            Ha ocurrido un error inesperado. Nuestro equipo técnico ha sido notificado automáticamente.
          </p>

          {/* ID de error para soporte */}
          {errorId && (
            <div className="bg-gray-100 p-3 rounded-lg mb-6">
              <p className="text-sm text-gray-700">
                <strong>ID del error:</strong> {errorId}
              </p>
              <p className="text-xs text-gray-500 mt-1">
                Proporciona este ID al contactar con soporte técnico
              </p>
            </div>
          )}

          {/* Botones de acción */}
          <div className="flex flex-col sm:flex-row gap-3 justify-center mb-6">
            <button
              onClick={onReset}
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors font-medium"
            >
              Intentar de nuevo
            </button>
            
            <button
              onClick={onReload}
              className="bg-gray-600 text-white px-6 py-2 rounded-lg hover:bg-gray-700 transition-colors font-medium"
            >
              Recargar página
            </button>
          </div>

          {/* Detalles técnicos (solo en desarrollo o si está habilitado) */}
          {(showDetails || process.env.NODE_ENV === 'development') && (
            <div className="text-left">
              <button
                onClick={() => setShowFullError(!showFullError)}
                className="text-blue-600 hover:text-blue-800 text-sm font-medium mb-3"
              >
                {showFullError ? '🔼 Ocultar' : '🔽 Mostrar'} detalles técnicos
              </button>

              {showFullError && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-left">
                  <div className="mb-4">
                    <h3 className="text-sm font-bold text-red-800 mb-2">Error:</h3>
                    <pre className="text-xs text-red-700 bg-red-100 p-2 rounded overflow-auto max-h-32">
                      {error?.message || 'Error desconocido'}
                    </pre>
                  </div>

                  {error?.stack && (
                    <div className="mb-4">
                      <h3 className="text-sm font-bold text-red-800 mb-2">Stack Trace:</h3>
                      <pre className="text-xs text-red-700 bg-red-100 p-2 rounded overflow-auto max-h-32">
                        {error.stack}
                      </pre>
                    </div>
                  )}

                  {errorInfo?.componentStack && (
                    <div>
                      <h3 className="text-sm font-bold text-red-800 mb-2">Component Stack:</h3>
                      <pre className="text-xs text-red-700 bg-red-100 p-2 rounded overflow-auto max-h-32">
                        {errorInfo.componentStack}
                      </pre>
                    </div>
                  )}
                </div>
              )}
            </div>
          )}

          {/* Enlaces útiles */}
          <div className="text-center pt-4 border-t border-gray-200">
            <p className="text-sm text-gray-500 mb-2">¿Necesitas ayuda?</p>
            <div className="flex justify-center space-x-4 text-sm">
              <a
                href="/"
                className="text-blue-600 hover:text-blue-800 font-medium"
              >
                🏠 Ir al inicio
              </a>
              <a
                href="/faq"
                className="text-blue-600 hover:text-blue-800 font-medium"
              >
                ❓ FAQ
              </a>
              <a
                href="#coverage"
                className="text-blue-600 hover:text-blue-800 font-medium"
              >
                📞 Contacto
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/**
 * HOC para envolver componentes con Error Boundary
 * 
 * @param WrappedComponent - Componente a envolver
 * @param errorBoundaryProps - Props para el Error Boundary
 * @returns Componente envuelto con Error Boundary
 */
export function withErrorBoundary<P extends object>(
  WrappedComponent: React.ComponentType<P>,
  errorBoundaryProps?: Omit<ErrorBoundaryProps, 'children'>
) {
  const ComponentWithErrorBoundary = (props: P) => (
    <ErrorBoundary {...errorBoundaryProps}>
      <WrappedComponent {...props} />
    </ErrorBoundary>
  );

  ComponentWithErrorBoundary.displayName = `withErrorBoundary(${WrappedComponent.displayName || WrappedComponent.name || 'Component'})`;

  return ComponentWithErrorBoundary;
}

/**
 * Hook para lanzar errores de prueba (solo en desarrollo)
 */
export function useErrorTest() {
  const throwError = (message: string = 'Error de prueba') => {
    if (process.env.NODE_ENV === 'development') {
      throw new Error(message);
    } else {
      console.warn('useErrorTest solo funciona en modo desarrollo');
    }
  };

  return { throwError };
}
