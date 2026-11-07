import React, { useEffect, useState } from 'react';
import { triggerDiwaliConfetti } from '../utils/confetti';
import {
  Copy,
  Check,
  RotateCcw,
  Volume2,
  MessageCircle,
  Sparkles,
  Flame,
  Award,
} from 'lucide-react';
import { playCrackerBurst, playSadTrombone, playSunnyKnock, playPop } from '../utils/audio';
import { FormSubmissionData } from './ReimbursementForm';

interface PrankRevealModalProps {
  submissionData: FormSubmissionData;
  onReset: () => void;
  onAddToWall: () => void;
  hasAddedToWall: boolean;
  sunnyImage: string;
}

export const PrankRevealModal: React.FC<PrankRevealModalProps> = ({
  submissionData,
  onReset,
  onAddToWall,
  hasAddedToWall,
  sunnyImage,
}) => {
  const [copied, setCopied] = useState(false);
  const [activeMemeIndex, setActiveMemeIndex] = useState(0);

  const memes = [
    {
      title: 'Paisa Hi Paisa Hoga... In Dreams!',
      quote: `“Sunny Bhaiya didn't even fix the washroom door latch, and you thought he will pay ₹${submissionData.claimAmount} for your ${submissionData.foodItems}?!”`,
      memeTag: '😂 0% REIMBURSEMENT RATE',
    },
    {
      title: 'Sadashiv Mess Maharaj Update',
      quote: '“Tuesday subah 7:30 AM sharp cold yellow poha with exactly 2 peanuts will be served. No butter chicken reimbursement sanctioned.”',
      memeTag: '🪔 TUESDAY MORNING SPECIAL',
    },
    {
      title: 'CCTV Audit Verdict',
      quote: `“Sadashiv PG electricity bill exceeds rent margin. Geyser status was detected ON. Claim disqualified for Diwali fun!”`,
      memeTag: '🔌 GEYSER OVERHEAT PENALTY',
    },
  ];

  useEffect(() => {
    // Fire festive fireworks confetti
    triggerDiwaliConfetti();

    // Sound sequence: Cracker burst then funny sad trombone!
    playCrackerBurst();
    const timer = setTimeout(() => {
      playSadTrombone();
    }, 900);

    return () => clearTimeout(timer);
  }, []);

  const shareText = `🚨 Bhai suno! Sunny Bhaiya ne Diwali mess band hone par outside food reimbursement ka official form nikala hai! Maine abhi Sadashiv PG portal pe ₹${submissionData.claimAmount} claim kiya hai, tum log bhi jaldi apna bill upload kar do before budget khatam ho jaye: ${window.location.href} 💸🔥🪔`;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(shareText);
    setCopied(true);
    playPop();
    setTimeout(() => setCopied(false), 2500);
  };

  const handleWhatsAppShare = () => {
    playPop();
    const url = `https://api.whatsapp.com/send?text=${encodeURIComponent(shareText)}`;
    window.open(url, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 bg-[#06030c]/95 backdrop-blur-xl overflow-y-auto p-4 sm:p-6 flex items-center justify-center">
      <div className="w-full max-w-2xl bg-[#140e24] border-2 border-amber-500/40 rounded-3xl p-6 sm:p-8 shadow-2xl relative space-y-6 text-center my-8">
        {/* Glow halo */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-40 bg-gradient-to-r from-amber-500/20 via-rose-500/20 to-purple-500/20 blur-3xl pointer-events-none rounded-full" />

        {/* Big Festive Climax Headline */}
        <div className="space-y-2 relative">
          <div className="inline-flex items-center gap-2 text-xs font-bold text-amber-300 bg-amber-950/80 border border-amber-500/40 px-4 py-1.5 rounded-full shadow-inner">
            <Flame className="w-3.5 h-3.5 text-amber-400" />
            <span>SADASHIV PG DIWALI SPECIAL ANNOUNCEMENT</span>
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
          </div>

          <h2 className="text-3xl sm:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-yellow-200 to-amber-400 tracking-tight leading-tight">
            HAPPY DIWALI! 🎉🪔✨
          </h2>

          <div className="text-2xl sm:text-3xl font-black text-rose-400 tracking-wide">
            PSYCH, NO REIMBURSEMENT TODAY! 🤣💸❌
          </div>
        </div>

        {/* Sunny Bhaiya Image & Roast Card */}
        <div className="relative bg-[#0d091a] border border-amber-500/30 rounded-2xl p-5 flex flex-col sm:flex-row items-center gap-5 text-left">
          <div className="relative shrink-0">
            <div className="w-28 h-28 sm:w-32 sm:h-32 rounded-2xl overflow-hidden border-2 border-amber-400 shadow-xl group bg-gradient-to-br from-amber-600 to-rose-700 flex items-center justify-center text-4xl">
              <img
                src={sunnyImage}
                alt="Sunny Bhaiya laughing heartily"
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                referrerPolicy="no-referrer"
                onError={(e) => {
                  (e.target as HTMLElement).style.display = 'none';
                }}
              />
              <span className="select-none pointer-events-none">😎</span>
            </div>
            <div className="absolute -bottom-2 -right-2 bg-rose-600 text-white text-[10px] font-black px-2 py-0.5 rounded-full shadow">
              NO REFUND
            </div>
          </div>

          <div className="space-y-2 flex-1">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-amber-300">SUNNY BHAIYA SAYS:</span>
              <button
                onClick={() => playSunnyKnock()}
                className="text-[11px] text-amber-400/90 hover:text-amber-200 flex items-center gap-1 bg-amber-950/60 border border-amber-500/30 px-2 py-0.5 rounded cursor-pointer"
              >
                <Volume2 className="w-3 h-3" />
                <span>Hear Sunny&apos;s Door Knock</span>
              </button>
            </div>

            <p className="text-base font-bold text-amber-100 leading-snug">
              &ldquo;Arey {submissionData.residentName} (Room {submissionData.roomNumber})! Paisa ped pe ugta hai kya?!&rdquo;
            </p>

            <p className="text-xs text-amber-200/80 leading-relaxed">
              &ldquo;You really thought Sunny Bhaiya is going to transfer <strong className="text-emerald-300 font-mono">₹{submissionData.claimAmount}</strong> to <code className="text-amber-300">{submissionData.upiId}</code> for your {submissionData.foodItems}?! I didn&apos;t even recharge the second water tanker this month! 😂&rdquo;
            </p>

            <div className="text-[11px] text-rose-300 font-medium">
              Notice: Kitchen mess will reopen <strong>Tuesday morning 7:30 AM</strong> sharp. Eat outside on your own expense!
            </div>
          </div>
        </div>

        {/* Interactive Meme Quotes Switcher */}
        <div className="p-4 bg-amber-950/30 border border-amber-500/20 rounded-xl space-y-2 text-left">
          <div className="flex items-center justify-between text-xs text-amber-300 font-bold">
            <span>{memes[activeMemeIndex].memeTag}</span>
            <div className="flex gap-1">
              {memes.map((_, i) => (
                <button
                  key={i}
                  onClick={() => {
                    playPop();
                    setActiveMemeIndex(i);
                  }}
                  className={`w-2.5 h-2.5 rounded-full transition-all cursor-pointer ${
                    activeMemeIndex === i ? 'bg-amber-400 w-5' : 'bg-slate-700 hover:bg-slate-500'
                  }`}
                />
              ))}
            </div>
          </div>
          <div className="text-sm font-semibold text-amber-200">
            {memes[activeMemeIndex].title}
          </div>
          <p className="text-xs text-amber-100/80 italic">
            {memes[activeMemeIndex].quote}
          </p>
        </div>

        {/* Share with Sadashiv PG WhatsApp Group Action */}
        <div className="space-y-3 pt-2">
          <div className="text-xs font-bold text-amber-300">
            SPREAD THE PRANK IN SADASHIV PG WHATSAPP GROUP! 🔥
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <button
              onClick={handleWhatsAppShare}
              className="px-5 py-3.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl shadow-lg shadow-emerald-600/30 flex items-center justify-center gap-2 text-sm transition-all transform active:scale-95 cursor-pointer"
            >
              <MessageCircle className="w-4 h-4 fill-white" />
              <span>Share on WhatsApp Group</span>
            </button>

            <button
              onClick={handleCopyLink}
              className="px-5 py-3.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold rounded-xl shadow-lg shadow-amber-500/30 flex items-center justify-center gap-2 text-sm transition-all transform active:scale-95 cursor-pointer"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-950" /> : <Copy className="w-4 h-4" />}
              <span>{copied ? 'Prank Link Copied!' : 'Copy Prank Message'}</span>
            </button>
          </div>

          {/* Wall of duped residents action */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2 border-t border-amber-500/20 text-xs">
            {!hasAddedToWall ? (
              <button
                onClick={() => {
                  playPop();
                  onAddToWall();
                }}
                className="text-amber-300 hover:text-amber-200 underline decoration-amber-400 flex items-center gap-1.5 cursor-pointer font-medium"
              >
                <Award className="w-4 h-4 text-amber-400" />
                <span>Add Claim to Anonymous Reviews Feed</span>
              </button>
            ) : (
              <span className="text-emerald-400 flex items-center gap-1">
                <Check className="w-4 h-4" /> Added to Anonymous Claims Feed!
              </span>
            )}

            <button
              onClick={() => {
                playPop();
                onReset();
              }}
              className="text-slate-400 hover:text-slate-200 flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Prank Another Roommate</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
