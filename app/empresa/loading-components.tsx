// Componente de loading y transiciones estilo Vodafone
'use client';

import { useState, useEffect } from 'react';

interface LoadingDotsProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

export function LoadingDots({ className = '', size = 'md' }: LoadingDotsProps) {
  const sizeClasses = {
    sm: 'w-1 h-1',
    md: 'w-2 h-2',
    lg: 'w-3 h-3'
  };

  const dotSize = sizeClasses[size];

  return (
    <div className={`flex items-center space-x-1 ${className}`}>
      <div className={`${dotSize} bg-green-500 rounded-full animate-bounce`} style={{ animationDelay: '0ms' }}></div>
      <div className={`${dotSize} bg-green-500 rounded-full animate-bounce`} style={{ animationDelay: '150ms' }}></div>
      <div className={`${dotSize} bg-green-500 rounded-full animate-bounce`} style={{ animationDelay: '300ms' }}></div>
    </div>
  );
}

interface ServiceTransitionProps {
  isLoading?: boolean;
  children: React.ReactNode;
}

export function ServiceTransition({ isLoading = false, children }: ServiceTransitionProps) {
  const [showContent, setShowContent] = useState(!isLoading);

  useEffect(() => {
    if (isLoading) {
      setShowContent(false);
    } else {
      const timer = setTimeout(() => setShowContent(true), 200);
      return () => clearTimeout(timer);
    }
  }, [isLoading]);

  return (
    <div className="relative min-h-[400px]">
      {/* Loading State */}
      {isLoading && (
        <div className="absolute inset-0 bg-white/90 backdrop-blur-sm rounded-3xl flex items-center justify-center">
          <div className="text-center">
            <LoadingDots size="md" className="mb-4 justify-center" />
            <p className="text-slate-600 font-medium">Cargando información...</p>
          </div>
        </div>
      )}
      
      {/* Content */}
      <div className={`transition-all duration-500 ease-out ${
        showContent ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform translate-y-4'
      }`}>
        {children}
      </div>
    </div>
  );
}

interface ProgressBarProps {
  progress: number;
  className?: string;
  showPercentage?: boolean;
}

export function ProgressBar({ progress, className = '', showPercentage = false }: ProgressBarProps) {
  return (
    <div className={`w-full ${className}`}>
      <div className="flex items-center justify-between mb-2">
        {showPercentage && (
          <span className="text-sm font-medium text-slate-700">{progress}%</span>
        )}
      </div>
      <div className="w-full bg-slate-200 rounded-full h-2">
        <div 
          className="bg-gradient-to-r from-green-500 to-green-600 h-2 rounded-full transition-all duration-700 ease-out"
          style={{ width: `${progress}%` }}
        ></div>
      </div>
    </div>
  );
}

interface NotificationProps {
  type?: 'success' | 'error' | 'info';
  message: string;
  show: boolean;
  onClose?: () => void;
}

export function Notification({ type = 'info', message, show, onClose }: NotificationProps) {
  const typeStyles = {
    success: 'bg-green-50 border-green-200 text-green-800',
    error: 'bg-red-50 border-red-200 text-red-800',
    info: 'bg-blue-50 border-blue-200 text-blue-800'
  };

  const icons = {
    success: '✅',
    error: '❌',
    info: 'ℹ️'
  };

  if (!show) return null;

  return (
    <div className={`fixed top-4 right-4 p-4 rounded-xl border-2 shadow-lg transition-all duration-300 z-50 ${typeStyles[type]}`}>
      <div className="flex items-center space-x-3">
        <span className="text-lg">{icons[type]}</span>
        <p className="font-medium">{message}</p>
        {onClose && (
          <button
            onClick={onClose}
            className="ml-4 text-slate-400 hover:text-slate-600 transition-colors"
          >
            ✕
          </button>
        )}
      </div>
    </div>
  );
}

export function PulseEffect({ children, isActive = false }: { children: React.ReactNode; isActive?: boolean }) {
  return (
    <div className={`relative ${isActive ? 'animate-pulse' : ''}`}>
      {children}
      {isActive && (
        <div className="absolute inset-0 rounded-full bg-green-400 opacity-20 animate-ping"></div>
      )}
    </div>
  );
}
