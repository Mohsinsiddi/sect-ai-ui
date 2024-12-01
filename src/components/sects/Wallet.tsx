'use client';

import React, { useState } from 'react';
import { Wallet } from 'lucide-react';

export const WalletConnectButton = () => {
  const [isConnected, setIsConnected] = useState(false);

  const handleConnect = () => {
    // Placeholder connection logic
    console.log('Wallet connect clicked');
    setIsConnected(!isConnected);
  };

  return (
    <button
      onClick={handleConnect}
      className="bg-blue-500 text-white px-4 py-2 rounded-lg 
      flex items-center space-x-2 hover:bg-blue-600 
      transition-colors group"
    >
      <Wallet className="h-5 w-5 group-hover:rotate-12 transition-transform" />
      <span>{isConnected ? 'Disconnect' : 'Connect Wallet'}</span>
    </button>
  );
};
