import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Navigation, Header } from '@/components/layout/Navigation';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'SectAI - Trading Communities',
  description: 'Manage your trading communities and copy trades',
  icons: {
    icon: '/favicon.ico',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const isJoinPage =
    typeof window !== 'undefined' && window.location.pathname.includes('/sects/join/');

  return (
    <html lang="en">
      <body className={`${inter.className} bg-gray-50 min-h-screen`}>
        <div className="flex flex-col min-h-screen">
          {!isJoinPage && <Header />}
          <main className="flex-1 max-w-5xl w-full mx-auto px-4 pt-4 pb-20 sm:pb-4">
            {children}
          </main>
          {!isJoinPage && <Navigation />}
        </div>
      </body>
    </html>
  );
}
