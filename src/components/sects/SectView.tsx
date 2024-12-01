'use client';

import React, { useState } from 'react';
import { MessageCircle, TrendingUp, Activity, Crown, X, Lock, Shield } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { SectViewProps } from './types';
import { ChainId, getChainById, getExplorerTxUrl } from '@/utils/chains';

// Types
interface SignalContent {
  pair: string;
  entry: string;
  targets: string[];
  stop: string;
  notes: string;
}

interface Message {
  id: number;
  type?: 'signal';
  user: string;
  role: 'admin' | 'member' | 'premium' | 'caller';
  time: string;
  content: string | SignalContent;
  isCurrentUser?: boolean;
}

interface TradingCall {
  id: number;
  pair: string;
  status: 'active' | 'pending' | 'closed';
  time: string;
  profit?: string;
  entry: string;
  targets: string[];
  stop: string;
  riskReward: string;
  timeframe: string;
  notes: string;
  chainId: ChainId;
  txHash: string;
}

interface ActivityEvent {
  type: 'trade_closed' | 'member_joined' | 'trade_opened' | 'target_hit' | 'premium_upgrade';
  time: string;
  profit?: string;
  pair?: string;
  user?: string;
  entry?: string;
  target?: string;
}

// Demo Data
const demoMessages: Message[] = [
  {
    id: 1,
    type: 'signal',
    user: 'Signal Caller',
    role: 'caller',
    time: '1m ago',
    content: {
      pair: 'BTC/USDT',
      entry: '43250-43500',
      targets: ['44100', '44800', '45500'],
      stop: '42800',
      notes: 'Strong breakout potential with increasing volume. Watch 44K resistance.',
    },
  },
  {
    id: 2,
    user: 'CryptoWhale',
    role: 'premium',
    time: '2m ago',
    content: 'Entered BTC at 43,280. Looking strong! 🚀',
    isCurrentUser: false,
  },
  {
    id: 3,
    user: 'You',
    role: 'member',
    time: '3m ago',
    content: 'Got my position at 43,300. Thanks for the call! 📈',
    isCurrentUser: true,
  },
  {
    id: 4,
    user: 'Community Manager',
    role: 'admin',
    time: '5m ago',
    content: 'Remember to set your stop losses and manage risk properly.',
    isCurrentUser: false,
  },
  {
    id: 5,
    type: 'signal',
    user: 'Signal Caller',
    role: 'caller',
    time: '8m ago',
    content: {
      pair: 'ETH/USDT',
      entry: '2850-2870',
      targets: ['2920', '2980', '3050'],
      stop: '2780',
      notes: 'Breaking out of bull flag pattern. Volume confirming the move.',
    },
  },
  {
    id: 6,
    user: 'TradingPro',
    role: 'premium',
    time: '10m ago',
    content: 'The ETH/BTC ratio is looking really good here',
    isCurrentUser: false,
  },
  {
    id: 7,
    user: 'Alice',
    role: 'member',
    time: '12m ago',
    content: 'How many confirmations are we looking for?',
    isCurrentUser: false,
  },
  {
    id: 8,
    user: 'Signal Caller',
    role: 'caller',
    time: '13m ago',
    content: 'Looking for volume confirmation and a clean 4H close above resistance',
    isCurrentUser: false,
  },
  {
    id: 9,
    user: 'You',
    role: 'member',
    time: '15m ago',
    content: 'RSI showing bullish divergence on lower timeframes too',
    isCurrentUser: true,
  },
  {
    id: 10,
    type: 'signal',
    user: 'Signal Caller',
    role: 'caller',
    time: '20m ago',
    content: {
      pair: 'SOL/USDT',
      entry: '98.5-99.5',
      targets: ['102', '105', '108'],
      stop: '95.5',
      notes: 'Breaking out of bull flag pattern. Volume confirming the move.',
    },
  },
  // ... continued in next artifact
];

