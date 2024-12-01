// src/app/activity/page.tsx
'use client';

import {
  Activity as ActivityIcon,
  Users,
  TrendingUp,
  TrendingDown,
  ArrowUpRight,
  ArrowDownRight,
  Star,
  MessageSquare,
  Crown,
  Shield,
  Wallet,
  BadgeCheck,
  Timer,
} from 'lucide-react';
import { useState } from 'react';

interface Activity {
  id: string;
  icon: any;
  title: string;
  time: string;
  description: string;
  type: 'trade' | 'social' | 'system';
  additionalInfo?: {
    amount?: string;
    change?: number;
    token?: string;
    price?: string;
    user?: string;
    sect?: string;
  };
}

const ActivityItem = ({ activity }: { activity: Activity }) => {
  const { icon: Icon, title, time, description, type, additionalInfo } = activity;

  const getBgColor = (type: string) => {
    switch (type) {
      case 'trade':
        return 'bg-green-50';
      case 'social':
        return 'bg-blue-50';
      case 'system':
        return 'bg-purple-50';
      default:
        return 'bg-gray-50';
    }
  };

  const getIconColor = (type: string) => {
    switch (type) {
      case 'trade':
        return 'text-green-500';
      case 'social':
        return 'text-blue-500';
      case 'system':
        return 'text-purple-500';
      default:
        return 'text-gray-500';
    }
  };

  return (
    <div className="bg-white rounded-lg p-4 hover:shadow-md transition-shadow duration-200">
      <div className="flex items-start space-x-3">
        <div className={`p-2 ${getBgColor(type)} rounded-full shrink-0`}>
          <Icon className={`h-5 w-5 ${getIconColor(type)}`} />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex justify-between items-start">
            <h3 className="font-medium truncate">{title}</h3>
            <span className="text-sm text-gray-500 whitespace-nowrap ml-2">{time}</span>
          </div>
          <p className="text-sm text-gray-600 mt-1">{description}</p>

          {additionalInfo && (
            <div className="mt-3 flex flex-wrap gap-2">
              {additionalInfo.token && (
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                  {additionalInfo.token}
                </span>
              )}
              {additionalInfo.price && (
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                  {additionalInfo.price}
                </span>
              )}
              {additionalInfo.change && (
                <span
                  className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    additionalInfo.change >= 0
                      ? 'bg-green-100 text-green-800'
                      : 'bg-red-100 text-red-800'
                  }`}
                >
                  {additionalInfo.change >= 0 ? '+' : ''}
                  {additionalInfo.change}%
                </span>
              )}
              {additionalInfo.amount && (
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                  {additionalInfo.amount}
                </span>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

interface FilterButtonProps {
  active?: boolean;
  children: React.ReactNode;
  onClick: () => void;
}

const FilterButton: React.FC<FilterButtonProps> = ({ active = false, children, onClick }) => (
  <button
    onClick={onClick}
    className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
      active ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
    }`}
  >
    {children}
  </button>
);
export default function Activity() {
  const [filter, setFilter] = useState<'all' | 'trade' | 'social' | 'system'>('all');

  const activities: Activity[] = [
    {
      id: '1',
      icon: TrendingUp,
      title: 'Long Position Opened',
      time: '2m ago',
      description: 'BTC/USD long position opened with 2x leverage',
      type: 'trade',
      additionalInfo: {
        token: 'BTC/USD',
        price: '$43,500',
        amount: '0.5 BTC',
      },
    },
    {
      id: '2',
      icon: Crown,
      title: 'New Premium Member',
      time: '5m ago',
      description: 'Alex.eth upgraded to premium membership in Alpha Hunters',
      type: 'social',
      additionalInfo: {
        sect: 'Alpha Hunters',
      },
    },
    {
      id: '3',
      icon: TrendingDown,
      title: 'Position Closed',
      time: '15m ago',
      description: 'ETH/USD position closed with profit',
      type: 'trade',
      additionalInfo: {
        token: 'ETH/USD',
        price: '$2,380',
        change: 5.2,
        amount: '5 ETH',
      },
    },
    {
      id: '4',
      icon: MessageSquare,
      title: 'New Signal Alert',
      time: '25m ago',
      description: 'Potential setup for SOL/USD shared in Degen Society',
      type: 'social',
    },
    {
      id: '5',
      icon: Shield,
      title: 'Risk Alert',
      time: '30m ago',
      description: 'High volatility detected in market conditions',
      type: 'system',
    },
    {
      id: '6',
      icon: BadgeCheck,
      title: 'Achievement Unlocked',
      time: '1h ago',
      description: 'First successful copy trade completed',
      type: 'system',
      additionalInfo: {
        change: 3.8,
      },
    },
  ];

  const filteredActivities =
    filter === 'all' ? activities : activities.filter((activity) => activity.type === filter);

  return (
    <div className="max-w-4xl mx-auto py-4 px-4 sm:px-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-xl font-bold sm:text-2xl">Global Activity</h1>
        <div className="flex gap-2 overflow-x-auto pb-2">
          <FilterButton active={filter === 'all'} onClick={() => setFilter('all')}>
            All
          </FilterButton>
          <FilterButton active={filter === 'trade'} onClick={() => setFilter('trade')}>
            Trades
          </FilterButton>
          <FilterButton active={filter === 'social'} onClick={() => setFilter('social')}>
            Social
          </FilterButton>
          <FilterButton active={filter === 'system'} onClick={() => setFilter('system')}>
            System
          </FilterButton>
        </div>
      </div>

      <div className="space-y-3">
        {filteredActivities.map((activity) => (
          <ActivityItem key={activity.id} activity={activity} />
        ))}
      </div>
    </div>
  );
}
