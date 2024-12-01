import { ChainId, getExplorerTxUrl } from '@/utils/chains';
import { ExternalLink } from 'lucide-react';

interface ExplorerLinkProps {
  chainId: ChainId;
  txHash: string;
  className?: string;
  shortened?: boolean;
}

export const ExplorerLink = ({
  chainId,
  txHash,
  className = '',
  shortened = true,
}: ExplorerLinkProps) => {
  const url = getExplorerTxUrl(chainId, txHash);
  const displayHash = shortened ? `${txHash.slice(0, 6)}...${txHash.slice(-4)}` : txHash;

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex items-center space-x-1 text-xs text-gray-500 hover:text-blue-500 transition-colors ${className}`}
    >
      <span className="font-mono">{displayHash}</span>
      <ExternalLink className="h-3 w-3" />
    </a>
  );
};
