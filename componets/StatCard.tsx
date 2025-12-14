import React from 'react';
import { Icons } from './Icons';

interface StatCardProps {
  label: string;
  value: string | number;
  type: 'shield' | 'activity' | 'bell';
  color: 'blue' | 'green' | 'yellow';
}

export const StatCard: React.FC<StatCardProps> = ({ label, value, type, color }) => {
  const colorMap = {
    blue: { 
        border: 'border-retro-cyan', 
        text: 'text-retro-cyan', 
        shadow: 'shadow-pixel-cyan',
        bg: 'bg-retro-cyan',
        glow: 'shadow-neon-cyan'
    },
    green: { 
        border: 'border-retro-green', 
        text: 'text-retro-green', 
        shadow: 'shadow-pixel-green',
        bg: 'bg-retro-green',
        glow: 'shadow-[0_0_10px_#0aff0a]'
    },
    yellow: { 
        border: 'border-retro-red', 
        text: 'text-retro-red', 
        shadow: 'shadow-pixel-red',
        bg: 'bg-retro-red',
        glow: 'shadow-[0_0_10px_#ff003c]'
    }, 
  };

  const styles = colorMap[color];
  const Icon = type === 'shield' ? Icons.NewAudit : type === 'activity' ? Icons.Monitoring : Icons.Bell;

  return (
    <div className={`relative group border-4 ${styles.border} bg-black p-1 transition-all hover:-translate-y-2 hover:${styles.glow}`}>
        {/* Inner Frame */}
        <div className={`h-full border-2 ${styles.border} bg-retro-panel/80 p-6 flex items-center justify-between relative overflow-hidden`}>
            
            {/* Background Glitch Effect */}
            <div className={`absolute -right-10 -bottom-10 w-32 h-32 ${styles.bg} opacity-20 rotate-45 group-hover:animate-pulse`}></div>

            <div className="z-10">
                <div className={`text-5xl font-terminal font-bold text-white mb-2 drop-shadow-[2px_2px_0_#000]`}>{value}</div>
                <div className={`font-pixel text-[10px] uppercase tracking-widest ${styles.text} bg-black/50 px-2 py-1 inline-block border ${styles.border}`}>
                    {label}
                </div>
            </div>

            <div className={`w-16 h-16 border-4 ${styles.border} flex items-center justify-center bg-black z-10 ${styles.shadow}`}>
                <Icon className={`w-8 h-8 ${styles.text}`} strokeWidth={3} />
            </div>
        </div>

        {/* Decor pixels */}
        <div className={`absolute top-0 left-0 w-2 h-2 ${styles.bg}`}></div>
        <div className={`absolute top-0 right-0 w-2 h-2 ${styles.bg}`}></div>
        <div className={`absolute bottom-0 left-0 w-2 h-2 ${styles.bg}`}></div>
        <div className={`absolute bottom-0 right-0 w-2 h-2 ${styles.bg}`}></div>
    </div>
  );
};