import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Play, Pause, Sparkles, Film, Heart } from 'lucide-react';

export default function BirthdayVideo() {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [duration, setDuration] = useState<number>(0);
  const [videoSrc] = useState<string>('/end_video_song.mp4');
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const handlePlayClick = () => {
    // 1. Dispatch custom event to stop background music completely
    window.dispatchEvent(new CustomEvent('pause-bg-music'));
    
    // 2. Play the video
    if (videoRef.current) {
      videoRef.current.play()
        .then(() => {
          setIsPlaying(true);
        })
        .catch((err) => {
          console.warn("Play trigger failed, showing controls", err);
          setIsPlaying(true);
        });
    } else {
      setIsPlaying(true);
    }
  };

  const handleVideoPause = () => {
    setIsPlaying(false);
  };

  const handleVideoPlay = () => {
    window.dispatchEvent(new CustomEvent('pause-bg-music'));
    setIsPlaying(true);
  };

  const togglePlayPause = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
    }
  };

  const handleProgressBarClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (videoRef.current && duration > 0) {
      const rect = e.currentTarget.getBoundingClientRect();
      const clickX = e.clientX - rect.left;
      const width = rect.width;
      const newTime = (clickX / width) * duration;
      videoRef.current.currentTime = newTime;
      setCurrentTime(newTime);
    }
  };

  const progress = duration > 0 ? (currentTime / duration) * 100 : 0;

  return (
    <section id="birthday-video-section" className="mx-auto max-w-4xl px-4 sm:px-6 py-12">
      {/* Main Themed Video Card container */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 0.8 }}
        className="relative rounded-3xl bg-gradient-to-br from-rose-50/90 via-pink-50/80 to-indigo-50/70 p-[3px] shadow-[0_20px_50px_rgba(244,63,94,0.15)] border border-white/60 backdrop-blur-md overflow-hidden"
      >
        <div className="relative rounded-[22px] bg-white/70 backdrop-blur-md p-2 sm:p-3 flex flex-col items-center">
          
          {/* Main Video Viewport Container */}
          <div 
            id="video-viewport"
            className="relative w-full aspect-video rounded-2xl overflow-hidden shadow-inner border border-rose-150/40 bg-zinc-950 flex flex-col items-center justify-center cursor-pointer group"
          >
            <video
              id="birthday-video-player"
              ref={videoRef}
              src={videoSrc}
              controls={false}
              onPause={handleVideoPause}
              onPlay={handleVideoPlay}
              onTimeUpdate={(e) => setCurrentTime(e.currentTarget.currentTime)}
              onLoadedMetadata={(e) => setDuration(e.currentTarget.duration)}
              onClick={togglePlayPause}
              className={`w-full h-full object-contain ${isPlaying ? 'block' : 'hidden'}`}
              playsInline
            />

            {/* Custom Elegant Progress Bar align to gold/rose themes */}
            {isPlaying && (
              <div 
                className="absolute bottom-0 inset-x-0 p-3 bg-gradient-to-t from-black/85 via-black/40 to-transparent z-20 flex items-center justify-between gap-3 text-white transition-opacity duration-300 opacity-60 group-hover:opacity-100"
                onClick={(e) => e.stopPropagation()} // Stop toggleplay when dragging bar
              >
                {/* Play/Pause Button */}
                <button 
                  onClick={togglePlayPause} 
                  className="hover:scale-110 active:scale-95 transition-all text-rose-400 hover:text-rose-300 cursor-pointer select-none"
                >
                  {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4 fill-rose-400 text-rose-400" />}
                </button>

                {/* Progress Bar slider */}
                <div 
                  className="relative flex-1 h-1.5 bg-white/20 hover:bg-white/30 rounded-full cursor-pointer group/bar transition-all"
                  onClick={handleProgressBarClick}
                >
                  <div 
                    className="absolute top-0 left-0 h-full bg-gradient-to-r from-rose-500 to-pink-500 rounded-full shadow-[0_0_8px_rgba(244,63,94,0.8)]"
                    style={{ width: `${progress}%` }}
                  />
                  <div 
                    className="absolute top-1/2 -translate-y-1/2 h-3.5 w-3.5 rounded-full bg-white border-2 border-rose-500 shadow-md opacity-0 group-hover/bar:opacity-100 transition-opacity"
                    style={{ left: `calc(${progress}% - 7px)` }}
                  />
                </div>
              </div>
            )}

            {/* Play Overlay Screen initially covering the video */}
            <AnimatePresence>
              {!isPlaying && (
                <motion.div
                  initial={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="absolute inset-0 z-10 flex flex-col items-center justify-center p-6 bg-gradient-to-t from-black/80 via-black/40 to-black/70 cursor-pointer text-white text-center"
                  onClick={handlePlayClick}
                >
                  {/* Outer glowing decoration rings */}
                  <div className="relative flex items-center justify-center">
                    <span className="absolute inline-flex h-20 w-20 rounded-full bg-rose-400 opacity-25 animate-pulse"></span>
                    <span className="absolute inline-flex h-16 w-16 rounded-full bg-rose-500 opacity-30 animate-ping" style={{ animationDuration: '3s' }}></span>
                    
                    {/* Pulsing Play Trigger */}
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      className="relative z-20 flex h-14 w-14 items-center justify-center rounded-full bg-rose-500 text-white shadow-xl transition-all"
                    >
                      <Play className="h-6 w-6 ml-1 fill-white text-white" />
                    </motion.button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

        </div>
      </motion.div>
    </section>
  );
}
