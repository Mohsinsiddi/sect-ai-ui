'use client';

import React, { useState } from 'react';
import { 
  Wallet, 
  CreditCard, 
  Key, 
  Copy, 
  Plus, 
  X, 
  ShieldCheck,
  Lock,
  Unlock,
  RefreshCcw,
  ArrowDownCircle,
  ExternalLink,
  Eye,
  EyeOff
} from 'lucide-react';

// Types
interface Chain {
  name: string;
  id: string;
  color: string;
  gradientFrom: string;
  gradientTo: string;
  icon: React.ReactNode;
}

interface WalletData {
  chain: string;
  address: string;
  balance: string;
  encryptedPrivateKey: string;
}

interface WalletManagementModalProps {
  onClose: () => void;
  onWalletCreate?: (wallet: WalletData) => void;
  onWalletUpdate?: (wallet: WalletData) => void;
  initialWallets?: WalletData[];
  className?: string;
}

interface PrivateKeyVisibility {
  [key: string]: boolean;
}

// Utility functions
const generateWallet = (chain: string): { 
  address: string; 
  privateKey: string; 
  balance: string; 
} => ({
  address: `0x${Math.random().toString(36).substring(2, 15)}`,
  privateKey: `0x${Math.random().toString(36).substring(2, 36)}`,
  balance: (Math.random() * 10).toFixed(4)
});

const encryptPrivateKey = (privateKey: string): string => btoa(privateKey);
const decryptPrivateKey = (encrypted: string): string => atob(encrypted);

