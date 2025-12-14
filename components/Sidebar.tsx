import React from 'react';
import { NavLink } from 'react-router-dom';
import { Shield, Activity, Bell, Settings, Zap, Wallet } from 'lucide-react';
import { useAppContext } from '../store/AppContext';

export const Sidebar: React.FC = () => {
  const { state, dispatch } = useAppContext();

  const navItems = [
    { path: '/', icon: Shield, label: 'DASHBOARD' },
    { path: '/monitoring', icon: Activity, label: 'MONITORING' },
    { path: '/settings', icon: Settings, label: 'SETTINGS' },
  ];

  return (
    <aside className="w-72 bg-retro-panel border-r-4 border-retro-purple h-screen fixed left-0 top-0 flex flex-col shadow-pixel-purple z-20">
      {/* Logo & Status */}
      <div className="p-6 border-b-4 border-retro-purple">
        <div className="flex items-center gap-3 mb-4">
          <Shield className="text-retro-cyan" size={32} />
          <div>
            <h1 className="text-xl font-pixel text-retro-cyan">BASE AUDIT</h1>
            <p className="text-xs font-terminal text-retro-dim">v2.1.0</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-retro-green rounded-full animate-pulse"></div>
          <span className="text-retro-green text-sm font-terminal animate-pulse">{'>'} ONLINE</span>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-2">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 font-terminal transition-all border-2 ${
                isActive
                  ? 'bg-retro-cyan/20 border-retro-cyan text-retro-cyan'
                  : 'border-transparent hover:border-retro-purple hover:bg-retro-purple/10 text-retro-dim hover:text-white'
              }`
            }
          >
            {({ isActive }) => (
              <>
                <item.icon size={20} />
                <span>{item.label}</span>
                {isActive && <span className="ml-auto">{'>'}</span>}
              </>
            )}
          </NavLink>
        ))}
      </nav>

      {/* Action Buttons */}
      <div className="p-4 space-y-3 border-t-4 border-retro-purple">
        {/* Wallet Button */}
        <button
          onClick={() => dispatch({ type: 'OPEN_WALLET_MODAL' })}
          className="w-full flex items-center justify-between px-4 py-3 bg-retro-dark border-2 border-retro-dim hover:border-retro-cyan transition-all font-terminal group"
        >
          <div className="flex items-center gap-2">
            <Wallet size={18} className="text-retro-cyan" />
            <span className="text-sm">
              {state.wallet.isConnected
                ? `${state.wallet.address?.slice(0, 6)}...${state.wallet.address?.slice(-4)}`
                : 'CONNECT WALLET'}
            </span>
          </div>
          {state.wallet.isConnected && (
            <span className="text-xs text-retro-green">{state.wallet.balance} ETH</span>
          )}
        </button>

        {/* New Audit Button */}
        <button
          onClick={() => dispatch({ type: 'OPEN_AUDIT_MODAL' })}
          className="w-full flex items-center justify-center gap-2 px-4 py-4 bg-retro-cyan hover:bg-retro-purple text-black hover:text-white font-pixel border-4 border-black transition-all shadow-pixel"
        >
          <Zap size={18} />
          <span className="text-sm">NEW AUDIT</span>
        </button>

        {/* Alerts */}
        <div className="flex items-center justify-between px-4 py-3 bg-retro-red/20 border-2 border-retro-red font-terminal">
          <div className="flex items-center gap-2">
            <Bell size={18} className="text-retro-red animate-pulse" />
            <span className="text-sm text-retro-red">ALERTS</span>
          </div>
          <span className="text-retro-red font-bold">{state.stats.activeAlerts}</span>
        </div>
      </div>

      {/* Footer */}
      <div className="p-4 border-t-2 border-retro-dim text-center">
        <p className="text-xs font-terminal text-retro-dim">
          © 2024 BASE AUDIT PROTOCOL
        </p>
      </div>
    </aside>
  );
};