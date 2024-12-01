'use client';

// Move your current home page content here
import { useState } from 'react';
import { DashboardView } from '@/components/sects/DashboardView';
import { SectView } from '@/components/sects/SectView';
import type { Sect } from '@/components/sects/types';
import { toSect } from '@/utils/utility';

const isSect = (obj: any): obj is Sect => {
  return (
    typeof obj.id === 'number' &&
    typeof obj.name === 'string' &&
    ['creator', 'premium', 'member'].includes(obj.role) &&
    typeof obj.members === 'number'
  );
};

export default function Sects() {
  const [activeView, setActiveView] = useState<'dashboard' | 'sect'>('dashboard');
  const [activeSect, setActiveSect] = useState<Sect | null>(null);

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {activeView === 'dashboard' && (
        <DashboardView
          onSectSelect={(sect) => {
            const validSect = toSect(sect);
            setActiveSect(validSect);
            setActiveView('sect');
          }}
        />
      )}
      {activeView === 'sect' && activeSect && (
        <SectView sect={activeSect} onBack={() => setActiveView('dashboard')} />
      )}
    </div>
  );
}
