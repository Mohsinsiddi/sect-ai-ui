'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Rocket,
  Trophy,
  Users,
  Wallet,
  ArrowRight,
  ChevronRight,
  Zap,
  Shield,
  PiggyBank,
  TrendingUp,
} from 'lucide-react';

interface LeaderStats {
  sects: {
    name: string;
    profit: string;
    members: number;
    chain: string;
  }[];
  traders: {
    address: string;
    profit: string;
    trades: number;
    winRate: string;
  }[];
  newbies: {
    address: string;
    profit: string;
    joinedDays: number;
    favToken: string;
  }[];
}

const demoStats: LeaderStats = {
  sects: [
    { name: 'Alpha Hunters', profit: '+458%', members: 234, chain: 'Base' },
    { name: 'Degen Society', profit: '+312%', members: 156, chain: 'Aptos' },
    { name: 'Whale Watchers', profit: '+289%', members: 189, chain: 'Sui' },
  ],
  traders: [
    { address: '0x1234...5678', profit: '+892%', trades: 156, winRate: '89%' },
    { address: '0x8765...4321', profit: '+654%', trades: 234, winRate: '85%' },
    { address: '0x9876...5432', profit: '+543%', trades: 189, winRate: '82%' },
  ],
  newbies: [
    { address: '0x2345...6789', profit: '+234%', joinedDays: 15, favToken: 'PEPE' },
    { address: '0x3456...7890', profit: '+187%', joinedDays: 10, favToken: 'BONK' },
    { address: '0x4567...8901', profit: '+156%', joinedDays: 7, favToken: 'WIF' },
  ],
};

interface LandingModalProps {
  onClose: () => void;
}

const primaryButtonClass = `
  flex-1 px-6 py-2.5 bg-gradient-to-r from-blue-500 to-purple-500 
  text-white rounded-lg text-sm font-medium hover:opacity-90 
  transition-all duration-200 transform hover:scale-[1.02] 
  flex items-center justify-center min-w-[140px]
`;

const secondaryButtonClass = `
  flex-1 px-6 py-2.5 bg-gray-100 text-gray-700 
  rounded-lg text-sm font-medium hover:bg-gray-200 
  transition-all duration-200 transform hover:scale-[1.02]
  min-w-[140px]
`;