export const WalletManagementModal: React.FC<WalletManagementModalProps> = ({ 
  onClose,
  onWalletCreate,
  onWalletUpdate,
  initialWallets = [],
  className = ''
}) => {
  // State
  const [wallets, setWallets] = useState<WalletData[]>(initialWallets);
  const [selectedChain, setSelectedChain] = useState<string | null>(null);
  const [activeWallet, setActiveWallet] = useState<WalletData | null>(null);
  const [showDeposit, setShowDeposit] = useState<boolean>(false);
  const [depositAmount, setDepositAmount] = useState<string>('');
  const [showPrivateKey, setShowPrivateKey] = useState<PrivateKeyVisibility>({});
  const [copySuccess, setCopySuccess] = useState<string>('');

  // Chain configurations
  const chains: Chain[] = [
    { 
      name: 'Ethereum', 
      id: 'ethereum', 
      color: 'bg-blue-100 text-blue-600',
      gradientFrom: 'from-blue-500',
      gradientTo: 'to-blue-600',
      icon: <img src="/api/placeholder/20/20" className="h-5 w-5 rounded-full" alt="ETH" />
    },
    { 
      name: 'Sui', 
      id: 'sui', 
      color: 'bg-purple-100 text-purple-600',
      gradientFrom: 'from-purple-500',
      gradientTo: 'to-purple-600',
      icon: <img src="/api/placeholder/20/20" className="h-5 w-5 rounded-full" alt="SUI" />
    },
    { 
      name: 'Aptos', 
      id: 'aptos', 
      color: 'bg-pink-100 text-pink-600',
      gradientFrom: 'from-pink-500',
      gradientTo: 'to-pink-600',
      icon: <img src="/api/placeholder/20/20" className="h-5 w-5 rounded-full" alt="APT" />
    }
  ];

  // Handlers
  const createInAppWallet = (chain: string): void => {
    const newWallet = generateWallet(chain);
    const walletToSave: WalletData = {
      chain,
      address: newWallet.address,
      balance: newWallet.balance,
      encryptedPrivateKey: encryptPrivateKey(newWallet.privateKey)
    };
    
    setWallets(prev => [...prev, walletToSave]);
    setSelectedChain(null);
    onWalletCreate?.(walletToSave);
  };

  const handleDeposit = (wallet: WalletData): void => {
    if (!depositAmount || isNaN(parseFloat(depositAmount))) return;
    
    const updatedWallets = wallets.map(w => {
      if (w.address === wallet.address) {
        const updatedWallet = {
          ...w,
          balance: (parseFloat(w.balance) + parseFloat(depositAmount)).toFixed(4)
        };
        onWalletUpdate?.(updatedWallet);
        return updatedWallet;
      }
      return w;
    });
    
    setWallets(updatedWallets);
    setDepositAmount('');
    setShowDeposit(false);
  };

  const handleCopy = async (text: string, type: string): Promise<void> => {
    try {
      await navigator.clipboard.writeText(text);
      setCopySuccess(`${type} copied!`);
      setTimeout(() => setCopySuccess(''), 2000);
    } catch (err) {
      setCopySuccess('Failed to copy');
      setTimeout(() => setCopySuccess(''), 2000);
    }
  };

  const togglePrivateKey = (address: string): void => {
    setShowPrivateKey(prev => ({
      ...prev,
      [address]: !prev[address]
    }));
  };

  // Component render
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div 
        className="fixed inset-0 bg-black/50 backdrop-blur-sm" 
        onClick={onClose}
      />
      
      <div className={`bg-white rounded-2xl w-full max-w-2xl shadow-2xl relative z-10 ${className}`}>
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white p-6">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-3">
              <Wallet className="h-7 w-7" />
              <div>
                <h2 className="text-xl font-bold">Wallet Management</h2>
                <p className="text-sm text-blue-100">Manage your crypto assets securely</p>
              </div>
            </div>
            <button 
              onClick={onClose} 
              className="hover:bg-white/20 p-2 rounded-full transition-colors"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Create Wallet Section */}
          <div className="bg-gray-50 rounded-xl p-4 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <ShieldCheck className="h-5 w-5 text-blue-500" />
                <span className="font-semibold text-gray-700">Create New Wallet</span>
              </div>
              {selectedChain && (
                <button 
                  onClick={() => setSelectedChain(null)}
                  className="text-sm text-blue-500 hover:underline"
                >
                  Cancel
                </button>
              )}
            </div>

            {!selectedChain ? (
              <div className="grid grid-cols-3 gap-3">
                {chains.map((chain) => (
                  <button
                    key={chain.id}
                    onClick={() => setSelectedChain(chain.id)}
                    className={`
                      flex flex-col items-center justify-center p-4 rounded-xl
                      bg-gradient-to-br ${chain.gradientFrom} ${chain.gradientTo}
                      text-white hover:opacity-90 transition-all duration-200
                    `}
                  >
                    <span className="text-md font-medium mt-2">{chain.name}</span>
                  </button>
                ))}
              </div>
            ) : (
              <div className="space-y-3">
                <div className="bg-blue-50 text-blue-700 p-4 rounded-lg text-sm">
                  Creating a new {chains.find(c => c.id === selectedChain)?.name} wallet. 
                  Make sure to backup your private key!
                </div>
                <button
                  onClick={() => createInAppWallet(selectedChain)}
                  className="w-full bg-blue-500 text-white py-3 rounded-xl hover:bg-blue-600 
                            transition-colors"
                >
                  Create Wallet
                </button>
              </div>
            )}
          </div>

          {/* Wallets List */}
          {wallets.length > 0 && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-800">Your Wallets</h3>
              <div className="grid gap-4">
                {wallets.map((wallet, index) => {
                  const chain = chains.find(c => c.id === wallet.chain);
                  return (
                    <div 
                      key={index} 
                      className={`
                        bg-gradient-to-r ${chain?.gradientFrom} ${chain?.gradientTo}
                        rounded-xl p-6 text-white
                      `}
                    >
                      <div className="flex justify-between items-start">
                        <div className="space-y-2">
                          <div className="flex items-center space-x-2">
                            <span className="font-bold">{chain?.name} Wallet</span>
                          </div>
                          <div className="space-y-1">
                            <div className="flex items-center space-x-2">
                              <span className="text-sm font-mono bg-white/20 px-2 py-1 rounded">
                                {`${wallet.address.slice(0, 6)}...${wallet.address.slice(-4)}`}
                              </span>
                              <button 
                                onClick={() => handleCopy(wallet.address, 'Address')}
                                className="hover:bg-white/20 p-1 rounded-full"
                              >
                                <Copy className="h-4 w-4" />
                              </button>
                            </div>
                            <div className="text-2xl font-bold">
                              {wallet.balance} {chain?.name}
                            </div>
                          </div>
                        </div>
                        
                        <div className="flex space-x-2">
                          <button 
                            onClick={() => {
                              setActiveWallet(wallet);
                              setShowDeposit(true);
                            }}
                            className="bg-white/20 hover:bg-white/30 px-4 py-2 rounded-lg 
                                     flex items-center space-x-2 transition-colors"
                          >
                            <ArrowDownCircle className="h-4 w-4" />
                            <span>Deposit</span>
                          </button>
                          <button 
                            onClick={() => togglePrivateKey(wallet.address)}
                            className="bg-white/20 hover:bg-white/30 px-4 py-2 rounded-lg 
                                     flex items-center space-x-2 transition-colors"
                          >
                            {showPrivateKey[wallet.address] ? 
                              <Eye className="h-4 w-4" /> : 
                              <EyeOff className="h-4 w-4" />
                            }
                            <span>Private Key</span>
                          </button>
                        </div>
                      </div>
                      
                      {showPrivateKey[wallet.address] && (
                        <div className="mt-4 p-4 bg-white/10 rounded-lg">
                          <div className="flex items-center justify-between">
                            <span className="font-mono text-sm">
                              {decryptPrivateKey(wallet.encryptedPrivateKey)}
                            </span>
                            <button 
                              onClick={() => handleCopy(
                                decryptPrivateKey(wallet.encryptedPrivateKey), 
                                'Private key'
                              )}
                              className="hover:bg-white/20 p-2 rounded-full"
                            >
                              <Copy className="h-4 w-4" />
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Copy Success Message */}
          {copySuccess && (
            <div className="fixed bottom-4 right-4 bg-black text-white px-4 py-2 rounded-lg">
              {copySuccess}
            </div>
          )}
        </div>

        {/* Deposit Modal */}
        {showDeposit && activeWallet && (
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center p-6">
            <div className="bg-white rounded-xl p-6 w-full max-w-md">
              <h3 className="text-xl font-bold mb-4">Deposit Funds</h3>
              <div className="space-y-4">
                <div>
                  <label className="text-sm text-gray-600">Amount</label>
                  <input
                    type="number"
                    value={depositAmount}
                    onChange={(e) => setDepositAmount(e.target.value)}
                    className="w-full mt-1 p-2 border rounded-lg"
                    placeholder="Enter amount..."
                  />
                </div>
                <div className="flex space-x-3">
                  <button
                    onClick={() => handleDeposit(activeWallet)}
                    className="flex-1 bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600"
                  >
                    Confirm
                  </button>
                  <button
                    onClick={() => {
                      setShowDeposit(false);
                      setDepositAmount('');
                    }}
                    className="flex-1 bg-gray-100 text-gray-700 py-2 rounded-lg hover:bg-gray-200"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default WalletManagementModal;