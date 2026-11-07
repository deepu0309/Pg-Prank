import React, { useState } from 'react';
import {
  FileText,
  CreditCard,
  UserCheck,
  Upload,
  CheckCircle,
  AlertCircle,
  HelpCircle,
  Sparkles,
  ArrowRight,
  ArrowLeft,
  Receipt,
  FileCheck,
} from 'lucide-react';
import { DUMMY_BILLS } from '../data/mockData';
import { playPop, playMoneyChime } from '../utils/audio';

export interface FormSubmissionData {
  residentName: string;
  roomNumber: string;
  sharingType: string;
  whatsapp: string;
  kettleAnswer: string;
  geyserStatus: string;
  missedMessDish: string;
  thaliStatus: string;
  platform: string;
  foodItems: string;
  claimAmount: number;
  rotiCount: number;
  orderedSweets: string;
  orderReason: string;
  upiId: string;
  sunnyLoyalty: string;
  billFileName: string;
}

interface ReimbursementFormProps {
  onSubmitClaim: (data: FormSubmissionData) => void;
}

export const ReimbursementForm: React.FC<ReimbursementFormProps> = ({ onSubmitClaim }) => {
  const [currentStep, setCurrentStep] = useState<1 | 2 | 3>(1);

  // Form State
  const [residentName, setResidentName] = useState('Rahul Deshmukh');
  const [roomNumber, setRoomNumber] = useState('204');
  const [sharingType, setSharingType] = useState('2-Sharing AC Room');
  const [whatsapp, setWhatsapp] = useState('9876543210');
  const [kettleAnswer, setKettleAnswer] = useState('Daily with room door bolted from inside');
  const [geyserStatus, setGeyserStatus] = useState('ON 24/7 because rent is all-inclusive');
  const [missedMessDish, setMissedMessDish] = useState('Yellow watery Dal that looks like watercolor paint');
  const [thaliStatus, setThaliStatus] = useState('There are 3 unwashed thalis currently under my study table');

  // Step 2 State
  const [platform, setPlatform] = useState('Zomato');
  const [foodItems, setFoodItems] = useState('Special Chicken Biryani, Butter Naan, and Gulab Jamun');
  const [claimAmount, setClaimAmount] = useState(780);
  const [rotiCount, setRotiCount] = useState(4);
  const [orderedSweets, setOrderedSweets] = useState('Yes, Diwali celebration is incomplete without sweets');
  const [orderReason, setOrderReason] = useState('Mess staff abandoned us before Diwali as per Sunny announcement');

  // Step 3 State
  const [upiId, setUpiId] = useState('rahul.pg@okhdfcbank');
  const [sunnyLoyalty, setSunnyLoyalty] = useState('YES, 1000% TRUE (Recommended for faster disbursal)');
  const [agreedTerms, setAgreedTerms] = useState(true);
  const [billFileName, setBillFileName] = useState('Zomato_Diwali_Invoice_849.pdf');
  const [customBillUploaded, setCustomBillUploaded] = useState(true);

  const handleNextStep = () => {
    playPop();
    if (currentStep === 1) {
      if (!residentName || !roomNumber) {
        alert('Please enter your name and room number to proceed with reimbursement verification.');
        return;
      }
      setCurrentStep(2);
    } else if (currentStep === 2) {
      setCurrentStep(3);
    }
  };

  const handlePrevStep = () => {
    playPop();
    if (currentStep > 1) {
      setCurrentStep((prev) => (prev - 1) as 1 | 2 | 3);
    }
  };

  const handleApplyDummyBill = (dummy: typeof DUMMY_BILLS[0]) => {
    playPop();
    setClaimAmount(dummy.amount);
    setFoodItems(dummy.items);
    setBillFileName(`${dummy.title.replace(/\s+/g, '_')}_Bill.pdf`);
    setCustomBillUploaded(true);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setBillFileName(file.name);
      setCustomBillUploaded(true);
      playMoneyChime();
    }
  };

  const handleFinalSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!agreedTerms) {
      alert('You must accept Sunny Bhaiya’s PG Terms & Conditions to claim reimbursement!');
      return;
    }
    if (!upiId) {
      alert('Please provide your UPI ID for direct bank credit.');
      return;
    }

    playMoneyChime();
    onSubmitClaim({
      residentName,
      roomNumber,
      sharingType,
      whatsapp,
      kettleAnswer,
      geyserStatus,
      missedMessDish,
      thaliStatus,
      platform,
      foodItems,
      claimAmount,
      rotiCount,
      orderedSweets,
      orderReason,
      upiId,
      sunnyLoyalty,
      billFileName,
    });
  };

  return (
    <section id="claim-form-section" className="py-10 px-4 sm:px-6 relative">
      <div className="max-w-4xl mx-auto">
        {/* Section Header */}
        <div className="text-center space-y-3 mb-8">
          <div className="inline-flex items-center gap-2 text-xs font-semibold text-amber-400 bg-amber-950/60 border border-amber-500/30 px-3.5 py-1.5 rounded-full">
            <Sparkles className="w-3.5 h-3.5" />
            <span>MANDATORY 3-TIER VERIFICATION AUDIT</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Sadashiv PG Food Compensation Application
          </h2>
          <p className="text-sm text-amber-200/80 max-w-xl mx-auto">
            Please answer all questions truthfully. Sunny Bhaiya and the PG Management will cross-verify with CCTV logs before dispatching your UPI payout.
          </p>
        </div>

        {/* Multi-Step Progress Tracker */}
        <div className="grid grid-cols-3 gap-2 sm:gap-4 mb-8">
          <div
            className={`p-3 rounded-xl border flex items-center gap-3 transition-colors ${
              currentStep === 1
                ? 'bg-amber-950/60 border-amber-400 text-amber-200'
                : currentStep > 1
                ? 'bg-[#181128] border-emerald-500/50 text-emerald-300'
                : 'bg-[#120c1f] border-slate-800 text-slate-500'
            }`}
          >
            <div
              className={`w-7 h-7 rounded-lg flex items-center justify-center text-xs font-bold shrink-0 ${
                currentStep > 1 ? 'bg-emerald-500 text-slate-950' : currentStep === 1 ? 'bg-amber-400 text-slate-950' : 'bg-slate-800 text-slate-400'
              }`}
            >
              {currentStep > 1 ? '✓' : '1'}
            </div>
            <div className="truncate">
              <div className="text-xs font-bold">Step 1</div>
              <div className="text-[11px] truncate hidden sm:block">Resident & Room Audit</div>
            </div>
          </div>

          <div
            className={`p-3 rounded-xl border flex items-center gap-3 transition-colors ${
              currentStep === 2
                ? 'bg-amber-950/60 border-amber-400 text-amber-200'
                : currentStep > 2
                ? 'bg-[#181128] border-emerald-500/50 text-emerald-300'
                : 'bg-[#120c1f] border-slate-800 text-slate-500'
            }`}
          >
            <div
              className={`w-7 h-7 rounded-lg flex items-center justify-center text-xs font-bold shrink-0 ${
                currentStep > 2 ? 'bg-emerald-500 text-slate-950' : currentStep === 2 ? 'bg-amber-400 text-slate-950' : 'bg-slate-800 text-slate-400'
              }`}
            >
              {currentStep > 2 ? '✓' : '2'}
            </div>
            <div className="truncate">
              <div className="text-xs font-bold">Step 2</div>
              <div className="text-[11px] truncate hidden sm:block">Food & Expense Details</div>
            </div>
          </div>

          <div
            className={`p-3 rounded-xl border flex items-center gap-3 transition-colors ${
              currentStep === 3
                ? 'bg-amber-950/60 border-amber-400 text-amber-200'
                : 'bg-[#120c1f] border-slate-800 text-slate-500'
            }`}
          >
            <div
              className={`w-7 h-7 rounded-lg flex items-center justify-center text-xs font-bold shrink-0 ${
                currentStep === 3 ? 'bg-amber-400 text-slate-950' : 'bg-slate-800 text-slate-400'
              }`}
            >
              3
            </div>
            <div className="truncate">
              <div className="text-xs font-bold">Step 3</div>
              <div className="text-[11px] truncate hidden sm:block">Bill Proofs & UPI Cash</div>
            </div>
          </div>
        </div>

        {/* Form Container */}
        <div className="bg-[#140e24] border border-amber-500/25 rounded-2xl p-6 sm:p-8 shadow-2xl relative overflow-hidden">
          <form onSubmit={handleFinalSubmit} className="space-y-6">
            {/* ================= STEP 1: RESIDENT & ROOM AUDIT ================= */}
            {currentStep === 1 && (
              <div className="space-y-6 animate-fadeIn">
                <div className="border-b border-amber-500/20 pb-4 flex items-center gap-2 text-amber-300 font-bold text-lg">
                  <UserCheck className="w-5 h-5 text-amber-400" />
                  <span>Section A: Sadashiv PG Resident Verification</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-amber-200/90 mb-1.5">
                      Full Name of Resident <span className="text-rose-400">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={residentName}
                      onChange={(e) => setResidentName(e.target.value)}
                      placeholder="e.g. Rahul Sharma"
                      className="w-full bg-[#0d091a] border border-amber-500/30 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-amber-400"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-amber-200/90 mb-1.5">
                      Room Number <span className="text-rose-400">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={roomNumber}
                      onChange={(e) => setRoomNumber(e.target.value)}
                      placeholder="e.g. 204 or 108"
                      className="w-full bg-[#0d091a] border border-amber-500/30 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-amber-400"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-amber-200/90 mb-1.5">
                      PG Room Category
                    </label>
                    <select
                      value={sharingType}
                      onChange={(e) => setSharingType(e.target.value)}
                      className="w-full bg-[#0d091a] border border-amber-500/30 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-amber-400"
                    >
                      <option value="Single Room Royal Suite">👑 Single Room Royal Suite (Sunny Bhaiya&apos;s pride, rent paid on 1st sharp)</option>
                      <option value="2-Sharing AC Deluxe">❄️ 2-Sharing AC Deluxe (One wants 16°C, roommate sleeps in heavy rajai)</option>
                      <option value="Triple Sharing Deluxe">⚡ Triple Sharing Deluxe (3 beds, 2 charging points, daily war for switchboard)</option>
                      <option value="Triple Sharing Harmony">🤝 Triple Sharing Harmony (1 studious guy, 1 gamer, 1 guy who is never in room)</option>
                      <option value="Secret Hookah Chamber">💨 Secret Hookah Chamber (Exhaust fan running 24/7, Odonil room spray on standby)</option>
                      <option value="Terrace Hookah Corner">☕ Terrace Hookah Corner (Sunny Bhaiya thinks we are doing evening meditation)</option>
                      <option value="3-Sharing Cooler Haven">💨 3-Sharing Cooler Haven (Cooler water pump died in May, prayers only)</option>
                      <option value="Balcony View Executive">🌿 Balcony View Executive (Sunny Bhaiya checks if wet jeans drip on his car)</option>
                      <option value="Corner Room 404">🎮 Corner Room 404 (Wi-Fi has 1 bar, 2 AM BGMI & coding battleground)</option>
                      <option value="Senior Resident Chamber">🎖️ Senior Resident Emeritus (Living here since 2019, guides juniors with respect)</option>
                      <option value="Warden Surveillance Zone">👀 Sunny Bhaiya Watchtower (Right opposite office, sneaking in after 10:30 PM is fatal)</option>
                      <option value="Secret Kettle Lounge">🍜 Secret Kettle Lounge (Room perpetually smells of Maggi masala & boiled eggs)</option>
                      <option value="Top Floor Barsati Penthouse">☀️ Top Floor Barsati Penthouse (Natural sauna in summer, ceiling drip in monsoon)</option>
                      <option value="Mattress Adjuster Suite">🛏️ Mattress Adjuster Suite (Friend came for 2 days, still living here after 6 months)</option>
                      <option value="Ground Floor Kitchen Wing">🍲 Ground Floor Kitchen Wing (Maharaj gives extra sabzi out of mutual respect)</option>
                      <option value="UPSC Library Sanctuary">📚 UPSC Library Sanctuary (Roommate studies 18 hrs, you watch reels on 5% volume)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-amber-200/90 mb-1.5">
                      WhatsApp Number (For Payment Ping)
                    </label>
                    <input
                      type="tel"
                      value={whatsapp}
                      onChange={(e) => setWhatsapp(e.target.value)}
                      placeholder="10-digit mobile number"
                      className="w-full bg-[#0d091a] border border-amber-500/30 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-amber-400"
                    />
                  </div>
                </div>

                {/* Hilarious PG Integrity Questions */}
                <div className="p-4 bg-amber-950/30 border border-amber-500/20 rounded-xl space-y-4">
                  <div className="text-xs font-bold text-amber-300 flex items-center gap-1.5">
                    <HelpCircle className="w-4 h-4 text-amber-400" />
                    <span>MANDATORY SUNNY BHAIYA DISCIPLINE QUESTIONS:</span>
                  </div>

                  <div>
                    <label className="block text-xs text-amber-100/90 mb-1.5">
                      1. Have you ever secretly used an electric kettle, induction, or heated hookah coal on a coil in your room?
                    </label>
                    <select
                      value={kettleAnswer}
                      onChange={(e) => setKettleAnswer(e.target.value)}
                      className="w-full bg-[#0d091a] border border-amber-500/30 rounded-lg px-3 py-2 text-xs text-amber-100"
                    >
                      <option value="Daily with room door bolted from inside">Daily with room door bolted and air freshener sprayed</option>
                      <option value="Never in my life (100% Lie)">Never in my life (100% Lie)</option>
                      <option value="Sunny Bhaiya caught me once and confiscated my Maggi packet">Sunny Bhaiya smelled the double-apple flavor and knocked furiously</option>
                      <option value="My roommate does it, I only eat the soup">My roommate does it, I only enjoy the clouds & Maggi soup</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs text-amber-100/90 mb-1.5">
                      2. What is the current status of the bathroom geyser in your room?
                    </label>
                    <select
                      value={geyserStatus}
                      onChange={(e) => setGeyserStatus(e.target.value)}
                      className="w-full bg-[#0d091a] border border-amber-500/30 rounded-lg px-3 py-2 text-xs text-amber-100"
                    >
                      <option value="ON 24/7 because rent is all-inclusive">ON 24/7 because rent is all-inclusive</option>
                      <option value="Turned OFF like a responsible sanskari tenant">Turned OFF like a responsible sanskari tenant</option>
                      <option value="Geyser doesn’t work, we take cold baths and cry">Geyser doesn’t work, we take cold baths and cry</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs text-amber-100/90 mb-1.5">
                      3. Which Sadashiv PG mess delicacy will you suffer without until Tuesday morning?
                    </label>
                    <select
                      value={missedMessDish}
                      onChange={(e) => setMissedMessDish(e.target.value)}
                      className="w-full bg-[#0d091a] border border-amber-500/30 rounded-lg px-3 py-2 text-xs text-amber-100"
                    >
                      <option value="Yellow watery Dal that looks like watercolor paint">Yellow watery Dal that looks like watercolor paint</option>
                      <option value="Rock-solid rubber Tandoori Rotis useful for self-defense">Rock-solid rubber Tandoori Rotis useful for self-defense</option>
                      <option value="Mystery Paneer that mysteriously dissolved into gravy">Mystery Paneer that mysteriously dissolved into gravy</option>
                      <option value="Nothing, I consider this mess closure a divine Diwali gift">Nothing, I consider this mess closure a divine Diwali gift</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs text-amber-100/90 mb-1.5">
                      4. Did you return your steel thali to the ground floor mess, or is it under your bed?
                    </label>
                    <select
                      value={thaliStatus}
                      onChange={(e) => setThaliStatus(e.target.value)}
                      className="w-full bg-[#0d091a] border border-amber-500/30 rounded-lg px-3 py-2 text-xs text-amber-100"
                    >
                      <option value="There are 3 unwashed thalis currently under my study table">There are 3 unwashed thalis currently under my study table</option>
                      <option value="Returned with dignity within 15 minutes of eating">Returned with dignity within 15 minutes of eating</option>
                      <option value="Maharaj wrongfully accused me of stealing a steel katori">Maharaj wrongfully accused me of stealing a steel katori</option>
                    </select>
                  </div>
                </div>

                <div className="flex justify-end pt-2">
                  <button
                    type="button"
                    onClick={handleNextStep}
                    className="px-6 py-3 bg-gradient-to-r from-amber-400 to-amber-500 text-slate-950 font-bold rounded-xl shadow-lg shadow-amber-500/25 flex items-center gap-2 hover:from-amber-300 hover:to-amber-400 transition-all cursor-pointer"
                  >
                    <span>Proceed to Food & Expense Details</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {/* ================= STEP 2: FOOD & EXPENSE DETAILS ================= */}
            {currentStep === 2 && (
              <div className="space-y-6 animate-fadeIn">
                <div className="border-b border-amber-500/20 pb-4 flex items-center gap-2 text-amber-300 font-bold text-lg">
                  <FileText className="w-5 h-5 text-amber-400" />
                  <span>Section B: Outside Food Order & Reimbursement Audit</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-amber-200/90 mb-1.5">
                      Food Delivery App / Source <span className="text-rose-400">*</span>
                    </label>
                    <select
                      value={platform}
                      onChange={(e) => setPlatform(e.target.value)}
                      className="w-full bg-[#0d091a] border border-amber-500/30 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-amber-400"
                    >
                      <option value="Zomato">Zomato Gold (Diwali Special Delivery)</option>
                      <option value="Swiggy">Swiggy One (Biryani Emergency)</option>
                      <option value="EatSure">EatSure / Behrouz Royal Feast</option>
                      <option value="Local Punjabi Dhaba">Local Dhaba Near Sadashiv PG Gate</option>
                      <option value="Dominos">Domino’s Pizza & Cheese Garlic Bread</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-amber-200/90 mb-1.5">
                      Dishes & Feast Description <span className="text-rose-400">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={foodItems}
                      onChange={(e) => setFoodItems(e.target.value)}
                      placeholder="e.g. Chicken Biryani, Butter Naan, Gulab Jamun"
                      className="w-full bg-[#0d091a] border border-amber-500/30 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-amber-400"
                    />
                  </div>
                </div>

                {/* Claim Amount Slider */}
                <div className="p-4 bg-amber-950/30 border border-amber-500/25 rounded-xl space-y-3">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-bold text-amber-200">
                      Total Reimbursement Claim Amount (₹)
                    </label>
                    <span className="text-xl font-extrabold font-mono text-emerald-400 bg-emerald-950/60 border border-emerald-500/30 px-3 py-1 rounded-lg">
                      ₹{claimAmount}
                    </span>
                  </div>

                  <input
                    type="range"
                    min="150"
                    max="1500"
                    step="10"
                    value={claimAmount}
                    onChange={(e) => setClaimAmount(Number(e.target.value))}
                    className="w-full accent-amber-400 cursor-pointer"
                  />

                  <div className="flex justify-between text-[11px] text-amber-300/60 font-mono">
                    <span>₹150 (Basic Maggi + Chai)</span>
                    <span>₹750 (Decent Thali + Biryani)</span>
                    <span>₹1,500 (Max Sunny Bhaiya Cap)</span>
                  </div>

                  {claimAmount > 1000 && (
                    <div className="text-[11px] text-amber-300 bg-amber-900/40 p-2 rounded-lg border border-amber-500/20">
                      ⚠️ Note: For claims over ₹1,000, Sunny Bhaiya will inspect if you shared chicken pieces with roommates from Room 201.
                    </div>
                  )}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-amber-200/90 mb-1.5">
                      Did you order Diwali Sweets (Mithai)?
                    </label>
                    <select
                      value={orderedSweets}
                      onChange={(e) => setOrderedSweets(e.target.value)}
                      className="w-full bg-[#0d091a] border border-amber-500/30 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-amber-400"
                    >
                      <option value="Yes, Diwali celebration is incomplete without sweets">Yes, Diwali celebration is incomplete without sweets</option>
                      <option value="Yes, 250g Kaju Katli exclusively for myself">Yes, 250g Kaju Katli exclusively for myself</option>
                      <option value="No, just plain food to survive till Tuesday">No, just plain food to survive till Tuesday</option>
                      <option value="I asked delivery boy for free soan papdi">I asked delivery boy for free soan papdi</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-amber-200/90 mb-1.5">
                      Number of Rotis / Naans Consumed ({rotiCount})
                    </label>
                    <input
                      type="range"
                      min="1"
                      max="12"
                      value={rotiCount}
                      onChange={(e) => setRotiCount(Number(e.target.value))}
                      className="w-full accent-amber-400 mt-3 cursor-pointer"
                    />
                    <div className="text-right text-[11px] text-amber-300/80 font-mono">
                      {rotiCount} {rotiCount === 1 ? 'Roti' : 'Rotis'}
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-amber-200/90 mb-1.5">
                    Official Justification for Outside Food Expense
                  </label>
                  <select
                    value={orderReason}
                    onChange={(e) => setOrderReason(e.target.value)}
                    className="w-full bg-[#0d091a] border border-amber-500/30 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-amber-400"
                  >
                    <option value="Mess staff abandoned us before Diwali as per Sunny announcement">
                      Mess staff abandoned us before Diwali as per Sunny announcement
                    </option>
                    <option value="Doctor advised protein intake after seeing Sadashiv mess dal">
                      Doctor advised urgent protein intake after seeing Sadashiv mess dal
                    </option>
                    <option value="Diwali festival demands royal feast on Sunny Bhaiya&apos;s budget">
                      Diwali festival demands royal feast on Sunny Bhaiya&apos;s budget
                    </option>
                    <option value="Roommate refused to cook, said Sunny Bhaiya will pay">
                      Roommate refused to cook, said Sunny Bhaiya will pay
                    </option>
                  </select>
                </div>

                <div className="flex justify-between pt-2">
                  <button
                    type="button"
                    onClick={handlePrevStep}
                    className="px-5 py-2.5 border border-amber-500/30 text-amber-200 rounded-xl hover:bg-amber-950/40 transition-colors flex items-center gap-1.5 text-xs font-semibold cursor-pointer"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    <span>Back</span>
                  </button>

                  <button
                    type="button"
                    onClick={handleNextStep}
                    className="px-6 py-3 bg-gradient-to-r from-amber-400 to-amber-500 text-slate-950 font-bold rounded-xl shadow-lg shadow-amber-500/25 flex items-center gap-2 hover:from-amber-300 hover:to-amber-400 transition-all cursor-pointer"
                  >
                    <span>Proceed to Proofs & UPI</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {/* ================= STEP 3: PROOFS & INSTANT UPI ================= */}
            {currentStep === 3 && (
              <div className="space-y-6 animate-fadeIn">
                <div className="border-b border-amber-500/20 pb-4 flex items-center gap-2 text-amber-300 font-bold text-lg">
                  <CreditCard className="w-5 h-5 text-amber-400" />
                  <span>Section C: Payment Proof Upload & UPI Disbursal</span>
                </div>

                {/* Upload Food Bill Section */}
                <div className="space-y-3">
                  <label className="block text-xs font-semibold text-amber-200">
                    Upload Food Bill / Screenshot Proof <span className="text-rose-400">*</span>
                  </label>

                  {/* Quick Preset Bills for convenience */}
                  <div className="space-y-2">
                    <div className="text-[11px] text-amber-300/80">
                      💡 Don’t have a screenshot ready? Click any pre-verified Diwali food bill below:
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                      {DUMMY_BILLS.map((b) => (
                        <button
                          key={b.id}
                          type="button"
                          onClick={() => handleApplyDummyBill(b)}
                          className={`p-2.5 rounded-lg border text-left transition-all cursor-pointer ${
                            claimAmount === b.amount
                              ? 'bg-amber-950/70 border-amber-400 text-amber-100 ring-1 ring-amber-400'
                              : 'bg-[#0d091a] border-amber-500/30 text-amber-200/80 hover:border-amber-400/60'
                          }`}
                        >
                          <div className="text-xs font-bold text-amber-300">{b.title}</div>
                          <div className="text-[11px] text-emerald-400 font-mono font-semibold">₹{b.amount}</div>
                          <div className="text-[10px] text-amber-200/60 truncate mt-0.5">{b.restaurant}</div>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* File Dropzone */}
                  <label className="border-2 border-dashed border-amber-500/40 hover:border-amber-400 rounded-xl p-5 flex flex-col items-center justify-center gap-2 bg-[#0d091a]/80 cursor-pointer transition-colors text-center">
                    <input
                      type="file"
                      accept="image/*,.pdf"
                      onChange={handleFileUpload}
                      className="hidden"
                    />
                    <Upload className="w-8 h-8 text-amber-400" />
                    <div className="text-xs font-semibold text-amber-200">
                      {billFileName ? (
                        <span className="text-emerald-400 flex items-center justify-center gap-1.5">
                          <CheckCircle className="w-4 h-4 inline" /> Attached: {billFileName}
                        </span>
                      ) : (
                        'Click to browse or drop food delivery invoice / bill'
                      )}
                    </div>
                    <div className="text-[10px] text-amber-300/60">
                      Supports JPG, PNG, PDF receipts (Max 10MB)
                    </div>
                  </label>

                  {customBillUploaded && (
                    <div className="p-3 bg-emerald-950/40 border border-emerald-500/30 rounded-xl flex items-center justify-between text-xs text-emerald-300">
                      <div className="flex items-center gap-2">
                        <FileCheck className="w-4 h-4 text-emerald-400" />
                        <span>Document Status: Ready for Sunny Bhaiya’s automated approval</span>
                      </div>
                      <span className="font-mono text-emerald-200 font-bold">₹{claimAmount}</span>
                    </div>
                  )}
                </div>

                {/* Resident UPI ID Input */}
                <div>
                  <label className="block text-xs font-medium text-amber-200/90 mb-1.5">
                    Your UPI ID for Direct Cash Reimbursement <span className="text-rose-400">*</span>
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      required
                      value={upiId}
                      onChange={(e) => setUpiId(e.target.value)}
                      placeholder="e.g. rahul@oksbi or 9876543210@paytm"
                      className="w-full bg-[#0d091a] border border-amber-500/30 rounded-xl pl-3.5 pr-28 py-2.5 text-sm text-white focus:outline-none focus:border-amber-400 font-mono"
                    />
                    <div className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[10px] font-mono text-amber-300 bg-amber-950/80 px-2 py-1 rounded border border-amber-500/30">
                      INSTANT UPI
                    </div>
                  </div>
                  <p className="text-[11px] text-amber-300/60 mt-1">
                    Funds will be sent directly from Sadashiv PG Management HDFC Account.
                  </p>
                </div>

                {/* Sunny Loyalty Check */}
                <div>
                  <label className="block text-xs font-medium text-amber-200/90 mb-1.5">
                    Is Sunny Bhaiya the kindest, most generous PG Owner in Delhi/NCR?
                  </label>
                  <select
                    value={sunnyLoyalty}
                    onChange={(e) => setSunnyLoyalty(e.target.value)}
                    className="w-full bg-[#0d091a] border border-amber-500/30 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-amber-400"
                  >
                    <option value="YES, 1000% TRUE (Recommended for faster disbursal)">
                      YES, 1000% TRUE (Recommended for faster disbursal)
                    </option>
                    <option value="HE IS A SAINT SENT FROM THE HEAVENS">
                      HE IS A SAINT SENT FROM THE HEAVENS
                    </option>
                    <option value="I WILL NEVER COMPLAIN ABOUT MESS DAL EVER AGAIN">
                      I WILL NEVER COMPLAIN ABOUT MESS DAL EVER AGAIN
                    </option>
                    <option value="PLEASE JUST TRANSFER MY REIMBURSEMENT MONEY">
                      PLEASE JUST TRANSFER MY REIMBURSEMENT MONEY
                    </option>
                  </select>
                </div>

                {/* Terms and Conditions Checkbox */}
                <div className="p-3.5 bg-amber-950/40 border border-amber-500/30 rounded-xl flex items-start gap-3">
                  <input
                    type="checkbox"
                    id="terms-check"
                    checked={agreedTerms}
                    onChange={(e) => setAgreedTerms(e.target.checked)}
                    className="mt-1 accent-amber-400 cursor-pointer h-4 w-4"
                  />
                  <label htmlFor="terms-check" className="text-xs text-amber-100/90 leading-relaxed cursor-pointer select-none">
                    I certify that this food expense occurred strictly because the Sadashiv PG mess is closed from Saturday evening till Tuesday morning. I agree that if my bill is found fraudulent, Sunny Bhaiya has full authority to turn off my room Wi-Fi and keep my security deposit.
                  </label>
                </div>

                <div className="flex justify-between pt-2">
                  <button
                    type="button"
                    onClick={handlePrevStep}
                    className="px-5 py-2.5 border border-amber-500/30 text-amber-200 rounded-xl hover:bg-amber-950/40 transition-colors flex items-center gap-1.5 text-xs font-semibold cursor-pointer"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    <span>Back</span>
                  </button>

                  <button
                    type="submit"
                    className="px-8 py-3.5 bg-gradient-to-r from-emerald-500 via-emerald-400 to-teal-400 hover:from-emerald-400 hover:to-teal-300 text-slate-950 font-extrabold rounded-xl shadow-xl shadow-emerald-500/25 flex items-center gap-2 transition-all transform hover:scale-[1.02] active:scale-98 cursor-pointer"
                  >
                    <Receipt className="w-4 h-4 text-slate-950" />
                    <span>Authorize & Disburse ₹{claimAmount} Now</span>
                  </button>
                </div>
              </div>
            )}
          </form>
        </div>
      </div>
    </section>
  );
};
