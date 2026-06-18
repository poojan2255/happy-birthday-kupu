import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Mail, Send, Sparkles, Heart, Trash2, LayoutGrid, CheckCircle } from 'lucide-react';
import { INITIAL_MESSAGES } from '../data/birthdayData';
import { MessageCard } from '../types';

interface PresetLetter {
  id: string;
  title: string;
  excerpt: string;
  body: string;
  sender: string;
  colors: {
    backFlap: string;
    insidePocket: string;
    leftFold: string;
    rightFold: string;
    bottomFold: string;
    seal: string;
    textHeader: string;
    textTitle: string;
    tapToRead: string;
    lines: string;
    heart: string;
  };
}

const presetLetters: PresetLetter[] = [
  {
    id: 'l1',
    title: 'A Special Wish ❤️',
    excerpt: 'Read about the quiet support that anchor holds us...',
    body: 'Kupu ❤️, on your special day I just want to wish you endless happiness, success, and all the beautiful things you deserve. Keep following your dreams, keep growing, and always stay the amazing person you are.',
    sender: 'Poojan',
    colors: {
      backFlap: 'bg-[#ff8fa3]',
      insidePocket: 'bg-[#e05869]',
      leftFold: 'bg-[#ffa6b6]',
      rightFold: 'bg-[#ff99ac]',
      bottomFold: 'bg-[#ffb3c1]',
      seal: 'bg-[#fce3da]',
      textHeader: 'text-rose-950/40',
      textTitle: 'text-[#7c071d]',
      tapToRead: 'text-[#7c071d]',
      lines: 'bg-rose-200',
      heart: 'text-rose-500 fill-rose-500'
    }
  },
  {
    id: 'l2',
    title: 'Little Things ',
    excerpt: 'A tiny letter about what makes you so magnificent...',
    body: 'Happy Birthday Kupu 🎂✨, It’s always the little moments that become the most special memories. I hope life keeps giving you endless reasons to laugh, dream bigger, and enjoy every beautiful moment ahead ❤️',
    sender: 'Poojan',
    colors: {
      backFlap: 'bg-[#cbbeeb]',
      insidePocket: 'bg-[#9884e2]',
      leftFold: 'bg-[#dfd5fc]',
      rightFold: 'bg-[#d5cbf2]',
      bottomFold: 'bg-[#ebdffc]',
      seal: 'bg-[#f5efff]',
      textHeader: 'text-indigo-950/40',
      textTitle: 'text-indigo-900',
      tapToRead: 'text-indigo-900',
      lines: 'bg-indigo-200',
      heart: 'text-indigo-500 fill-indigo-500'
    }
  },
  {
    id: 'l3',
    title: 'A Little Wish',
    excerpt: 'A silent cosmic wish to the shooting star...',
    body: 'happy birthday Kupu, I hope this year filled with new adventures, unforgettable memories, and all the things you have ever wished for. Stay happy, stay blessed, and keep shining ❤️✨',
    sender: 'Poojan',
    colors: {
      backFlap: 'bg-[#ffd0a1]',
      insidePocket: 'bg-[#f09a5c]',
      leftFold: 'bg-[#ffe5b4]',
      rightFold: 'bg-[#ffd899]',
      bottomFold: 'bg-[#ffcc99]',
      seal: 'bg-[#fff0da]',
      textHeader: 'text-amber-950/40',
      textTitle: 'text-amber-900',
      tapToRead: 'text-amber-900',
      lines: 'bg-amber-200',
      heart: 'text-amber-500 fill-amber-500'
    }
  }
];

