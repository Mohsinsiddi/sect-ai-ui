// utils/chains.ts

export interface Chain {
  id: string;
  name: string;
  logoUrl: string;
  explorerUrl: string;
  nativeCurrency: {
    name: string;
    symbol: string;
    decimals: number;
  };
  active?: boolean; // To easily enable/disable chains
  testnet?: boolean; // To distinguish between mainnet and testnet
}

export type ChainId = 'aptos' | 'sui' | 'base' | string; // Extensible for future chains

export const SUPPORTED_CHAINS: Record<ChainId, Chain> = {
  aptos: {
    id: 'aptos',
    name: 'Aptos',
    logoUrl: 'https://res.coinpaper.com/coinpaper/Aptos_mark_BLK_02443605a1.png',
    explorerUrl: 'https://explorer.aptoslabs.com/txn/',
    nativeCurrency: {
      name: 'Aptos',
      symbol: 'APT',
      decimals: 8,
    },
    active: true,
  },
  sui: {
    id: 'sui',
    name: 'Sui',
    logoUrl: 'https://cryptologos.cc/logos/sui-sui-logo.png?v=035',
    explorerUrl: 'https://explorer.sui.io/txblock/',
    nativeCurrency: {
      name: 'Sui',
      symbol: 'SUI',
      decimals: 9,
    },
    active: true,
  },
  base: {
    id: 'base',
    name: 'Base',
    logoUrl: 'https://pbs.twimg.com/media/FrHldXEWIAYuI8C.jpg',
    explorerUrl: 'https://basescan.org/tx/',
    nativeCurrency: {
      name: 'Ethereum',
      symbol: 'ETH',
      decimals: 18,
    },
    active: true,
  },
} as const;

// Utility functions
export const getChainById = (chainId: ChainId): Chain | undefined => {
  return SUPPORTED_CHAINS[chainId];
};

export const getAllChains = (): Chain[] => {
  return Object.values(SUPPORTED_CHAINS);
};

export const getActiveChains = (): Chain[] => {
  return Object.values(SUPPORTED_CHAINS).filter((chain) => chain.active);
};

export const getMainnetChains = (): Chain[] => {
  return Object.values(SUPPORTED_CHAINS).filter((chain) => !chain.testnet);
};

export const getTestnetChains = (): Chain[] => {
  return Object.values(SUPPORTED_CHAINS).filter((chain) => chain.testnet);
};

// Example of how to add a new chain:
/*
  SUPPORTED_CHAINS.arbitrum = {
    id: 'arbitrum',
    name: 'Arbitrum',
    logoUrl: 'https://path-to-arbitrum-logo.png',
    explorerUrl: 'https://arbiscan.io/tx/',
    nativeCurrency: {
      name: 'Ethereum',
      symbol: 'ETH',
      decimals: 18,
    },
    active: true,
  };
  */

// Type guard
export const isValidChainId = (chainId: string): chainId is ChainId => {
  return chainId in SUPPORTED_CHAINS;
};

// Get chain explorer URL with transaction hash
export const getExplorerTxUrl = (chainId: ChainId, txHash: string): string => {
  const chain = getChainById(chainId);
  return chain ? `${chain.explorerUrl}${txHash}` : '';
};
