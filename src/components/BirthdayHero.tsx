import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Gift, Heart, Sparkles, Award } from 'lucide-react';
import confetti from 'canvas-confetti';

interface FloatingBalloon {
  id: string;
  x: number; // percentage width
  color: string;
  compliment: string;
  size: number;
  delay: number;
}

export default function BirthdayHero() {
  const [candlesLit, setCandlesLit] = useState<boolean[]>([true, true]);
  const [blewSmoke, setBlewSmoke] = useState<boolean[]>([false, false]);
  const [showScroll, setShowScroll] = useState<boolean>(false);
  const [poppedBalloons, setPoppedBalloons] = useState<string[]>([]);
  const [activeCompliment, setActiveCompliment] = useState<string | null>(null);

  // Dynamic set of 8 balloons drifting beautifully
  const [balloons] = useState<FloatingBalloon[]>([
    { id: 'b1', x: 10, color: 'bg-rose-300', compliment: 'Pure Sunshine ☀️', size: 52, delay: 0 },
    { id: 'b2', x: 25, color: 'bg-amber-300', compliment: 'Prettiest Smile ✨', size: 60, delay: 2 },
    { id: 'b3', x: 45, color: 'bg-purple-300', compliment: 'Brilliant Mind 🧠', size: 48, delay: 1 },
    { id: 'b4', x: 62, color: 'bg-emerald-300', compliment: 'Anchor of Support ⚓', size: 55, delay: 3 },
    { id: 'b5', x: 78, color: 'bg-pink-300', compliment: 'Wonderful Soul 🌸', size: 64, delay: 0.5 },
    { id: 'b6', x: 90, color: 'bg-indigo-300', compliment: 'Hilariously Goofy 🤪', size: 50, delay: 2.5 },
    { id: 'b7', x: 15, color: 'bg-sky-300', compliment: 'Kindest Bestie 💞', size: 56, delay: 4 },
    { id: 'b8', x: 70, color: 'bg-rose-400', compliment: 'Irreplaceable Jewel 💎', size: 58, delay: 1.5 },
  ]);

  const triggerGrandConfetti = () => {
    // Left burst
    confetti({
      particleCount: 80,
      spread: 60,
      origin: { x: 0.2, y: 0.8 },
      colors: ['#ff69b4', '#ffb6c1', '#fbcfe8', '#fecdd3']
    });
    // Right burst
    confetti({
      particleCount: 80,
      spread: 60,
      origin: { x: 0.8, y: 0.8 },
      colors: ['#ff69b4', '#fbcfe8', '#fed7aa', '#fdf2f8']
    });
    // Center big burst
    setTimeout(() => {
      confetti({
        particleCount: 150,
        spread: 100,
        origin: { y: 0.6 },
        colors: ['#db2777', '#f472b6', '#fb7185', '#fbbf24', '#38bdf8']
      });
    }, 400);
  };

  const blowCandle = (index: number) => {
    if (!candlesLit[index]) return;
    
    // Extinguish candle
    const updated = [...candlesLit];
    updated[index] = false;
    setCandlesLit(updated);

    // Trigger wisp of smoke animation
    const updatedSmoke = [...blewSmoke];
    updatedSmoke[index] = true;
    setBlewSmoke(updatedSmoke);
    setTimeout(() => {
      setBlewSmoke(prev => {
        const u = [...prev];
        u[index] = false;
        return u;
      });
    }, 1200);

    // Minor splash of sparks
    confetti({
      particleCount: 20,
      spread: 40,
      origin: { x: index === 0 ? 0.46 : 0.54, y: 0.44 },
      colors: ['#fef08a', '#fde047', '#fb7185', '#fda4af']
    });

    // Check if all candles are blown out
    if (updated.every(v => v === false)) {
      setTimeout(() => {
        triggerGrandConfetti();
        setShowScroll(true);
      }, 750);
    }
  };

  const popBalloon = (id: string, compliment: string) => {
    if (poppedBalloons.includes(id)) return;
    setPoppedBalloons(prev => [...prev, id]);
    setActiveCompliment(compliment);

    // Blast micro-confetti under cursor/balloon location approximation
    confetti({
      particleCount: 20,
      spread: 45,
      colors: ['#ec4899', '#f43f5e', '#8b5cf6', '#10b981'],
    });

    // Clear tag overlay after a brief moment
    setTimeout(() => {
      setActiveCompliment(null);
    }, 2500);
  };

  const handleResetCake = () => {
    setCandlesLit([true, true]);
    setBlewSmoke([false, false]);
    setShowScroll(false);
  };

  return (
    <div id="birthday-hero-section" className="relative min-h-[92vh] overflow-hidden bg-transparent py-12 px-4 sm:px-6">
      
      {/* Absolute floating background decorations */}
      <div className="absolute top-10 left-10 h-72 w-72 rounded-full bg-white/20 blur-3xl pointer-events-none" />
      <div className="absolute bottom-20 right-10 h-96 w-96 rounded-full bg-pink-300/20 blur-3xl pointer-events-none" />

      {/* Drifting Aesthetic Balloons Wrapper */}
      <div className="absolute inset-x-0 bottom-0 top-12 overflow-hidden pointer-events-none">
        {balloons.map((b) => {
          const isPopped = poppedBalloons.includes(b.id);
          return (
            <AnimatePresence key={b.id}>
              {!isPopped && (
                <motion.div
                  initial={{ y: '110vh' }}
                  animate={{ y: '-20vh' }}
                  exit={{ scale: [1, 1.4, 0], opacity: 0 }}
                  transition={{
                    y: {
                      duration: 16 + b.size * 0.1,
                      repeat: Infinity,
                      ease: 'linear',
                      delay: b.delay
                    },
                    scale: { duration: 0.2 },
                    opacity: { duration: 0.2 }
                  }}
                  style={{ left: `${b.x}%` }}
                  className="absolute pointer-events-auto cursor-pointer group"
                  onClick={() => popBalloon(b.id, b.compliment)}
                >
                  <div className="flex flex-col items-center">
                    {/* Balloon Body */}
                    <div 
                      style={{ width: `${b.size}px`, height: `${b.size * 1.25}px` }} 
                      className={`rounded-full ${b.color} relative shadow-md transition-all duration-300 group-hover:scale-105 group-hover:brightness-105 flex items-center justify-center`}
                    >
                      {/* Reflection highlight */}
                      <div className="absolute top-2 left-3 w-3 h-6 bg-white/40 rounded-full rotate-12" />
                      
                      {/* Heart emoji in center if high hover */}
                      <Heart className="h-3 w-3 text-white/50 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                    {/* Balloon Knot/String */}
                    <div className="w-2 h-2 bg-black/10 rotate-45 -mt-1 rounded-sm" />
                    <div className="w-0.5 h-16 bg-dashed border-l border-gray-300/40" />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          );
        })}
      </div>

      {/* Floating Compliment Announcement */}
      <AnimatePresence>
        {activeCompliment && (
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.9 }}
            style={{ x: '-50%' }}
            className="fixed top-24 left-1/2 z-40 rounded-full border border-pink-200 bg-pink-50/90 px-6 py-2 shadow-lg backdrop-blur-md"
          >
            <p className="flex items-center gap-2 font-sans font-semibold text-pink-600 sm:text-base text-sm">
              <Sparkles className="h-4.5 w-4.5 animate-spin" /> {activeCompliment}
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="relative mx-auto max-w-5xl text-center z-10">
        
        {/* Subtle Welcome Badge */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-1.5 rounded-full bg-rose-50 border border-rose-100 px-4 py-1 text-xs font-semibold uppercase tracking-wider text-rose-500 mb-6"
        >
          <Award className="h-3.5 w-3.5 animate-bounce" /> Today is Kupu&apos;s special day ❤️
        </motion.div>

        {/* Elegant Title Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.15 }}
          className="leading-tight text-gray-900"
        >
          <span className="block font-dancing font-bold text-5xl sm:text-7xl lg:text-8xl text-rose-600/95 tracking-wide pb-1 drop-shadow-[0_2px_4px_rgba(244,63,94,0.15)]">
            Happy Birthday
          </span>
          <span className="font-sans text-5xl sm:text-7xl lg:text-8xl font-extrabold bg-gradient-to-r from-rose-500 via-pink-500 to-amber-400 bg-clip-text text-transparent italic tracking-normal leading-none inline-block pt-2 pb-1 pr-4">
            Kupu
          </span>
          <span className="inline-block text-red-500 font-sans text-5xl sm:text-7xl lg:text-8xl ml-2 select-none">
          ❤️
          </span>
        </motion.h1>

        {/* Sub-intro text intentionally removed par request */}

        {/* Virtual Cake and Blow Candles Interaction */}
        <div className="mt-14 flex flex-col items-center justify-center">
          
          <AnimatePresence mode="wait">
            {!showScroll ? (
              <motion.div 
                key="cake-view"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="flex flex-col items-center"
              >
                <p className="font-sans text-xs font-semibold uppercase tracking-widest text-amber-500 mb-4 animate-pulse flex items-center justify-center gap-1">
                  🕯️ Click each candle to blow them out 🕯️
                </p>

                {/* The Virtual Birthday Cake */}
                <div id="virtual-cake" className="relative w-80 h-[340px] flex flex-col items-center justify-end select-none mt-4">
                  
                  {/* CSS injection for gorgeous animations */}
                  <style>{`
                    @keyframes flicker {
                      0%, 100% {
                        transform: scaleX(1) scaleY(1) rotate(-1deg);
                        filter: drop-shadow(0 0 5px rgba(245,158,11,0.5)) drop-shadow(0 0 10px rgba(239,68,68,0.3));
                      }
                      20% {
                        transform: scaleX(0.95) scaleY(1.08) rotate(1deg) skewX(1deg);
                        filter: drop-shadow(0 0 7px rgba(245,158,11,0.6)) drop-shadow(0 0 12px rgba(239,68,68,0.4));
                      }
                      40% {
                        transform: scaleX(1.04) scaleY(0.93) rotate(-1.5deg) skewX(-1deg);
                        filter: drop-shadow(0 0 5px rgba(245,158,11,0.45)) drop-shadow(0 0 9px rgba(239,68,68,0.25));
                      }
                      60% {
                        transform: scaleX(0.92) scaleY(1.12) rotate(1.5deg) skewX(1.5deg);
                        filter: drop-shadow(0 0 8px rgba(251,191,36,0.7)) drop-shadow(0 0 14px rgba(244,63,94,0.5));
                      }
                      80% {
                        transform: scaleX(1.06) scaleY(0.97) rotate(-0.5deg) skewX(-0.5deg);
                        filter: drop-shadow(0 0 6px rgba(245,158,11,0.5)) drop-shadow(0 0 11px rgba(239,68,68,0.35));
                      }
                    }
                    @keyframes smoke-float {
                      0% { transform: scale(0.6) translateY(0); opacity: 0; }
                      25% { opacity: 0.7; }
                      100% { transform: scale(1.4) translateY(-35px); opacity: 0; }
                    }
                    @keyframes gentle-bounce {
                      0%, 100% { transform: translateY(0); }
                      50% { transform: translateY(-5px); }
                    }
                    .animate-flicker {
                      animation: flicker 0.6s infinite ease-in-out;
                    }
                    .animate-smoke {
                      animation: smoke-float 1.2s forwards ease-out;
                    }
                    .animate-gentle-bounce {
                      animation: gentle-bounce 3.5s infinite ease-in-out;
                    }
                  `}</style>

                  <div className="absolute inset-0 w-full h-full flex flex-col items-center justify-end animate-gentle-bounce">
                    
                    {/* Left "2" Candle, Right "3" Candle placement representing 23 with minimal gap and sitting properly on top of cake */}
                    <div className="absolute bottom-[180px] w-auto flex justify-center gap-1.5 z-30 select-none">
                      {[0, 1].map((idx) => {
                        const digit = idx === 0 ? "2" : "3";
                        const candleColors = idx === 0
                          ? 'from-pink-400 via-pink-300 to-rose-500 shadow-pink-200 border-pink-200/50'
                          : 'from-amber-400 via-yellow-250 to-amber-500 shadow-yellow-200 border-amber-300/50';
                        return (
                          <div key={idx} className="flex flex-col items-center relative">
                            
                            {/* Smoke Puff Animation when blown out */}
                            <AnimatePresence>
                              {blewSmoke[idx] && (
                                <span className="absolute -top-7 text-xs select-none pointer-events-none animate-smoke">
                                  💨
                                </span>
                              )}
                            </AnimatePresence>

                            {/* Candle Flame element (custom-aligned, hyper-realistic, glowing nested layers) */}
                            <AnimatePresence>
                              {candlesLit[idx] && (
                                <motion.div
                                  onClick={() => blowCandle(idx)}
                                  className="w-5 h-8.5 cursor-pointer absolute -top-[34px] left-1/2 -translate-x-1/2 z-40 flex items-center justify-end flex-col animate-flicker pointer-events-auto origin-bottom"
                                  exit={{ y: -8, opacity: 0, scale: 0 }}
                                  whileHover={{ scale: 1.22 }}
                                >
                                  {/* 1. Deep outer thermal aura (large, blurry, translucent warning glow) */}
                                  <div className="absolute inset-0 bg-gradient-to-t from-orange-600 to-amber-500 rounded-[50%_50%_20%_20%_/_80%_80%_20%_20%] filter blur-[3px] opacity-[0.35] mix-blend-screen scale-[1.3]" />

                                  {/* 2. Soft atmospheric flame heat halo (semi-blurred bright aura) */}
                                  <div className="absolute inset-0 bg-gradient-to-t from-orange-500 via-amber-400 to-yellow-200 rounded-[50%_50%_15%_15%_/_85%_85%_15%_15%] filter blur-[1.2px] opacity-75 mix-blend-screen" />
                                  
                                  {/* 3. Main high-intensity glowing flame body (classic teardrop) */}
                                  <div className="absolute inset-x-0.5 bottom-0 top-[2px] bg-gradient-to-t from-amber-600 via-amber-300 to-white rounded-[50%_50%_15%_15%_/_85%_85%_15%_15%] shadow-[0_-1px_8px_rgba(251,146,60,0.5),0_1.5px_3px_rgba(239,68,68,0.4)]" />

                                  {/* 4. Incandescent white-hot inner key core */}
                                  <div className="absolute bottom-[3px] left-1/2 -translate-x-1/2 w-2 h-4 bg-gradient-to-t from-amber-200 via-white to-white rounded-[50%_50%_20%_20%_/_80%_80%_20%_20%] opacity-95" />

                                  {/* 5. Realistic oxygen-rich chemical blue base of flame */}
                                  <div className="absolute bottom-[-1px] left-1/2 -translate-x-1/2 w-3.5 h-2 bg-gradient-to-t from-blue-700 via-blue-500 to-transparent rounded-b-full filter blur-[0.4px] mix-blend-screen opacity-[0.85]" />
                                </motion.div>
                              )}
                            </AnimatePresence>

                            {/* Candle Wick */}
                            <div className="w-0.5 h-2.5 bg-zinc-700 rounded-t" />

                            {/* Candle Digit Body */}
                            <div
                              onClick={() => blowCandle(idx)}
                              title="Click to blow out candle"
                              className={`w-11 h-14 cursor-pointer rounded-xl bg-gradient-to-br ${candleColors} shadow-lg border border-white/60 flex items-center justify-center transition-all duration-200 active:scale-95 hover:scale-105 relative overflow-hidden`}
                            >
                              {/* Candle wax gloss / sparkles details */}
                              <div className="absolute inset-x-0 top-0 h-1/2 bg-white/20 rounded-t-xl" />
                              <span className="text-2xl font-sans font-black tracking-tighter drop-shadow-[0_2px_4px_rgba(0,0,0,0.15)] text-white select-none">
                                {digit}
                              </span>
                            </div>
                          </div>
                        );
                      })}
                    </div>

                    {/* TOP TIER (Tier 3) - Elegant Cream Base with Frosting Stars */}
                    <div className="w-36 h-14 bg-gradient-to-b from-white via-rose-50 to-pink-100 rounded-t-[20px] rounded-b-[10px] relative shadow-lg z-20 border border-pink-200/50 flex flex-col justify-between overflow-hidden">
                      {/* Glossy top glaze reflection */}
                      <div className="absolute top-0 inset-x-0 h-4 bg-white/80 rounded-t-[20px]" />
                      
                      {/* Whipped Star Swirls on top edge */}
                      <div className="absolute -top-1 inset-x-0 flex justify-between px-1">
                        {[...Array(6)].map((_, i) => (
                          <div key={i} className="w-4 h-3 bg-white rounded-full shadow-xs border-b border-pink-100/50" />
                        ))}
                      </div>

                      {/* Quiet elegant center frosting dollops */}
                      <div className="flex-1 flex items-center justify-center pt-2 gap-2">
                        <div className="w-2.5 h-2 bg-white rounded-full opacity-90 shadow-2xs" />
                        <div className="w-3 h-2.5 bg-white rounded-full opacity-95 shadow-xs" />
                        <div className="w-2.5 h-2 bg-white rounded-full opacity-90 shadow-2xs" />
                      </div>

                      {/* Bottom icing border */}
                      <div className="w-full h-1.5 bg-pink-200" />
                    </div>

                    {/* MIDDLE TIER (Tier 2) - Velvet Pink Sponge with Krupa Signboard */}
                    <div className="w-52 h-16 bg-gradient-to-b from-pink-200 via-rose-200 to-pink-300 rounded-t-[14px] rounded-b-[10px] relative shadow-xl z-15 border border-pink-300/40 -mt-1 overflow-hidden">
                      
                      {/* Cream Dripping Loops */}
                      <div className="absolute top-0 inset-x-0 flex justify-around">
                        {[...Array(8)].map((_, i) => (
                          <div key={i} className="w-6 h-5 bg-white/95 rounded-b-full shadow-sm -mt-1.5 border-b border-rose-100" />
                        ))}
                      </div>

                      <div className="absolute inset-0 flex items-center justify-center pt-3 gap-0.5">
                        {/* High fidelity golden/chocolate custom letter tags for KRUPA */}
                        {["K", "R", "U", "P", "A"].map((letter, i) => (
                          <span 
                            key={i} 
                            className="w-6 h-6 rounded-full bg-gradient-to-br from-amber-500 to-amber-600 border border-yellow-300/45 shadow-sm text-white font-sans font-black text-xs flex items-center justify-center drop-shadow-sm scale-95"
                          >
                            {letter}
                          </span>
                        ))}
                      </div>

                      {/* Tiny cute strawberries on sides */}
                      <div className="absolute left-3 top-6 text-sm">🍓</div>
                      <div className="absolute right-3 top-6 text-sm">🍓</div>

                      {/* Base cream separator */}
                      <div className="absolute bottom-0 inset-x-0 h-1.5 bg-pink-400/40" />
                    </div>

                    {/* BOTTOM TIER (Tier 1) - Classic Berry Sponge with Colorful Sprinkles */}
                    <div className="w-68 h-20 bg-gradient-to-b from-rose-100 via-rose-150 to-rose-200 rounded-t-[14px] rounded-b-[24px] relative shadow-2xl z-10 border border-rose-200 flex flex-col justify-between -mt-1 overflow-hidden">
                      
                      {/* Whipped white cream drip loops dragging down further */}
                      <div className="absolute top-0 inset-x-0 flex justify-between px-1">
                        {[...Array(11)].map((_, i) => (
                          <div 
                            key={i} 
                            style={{ height: `${12 + (i % 3) * 4}px` }} 
                            className="w-6 bg-white rounded-b-full shadow-[0_3px_3px_rgba(0,0,0,0.05)] border-b border-pink-100/50" 
                          />
                        ))}
                      </div>

                      {/* Scattering beautiful multicolored sprinkles on Bottom Tier */}
                      {[
                        { top: '35%', left: '10%', col: 'bg-blue-400' },
                        { top: '55%', left: '16%', col: 'bg-yellow-300' },
                        { top: '42%', left: '22%', col: 'bg-purple-400' },
                        { top: '65%', left: '26%', col: 'bg-green-400' },
                        { top: '35%', left: '74%', col: 'bg-amber-400' },
                        { top: '60%', left: '80%', col: 'bg-pink-400' },
                        { top: '45%', left: '88%', col: 'bg-sky-400' },
                      ].map((spr, i) => (
                        <div 
                          key={i} 
                          style={{ top: spr.top, left: spr.left }} 
                          className={`absolute w-1.5 h-1.5 rounded-full ${spr.col} shadow-xs z-10`} 
                        />
                      ))}

                      <div className="flex-1 flex items-center justify-center pt-6">
                        <span className="font-serif text-xs font-black tracking-widest text-rose-800 bg-white/70 border border-white/60 px-3.5 py-0.5 rounded-full shadow-xs">
                          19 JUNE
                        </span>
                      </div>

                      {/* Bottom deep shadow sponge line */}
                      <div className="w-full h-2.5 bg-rose-300/60" />
                    </div>

                    {/* Pedestal Stand (Golden & Glassy look) */}
                    <div className="flex flex-col items-center -mt-1 relative z-5">
                      {/* Main gold/silver reflective surface plate */}
                      <div className="w-76 h-5 rounded-full bg-gradient-to-r from-amber-400 via-yellow-200 to-amber-400 shadow-xl border border-yellow-300/60 animate-pulse" />
                      {/* Gloss glassy pedestal holder */}
                      <div className="w-20 h-8 bg-gradient-to-b from-white/80 via-white/40 to-white/10 rounded-b-xl border-x border-b border-white/40 shadow-inner -mt-1 flex items-center justify-center">
                        {/* Metallic golden rod core */}
                        <div className="w-4 h-full bg-gradient-to-r from-amber-400 to-yellow-300" />
                      </div>
                    </div>

                  </div>
                </div>
              </motion.div>
            ) : (
              <motion.div 
                key="scroll-view"
                initial={{ opacity: 0, y: 50, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 30, scale: 0.9 }}
                className="w-full max-w-xl mx-auto"
              >
                {/* Envelope-scroll representing the heartfelt poem */}
                <div id="personalized-gift-scroll" className="rounded-[32px] border border-white/50 bg-white/45 p-8 shadow-2xl backdrop-blur-2xl relative overflow-hidden">
                  
                  {/* Decorative corner graphics */}
                  <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-rose-300 rounded-tl-2xl" />
                  <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-rose-300 rounded-tr-2xl" />
                  <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-rose-300 rounded-bl-2xl" />
                  <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-rose-300 rounded-br-2xl" />

                  {/* Top Header */}
                  <div className="flex items-center justify-between mb-6 border-b border-rose-100 pb-4">
                    <span className="font-sans text-xs font-semibold tracking-wider text-rose-700 uppercase flex items-center gap-1">
                      <Gift className="h-3.5 w-3.5" /> For Kupu ❤️
                    </span>
                    <span className="font-mono text-xs text-rose-600 font-semibold uppercase">
                      June 19, 2026
                    </span>
                  </div>

                  {/* The heartfelt scroll verse */}
                  <h3 className="font-sans text-2xl font-bold italic text-rose-900 mb-4 text-center">
                    Happy Birthday kupu❤️
                  </h3>

                  <div className="space-y-4 text-rose-950 font-sans leading-relaxed text-left text-sm md:text-base italic">
                    <p>
                      Crazy it’s been 6 years since we met in 11th. From those school van days, random talks, and all those little memories… time really went so fast. Even though we haven’t met for years, somehow the bond never felt lost.
                    </p>
                    <p>
                      Always keep that smile of yours, keep being the amazing person you are, and I hope this year brings you everything you’re wishing for.
                    </p>
                    <p className="text-center font-bold text-rose-800 pt-2">
                      Happy Birthday once again 🤍✨
                    </p>
                    <div className="flex justify-center py-2">
                      <Heart className="h-6 w-6 text-rose-500 animate-pulse fill-rose-500" />
                    </div>
                    <p className="text-right font-sans font-bold text-rose-800 tracking-wider">
                      — Poojan
                    </p>
                  </div>



                </div>
              </motion.div>
            )}
          </AnimatePresence>

        </div>

      </div>

    </div>
  );
}
