'use client';

import { LayoutDashboard, Users, Activity, Wallet } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Image from 'next/image';
import { WalletConnectButton } from '../sects/Wallet';

export const Navigation = () => {
  const pathname = usePathname();

  const navItems = [
    { name: 'Dashboard', icon: LayoutDashboard, path: '/' },
    { name: 'Sects', icon: Users, path: '/sects' },
    { name: 'Activity', icon: Activity, path: '/activity' },
  ];

  return (
    <nav
      className="fixed bottom-0 left-0 right-0 z-40 
      bg-white/90 backdrop-blur-md border-t 
      shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)]
      sm:sticky sm:top-[64px] sm:border-t-0 sm:border-b"
    >
      <div className="flex justify-around items-center h-16 px-2 max-w-5xl mx-auto">
        {navItems.map((item) => {
          const isActive = pathname === item.path;
          return (
            <Link
              key={item.path}
              href={item.path}
              className={`flex flex-col items-center w-full p-2 
                ${
                  isActive
                    ? 'text-primary-500 font-semibold'
                    : 'text-gray-500 hover:text-primary-400'
                }
                transition-colors group text-center`}
            >
              <item.icon
                className="h-6 w-6 mb-1 
                group-hover:scale-110 transition-transform"
              />
              <span className="text-xs font-medium">{item.name}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
};

export const Header = () => {
  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md shadow-sm">
      <div className="flex justify-between items-center max-w-5xl mx-auto px-4 py-3">
        <Link href="/" className="flex items-center space-x-2">
          <Image src="/logo.png" alt="SectAI Logo" width={40} height={40} className="rounded-lg" />
          <span className="text-xl font-bold text-gray-800">SectAI</span>
        </Link>
        <WalletConnectButton />
      </div>
    </header>
  );
};
