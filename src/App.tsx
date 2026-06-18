import { useState } from 'react';
import BirthdayHero from './components/BirthdayHero';
import PhotoGallery from './components/PhotoGallery';
import HeartfeltMessages from './components/HeartfeltMessages';
import BirthdayVideo from './components/BirthdayVideo';
import BackgroundMusic from './components/BackgroundMusic';
import { Sparkles, Heart } from 'lucide-react';
import { motion } from 'motion/react';

export default function App() {
  const scrollToView = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div id="master-app-wrapper" className="min-h-screen bg-gradient-to-tr from-[#fff5f6] via-[#faf5ff] to-[#f5fbfd] text-gray-800 antialiased selection:bg-pink-100 selection:text-rose-700 relative">

      {/* Sticky Aesthetic Header Navigation */}
      <header className="sticky top-0 z-50 bg-white/40 border-b border-white/50 backdrop-blur-md px-4 sm:px-6 py-4 shadow-md">
        <div className="mx-auto max-w-6xl flex items-center justify-center">
          
          <motion.div 
            whileHover={{ scale: 1.05 }}
            onClick={() => scrollToView('birthday-hero-section')}
            className="flex items-center gap-1.5 cursor-pointer text-center"
          >
            <Sparkles className="h-5 w-5 text-rose-500 animate-pulse" />
            <span className="font-serif font-bold text-lg tracking-wide bg-gradient-to-r from-rose-600 to-pink-500 bg-clip-text text-transparent">
              Kupu’s Magic Space ❤️
            </span>
          </motion.div>

        </div>
      </header>

      {/* Main Structural Blocks */}
      <main className="relative pb-24">
        <BirthdayHero />
        <PhotoGallery />
        <HeartfeltMessages />
        <BirthdayVideo />
      </main>

      {/* Floating Background Music Controller element */}
      <BackgroundMusic />

      {/* Dedicated Soft Heartfelt Footer */}
      <footer id="cozy-footer" className="bg-[#1e1518] text-pink-100/60 py-16 px-4 sm:px-6 relative overflow-hidden">
        
        {/* Subtle visual decoration stars */}
        <div className="absolute top-10 left-12 w-1.5 h-1.5 bg-yellow-300 rounded-full animate-ping" />
        <div className="absolute bottom-12 right-20 w-1 h-1 bg-yellow-300 rounded-full animate-ping" />

        <div className="mx-auto max-w-5xl text-center relative z-10 space-y-6">
          <div className="flex items-center justify-center gap-1.5 text-rose-400">
            <Heart className="h-5 w-5 fill-rose-500" />
            <Sparkles className="h-5 w-5 hover:animate-spin" />
          </div>

          <h4 className="font-serif font-bold text-xl md:text-2xl text-white tracking-wide">
            Happy Birthday, Kupu ❤️
          </h4>
          
          <p className="mx-auto max-w-md font-sans text-xs md:text-sm text-pink-100/40 leading-relaxed font-light">
            A little creation by Poojan Patel,Stay happy, keep smiling 🤍
          </p>

          <div className="border-t border-white/5 pt-8 mt-8 flex flex-col sm:flex-row items-center justify-between text-[11px] font-sans">
            <p className="opacity-50">
              &copy; 2026 Poojan Patel.
            </p>
            <p className="opacity-40 font-mono mt-2 sm:mt-0">
              [ June 19th,2026 ]
            </p>
          </div>
        </div>

      </footer>

    </div>
  );
}
