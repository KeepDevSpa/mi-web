/**
 * @fileoverview Componente de seguridad global para la aplicación
 * 
 * Implementa medidas de seguridad del lado cliente incluyendo:
 * - Deshabilitación del clic derecho
 * - Prevención de teclas de desarrollo
 * - Protección contra selección de texto
 * - Deshabilitación de herramientas de desarrollador
 * - Detección de intentos de inspección
 * 
 * @author Prisma Móvil Team
 * @version 5.2.0
 * @since 2025-09-01
 */

'use client';

import { useEffect } from 'react';
import { errorManager, ErrorType, ErrorSeverity } from '@/lib/error-manager';

/**
 * Props para el componente de seguridad
 */
interface SecurityProviderProps {
  children: React.ReactNode;
  disableRightClick?: boolean;
  disableDevTools?: boolean;
  disableTextSelection?: boolean;
  disableF12?: boolean;
  enableSecurityLogging?: boolean;
}

/**
 * Componente proveedor de seguridad global
 * 
 * Este componente debe envolver toda la aplicación para aplicar
 * las medidas de seguridad del lado cliente.
 * 
 * @param props - Configuración de seguridad
 * @returns JSX del proveedor de seguridad
 */
export function SecurityProvider({
  children,
  disableRightClick = true,
  disableDevTools = true,
  disableTextSelection = false,
  disableF12 = true,
  enableSecurityLogging = true
}: SecurityProviderProps) {

  useEffect(() => {
    /**
     * Maneja eventos de clic derecho
     */
    const handleRightClick = (e: MouseEvent) => {
      if (disableRightClick) {
        e.preventDefault();
        e.stopPropagation();
        
        if (enableSecurityLogging) {
          errorManager.captureError(
            new Error('Intento de clic derecho bloqueado'),
            ErrorType.UNKNOWN,
            ErrorSeverity.LOW,
            {
              userAgent: navigator.userAgent,
              timestamp: new Date().toISOString(),
              url: window.location.href
            }
          );
        }
        
        return false;
      }
    };

    /**
     * Maneja eventos de teclado para prevenir teclas de desarrollo
     */
    const handleKeyDown = (e: KeyboardEvent) => {
      const { keyCode, ctrlKey, shiftKey, altKey, metaKey } = e;
      
      // F12 - Herramientas de desarrollador
      if (disableF12 && keyCode === 123) {
        e.preventDefault();
        logSecurityEvent('Intento de apertura de DevTools con F12');
        return false;
      }

      // Ctrl+Shift+I - Inspeccionar elemento
      if (disableDevTools && ctrlKey && shiftKey && keyCode === 73) {
        e.preventDefault();
        logSecurityEvent('Intento de inspección con Ctrl+Shift+I');
        return false;
      }

      // Ctrl+Shift+C - Selector de elementos
      if (disableDevTools && ctrlKey && shiftKey && keyCode === 67) {
        e.preventDefault();
        logSecurityEvent('Intento de selector con Ctrl+Shift+C');
        return false;
      }

      // Ctrl+Shift+J - Consola
      if (disableDevTools && ctrlKey && shiftKey && keyCode === 74) {
        e.preventDefault();
        logSecurityEvent('Intento de apertura de consola con Ctrl+Shift+J');
        return false;
      }

      // Ctrl+U - Ver código fuente
      if (disableDevTools && ctrlKey && keyCode === 85) {
        e.preventDefault();
        logSecurityEvent('Intento de ver código fuente con Ctrl+U');
        return false;
      }

      // Ctrl+S - Guardar página
      if (ctrlKey && keyCode === 83) {
        e.preventDefault();
        logSecurityEvent('Intento de guardado de página');
        return false;
      }

      // Ctrl+A - Seleccionar todo (opcional)
      if (disableTextSelection && ctrlKey && keyCode === 65) {
        e.preventDefault();
        logSecurityEvent('Intento de selección masiva de texto');
        return false;
      }

      // Ctrl+P - Imprimir
      if (ctrlKey && keyCode === 80) {
        e.preventDefault();
        logSecurityEvent('Intento de impresión');
        return false;
      }
    };

    /**
     * Previene la selección de texto con el mouse
     */
    const handleSelectStart = (e: Event) => {
      if (disableTextSelection) {
        e.preventDefault();
        return false;
      }
    };

    /**
     * Previene el arrastrar y soltar
     */
    const handleDragStart = (e: DragEvent) => {
      e.preventDefault();
      logSecurityEvent('Intento de drag and drop');
      return false;
    };

    /**
     * Registra evento de seguridad
     */
    const logSecurityEvent = (message: string) => {
      if (enableSecurityLogging) {
        errorManager.captureError(
          new Error(message),
          ErrorType.UNKNOWN,
          ErrorSeverity.LOW,
          {
            securityEvent: true,
            userAgent: navigator.userAgent,
            timestamp: new Date().toISOString(),
            url: window.location.href,
            referrer: document.referrer
          }
        );
      }
    };

    /**
     * Detecta si las herramientas de desarrollador están abiertas
     */
    const detectDevTools = () => {
      if (disableDevTools) {
        const threshold = 160;
        
        setInterval(() => {
          if (
            window.outerHeight - window.innerHeight > threshold ||
            window.outerWidth - window.innerWidth > threshold
          ) {
            logSecurityEvent('Posible apertura de herramientas de desarrollador detectada');
            
            // Opcional: redirigir o mostrar advertencia
            // window.location.href = '/security-warning';
          }
        }, 1000);
      }
    };

    /**
     * Prevención de debug mediante console
     */
    const preventConsoleDebug = () => {
      if (disableDevTools) {
        // Reemplazar métodos de console
        const noop = () => {};
        
        if (typeof window !== 'undefined') {
          (window as any).console = {
            ...window.console,
            log: noop,
            debug: noop,
            info: noop,
            warn: noop,
            error: noop,
            clear: noop,
            table: noop,
            trace: noop,
            group: noop,
            groupEnd: noop
          };
        }
      }
    };

    // Aplicar medidas de seguridad
    document.addEventListener('contextmenu', handleRightClick);
    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('selectstart', handleSelectStart);
    document.addEventListener('dragstart', handleDragStart);
    
    // Aplicar estilos CSS de seguridad
    if (disableTextSelection) {
      document.body.style.userSelect = 'none';
      document.body.style.webkitUserSelect = 'none';
      // @ts-ignore - Propiedades específicas del navegador
      document.body.style.mozUserSelect = 'none';
      // @ts-ignore - Propiedades específicas del navegador  
      document.body.style.msUserSelect = 'none';
    }

    // Prevenir clic derecho en imágenes
    // @ts-ignore - Propiedad específica de WebKit
    document.body.style.webkitTouchCallout = 'none';
    
    // Detectar DevTools y prevenir console
    detectDevTools();
    preventConsoleDebug();

    // Mensaje de advertencia en consola
    if (enableSecurityLogging) {
      console.clear();
      console.log(
        '%c🔒 PRISMA MÓVIL - SITIO PROTEGIDO',
        'color: #ff6b6b; font-size: 24px; font-weight: bold; text-shadow: 1px 1px 2px rgba(0,0,0,0.3);'
      );
      console.log(
        '%c⚠️ Este sitio web está protegido. El acceso no autorizado a las herramientas de desarrollador puede constituir una violación de términos de servicio.',
        'color: #ffa726; font-size: 14px; font-weight: bold;'
      );
      console.log(
        '%cSi eres un desarrollador autorizado, contacta al equipo técnico de Prisma Móvil.',
        'color: #42a5f5; font-size: 12px;'
      );
    }

    // Limpieza de event listeners
    return () => {
      document.removeEventListener('contextmenu', handleRightClick);
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('selectstart', handleSelectStart);
      document.removeEventListener('dragstart', handleDragStart);
      
      // Restaurar estilos
      if (disableTextSelection) {
        document.body.style.userSelect = '';
        document.body.style.webkitUserSelect = '';
        // @ts-ignore - Propiedades específicas del navegador
        document.body.style.mozUserSelect = '';
        // @ts-ignore - Propiedades específicas del navegador
        document.body.style.msUserSelect = '';
      }
      // @ts-ignore - Propiedad específica de WebKit
      document.body.style.webkitTouchCallout = '';
    };
  }, [disableRightClick, disableDevTools, disableTextSelection, disableF12, enableSecurityLogging]);

  return <>{children}</>;
}

