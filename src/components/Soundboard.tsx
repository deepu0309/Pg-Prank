import React from 'react';
import { Volume2, Sparkles, Flame, Bell, Coffee, AlertCircle } from 'lucide-react';
import {
  playSunnyKnock,
  playRocketWhoosh,
  playSadTrombone,
  playMoneyChime,
  playCookerWhistle,
  playCrackerBurst,
} from '../utils/audio';

export const Soundboard: React.FC = () => {
  const sounds = [
    {
      title: 'Sunny’s 11 PM Door Knock',
      subtitle: '“Gate band karo, light band karo!”',
      icon: Bell,
      action: playSunnyKnock,
      color: 'from-amber-600/30 to-amber-900/40 border-amber-500/40 text-amber-200',
    },
    {
      title: 'Diwali Rocket Whoosh & Bang',
      subtitle: 'Celebrating Sunny’s money flying away',
      icon: RocketIcon,
      action: playRocketWhoosh,
      color: 'from-rose-600/30 to-rose-900/40 border-rose-500/40 text-rose-200',
    },
    {
      title: 'Reimbursement Denied Trombone',
      subtitle: 'Official soundtrack of empty wallet',
      icon: AlertCircle,
      action: playSadTrombone,
      color: 'from-purple-600/30 to-purple-900/40 border-purple-500/40 text-purple-200',
    },
    {
      title: 'Fake UPI Disbursal Chime',
      subtitle: 'Sweet sound of false hope',
      icon: Sparkles,
      action: playMoneyChime,
      color: 'from-emerald-600/30 to-emerald-900/40 border-emerald-500/40 text-emerald-200',
    },
    {
      title: 'Tuesday Mess Cooker Whistle',
      subtitle: 'Maharaj boiling yellow dal & cold poha',
      icon: Coffee,
      action: playCookerWhistle,
      color: 'from-yellow-600/30 to-yellow-900/40 border-yellow-500/40 text-yellow-200',
    },
    {
      title: '1,000-Wali Cracker Ladi',
      subtitle: 'Dhamaka in Sadashiv PG corridor',
      icon: Flame,
      action: playCrackerBurst,
      color: 'from-orange-600/30 to-orange-900/40 border-orange-500/40 text-orange-200',
    },
  ];

  return (
    <section className="py-8 px-4 sm:px-6">
      <div className="max-w-4xl mx-auto space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-amber-500/20 pb-3">
          <div className="flex items-center gap-2">
            <Volume2 className="w-5 h-5 text-amber-400" />
            <h3 className="text-xl font-bold text-white tracking-tight">
              Sadashiv PG Corridor Soundboard
            </h3>
          </div>
          <span className="text-xs text-amber-300/70">
            Click any button to play authentic PG sound effects
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
          {sounds.map((sound, idx) => {
            const Icon = sound.icon;
            return (
              <button
                key={idx}
                onClick={sound.action}
                className={`p-4 rounded-xl border bg-gradient-to-br ${sound.color} hover:brightness-125 transition-all transform active:scale-95 text-left cursor-pointer group shadow-lg`}
              >
                <div className="flex items-center justify-between mb-1.5">
                  <Icon className="w-4 h-4 text-amber-300 group-hover:scale-110 transition-transform" />
                  <span className="text-[10px] font-mono tracking-wider text-amber-300/70">PLAY SFX</span>
                </div>
                <div className="text-xs font-bold text-white leading-tight">
                  {sound.title}
                </div>
                <div className="text-[11px] text-amber-200/70 mt-1 truncate">
                  {sound.subtitle}
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
};

function RocketIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      width="24"
      height="24"
      stroke="currentColor"
      strokeWidth="2"
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z" />
      <path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z" />
      <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0" />
      <path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5" />
    </svg>
  );
}
