import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { X, Zap } from 'lucide-react';
import { useAppContext } from '../store/AppContext';
import type { AuditType } from '../types';

export const InitiateAuditModal: React.FC = () => {
  const { state, dispatch } = useAppContext();
  const navigate = useNavigate();
  const [target, setTarget] = useState('');
  const [auditType, setAuditType] = useState<AuditType>('mini-app');

  if (!state.isAuditModalOpen) return null;

  const handleClose = () => {
    dispatch({ type: 'CLOSE_AUDIT_MODAL' });
    setTarget('');
    setAuditType('mini-app');
  };

  const handleSubmit = () => {
    if (!target.trim()) return;
    handleClose();
    navigate('/new-audit', { state: { target, auditType } });
  };

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-retro-panel border-4 border-retro-purple max-w-2xl w-full p-8 relative shadow-pixel-purple">
        {/* Close Button */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 text-retro-cyan hover:text-retro-pink transition-colors"
        >
          <X size={24} />
        </button>

        {/* Header */}
        <div className="flex items-center gap-4 mb-6">
          <Zap className="text-retro-yellow" size={32} />
          <h2 className="text-2xl font-pixel text-retro-cyan">INITIATE AUDIT</h2>
        </div>

        {/* Form */}
        <div className="space-y-6">
          {/* Audit Type Selection */}
          <div>
            <label className="block text-retro-green font-terminal text-lg mb-3">
              SELECT AUDIT TYPE:
            </label>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[
                { value: 'mini-app', label: 'MINI APP', desc: 'Telegram Mini Apps' },
                { value: 'ai-agent', label: 'AI AGENT', desc: 'AI Systems' },
                { value: 'blockchain', label: 'BLOCKCHAIN', desc: 'Smart Contracts' },
              ].map((type) => (
                <button
                  key={type.value}
                  onClick={() => setAuditType(type.value as AuditType)}
                  className={`p-4 border-4 transition-all font-terminal ${
                    auditType === type.value
                      ? 'border-retro-cyan bg-retro-cyan/10 text-retro-cyan'
                      : 'border-retro-dim hover:border-retro-purple text-retro-dim hover:text-white'
                  }`}
                >
                  <div className="text-sm font-bold mb-1">{type.label}</div>
                  <div className="text-xs opacity-70">{type.desc}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Target Input */}
          <div>
            <label className="block text-retro-green font-terminal text-lg mb-3">
              TARGET IDENTIFIER:
            </label>
            <div className="relative">
              <span className="absolute left-3 top-4 text-retro-dim">{'>'}</span>
              <input
                type="text"
                value={target}
                onChange={(e) => setTarget(e.target.value)}
                placeholder="Enter URL, contract address, or API endpoint..."
                className="w-full bg-retro-dark border-4 border-retro-dim focus:border-retro-cyan outline-none px-10 py-3 font-terminal text-white placeholder:text-retro-dim transition-colors"
                autoFocus
              />
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4 pt-4">
            <button
              onClick={handleSubmit}
              disabled={!target.trim()}
              className="flex-1 bg-retro-cyan hover:bg-retro-purple text-black hover:text-white font-pixel py-4 px-6 border-4 border-black transition-all shadow-pixel disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-retro-cyan"
            >
              RUN AUDIT
            </button>
            <button
              onClick={handleClose}
              className="flex-1 bg-retro-dark hover:bg-retro-dim text-white font-pixel py-4 px-6 border-4 border-retro-dim hover:border-retro-red transition-all"
            >
              CANCEL
            </button>
          </div>
        </div>

        {/* Info Footer */}
        <div className="mt-6 pt-6 border-t-2 border-retro-dim">
          <p className="text-retro-dim font-terminal text-sm">
            [!] Comprehensive security analysis powered by Base Audit Protocol
          </p>
        </div>
      </div>
    </div>
  );
};