/**
 * Hook para controles de seguridad dinámicos
 */
export function useSecurityControls() {
  const disableRightClickTemporarily = (duration: number = 5000) => {
    const originalHandler = document.oncontextmenu;
    document.oncontextmenu = (e) => {
      e.preventDefault();
      return false;
    };
    
    setTimeout(() => {
      document.oncontextmenu = originalHandler;
    }, duration);
  };

  const showSecurityWarning = (message: string = 'Acción no permitida') => {
    if (typeof window !== 'undefined' && 'Notification' in window) {
      Notification.requestPermission().then((permission) => {
        if (permission === 'granted') {
          new Notification('Prisma Móvil - Seguridad', {
            body: message,
            icon: '/logo-prisma.svg'
          });
        }
      });
    }
  };

  return {
    disableRightClickTemporarily,
    showSecurityWarning
  };
}

/**
 * Componente de advertencia de seguridad
 */
export function SecurityWarning({ onClose }: { onClose?: () => void }) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-8 rounded-lg shadow-2xl max-w-md mx-4">
        <div className="text-center">
          <div className="text-red-500 text-4xl mb-4">🔒</div>
          <h2 className="text-xl font-bold text-gray-900 mb-4">
            Sitio Web Protegido
          </h2>
          <p className="text-gray-600 mb-6">
            Este sitio web está protegido contra acceso no autorizado. 
            Las herramientas de desarrollador han sido deshabilitadas 
            por razones de seguridad.
          </p>
          <button
            onClick={onClose}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Entendido
          </button>
        </div>
      </div>
    </div>
  );
}
