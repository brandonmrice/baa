import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Download, Share2, CheckCircle, XCircle, AlertTriangle, Shield } from 'lucide-react';
import { useAppContext } from '../store/AppContext';

export const Report: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { state } = useAppContext();

  const audit = state.audits.find(a => a.id === id);

  if (!audit) {
    return (
      <div className="text-center py-12">
        <Shield className="text-retro-dim mx-auto mb-4" size={64} />
        <p className="text-retro-dim font-terminal text-lg">AUDIT NOT FOUND</p>
        <button
          onClick={() => navigate('/')}
          className="mt-6 bg-retro-cyan hover:bg-retro-purple text-black hover:text-white font-pixel py-3 px-6 border-4 border-black transition-all shadow-pixel"
        >
          BACK TO DASHBOARD
        </button>
      </div>
    );
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'PASS':
        return 'text-retro-green border-retro-green';
      case 'FAIL':
        return 'text-retro-red border-retro-red';
      case 'WARN':
        return 'text-retro-yellow border-retro-yellow';
      default:
        return 'text-retro-dim border-retro-dim';
    }
  };

  const getCheckpointIcon = (status: string) => {
    switch (status) {
      case 'PASS':
        return <CheckCircle className="text-retro-green" size={20} />;
      case 'FAIL':
        return <XCircle className="text-retro-red" size={20} />;
      case 'WARN':
        return <AlertTriangle className="text-retro-yellow" size={20} />;
      default:
        return null;
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical':
        return 'text-retro-red';
      case 'high':
        return 'text-retro-pink';
      case 'medium':
        return 'text-retro-yellow';
      case 'low':
        return 'text-retro-cyan';
      default:
        return 'text-retro-dim';
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => navigate('/')}
          className="flex items-center gap-2 text-retro-cyan hover:text-retro-purple font-terminal transition-colors"
        >
          <ArrowLeft size={20} />
          <span>BACK TO DASHBOARD</span>
        </button>
        <div className="flex gap-4">
          <button className="flex items-center gap-2 bg-retro-dark hover:bg-retro-dim text-white font-pixel py-2 px-4 border-2 border-retro-dim transition-all">
            <Share2 size={16} />
            <span className="text-sm">SHARE</span>
          </button>
          <button className="flex items-center gap-2 bg-retro-cyan hover:bg-retro-purple text-black hover:text-white font-pixel py-2 px-4 border-4 border-black transition-all shadow-pixel">
            <Download size={16} />
            <span className="text-sm">EXPORT</span>
          </button>
        </div>
      </div>

      {/* Report Header */}
      <div className="bg-retro-panel border-4 border-retro-purple p-8 shadow-pixel-purple">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-pixel text-retro-cyan mb-2">AUDIT REPORT</h1>
            <p className="text-retro-dim font-terminal">ID: {audit.id}</p>
          </div>
          <div className={`text-6xl font-pixel ${audit.score >= 80 ? 'text-retro-green' : audit.score >= 60 ? 'text-retro-yellow' : 'text-retro-red'}`}>
            {audit.score}
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 font-terminal">
          <div>
            <div className="text-retro-dim text-sm mb-1">TARGET</div>
            <div className="text-white font-bold">{audit.target}</div>
          </div>
          <div>
            <div className="text-retro-dim text-sm mb-1">TYPE</div>
            <div className="text-white font-bold uppercase">{audit.type.replace('-', ' ')}</div>
          </div>
          <div>
            <div className="text-retro-dim text-sm mb-1">TIMESTAMP</div>
            <div className="text-white font-bold">{new Date(audit.timestamp).toLocaleString()}</div>
          </div>
        </div>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-retro-panel border-4 border-retro-green p-6 shadow-pixel-green">
          <div className="text-4xl font-pixel text-retro-green mb-2">
            {audit.report.passedCount}
          </div>
          <div className="text-retro-dim font-terminal">CHECKS PASSED</div>
        </div>
        <div className="bg-retro-panel border-4 border-retro-red p-6 shadow-pixel-red">
          <div className="text-4xl font-pixel text-retro-red mb-2">
            {audit.report.failedCount}
          </div>
          <div className="text-retro-dim font-terminal">CHECKS FAILED</div>
        </div>
        <div className="bg-retro-panel border-4 border-retro-cyan p-6 shadow-pixel-cyan">
          <div className="text-4xl font-pixel text-retro-cyan mb-2">
            {audit.report.checkpoints.length}
          </div>
          <div className="text-retro-dim font-terminal">TOTAL CHECKS</div>
        </div>
      </div>

      {/* Detailed Checkpoints */}
      <div className="bg-retro-panel border-4 border-retro-purple p-8 shadow-pixel-purple">
        <h2 className="text-2xl font-pixel text-retro-cyan mb-6">SECURITY CHECKPOINTS</h2>
        
        <div className="space-y-4">
          {audit.report.checkpoints.map((checkpoint) => (
            <div
              key={checkpoint.id}
              className={`bg-retro-dark border-2 ${getStatusColor(checkpoint.status)} p-6`}
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3 flex-1">
                  {getCheckpointIcon(checkpoint.status)}
                  <div>
                    <h3 className="font-terminal text-lg text-white font-bold mb-1">
                      {checkpoint.title}
                    </h3>
                    <p className="text-retro-dim font-terminal text-sm">
                      {checkpoint.description}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <div className={`font-pixel text-sm mb-1 ${getStatusColor(checkpoint.status)}`}>
                    {checkpoint.status}
                  </div>
                  <div className={`font-terminal text-xs uppercase ${getSeverityColor(checkpoint.severity)}`}>
                    {checkpoint.severity}
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-6 text-sm font-terminal">
                <div className="flex-1">
                  <div className="text-retro-dim mb-1">CATEGORY:</div>
                  <div className="text-white">{checkpoint.category}</div>
                </div>
                {checkpoint.remediation && checkpoint.status !== 'PASS' && (
                  <div className="flex-[2]">
                    <div className="text-retro-yellow mb-1">REMEDIATION:</div>
                    <div className="text-retro-dim">{checkpoint.remediation}</div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Recommendations */}
      <div className="bg-retro-panel border-4 border-retro-yellow p-8 shadow-pixel-yellow">
        <h2 className="text-2xl font-pixel text-retro-yellow mb-6">RECOMMENDATIONS</h2>
        <ul className="space-y-3 font-terminal text-retro-dim">
          <li className="flex items-start gap-3">
            <span className="text-retro-yellow">{'>'}</span>
            <span>Address all critical and high severity issues immediately</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-retro-yellow">{'>'}</span>
            <span>Implement regular security audits (monthly recommended)</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-retro-yellow">{'>'}</span>
            <span>Keep all dependencies and frameworks up to date</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-retro-yellow">{'>'}</span>
            <span>Enable real-time monitoring for continuous protection</span>
          </li>
        </ul>
      </div>
    </div>
  );
};