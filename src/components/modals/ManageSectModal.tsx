'use client';

import React, { useState } from 'react';
import { X, Trash2, Shield, Crown, PhoneCall, Wallet } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Sect } from '@/components/sects/types';
import { getChainById } from '@/utils/chains';

interface ManageSectModalProps {
  sect: Sect;
  onClose: () => void;
}

export const ManageSectModal = ({ sect, onClose }: ManageSectModalProps) => {
  const [loading, setLoading] = useState(false);
  const [fee, setFee] = useState('0');
  const [managers, setManagers] = useState<string[]>(sect.communityManagers || []);
  const [callers, setCallers] = useState<string[]>(sect.callers || []);

  const handleRemoveManager = (index: number) => {
    setManagers((prev) => prev.filter((_, i) => i !== index));
  };

  const handleRemoveCaller = (index: number) => {
    setCallers((prev) => prev.filter((_, i) => i !== index));
  };

  const handleAddManager = () => {
    setManagers((prev) => [...prev, '']);
  };

  const handleAddCaller = () => {
    setCallers((prev) => [...prev, '']);
  };

  const handleUpdateSect = async () => {
    setLoading(true);
    try {
      // API call would go here
      await new Promise((resolve) => setTimeout(resolve, 1500));
      onClose();
    } catch (error) {
      console.error('Update failed:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40" />
      <div className="fixed inset-0 flex items-center justify-center p-4 z-50">
        <div className="bg-white rounded-xl w-full max-w-md shadow-xl">
          <div className="flex justify-between items-center p-4 border-b">
            <div className="flex items-center space-x-2">
              <Crown className="h-5 w-5 text-yellow-500" />
              <h2 className="text-lg font-bold">Manage {sect.name}</h2>
            </div>
            <button
              onClick={onClose}
              className="hover:bg-gray-100 p-1.5 rounded-full transition-colors"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          <div className="p-4 space-y-4">
            {/* Sect Metadata */}
            <div className="bg-gray-50 rounded-lg p-3 space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Chain</span>
                <span className="font-medium">{getChainById(sect.chainId)?.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Members</span>
                <span className="font-medium">{sect.members}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Premium Members</span>
                <span className="font-medium">{sect.premiumMembers}</span>
              </div>
            </div>

            {/* Membership Fee */}
            <div>
              <label className="block text-sm font-medium mb-1">Membership Fee</label>
              <div className="flex items-center space-x-2">
                <div className="relative flex-1">
                  <input
                    type="number"
                    value={fee}
                    onChange={(e) => setFee(e.target.value)}
                    className="w-full p-2 text-sm border rounded-lg pr-16 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                    step="0.001"
                    min="0"
                  />
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">
                    ETH
                  </span>
                </div>
              </div>
            </div>

            {/* Community Managers */}
            <div>
              <label className="block text-sm font-medium mb-1">Community Managers</label>
              <div className="space-y-2">
                {managers.map((manager, index) => (
                  <div key={index} className="flex space-x-2">
                    <input
                      type="text"
                      value={manager}
                      onChange={(e) => {
                        const newManagers = [...managers];
                        newManagers[index] = e.target.value;
                        setManagers(newManagers);
                      }}
                      className="flex-1 p-2 text-sm border rounded-lg font-mono focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                      placeholder="0x..."
                    />
                    <button
                      onClick={() => handleRemoveManager(index)}
                      className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                ))}
                <Button
                  onClick={handleAddManager}
                  className="w-full h-8 text-xs bg-blue-50 text-blue-600 hover:bg-blue-100"
                >
                  Add Manager
                </Button>
              </div>
            </div>

            {/* Signal Callers */}
            <div>
              <label className="block text-sm font-medium mb-1">Signal Callers</label>
              <div className="space-y-2">
                {callers.map((caller, index) => (
                  <div key={index} className="flex space-x-2">
                    <input
                      type="text"
                      value={caller}
                      onChange={(e) => {
                        const newCallers = [...callers];
                        newCallers[index] = e.target.value;
                        setCallers(newCallers);
                      }}
                      className="flex-1 p-2 text-sm border rounded-lg font-mono focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                      placeholder="0x..."
                    />
                    <button
                      onClick={() => handleRemoveCaller(index)}
                      className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                ))}
                <Button
                  onClick={handleAddCaller}
                  className="w-full h-8 text-xs bg-blue-50 text-blue-600 hover:bg-blue-100"
                >
                  Add Caller
                </Button>
              </div>
            </div>
          </div>

          <div className="p-4 border-t">
            <Button
              onClick={handleUpdateSect}
              disabled={loading}
              className="w-full h-10 bg-gradient-to-r from-blue-500 to-blue-600"
            >
              {loading ? 'Updating...' : 'Update Sect'}
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};
