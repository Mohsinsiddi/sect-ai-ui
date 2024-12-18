

import { SectRole } from '@/components/sects/types';
import { toSect } from './utility';

export const mockSects = [
  toSect({
    id: 1,
    name: 'Alpha Hunters',
    role: 'creator' as SectRole,
    members: 156,
    premiumMembers: 89,
    active: true,
    description: 'Elite trading collective focused on high-impact strategies',
    communityManagers: ['0x1234...5678'],
    callers: ['0x8765...4321'],
    chainId: 'base',
    address: '0x1234567890abcdef1234567890abcdef12345678',
    txHash: '0xabcdef1234567890abcdef1234567890abcdef1234567890abcdef1234567890',
    performance: {
      totalProfit: '+34.5%',
      topTrader: '0x9876...5432',
    },
  }),
  toSect({
    id: 2,
    name: 'Degen Society',
    role: 'premium' as SectRole,
    members: 234,
    premiumMembers: 145,
    active: true,
    description: 'High-risk, high-reward trading community',
    chainId: 'sui',
    address: '0x1234567890abcdef1234567890abcdef12345678',
    txHash: '0xabcdef1234567890abcdef1234567890abcdef1234567890abcdef1234567890',
    performance: {
      totalProfit: '+45.2%',
      topTrader: '0x5432...9876',
    },
  }),
  toSect({
    id: 3,
    name: 'Crypto Scholars',
    role: 'member' as SectRole,
    members: 87,
    premiumMembers: 22,
    active: true,
    description: 'Educational community for blockchain research',
    chainId: 'base',
    address: '0x1234567890abcdef1234567890abcdef12345678',
    txHash: '0xabcdef1234567890abcdef1234567890abcdef1234567890abcdef1234567890',
    performance: {
      totalProfit: '+12.7%',
      topTrader: '0x2345...6789',
    },
  }),
  toSect({
    id: 4,
    name: 'Quantum Traders',
    role: 'premium' as SectRole,
    members: 312,
    premiumMembers: 201,
    active: false,
    description: 'Advanced algorithmic trading network',
    chainId: 'base',
    address: '0x1234567890abcdef1234567890abcdef12345678',
    txHash: '0xabcdef1234567890abcdef1234567890abcdef1234567890abcdef1234567890',
    performance: {
      totalProfit: '+56.8%',
      topTrader: '0x6789...2345',
    },
  }),
  toSect({
    id: 5,
    name: 'Market Whisperers',
    role: 'caller' as SectRole,
    members: 98,
    premiumMembers: 55,
    active: true,
    description: 'Specialized trading signals and market insights',
    chainId: 'aptos',
    address: '0x1234567890abcdef1234567890abcdef12345678',
    txHash: '0xabcdef1234567890abcdef1234567890abcdef1234567890abcdef1234567890',
    callers: ['0x4321...8765', '0x6543...2109'],
    performance: {
      totalProfit: '+27.3%',
      topTrader: '0x1357...2468',
    },
  }),
  toSect({
    id: 6,
    name: 'Blockchain Buccaneers',
    role: 'caller' as SectRole,
    members: 142,
    premiumMembers: 76,
    active: true,
    description: 'Crypto trading community specializing in emerging markets',
    chainId: 'aptos',
    address: '0x1234567890abcdef1234567890abcdef12345678',
    txHash: '0xabcdef1234567890abcdef1234567890abcdef1234567890abcdef1234567890',
    callers: ['0x9876...5432', '0x2468...1357'],
    performance: {
      totalProfit: '+39.6%',
      topTrader: '0x8642...9753',
    },
  }),
  toSect({
    id: 7,
    name: 'DeFi Dynamos',
    role: 'creator' as SectRole,
    members: 267,
    premiumMembers: 132,
    active: true,
    description: 'Decentralized finance innovation and trading group',
    chainId: 'aptos',
    address: '0x1234567890abcdef1234567890abcdef12345678',
    txHash: '0xabcdef1234567890abcdef1234567890abcdef1234567890abcdef1234567890',
    communityManagers: ['0x2109...6543'],
    callers: ['0x7890...1234'],
    performance: {
      totalProfit: '+48.2%',
      topTrader: '0x3456...7890',
    },
  }),
];