const tradingCalls: TradingCall[] = [
  {
    id: 1,
    pair: 'BTC/USDT',
    status: 'active',
    time: '5m ago',
    profit: '+5.2%',
    entry: '43,250',
    targets: ['44,100', '44,800', '45,500'],
    stop: '42,800',
    riskReward: '1:3.2',
    timeframe: '4H',
    notes: 'Strong breakout potential with increasing volume. Watch 44K resistance.',
    chainId: 'base',
    txHash: '0xabcdef1234567890abcdef1234567890abcdef1234567890abcdef1234567890',
  },
  {
    id: 2,
    pair: 'ETH/USDT',
    status: 'active',
    time: '15m ago',
    profit: '+3.8%',
    entry: '2,865',
    targets: ['2,920', '2,980', '3,050'],
    stop: '2,780',
    riskReward: '1:2.8',
    timeframe: '4H',
    notes: 'Following BTC movement. Key level break incoming.',
    chainId: 'aptos',
    txHash: '0xabcdef1234567890abcdef1234567890abcdef1234567890abcdef1234567890',
  },
  {
    id: 3,
    pair: 'SOL/USDT',
    status: 'pending',
    time: '25m ago',
    entry: '98.5',
    targets: ['102', '105', '108'],
    stop: '95.5',
    riskReward: '1:2.5',
    timeframe: '1H',
    notes: 'Breaking out of bull flag pattern. Volume confirming.',
    chainId: 'sui',
    txHash: '0xabcdef1234567890abcdef1234567890abcdef1234567890abcdef1234567890',
  },
  // More in next part...
];

const extraMessages: Message[] = [
  {
    id: 11,
    user: 'TradingPro',
    role: 'premium',
    time: '25m ago',
    content: "SOL's price action looking incredibly bullish",
    isCurrentUser: false,
  },
  {
    id: 12,
    user: 'Community Manager',
    role: 'admin',
    time: '28m ago',
    content:
      'Weekly market analysis report will be posted in 2 hours! Get ready for some deep insights 📊',
    isCurrentUser: false,
  },
  {
    id: 13,
    user: 'You',
    role: 'member',
    time: '30m ago',
    content: "Can't wait for the analysis! Last week's was spot on",
    isCurrentUser: true,
  },
  {
    id: 14,
    type: 'signal',
    user: 'Signal Caller',
    role: 'caller',
    time: '35m ago',
    content: {
      pair: 'MATIC/USDT',
      entry: '0.85-0.87',
      targets: ['0.92', '0.95', '1.00'],
      stop: '0.82',
      notes: 'Cup and handle pattern confirmed. Volume increasing on breakout.',
    },
  },
  {
    id: 15,
    user: 'CryptoNinja',
    role: 'premium',
    time: '40m ago',
    content: 'The MATIC setup looks perfect! Entering with full position',
    isCurrentUser: false,
  },
  // Add more messages...
];

// Combine all messages
const allMessages = [...demoMessages, ...extraMessages];

// Additional trading calls
const extraTradingCalls: TradingCall[] = [
  {
    id: 4,
    pair: 'MATIC/USDT',
    status: 'active',
    time: '35m ago',
    profit: '+2.1%',
    entry: '0.86',
    targets: ['0.92', '0.95', '1.00'],
    stop: '0.82',
    riskReward: '1:2.7',
    timeframe: '4H',
    notes: 'Cup and handle breakout with increasing volume.',
    chainId: '',
    txHash: '',
  },
  {
    id: 5,
    pair: 'DOT/USDT',
    status: 'pending',
    time: '45m ago',
    entry: '7.85',
    targets: ['8.20', '8.50', '8.80'],
    stop: '7.50',
    riskReward: '1:2.3',
    timeframe: '1H',
    notes: 'Forming bullish pattern at support. Waiting for confirmation.',
    chainId: '',
    txHash: '',
  },
  {
    id: 6,
    pair: 'LINK/USDT',
    status: 'closed',
    time: '1h ago',
    profit: '+15.2%',
    entry: '15.20',
    targets: ['16.50', '17.20', '18.00'],
    stop: '14.50',
    riskReward: '1:3.0',
    timeframe: '4H',
    notes: 'All targets hit. Excellent trade setup.',
    chainId: '',
    txHash: '',
  },
];

// Combine all trading calls
const allTradingCalls = [...tradingCalls, ...extraTradingCalls];

// Extended activity events
const allActivityEvents: ActivityEvent[] = [
  {
    type: 'trade_closed',
    time: '2m ago',
    profit: '+12.5%',
    pair: 'BTC/USDT',
  },
  {
    type: 'member_joined',
    time: '5m ago',
    user: 'CryptoWhale',
  },
  {
    type: 'trade_opened',
    time: '8m ago',
    pair: 'ETH/USDT',
    entry: '2865',
  },
  {
    type: 'target_hit',
    time: '15m ago',
    pair: 'BTC/USDT',
    target: '44100',
    profit: '+5.2%',
  },
  {
    type: 'premium_upgrade',
    time: '20m ago',
    user: 'TradingPro',
  },
  {
    type: 'trade_closed',
    time: '25m ago',
    profit: '+8.3%',
    pair: 'SOL/USDT',
  },
  {
    type: 'member_joined',
    time: '30m ago',
    user: 'AliceTrader',
  },
  {
    type: 'trade_opened',
    time: '35m ago',
    pair: 'MATIC/USDT',
    entry: '0.86',
  },
  {
    type: 'target_hit',
    time: '40m ago',
    pair: 'ETH/USDT',
    target: '2920',
    profit: '+3.8%',
  },
  {
    type: 'premium_upgrade',
    time: '45m ago',
    user: 'CryptoNinja',
  },
  {
    type: 'trade_closed',
    time: '50m ago',
    profit: '+10.2%',
    pair: 'LINK/USDT',
  },
  {
    type: 'member_joined',
    time: '55m ago',
    user: 'TradeMaster',
  },
  {
    type: 'target_hit',
    time: '1h ago',
    pair: 'MATIC/USDT',
    target: '0.92',
    profit: '+7.0%',
  },
  {
    type: 'trade_opened',
    time: '1h 5m ago',
    pair: 'DOT/USDT',
    entry: '7.85',
  },
  {
    type: 'premium_upgrade',
    time: '1h 10m ago',
    user: 'ProTrader',
  },
];

