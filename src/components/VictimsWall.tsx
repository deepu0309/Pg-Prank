import React, { useState } from 'react';
import { ShieldCheck, Search, Users, Sparkles, AlertTriangle } from 'lucide-react';
import { VictimRecord } from '../data/mockData';

interface VictimsWallProps {
  victims: VictimRecord[];
}

export const VictimsWall: React.FC<VictimsWallProps> = ({ victims }) => {
  const [search, setSearch] = useState('');

  const filteredVictims = victims.filter(
    (v) =>
      v.foodItem.toLowerCase().includes(search.toLowerCase()) ||
      v.roastComment.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <section id="victims-wall-section" className="py-12 px-4 sm:px-6">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-amber-500/20 pb-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-amber-400">
              <Users className="w-4 h-4 text-amber-400" />
              <span>LIVE SADASHIV PG CLAIM REGISTER</span>
            </div>
            <h3 className="text-2xl font-extrabold text-white tracking-tight mt-1">
              Anonymous Resident Claims & Reviews
            </h3>
            <p className="text-xs text-amber-200/70">
              Live anonymous submissions from Sadashiv PG residents claiming outside Diwali food expenses.
            </p>
          </div>

          {/* Search filter */}
          <div className="relative w-full sm:w-64">
            <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-amber-400/70" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search dish or food claim..."
              className="w-full bg-[#140e24] border border-amber-500/30 rounded-xl pl-8 pr-3 py-1.5 text-xs text-white placeholder-amber-200/40 focus:outline-none focus:border-amber-400"
            />
          </div>
        </div>

        {/* List of anonymous claims */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
          {filteredVictims.map((v) => (
            <div
              key={v.id}
              className="bg-[#140e24] border border-amber-500/25 rounded-xl p-4 flex flex-col justify-between shadow-lg hover:border-amber-400/60 transition-colors"
            >
              <div className="space-y-2">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-full bg-amber-950/80 border border-amber-500/30 flex items-center justify-center text-[11px] text-amber-300">
                      👤
                    </div>
                    <span className="text-sm font-semibold text-white">Anonymous Resident</span>
                  </div>
                  <span className="text-[11px] font-mono text-emerald-400 font-bold bg-emerald-950/60 border border-emerald-500/30 px-2 py-0.5 rounded">
                    ₹{v.amount}
                  </span>
                </div>

                <div className="text-xs text-amber-100/90 flex items-center gap-1.5">
                  <span className="text-amber-400">Order:</span>
                  <span className="truncate">{v.foodItem}</span>
                </div>

                <div className="text-[11px] text-amber-200/90 italic bg-amber-950/30 border border-amber-500/20 px-2.5 py-1.5 rounded-lg">
                  &ldquo;{v.roastComment}&rdquo;
                </div>
              </div>

              <div className="flex items-center justify-between pt-3 mt-3 border-t border-amber-500/15 text-[11px] text-amber-300/60">
                <span>{v.timeAgo}</span>
                <span className="text-amber-300/80 font-mono">Claim Submitted</span>
              </div>
            </div>
          ))}
        </div>

        {/* Sunny Bhaiya's Official PG Bylaws Box */}
        <div className="mt-8 p-5 bg-[#140e24] border border-amber-500/25 rounded-2xl space-y-3">
          <div className="flex items-center gap-2 text-xs font-bold text-amber-300">
            <AlertTriangle className="w-4 h-4 text-amber-400" />
            <span>SUNNY BHAIYA&apos;S PERMANENT SADASHIV PG HOUSE RULES:</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-amber-200/80">
            <div className="flex items-start gap-2">
              <span className="text-amber-400 font-bold">1.</span>
              <span>Rent must be paid on the 1st of every month, even if Diwali is going on.</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-amber-400 font-bold">2.</span>
              <span>Main gate closes at 10:30 PM. Delivery boys must yell from outside the gate.</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-amber-400 font-bold">3.</span>
              <span>Electric kettle cooking (Maggi, boiled eggs) strictly subject to ₹500 fine.</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-amber-400 font-bold">4.</span>
              <span>Mess Maharaj decision is final. No complaints accepted regarding dal thickness.</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
