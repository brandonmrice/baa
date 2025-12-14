import React from 'react';
import { useApp } from '../store/AppContext';

export const ScoreChart: React.FC = () => {
  const { audits } = useApp();

  // Sort by date ascending and take last 10
  const data = [...audits]
    .sort((a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime())
    .slice(-10);

  if (data.length < 2) {
    return (
      <div className="w-full h-64 border-4 border-retro-dim bg-retro-panel flex items-center justify-center animate-fade-in shadow-pixel">
        <p className="text-retro-cyan font-pixel text-xs animate-pulse">AWAITING_DATA...</p>
      </div>
    );
  }

  // Calculate coordinates in %
  const getX = (index: number) => (index / (data.length - 1)) * 100;
  const getY = (score: number) => 100 - score; // 0 at bottom, 100 at top

  const points = data.map((d, i) => `${getX(i)},${getY(d.score)}`).join(' ');
  const areaPoints = `0,100 ${points} 100,100`;

  return (
    <div className="border-4 border-retro-purple bg-retro-panel p-6 animate-fade-in shadow-pixel-purple relative overflow-hidden">
      {/* Scanline texture */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] z-0 pointer-events-none bg-[length:100%_4px,6px_100%]"></div>

      <div className="flex justify-between items-center mb-6 relative z-10">
        <h3 className="text-retro-purple font-pixel text-xs flex items-center gap-2">
            <span className="animate-pulse">_</span>SCORE_TREND
        </h3>
        <div className="flex items-center gap-4 text-xs font-terminal border border-retro-dim px-2 py-1 bg-black">
            <span className="flex items-center gap-1 text-gray-400">
                <div className="w-2 h-2 bg-retro-cyan"></div> VAL
            </span>
            <span className="text-retro-cyan">N={data.length}</span>
        </div>
      </div>
      
      <div className="relative h-48 w-full group cursor-crosshair z-10">
        {/* Background Grid */}
        <div className="absolute inset-0 flex flex-col justify-between text-xs text-retro-dim font-terminal pointer-events-none z-0">
            <div className="border-b border-dashed border-retro-dim/50 w-full h-0 relative"><span className="absolute -top-3 right-0 opacity-50">100</span></div>
            <div className="border-b border-dashed border-retro-dim/50 w-full h-0 relative"><span className="absolute -top-3 right-0 opacity-50">75</span></div>
            <div className="border-b border-dashed border-retro-dim/50 w-full h-0 relative"><span className="absolute -top-3 right-0 opacity-50">50</span></div>
            <div className="border-b border-dashed border-retro-dim/50 w-full h-0 relative"><span className="absolute -top-3 right-0 opacity-50">25</span></div>
            <div className="border-b border-dashed border-retro-dim/50 w-full h-0 relative"><span className="absolute -top-3 right-0 opacity-50">00</span></div>
        </div>

        {/* SVG Line & Area */}
        <svg className="absolute inset-0 w-full h-full z-0" viewBox="0 0 100 100" preserveAspectRatio="none">
          <defs>
            <linearGradient id="chartGradient" x1="0" x2="0" y1="0" y2="1">
              <stop offset="0%" stopColor="#bc13fe" stopOpacity="0.5" />
              <stop offset="100%" stopColor="#bc13fe" stopOpacity="0" />
            </linearGradient>
          </defs>
          <polygon points={areaPoints} fill="url(#chartGradient)" />
          <polyline 
            points={points} 
            fill="none" 
            stroke="#00f3ff" 
            strokeWidth="3" 
            vectorEffect="non-scaling-stroke" 
            strokeLinecap="square"
          />
        </svg>

        {/* Interactive Data Points */}
        {data.map((d, i) => {
            const isLeft = i < 2;
            const isRight = i > data.length - 3;
            
            return (
                <div 
                    key={d.id}
                    className="absolute group/point z-20"
                    style={{ 
                    left: `${getX(i)}%`, 
                    top: `${getY(d.score)}%`,
                    transform: 'translate(-50%, -50%)'
                    }}
                >
                    {/* Invisible Hit Area */}
                    <div className="w-8 h-8 flex items-center justify-center">
                        {/* Visible Square Dot */}
                        <div className="w-3 h-3 bg-black border-2 border-retro-cyan hover:bg-retro-cyan hover:scale-125 transition-transform duration-75"></div>
                        
                        {/* Pixel Tooltip */}
                        <div className={`absolute bottom-full mb-4 opacity-0 group-hover/point:opacity-100 transition-none pointer-events-none min-w-[180px] z-50 ${isRight ? 'right-0' : isLeft ? 'left-0' : 'left-1/2 -translate-x-1/2'}`}>
                            <div className="bg-black border-2 border-retro-cyan shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] p-2">
                                <div className="flex items-center justify-between mb-1 pb-1 border-b border-retro-dim">
                                    <span className="text-retro-cyan text-xs font-pixel">VAL:</span>
                                    <span className={`font-terminal text-xl ${d.score > 80 ? 'text-retro-green' : d.score > 50 ? 'text-retro-yellow' : 'text-retro-red'}`}>{d.score}</span>
                                </div>
                                <div className="space-y-0">
                                    <div className="text-lg text-white font-terminal truncate max-w-[160px]">{d.target}</div>
                                    <div className="text-sm text-gray-400 font-terminal">@{d.timestamp.toLocaleTimeString()}</div>
                                    <div className="flex items-center gap-2 mt-1">
                                        <div className={`w-2 h-2 ${d.status === 'PASS' ? 'bg-retro-green' : d.status === 'FAIL' ? 'bg-retro-red' : 'bg-retro-yellow'} animate-pulse`}></div>
                                        <span className="text-xs font-pixel text-white uppercase">{d.status}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            );
        })}
      </div>
    </div>
  );
};