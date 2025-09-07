'use client';

import { useState, useEffect } from 'react';
import TabButton from './components/TabButton';
import CardsTab from './tabs/CardsTab';
import InfoCardsTab from './tabs/InfoCardsTab';
import FaqsTab from './tabs/FaqsTab';
import MobileTariffsTab from './tabs/MobileTariffsTab';
import HeroConfigTab from './tabs/HeroConfigTab';
import PageSelectorsTab from './tabs/PageSelectorsTab';
import AdvantagesTab from './tabs/AdvantagesTab';
import TestimonialsTab from './tabs/TestimonialsTab';
import LeadsTab from './tabs/LeadsTab';
import ServicesTab from './tabs/ServicesTab';
import BlogPostsTab from './tabs/BlogPostsTab';
import SecurityTab from './tabs/SecurityTab';
import UnifiedHeroConfigTab from './tabs/UnifiedHeroConfigTab';

// Definición de pestañas
const tabs = [
  { id: 'cards', label: 'Tarifas', component: CardsTab },
  { id: 'info-cards', label: 'Tarjetas Info', component: InfoCardsTab },
  { id: 'faq', label: 'Preguntas Frecuentes', component: FaqsTab },
  { id: 'advantages', label: 'Ventajas', component: AdvantagesTab },
  { id: 'testimonials', label: 'Testimonios', component: TestimonialsTab },
  { id: 'unified-hero', label: 'Heros Unificados', component: UnifiedHeroConfigTab },
  { id: 'hero', label: 'Hero Home (Legacy)', component: HeroConfigTab },
  { id: 'selectors', label: 'Selectores', component: PageSelectorsTab },
  { id: 'leads', label: 'Leads', component: LeadsTab },
  { id: 'services', label: 'Servicios', component: ServicesTab },
  { id: 'blog-posts', label: 'Blog', component: BlogPostsTab },
  { id: 'security', label: 'Seguridad', component: SecurityTab },
] as const;

export default function AdminPage() {
  const [isAuthed, setIsAuthed] = useState(false);
  const [password, setPassword] = useState('');
  const [activeTab, setActiveTab] = useState<typeof tabs[number]['id']>('cards');

  // Verificar autenticación al cargar
  useEffect(() => {
    const auth = localStorage.getItem('prisma-admin-auth');
    setIsAuthed(!!auth);
  }, []);

  // Manejar login
  const handleLogin = () => {
    if (password === 'M0rth0r0n$') {
      localStorage.setItem('prisma-admin-auth', 'true');
      setIsAuthed(true);
    } else {
      alert('Contraseña incorrecta');
    }
  };

  // Si no está autenticado, muestra el login
  if (!isAuthed) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
          <h1 className="text-2xl font-bold text-center mb-6">Acceso Administrador</h1>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Contraseña"
            className="w-full p-2 border border-gray-300 rounded mb-4"
            onKeyPress={(e) => e.key === 'Enter' && handleLogin()}
          />
          <button
            onClick={handleLogin}
            className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 transition-colors"
          >
            Entrar
          </button>
        </div>
      </div>
    );
  }

  // Obtener el componente activo
  const ActiveComponent = tabs.find(tab => tab.id === activeTab)?.component;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header fijo */}
      <header className="bg-white shadow-sm border-b sticky top-0 z-50">
        <div className="flex items-center justify-between h-16 px-6">
          <div className="flex items-center">
            <h1 className="text-xl font-semibold text-gray-900">Panel de Administración</h1>
            <span className="ml-2 text-sm text-gray-500">Prisma Móvil</span>
          </div>
          <button
            onClick={() => {
              localStorage.removeItem('prisma-admin-auth');
              setIsAuthed(false);
            }}
            className="text-sm text-red-600 hover:text-red-800"
          >
            Cerrar sesión
          </button>
        </div>

        {/* Pestañas */}
        <nav className="bg-white border-b border-gray-200">
          <div className="flex overflow-x-auto">
            {tabs.map((tab) => (
              <TabButton
                key={tab.id}
                isActive={activeTab === tab.id}
                onClick={() => setActiveTab(tab.id)}
              >
                {tab.label}
              </TabButton>
            ))}
          </div>
        </nav>
      </header>

      {/* Contenido principal */}
      <main className="container mx-auto px-4 py-8">
        {ActiveComponent ? <ActiveComponent /> : <p>Sección no encontrada</p>}
      </main>
    </div>
  );
}