const getLetterPaperStyle = (id: string) => {
  switch (id) {
    case 'l1':
      return {
        bg: 'bg-gradient-to-br from-[#fffdfd] via-[#fffafb] to-[#fff6f7]',
        titleColor: 'text-rose-900',
        bodyColor: 'text-rose-950',
        senderColor: 'text-rose-800',
        accentBorder: 'border-rose-100/60',
        divider: 'bg-gradient-to-r from-transparent via-rose-300/40 to-transparent',
        ruledPattern: 'bg-[linear-gradient(rgba(244,63,94,0.06)_1px,transparent_1px)] bg-[size:100%_2.25rem]',
        sealBtn: 'bg-rose-500 hover:bg-rose-600 active:scale-95 text-white shadow-rose-500/20 shadow-lg',
        icon: 'text-rose-500 fill-rose-500'
      };
    case 'l2':
      return {
        bg: 'bg-gradient-to-br from-[#fdfdff] via-[#fafaff] to-[#f5f3ff]',
        titleColor: 'text-[#4c1d95]',
        bodyColor: 'text-indigo-950',
        senderColor: 'text-indigo-800',
        accentBorder: 'border-indigo-100/60',
        divider: 'bg-gradient-to-r from-transparent via-indigo-300/40 to-transparent',
        ruledPattern: 'bg-[linear-gradient(rgba(99,102,241,0.06)_1px,transparent_1px)] bg-[size:100%_2.25rem]',
        sealBtn: 'bg-indigo-500 hover:bg-indigo-600 active:scale-95 text-white shadow-indigo-500/20 shadow-lg',
        icon: 'text-indigo-500 fill-indigo-500'
      };
    case 'l3':
    default:
      return {
        bg: 'bg-gradient-to-br from-[#fffdfa] via-[#fffdf5] to-[#fffbeb]',
        titleColor: 'text-amber-950',
        bodyColor: 'text-amber-950',
        senderColor: 'text-amber-800',
        accentBorder: 'border-amber-100/60',
        divider: 'bg-gradient-to-r from-transparent via-amber-300/40 to-transparent',
        ruledPattern: 'bg-[linear-gradient(rgba(245,158,11,0.06)_1px,transparent_1px)] bg-[size:100%_2.25rem]',
        sealBtn: 'bg-amber-500 hover:bg-amber-600 active:scale-95 text-white shadow-amber-500/20 shadow-lg',
        icon: 'text-amber-500 fill-amber-500'
      };
  }
};

