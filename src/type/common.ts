import { ChainId } from '@/utils/chains';

export type SectType = 'Global' | 'Trend' | 'Momentum' | 'Arbitrage';

export interface Position {
  id: string;
  token: string;
  entry: number;
  current: number;
  amount: number;
  pnl: number;
  status: 'active' | 'closed';
  timestamp: string;
  leverage?: number;
  chainId: ChainId;
  txHash: string;
  sect: SectType;
}
