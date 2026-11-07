import React, { useState, useEffect } from 'react';
import { ShieldCheck, Clock, AlertTriangle, ArrowRight, Sparkles, Building2, Utensils } from 'lucide-react';
import { playPop, playMoneyChime } from '../utils/audio';
import { DiwaliCountdown } from './DiwaliCountdown';

interface FestiveBannerProps {
  onStartClaim: () => void;
  bannerImage: string;
}

export const FestiveBanner: React.FC<FestiveBannerProps> = ({ onStartClaim, bannerImage }) => {
  const [timeLeft, setTimeLeft] = useState({ hours: 4, minutes: 28, seconds: 45 });
  const [liveDisbursed, setLiveDisbursed] = useState(148750);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 };
        if (prev.minutes > 0) return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        if (prev.hours > 0) return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        return prev;
      });
    }, 1000);

    // Subtle random counter tick to build fake urgency
    const counterInterval = setInterval(() => {
      setLiveDisbursed((prev) => prev + Math.floor(Math.random() * 250 + 50));
    }, 8000);

    return () => {
      clearInterval(timer);
      clearInterval(counterInterval);
    };
  }, []);

  return (
    <section className="relative overflow-hidden pt-6 pb-12 px-4 sm:px-6">
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-gradient-to-r from-amber-600/15 via-rose-600/15 to-purple-600/10 blur-3xl pointer-events-none rounded-full" />

      <div className="max-w-6xl mx-auto space-y-6 relative">
        {/* Dynamic Diwali Countdown to Tuesday Kitchen Reopening */}
        <DiwaliCountdown />

        {/* Urgent Announcement Ticker */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-3.5 bg-gradient-to-r from-amber-950/60 via-amber-900/40 to-rose-950/50 border border-amber-500/30 rounded-xl text-xs text-amber-200">
          <div className="flex items-center gap-2.5">
            <span className="flex h-2.5 w-2.5 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
            </span>
            <span className="font-semibold text-amber-300">SUNNY BHAIYA OFFICIAL DIRECTIVE:</span>
            <span className="text-amber-100/85">Mess closed from Saturday evening till Tuesday morning. Outside food permitted!</span>
          </div>

          <div className="flex items-center gap-4 text-amber-300/90 font-mono self-end sm:self-auto">
            <div className="flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-amber-400" />
              <span>Reimbursement Window:</span>
              <span className="text-amber-100 font-bold bg-amber-900/60 px-2 py-0.5 rounded border border-amber-500/30">
                {String(timeLeft.hours).padStart(2, '0')}:{String(timeLeft.minutes).padStart(2, '0')}:{String(timeLeft.seconds).padStart(2, '0')}
              </span>
            </div>
          </div>
        </div>

        {/* Hero Visual & Official Memo Container */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Left Column: Official Administrative Circular */}
          <div className="lg:col-span-7 bg-[#140e24] border border-amber-500/25 rounded-2xl p-6 sm:p-8 flex flex-col justify-between shadow-2xl relative overflow-hidden">
            {/* Subtle corner diya decorative icon */}
            <div className="absolute top-4 right-4 text-3xl opacity-80 select-none animate-diya">
              🪔
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-2 text-xs font-semibold text-amber-400 tracking-wider">
                <Building2 className="w-4 h-4 text-amber-400" />
                <span>CIRCULAR NO: SPG/DIWALI/2026-EXP-088</span>
                <span>·</span>
                <span className="text-amber-200/80">SADASHIV PG MANAGEMENT</span>
              </div>

              <h1 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight">
                Special Diwali Mess Closure & Food Bill Reimbursement Scheme
              </h1>

              <div className="p-4 bg-amber-950/40 border border-amber-500/20 rounded-xl space-y-2 text-sm text-amber-100/90 leading-relaxed">
                <p>
                  <strong className="text-amber-300">Respected Sadashiv PG Residents,</strong>
                </p>
                <p>
                  As notified by <strong>Sunny Bhaiya</strong> on the PG WhatsApp group, our kitchen mess cook Maharaj and staff have taken leave for Diwali celebrations. The mess will remain <strong className="text-rose-300">strictly closed from Saturday evening until Tuesday morning</strong>.
                </p>
                <p>
                  To prevent any hunger strikes or unauthorized midnight kettle cooking in rooms, Sunny Bhaiya has magnanimously decided to <span className="underline decoration-amber-400 underline-offset-2 font-semibold text-amber-300">reimburse 100% of all outside food orders</span> (Swiggy, Zomato, Biryani, or Dhaba) up to <strong className="text-emerald-300">₹1,500 per resident</strong>!
                </p>
              </div>

              <div className="space-y-2.5 text-xs text-amber-200/80 pt-1">
                <div className="flex items-start gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>Direct UPI Transfer straight from Sunny Bhaiya&apos;s personal current account within 60 seconds.</span>
                </div>
                <div className="flex items-start gap-2">
                  <Utensils className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                  <span>Applicable on Biryani, Butter Chicken, Paneer Thalis, Pizzas, and Festive Sweets (Kaju Katli/Gulab Jamun).</span>
                </div>
                <div className="flex items-start gap-2">
                  <AlertTriangle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                  <span>Mandatory audit questions required to filter out fake claims and Room 204 defaulters.</span>
                </div>
              </div>
            </div>

            <div className="pt-6 mt-6 border-t border-amber-500/20 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="text-xs text-amber-300/70">
                Authorized By: <strong className="text-amber-200">Sunny Bhaiya (Proprietor, Sadashiv PG)</strong>
              </div>

              <button
                onClick={() => {
                  playMoneyChime();
                  onStartClaim();
                }}
                className="w-full sm:w-auto px-6 py-3 bg-gradient-to-r from-amber-400 via-amber-300 to-yellow-400 hover:from-amber-300 hover:to-yellow-300 text-slate-950 font-bold rounded-xl shadow-lg shadow-amber-500/30 flex items-center justify-center gap-2 transition-all transform hover:scale-[1.02] active:scale-98 cursor-pointer"
              >
                <span>Fill Reimbursement Form</span>
                <ArrowRight className="w-4 h-4 text-slate-950" />
              </button>
            </div>
          </div>

          {/* Right Column: Festive Notice Board Card with Sadashiv PG branding */}
          <div className="lg:col-span-5 flex flex-col gap-4">
            <div className="relative rounded-2xl overflow-hidden border-2 border-amber-500/40 shadow-2xl group flex-1 min-h-[340px] bg-[#140e24] flex items-center justify-center">
              {/* Background courtyard photo */}
              <img
                src={bannerImage}
                alt="Sadashiv PG Diwali Courtyard Celebrations"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                referrerPolicy="no-referrer"
                onError={(e) => {
                  (e.target as HTMLElement).style.display = 'none';
                }}
              />

              {/* Scrim overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/70 to-slate-950/40 p-5 flex flex-col justify-between">
                {/* Official Hostel Notice Header Plaque */}
                <div className="bg-[#120a22]/90 border border-amber-400/50 rounded-xl p-3.5 backdrop-blur-md shadow-lg text-center space-y-1">
                  <div className="text-[10px] font-mono tracking-widest text-amber-300 font-bold uppercase">
                    ESTABLISHED MANY YEARS AGO · SUNNY MANAGEMENT
                  </div>
                  <div className="text-base font-extrabold text-amber-200 tracking-tight">
                    SADASHIV PG (BOYS & GIRLS)
                  </div>
                  <div className="text-[11px] text-amber-300/80 font-medium">
                    OFFICIAL HOSTEL NOTICE BOARD · RECEPTION
                  </div>
                </div>

                {/* Notice Details Banner on Plaque */}
                <div className="bg-gradient-to-r from-amber-950/90 via-[#221338]/95 to-amber-950/90 border border-amber-500/40 rounded-xl p-4 backdrop-blur-md space-y-2 text-left">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-bold text-amber-400 uppercase tracking-wide">
                      Diwali Utsav 2026 Memo
                    </span>
                    <span className="text-[10px] text-emerald-400 font-mono font-bold bg-emerald-950/80 px-2 py-0.5 rounded border border-emerald-500/30">
                      MESS ORDER
                    </span>
                  </div>

                  <div className="text-sm font-bold text-white leading-snug">
                    Mess Closed: Saturday Evening Till Tuesday Morning
                  </div>

                  <p className="text-xs text-amber-100/85 leading-relaxed">
                    Mess will remain shut from Saturday evening till Tuesday morning. All residents are directed to arrange outside food. Sunny Bhaiya has authorized outside meal reimbursement claims via this portal.
                  </p>

                  <div className="pt-1 flex items-center justify-between text-[10px] text-amber-300/70 border-t border-amber-500/20">
                    <span>By Order: Sunny (Proprietor)</span>
                    <span>Sadashiv PG · Central Wing</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Live Ticker KPI Strip */}
            <div className="grid grid-cols-2 gap-3 p-4 bg-[#140e24] border border-amber-500/20 rounded-xl">
              <div>
                <div className="text-[11px] text-amber-300/70 font-medium">Total Funds Disbursed</div>
                <div className="text-lg font-bold font-mono text-emerald-400 tabular-nums">
                  ₹{liveDisbursed.toLocaleString('en-IN')}
                </div>
              </div>
              <div>
                <div className="text-[11px] text-amber-300/70 font-medium">Claims Approved Today</div>
                <div className="text-xs sm:text-sm font-bold text-rose-300 leading-snug mt-0.5">
                  &ldquo;Didn&apos;t had time for Poor people will see tomorrow&rdquo;
                </div>
                <div className="text-[10px] text-amber-400/60 font-mono mt-0.5">
                  — Sunny Bhaiya
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
