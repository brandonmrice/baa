import React from 'react';
import { X, Zap, Shield, Star } from 'lucide-react';
import { useAppContext } from '../store/AppContext';

export const UpgradeModal: React.FC = () => {
  const { state, dispatch } = useAppContext();

  if (!state.isUpgradeModalOpen) return null;

  const handleClose = () => {
    dispatch({ type: 'CLOSE_UPGRADE_MODAL' });
  };

  const features = [
    'Unlimited audits per month',
    'Advanced AI-powered analysis',
    'Real-time monitoring alerts',
    'Priority support 24/7',
    'Custom report branding',
    'API access for integrations',
  ];

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-retro-panel border-4 border-retro-purple max-w-3xl w-full p-8 relative shadow-pixel-purple">
        {/* Close Button */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 text-retro-cyan hover:text-retro-pink transition-colors"
        >
          <X size={24} />
        </button>

        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <Star className="text-retro-yellow" size={48} />
          </div>
          <h2 className="text-3xl font-pixel text-retro-cyan mb-2">UPGRADE TO PRO</h2>
          <p className="text-retro-dim font-terminal">Unlock unlimited power</p>
        </div>

        {/* Pricing */}
        <div className="bg-retro-dark border-4 border-retro-cyan p-8 mb-8 text-center">
          <div className="text-5xl font-pixel text-retro-cyan mb-2">$99</div>
          <div className="text-retro-dim font-terminal">per month</div>
        </div>

        {/* Features */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          {features.map((feature, index) => (
            <div key={index} className="flex items-center gap-3 font-terminal">
              <Shield className="text-retro-green flex-shrink-0" size={20} />
              <span className="text-white">{feature}</span>
            </div>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="flex gap-4">
          <button
            onClick={handleClose}
            className="flex-1 bg-retro-cyan hover:bg-retro-purple text-black hover:text-white font-pixel py-4 px-6 border-4 border-black transition-all shadow-pixel flex items-center justify-center gap-2"
          >
            <Zap size={18} />
            <span>UPGRADE NOW</span>
          </button>
          <button
            onClick={handleClose}
            className="px-8 bg-retro-dark hover:bg-retro-dim text-white font-pixel py-4 border-4 border-retro-dim hover:border-retro-red transition-all"
          >
            LATER
          </button>
        </div>

        {/* Footer */}
        <div className="mt-6 pt-6 border-t-2 border-retro-dim text-center">
          <p className="text-retro-dim font-terminal text-sm">
            [!] 30-day money-back guarantee • Cancel anytime
          </p>
        </div>
      </div>
    </div>
  );
};