export default function HeartfeltMessages() {
  const [messages, setMessages] = useState<MessageCard[]>([]);
  const [activeLetterContent, setActiveLetterContent] = useState<PresetLetter | null>(null);

  // Form states
  const [sender, setSender] = useState<string>('');
  const [text, setText] = useState<string>('');
  const [selectedBg, setSelectedBg] = useState<string>('bg-rose-50/70 backdrop-blur-md border-white/50 text-rose-950 animate-pulse');
  const [selectedSticker, setSelectedSticker] = useState<string>('💝');
  const [success, setSuccess] = useState<boolean>(false);

  const colorOptions = [
    { value: 'bg-rose-50/70 border-white/50 text-rose-950', label: 'Blush Rose' },
    { value: 'bg-violet-50/70 border-white/50 text-violet-950', label: 'Lavender Dream' },
    { value: 'bg-amber-50/70 border-white/50 text-amber-950', label: 'Golden Honey' },
    { value: 'bg-emerald-50/70 border-white/50 text-emerald-950', label: 'Soft Sage' },
    { value: 'bg-sky-50/70 border-white/50 text-sky-950', label: 'Morning Dew' }
  ];

  const stickerOptions = ['💝', '👑', '🎂', '⭐', '🌸', '🍕', '🎉', '🥂'];

  useEffect(() => {
    const cached = localStorage.getItem('krupa_bday_messages');
    if (cached) {
      try {
        setMessages(JSON.parse(cached));
      } catch (err) {
        setMessages(INITIAL_MESSAGES);
      }
    } else {
      setMessages(INITIAL_MESSAGES);
    }
  }, []);

  const saveMessages = (updated: MessageCard[]) => {
    setMessages(updated);
    localStorage.setItem('krupa_bday_messages', JSON.stringify(updated));
  };

  const handlePostMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!text.trim()) return;

    const baseBg = selectedBg.replace(' animate-pulse', '');

    const newMsg: MessageCard = {
      id: `msg_${Date.now()}`,
      sender: sender.trim() || 'Anonymous Admirer',
      text: text.trim(),
      date: new Date().toLocaleDateString('en-US', {
        month: 'long',
        day: 'numeric',
        year: 'numeric'
      }),
      bgColor: baseBg,
      sticker: selectedSticker,
      isPinned: true
    };

    const updated = [newMsg, ...messages];
    saveMessages(updated);
    
    // Clear
    setText('');
    setSender('');
    setSuccess(true);
    setTimeout(() => setSuccess(false), 2000);
  };

  const handleDeleteMessage = (id: string) => {
    const updated = messages.filter(m => m.id !== id);
    saveMessages(updated);
  };

  return (
    <section id="heartfelt-message-section" className="py-6 px-4 sm:px-6 bg-transparent relative overflow-hidden">
      
      {/* Graphic background bubbles */}
      <div className="absolute top-40 right-10 w-96 h-96 bg-white/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-20 left-10 w-72 h-72 bg-pink-300/10 rounded-full blur-3xl pointer-events-none" />

      <div className="mx-auto max-w-5xl relative z-10 font-sans">
        
        {/* Section Header removed as requested */}
        <div className="h-1" />

        {/* Part 1: Wax-Sealed Secret Letters */}
        <div className="mb-10">
          <h3 className="font-sans text-lg font-bold text-rose-900 mb-8 text-center flex items-center justify-center gap-2">
            <Heart className="h-4 w-4 text-rose-500 fill-rose-500 animate-beatScale" /> Special Notes
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 justify-items-center pt-6">
            {presetLetters.map((letter) => (
              <motion.div
                key={letter.id}
                whileHover={{ scale: 1.05 }}
                transition={{ type: 'spring', stiffness: 260, damping: 20 }}
                onClick={() => setActiveLetterContent(letter)}
                className="relative w-full max-w-[260px] h-64 cursor-pointer group flex flex-col justify-end select-none"
              >
                {/* 1. Back flap (triangle pointing up, sits behind everything) */}
                <div 
                  className={`absolute bottom-32 left-0 right-0 h-16 ${letter.colors.backFlap} z-0`} 
                  style={{ clipPath: 'polygon(0% 100%, 50% 0%, 100% 100%)' }}
                />

                {/* 2. Inner card holding the letter and title (slides up on hover) */}
                <div className="absolute bottom-4 left-3.5 right-3.5 h-[150px] bg-white rounded-xl shadow-md z-10 transition-all duration-500 ease-out group-hover:translate-y-[-54px] translate-y-[-16px] p-4 flex flex-col justify-between border border-rose-100">
                  {/* Heart Icon top right */}
                  <Heart className={`h-4 w-4 absolute top-3.5 right-3.5 animate-pulse ${letter.colors.heart}`} />
                  
                  {/* Title & Preview Content */}
                  <div>
                    <h4 className={`font-sans font-black ${letter.colors.textHeader} text-[9px] tracking-wider uppercase mb-1`}>
                      Dear Kupu
                    </h4>
                    <h3 className={`font-serif font-extrabold ${letter.colors.textTitle} text-sm tracking-tight mb-2 pr-6 leading-tight line-clamp-1`}>
                      {letter.title}
                    </h3>
                    
                    {/* Simulated written lines exactly like user's photo */}
                    <div className="space-y-1.5 opacity-60">
                      <div className={`h-[1px] ${letter.colors.lines} w-full`} />
                      <div className={`h-[1px] ${letter.colors.lines} w-5/6`} />
                      <div className={`h-[1px] ${letter.colors.lines} w-11/12`} />
                    </div>
                  </div>

                  <span className={`text-[9px] font-sans font-extrabold ${letter.colors.tapToRead} tracking-widest block transform transition-transform group-hover:scale-103`}>
                    TAP TO READ ♥
                  </span>
                </div>

                {/* 3. Deep inside back layer of the envelope pocket */}
                <div className={`absolute bottom-0 left-0 right-0 h-32 ${letter.colors.insidePocket} rounded-b-2xl z-5 shadow-[inset_0_4px_12px_rgba(0,0,0,0.15)]`} />

                {/* 4. Elegant Front Pocket of the Envelope */}
                <div className="absolute bottom-0 left-0 right-0 h-32 z-20 overflow-hidden rounded-b-2xl shadow-[0_12px_24px_rgba(115,85,95,0.12)] border-t border-white/10">
                  {/* Left triangle diagonal fold */}
                  <div 
                    className={`absolute inset-0 ${letter.colors.leftFold}`} 
                    style={{ clipPath: 'polygon(0% 100%, 0% 0%, 50% 50%, 100% 100%)' }}
                  />
                  {/* Right triangle diagonal fold */}
                  <div 
                    className={`absolute inset-0 ${letter.colors.rightFold}`} 
                    style={{ clipPath: 'polygon(100% 100%, 100% 0%, 50% 50%, 0% 100%)' }}
                  />
                  {/* Bottom center triangle flap fold */}
                  <div 
                    className={`absolute inset-0 ${letter.colors.bottomFold}`} 
                    style={{ clipPath: 'polygon(0% 100%, 50% 50%, 100% 100%)' }}
                  />
                  
                  {/* Peach/Cream circle sticker seal in center */}
                  <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-7 h-7 rounded-full ${letter.colors.seal} border border-white/30 shadow-[0_2px_6px_rgba(40,10,15,0.08)] z-30 flex items-center justify-center`}>
                    <Heart className="h-2.5 w-2.5 fill-rose-500 text-rose-500" />
                  </div>

                  {/* Open text label below the center seal heart */}
                  <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-30 pointer-events-none text-[9px] font-sans font-black tracking-widest text-rose-600/75 uppercase flex items-center gap-0.5 bg-white/40 px-2 py-0.5 rounded-full backdrop-blur-xs border border-white/50">
                    OPEN ✨
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Part 2: Interactive Wishboard & Card Creator */}
        <div>
          <h3 id="board-header" className="font-sans text-lg font-bold text-rose-900 mb-8 text-center flex items-center justify-center gap-2">
            <LayoutGrid className="h-4 w-4 text-rose-500" /> Birthday Wishboard
          </h3>

          <div className="max-w-4xl mx-auto">
            
            {/* Wishes Board Backdrop - Adjusted to be full width and centered */}
            <div className="w-full bg-white/20 border-4 border-white/50 rounded-3xl p-6 min-h-[380px] shadow-2xl relative flex flex-wrap gap-6 items-start justify-center backdrop-blur-lg">
              
              {/* Virtual pushpins clothesline board texture */}
              <div className="absolute inset-x-0 top-3 pointer-events-none" />

              <AnimatePresence>
                {messages.map((m, index) => {
                  // Precalculate slight natural rotation for pinboard notes
                  const rotClass = [
                    '-rotate-1 hover:rotate-0',
                    'rotate-2 hover:rotate-0',
                    '-rotate-2 hover:rotate-0',
                    'rotate-1 hover:rotate-0',
                    'rotate-1.5 hover:rotate-0',
                    '-rotate-1.5 hover:rotate-0'
                  ][index % 6];

                  return (
                    <motion.div
                      key={m.id}
                      initial={{ opacity: 0, scale: 0.8, y: -20 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.8, y: 20 }}
                      transition={{ type: 'spring', stiffness: 200, damping: 15 }}
                      className={`relative p-5 rounded-2xl border shadow-xl w-[220px] transition-all duration-300 backdrop-blur-md ${m.bgColor} ${rotClass} group flex flex-col justify-between min-h-[170px]`}
                    >
                      {/* Interactive push-pin graphic */}
                      <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-red-600 border border-red-700 shadow-md flex items-center justify-center">
                        <div className="w-1.5 h-1.5 rounded-full bg-white/50" />
                        <div className="absolute w-0.5 h-3 bg-gray-400 bottom-[-4px]" />
                      </div>

                      {/* Sticky Sticker decoration */}
                      <div className="absolute top-2 right-2 text-xl select-none">
                        {m.sticker}
                      </div>

                      {/* Text wishes */}
                      <div>
                        <p className="font-sans text-xs font-bold leading-relaxed mb-4 mt-2 pr-4 break-words">
                          {m.text}
                        </p>

                        {/* Interactive Clear button for custom posts */}
                        {!['m1', 'm2', 'm3'].includes(m.id) && (
                          <button
                            onClick={() => handleDeleteMessage(m.id)}
                            className="absolute bottom-2.5 right-2.5 text-black/45 hover:text-rose-600 cursor-pointer p-1 rounded-full hover:bg-black/5 opacity-0 group-hover:opacity-100 transition-all"
                            title="Unpin message"
                          >
                            <Trash2 className="h-3.5 w-3.5" />
                          </button>
                        )}
                      </div>
                    </motion.div>
                  );
                })}
              </AnimatePresence>

              {messages.length === 0 && (
                <div className="text-center py-20 uppercase font-bold text-rose-900/30 font-sans tracking-widest pointer-events-none">
                  No wishes pinned yet.
                </div>
              )}

            </div>

          </div>
        </div>

      </div>

      {/* Sealed Letters Unlocked / Reveal Modal */}
      <AnimatePresence>
        {activeLetterContent && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setActiveLetterContent(null)}
              className="absolute inset-0 bg-rose-950/45 backdrop-blur-md"
            />

            <motion.div
              initial={{ scale: 0.7, y: 200, rotate: -6, opacity: 0 }}
              animate={{ scale: 1, y: 0, rotate: 0, opacity: 1 }}
              exit={{ scale: 0.7, y: 200, rotate: 6, opacity: 0 }}
              transition={{ type: 'spring', damping: 22, stiffness: 160, mass: 0.9 }}
              style={{ transformOrigin: 'bottom center' }}
              className={`relative max-w-md w-full py-5 px-6 md:px-8 shadow-[0_25px_60px_rgba(40,20,30,0.25)] rounded-3xl z-10 overflow-hidden border ${
                activeLetterContent.id === 'l1'
                  ? 'bg-gradient-to-br from-[#fffdfd] via-[#fffafb] to-[#fff6f7] border-rose-100/60'
                  : activeLetterContent.id === 'l2'
                  ? 'bg-gradient-to-br from-[#fdfdff] via-[#fafaff] to-[#f5f3ff] border-indigo-100/60'
                  : 'bg-gradient-to-br from-[#fffdfa] via-[#fffdf5] to-[#fffbeb] border-amber-100/60'
              }`}
            >
              {/* Styled Letter Header Stamp */}
              <motion.div 
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.15, type: 'spring', stiffness: 200 }}
                className="text-center mb-3 mt-1 select-none"
              >
                <div className="inline-block relative p-2 bg-white rounded-full shadow-sm border border-neutral-100/50">
                  <span className="text-3xl filter drop-shadow-sm leading-none block">✉️</span>
                  <Heart 
                    className={`h-3.5 w-3.5 absolute animate-pulse ${
                      activeLetterContent.id === 'l1'
                        ? 'text-rose-500 fill-rose-500'
                        : activeLetterContent.id === 'l2'
                        ? 'text-indigo-500 fill-indigo-500'
                        : 'text-amber-500 fill-amber-500'
                    }`} 
                    style={{ top: '12px', left: '13px' }} 
                  />
                </div>
              </motion.div>

              <div className="text-center mb-2">
                <motion.h4
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.25, duration: 0.4 }}
                  className={`font-serif text-xl md:text-2xl font-extrabold tracking-tight leading-snug ${
                    activeLetterContent.id === 'l1'
                      ? 'text-[#7c071d]'
                      : activeLetterContent.id === 'l2'
                      ? 'text-[#4c1d95]'
                      : 'text-amber-950'
                  }`}
                >
                  {activeLetterContent.title}
                </motion.h4>
                
                {/* Subtle themed divider line */}
                <motion.div 
                  initial={{ width: 0, opacity: 0 }}
                  animate={{ width: '66.666667%', opacity: 1 }}
                  transition={{ delay: 0.35, duration: 0.5 }}
                  className={`h-[1px] mx-auto mt-2 ${
                    activeLetterContent.id === 'l1'
                      ? 'bg-gradient-to-r from-transparent via-rose-300/40 to-transparent'
                      : activeLetterContent.id === 'l2'
                      ? 'bg-gradient-to-r from-transparent via-indigo-300/40 to-transparent'
                      : 'bg-gradient-to-r from-transparent via-amber-300/40 to-transparent'
                  }`} 
                />
              </div>

              {/* Main letter content with stationery lined backdrop pattern */}
              <div 
                className={`relative min-h-[140px] py-2 px-1 ${
                  activeLetterContent.id === 'l1'
                    ? 'bg-[linear-gradient(rgba(244,63,94,0.05)_1px,transparent_1px)] bg-[size:100%_2.25rem]'
                    : activeLetterContent.id === 'l2'
                    ? 'bg-[linear-gradient(rgba(99,102,241,0.05)_1px,transparent_1px)] bg-[size:100%_2.25rem]'
                    : 'bg-[linear-gradient(rgba(245,158,11,0.05)_1px,transparent_1px)] bg-[size:100%_2.25rem]'
                }`}
              >
                <motion.p 
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.45, duration: 0.6 }}
                  className={`font-caveat text-xl md:text-2xl leading-[2.25rem] font-bold text-center select-text ${
                    activeLetterContent.id === 'l1'
                      ? 'text-[#7c071d]/90'
                      : activeLetterContent.id === 'l2'
                      ? 'text-[#4c1d95]/90'
                      : 'text-amber-900/90'
                  }`}
                >
                  {activeLetterContent.body}
                </motion.p>
                
                <motion.p 
                  initial={{ opacity: 0, x: -15 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.6, duration: 0.4 }}
                  className={`font-caveat text-2xl md:text-3xl text-right font-extrabold leading-[2.25rem] mt-4 block pr-2 ${
                    activeLetterContent.id === 'l1'
                      ? 'text-[#7c071d]'
                      : activeLetterContent.id === 'l2'
                      ? 'text-[#4c1d95]'
                      : 'text-amber-950'
                  }`}
                >
                  — {activeLetterContent.sender}
                </motion.p>
              </div>

              {/* Colored Close Button matching key design */}
              <motion.div 
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7, duration: 0.4 }}
                className="mt-5 flex justify-center"
              >
                <button
                  onClick={() => setActiveLetterContent(null)}
                  className={`rounded-full font-sans font-bold text-xs py-2.5 px-10 transition-all duration-200 active:scale-95 cursor-pointer flex items-center justify-center gap-2 hover:scale-103 ${
                    activeLetterContent.id === 'l1'
                      ? 'bg-rose-500 hover:bg-rose-600 text-white shadow-md shadow-rose-500/20'
                      : activeLetterContent.id === 'l2'
                      ? 'bg-indigo-500 hover:bg-indigo-600 text-white shadow-md shadow-indigo-500/20'
                      : 'bg-amber-500 hover:bg-amber-600 text-white shadow-md shadow-amber-500/20'
                  }`}
                >
                  Close
                </button>
              </motion.div>

            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </section>
  );
}
