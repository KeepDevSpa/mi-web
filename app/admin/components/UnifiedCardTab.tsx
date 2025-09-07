'use client';

import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { CardsTab } from './tabs/CardsTab';
import { MobileTariffsTab } from './tabs/MobileTariffsTab';

interface UnifiedCardTabProps {
  defaultTab?: string;
}

export function UnifiedCardTab({ defaultTab = 'cards' }: UnifiedCardTabProps) {
  const [activeTab, setActiveTab] = useState(defaultTab);

  return (
    <div className="w-full">
      <Tabs defaultValue={activeTab} onValueChange={setActiveTab}>
        <TabsList className="mb-4">
          <TabsTrigger value="cards">Planes Fijos</TabsTrigger>
          <TabsTrigger value="mobile">Tarjetas Móviles</TabsTrigger>
        </TabsList>
        
        <TabsContent value="cards">
          <CardsTab />
        </TabsContent>
        
        <TabsContent value="mobile">
          <MobileTariffsTab />
        </TabsContent>
      </Tabs>
    </div>
  );
}
