import { ChainId } from '@/utils/chains';

export type SectRole = 'creator' | 'premium' | 'member' | 'caller';

export interface Sect {
  id: number;
  name: string;
  role: SectRole;
  members: number;
  premiumMembers: number;
  active: boolean;
  description?: string;
  communityManagers?: string[];
  callers?: string[];
  chainId: ChainId;
  address: string; // Contract address
  txHash?: string; // Creation transaction
  performance?: {
    totalProfit: string;
    topTrader: string;
  };
}

export interface CreateSectButtonProps {
  onClick: () => void;
}

export interface CreateSectFormProps {
  onClose: () => void;
}

export interface UserSettingsProps {
  onClose: () => void;
}

export interface DashboardViewProps {
  onSectSelect: (sect: Sect) => void;
}

export interface SectViewProps {
  sect: Sect;
  onBack: () => void;
}
