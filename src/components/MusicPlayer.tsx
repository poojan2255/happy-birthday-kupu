import { useState, useRef, useEffect } from 'react';
import { Play, Pause, Volume2, VolumeX, Music, SkipForward } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { BACKGROUND_MUSIC_STREAMS } from '../data/birthdayData';

export default function MusicPlayer() {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [currentTrackIndex, setCurrentTrackIndex] = useState<number>(0);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [volume, setVolume] = useState<number>(0.4);
  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const currentTrack = BACKGROUND_MUSIC_STREAMS[currentTrackIndex];

  useEffect(() => {
    // Lazy initialize standard audio
    audioRef.current = new Audio(currentTrack.url);
    audioRef.current.loop = true;
    audioRef.current.volume = volume;

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, [currentTrackIndex]);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = isMuted ? 0 : volume;
    }
  }, [volume, isMuted]);

  const togglePlay = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play()
        .then(() => setIsPlaying(true))
        .catch((err) => {
          console.warn("Audio play blocked by browser autoplay policy. User needs to tap first.", err);
          // Try playing again or alert gracefully
        });
    }
  };

  const handleNextTrack = () => {
    const wasPlaying = isPlaying;
    if (audioRef.current) {
      audioRef.current.pause();
    }
    setCurrentTrackIndex((prev) => (prev + 1) % BACKGROUND_MUSIC_STREAMS.length);
    setIsPlaying(false);

    // Let state reconcile, then play
    setTimeout(() => {
      if (wasPlaying && audioRef.current) {
        audioRef.current.play()
          .then(() => setIsPlaying(true))
          .catch(err => console.warn(err));
      }
    }, 150);
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

  return (
    <div id="music-player-container" className="fixed bottom-6 right-6 z-50">
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 15 }}
            transition={{ duration: 0.2 }}
            className="mb-3 w-64 rounded-2xl bg-white/45 p-4 shadow-xl border border-white/50 backdrop-blur-md font-sans text-rose-950"
          >
            <div className="mb-2 flex items-center justify-between">
              <span className="flex items-center gap-1.5 font-sans text-xs font-bold uppercase tracking-wider text-rose-700">
                <Music className="h-3 w-3 animate-pulse" /> Cozy Soundtrack
              </span>
              <button
                onClick={() => setIsExpanded(false)}
                className="font-mono text-xs text-rose-900/60 hover:text-rose-700 cursor-pointer"
              >
                Close
              </button>
            </div>

            <div className="mb-3">
              <h4 className="truncate font-sans font-bold text-rose-900 text-sm">{currentTrack.title}</h4>
              <p className="font-sans text-[11px] text-rose-950/60 font-medium">Sweet melodies of adoration</p>
            </div>

            {/* Visual Equalizer Simulation */}
            <div className="mb-4 flex items-end gap-1 px-1 h-5 justify-center">
              {[...Array(12)].map((_, i) => (
                <motion.div
                  key={i}
                  animate={{
                    height: isPlaying ? [4, Math.random() * 20 + 4, 4] : 4
                  }}
                  transition={{
                    duration: 1 + Math.random() * 0.5,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                  className="w-1 rounded-full bg-gradient-to-t from-pink-400 to-rose-400"
                />
              ))}
            </div>

            {/* Controls */}
            <div className="flex items-center justify-between gap-2">
              <button
                onClick={togglePlay}
                className="flex h-10 w-10 items-center justify-center rounded-full bg-rose-500 text-white shadow-xl hover:shadow-2xl transition-transform active:scale-95 hover:bg-rose-600 cursor-pointer"
              >
                {isPlaying ? <Pause className="h-4.5 w-4.5 filled-white pointer-events-none" /> : <Play className="h-4.5 w-4.5 filled-white ml-0.5 pointer-events-none" />}
              </button>

              <button
                onClick={handleNextTrack}
                title="Next Melodious Track"
                className="flex h-8 w-8 items-center justify-center rounded-full bg-white/60 text-rose-600 hover:bg-white/80 cursor-pointer transition-colors border border-white/40"
              >
                <SkipForward className="h-4 w-4 pointer-events-none" />
              </button>

              <div className="flex items-center gap-2">
                <button onClick={toggleMute} className="text-rose-900/60 hover:text-rose-600 cursor-pointer">
                  {isMuted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
                </button>
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.05"
                  value={volume}
                  onChange={(e) => {
                    setVolume(parseFloat(e.target.value));
                    if (isMuted) setIsMuted(false);
                  }}
                  className="h-1 w-16 cursor-pointer rounded-lg bg-white/40 accent-rose-500 outline-none"
                />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Pill Toggle Button */}
      <motion.button
        id="sound-pill-toggle"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsExpanded(!isExpanded)}
        className="flex items-center gap-2 rounded-full border border-white/50 bg-white/35 px-4 py-2.5 shadow-lg backdrop-blur-md cursor-pointer text-rose-900 hover:text-rose-700 transition-colors"
      >
        <div className="relative flex h-2 w-2">
          {isPlaying && (
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-rose-400 opacity-75"></span>
          )}
          <span className="relative inline-flex h-2 w-2 rounded-full bg-rose-500"></span>
        </div>
        <Music className={`h-4 w-4 ${isPlaying ? 'animate-spin' : ''}`} style={{ animationDuration: '6s' }} />
        <span className="font-sans text-xs font-bold tracking-wide">
          {isPlaying ? "Playing Background Music" : "Tuning Kupu's Ambient Music ❤️"}
        </span>
      </motion.button>
    </div>
  );
}
