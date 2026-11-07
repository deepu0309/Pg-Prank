import React, { useState, useEffect } from 'react';
import { Clock, Utensils, Sparkles, Coffee } from 'lucide-react';
import { playCookerWhistle, playPop } from '../utils/audio';

interface TimeRemaining {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  isExpired: boolean;
}

function getNextTuesdayMorning(): Date {
  const now = new Date();
  const target = new Date(now);

  // 0 = Sun, 1 = Mon, 2 = Tue, 3 = Wed, 4 = Thu, 5 = Fri, 6 = Sat
  const currentDay = now.getDay();
  let daysUntilTuesday = (2 - currentDay + 7) % 7;

  // If today is Tuesday, check if 7:30 AM has passed
  if (daysUntilTuesday === 0) {
    const today730 = new Date(now);
    today730.setHours(7, 30, 0, 0);
    if (now >= today730) {
      daysUntilTuesday = 7;
    }
  }

  target.setDate(now.getDate() + daysUntilTuesday);
  target.setHours(7, 30, 0, 0);
  return target;
}

function calculateTimeRemaining(targetDate: Date): TimeRemaining {
  const diff = targetDate.getTime() - Date.now();

  if (diff <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0, isExpired: true };
  }

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((diff / (1000 * 60)) % 60);
  const seconds = Math.floor((diff / 1000) % 60);

  return { days, hours, minutes, seconds, isExpired: false };
}

export const DiwaliCountdown: React.FC = () => {
  const [targetDate] = useState<Date>(() => getNextTuesdayMorning());
  const [time, setTime] = useState<TimeRemaining>(() => calculateTimeRemaining(targetDate));

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(calculateTimeRemaining(targetDate));
    }, 1000);

    return () => clearInterval(interval);
  }, [targetDate]);

  return (
    <div className="relative overflow-hidden rounded-2xl border-2 border-amber-500/40 bg-gradient-to-r from-[#170e28] via-[#221338] to-[#170e28] p-5 sm:p-6 shadow-2xl">
      {/* Decorative ambient lights */}
      <div className="absolute -top-12 -left-12 w-32 h-32 bg-amber-500/20 rounded-full blur-2xl pointer-events-none" />
      <div className="absolute -bottom-12 -right-12 w-32 h-32 bg-rose-500/20 rounded-full blur-2xl pointer-events-none" />

      <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
        {/* Left Column: Heading & Context */}
        <div className="space-y-2 max-w-md">
          <div className="inline-flex items-center gap-2 text-xs font-bold text-amber-300 bg-amber-950/80 border border-amber-500/30 px-3 py-1 rounded-full">
            <span className="text-base select-none animate-diya">🪔</span>
            <span>DIWALI FESTIVE KITCHEN REOPENING COUNTDOWN</span>
          </div>

          <h3 className="text-xl sm:text-2xl font-black text-white tracking-tight flex items-center gap-2">
            <span>Mess Reopens Tuesday 7:30 AM</span>
            <Utensils className="w-5 h-5 text-amber-400 shrink-0" />
          </h3>

          <p className="text-xs text-amber-100/80 leading-relaxed">
            Kitchen staff and Maharaj are on Diwali holiday from Saturday evening. Until this countdown hits zero, order from outside and submit your bills for Sunny Bhaiya&apos;s 100% reimbursement!
          </p>
        </div>

        {/* Right Column: 4-Segment Countdown Clock */}
        <div className="flex flex-col items-center sm:items-end gap-3 shrink-0">
          <div className="grid grid-cols-4 gap-2 sm:gap-3">
            {/* Days */}
            <div className="flex flex-col items-center bg-[#0d071a]/90 border border-amber-500/35 rounded-xl px-3 sm:px-4 py-2.5 min-w-[64px] sm:min-w-[76px] shadow-lg">
              <span className="text-2xl sm:text-4xl font-extrabold font-mono text-amber-300 tabular-nums">
                {String(time.days).padStart(2, '0')}
              </span>
              <span className="text-[10px] font-semibold tracking-wider text-amber-200/60 uppercase mt-0.5">
                Days
              </span>
            </div>

            {/* Hours */}
            <div className="flex flex-col items-center bg-[#0d071a]/90 border border-amber-500/35 rounded-xl px-3 sm:px-4 py-2.5 min-w-[64px] sm:min-w-[76px] shadow-lg">
              <span className="text-2xl sm:text-4xl font-extrabold font-mono text-amber-300 tabular-nums">
                {String(time.hours).padStart(2, '0')}
              </span>
              <span className="text-[10px] font-semibold tracking-wider text-amber-200/60 uppercase mt-0.5">
                Hours
              </span>
            </div>

            {/* Minutes */}
            <div className="flex flex-col items-center bg-[#0d071a]/90 border border-amber-500/35 rounded-xl px-3 sm:px-4 py-2.5 min-w-[64px] sm:min-w-[76px] shadow-lg">
              <span className="text-2xl sm:text-4xl font-extrabold font-mono text-amber-300 tabular-nums">
                {String(time.minutes).padStart(2, '0')}
              </span>
              <span className="text-[10px] font-semibold tracking-wider text-amber-200/60 uppercase mt-0.5">
                Mins
              </span>
            </div>

            {/* Seconds */}
            <div className="flex flex-col items-center bg-[#0d071a]/90 border border-amber-400 rounded-xl px-3 sm:px-4 py-2.5 min-w-[64px] sm:min-w-[76px] shadow-lg shadow-amber-500/10">
              <span className="text-2xl sm:text-4xl font-extrabold font-mono text-emerald-400 tabular-nums">
                {String(time.seconds).padStart(2, '0')}
              </span>
              <span className="text-[10px] font-semibold tracking-wider text-emerald-300/70 uppercase mt-0.5">
                Secs
              </span>
            </div>
          </div>

          <div className="flex items-center justify-between w-full text-[11px] text-amber-300/80">
            <span className="flex items-center gap-1">
              <Sparkles className="w-3 h-3 text-amber-400" />
              <span>Target: Tuesday 07:30 AM IST</span>
            </span>

            <button
              onClick={() => {
                playPop();
                playCookerWhistle();
              }}
              className="text-amber-400 hover:text-amber-200 flex items-center gap-1 bg-amber-950/60 border border-amber-500/30 px-2 py-0.5 rounded cursor-pointer transition-colors"
              title="Test Kitchen Pressure Cooker Whistle"
            >
              <Coffee className="w-3 h-3" />
              <span>Whistle Maharaj</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
