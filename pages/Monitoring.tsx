import React, { useState, useEffect } from 'react';
import { Activity, Shield, AlertTriangle, TrendingUp } from 'lucide-react';

export const Monitoring: React.FC = () => {
  const [cpuUsage, setCpuUsage] = useState(45);
  const [memoryUsage, setMemoryUsage] = useState(62);
  const [networkActivity, setNetworkActivity] = useState(78);

  useEffect(() => {
    const interval = setInterval(() => {
      setCpuUsage(prev => Math.max(20, Math.min(90, prev + (Math.random() - 0.5) * 10)));
      setMemoryUsage(prev => Math.max(30, Math.min(85, prev + (Math.random() - 0.5) * 8)));
      setNetworkActivity(prev => Math.max(40, Math.min(95, prev + (Math.random() - 0.5) * 15)));
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  const alerts = [
    {
      id: 1,
      severity: 'high',
      title: 'Unusual API Request Pattern',
      description: 'Detected 300% increase in API calls from IP 192.168.1.105',
      timestamp: new Date(Date.now() - 300000),
    },
    {
      id: 2,
      severity: 'medium',
      title: 'Failed Authentication Attempts',
      description: '15 failed login attempts in the last hour',
      timestamp: new Date(Date.now() - 1800000),
    },
    {
      id: 3,
      severity: 'low',
      title: 'SSL Certificate Expiring Soon',
      description: 'SSL certificate for api.example.com expires in 30 days',
      timestamp: new Date(Date.now() - 3600000),
    },
  ];

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'high':
        return 'border-retro-red text-retro-red';
      case 'medium':
        return 'border-retro-yellow text-retro-yellow';
      case 'low':
        return 'border-retro-cyan text-retro-cyan';
      default:
        return 'border-retro-dim text-retro-dim';
    }
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-pixel text-retro-cyan mb-2">MONITORING</h1>
        <p className="text-retro-dim font-terminal">Real-time system surveillance and alerts</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-retro-panel border-4 border-retro-cyan p-6 shadow-pixel-cyan">
          <div className="flex items-center justify-between mb-4">
            <Activity className="text-retro-cyan" size={32} />
            <div className="text-3xl font-pixel text-retro-cyan">
              {Math.round(cpuUsage)}%
            </div>
          </div>
          <div className="text-retro-dim font-terminal text-sm mb-2">CPU USAGE</div>
          <div className="h-4 bg-retro-dark border-2 border-retro-dim overflow-hidden">
            <div
              className="h-full bg-retro-cyan transition-all duration-500"
              style={{ width: `${cpuUsage}%` }}
            />
          </div>
        </div>

        <div className="bg-retro-panel border-4 border-retro-purple p-6 shadow-pixel-purple">
          <div className="flex items-center justify-between mb-4">
            <Shield className="text-retro-purple" size={32} />
            <div className="text-3xl font-pixel text-retro-purple">
              {Math.round(memoryUsage)}%
            </div>
          </div>
          <div className="text-retro-dim font-terminal text-sm mb-2">MEMORY</div>
          <div className="h-4 bg-retro-dark border-2 border-retro-dim overflow-hidden">
            <div
              className="h-full bg-retro-purple transition-all duration-500"
              style={{ width: `${memoryUsage}%` }}
            />
          </div>
        </div>

        <div className="bg-retro-panel border-4 border-retro-green p-6 shadow-pixel-green">
          <div className="flex items-center justify-between mb-4">
            <TrendingUp className="text-retro-green" size={32} />
            <div className="text-3xl font-pixel text-retro-green">
              {Math.round(networkActivity)}%
            </div>
          </div>
          <div className="text-retro-dim font-terminal text-sm mb-2">NETWORK</div>
          <div className="h-4 bg-retro-dark border-2 border-retro-dim overflow-hidden">
            <div
              className="h-full bg-retro-green transition-all duration-500"
              style={{ width: `${networkActivity}%` }}
            />
          </div>
        </div>
      </div>

      <div className="bg-retro-panel border-4 border-retro-red p-8 shadow-pixel-red">
        <div className="flex items-center gap-3 mb-6">
          <AlertTriangle className="text-retro-red" size={32} />
          <h2 className="text-2xl font-pixel text-retro-red">ACTIVE ALERTS</h2>
        </div>

        <div className="space-y-4">
          {alerts.map((alert) => (
            <div
              key={alert.id}
              className={`bg-retro-dark border-2 ${getSeverityColor(alert.severity)} p-6`}
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <span className={`font-pixel text-xs uppercase ${getSeverityColor(alert.severity)}`}>
                      {alert.severity}
                    </span>
                    <span className="text-retro-dim font-terminal text-xs">
                      {alert.timestamp.toLocaleTimeString()}
                    </span>
                  </div>
                  <h3 className="font-terminal text-lg text-white font-bold mb-2">
                    {alert.title}
                  </h3>
                  <p className="text-retro-dim font-terminal text-sm">
                    {alert.description}
                  </p>
                </div>
              </div>
              <div className="flex gap-3">
                <button className="flex-1 bg-retro-cyan hover:bg-retro-purple text-black hover:text-white font-terminal py-2 px-4 border-2 border-black transition-all text-sm">
                  INVESTIGATE
                </button>
                <button className="flex-1 bg-retro-dark hover:bg-retro-dim text-white font-terminal py-2 px-4 border-2 border-retro-dim transition-all text-sm">
                  DISMISS
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-retro-panel border-4 border-retro-purple p-8 shadow-pixel-purple">
        <h2 className="text-2xl font-pixel text-retro-purple mb-6">LIVE ACTIVITY FEED</h2>
        <div className="bg-retro-dark border-2 border-retro-dim p-4 font-terminal text-sm h-64 overflow-y-auto">
          {Array.from({ length: 20 }).map((_, i) => (
            <div key={i} className="text-retro-green mb-1">
              [{new Date(Date.now() - i * 5000).toLocaleTimeString()}] System health check: OK
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-retro-panel border-4 border-retro-cyan p-6 shadow-pixel-cyan">
          <h3 className="text-xl font-pixel text-retro-cyan mb-4">ENDPOINTS</h3>
          <div className="space-y-3 font-terminal">
            {[
              { name: 'API Gateway', status: 'online' },
              { name: 'Auth Service', status: 'online' },
              { name: 'Database', status: 'online' },
              { name: 'Cache Layer', status: 'degraded' },
            ].map((endpoint, i) => (
              <div key={i} className="flex justify-between items-center">
                <span className="text-retro-dim">{endpoint.name}:</span>
                <span className={`flex items-center gap-2 ${endpoint.status === 'online' ? 'text-retro-green' : 'text-retro-yellow'}`}>
                  <div className={`w-2 h-2 rounded-full ${endpoint.status === 'online' ? 'bg-retro-green' : 'bg-retro-yellow'} animate-pulse`}></div>
                  {endpoint.status.toUpperCase()}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-retro-panel border-4 border-retro-purple p-6 shadow-pixel-purple">
          <h3 className="text-xl font-pixel text-retro-purple mb-4">RECENT SCANS</h3>
          <div className="space-y-3 font-terminal text-sm">
            {[
              { target: 'api.example.com', time: '2m ago', status: 'PASS' },
              { target: 'app.example.com', time: '15m ago', status: 'WARN' },
              { target: 'cdn.example.com', time: '1h ago', status: 'PASS' },
              { target: 'db.example.com', time: '3h ago', status: 'PASS' },
            ].map((scan, i) => (
              <div key={i} className="flex justify-between items-center">
                <span className="text-white">{scan.target}</span>
                <div className="flex items-center gap-3">
                  <span className="text-retro-dim">{scan.time}</span>
                  <span className={`font-pixel text-xs ${scan.status === 'PASS' ? 'text-retro-green' : 'text-retro-yellow'}`}>
                    {scan.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};