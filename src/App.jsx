import React, { useState } from 'react';
import { 
  Home, BookOpen, PiggyBank, PieChart, MessageSquare, 
  ArrowUpRight, ChevronRight, CheckCircle2, Send, 
  AlertCircle, ArrowLeft, RefreshCw, Wallet, Info
} from 'lucide-react';

export default function App() {
  // Navigation state
  const [activeTab, setActiveTab] = useState('home');
  const [subView, setSubView] = useState(null); // 'transferSuccess' | 'quiz'

  // Global Financial & User State matching UI screenshots
  const [balances, setBalances] = useState({
    mainWallet: 1450.50,
    savingsPocket: 820.00,
    emergencyFund: 2100.00,
    schoolFees: 600.00,
    xp: 420
  });

  // Quiz state
  const [selectedQuizOption, setSelectedQuizOption] = useState(1); // 0-indexed option 1 is correct in screen
  const [quizSubmitted, setQuizSubmitted] = useState(true);

  // Chat Coach State
  const [chatMessages, setChatMessages] = useState([
    {
      sender: 'ai',
      text: 'Hi Nangolo, let\'s start small. Explore budgeting and savings ideas you can adapt to everyday life in Windhoek. Money questions are welcome here.'
    }
  ]);
  const [inputQuery, setInputQuery] = useState('');

  // Handle Save NAD 20 Action
  const handleSave20 = () => {
    if (balances.mainWallet < 20) return;
    setBalances(prev => ({
      ...prev,
      mainWallet: prev.mainWallet - 20,
      savingsPocket: prev.savingsPocket + 20
    }));
    setSubView('transferSuccess');
  };

  const handleSendChat = (textToSend) => {
    const q = textToSend || inputQuery;
    if (!q.trim()) return;

    const newMsgs = [...chatMessages, { sender: 'user', text: q }];
    setChatMessages(newMsgs);
    setInputQuery('');

    // Simulated supportive AI coach response tailored for Windhoek everyday finances
    setTimeout(() => {
      setChatMessages(prev => [
        ...prev,
        {
          sender: 'ai',
          text: `Good question! In Windhoek, planning for ${q.toLowerCase().includes('taxi') ? 'taxi fares' : 'irregular income'} works best when you set aside small daily amounts in your Savings Pocket as soon as earnings arrive.`
        }
      ]);
    }, 600);
  };

  return (
    <div className="min-h-screen bg-slate-200 text-slate-800 flex items-center justify-center p-0 sm:p-4 font-sans">
      
      {/* Phone Simulator Frame */}
      <div className="w-full max-w-[390px] h-screen sm:h-[844px] bg-slate-50 sm:rounded-[40px] shadow-2xl border-0 sm:border-[8px] border-slate-900 flex flex-col overflow-hidden relative">
        
        {/* Status Bar */}
        <div className="pt-3 px-7 pb-2 flex justify-between items-center text-xs font-semibold text-slate-900 bg-white select-none z-30">
          <span>9:41</span>
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 bg-slate-900 rounded-full inline-block" />
            <span className="w-2.5 h-2.5 bg-slate-900 rounded-full inline-block" />
            <span className="w-4 h-2.5 border border-slate-900 rounded-sm inline-block relative">
              <span className="absolute inset-0.5 bg-slate-900" />
            </span>
          </div>
        </div>

        {/* Top Header Bar */}
        <div className="px-5 py-2.5 bg-white border-b border-slate-100 flex items-center justify-between z-20">
          <div className="flex items-center gap-2">
            <span className="font-extrabold text-teal-800 text-base tracking-tight">FNB</span>
            <span className="text-xs text-slate-500 font-medium border-l border-slate-300 pl-2">Money Confidence</span>
          </div>
          <div className="w-7 h-7 rounded-full bg-teal-100 text-teal-800 flex items-center justify-center text-xs font-bold">
            N
          </div>
        </div>

        {/* Main Dynamic View Scroll Area */}
        <div className="flex-1 overflow-y-auto px-4 py-3 space-y-4 custom-scrollbar bg-slate-50">
          
          {/* SubView: Transfer Success Screen */}
          {subView === 'transferSuccess' ? (
            <div className="space-y-4 py-2 animate-fadeIn">
              <button 
                onClick={() => setSubView(null)} 
                className="flex items-center gap-1 text-xs text-slate-500 font-medium"
              >
                <ArrowLeft className="w-3.5 h-3.5" /> Savings transfer
              </button>

              <div className="text-center space-y-3 pt-2">
                <div className="w-14 h-14 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-slate-900">A small step, saved.</h3>
                  <p className="text-2xl font-extrabold text-teal-800 mt-1">NAD 20.00</p>
                  <p className="text-xs text-slate-500 mt-1 max-w-[260px] mx-auto">
                    Successfully moved from your Main Wallet to your Savings Pocket.
                  </p>
                </div>
              </div>

              {/* Transfer Details Card */}
              <div className="bg-white p-4 rounded-2xl border border-slate-200/80 space-y-2.5 text-xs">
                <div className="flex justify-between text-slate-400 font-medium text-[11px]">
                  <span>Transfer type</span>
                  <span className="text-slate-800 font-semibold">Between your accounts</span>
                </div>
                <hr className="border-slate-100" />
                <div className="flex justify-between items-center">
                  <div>
                    <p className="font-bold text-slate-800">Main Wallet</p>
                    <p className="text-[10px] text-slate-400">Available now: NAD {balances.mainWallet.toFixed(2)}</p>
                  </div>
                  <span className="font-bold text-slate-700">- NAD 20.00</span>
                </div>
                <hr className="border-slate-100" />
                <div className="flex justify-between items-center">
                  <div>
                    <p className="font-bold text-slate-800">Savings Pocket</p>
                    <p className="text-[10px] text-slate-400">Balance now: NAD {balances.savingsPocket.toFixed(2)}</p>
                  </div>
                  <span className="font-bold text-teal-700">+ NAD 20.00</span>
                </div>
              </div>

              {/* Goal Progress Card */}
              <div className="bg-slate-100/80 p-4 rounded-2xl space-y-1.5 border border-slate-200/60">
                <div className="flex justify-between items-center text-xs">
                  <span className="font-bold text-slate-800">Small Business Seed</span>
                  <span className="font-bold text-slate-800">NAD {balances.savingsPocket.toFixed(0)}</span>
                </div>
                <p className="text-[10px] text-slate-400">of NAD 3,000 · 28%</p>
                <p className="text-[10px] text-slate-500 pt-1">This goal is your Savings Pocket balance.</p>
              </div>

              <div className="flex items-start gap-2 text-[10px] text-slate-400 px-1">
                <Info className="w-3.5 h-3.5 text-slate-400 shrink-0 mt-0.5" />
                <span>This is an internal transfer, not new income. Your Emergency Fund stays at NAD 2,100.00.</span>
              </div>

              <button 
                onClick={() => setSubView(null)}
                className="w-full py-3 bg-teal-800 hover:bg-teal-900 text-white font-bold rounded-xl text-xs transition"
              >
                Back to Home
              </button>
            </div>
          ) : subView === 'quiz' ? (
            /* SubView: Quiz Screen */
            <div className="space-y-4 py-1 animate-fadeIn">
              <button 
                onClick={() => setSubView(null)} 
                className="flex items-center gap-1 text-xs text-slate-500 font-medium"
              >
                <ArrowLeft className="w-3.5 h-3.5" /> Intro to Micro-Budgeting
              </button>

              <div className="flex justify-between items-center text-xs text-slate-400">
                <span>Question 2 of 2</span>
                <span className="text-teal-700 font-medium underline">Answer review</span>
              </div>

              <h3 className="text-base font-bold text-slate-900 leading-snug">
                Why track daily costs like taxi fares?
              </h3>

              {/* Quiz Options */}
              <div className="space-y-2.5">
                {[
                  'To stop spending money completely',
                  'Small daily costs add up over a month',
                  'Because the bank requires it'
                ].map((opt, idx) => {
                  const isSelected = selectedQuizOption === idx;
                  return (
                    <div 
                      key={idx}
                      onClick={() => setSelectedQuizOption(idx)}
                      className={`p-3.5 rounded-xl border text-xs font-medium cursor-pointer transition flex items-center justify-between ${
                        isSelected 
                          ? 'border-emerald-600 bg-emerald-50/50 text-slate-900 font-semibold' 
                          : 'border-slate-200 bg-white text-slate-700'
                      }`}
                    >
                      <span>{opt}</span>
                      <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                        isSelected ? 'border-emerald-600 bg-emerald-600' : 'border-slate-300'
                      }`}>
                        {isSelected && <div className="w-1.5 h-1.5 bg-white rounded-full" />}
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Feedback Box */}
              {selectedQuizOption === 1 && (
                <div className="p-4 rounded-2xl bg-slate-100/90 border border-slate-200 space-y-2 text-xs">
                  <div className="flex items-center gap-1.5 text-emerald-800 font-bold">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>That's right.</span>
                  </div>
                  <p className="text-slate-600 leading-relaxed text-[11px]">
                    Recording small costs helps you see patterns and plan for essentials. A NAD 15 taxi fare is worth tracking, not judging.
                  </p>
                  <p className="text-slate-500 text-[10px]">
                    Budgeting guidelines can bend to fit your income and needs. There's no single right split for everyone.
                  </p>
                </div>
              )}

              <div className="flex items-start gap-1.5 text-[10px] text-slate-400">
                <Info className="w-3.5 h-3.5 text-slate-400 shrink-0 mt-0.5" />
                <span>Earn +100 learning XP once when you complete this module. You can retry to practise, with no extra XP or credit-score effect.</span>
              </div>

              <div className="space-y-2">
                <button 
                  onClick={() => {
                    setSubView(null);
                    setActiveTab('academy');
                  }}
                  className="w-full py-3 bg-teal-800 hover:bg-teal-900 text-white font-bold rounded-xl text-xs transition"
                >
                  Continue
                </button>
                <button 
                  onClick={() => setSelectedQuizOption(1)}
                  className="w-full text-center text-xs text-teal-800 font-semibold hover:underline"
                >
                  Review and try again
                </button>
              </div>
            </div>
          ) : (
            /* Default Tab Views */
            <>
              {/* TAB 1: HOME */}
              {activeTab === 'home' && (
                <div className="space-y-4">
                  <div>
                    <p className="text-[11px] text-slate-400 font-medium">Windhoek, Namibia</p>
                    <h2 className="text-lg font-extrabold text-slate-900 leading-tight">Good morning, Nangolo</h2>
                    <p className="text-xs text-slate-500">Small steps toward money confidence.</p>
                  </div>

                  {/* Main Wallet Card */}
                  <div className="bg-teal-900 text-white p-4 rounded-2xl shadow-lg relative overflow-hidden space-y-3">
                    <div className="flex justify-between items-start">
                      <span className="text-[11px] text-teal-200 font-medium">Main Wallet</span>
                      <Wallet className="w-4 h-4 text-teal-300" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-extrabold">NAD {balances.mainWallet.toFixed(2)}</h3>
                      <p className="text-[10px] text-teal-200 mt-0.5">Available to use</p>
                    </div>

                    <button 
                      onClick={handleSave20}
                      className="w-full py-2.5 bg-teal-600 hover:bg-teal-700 text-white text-xs font-bold rounded-xl flex items-center justify-center gap-1.5 shadow-md transition"
                    >
                      <ArrowUpRight className="w-4 h-4" /> Save NAD 20
                    </button>
                    <p className="text-[10px] text-center text-teal-200/90 font-medium">To Savings Pocket · Small Business Seed</p>
                  </div>

                  {/* Quick Sub-Balances Row */}
                  <div className="grid grid-cols-2 gap-3">
                    <div className="bg-white p-3 rounded-xl border border-slate-200/80">
                      <p className="text-[10px] text-slate-400 font-medium">Savings Pocket</p>
                      <p className="text-sm font-bold text-slate-900 mt-0.5">NAD {balances.savingsPocket.toFixed(2)}</p>
                    </div>
                    <div className="bg-white p-3 rounded-xl border border-slate-200/80">
                      <p className="text-[10px] text-slate-400 font-medium">Emergency Fund</p>
                      <p className="text-sm font-bold text-slate-900 mt-0.5">NAD {balances.emergencyFund.toFixed(2)}</p>
                    </div>
                  </div>

                  {/* Spending Insight Card */}
                  <div className="bg-white p-4 rounded-2xl border border-slate-200/80 space-y-1.5">
                    <div className="flex items-center gap-1.5 text-xs text-slate-500 font-medium">
                      <PieChart className="w-3.5 h-3.5 text-slate-400" /> A clearer view of spending
                    </div>
                    <p className="text-xs text-slate-700 leading-snug">
                      <span className="font-bold">NAD 307.50</span> went out across your 3 recent recorded expenses.
                    </p>
                    <button 
                      onClick={() => setActiveTab('budget')} 
                      className="text-xs text-teal-800 font-bold hover:underline flex items-center gap-0.5 pt-1"
                    >
                      See the breakdown →
                    </button>
                  </div>

                  {/* Next Small Step Lesson Card */}
                  <div className="bg-slate-100/90 p-4 rounded-2xl border border-slate-200/60 space-y-1.5">
                    <span className="text-[10px] uppercase font-bold text-teal-800 tracking-wider">Your Next Small Step</span>
                    <h4 className="text-xs font-bold text-slate-900">Make everyday costs easier to see.</h4>
                    <button 
                      onClick={() => setSubView('quiz')}
                      className="text-xs text-teal-800 font-bold hover:underline flex items-center gap-1 pt-1"
                    >
                      Intro to Micro-Budgeting <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                    <p className="text-[10px] text-slate-400">Academy · 4-minute lesson</p>
                  </div>
                </div>
              )}

              {/* TAB 2: ACADEMY */}
              {activeTab === 'academy' && (
                <div className="space-y-4">
                  <div>
                    <p className="text-[11px] text-slate-400 font-medium">Learn at your pace</p>
                    <h2 className="text-lg font-extrabold text-slate-900 leading-tight">A little learning. More confidence.</h2>
                    <p className="text-xs text-slate-500">Practical ideas for everyday money.</p>
                  </div>

                  {/* XP Journey Pill Card */}
                  <div className="bg-white p-3.5 rounded-2xl border border-slate-200/80 flex items-center justify-between">
                    <div>
                      <p className="text-xs font-bold text-slate-900">Your learning journey</p>
                      <p className="text-[10px] text-slate-400 mt-0.5">Learning and habit progress, not a credit score.</p>
                    </div>
                    <span className="bg-teal-50 text-teal-800 font-extrabold text-xs px-2.5 py-1 rounded-full border border-teal-200/60">
                      {balances.xp} XP
                    </span>
                  </div>

                  <h4 className="text-xs font-bold text-slate-900 pt-1">Start with the everyday</h4>

                  {/* Lesson Cards */}
                  <div className="space-y-3">
                    {/* Module 1 */}
                    <div className="bg-white p-4 rounded-2xl border border-slate-200/80 space-y-3">
                      <div>
                        <h4 className="text-xs font-bold text-slate-900">Intro to Micro-Budgeting</h4>
                        <p className="text-[10px] text-slate-400 mt-0.5">Beginner · 4 min · 2 questions</p>
                        <p className="text-[10px] text-teal-700 font-medium mt-1">+100 learning XP on first completion only</p>
                      </div>
                      <button 
                        onClick={() => setSubView('quiz')}
                        className="w-full py-2.5 bg-teal-800 hover:bg-teal-900 text-white font-bold rounded-xl text-xs flex items-center justify-center gap-1 transition"
                      >
                        <BookOpen className="w-3.5 h-3.5" /> Start learning
                      </button>
                    </div>

                    {/* Module 2 */}
                    <div className="bg-white p-4 rounded-2xl border border-slate-200/80 flex items-center justify-between hover:border-slate-300 transition cursor-pointer">
                      <div>
                        <h4 className="text-xs font-bold text-slate-900">Understanding Compound Interest</h4>
                        <p className="text-[10px] text-slate-400 mt-0.5">Intermediate · 3 min</p>
                        <p className="text-[10px] text-teal-700 font-medium mt-1">+150 learning XP · once per module</p>
                      </div>
                      <ChevronRight className="w-4 h-4 text-slate-400" />
                    </div>

                    {/* Module 3 */}
                    <div className="bg-white p-4 rounded-2xl border border-slate-200/80 flex items-center justify-between hover:border-slate-300 transition cursor-pointer">
                      <div>
                        <h4 className="text-xs font-bold text-slate-900">Building Credit Without Debt Traps</h4>
                        <p className="text-[10px] text-slate-400 mt-0.5">Advanced · 4 min</p>
                        <p className="text-[10px] text-teal-700 font-medium mt-1">+200 learning XP · once per module</p>
                      </div>
                      <ChevronRight className="w-4 h-4 text-slate-400" />
                    </div>
                  </div>

                  <div className="flex items-start gap-1.5 text-[10px] text-slate-400 pt-1">
                    <Info className="w-3.5 h-3.5 text-slate-400 shrink-0 mt-0.5" />
                    <span>XP recognises learning, not money. Retake any lesson to practise; it won't earn the reward again or affect credit eligibility.</span>
                  </div>
                </div>
              )}

              {/* TAB 3: SAVER */}
              {activeTab === 'saver' && (
                <div className="space-y-4">
                  <div>
                    <p className="text-[11px] text-slate-400 font-medium">Your goals, your pace</p>
                    <h2 className="text-lg font-extrabold text-slate-900 leading-tight">Make room for tomorrow</h2>
                    <p className="text-xs text-slate-500">Every amount you set aside counts.</p>
                  </div>

                  {/* Personal Goals Stack */}
                  <div className="space-y-3">
                    {/* Goal 1 */}
                    <div className="bg-white p-4 rounded-2xl border border-slate-200/80 space-y-2">
                      <div className="flex items-center gap-2">
                        <PiggyBank className="w-4 h-4 text-teal-700" />
                        <div>
                          <h4 className="text-xs font-bold text-slate-900">Small Business Seed</h4>
                          <p className="text-[10px] text-slate-400">Your Savings Pocket</p>
                        </div>
                      </div>
                      <div className="flex justify-between items-baseline pt-1">
                        <span className="text-base font-extrabold text-slate-900">NAD {balances.savingsPocket.toFixed(2)}</span>
                        <span className="text-[10px] text-slate-400">of NAD 3,000</span>
                      </div>
                      <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                        <div className="bg-teal-700 h-full" style={{ width: `${(balances.savingsPocket / 3000) * 100}%` }} />
                      </div>
                    </div>

                    {/* Goal 2 */}
                    <div className="bg-white p-4 rounded-2xl border border-slate-200/80 space-y-2">
                      <div className="flex items-center gap-2">
                        <ShieldIcon className="w-4 h-4 text-teal-700" />
                        <div>
                          <h4 className="text-xs font-bold text-slate-900">Emergency Rain Fund</h4>
                          <p className="text-[10px] text-slate-400">Your Emergency Fund</p>
                        </div>
                      </div>
                      <div className="flex justify-between items-baseline pt-1">
                        <span className="text-base font-extrabold text-slate-900">NAD {balances.emergencyFund.toFixed(2)}</span>
                        <span className="text-[10px] text-slate-400">of NAD 5,000</span>
                      </div>
                      <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                        <div className="bg-teal-700 h-full" style={{ width: `${(balances.emergencyFund / 5000) * 100}%` }} />
                      </div>
                    </div>

                    {/* Goal 3 */}
                    <div className="bg-white p-4 rounded-2xl border border-slate-200/80 space-y-2">
                      <div className="flex items-center gap-2">
                        <GraduationCap className="w-4 h-4 text-teal-700" />
                        <div>
                          <h4 className="text-xs font-bold text-slate-900">School Fees Support</h4>
                          <p className="text-[10px] text-slate-400">Separate school-fees goal</p>
                        </div>
                      </div>
                      <div className="flex justify-between items-baseline pt-1">
                        <span className="text-base font-extrabold text-slate-900">NAD {balances.schoolFees.toFixed(2)}</span>
                        <span className="text-[10px] text-slate-400">of NAD 1,200</span>
                      </div>
                      <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                        <div className="bg-teal-700 h-full" style={{ width: `${(balances.schoolFees / 1200) * 100}%` }} />
                      </div>
                    </div>
                  </div>

                  <div className="flex items-start gap-1 text-[10px] text-slate-400">
                    <Info className="w-3.5 h-3.5 text-slate-400 shrink-0 mt-0.5" />
                    <span>Small Business Seed is your Savings Pocket balance, not extra money on top of it.</span>
                  </div>

                  {/* Community Savings / Stokvel */}
                  <div className="bg-white p-4 rounded-2xl border border-slate-200/80 space-y-2 pt-3">
                    <span className="text-[9px] uppercase font-bold text-slate-400 tracking-wider">Community Savings</span>
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="text-xs font-bold text-slate-900">Oshakati Family Stokvel</h4>
                        <p className="text-[10px] text-slate-400">4 members · Monthly rotation</p>
                      </div>
                      <span className="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2 py-0.5 rounded-full">
                        You paid
                      </span>
                    </div>
                    <div className="text-xs text-slate-600 font-semibold pt-1">
                      NAD 1,500 / 2,000 collected
                    </div>
                    <p className="text-[10px] text-slate-400">3 × NAD 500 received · 1 pending</p>
                  </div>
                </div>
              )}

              {/* TAB 4: BUDGET */}
              {activeTab === 'budget' && (
                <div className="space-y-4">
                  <div>
                    <p className="text-[11px] text-slate-400 font-medium">Know where it went</p>
                    <h2 className="text-lg font-extrabold text-slate-900 leading-tight">Your money, in view</h2>
                    <p className="text-xs text-slate-500">A snapshot of your recorded activity.</p>
                  </div>

                  {/* Outflow Breakdown Summary */}
                  <div className="bg-white p-4 rounded-2xl border border-slate-200/80 space-y-3">
                    <p className="text-[10px] text-slate-400 font-medium">Recent recorded outflows</p>
                    <h3 className="text-xl font-extrabold text-slate-900">NAD 307.50</h3>

                    <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden flex">
                      <div style={{ width: '78%' }} className="bg-teal-700" />
                      <div style={{ width: '6%' }} className="bg-teal-500" />
                      <div style={{ width: '16%' }} className="bg-teal-300" />
                    </div>

                    <div className="space-y-1.5 text-xs pt-1">
                      <div className="flex justify-between text-slate-700">
                        <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-teal-700" /> Groceries</span>
                        <span className="font-bold">NAD 242.50</span>
                      </div>
                      <div className="flex justify-between text-slate-700">
                        <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-teal-500" /> Transport</span>
                        <span className="font-bold">NAD 15.00</span>
                      </div>
                      <div className="flex justify-between text-slate-700">
                        <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-teal-300" /> Airtime</span>
                        <span className="font-bold">NAD 50.00</span>
                      </div>
                    </div>
                    <p className="text-[10px] text-slate-400 pt-1">Based on 3 expenses below. Not a complete month or a forecast.</p>
                  </div>

                  {/* Recent Activity List */}
                  <div className="space-y-2">
                    <div className="flex justify-between items-center text-xs">
                      <span className="font-bold text-slate-900">Recent activity</span>
                      <span className="text-[10px] text-slate-400">4 records</span>
                    </div>

                    {/* Record 1 */}
                    <div className="p-3 bg-white rounded-xl border border-slate-200/80 flex justify-between items-center text-xs">
                      <div className="flex items-center gap-2.5">
                        <div className="w-7 h-7 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 text-[10px]">🚖</div>
                        <div>
                          <p className="font-bold text-slate-900">Taxi Fare - Windhoek West</p>
                          <p className="text-[10px] text-slate-400">Today 08:30 · Transport</p>
                        </div>
                      </div>
                      <span className="font-bold text-slate-800">– NAD 15.00</span>
                    </div>

                    {/* Record 2 */}
                    <div className="p-3 bg-white rounded-xl border border-slate-200/80 flex justify-between items-center text-xs">
                      <div className="flex items-center gap-2.5">
                        <div className="w-7 h-7 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 text-[10px]">🛒</div>
                        <div>
                          <p className="font-bold text-slate-900">Groceries - Pick n Pay</p>
                          <p className="text-[10px] text-slate-400">Yesterday · Groceries</p>
                        </div>
                      </div>
                      <span className="font-bold text-slate-800">– NAD 242.50</span>
                    </div>

                    {/* Record 3 */}
                    <div className="p-3 bg-white rounded-xl border border-slate-200/80 flex justify-between items-center text-xs">
                      <div className="flex items-center gap-2.5">
                        <div className="w-7 h-7 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-700 text-[10px]">↙</div>
                        <div>
                          <p className="font-bold text-slate-900">Gig Payout - Web Design</p>
                          <p className="text-[10px] text-slate-400">21 Oct · Income</p>
                        </div>
                      </div>
                      <span className="font-bold text-emerald-700">+ NAD 850.00</span>
                    </div>

                    {/* Record 4 */}
                    <div className="p-3 bg-white rounded-xl border border-slate-200/80 flex justify-between items-center text-xs">
                      <div className="flex items-center gap-2.5">
                        <div className="w-7 h-7 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 text-[10px]">📱</div>
                        <div>
                          <p className="font-bold text-slate-900">MTC Airtime Top-Up</p>
                          <p className="text-[10px] text-slate-400">20 Oct · Airtime</p>
                        </div>
                      </div>
                      <span className="font-bold text-slate-800">– NAD 50.00</span>
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 5: COACH */}
              {activeTab === 'coach' && (
                <div className="space-y-4">
                  <div>
                    <p className="text-[11px] text-slate-400 font-medium">A place for money questions</p>
                    <h2 className="text-lg font-extrabold text-slate-900 leading-tight">Your AI Coach</h2>
                    <p className="text-xs text-slate-500">Learn a little. Decide at your own pace.</p>
                  </div>

                  {/* Offline Warning Banner matching Screen 5 */}
                  <div className="p-3 rounded-xl bg-amber-50/80 border border-amber-200/70 flex items-start gap-2.5 text-xs text-amber-900">
                    <AlertCircle className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
                    <div>
                      <p className="font-bold text-[11px]">Offline · Coach unavailable</p>
                      <p className="text-[10px] text-amber-800">No message has been sent. Connect to start a conversation.</p>
                    </div>
                  </div>

                  {/* Welcome Guide Card */}
                  <div className="bg-white p-4 rounded-2xl border border-slate-200/80 space-y-2">
                    <div className="flex items-center gap-1.5 text-[10px] text-slate-400 font-bold uppercase tracking-wider">
                      <MessageSquare className="w-3.5 h-3.5 text-teal-700" /> Welcome Guide
                    </div>
                    <h4 className="text-xs font-bold text-slate-900">Hi Nangolo, let's start small.</h4>
                    <p className="text-xs text-slate-600 leading-snug">
                      Explore budgeting and savings ideas you can adapt to everyday life in Windhoek. Money questions are welcome here.
                    </p>
                    <p className="text-[10px] text-slate-400 pt-1">Saved introduction · not a live AI reply</p>
                  </div>

                  {/* Interactive Chat Messages */}
                  {chatMessages.length > 1 && (
                    <div className="space-y-2 pt-1">
                      {chatMessages.slice(1).map((m, idx) => (
                        <div key={idx} className={`flex ${m.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                          <div className={`max-w-[85%] p-3 rounded-2xl text-xs ${
                            m.sender === 'user' ? 'bg-teal-800 text-white rounded-br-none' : 'bg-white border border-slate-200 text-slate-800 rounded-bl-none shadow-sm'
                          }`}>
                            {m.text}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Prompt Suggestions */}
                  <div className="space-y-2 pt-1">
                    <p className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">When you're back online</p>
                    <div className="space-y-1.5">
                      {[
                        'How can I plan for irregular income?',
                        'How can I start an emergency fund?',
                        'How can I keep track of taxi costs?'
                      ].map((prompt, i) => (
                        <button
                          key={i}
                          onClick={() => handleSendChat(prompt)}
                          className="w-full p-3 bg-white hover:bg-slate-100 rounded-xl border border-slate-200/80 text-left text-xs font-medium text-slate-700 flex justify-between items-center transition"
                        >
                          <span>{prompt}</span>
                          <ArrowUpRight className="w-3.5 h-3.5 text-slate-400" />
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Input form */}
                  <form 
                    onSubmit={(e) => { e.preventDefault(); handleSendChat(); }}
                    className="flex gap-2 pt-2"
                  >
                    <input 
                      type="text" 
                      placeholder="Connect to ask a question"
                      value={inputQuery}
                      onChange={(e) => setInputQuery(e.target.value)}
                      className="flex-1 p-2.5 text-xs rounded-xl border border-slate-200 bg-white focus:outline-none focus:border-teal-700"
                    />
                    <button 
                      type="submit"
                      disabled={!inputQuery.trim()}
                      className="p-2.5 bg-teal-800 text-white rounded-xl hover:bg-teal-900 disabled:opacity-40 transition"
                    >
                      <Send className="w-4 h-4" />
                    </button>
                  </form>

                  <div className="flex items-start gap-1 text-[10px] text-slate-400 pt-1">
                    <Info className="w-3.5 h-3.5 text-slate-400 shrink-0 mt-0.5" />
                    <span>Educational guidance only. Not personalised financial advice or a guarantee. Choose what fits your needs.</span>
                  </div>
                </div>
              )}
            </>
          )}

        </div>

        {/* Bottom Navigation Bar */}
        <div className="px-3 py-2 bg-white border-t border-slate-200 flex justify-around items-center z-30">
          <NavItem 
            icon={<Home className="w-5 h-5" />} 
            label="Home" 
            active={activeTab === 'home' && !subView} 
            onClick={() => { setActiveTab('home'); setSubView(null); }} 
          />
          <NavItem 
            icon={<BookOpen className="w-5 h-5" />} 
            label="Academy" 
            active={activeTab === 'academy' || subView === 'quiz'} 
            onClick={() => { setActiveTab('academy'); setSubView(null); }} 
          />
          <NavItem 
            icon={<PiggyBank className="w-5 h-5" />} 
            label="Saver" 
            active={activeTab === 'saver' || subView === 'transferSuccess'} 
            onClick={() => { setActiveTab('saver'); setSubView(null); }} 
          />
          <NavItem 
            icon={<PieChart className="w-5 h-5" />} 
            label="Budget" 
            active={activeTab === 'budget'} 
            onClick={() => { setActiveTab('budget'); setSubView(null); }} 
          />
          <NavItem 
            icon={<MessageSquare className="w-5 h-5" />} 
            label="Coach" 
            active={activeTab === 'coach'} 
            onClick={() => { setActiveTab('coach'); setSubView(null); }} 
          />
        </div>

      </div>
    </div>
  );
}

// Sub-components & Helpers
function NavItem({ icon, label, active, onClick }) {
  return (
    <button 
      onClick={onClick}
      className={`flex flex-col items-center justify-center w-14 py-1 rounded-xl transition ${
        active 
          ? 'text-teal-800 font-bold scale-105' 
          : 'text-slate-400 hover:text-slate-600 font-medium'
      }`}
    >
      {icon}
      <span className="text-[10px] mt-0.5">{label}</span>
      {active && <span className="w-1 h-1 bg-teal-800 rounded-full mt-0.5" />}
    </button>
  );
}

function ShieldIcon(props) {
  return (
    <svg {...props} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    </svg>
  );
}

function GraduationCap(props) {
  return (
    <svg {...props} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5z" />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0112 20.055a11.952 11.952 0 01-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
    </svg>
  );
}