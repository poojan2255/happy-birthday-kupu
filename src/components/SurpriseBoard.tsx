import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Milestone, Lightbulb, Play, RotateCcw } from 'lucide-react';
import { TIMELINE_EVENTS, REASON_CARDS, SURPRISE_ADJECTIVES } from '../data/birthdayData';
import confetti from 'canvas-confetti';

export default function SurpriseBoard() {
  const [flippedReasons, setFlippedReasons] = useState<string[]>([]);
  const [poppedAdjectives, setPoppedAdjectives] = useState<string[]>([]);
  const [activeBubbleWord, setActiveBubbleWord] = useState<string | null>(null);

  const toggleFlipReason = (id: string) => {
    if (flippedReasons.includes(id)) {
      setFlippedReasons(flippedReasons.filter(item => item !== id));
    } else {
      setFlippedReasons([...flippedReasons, id]);
    }
  };

  const handlePopBubbleAction = (str: string, e: React.MouseEvent) => {
    if (poppedAdjectives.includes(str)) return;
    setPoppedAdjectives([...poppedAdjectives, str]);
    setActiveBubbleWord(str);

    // Blast custom heart/pastel colored confetti at mouse position
    confetti({
      particleCount: 15,
      angle: 60,
      spread: 55,
      origin: { x: e.clientX / window.innerWidth, y: e.clientY / window.innerHeight },
      colors: ['#ff0a7d', '#ff70b0', '#ffb5d4']
    });

    setTimeout(() => {
      setActiveBubbleWord(null);
    }, 2000);
  };

  const handleResetPoppers = () => {
    setPoppedAdjectives([]);
  };

  return (
    <section id="interactive-surprise-section" className="py-20 px-4 sm:px-6 bg-transparent relative">
      
      {/* Dynamic bubbles inside view */}
      <AnimatePresence>
        {activeBubbleWord && (
          <motion.div
            initial={{ opacity: 0, scale: 0.5, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.5, y: -20 }}
            className="fixed inset-x-0 bottom-24 mx-auto w-fit z-40 text-center bg-rose-950/80 border border-white/25 text-white shadow-xl rounded-full px-6 py-2.5 font-sans font-bold flex items-center gap-2 text-sm backdrop-blur-md"
          >
            <Sparkles className="h-4 w-4 animate-spin text-amber-400" /> Kupu ❤️ is: <span className="text-pink-400">{activeBubbleWord}</span>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="mx-auto max-w-5xl">
        
        {/* Title Group */}
        <div className="text-center mb-16">
          <span className="flex items-center justify-center gap-1 font-sans text-xs font-semibold uppercase tracking-widest text-rose-600 mb-2">
            <Sparkles className="h-4 w-4 text-rose-500 animate-spin" /> Infinite Surprises
          </span>
          <h2 className="font-sans text-3xl font-extrabold text-rose-900 tracking-tight sm:text-4xl drop-shadow-sm">
            Why You Are Exceptionally Special ✨
          </h2>
          <p className="mx-auto mt-3 max-w-xl font-sans text-sm text-rosy-950/75 leading-relaxed font-normal text-rose-950/80">
            Click to flip the magical cards to explore what makes you completely irreplaceable in daily life, stroll down our cozy memory lane timeline, or pop bubbles below!
          </p>
        </div>

        {/* Part 1: Reason Flip Cards */}
        <div className="mb-24">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center">
            {REASON_CARDS.map((card) => {
              const flipped = flippedReasons.includes(card.id);
              return (
                <div 
                  key={card.id}
                  onClick={() => toggleFlipReason(card.id)}
                  className="w-full max-w-[280px] h-72 cursor-pointer relative perspective-1000 group"
                  title="Click to Flip Card"
                >
                  <motion.div
                    animate={{ rotateY: flipped ? 180 : 0 }}
                    transition={{ duration: 0.6, ease: 'easeOut' }}
                    className="w-full h-full transform-style-3d relative"
                  >
                    
                    {/* Front: Cozy Cover Card */}
                    <div className="absolute inset-0 backface-hidden w-full h-full bg-white/45 backdrop-blur-md border border-white/50 rounded-3xl shadow-xl p-6 flex flex-col justify-between group-hover:shadow-2xl transition-all">
                      <div>
                        <div className="flex items-center justify-between">
                          <span className="text-3xl select-none">{card.emoji}</span>
                          <span className="font-sans text-[10px] uppercase font-bold text-rose-700 bg-white/60 border border-white/40 px-2.5 py-0.5 rounded-full">
                            {card.tag}
                          </span>
                        </div>
                        <h4 className="font-sans font-extrabold text-rose-900 text-lg mt-6 leading-tight group-hover:text-rose-600 transition-colors">
                          {card.title}
                        </h4>
                      </div>

                      <div className="border-t border-white/30 pt-3 flex items-center justify-between text-[11px] font-sans font-semibold text-rose-800/60">
                        <span>Click to read reason</span>
                        <Lightbulb className="h-3.5 w-3.5 text-rose-500 animate-pulse" />
                      </div>
                    </div>

                    {/* Back: Deep Message Card */}
                    <div className="absolute inset-0 backface-hidden w-full h-full bg-gradient-to-br from-rose-100/70 via-pink-100/70 to-indigo-50/70 backdrop-blur-md border border-white/50 rounded-3xl shadow-2xl p-6 flex flex-col justify-between rotate-y-180">
                      <div>
                        <div className="flex items-center justify-between border-b border-rose-200/50 pb-2">
                          <span className="font-sans text-[10px] font-bold text-rose-800 tracking-wider">
                            REASON NOTE
                          </span>
                          <span className="text-sm select-none">💝</span>
                        </div>
                        <p className="font-sans text-xs md:text-sm text-rose-950 font-bold leading-relaxed italic mt-4 text-left">
                          {card.description}
                        </p>
                      </div>

                      <div className="text-[10px] font-sans font-bold text-rose-700 tracking-wider flex items-center gap-0.5 mt-2 justify-center">
                        Tap again to seal card
                      </div>
                    </div>

                  </motion.div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Part 2: Heartfelt Memory Lane Timeline */}
        <div className="mb-24">
          <h3 className="font-sans text-lg font-bold text-rose-900 mb-12 text-center flex items-center justify-center gap-1.5 uppercase tracking-wider">
            <Milestone className="h-4.5 w-4.5 text-rose-500 animate-bounce" /> Our Cozy Timeline Road-trip
          </h3>

          <div className="relative border-l-2 border-dashed border-white/55 ml-4 md:ml-32 md:mr-16 space-y-12">
            
            {TIMELINE_EVENTS.map((evt, idx) => (
              <motion.div
                key={evt.id}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.15 }}
                className="relative pl-8 md:pl-12"
              >
                {/* Timeline Circle Bullet */}
                <div className="absolute left-[-17px] top-1.5 w-8 h-8 rounded-full border-2 border-white/80 bg-white shadow-lg flex items-center justify-center select-none text-base">
                  {evt.emoji}
                </div>

                <div className="bg-white/45 backdrop-blur-md border border-white/50 rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-all">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 mb-2">
                    <h4 className="font-sans font-extrabold text-rose-950 text-sm md:text-base">
                      {evt.title}
                    </h4>
                    <span className="font-mono text-xs font-bold text-rose-700 bg-white/60 border border-white/40 rounded-md px-2 py-0.5 self-start sm:self-auto">
                      {evt.date}
                    </span>
                  </div>
                  <p className="font-sans text-xs md:text-sm text-rose-950/70 leading-relaxed font-semibold text-left">
                    {evt.description}
                  </p>
                </div>
              </motion.div>
            ))}

          </div>
        </div>

        {/* Part 3: Interactive Heart Popping Complement Board */}
        <div className="mt-16 border border-white/50 bg-white/35 rounded-[32px] p-8 shadow-2xl text-center max-w-3xl mx-auto backdrop-blur-xl relative overflow-hidden">
          
          <div className="absolute top-0 right-0 p-4">
            <button
              onClick={handleResetPoppers}
              title="Reset popped bubble hearts"
              className="text-rose-800/60 hover:text-rose-700 active:scale-95 transition-all text-xs flex items-center gap-1 cursor-pointer"
            >
              <RotateCcw className="h-3.5 w-3.5" /> Start over
            </button>
          </div>

          <h3 className="font-sans text-base font-bold text-rose-900 mb-2">
            🎈 Kupu&apos;s Adjective Bubble Popper ❤️ 🎈
          </h3>
          <p className="font-sans text-xs text-rose-900/60 mb-6 max-w-md mx-auto">
            Click on these glowing heart bubbles to pop them, throw heart sparkles, and reveal cute affirmations of what makes Kupu ❤️ completely perfect.
          </p>

          <div className="flex flex-wrap gap-4 items-center justify-center">
            {SURPRISE_ADJECTIVES.map((adj) => {
              const isPopped = poppedAdjectives.includes(adj.phrase);
              return (
                <button
                  key={adj.phrase}
                  disabled={isPopped}
                  onClick={(e) => handlePopBubbleAction(adj.phrase, e)}
                  className={`px-4.5 py-2.5 rounded-full font-sans text-xs font-bold tracking-wide transition-all duration-300 relative ${
                    isPopped 
                      ? 'bg-dashed border border-white/30 text-rose-950/30 pointer-events-none scale-90 bg-white/10'
                      : 'bg-gradient-to-r text-white shadow-xl active:scale-95 cursor-pointer hover:shadow-2xl ' + adj.color
                  }`}
                >
                  <AnimatePresence mode="wait">
                    {!isPopped ? (
                      <motion.span 
                        key="active" 
                        initial={{ opacity: 0 }} 
                        animate={{ opacity: 1 }} 
                        exit={{ scale: [1, 1.3, 0], opacity: 0 }}
                        className="flex items-center gap-1"
                      >
                        <Play className="h-2.5 w-2.5 fill-current opacity-80" /> Pop Heart Bubble
                      </motion.span>
                    ) : (
                      <motion.span 
                        key="popped" 
                        initial={{ opacity: 0, scale: 0.5 }} 
                        animate={{ opacity: 1, scale: 1 }}
                        className="line-through flex items-center gap-1 font-bold text-rose-900"
                      >
                        {adj.phrase} 🍿
                      </motion.span>
                    )}
                  </AnimatePresence>
                </button>
              );
            })}
          </div>

        </div>

      </div>

    </section>
  );
}
