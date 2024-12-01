'use client';

import React, { useState } from 'react';
import { X, TrendingUp, PlusCircle, MinusCircle } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Sect } from '@/components/sects/types';
import { getChainById } from '@/utils/chains';

interface CreateSignalModalProps {
  sect: Sect;
  onClose: () => void;
}

export const CreateSignalModal = ({ sect, onClose }: CreateSignalModalProps) => {
  const [loading, setLoading] = useState(false);
  const [pair, setPair] = useState('');
  const [entry, setEntry] = useState('');
  const [stopLoss, setStopLoss] = useState('');
  const [targets, setTargets] = useState(['']);
  const [notes, setNotes] = useState('');

  const handleAddTarget = () => {
    setTargets((prev) => [...prev, '']);
  };

  const handleRemoveTarget = (index: number) => {
    setTargets((prev) => prev.filter((_, i) => i !== index));
  };

  const handleCreateSignal = async () => {
    setLoading(true);
    try {
      // API call would go here
      await new Promise((resolve) => setTimeout(resolve, 1500));
      onClose();
    } catch (error) {
      console.error('Signal creation failed:', error);
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
              <TrendingUp className="h-5 w-5 text-blue-500" />
              <h2 className="text-lg font-bold">Create Signal</h2>
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
                <span className="text-gray-600">Sect</span>
                <span className="font-medium">{sect.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Chain</span>
                <span className="font-medium">{getChainById(sect.chainId)?.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Members</span>
                <span className="font-medium">{sect.members}</span>
              </div>
            </div>

            {/* Trading Pair */}
            <div>
              <label className="block text-sm font-medium mb-1">Trading Pair</label>
              <input
                type="text"
                value={pair}
                onChange={(e) => setPair(e.target.value)}
                className="w-full p-2 text-sm border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                placeholder="BTC/USDT"
              />
            </div>

            {/* Entry Price */}
            <div>
              <label className="block text-sm font-medium mb-1">Entry Price</label>
              <input
                type="text"
                value={entry}
                onChange={(e) => setEntry(e.target.value)}
                className="w-full p-2 text-sm border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                placeholder="43,500"
              />
            </div>

            {/* Stop Loss */}
            <div>
              <label className="block text-sm font-medium mb-1">Stop Loss</label>
              <input
                type="text"
                value={stopLoss}
                onChange={(e) => setStopLoss(e.target.value)}
                className="w-full p-2 text-sm border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                placeholder="42,800"
              />
            </div>

            {/* Targets */}
            <div>
              <label className="block text-sm font-medium mb-1">Targets</label>
              <div className="space-y-2">
                {targets.map((target, index) => (
                  <div key={index} className="flex space-x-2">
                    <input
                      type="text"
                      value={target}
                      onChange={(e) => {
                        const newTargets = [...targets];
                        newTargets[index] = e.target.value;
                        setTargets(newTargets);
                      }}
                      className="flex-1 p-2 text-sm border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                      placeholder={`Target ${index + 1}`}
                    />
                    {targets.length > 1 && (
                      <button
                        onClick={() => handleRemoveTarget(index)}
                        className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                      >
                        <MinusCircle className="h-4 w-4" />
                      </button>
                    )}
                  </div>
                ))}
                <Button
                  onClick={handleAddTarget}
                  className="w-full h-8 text-xs bg-blue-50 text-blue-600 hover:bg-blue-100 flex items-center justify-center gap-1"
                >
                  <PlusCircle className="h-3 w-3" />
                  Add Target
                </Button>
              </div>
            </div>

            {/* Notes */}
            <div>
              <label className="block text-sm font-medium mb-1">Analysis & Notes</label>
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="w-full p-2 text-sm border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                rows={3}
                placeholder="Share your analysis and trading setup..."
              />
            </div>
          </div>

          <div className="p-4 border-t">
            <Button
              onClick={handleCreateSignal}
              disabled={loading}
              className="w-full h-10 bg-gradient-to-r from-blue-500 to-blue-600"
            >
              {loading ? 'Creating Signal...' : 'Create Signal'}
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};
