import { useEffect, useRef } from 'react';

export default function BackgroundMusic() {
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    // 1. Initialize background audio with soft ambient volume levels
    const audio = new Audio('/bg_music.mp3');
    audio.loop = false; // Play once so 'ended' event fires
    audio.volume = 0.40;
    audioRef.current = audio;

    // Transition to 'Love Story.mp3' once the first background music finishes playing
    const handleEndedEvent = () => {
      if (audioRef.current) {
        console.log('First background music ended. Shifting play context to Love Story.mp3.');
        audioRef.current.src = '/Love Story.mp3';
        audioRef.current.loop = true; // Let the romantic track loop continuously
        audioRef.current.load();
        audioRef.current.play().catch((err) => {
          console.warn('Auto-playback of Love Story.mp3 was blocked: ', err);
        });
      }
    };

    audio.addEventListener('ended', handleEndedEvent);

    let isPlaying = false;
    let isMutedSetupDone = false;

    // Helper function to play or unmute and play
    const attemptPlay = () => {
      if (!audioRef.current) return;

      // Try playing unmuted
      audioRef.current.muted = false;
      audioRef.current.play()
        .then(() => {
          isPlaying = true;
          cleanupAllListeners();
        })
        .catch((err) => {
          console.log('Direct playback blocked, applying pre-buffer muted trick: ', err);
          
          // Muted pre-buffering trick (Browsers always allow muted autoplay)
          if (!isMutedSetupDone && audioRef.current) {
            audioRef.current.muted = true;
            audioRef.current.play()
              .then(() => {
                isMutedSetupDone = true;
              })
              .catch((muteErr) => {
                console.log('Muted autoplay also blocked: ', muteErr);
              });
          }
        });
    };

    // Activates on any pointer/keyboard/scrolling/hovering/focusing activity
    const triggerAudioUnmuteAndPlay = () => {
      if (audioRef.current) {
        audioRef.current.muted = false;
        audioRef.current.play()
          .then(() => {
            isPlaying = true;
            cleanupAllListeners();
          })
          .catch((err) => {
            console.log('Interaction trigger playback tried: ', err);
          });
      }
    };

    // Comprehensive list of document-wide event listeners to capture any user movement, scroll, key, or micro-interaction
    const attachAllListeners = () => {
      const targetEvents = [
        'click', 'touchstart', 'scroll', 'keydown', 'mousemove', 
        'pointermove', 'pointerdown', 'mouseenter', 'mouseover', 
        'focus', 'wheel'
      ];
      
      targetEvents.forEach((event) => {
        document.addEventListener(event, triggerAudioUnmuteAndPlay, { passive: true });
      });
    };

    const cleanupAllListeners = () => {
      const targetEvents = [
        'click', 'touchstart', 'scroll', 'keydown', 'mousemove', 
        'pointermove', 'pointerdown', 'mouseenter', 'mouseover', 
        'focus', 'wheel'
      ];

      targetEvents.forEach((event) => {
        document.removeEventListener(event, triggerAudioUnmuteAndPlay);
      });
    };

    const handlePauseEvent = () => {
      if (audioRef.current) {
        audioRef.current.pause();
      }
    };

    const handleResumeEvent = () => {
      if (audioRef.current) {
        // Only try to play if page had interaction already
        audioRef.current.play().catch(() => {});
      }
    };

    window.addEventListener('pause-bg-music', handlePauseEvent);
    window.addEventListener('resume-bg-music', handleResumeEvent);

    // Start checking right away
    attemptPlay();
    attachAllListeners();

    return () => {
      cleanupAllListeners();
      audio.removeEventListener('ended', handleEndedEvent);
      window.removeEventListener('pause-bg-music', handlePauseEvent);
      window.removeEventListener('resume-bg-music', handleResumeEvent);
      audio.pause();
      audioRef.current = null;
    };
  }, []);

  return null; // Keep it fully invisible as requested
}
