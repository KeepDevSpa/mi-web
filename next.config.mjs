/**
 * @fileoverview Configuración de Next.js con medidas de seguridad integradas
 * 
 * Esta configuración incluye:
 * - Headers de seguridad HTTP
 * - Configuración de dominio de imágenes
 * - Optimizaciones de rendimiento
 * - Medidas de protección contra ataques comunes
 * 
 * @author Prisma Móvil Team
 * @version 5.2.0
 * @since 2025-09-01
 */

// Importamos 'dotenv' para asegurarnos de que las variables de entorno se carguen siempre.
import 'dotenv/config';

/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: false,
    domains: ['localhost', '127.0.0.1', 'prismamovil.com', 'images.unsplash.com'],
    formats: ['image/webp', 'image/avif'],
  },
  
  // Headers de seguridad HTTP
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          // Prevenir ataques de DNS prefetch
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on'
          },
          // HSTS - Forzar HTTPS (solo en producción)
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=63072000; includeSubDomains; preload'
          },
          // Protección XSS
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block'
          },
          // Prevenir clickjacking
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN'
          },
          // Prevenir MIME type sniffing
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff'
          },
          // Política de referrer
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin'
          },
          // Permissions Policy (anteriormente Feature Policy)
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=(self), interest-cohort=()'
          }
        ],
      },
    ]
  },
  
  // Configuración de seguridad adicional
  poweredByHeader: false, // Ocultar header X-Powered-By
  
  // Redirects de seguridad
  async redirects() {
    return [
      // Bloquear acceso a archivos sensibles
      {
        source: '/.env',
        destination: '/404',
        permanent: false,
      },
      {
        source: '/.env.local',
        destination: '/404', 
        permanent: false,
      },
      {
        source: '/package.json',
        destination: '/404',
        permanent: false,
      }
    ]
  }
}

export default nextConfig