
import { Sect, SectRole } from '@/components/sects/types';
import { ChainId, isValidChainId } from '@/utils/chains';

export const toSect = (sect: any): Sect => {
  return {
    id: sect.id,
    name: sect.name,
    role: ['creator', 'premium', 'member', 'caller'].includes(sect.role)
      ? sect.role
      : ('member' as SectRole),
    members: sect.members,
    premiumMembers: sect.premiumMembers,
    active: sect.active,
    description: sect.description,
    communityManagers: sect.communityManagers || [],
    callers: sect.callers || [],
    performance: sect.performance,
    // Add chain-related fields with validation
    chainId: isValidChainId(sect.chainId) ? sect.chainId : ('base' as ChainId),
    address: sect.address || '0x0000000000000000000000000000000000000000',
    txHash: sect.txHash || undefined,
  };
};
