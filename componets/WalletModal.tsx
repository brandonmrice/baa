import React, { useState } from 'react';
import { X, Wallet } from 'lucide-react';
import { useAppContext } from '../store/AppContext';

export const WalletModal: React.FC = () => {
  const { state, dispatch } = useAppContext();
  const [isConnecting, setIsConnecting] = useState(false);

  if (!state.isWalletModalOpen) return null;

  const handleClose = () => {
    dispatch({ type: 'CLOSE_WALLET_MODAL' });
  };

  const handleConnect = async (providerType: 'METAMASK' | 'COINBASE' | 'WALLETCONNECT') => {
    setIsConnecting(true);
    
    // Simulate wallet connection
    setTimeout(() => {
      const mockAddress = '0x' + Math.random().toString(16).substring(2, 42);
      const mockBalance = (Math.random() * 10).toFixed(4);
      
      dispatch({
        type: 'CONNECT_WALLET',
        payload: {
          isConnected: true,
          address: mockAddress,
          balance: mockBalance,
          providerType,
        },
      });
      
      setIsConnecting(false);
      handleClose();
    }, 1500);
  };

  const handleDisconnect = () => {
    dispatch({ type: 'DISCONNECT_WALLET' });
    handleClose();
  };

  const walletOptions = [
    { id: 'METAMASK', name: 'MetaMask', desc: 'Connect with MetaMask' },
    { id: 'COINBASE', name: 'Coinbase Wallet', desc: 'Connect with Coinbase' },
    { id: 'WALLETCONNECT', name: 'WalletConnect', desc: 'Scan with mobile' },
  ];

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-retro-panel border-4 border-retro-purple max-w-md w-full p-8 relative shadow-pixel-purple">
        {/* Close Button */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 text-retro-cyan hover:text-retro-pink transition-colors"
        >
          <X size={24} />
        </button>

        {/* Header */}
        <div className="flex items-center gap-4 mb-6">
          <Wallet className="text-retro-cyan" size={32} />
          <h2 className="text-2xl font-pixel text-retro-cyan">
            {state.wallet.isConnected ? 'WALLET' : 'CONNECT'}
          </h2>
        </div>

        {state.wallet.isConnected ? (
          /* Connected State */
          <div className="space-y-6">
            <div className="bg-retro-dark border-2 border-retro-cyan p-6">
              <div className="text-retro-dim font-terminal text-sm mb-2">ADDRESS</div>
              <div className="text-retro-cyan font-terminal text-lg mb-4 break-all">
                {state.wallet.address}
              </div>
              <div className="text-retro-dim font-terminal text-sm mb-2">BALANCE</div>
              <div className="text-retro-green font-terminal text-2xl">
                {state.wallet.balance} ETH
              </div>
            </div>

            <button
              onClick={handleDisconnect}
              className="w-full bg-retro-red hover:bg-retro-pink text-white font-pixel py-4 px-6 border-4 border-black transition-all shadow-pixel"
            >
              DISCONNECT
            </button>
          </div>
        ) : (
          /* Not Connected State */
          <div className="space-y-4">
            {walletOptions.map((wallet) => (
              <button
                key={wallet.id}
                onClick={() => handleConnect(wallet.id as any)}
                disabled={isConnecting}
                className="w-full p-4 bg-retro-dark border-2 border-retro-dim hover:border-retro-cyan transition-all font-terminal text-left disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <div className="text-white font-bold mb-1">{wallet.name}</div>
                <div className="text-retro-dim text-sm">{wallet.desc}</div>
              </button>
            ))}

            {isConnecting && (
              <div className="text-center py-4">
                <div className="text-retro-cyan font-terminal animate-pulse">
                  CONNECTING...
                </div>
              </div>
            )}
          </div>
        )}

        {/* Footer */}
        <div className="mt-6 pt-6 border-t-2 border-retro-dim">
          <p className="text-retro-dim font-terminal text-sm text-center">
            [!] Demo mode - simulated wallet connection
          </p>
        </div>
      </div>
    </div>
  );
};