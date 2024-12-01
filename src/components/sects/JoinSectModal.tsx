// src/components/sects/JoinSectModal.tsx
'use client';

import { useState } from 'react';
import { X, Shield } from 'lucide-react';
import { Button } from '@/components/ui/Button';

interface JoinSectModalProps {
  sectName: string;
  fee: string;
  onJoin: () => void;
  onClose: () => void;
}

export const JoinSectModal = ({ sectName, fee, onJoin, onClose }: JoinSectModalProps) => {
  const [loading, setLoading] = useState(false);

  const handleJoin = async () => {
    setLoading(true);
    // Here you would implement the actual joining logic
    // For now we'll simulate a delay
    await new Promise((resolve) => setTimeout(resolve, 1500));
    onJoin();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl p-6 w-full max-w-lg">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold">Join {sectName}</h2>
          <button onClick={onClose} className="hover:bg-gray-100 p-1 rounded-lg">
            <X className="h-6 w-6" />
          </button>
        </div>

        <div className="space-y-6">
          <div className="bg-blue-50 p-4 rounded-lg flex items-start space-x-3">
            <Shield className="h-5 w-5 text-blue-500 mt-0.5" />
            <div>
              <h3 className="font-medium text-blue-900">Premium Membership</h3>
              <p className="text-sm text-blue-700 mt-1">
                Join this sect to access exclusive trading signals, analysis, and community
                features.
              </p>
            </div>
          </div>

          <div className="border-t border-b py-4">
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Membership Fee</span>
              <span className="font-medium">{fee} ETH</span>
            </div>
          </div>

          <Button fullWidth onClick={handleJoin} disabled={loading}>
            {loading ? 'Joining...' : 'Join Sect'}
          </Button>
        </div>
      </div>
    </div>
  );
};
