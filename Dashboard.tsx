import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Shield, Activity, Bell, Zap, AlertTriangle, CheckCircle, XCircle } from 'lucide-react';
import { useAppContext } from '../store/AppContext';

export const Dashboard: React.FC = () => {
  const { state, dispatch } = useAppContext();
  const navigate = useNavigate();

  const statCards = [
    {
      label: 'TOTAL AUDITS',
      value: state.stats.totalAudits,
      icon: Shield,
      color: 'cyan' as const,
    },
    {
      label: 'SYSTEM HEALTH',
      value: `${state.stats.systemHealth}%`,
      icon: Activity,
      color: 'green' as const,
    },
    {
      label: 'ACTIVE ALERTS',
      value: state.stats.activeAlerts,
      icon: Bell,
      color: 'yellow' as const,
    },
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'PASS':
        return <CheckCircle className="text-retro-green" size={20} />;
      case 'FAIL':
        return <XCircle className="text-retro-red" size={20} />;
      case 'WARNING':
        return <AlertTriangle className="text-retro-yellow" size={20} />;
      default:
        return null;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'PASS':
        return 'border-retro-green text-retro-green';
      case 'FAIL':
        return 'border-retro-red text-retro-red';
      case 'WARNING':
        return 'border-retro-yellow text-retro-yellow';
      default:
        return 'border-retro-dim text-retro-dim';
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-pixel text-retro-cyan mb-2">DASHBOARD</h1>
          <p className="text-retro-dim font-terminal">System overview and recent audits</p>
        </div>
        <button
          onClick={() => dispatch({ type: 'OPEN_AUDIT_MODAL' })}
          className="flex items-center gap-2 bg-retro-cyan hover:bg-retro-purple text-black hover:text-white font-pixel py-3 px-6 border-4 border-black transition-all shadow-pixel"
        >
          <Zap size={18} />
          <span>NEW AUDIT</span>
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {statCards.map((stat, index) => (
          <div
            key={index}
            className={`bg-retro-panel border-4 border-retro-${stat.color} p-6 shadow-pixel-${stat.color}`}
          >
            <div className="flex items-center justify-between mb-4">
              <stat.icon className={`text-retro-${stat.color}`} size={32} />
              <div className={`text-4xl font-pixel text-retro-${stat.color}`}>
                {stat.value}
              </div>
            </div>
            <div className="text-retro-dim font-terminal text-sm">{stat.label}</div>
          </div>
        ))}
      </div>

      {/* Recent Audits */}
      <div className="bg-retro-panel border-4 border-retro-purple p-6 shadow-pixel-purple">
        <h2 className="text-2xl font-pixel text-retro-cyan mb-6">RECENT AUDITS</h2>
        
        {state.audits.length === 0 ? (
          <div className="text-center py-12">
            <Shield className="text-retro-dim mx-auto mb-4" size={64} />
            <p className="text-retro-dim font-terminal text-lg mb-4">
              NO AUDITS YET
            </p>
            <button
              onClick={() => dispatch({ type: 'OPEN_AUDIT_MODAL' })}
              className="inline-flex items-center gap-2 bg-retro-cyan hover:bg-retro-purple text-black hover:text-white font-pixel py-3 px-6 border-4 border-black transition-all shadow-pixel"
            >
              <Zap size={18} />
              <span>RUN FIRST AUDIT</span>
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            {state.audits.slice(0, 5).map((audit) => (
              <div
                key={audit.id}
                onClick={() => navigate(`/report/${audit.id}`)}
                className={`border-2 ${getStatusColor(audit.status)} bg-retro-dark p-4 cursor-pointer hover:bg-retro-dim transition-all`}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-3">
                    {getStatusIcon(audit.status)}
                    <span className="font-terminal text-white font-bold">
                      {audit.target}
                    </span>
                  </div>
                  <span className={`font-pixel text-sm ${getStatusColor(audit.status).split(' ')[1]}`}>
                    SCORE: {audit.score}/100
                  </span>
                </div>
                <div className="flex items-center justify-between text-sm font-terminal text-retro-dim">
                  <span className="uppercase">{audit.type.replace('-', ' ')}</span>
                  <span>{new Date(audit.timestamp).toLocaleString()}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-retro-panel border-4 border-retro-cyan p-6 shadow-pixel-cyan">
          <h3 className="text-xl font-pixel text-retro-cyan mb-4">QUICK ACTIONS</h3>
          <div className="space-y-3">
            <button
              onClick={() => dispatch({ type: 'OPEN_AUDIT_MODAL' })}
              className="w-full text-left p-3 bg-retro-dark border-2 border-retro-dim hover:border-retro-cyan transition-all font-terminal"
            >
              {'>'} Initiate New Audit
            </button>
            <button
              onClick={() => navigate('/monitoring')}
              className="w-full text-left p-3 bg-retro-dark border-2 border-retro-dim hover:border-retro-cyan transition-all font-terminal"
            >
              {'>'} View Monitoring Dashboard
            </button>
            <button
              onClick={() => dispatch({ type: 'OPEN_UPGRADE_MODAL' })}
              className="w-full text-left p-3 bg-retro-dark border-2 border-retro-dim hover:border-retro-cyan transition-all font-terminal"
            >
              {'>'} Upgrade to Pro
            </button>
          </div>
        </div>

        <div className="bg-retro-panel border-4 border-retro-purple p-6 shadow-pixel-purple">
          <h3 className="text-xl font-pixel text-retro-purple mb-4">SYSTEM STATUS</h3>
          <div className="space-y-3 font-terminal">
            <div className="flex justify-between items-center">
              <span className="text-retro-dim">API Status:</span>
              <span className="text-retro-green flex items-center gap-2">
                <div className="w-2 h-2 bg-retro-green rounded-full animate-pulse"></div>
                ONLINE
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-retro-dim">Database:</span>
              <span className="text-retro-green flex items-center gap-2">
                <div className="w-2 h-2 bg-retro-green rounded-full animate-pulse"></div>
                CONNECTED
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-retro-dim">AI Engine:</span>
              <span className="text-retro-green flex items-center gap-2">
                <div className="w-2 h-2 bg-retro-green rounded-full animate-pulse"></div>
                READY
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};