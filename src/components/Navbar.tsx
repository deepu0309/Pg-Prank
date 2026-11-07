import React from 'react';
import { Sparkles, Volume2, VolumeX } from 'lucide-react';
import { playPop } from '../utils/audio';

interface NavbarProps {
  soundEnabled: boolean;
  onToggleSound: () => void;
  onScrollToForm: () => void;
  onScrollToCircular: () => void;
  onScrollToWall: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  soundEnabled,
  onToggleSound,
  onScrollToForm,
  onScrollToCircular,
  onScrollToWall,
}) => {
  return (
    <header className="sticky top-0 z-40 bg-[#0d091a]/90 backdrop-blur-md border-b border-amber-500/20 text-white">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-8 px-4 sm:px-6 py-3.5">
        {/* Zone 1: Single text wordmark */}
        <div className="flex items-center gap-2.5 whitespace-nowrap shrink-0">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-amber-500 to-rose-600 flex items-center justify-center text-white font-bold shadow-md shadow-amber-500/20">
            🪔
          </div>
          <span className="text-lg font-bold tracking-tight text-amber-200">
            Sadashiv PG <span className="text-xs text-amber-400/80 font-normal ml-1">Portal</span>
          </span>
        </div>

        {/* Zone 2: 4 clean single-line text navigation links */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-amber-100/75">
          <button
            onClick={() => {
              playPop();
              onScrollToCircular();
            }}
            className="hover:text-amber-300 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
          >
            Notice Circular
          </button>
          <button
            onClick={() => {
              playPop();
              onScrollToForm();
            }}
            className="hover:text-amber-300 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
          >
            Reimbursement Form
          </button>
          <button
            onClick={() => {
              playPop();
              onScrollToWall();
            }}
            className="hover:text-amber-300 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
          >
            Anonymous Reviews
          </button>
          <div className="flex items-center gap-1.5 text-xs text-amber-400/90 bg-amber-950/40 border border-amber-500/30 px-3 py-1 rounded-md">
            <span>Mess Closed</span>
            <span aria-hidden="true">·</span>
            <span className="text-amber-200 font-semibold">Sat Evening – Tue Morning</span>
          </div>
        </nav>

        {/* Zone 3: 1 primary action */}
        <div className="flex items-center gap-2.5 shrink-0">
          <button
            onClick={() => {
              onToggleSound();
              playPop();
            }}
            aria-label={soundEnabled ? 'Mute prank sound effects' : 'Unmute prank sound effects'}
            className="p-2 rounded-lg bg-amber-950/50 hover:bg-amber-900/60 border border-amber-500/30 text-amber-300 transition-colors text-xs flex items-center gap-1.5 cursor-pointer"
            title="Toggle Sound Effects"
          >
            {soundEnabled ? <Volume2 className="w-4 h-4 text-emerald-400" /> : <VolumeX className="w-4 h-4 text-amber-400/60" />}
            <span className="hidden sm:inline text-xs font-mono">{soundEnabled ? 'SFX ON' : 'SFX OFF'}</span>
          </button>

          <button
            onClick={() => {
              playPop();
              onScrollToForm();
            }}
            className="px-4 py-2 text-xs font-semibold text-slate-950 bg-gradient-to-r from-amber-400 via-yellow-300 to-amber-500 rounded-lg hover:from-amber-300 hover:to-yellow-400 shadow-md shadow-amber-500/25 transition-all transform active:scale-95 whitespace-nowrap shrink-0 flex items-center gap-1.5 cursor-pointer"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-950 fill-amber-950" />
            <span>Claim Refund</span>
          </button>
        </div>
      </div>
    </header>
  );
};
