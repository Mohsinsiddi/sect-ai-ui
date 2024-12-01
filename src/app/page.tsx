'use client';

import PositionManagementModal from '@/components/sects/PositionManagementModal';
import { Position } from '@/type/common';
import { ChainId, getChainById, getExplorerTxUrl } from '@/utils/chains';
import {
  ArrowUpRight,
  ArrowDownRight,
  LineChart,
  Users,
  Star,
  History,
  Crown,
  Wallet,
  TrendingUp,
  AlertCircle,
  Lock
} from 'lucide-react';
import { ElementType, useEffect, useState } from 'react';

import dynamic from 'next/dynamic';
import { WalletManagementModal } from '@/components/modals/WalletManagementModal';

const LandingModal = dynamic(() => import('@/components/modals/LandingModal'), {
  ssr: false,
});

interface WalletConfig {
  chainId: ChainId;
  address?: string;
  balance?: number;
  isConfigured: boolean;
}

interface Sect {
  id: string;
  name: string;
  type: 'joined' | 'created';
  members: number;
  activity: string;
  description: string;
}

interface Transaction {
  id: string;
  type: 'deposit' | 'withdrawal' | 'trade';
  amount: number;
  timestamp: string;
  token?: string;
}
interface StatItem {
  title: string;
  value: string;
  icon: ElementType;
  change: number;
  onClick?: () => void;
}
export default function Dashboard() {
  const [isPositionModalOpen, setIsPositionModalOpen] = useState(false);

  const [showLanding, setShowLanding] = useState(false);

  const [isWalletModalOpen, setIsWalletModalOpen] = useState(false);


  useEffect(() => {
    // Check if user is new (you can use localStorage or cookies)
    const isNewUser = !localStorage.getItem('hasSeenLanding');
    setShowLanding(isNewUser);
  }, []);

  const handleCloseLanding = () => {
    localStorage.setItem('hasSeenLanding', 'true');
    setShowLanding(false);
  };

  // Expanded Mock Data
  const positions: Position[] = [
    {
      id: '1',
      token: 'BTC',
      entry: 42500,
      current: 43200,
      amount: 0.5,
      pnl: 3.2,
      status: 'active',
      timestamp: '2h ago',
      leverage: 2,
      chainId: 'base',
      txHash: '0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef',
      sect: 'Global',
    },
    {
      id: '2',
      token: 'ETH',
      entry: 2250,
      current: 2380,
      amount: 5,
      pnl: 5.8,
      status: 'active',
      timestamp: '4h ago',
      leverage: 3,
      chainId: 'base',
      txHash: '0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef',
      sect: 'Global',
    },
    {
      id: '3',
      token: 'SOL',
      entry: 98.5,
      current: 95.2,
      amount: 20,
      pnl: -3.35,
      status: 'active',
      timestamp: '1h ago',
      leverage: 1.5,
      chainId: 'base',
      txHash: '0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef',
      sect: 'Global',
    },
    {
      id: '4',
      token: 'MATIC',
      entry: 1.2,
      current: 1.45,
      amount: 1000,
      pnl: 12.5,
      status: 'closed',
      timestamp: '1d ago',
      chainId: 'base',
      txHash: '0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef',
      sect: 'Global',
    },
    {
      id: '5',
      token: 'AVAX',
      entry: 35.6,
      current: 34.2,
      amount: 10,
      pnl: -4.2,
      status: 'closed',
      timestamp: '2d ago',
      chainId: 'base',
      txHash: '0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef',
      sect: 'Global',
    },
    {
      id: '6',
      token: 'DOT',
      entry: 6.8,
      current: 7.2,
      amount: 50,
      pnl: 5.9,
      status: 'active',
      timestamp: '3h ago',
      leverage: 2.5,
      chainId: 'base',
      txHash: '0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef',
      sect: 'Global',
    },
  ];

  const sects: Sect[] = [
    {
      id: '1',
      name: 'Alpha Hunters',
      type: 'created',
      members: 156,
      activity: 'Very High',
      description: 'High-risk, high-reward trading strategies for advanced traders.',
    },
    {
      id: '2',
      name: 'Degen Society',
      type: 'joined',
      members: 234,
      activity: 'High',
      description: 'Exploring cutting-edge crypto opportunities and emerging tokens.',
    },
    {
      id: '3',
      name: 'Whale Watchers',
      type: 'joined',
      members: 89,
      activity: 'Medium',
      description: 'Tracking and analyzing large cryptocurrency transactions.',
    },
  ];

  const transactions: Transaction[] = [
    { id: '1', type: 'deposit', amount: 5000, timestamp: '3h ago' },
    { id: '2', type: 'trade', amount: 1500, token: 'ETH', timestamp: '6h ago' },
    { id: '3', type: 'withdrawal', amount: 2000, timestamp: '1d ago' },
    { id: '4', type: 'trade', amount: 3000, token: 'BTC', timestamp: '12h ago' },
    { id: '5', type: 'deposit', amount: 10000, timestamp: '2d ago' },
  ];

  const stats: StatItem[] = [
    { title: 'Total Balance', value: '$24,685.50', icon: Wallet, change: 8.2 },
    { title: 'Total P&L', value: '+$1,245.20', icon: TrendingUp, change: 15.4 },
    { title: 'Active Positions', value: '8', icon: AlertCircle, change: 33.3 },
    { 
      title: 'Wallet Management', 
      value: 'Configure', 
      icon: Lock, 
      change: 0, 
      onClick: () => setIsWalletModalOpen(true) 
    },
  ];


  return (
    <>
      {showLanding && <LandingModal onClose={handleCloseLanding} />}
      <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 space-y-6 bg-gray-50">
        {/* Header Stats */}
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        {stats.map((stat) => (
            <div
              key={stat.title}
              className={`bg-white rounded-xl p-4 shadow-md hover:shadow-lg transition-shadow duration-300 ${stat.onClick ? 'cursor-pointer' : ''}`}
              onClick={stat.onClick}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-gray-600">{stat.title}</span>
                <stat.icon className="h-5 w-5 text-gray-400" />
              </div>
              <div className="flex items-baseline justify-between">
                <span className="text-2xl font-bold">{stat.value}</span>
                {stat.change !== 0 && (
                  <div
                    className={`flex items-center ${stat.change >= 0 ? 'text-green-500' : 'text-red-500'}`}
                  >
                    {stat.change >= 0 ? (
                      <ArrowUpRight className="h-4 w-4" />
                    ) : (
                      <ArrowDownRight className="h-4 w-4" />
                    )}
                    <span className="text-sm font-medium">{Math.abs(stat.change)}%</span>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Active Positions & Closed Positions */}
          <div className="lg:col-span-2 space-y-4">
            {/* Active Positions */}
            <div className="bg-white rounded-xl shadow-sm">
              <div className="p-4 border-b flex justify-between items-center">
                <h2 className="text-lg font-semibold">Active Positions</h2>
                <span
                  onClick={() => setIsPositionModalOpen(true)}
                  className="text-sm text-blue-600 cursor-pointer hover:underline"
                >
                  Manage Positions
                </span>
              </div>
              <div className="max-h-96 overflow-y-auto">
                {positions
                  .filter((p) => p.status === 'active')
                  .map((position) => (
                    <div
                      key={position.id}
                      className="p-4 border-b last:border-b-0 hover:bg-gray-50 transition-colors"
                    >
                      <div className="flex justify-between items-start mb-2">
                        <div className="flex items-center">
                          <span className="font-bold text-lg">${position.token}</span>
                          {/* Chain Badge */}
                          <div className="ml-2 px-2 py-0.5 bg-gray-100 rounded-full text-xs font-medium flex items-center">
                            {getChainById(position.chainId)?.name || 'Unknown Chain'}
                          </div>
                          {position.txHash && (
                            <a
                              href={getExplorerTxUrl(position.chainId, position.txHash)}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="ml-2 text-xs text-gray-500 hover:text-blue-500 transition-colors flex items-center"
                            >
                              <span className="font-mono">
                                {`${position.txHash.slice(0, 6)}...${position.txHash.slice(-4)}`}
                              </span>
                              <svg
                                className="h-3 w-3 ml-1"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                                />
                              </svg>
                            </a>
                          )}
                        </div>
                        <div
                          className={`font-semibold ${position.pnl >= 0 ? 'text-green-500' : 'text-red-500'}`}
                        >
                          {position.pnl >= 0 ? '+' : ''}
                          {position.pnl}%
                        </div>
                      </div>
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-sm">
                        <div>
                          <span className="text-gray-500">Entry</span>
                          <div className="font-medium">${position.entry.toLocaleString()}</div>
                        </div>
                        <div>
                          <span className="text-gray-500">Current</span>
                          <div className="font-medium">${position.current.toLocaleString()}</div>
                        </div>
                        <div>
                          <span className="text-gray-500">Amount</span>
                          <div className="font-medium">
                            {position.amount} {position.token}
                          </div>
                        </div>
                        <div>
                          <span className="text-gray-500">Value</span>
                          <div className="font-medium">
                            ${(position.current * position.amount).toLocaleString()}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            </div>

            {/* Closed Positions */}
            <div className="bg-white rounded-xl shadow-sm">
              <div className="p-4 border-b flex justify-between items-center">
                <h2 className="text-lg font-semibold">Recently Closed</h2>
                <span className="text-sm text-blue-600 cursor-pointer hover:underline">
                  View History
                </span>
              </div>
              <div className="max-h-48 overflow-y-auto">
                {positions
                  .filter((p) => p.status === 'closed')
                  .map((position) => (
                    <div
                      key={position.id}
                      className="p-4 border-b last:border-b-0 hover:bg-gray-50 transition-colors"
                    >
                      <div className="flex justify-between items-center">
                        <div className="flex items-center">
                          <span className="font-medium">${position.token}</span>
                          <span className="ml-2 px-2 py-1 text-xs bg-gray-50 text-gray-600 rounded-full">
                            {position.timestamp}
                          </span>
                        </div>
                        <div
                          className={`font-medium ${position.pnl >= 0 ? 'text-green-500' : 'text-red-500'}`}
                        >
                          {position.pnl >= 0 ? '+' : ''}
                          {position.pnl}%
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </div>

          {/* Sects, Transactions & Performance */}
          <div className="space-y-4">
            {/* Your Sects */}
            <div className="bg-white rounded-xl shadow-sm">
              <div className="p-4 border-b flex justify-between items-center">
                <h2 className="text-lg font-semibold">Your Sects</h2>
                <span className="text-sm text-blue-600 cursor-pointer hover:underline">
                  Explore More
                </span>
              </div>
              <div className="max-h-64 overflow-y-auto">
                {sects.map((sect) => (
                  <div
                    key={sect.id}
                    className="p-4 border-b last:border-b-0 hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <div className="flex items-center">
                          <span className="font-medium">{sect.name}</span>
                          {sect.type === 'created' && (
                            <Crown className="h-4 w-4 text-yellow-500 ml-2" />
                          )}
                        </div>
                        <div className="flex items-center mt-1 text-sm text-gray-500">
                          <Users className="h-4 w-4 mr-1" />
                          {sect.members} members
                        </div>
                        <p className="text-xs text-gray-500 mt-1">{sect.description}</p>
                      </div>
                      <span
                        className={`text-sm px-2 py-1 rounded-full 
                      ${
                        sect.activity === 'Very High'
                          ? 'bg-green-50 text-green-600'
                          : sect.activity === 'High'
                            ? 'bg-blue-50 text-blue-600'
                            : 'bg-gray-50 text-gray-600'
                      }`}
                      >
                        {sect.activity}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Recent Transactions */}
            <div className="bg-white rounded-xl shadow-sm">
              <div className="p-4 border-b flex justify-between items-center">
                <h2 className="text-lg font-semibold">Recent Transactions</h2>
                <span className="text-sm text-blue-600 cursor-pointer hover:underline">
                  View All
                </span>
              </div>
              <div className="max-h-48 overflow-y-auto">
                {transactions.map((transaction) => (
                  <div
                    key={transaction.id}
                    className="p-4 border-b last:border-b-0 hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex justify-between items-center">
                      <div className="flex items-center">
                        <span
                          className={`
                        font-medium capitalize 
                        ${
                          transaction.type === 'deposit'
                            ? 'text-green-600'
                            : transaction.type === 'withdrawal'
                              ? 'text-red-600'
                              : 'text-blue-600'
                        }`}
                        >
                          {transaction.type}
                        </span>
                        {transaction.token && (
                          <span className="ml-2 px-2 py-1 text-xs bg-gray-50 text-gray-600 rounded-full">
                            {transaction.token}
                          </span>
                        )}
                      </div>
                      <div className="font-semibold">${transaction.amount.toLocaleString()}</div>
                      <span className="text-xs text-gray-500">{transaction.timestamp}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Performance Chart */}
            <div className="bg-white rounded-xl shadow-sm p-4">
              <h2 className="text-lg font-semibold mb-4">Performance History</h2>
              <div className="h-48 flex items-center justify-center text-gray-500 border-2 border-dashed rounded-lg">
                <LineChart className="h-6 w-6 mr-2" />
                <span>Chart Coming Soon</span>
              </div>
            </div>
          </div>
        </div>
        {/* Position Management Modal */}
        <PositionManagementModal
          isOpen={isPositionModalOpen}
          onClose={() => setIsPositionModalOpen(false)}
          positions={positions}
        />
      </div>

      {isWalletModalOpen && (
          <WalletManagementModal
            onClose={() => setIsWalletModalOpen(false)}
          />
        )}
    </>
  );
}
