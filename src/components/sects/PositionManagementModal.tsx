'use client';

import React, { useState } from 'react';
import { X, Users, Globe, Zap, Pyramid, Compass } from 'lucide-react';
import { getChainById, type ChainId, getExplorerTxUrl } from '@/utils/chains';

type SectType = 'Global' | 'Trend' | 'Momentum' | 'Arbitrage';

type TabType = 'open' | 'closed';

interface Position {
  id: string;
  token: string;
  entry: number;
  current: number;
  amount: number;
  pnl: number;
  status: 'active' | 'closed';
  timestamp: string;
  leverage?: number;
  closedAt?: string;
  sect: SectType;
  chainId: ChainId; // Add this
  txHash: string; // Add this
}

interface PositionManagementModalProps {
  isOpen: boolean;
  onClose: () => void;
  positions: Position[];
}

// Sect icon mapping
const sectIcons: Record<SectType, React.FC> = {
  Global: Globe,
  Trend: Zap,
  Momentum: Pyramid,
  Arbitrage: Compass,
};

const PositionManagementModal: React.FC<PositionManagementModalProps> = ({
  isOpen,
  onClose,
  positions,
}) => {
  const [activeTab, setActiveTab] = useState<'open' | 'closed'>('open');

  const handleClosePosition = (positionId: string) => {
    console.log(`Closing position ${positionId}`);
  };

  if (!isOpen) return null;

  const activePositions = positions.filter((p) => p.status === 'active');
  const closedPositions = positions.filter((p) => p.status === 'closed');

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm">
      <div className="bg-white/90 backdrop-blur-lg rounded-2xl shadow-2xl w-[600px] h-[700px] flex flex-col overflow-hidden">
        {/* Modal Header */}
        <div className="flex justify-between items-center p-4 border-b border-gray-100">
          <h2 className="text-xl font-bold text-gray-800">Position Management</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 bg-gray-100 rounded-full p-2 transition-all"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Tabs */}
        <div className="flex space-x-2 bg-gray-100 p-1 m-4 rounded-full">
          {['open', 'closed'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab as 'open' | 'closed')}
              className={`flex-1 py-2 text-sm font-medium rounded-full transition-all duration-300 ${
                activeTab === tab
                  ? 'bg-white shadow-md text-gray-800'
                  : 'text-gray-600 hover:bg-gray-200'
              }`}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)} Positions
            </button>
          ))}
        </div>

        {/* Positions Content */}
        <div className="flex-1 overflow-y-auto">
          {activeTab === 'open' ? (
            <div className="space-y-2 p-2">
              {activePositions.length === 0 ? (
                <div className="text-center py-6 text-sm text-gray-500">No open positions</div>
              ) : (
                activePositions.map((position) => {
                  const SectIcon = position.sect ? sectIcons[position.sect] : Users;
                  const chain = getChainById(position.chainId);
                  return (
                    <div
                      key={position.id}
                      className="p-3 border border-gray-100 rounded-xl bg-white shadow-sm flex items-center justify-between hover:bg-gray-50 transition-colors"
                    >
                      <div className="flex-1">
                        <div className="flex items-center mb-1">
                          <span className="font-semibold text-base mr-2 text-gray-800">
                            {position.token}
                          </span>
                          {position.leverage && (
                            <span className="px-1.5 py-0.5 bg-yellow-50 text-yellow-600 text-xs rounded-full">
                              {position.leverage}x
                            </span>
                          )}
                          {position.sect && (
                            <span className="ml-2 px-2 py-0.5 bg-blue-50 text-blue-600 text-xs rounded-full flex items-center">
                              <SectIcon className="h-3 w-3 mr-1" />
                              {position.sect} Sect
                            </span>
                          )}
                        </div>
                        <div className="grid grid-cols-4 gap-2 text-xs">
                          <div>
                            <span className="text-gray-500 block mb-0.5">Entry Price</span>
                            <div className="text-gray-700">${position.entry.toLocaleString()}</div>
                          </div>
                          <div>
                            <span className="text-gray-500 block mb-0.5">Current Price</span>
                            <div className="text-gray-700">
                              ${position.current.toLocaleString()}
                            </div>
                          </div>
                          <div>
                            <span className="text-gray-500 block mb-0.5">Amount</span>
                            <div className="text-gray-700">
                              {position.amount} {position.token}
                            </div>
                          </div>
                          <div>
                            <span className="text-gray-500 block mb-0.5">Est. Profit</span>
                            <div
                              className={`font-semibold ${position.pnl >= 0 ? 'text-green-600' : 'text-red-600'}`}
                            >
                              {position.pnl >= 0 ? '+' : ''}
                              {position.pnl}%
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="ml-3">
                        <button
                          onClick={() => handleClosePosition(position.id)}
                          className="px-3 py-1.5 text-xs bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors"
                        >
                          Close
                        </button>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          ) : (
            <div className="space-y-2 p-2">
              {closedPositions.length === 0 ? (
                <div className="text-center py-6 text-sm text-gray-500">No closed positions</div>
              ) : (
                closedPositions.map((position) => {
                  const SectIcon = position.sect ? sectIcons[position.sect] : Users;
                  return (
                    <div
                      key={position.id}
                      className="p-3 border border-gray-100 rounded-xl bg-white shadow-sm flex items-center justify-between hover:bg-gray-50 transition-colors"
                    >
                      <div className="flex-1">
                        <div className="flex items-center mb-1">
                          <span className="font-semibold text-base mr-2 text-gray-800">
                            {position.token}
                          </span>
                          <span className="px-1.5 py-0.5 bg-gray-50 text-gray-600 text-xs rounded-full">
                            Closed {position.timestamp} ago
                          </span>
                          {position.sect && (
                            <span className="ml-2 px-2 py-0.5 bg-blue-50 text-blue-600 text-xs rounded-full flex items-center">
                              <SectIcon className="h-3 w-3 mr-1" />
                              {position.sect} Sect
                            </span>
                          )}
                        </div>
                        <div className="grid grid-cols-4 gap-2 text-xs">
                          <div>
                            <span className="text-gray-500 block mb-0.5">Entry Price</span>
                            <div className="text-gray-700">${position.entry.toLocaleString()}</div>
                          </div>
                          <div>
                            <span className="text-gray-500 block mb-0.5">Closed Price</span>
                            <div className="text-gray-700">
                              ${position.current.toLocaleString()}
                            </div>
                          </div>
                          <div>
                            <span className="text-gray-500 block mb-0.5">Total Profit</span>
                            <div
                              className={`font-semibold ${position.pnl >= 0 ? 'text-green-600' : 'text-red-600'}`}
                            >
                              {position.pnl >= 0 ? '+' : ''}
                              {position.pnl}%
                            </div>
                          </div>
                          <div>
                            <span className="text-gray-500 block mb-0.5">Trading Sect</span>
                            <div className="flex items-center text-gray-700">
                              <SectIcon className="h-3.5 w-3.5 mr-1 text-blue-500" />
                              {position.sect}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PositionManagementModal;