const LandingModal: React.FC<LandingModalProps> = ({ onClose }) => {
  const [step, setStep] = useState<'intro' | 'benefits' | 'stats'>('intro');

  // Add this to the final "Start Trading" button
  const handleComplete = () => {
    onClose();
    window.location.href = '/sects';
  };

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <motion.div
        className="bg-white rounded-2xl w-full max-w-4xl overflow-hidden shadow-xl"
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
      >
        <AnimatePresence mode="wait">
          {step === 'intro' && (
            <motion.div
              key="intro"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="p-8"
            >
              <div className="text-center mb-8">
                <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  Welcome to SectAI Trading
                </h1>
                <p className="text-gray-600 mt-2">
                  Join the future of social trading and profit from community wisdom
                </p>
              </div>

              <div className="grid md:grid-cols-3 gap-6 mb-8">
                <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-6 rounded-xl">
                  <Rocket className="h-8 w-8 text-blue-500 mb-4" />
                  <h3 className="font-bold text-lg mb-2">Zero Fees Start</h3>
                  <p className="text-gray-600 text-sm">
                    First 3 sects join for free. Start trading with zero fees.
                  </p>
                </div>

                <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-6 rounded-xl">
                  <Users className="h-8 w-8 text-purple-500 mb-4" />
                  <h3 className="font-bold text-lg mb-2">Community Power</h3>
                  <p className="text-gray-600 text-sm">
                    Learn from expert traders and grow together.
                  </p>
                </div>

                <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-6 rounded-xl">
                  <Trophy className="h-8 w-8 text-green-500 mb-4" />
                  <h3 className="font-bold text-lg mb-2">Proven Results</h3>
                  <p className="text-gray-600 text-sm">
                    Our top traders consistently beat the market.
                  </p>
                </div>
              </div>

              <button
                onClick={() => setStep('benefits')}
                className="w-full py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-xl font-medium hover:opacity-90 transition-opacity flex items-center justify-center"
              >
                Discover Benefits
                <ArrowRight className="ml-2 h-5 w-5" />
              </button>
            </motion.div>
          )}

          {step === 'benefits' && (
            <motion.div
              key="benefits"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="p-8"
            >
              {/* Benefits content */}
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-gray-800">Why Choose SectAI?</h2>
                <p className="text-gray-600">
                  Unlock premium trading features and community benefits
                </p>
              </div>

              <div className="space-y-6 mb-8">
                <div className="flex items-start space-x-4 p-4 bg-blue-50 rounded-xl">
                  <Shield className="h-6 w-6 text-blue-500 mt-1" />
                  <div>
                    <h3 className="font-bold text-lg">Early Adopter Benefits</h3>
                    <p className="text-gray-600">
                      First 1000 users get lifetime reduced fees and exclusive access to premium
                      features.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4 p-4 bg-purple-50 rounded-xl">
                  <Zap className="h-6 w-6 text-purple-500 mt-1" />
                  <div>
                    <h3 className="font-bold text-lg">Smart Copy Trading</h3>
                    <p className="text-gray-600">
                      Automatically copy successful traders with customizable risk settings.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4 p-4 bg-green-50 rounded-xl">
                  <PiggyBank className="h-6 w-6 text-green-500 mt-1" />
                  <div>
                    <h3 className="font-bold text-lg">Zero-Fee Period</h3>
                    <p className="text-gray-600">
                      First month of trading is completely free - no hidden charges!
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex space-x-4">
                <button
                  onClick={() => setStep('intro')}
                  className="flex-1 py-3 bg-gray-100 text-gray-700 rounded-xl font-medium hover:bg-gray-200 transition-colors"
                >
                  Back
                </button>
                <button
                  onClick={() => setStep('stats')}
                  className="flex-1 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-xl font-medium hover:opacity-90 transition-opacity flex items-center justify-center"
                >
                  View Performance
                  <TrendingUp className="ml-2 h-5 w-5" />
                </button>
              </div>
            </motion.div>
          )}

          {step === 'stats' && (
            <div className="p-4 sm:p-6">
              <div className="text-center mb-4">
                <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  Our Top Performers
                </h2>
                <p className="text-sm text-gray-600">Real results from our trading community</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* Top Sects */}
                <div className="flex flex-col">
                  <h3 className="font-bold text-base text-blue-600 flex items-center mb-3">
                    <Trophy className="h-4 w-4 mr-1.5" />
                    Top Sects
                  </h3>
                  <div className="space-y-2 h-[350px] overflow-y-auto pr-2 custom-scrollbar">
                    {[
                      { name: 'Alpha Hunters', profit: '+458%', members: 234, chain: 'Base' },
                      { name: 'Degen Society', profit: '+312%', members: 156, chain: 'Aptos' },
                      { name: 'Whale Watchers', profit: '+289%', members: 189, chain: 'Sui' },
                      { name: 'DeFi Dragons', profit: '+245%', members: 167, chain: 'Base' },
                      { name: 'Meme Masters', profit: '+198%', members: 145, chain: 'Sui' },
                      { name: 'NFT Ninjas', profit: '+176%', members: 134, chain: 'Aptos' },
                      { name: 'Yield Hunters', profit: '+165%', members: 198, chain: 'Base' },
                      { name: 'Meta Traders', profit: '+158%', members: 167, chain: 'Sui' },
                    ].map((sect, i) => (
                      <div
                        key={i}
                        className={`bg-white shadow-sm rounded-lg p-3 border border-blue-100 
                transition-all duration-200 hover:shadow-md hover:scale-[1.01]
                ${i < 3 ? 'bg-gradient-to-r from-blue-50 to-indigo-50' : ''}`}
                      >
                        <div className="flex justify-between items-start">
                          <div>
                            <div className="flex items-center">
                              <h4 className="font-medium text-sm">{sect.name}</h4>
                              {i < 3 && (
                                <span className="ml-2 px-1.5 py-0.5 bg-yellow-100 text-yellow-700 text-xs rounded-full">
                                  #{i + 1}
                                </span>
                              )}
                            </div>
                            <div className="flex items-center mt-0.5">
                              <span className="text-xs text-gray-500">{sect.chain}</span>
                              <span className="mx-1.5 text-gray-300">•</span>
                              <span className="text-xs text-gray-500">{sect.members} members</span>
                            </div>
                          </div>
                          <span className="text-green-500 font-semibold text-sm">
                            {sect.profit}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Top Traders */}
                <div className="flex flex-col">
                  <h3 className="font-bold text-base text-purple-600 flex items-center mb-3">
                    <Users className="h-4 w-4 mr-1.5" />
                    Top Traders
                  </h3>
                  <div className="space-y-2 h-[350px] overflow-y-auto pr-2 custom-scrollbar">
                    {[
                      { address: '0x1234...5678', profit: '+892%', trades: 156, winRate: '89%' },
                      { address: '0x8765...4321', profit: '+654%', trades: 234, winRate: '85%' },
                      { address: '0x9876...5432', profit: '+543%', trades: 189, winRate: '82%' },
                      { address: '0x5678...9012', profit: '+487%', trades: 145, winRate: '79%' },
                      { address: '0x6789...0123', profit: '+423%', trades: 178, winRate: '77%' },
                      { address: '0x7890...1234', profit: '+398%', trades: 167, winRate: '76%' },
                      { address: '0x8901...2345', profit: '+356%', trades: 198, winRate: '75%' },
                      { address: '0x9012...3456', profit: '+312%', trades: 156, winRate: '74%' },
                    ].map((trader, i) => (
                      <div
                        key={i}
                        className={`bg-white shadow-sm rounded-lg p-3 border border-purple-100 
                transition-all duration-200 hover:shadow-md hover:scale-[1.01]
                ${i < 3 ? 'bg-gradient-to-r from-purple-50 to-pink-50' : ''}`}
                      >
                        <div className="flex justify-between items-start">
                          <div>
                            <span className="font-mono text-sm flex items-center">
                              {trader.address}
                              {i < 3 && (
                                <span className="ml-2 px-1.5 py-0.5 bg-yellow-100 text-yellow-700 text-xs rounded-full">
                                  #{i + 1}
                                </span>
                              )}
                            </span>
                            <div className="mt-1 flex items-center text-xs text-gray-600">
                              <span>{trader.trades} trades</span>
                              <span className="mx-1.5">•</span>
                              <span className="text-green-500">{trader.winRate} win rate</span>
                            </div>
                          </div>
                          <span className="text-green-500 font-semibold text-sm">
                            {trader.profit}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Rising Stars */}
                <div className="flex flex-col">
                  <h3 className="font-bold text-base text-green-600 flex items-center mb-3">
                    <Rocket className="h-4 w-4 mr-1.5" />
                    Rising Stars
                  </h3>
                  <div className="space-y-2 h-[350px] overflow-y-auto pr-2 custom-scrollbar">
                    {[
                      {
                        address: '0x2345...6789',
                        profit: '+234%',
                        joinedDays: 15,
                        favToken: 'PEPE',
                      },
                      {
                        address: '0x3456...7890',
                        profit: '+187%',
                        joinedDays: 10,
                        favToken: 'BONK',
                      },
                      { address: '0x4567...8901', profit: '+156%', joinedDays: 7, favToken: 'WIF' },
                      {
                        address: '0x3456...7890',
                        profit: '+134%',
                        joinedDays: 5,
                        favToken: 'BONK',
                      },
                      {
                        address: '0x4567...8901',
                        profit: '+112%',
                        joinedDays: 4,
                        favToken: 'PEPE',
                      },
                      { address: '0x5678...9012', profit: '+98%', joinedDays: 3, favToken: 'WIF' },
                      { address: '0x6789...0123', profit: '+87%', joinedDays: 2, favToken: 'DOGE' },
                      { address: '0x7890...1234', profit: '+76%', joinedDays: 1, favToken: 'SHIB' },
                    ].map((newbie, i) => (
                      <div
                        key={i}
                        className={`bg-white shadow-sm rounded-lg p-3 border border-green-100 
                transition-all duration-200 hover:shadow-md hover:scale-[1.01]
                ${i < 3 ? 'bg-gradient-to-r from-green-50 to-emerald-50' : ''}`}
                      >
                        <div className="flex justify-between items-start">
                          <div>
                            <span className="font-mono text-sm flex items-center">
                              {newbie.address}
                              {i < 3 && (
                                <span className="ml-2 px-1.5 py-0.5 bg-yellow-100 text-yellow-700 text-xs rounded-full">
                                  #{i + 1}
                                </span>
                              )}
                            </span>
                            <div className="mt-1 flex items-center text-xs text-gray-600">
                              <span>Joined {newbie.joinedDays}d ago</span>
                              <span className="mx-1.5">•</span>
                              <span className="font-medium">{newbie.favToken} 🚀</span>
                            </div>
                          </div>
                          <span className="text-green-500 font-semibold text-sm">
                            {newbie.profit}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Footer Buttons */}
              <div className="mt-6 flex justify-center gap-4">
                <button onClick={() => setStep('benefits')} className={secondaryButtonClass}>
                  Back
                </button>
                <button onClick={handleComplete} className={primaryButtonClass}>
                  Start Trading
                  <ChevronRight className="ml-1.5 h-4 w-4" />
                </button>
              </div>
            </div>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
};

export default LandingModal;
