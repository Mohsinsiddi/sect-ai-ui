// src/app/sects/join/[token]/JoinSectClient.tsx
'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Shield, X, Wallet, Users, Star, Crown, ChevronRight, Check } from 'lucide-react';
import { Button } from '@/components/ui/Button';

interface SectJoinData {
  name: string;
  description: string;
  memberCount: number;
  premiumCount: number;
  fee: string;
  creator: string;
  performance: {
    totalProfit: string;
    trades: number;
    winRate: string;
  };
}

export default function JoinSectClient({ token }: { token: string }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [sectData, setSectData] = useState<SectJoinData | null>(null);
  const [joinStep, setJoinStep] = useState<'info' | 'payment'>('info');

  useEffect(() => {
    if (token) {
      try {
        const decodedString = atob(token);
        const sectInfo = JSON.parse(decodedString);

        setSectData({
          name: sectInfo.name,
          description:
            'Elite trading collective focused on high-impact strategies and real-time market analysis. Join a community of dedicated traders sharing insights and opportunities.',
          memberCount: 156,
          premiumCount: 89,
          fee: sectInfo.fee,
          creator: '0x1234...5678',
          performance: {
            totalProfit: '+34.5%',
            trades: 1234,
            winRate: '76.4%',
          },
        });
      } catch (error) {
        console.error('Failed to decode sect data:', error);
        router.push('/sects');
      }
    }
  }, [token, router]);

  const handleJoin = async () => {
    setLoading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));
      setJoinStep('payment');
      await new Promise((resolve) => setTimeout(resolve, 2000));
      router.push('/sects');
    } catch (error) {
      console.error('Join failed:', error);
      setLoading(false);
    }
  };

  if (!sectData) {
    return (
      <div className="fixed inset-0 flex items-center justify-center">
        <div className="h-6 w-6 border-2 border-blue-500/30 border-t-blue-500 rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <>
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40" />

      {/* Modal */}
      <div className="fixed inset-0 flex items-center justify-center p-4 z-50">
        <div className="bg-white rounded-lg p-4 w-full max-w-md shadow-xl">
          {/* Rest of your existing JSX... */}
          {/* Header */}
          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center space-x-2">
              <div className="bg-blue-100 p-1.5 rounded-full">
                <Shield className="h-4 w-4 text-blue-600" />
              </div>
              <h2 className="text-lg font-bold">Join {sectData.name}</h2>
            </div>
            <button
              onClick={() => router.push('/sects')}
              className="hover:bg-gray-100 p-1.5 rounded-full transition-colors"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          {joinStep === 'info' ? (
            <div className="space-y-4">
              {/* Description */}
              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg p-3">
                <p className="text-sm text-gray-600">{sectData.description}</p>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-gray-50 rounded-lg p-2">
                  <div className="flex items-center space-x-2 text-gray-600 mb-1">
                    <Users className="h-4 w-4" />
                    <span className="text-xs font-medium">Total Members</span>
                  </div>
                  <p className="text-lg font-bold">{sectData.memberCount}</p>
                </div>
                <div className="bg-gray-50 rounded-lg p-2">
                  <div className="flex items-center space-x-2 text-gray-600 mb-1">
                    <Star className="h-4 w-4" />
                    <span className="text-xs font-medium">Premium Members</span>
                  </div>
                  <p className="text-lg font-bold">{sectData.premiumCount}</p>
                </div>
              </div>

              {/* Performance */}
              <div className="bg-green-50 border border-green-100 rounded-lg p-3">
                <h3 className="font-medium text-green-800 mb-2">Performance</h3>
                <div className="grid grid-cols-3 gap-2 text-sm">
                  <div>
                    <p className="text-green-600">Total Profit</p>
                    <p className="font-bold text-green-700">{sectData.performance.totalProfit}</p>
                  </div>
                  <div>
                    <p className="text-green-600">Total Trades</p>
                    <p className="font-bold text-green-700">{sectData.performance.trades}</p>
                  </div>
                  <div>
                    <p className="text-green-600">Win Rate</p>
                    <p className="font-bold text-green-700">{sectData.performance.winRate}</p>
                  </div>
                </div>
              </div>

              {/* Creator & Fee */}
              <div className="border-t border-b py-3">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-2">
                    <Crown className="h-4 w-4 text-yellow-500" />
                    <span className="text-sm font-medium">Created by</span>
                  </div>
                  <span className="text-xs font-mono bg-gray-50 px-2 py-1 rounded">
                    {sectData.creator}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Wallet className="h-4 w-4 text-blue-500" />
                    <span className="text-sm font-medium">Membership Fee</span>
                  </div>
                  <span className="text-sm font-bold">{sectData.fee} ETH</span>
                </div>
              </div>

              {/* Benefits */}
              <div className="bg-blue-50 border border-blue-100 rounded-lg p-3">
                <h3 className="font-medium text-blue-800 mb-1">Premium Benefits</h3>
                <ul className="space-y-1 text-sm text-blue-700">
                  <li className="flex items-center space-x-2">
                    <ChevronRight className="h-3 w-3" />
                    <span>Access to exclusive trading signals</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <ChevronRight className="h-3 w-3" />
                    <span>Real-time market analysis</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <ChevronRight className="h-3 w-3" />
                    <span>Priority support from community managers</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <ChevronRight className="h-3 w-3" />
                    <span>Participate in premium-only discussions</span>
                  </li>
                </ul>
              </div>

              <Button
                fullWidth
                onClick={handleJoin}
                disabled={loading}
                className="h-8 text-sm bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <div className="h-3 w-3 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    <span>Connecting Wallet...</span>
                  </>
                ) : (
                  'Connect Wallet to Join'
                )}
              </Button>
            </div>
          ) : (
            // Payment Processing View
            <div className="py-8 text-center space-y-4">
              <div className="flex justify-center">
                <div className="bg-green-100 rounded-full p-3">
                  <Check className="h-6 w-6 text-green-600" />
                </div>
              </div>
              <div>
                <h3 className="text-lg font-bold">Processing Payment</h3>
                <p className="text-sm text-gray-600 mt-1">
                  Please confirm the transaction in your wallet
                </p>
              </div>
              <div className="flex justify-center">
                <div className="h-4 w-4 border-2 border-blue-500/30 border-t-blue-500 rounded-full animate-spin" />
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
