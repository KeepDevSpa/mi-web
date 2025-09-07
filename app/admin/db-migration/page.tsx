'use client';

import { useState } from 'react';

export default function PrismaMigrationPage() {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  const runMigration = async () => {
    try {
      setStatus('loading');
      setMessage('Ejecutando migración...');
      
      const response = await fetch('/api/admin/run-migration', {
        method: 'POST'
      });
      
      const data = await response.json();
      
      if (response.ok) {
        setStatus('success');
        setMessage('Migración completada con éxito');
      } else {
        setStatus('error');
        setMessage(`Error: ${data.error || 'Ha ocurrido un problema'}`);
      }
    } catch (error) {
      setStatus('error');
      setMessage(`Error: ${error instanceof Error ? error.message : 'Ha ocurrido un problema'}`);
    }
  };

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Configuración de la Base de Datos</h1>
      
      <div className="bg-white rounded-lg shadow p-6 max-w-xl">
        <h2 className="text-lg font-semibold mb-2">Migración para Hero Unificado</h2>
        <p className="text-gray-600 mb-4">
          Este proceso creará la tabla necesaria para gestionar el componente Hero Unificado.
        </p>
        
        <button
          onClick={runMigration}
          disabled={status === 'loading'}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:bg-blue-300"
        >
          {status === 'loading' ? 'Ejecutando...' : 'Ejecutar Migración'}
        </button>
        
        {message && (
          <div className={`mt-4 p-3 rounded ${
            status === 'success' 
              ? 'bg-green-100 text-green-700' 
              : status === 'error' 
                ? 'bg-red-100 text-red-700' 
                : 'bg-blue-100 text-blue-700'
          }`}>
            {message}
          </div>
        )}
      </div>
    </div>
  );
}
