// src/components/sects/CreateSuccessModal.tsx
'use client';

import { X, Copy, Check } from 'lucide-react';
import { useState } from 'react';
import { Button } from '@/components/ui/Button';

interface CreateSuccessModalProps {
  sectData: {
    name: string;
    managers: string[];
    callers: string[];
    fee: string;
  };
  onClose: () => void;
}

export const CreateSuccessModal = ({ sectData, onClose }: CreateSuccessModalProps) => {
  const [copied, setCopied] = useState(false);
  const inviteLink = `${window.location.origin}/sects/join/${btoa(sectData.name)}`;

  const copyInviteLink = async () => {
    await navigator.clipboard.writeText(inviteLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl p-6 w-full max-w-lg">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold">Sect Created Successfully!</h2>
          <button onClick={onClose} className="hover:bg-gray-100 p-1 rounded-lg">
            <X className="h-6 w-6" />
          </button>
        </div>

        <div className="space-y-4">
          <div>
            <label className="text-sm text-gray-500">Sect Name</label>
            <p className="font-medium">{sectData.name}</p>
          </div>

          <div>
            <label className="text-sm text-gray-500">Community Managers</label>
            <div className="space-y-1">
              {sectData.managers.map((manager, i) => (
                <p key={i} className="font-mono text-sm">
                  {manager}
                </p>
              ))}
            </div>
          </div>

          <div>
            <label className="text-sm text-gray-500">Callers</label>
            <div className="space-y-1">
              {sectData.callers.map((caller, i) => (
                <p key={i} className="font-mono text-sm">
                  {caller}
                </p>
              ))}
            </div>
          </div>

          <div>
            <label className="text-sm text-gray-500">Premium Membership Fee</label>
            <p className="font-medium">{sectData.fee} ETH</p>
          </div>

          <div className="pt-4">
            <label className="text-sm text-gray-500 mb-2 block">Invite Link</label>
            <div className="flex items-center space-x-2">
              <input
                type="text"
                value={inviteLink}
                readOnly
                className="flex-1 p-2 bg-gray-50 border rounded-lg"
              />
              <Button onClick={copyInviteLink}>
                {copied ? <Check className="h-5 w-5" /> : <Copy className="h-5 w-5" />}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
