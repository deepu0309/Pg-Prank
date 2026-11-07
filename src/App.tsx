import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { FestiveBanner } from './components/FestiveBanner';
import { ReimbursementForm, FormSubmissionData } from './components/ReimbursementForm';
import { VerificationLoader } from './components/VerificationLoader';
import { PrankRevealModal } from './components/PrankRevealModal';
import { Soundboard } from './components/Soundboard';
import { VictimsWall } from './components/VictimsWall';
import { INITIAL_VICTIMS, VictimRecord } from './data/mockData';

// Image paths generated from generate_image
const BANNER_IMAGE = '/src/assets/images/sadashiv_diwali_banner_1794068001107.jpg';
const SUNNY_IMAGE = '/src/assets/images/sunny_bhaiya_reaction_1794066941075.jpg';

export default function App() {
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [isVerifying, setIsVerifying] = useState(false);
  const [showPrankModal, setShowPrankModal] = useState(false);
  const [currentSubmission, setCurrentSubmission] = useState<FormSubmissionData | null>(null);
  const [victimsList, setVictimsList] = useState<VictimRecord[]>(INITIAL_VICTIMS);
  const [hasAddedToWall, setHasAddedToWall] = useState(false);

  const handleStartClaim = () => {
    const el = document.getElementById('claim-form-section');
    el?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleScrollToCircular = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleScrollToWall = () => {
    const el = document.getElementById('victims-wall-section');
    el?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSubmitClaim = (data: FormSubmissionData) => {
    setCurrentSubmission(data);
    setIsVerifying(true);
  };

  const handleVerificationComplete = () => {
    setIsVerifying(false);
    setShowPrankModal(true);
  };

  const handleAddToWall = () => {
    if (!currentSubmission || hasAddedToWall) return;

    const newVictim: VictimRecord = {
      id: `victim_${Date.now()}`,
      name: 'Anonymous Resident',
      roomNumber: '',
      amount: currentSubmission.claimAmount,
      foodItem: currentSubmission.foodItems,
      timeAgo: 'Just now',
      roastComment: `Awaited instant UPI cash reimbursement of ₹${currentSubmission.claimAmount}`,
    };

    setVictimsList([newVictim, ...victimsList]);
    setHasAddedToWall(true);
  };

  const handleResetPrank = () => {
    setShowPrankModal(false);
    setCurrentSubmission(null);
    setHasAddedToWall(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#0a0614] text-slate-100 flex flex-col selection:bg-amber-500 selection:text-slate-950">
      {/* Top Navigation */}
      <Navbar
        soundEnabled={soundEnabled}
        onToggleSound={() => setSoundEnabled(!soundEnabled)}
        onScrollToForm={handleStartClaim}
        onScrollToCircular={handleScrollToCircular}
        onScrollToWall={handleScrollToWall}
      />

      {/* Main Content Area */}
      <main className="flex-1 space-y-6">
        {/* Festive Diwali Banner & Official Circular */}
        <FestiveBanner
          onStartClaim={handleStartClaim}
          bannerImage={BANNER_IMAGE}
        />

        {/* 3-Tier Reimbursement Claim Form */}
        <ReimbursementForm onSubmitClaim={handleSubmitClaim} />

        {/* Interactive Sadashiv PG Soundboard */}
        <Soundboard />

        {/* Hall of Claims / Wall of Duped Residents */}
        <VictimsWall victims={victimsList} />
      </main>

      {/* Suspense Verification Loader Modal */}
      {isVerifying && currentSubmission && (
        <VerificationLoader
          amount={currentSubmission.claimAmount}
          residentName={currentSubmission.residentName}
          roomNumber={currentSubmission.roomNumber}
          onComplete={handleVerificationComplete}
        />
      )}

      {/* Climax Prank Reveal Modal */}
      {showPrankModal && currentSubmission && (
        <PrankRevealModal
          submissionData={currentSubmission}
          onReset={handleResetPrank}
          onAddToWall={handleAddToWall}
          hasAddedToWall={hasAddedToWall}
          sunnyImage={SUNNY_IMAGE}
        />
      )}

      {/* Quiet Footer */}
      <footer className="border-t border-amber-500/15 py-8 px-4 text-center text-xs text-amber-200/50 space-y-2">
        <p>
          Sadashiv PG · Managed by Sunny Management · All Rights Reserved (Except Food Reimbursements)
        </p>
        <p className="text-[11px] text-amber-300/40">
          Created for Diwali entertainment, laughs, and roommate banter. No real money was harmed in the making of this prank.
        </p>
      </footer>
    </div>
  );
}
