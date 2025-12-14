import React from 'react';
import { useApp } from '../store/AppContext';
import { Icons } from './Icons';
import { useNavigate } from 'react-router-dom';

const timeAgo = (date: Date) => {
  const seconds = Math.floor((new Date().getTime() - date.getTime()) / 1000);
  let interval = seconds / 31536000;
  if (interval > 1) return Math.floor(interval) + "Y";
  interval = seconds / 2592000;
  if (interval > 1) return Math.floor(interval) + "M";
  interval = seconds / 86400;
  if (interval > 1) return Math.floor(interval) + "D";
  interval = seconds / 3600;
  if (interval > 1) return Math.floor(interval) + "H";
  interval = seconds / 60;
  if (interval > 1) return Math.floor(interval) + "m";
  return Math.floor(seconds) + "s";
};

export const LogsTable: React.FC = () => {
  const { audits } = useApp();
  const navigate = useNavigate();

  const getScoreColor = (score: number) => {
    if (score >= 90) return 'text-retro-green drop-shadow-[0_0_5px_#0aff0a]';
    if (score >= 50) return 'text-retro-yellow drop-shadow-[0_0_5px_#fff200]';
    return 'text-retro-red drop-shadow-[0_0_5px_#ff003c]';
  };

  const getStatusBadge = (status: string) => {
    const baseClass = "px-2 py-1 font-pixel text-[10px] border-2 shadow-[2px_2px_0_#000]";
    switch (status) {
      case 'PASS':
        return <span className={`${baseClass} bg-retro-green text-black border-white`}>PASS</span>;
      case 'FAIL':
        return <span className={`${baseClass} bg-retro-red text-white border-white animate-pulse`}>FAIL</span>;
      case 'WARNING':
        return <span className={`${baseClass} bg-retro-yellow text-black border-white`}>WARN</span>;
      default:
        return null;
    }
  };

  return (
    <div className="border-4 border-retro-dim bg-retro-dark shadow-pixel relative">
      <div className="p-2 border-b-4 border-retro-dim flex justify-end bg-retro-panel">
        <button className="bg-retro-cyan text-black text-[10px] font-pixel px-4 py-2 border-2 border-white hover:bg-white hover:scale-105 transition-transform shadow-[2px_2px_0_#000]">
          [ VIEW_ARCHIVE ]
        </button>
      </div>
      
      <div className="overflow-x-auto p-2">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="text-retro-purple text-lg font-pixel uppercase">
              <th className="p-4 border-b-4 border-retro-purple">ID_REF</th>
              <th className="p-4 border-b-4 border-retro-purple">INTEGRITY</th>
              <th className="p-4 border-b-4 border-retro-purple">STATE</th>
              <th className="p-4 border-b-4 border-retro-purple">T-MINUS</th>
              <th className="p-4 border-b-4 border-retro-purple text-right">ACTION</th>
            </tr>
          </thead>
          <tbody className="font-terminal text-xl">
            {audits.map((audit, idx) => (
              <tr key={audit.id} className={`group hover:bg-white/5 transition-colors border-b-2 border-dashed border-gray-800 ${idx % 2 === 0 ? 'bg-retro-panel/30' : 'bg-transparent'}`}>
                <td className="p-4 text-retro-cyan font-bold tracking-wider max-w-[200px] truncate">
                  <span className="text-gray-600 mr-2 opacity-50">&gt;</span>{audit.target}
                </td>
                <td className={`p-4 font-pixel text-sm ${getScoreColor(audit.score)}`}>
                  {audit.score}%
                </td>
                <td className="p-4">
                  {getStatusBadge(audit.status)}
                </td>
                <td className="p-4 text-gray-400">
                  {timeAgo(audit.timestamp)}
                </td>
                <td className="p-4 text-right">
                  <button 
                    onClick={() => navigate(`/report/${audit.id}`)}
                    className="bg-black text-retro-cyan border-2 border-retro-cyan font-pixel text-[10px] px-3 py-2 uppercase hover:bg-retro-cyan hover:text-black hover:shadow-[2px_2px_0_#fff] transition-all"
                  >
                    OPEN_FILE
                  </button>
                </td>
              </tr>
            ))}
            {audits.length === 0 && (
              <tr>
                <td colSpan={5} className="p-20 text-center text-gray-500 font-pixel text-xs border-4 border-dashed border-gray-800 m-4">
                  <Icons.Search className="w-12 h-12 mx-auto mb-4 opacity-20" />
                  NO_DATA_FOUND // INITIATE_SCAN
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};