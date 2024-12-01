'use client';

import React, { useState, useEffect } from 'react';
import {
  Users,
  Crown,
  Shield,
  Star,
  Settings,
  ChevronRight,
  Plus,
  Zap,
  Compass,
  Lock,
  Unlock,
  PhoneCall,
  TrendingUp,
} from 'lucide-react';
import { CreateSectForm } from './CreateSectForm';
import { UserSettings } from './UserSettings';
import { Button } from '@/components/ui/Button';
import { DashboardViewProps, Sect, SectRole } from './types';
import { mockSects } from '@/utils/mockData';
import { CreateSectButton } from '../ui/CreateSectButton';
import { getChainById, getExplorerTxUrl } from '@/utils/chains';
import { ManageSectModal } from '@/components/modals/ManageSectModal';
import { CreateSignalModal } from '@/components/modals/CreateSignalModal';
import { WalletManagementModal } from '../modals/WalletManagementModal';

export const DashboardView: React.FC<DashboardViewProps> = ({ onSectSelect }) => {
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [activeTab, setActiveTab] = useState<'all' | SectRole>('all');
  const [filteredSects, setFilteredSects] = useState(mockSects);

  const [showManageModal, setShowManageModal] = useState(false);
  const [showSignalModal, setShowSignalModal] = useState(false);
  const [selectedSect, setSelectedSect] = useState<Sect | null>(null);

  const [showWalletManagement, setShowWalletManagement] = useState(false);


  // Debugging useEffect
  useEffect(() => {
    const newFilteredSects = mockSects.filter((sect) => {
      if (activeTab === 'all') return true;
      // For other roles, match the role directly
      return sect.role === activeTab;
    });

    console.log('Filtered Sects:', newFilteredSects);
    setFilteredSects(newFilteredSects);
  }, [activeTab]);

  const getRoleIcon = (role: SectRole) => {
    console.log('Current Role:', role);
    switch (role) {
      case 'creator':
        return <Crown className="h-5 w-5 text-yellow-500 mr-1" />;
      case 'premium':
        return <Star className="h-5 w-5 text-purple-500 mr-1" />;
      case 'member':
        return <Shield className="h-5 w-5 text-blue-500 mr-1" />;
      case 'caller':
        return <PhoneCall className="h-5 w-5 text-green-500 mr-1" />;
      default:
        return <Shield className="h-5 w-5 text-gray-500 mr-1" />;
    }
  };

  const getPerformanceColor = (profit: string) => {
    const value = parseFloat(profit);
    return value > 30 ? 'text-green-600' : value > 10 ? 'text-green-500' : 'text-gray-600';
  };

  return (
    <div className="flex flex-col h-full bg-gray-50">
      <div className="flex justify-between items-center p-6 bg-white shadow-sm">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Your Sects</h2>
          <p className="text-sm text-gray-500">
            Discover, join, and manage your trading communities
          </p>
        </div>
        <CreateSectButton onClick={() => setShowCreateForm(true)} />
      </div>

      {/* Tab Navigation */}
      <div className="px-6 pt-4 bg-gray-50">
        <div className="flex space-x-2 bg-gray-100 p-1 rounded-full">
          {['all', 'creator', 'premium', 'member', 'caller'].map((tab) => (
            <button
              key={tab}
              className={`flex-1 py-2 text-sm font-medium rounded-full transition-all duration-300 ${
                activeTab === tab
                  ? 'bg-white shadow-md text-gray-800'
                  : 'text-gray-600 hover:bg-gray-200'
              }`}
              onClick={() => setActiveTab(tab as SectRole)}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)} Sects
            </button>
          ))}
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-6 space-y-6">
        {filteredSects.length > 0 ? (
          filteredSects.map((sect) => (
            <div
              key={sect.id}
              className={`
                bg-white rounded-2xl shadow-lg border border-gray-100 
                transform transition-all duration-300 hover:scale-[1.02] 
                hover:shadow-xl ${!sect.active ? 'opacity-60' : ''}
              `}
            >
              <div className="p-5">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <div className="flex items-center space-x-2">
                      {getRoleIcon(sect.role)}
                      <h3 className="text-xl font-bold text-gray-800">{sect.name}</h3>
                      {/* Add chain badge */}
                      <div className="px-2 py-0.5 bg-gray-100 rounded-full text-xs font-medium">
                        {getChainById(sect.chainId)?.name || 'Unknown Chain'}
                      </div>
                    </div>
                    {/* Add contract address and explorer link */}
                    <div className="flex items-center mt-1 text-xs text-gray-500">
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
                    <p className="text-sm text-gray-500 mt-1">{sect.description}</p>
                  </div>
                  <div className="flex space-x-2">
                    {sect.role === 'premium' && (
                      <button
                        onClick={() => setShowSettings(true)}
                        className="p-2 hover:bg-gray-100 rounded-lg"
                      >
                        <Settings className="h-5 w-5 text-gray-600" />
                      </button>
                    )}
                    {sect.role === 'creator' && (
                      <button
                        onClick={() => {
                          setSelectedSect(sect);
                          setShowManageModal(true);
                        }}
                        className="p-2 hover:bg-blue-50 text-blue-600 rounded-lg transition-colors"
                      >
                        <Crown className="h-5 w-5" />
                      </button>
                    )}
                    {sect.role === 'caller' && (
                      <button
                        onClick={() => {
                          setSelectedSect(sect);
                          setShowSignalModal(true);
                        }}
                        className="p-2 hover:bg-green-50 text-green-600 rounded-lg transition-colors"
                      >
                        <TrendingUp className="h-5 w-5" />
                      </button>
                    )}
                    <button
                      onClick={() => onSectSelect(sect)}
                      className="p-2 hover:bg-gray-100 rounded-lg"
                    >
                      <ChevronRight className="h-5 w-5 text-gray-600" />
                    </button>
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-4 text-sm text-gray-600 border-t pt-4">
                  <div className="flex items-center">
                    <Users className="h-4 w-4 mr-2 text-indigo-500" />
                    <span>{sect.members} Members</span>
                  </div>
                  <div className="flex items-center">
                    <Star className="h-4 w-4 mr-2 text-purple-500" />
                    <span>{sect.premiumMembers} Premium</span>
                  </div>
                  <div className="flex items-center">
                    <Zap
                      className={`h-4 w-4 mr-2 ${getPerformanceColor(sect.performance?.totalProfit || '+0%')}`}
                    />
                    <span className={getPerformanceColor(sect.performance?.totalProfit || '+0%')}>
                      {sect.performance?.totalProfit || '+0%'} Total Profit
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-10 text-gray-500">No sects found in this category</div>
        )}
      </div>

      {showCreateForm && <CreateSectForm onClose={() => setShowCreateForm(false)} />}
      {showSettings && <UserSettings onClose={() => setShowSettings(false)} />}
      {showManageModal && selectedSect && (
        <ManageSectModal
          sect={selectedSect}
          onClose={() => {
            setShowManageModal(false);
            setSelectedSect(null);
          }}
        />
      )}

      {showSignalModal && selectedSect && (
        <CreateSignalModal
          sect={selectedSect}
          onClose={() => {
            setShowSignalModal(false);
            setSelectedSect(null);
          }}
        />
      )}
      {showWalletManagement && (
  <WalletManagementModal onClose={() => setShowWalletManagement(false)} />
)}
    </div>
  );
};
