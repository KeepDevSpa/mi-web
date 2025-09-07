// Elementos visuales dinámicos estilo Vodafone
'use client';

import { useEffect, useState } from 'react';

interface FloatingElementProps {
  delay?: number;
  duration?: number;
  className?: string;
}

export function FloatingElements() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Elementos flotantes decorativos */}
      <div className="absolute top-20 left-10 w-16 h-16 bg-green-100/30 rounded-full blur-sm animate-bounce" style={{ animationDelay: '0s', animationDuration: '4s' }} />
      <div className="absolute top-40 right-20 w-12 h-12 bg-blue-100/20 rounded-full blur-sm animate-bounce" style={{ animationDelay: '1s', animationDuration: '5s' }} />
      <div className="absolute bottom-32 left-1/4 w-20 h-20 bg-purple-100/20 rounded-full blur-sm animate-bounce" style={{ animationDelay: '2s', animationDuration: '6s' }} />
      <div className="absolute top-1/3 right-10 w-8 h-8 bg-green-200/40 rounded-full blur-sm animate-bounce" style={{ animationDelay: '3s', animationDuration: '4s' }} />
    </div>
  );
}

export function GradientOrb({ className = '', delay = 0 }: FloatingElementProps) {
  return (
    <div 
      className={`absolute rounded-full blur-3xl opacity-20 animate-pulse ${className}`}
      style={{ 
        animationDelay: `${delay}s`,
        background: 'radial-gradient(circle, rgba(34,197,94,0.3) 0%, transparent 70%)'
      }}
    />
  );
}

export function AnimatedBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* Orbes de gradiente animados */}
      <GradientOrb className="top-0 left-0 w-96 h-96 -translate-x-1/2 -translate-y-1/2" delay={0} />
      <GradientOrb className="top-1/3 right-0 w-80 h-80 translate-x-1/2" delay={2} />
      <GradientOrb className="bottom-0 left-1/3 w-72 h-72 translate-y-1/2" delay={4} />
      
      {/* Patrón de grid sutil */}
      <div 
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(0,0,0,0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0,0,0,0.1) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px'
        }}
      />
    </div>
  );
}

export function PulsatingDot({ className = '', delay = 0 }: FloatingElementProps) {
  return (
    <div className={`relative ${className}`}>
      <div className="absolute inset-0 rounded-full bg-green-400 animate-ping" style={{ animationDelay: `${delay}s` }} />
      <div className="relative rounded-full bg-green-500" />
    </div>
  );
}

export function ServiceIcon({ icon, active = false }: { icon: string; active?: boolean }) {
  return (
    <div className={`relative transition-all duration-500 ${active ? 'scale-110' : 'scale-100'}`}>
      <div className={`w-20 h-20 rounded-2xl flex items-center justify-center text-2xl transition-all duration-500 ${
        active 
          ? 'bg-gradient-to-br from-green-500 to-green-600 text-white shadow-xl shadow-green-500/25' 
          : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
      }`}>
        <span className="relative z-10">{icon}</span>
        {active && (
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-green-400 to-green-600 blur-md opacity-50" />
        )}
      </div>
    </div>
  );
}

export default function VodafoneVisuals() {
  return (
    <>
      <AnimatedBackground />
      <FloatingElements />
    </>
  );
}
