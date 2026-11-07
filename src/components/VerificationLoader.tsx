import React, { useState, useEffect } from 'react';
import { Loader2, CheckCircle2, ShieldAlert } from 'lucide-react';
import { VERIFICATION_STEPS } from '../data/mockData';
import { playPop, playMoneyChime } from '../utils/audio';

interface VerificationLoaderProps {
  amount: number;
  residentName: string;
  roomNumber: string;
  onComplete: () => void;
}

export const VerificationLoader: React.FC<VerificationLoaderProps> = ({
  amount,
  residentName,
  roomNumber,
  onComplete,
}) => {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);

  useEffect(() => {
    // Step progression every 1.1s
    const interval = setInterval(() => {
      setCurrentStepIndex((prev) => {
        if (prev < VERIFICATION_STEPS.length - 1) {
          playPop();
          return prev + 1;
        } else {
          clearInterval(interval);
          setTimeout(() => {
            playMoneyChime();
            onComplete();
          }, 800);
          return prev;
        }
      });
    }, 1100);

    return () => clearInterval(interval);
  }, [onComplete]);

  const progressPercentage = Math.round(((currentStepIndex + 1) / VERIFICATION_STEPS.length) * 100);

  return (
    <div className="fixed inset-0 z-50 bg-[#07040f]/90 backdrop-blur-xl flex items-center justify-center p-4">
      <div className="w-full max-w-lg bg-[#140e24] border border-amber-500/30 rounded-2xl p-6 sm:p-8 shadow-2xl space-y-6 relative overflow-hidden">
        {/* Glow ambient background */}
        <div className="absolute top-0 right-0 w-48 h-48 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

        {/* Header */}
        <div className="text-center space-y-2">
          <div className="inline-flex items-center gap-2 text-xs font-semibold text-amber-300 bg-amber-950/60 border border-amber-500/30 px-3 py-1 rounded-full">
            <Loader2 className="w-3.5 h-3.5 animate-spin text-amber-400" />
            <span>AUDITING SADASHIV PG REIMBURSEMENT</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
            Verifying Claim for {residentName} ({roomNumber})
          </h3>
          <p className="text-xs text-amber-200/70">
            Amount: <span className="font-mono font-bold text-emerald-400">₹{amount}</span> · Sunny Bhaiya Automated Fast-Track Clearing
          </p>
        </div>

        {/* Progress Bar */}
        <div className="space-y-1.5">
          <div className="flex justify-between text-xs text-amber-300/80 font-mono">
            <span>Audit Progress</span>
            <span className="font-bold text-amber-200">{progressPercentage}%</span>
          </div>
          <div className="w-full bg-[#0d091a] h-2.5 rounded-full overflow-hidden border border-amber-500/20">
            <div
              className="bg-gradient-to-r from-amber-500 via-yellow-400 to-emerald-400 h-full rounded-full transition-all duration-500 ease-out"
              style={{ width: `${progressPercentage}%` }}
            />
          </div>
        </div>

        {/* Active Checklist Items */}
        <div className="space-y-3 bg-[#0d091a]/80 border border-amber-500/20 rounded-xl p-4 text-xs">
          {VERIFICATION_STEPS.map((step, idx) => {
            const isFinished = idx < currentStepIndex;
            const isCurrent = idx === currentStepIndex;
            const isPending = idx > currentStepIndex;

            return (
              <div
                key={idx}
                className={`flex items-start gap-3 transition-opacity ${
                  isPending ? 'opacity-30' : isCurrent ? 'opacity-100 text-amber-100' : 'opacity-85 text-emerald-300'
                }`}
              >
                {isFinished ? (
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                ) : isCurrent ? (
                  <Loader2 className="w-4 h-4 text-amber-400 animate-spin shrink-0 mt-0.5" />
                ) : (
                  <div className="w-4 h-4 rounded-full border border-slate-700 shrink-0 mt-0.5" />
                )}
                <div>
                  <div className={`font-semibold ${isCurrent ? 'text-amber-300 font-bold' : ''}`}>
                    {step.title}
                  </div>
                  <div className="text-[11px] text-amber-300/60 mt-0.5">{step.detail}</div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="text-center text-[11px] text-amber-300/50 flex items-center justify-center gap-1.5">
          <ShieldAlert className="w-3.5 h-3.5" />
          <span>Sadashiv PG Server · 256-Bit SSL Encrypted by Sunny Bhaiya</span>
        </div>
      </div>
    </div>
  );
};
