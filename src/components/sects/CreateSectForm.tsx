// src/components/sects/CreateSectForm.tsx
'use client';

import React, { useState } from 'react';
import { X, UserPlus, Trash2, Crown, Users, Wallet, Copy, Check } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { CreateSectFormProps } from './types';
import { ChainId, getChainById, SUPPORTED_CHAINS } from '@/utils/chains';

interface FormData {
  name: string;
  description: string;
  managers: string[];
  callers: string[];
  fee: string;
  chainId: ChainId; // Add this
  tokenSymbol: string; // Add this to show the correct fee token
}

export const CreateSectForm: React.FC<CreateSectFormProps> = ({ onClose }) => {
  const [showSuccess, setShowSuccess] = useState(false);
  const [copied, setCopied] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    name: '',
    description: '',
    managers: [''],
    callers: [''],
    fee: '',
    chainId: 'base', // Default to base
    tokenSymbol: 'ETH',
  });

  const updateChain = (chainId: ChainId) => {
    const chain = getChainById(chainId);
    setFormData((prev) => ({
      ...prev,
      chainId,
      tokenSymbol: chain?.nativeCurrency.symbol || 'ETH',
    }));
  };

  const handleAddField = (field: 'managers' | 'callers') => {
    setFormData((prev) => ({
      ...prev,
      [field]: [...prev[field], ''],
    }));
  };

  const handleRemoveField = (field: 'managers' | 'callers', index: number) => {
    setFormData((prev) => ({
      ...prev,
      [field]: prev[field].filter((_, i) => i !== index),
    }));
  };

  const handleFieldChange = (field: 'managers' | 'callers', index: number, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: prev[field].map((item, i) => (i === index ? value : item)),
    }));
  };

  const getInviteLink = () => {
    const baseUrl = window.location.origin;
    const sectInfo = {
      name: formData.name,
      fee: formData.fee,
      id: Date.now().toString(),
    };

    // Direct base64 encoding without any additional URL encoding
    const token = btoa(JSON.stringify(sectInfo));

    // Remove any padding characters from base64
    const cleanToken = token.replace(/=/g, '');

    return `${baseUrl}/sects/join/${cleanToken}`;
  };

  const copyInviteLink = async () => {
    try {
      await navigator.clipboard.writeText(getInviteLink());
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would validate and submit the form
    // For demo, we'll just show success
    setShowSuccess(true);
  };

  if (showSuccess) {
    return (
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
        <div className="bg-white rounded-lg p-4 w-full max-w-md shadow-xl transform transition-all">
          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center space-x-2">
              <div className="bg-green-100 p-1.5 rounded-full">
                <Crown className="h-4 w-4 text-green-600" />
              </div>
              <h2 className="text-lg font-bold">Sect Created!</h2>
            </div>
            <button
              onClick={onClose}
              className="hover:bg-gray-100 p-1.5 rounded-full transition-colors"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          <div className="space-y-4">
            <div className="bg-green-50 border border-green-100 rounded-lg p-3">
              <div className="flex items-center space-x-2 mb-2">
                <Users className="h-4 w-4 text-green-600" />
                <h3 className="font-medium text-green-800">Sect Details</h3>
              </div>
              <div className="space-y-2">
                <div>
                  <label className="text-xs text-gray-500">Name</label>
                  <p className="font-medium text-sm">{formData.name}</p>
                </div>
                <div>
                  <label className="text-xs text-gray-500">Description</label>
                  <p className="text-xs text-gray-700">{formData.description}</p>
                </div>
              </div>
            </div>

            <div>
              <h4 className="text-sm font-medium mb-1.5">Community Managers</h4>
              <div className="space-y-1.5">
                {formData.managers.map((manager, i) => (
                  <div
                    key={i}
                    className="text-xs font-mono bg-blue-50 text-blue-700 px-2 py-1 rounded"
                  >
                    {manager || 'No address provided'}
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h4 className="text-sm font-medium mb-1.5">Signal Callers</h4>
              <div className="space-y-1.5">
                {formData.callers.map((caller, i) => (
                  <div
                    key={i}
                    className="text-xs font-mono bg-purple-50 text-purple-700 px-2 py-1 rounded"
                  >
                    {caller || 'No address provided'}
                  </div>
                ))}
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between p-2 bg-gray-50 rounded">
                <div className="flex items-center space-x-2">
                  <Wallet className="h-4 w-4 text-gray-600" />
                  <span className="text-sm font-medium">Membership Fee</span>
                </div>
                <span className="font-mono text-sm">{formData.fee} ETH</span>
              </div>
            </div>

            <div className="border-t border-b py-3">
              <label className="block text-xs text-gray-500 mb-1.5">Invite Link</label>
              <div className="flex items-center space-x-1.5">
                <input
                  type="text"
                  readOnly
                  value={getInviteLink()}
                  className="flex-1 text-xs p-2 bg-gray-50 border rounded font-mono overflow-x-auto"
                />
                <Button
                  onClick={copyInviteLink}
                  className="h-8 px-3 min-w-[60px] flex items-center justify-center gap-1"
                >
                  {copied ? (
                    <>
                      <Check className="h-3 w-3" />
                      <span>Copied</span>
                    </>
                  ) : (
                    <>
                      <Copy className="h-3 w-3" />
                      <span>Copy</span>
                    </>
                  )}
                </Button>
              </div>
              <p className="text-xs text-gray-500 mt-1.5">
                Share this link with users to join your sect
              </p>
            </div>

            <Button
              fullWidth
              onClick={onClose}
              className="h-8 text-sm bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 flex items-center justify-center"
            >
              Continue to Sect
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg p-4 w-full max-w-md shadow-xl">
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center space-x-2">
            <div className="bg-blue-100 p-1.5 rounded-full">
              <Crown className="h-4 w-4 text-blue-600" />
            </div>
            <h2 className="text-lg font-bold">Create New Sect</h2>
          </div>
          <button
            onClick={onClose}
            className="hover:bg-gray-100 p-1.5 rounded-full transition-colors"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="block text-xs font-medium mb-1">Sect Name</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
              className="w-full p-2 text-sm border rounded focus:ring-1 focus:ring-blue-500 focus:border-blue-500 outline-none"
              placeholder="Enter sect name..."
            />
          </div>

          <div>
            <label className="block text-xs font-medium mb-1">Description</label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData((prev) => ({ ...prev, description: e.target.value }))}
              className="w-full p-2 text-sm border rounded focus:ring-1 focus:ring-blue-500 focus:border-blue-500 outline-none"
              placeholder="Describe your sect..."
              rows={2}
            />
          </div>

          <div>
            <label className="block text-xs font-medium mb-1">Community Managers</label>
            <div className="space-y-2">
              {formData.managers.map((manager, index) => (
                <div key={index} className="flex space-x-1">
                  <input
                    type="text"
                    value={manager}
                    onChange={(e) => handleFieldChange('managers', index, e.target.value)}
                    placeholder="Wallet Address"
                    className="flex-1 p-2 text-sm border rounded focus:ring-1 focus:ring-blue-500 focus:border-blue-500 outline-none font-mono"
                  />
                  {index > 0 && (
                    <button
                      type="button"
                      onClick={() => handleRemoveField('managers', index)}
                      className="p-2 text-red-500 hover:bg-red-50 rounded transition-colors"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  )}
                </div>
              ))}
              <Button
                type="button"
                onClick={() => handleAddField('managers')}
                className="w-full h-8 text-xs bg-blue-50 text-blue-600 hover:bg-blue-100 flex items-center justify-center gap-1"
              >
                <UserPlus className="h-3 w-3" />
                Add Manager
              </Button>
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium mb-1">Signal Callers</label>
            <div className="space-y-2">
              {formData.callers.map((caller, index) => (
                <div key={index} className="flex space-x-1">
                  <input
                    type="text"
                    value={caller}
                    onChange={(e) => handleFieldChange('callers', index, e.target.value)}
                    placeholder="Wallet Address"
                    className="flex-1 p-2 text-sm border rounded focus:ring-1 focus:ring-blue-500 focus:border-blue-500 outline-none font-mono"
                  />
                  {index > 0 && (
                    <button
                      type="button"
                      onClick={() => handleRemoveField('callers', index)}
                      className="p-2 text-red-500 hover:bg-red-50 rounded transition-colors"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  )}
                </div>
              ))}
              <Button
                type="button"
                onClick={() => handleAddField('callers')}
                className="w-full h-8 text-xs bg-blue-50 text-blue-600 hover:bg-blue-100 flex items-center justify-center gap-1"
              >
                <UserPlus className="h-3 w-3" />
                Add Caller
              </Button>
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium mb-1">Blockchain</label>
            <div className="grid grid-cols-3 gap-2">
              {Object.entries(SUPPORTED_CHAINS).map(([id, chain]) => (
                <button
                  key={id}
                  type="button"
                  onClick={() => updateChain(id as ChainId)}
                  className={`p-2 rounded-lg border flex items-center justify-center space-x-2 transition-colors ${
                    formData.chainId === id
                      ? 'border-blue-500 bg-blue-50 text-blue-700'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <span className="text-sm font-medium">{chain.name}</span>
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium mb-1">Premium Membership Fee</label>
            <div className="flex items-center space-x-2">
              <input
                type="number"
                value={formData.fee}
                onChange={(e) => setFormData((prev) => ({ ...prev, fee: e.target.value }))}
                step="0.001"
                min="0"
                className="flex-1 p-2 text-sm border rounded focus:ring-1 focus:ring-blue-500 focus:border-blue-500 outline-none"
              />
              <span className="text-gray-500 text-sm font-medium">ETH</span>
            </div>
          </div>

          <div className="pt-2">
            <Button
              type="submit"
              fullWidth
              className="h-8 text-sm bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 flex items-center justify-center"
            >
              Create Sect
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};