const MessageInput = () => (
  <div className="sticky bottom-0 border-t bg-white p-3">
    <div className="flex space-x-2">
      <input
        type="text"
        placeholder="Type your message..."
        className="flex-1 px-3 py-1.5 text-sm bg-gray-50 border border-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
      />
      <Button className="rounded-full px-4 py-1.5 h-8 text-sm bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700">
        Send
      </Button>
    </div>
  </div>
);

export const SectView: React.FC<SectViewProps> = ({ sect, onBack }) => {
  const [activeTab, setActiveTab] = useState<'discussion' | 'calls' | 'activity'>('discussion');
  const [message, setMessage] = useState('');

  const handleCopyTrade = (signal: SignalContent) => {
    console.log('Copying trade:', signal);
    // Add your copy trade logic here
  };

  const handleSendMessage = () => {
    if (!message.trim()) return;
    // Add your message sending logic here
    setMessage('');
  };

  return (
    <div className="flex flex-col h-full bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b shadow-sm">
        <div className="flex items-center justify-between p-3">
          <button
            onClick={onBack}
            className="hover:bg-gray-100 p-1.5 rounded-full transition-colors"
          >
            <X className="h-4 w-4 text-gray-600" />
          </button>
          <div className="text-center animate-in slide-in-from-top duration-300">
            <h2 className="text-lg font-bold">{sect.name}</h2>
            <div className="flex items-center justify-center mt-0.5">
              <Crown className="h-3.5 w-3.5 text-yellow-500 mr-1" />
              <span className="text-xs text-gray-600 capitalize">{sect.role}</span>
              <div className="px-2 py-0.5 bg-gray-100 rounded-full text-xs font-medium">
                {getChainById(sect.chainId)?.name}
              </div>
            </div>
            <div className="flex items-center justify-center mt-1 text-xs text-gray-500">
              <span className="font-mono">{`${sect.address.slice(0, 6)}...${sect.address.slice(-4)}`}</span>
              {sect.txHash && (
                <a
                  href={getExplorerTxUrl(sect.chainId, sect.txHash)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="ml-2 flex items-center hover:text-blue-500 transition-colors"
                >
                  View on Explorer
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
          </div>
          <div className="w-8" />
        </div>

        {/* Tabs */}
        <div className="flex border-t">
          {(['discussion', 'calls', 'activity'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex-1 py-2 text-center transition-colors text-sm ${
                activeTab === tab
                  ? 'text-blue-500 border-b-2 border-blue-500 bg-blue-50/50'
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              {tab === 'discussion' && <MessageCircle className="h-4 w-4 mx-auto mb-0.5" />}
              {tab === 'calls' && <TrendingUp className="h-4 w-4 mx-auto mb-0.5" />}
              {tab === 'activity' && <Activity className="h-4 w-4 mx-auto mb-0.5" />}
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Content Area */}
      <div className="flex-1 overflow-hidden">
        {activeTab === 'discussion' && (
          <div className="h-full flex flex-col">
            <div className="flex-1 overflow-y-auto px-4">
              <div className="py-4 space-y-4">
                {allMessages.map((message) => (
                  <div key={message.id}>
                    {message.type === 'signal' ? (
                      <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg p-3 shadow-lg">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center space-x-2">
                            <TrendingUp className="h-4 w-4" />
                            <span className="font-bold text-sm">
                              {(message.content as SignalContent).pair} Signal
                            </span>
                          </div>
                          <span className="text-xs opacity-75">{message.time}</span>
                        </div>
                        <div className="grid grid-cols-2 gap-2 mb-2">
                          <div className="bg-white/10 rounded-lg p-2">
                            <span className="text-xs opacity-75">Entry Zone</span>
                            <p className="font-mono font-bold text-sm">
                              {(message.content as SignalContent).entry}
                            </p>
                          </div>
                          <div className="bg-white/10 rounded-lg p-2">
                            <span className="text-xs opacity-75">Stop Loss</span>
                            <p className="font-mono font-bold text-sm text-red-300">
                              {(message.content as SignalContent).stop}
                            </p>
                          </div>
                        </div>
                        <div className="bg-white/10 rounded-lg p-2 mb-2">
                          <span className="text-xs opacity-75">Targets</span>
                          <div className="flex space-x-2 mt-0.5">
                            {(message.content as SignalContent).targets.map((target, i) => (
                              <span key={i} className="font-mono font-bold text-sm text-green-300">
                                ${target}
                              </span>
                            ))}
                          </div>
                        </div>
                        <p className="text-xs opacity-90">
                          {(message.content as SignalContent).notes}
                        </p>
                        <Button
                          className="w-full mt-2 h-7 text-xs bg-white/20 hover:bg-white/30 transition-colors"
                          onClick={() => handleCopyTrade(message.content as SignalContent)}
                        >
                          Copy Trade
                        </Button>
                      </div>
                    ) : (
                      <div
                        className={`flex ${message.isCurrentUser ? 'justify-end' : 'justify-start'}`}
                      >
                        <div
                          className={`max-w-[75%] ${
                            message.isCurrentUser
                              ? 'bg-blue-500 text-white rounded-l-lg rounded-tr-lg'
                              : 'bg-white rounded-r-lg rounded-tl-lg shadow-sm'
                          } p-3`}
                        >
                          <div className="flex items-center space-x-2">
                            {!message.isCurrentUser && (
                              <div
                                className={`h-6 w-6 rounded-full flex items-center justify-center ${
                                  message.role === 'admin'
                                    ? 'bg-blue-100'
                                    : message.role === 'premium'
                                      ? 'bg-purple-100'
                                      : message.role === 'caller'
                                        ? 'bg-green-100'
                                        : 'bg-gray-100'
                                }`}
                              >
                                {message.role === 'admin' ? (
                                  <Shield className="h-4 w-4 text-blue-500" />
                                ) : message.role === 'caller' ? (
                                  <TrendingUp className="h-4 w-4 text-green-500" />
                                ) : (
                                  <span className="text-xs font-bold">
                                    {message.user[0].toUpperCase()}
                                  </span>
                                )}
                              </div>
                            )}
                            <div>
                              <div className="flex items-center">
                                <span
                                  className={`font-semibold text-sm ${
                                    message.isCurrentUser ? 'text-white' : 'text-gray-900'
                                  }`}
                                >
                                  {message.user}
                                </span>
                                <span
                                  className={`text-[10px] ml-2 ${
                                    message.isCurrentUser ? 'text-white/70' : 'text-gray-500'
                                  }`}
                                >
                                  {message.time}
                                </span>
                              </div>
                              <p
                                className={`mt-0.5 text-sm ${
                                  message.isCurrentUser ? 'text-white' : 'text-gray-600'
                                }`}
                              >
                                {message.content as string}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
            <MessageInput />
          </div>
        )}

        {activeTab === 'calls' && (
          <div className="overflow-y-auto h-full">
            <div className="p-4 space-y-4">
              {allTradingCalls.map((call) => (
                <div
                  key={call.id}
                  className="bg-white rounded-lg p-3 shadow-sm border border-gray-100"
                >
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <div className="flex items-center space-x-2">
                        <span
                          className={`text-xs px-2 py-0.5 rounded-full ${
                            call.status === 'active'
                              ? 'bg-green-100 text-green-700'
                              : call.status === 'pending'
                                ? 'bg-blue-100 text-blue-700'
                                : 'bg-gray-100 text-gray-700'
                          }`}
                        >
                          {call.status.charAt(0).toUpperCase() + call.status.slice(1)}
                        </span>
                        <span className="text-xs text-gray-500">{call.time}</span>
                      </div>
                      <h3 className="font-bold text-base mt-1">{call.pair}</h3>
                      {/* Chain Badge */}
                      <div className="px-2 py-0.5 bg-gray-100 rounded-full text-xs font-medium">
                        {getChainById(call.chainId)?.name || 'Unknown Chain'}
                      </div>
                      {/* Explorer Link */}
                      {call.txHash && (
                        <a
                          href={getExplorerTxUrl(call.chainId, call.txHash)}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-xs text-gray-500 hover:text-blue-500 transition-colors flex items-center"
                        >
                          <span className="font-mono">
                            {`${call.txHash.slice(0, 6)}...${call.txHash.slice(-4)}`}
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
                    {call.profit && (
                      <div className="bg-green-50 px-2 py-0.5 rounded-full">
                        <span className="text-xs font-medium text-green-600">{call.profit}</span>
                      </div>
                    )}
                  </div>

                  <div className="grid grid-cols-4 gap-2 mb-3">
                    <div className="bg-gray-50 p-2 rounded-lg">
                      <span className="text-xs text-gray-500">Entry</span>
                      <p className="font-mono font-bold text-sm mt-0.5">{call.entry}</p>
                    </div>
                    {call.targets.map((target, index) => (
                      <div key={index} className="bg-green-50 p-2 rounded-lg">
                        <span className="text-xs text-gray-500">Target {index + 1}</span>
                        <p className="font-mono font-bold text-sm text-green-600 mt-0.5">
                          {target}
                        </p>
                      </div>
                    ))}
                    <div className="bg-red-50 p-2 rounded-lg">
                      <span className="text-xs text-gray-500">Stop</span>
                      <p className="font-mono font-bold text-sm text-red-500 mt-0.5">{call.stop}</p>
                    </div>
                  </div>

                  <div className="space-y-1.5 text-xs">
                    <div className="text-gray-600">
                      <span className="font-medium">Risk/Reward:</span> {call.riskReward}
                    </div>
                    <div className="text-gray-600">
                      <span className="font-medium">Timeframe:</span> {call.timeframe}
                    </div>
                    <p className="text-gray-600 mt-2">{call.notes}</p>
                  </div>

                  <div className="flex space-x-2 mt-3">
                    <Button className="flex-1 h-7 text-xs bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700">
                      Copy Trade
                    </Button>
                    <Button className="px-3 h-7 text-xs bg-gray-100 hover:bg-gray-200 text-gray-700">
                      Share
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'activity' && (
          <div className="overflow-y-auto h-full">
            <div className="p-4 space-y-2">
              {allActivityEvents.map((event, i) => (
                <div key={i} className="bg-white rounded-lg p-3 shadow-sm border border-gray-100">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      {event.type === 'trade_closed' && (
                        <>
                          <div className="bg-green-100 p-1.5 rounded-full">
                            <TrendingUp className="h-4 w-4 text-green-500" />
                          </div>
                          <div>
                            <span className="text-sm font-medium">Trade Closed</span>
                            <div className="flex items-center mt-0.5">
                              <span className="text-xs text-gray-500">{event.pair}</span>
                              <span className="text-xs font-medium text-green-500 ml-2">
                                {event.profit}
                              </span>
                            </div>
                          </div>
                        </>
                      )}
                      {event.type === 'member_joined' && (
                        <>
                          <div className="bg-blue-100 p-1.5 rounded-full">
                            <Shield className="h-4 w-4 text-blue-500" />
                          </div>
                          <div>
                            <span className="text-sm font-medium">{event.user}</span>
                            <p className="text-xs text-gray-500 mt-0.5">Joined the sect</p>
                          </div>
                        </>
                      )}
                      {event.type === 'trade_opened' && (
                        <>
                          <div className="bg-purple-100 p-1.5 rounded-full">
                            <Activity className="h-4 w-4 text-purple-500" />
                          </div>
                          <div>
                            <span className="text-sm font-medium">New Trade Opened</span>
                            <div className="flex items-center mt-0.5">
                              <span className="text-xs text-gray-500">{event.pair}</span>
                              <span className="text-xs font-mono ml-2">@ {event.entry}</span>
                            </div>
                          </div>
                        </>
                      )}
                      {event.type === 'target_hit' && (
                        <>
                          <div className="bg-green-100 p-1.5 rounded-full">
                            <TrendingUp className="h-4 w-4 text-green-500" />
                          </div>
                          <div>
                            <span className="text-sm font-medium">Target Hit</span>
                            <div className="flex items-center mt-0.5">
                              <span className="text-xs text-gray-500">{event.pair}</span>
                              <span className="text-xs font-medium text-green-500 ml-2">
                                {event.profit}
                              </span>
                            </div>
                          </div>
                        </>
                      )}
                      {event.type === 'premium_upgrade' && (
                        <>
                          <div className="bg-yellow-100 p-1.5 rounded-full">
                            <Crown className="h-4 w-4 text-yellow-600" />
                          </div>
                          <div>
                            <span className="text-sm font-medium">{event.user}</span>
                            <p className="text-xs text-gray-500 mt-0.5">Upgraded to Premium</p>
                          </div>
                        </>
                      )}
                    </div>
                    <span className="text-xs text-gray-500">{event.time}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SectView;
