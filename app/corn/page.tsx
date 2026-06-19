'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './corn.css';

import Preloader from '@/components/corn/Preloader';
import BackgroundCanvas from '@/components/corn/BackgroundCanvas';
import Navigation from '@/components/corn/Navigation';
import ChapterScience from '@/components/corn/ChapterScience';
import ChapterTesting from '@/components/corn/ChapterTesting';
import ChapterResult from '@/components/corn/ChapterResult';

const sections = [
  { id: 'landing', hash: '', title: 'Corn. Revolutionized.' },
  { id: 'science-library', hash: 'science', title: 'Science - Library' },
  { id: 'science-sims', hash: 'science', title: 'Science - Simulations' },
  { id: 'science-breeders', hash: 'science', title: 'Science - Breeders' },
  { id: 'testing-field', hash: 'testing', title: 'Testing - Field' },
  { id: 'testing-late', hash: 'testing', title: 'Testing - Late-Stage' },
  { id: 'result-class', hash: 'result', title: 'Result - Advancement' },
  { id: 'result-footer', hash: 'result', title: 'Result - Contact' },
];

export default function CornRevolutionPage() {
  const [loadingComplete, setLoadingComplete] = useState(false);
  const [activeSection, setActiveSection] = useState(0);
  const [activeWeather, setActiveWeather] = useState('none');
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });
  
  // Audio state & Synth ref
  const [audioActive, setAudioActive] = useState(false);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const synthNodesRef = useRef<{ osc: OscillatorNode; gain: GainNode } | null>(null);

  // Scroll throttling ref
  const isScrollingRef = useRef(false);

  // Track cursor coordinates
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setCursorPos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Web Audio Synth Generator (Muffled Sci-Fi hum)
  useEffect(() => {
    if (audioActive) {
      try {
        const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
        const ctx = new AudioContextClass();
        audioCtxRef.current = ctx;

        const osc = ctx.createOscillator();
        const filter = ctx.createBiquadFilter();
        const gain = ctx.createGain();

        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(55, ctx.currentTime); // Low A hum
        
        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(100, ctx.currentTime); // Muffled lowpass

        osc.connect(filter);
        filter.connect(gain);
        gain.connect(ctx.destination);

        gain.gain.setValueAtTime(0, ctx.currentTime);
        gain.gain.linearRampToValueAtTime(0.12, ctx.currentTime + 1.5); // Smooth fade-in

        osc.start();
        synthNodesRef.current = { osc, gain };
      } catch (e) {
        console.warn('Audio Context failed to load', e);
      }
    } else {
      if (synthNodesRef.current && audioCtxRef.current) {
        const { gain, osc } = synthNodesRef.current;
        try {
          gain.gain.setValueAtTime(gain.gain.value, audioCtxRef.current.currentTime);
          gain.gain.linearRampToValueAtTime(0, audioCtxRef.current.currentTime + 0.5); // Fade out
          setTimeout(() => {
            osc.stop();
            audioCtxRef.current?.close();
          }, 600);
        } catch (e) {}
        synthNodesRef.current = null;
        audioCtxRef.current = null;
      }
    }
  }, [audioActive]);

  // Infinite Scroll Snapping Mechanics
  const handleScroll = (deltaY: number) => {
    if (isScrollingRef.current || !loadingComplete) return;

    isScrollingRef.current = true;
    setTimeout(() => {
      isScrollingRef.current = false;
    }, 900); // Animation throttle lock time

    let nextSec = activeSection;
    if (deltaY > 0) {
      // Scroll Down -> Wrap around if exceeding footer
      nextSec = activeSection + 1 > sections.length - 1 ? 0 : activeSection + 1;
    } else if (deltaY < 0) {
      // Scroll Up -> Wrap around if exceeding landing
      nextSec = activeSection - 1 < 0 ? sections.length - 1 : activeSection - 1;
    }

    setActiveSection(nextSec);
    updateUrlHash(nextSec);
  };

  // Sync section scroll triggers to URL hash
  const updateUrlHash = (secIndex: number) => {
    const targetHash = sections[secIndex].hash;
    const currentHash = window.location.hash.replace('#', '');
    if (targetHash !== currentHash) {
      // Use replaceState to avoid jerky scrolls triggered by hash routing
      window.history.replaceState(null, '', `#${targetHash}`);
    }
  };

  // Listen to mouse wheel
  useEffect(() => {
    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      handleScroll(e.deltaY);
    };
    window.addEventListener('wheel', onWheel, { passive: false });
    return () => window.removeEventListener('wheel', onWheel);
  }, [activeSection, loadingComplete]);

  // Touch Swipe gestures for Mobile
  useEffect(() => {
    let startY = 0;
    const onTouchStart = (e: TouchEvent) => {
      startY = e.touches[0].clientY;
    };
    const onTouchEnd = (e: TouchEvent) => {
      const endY = e.changedTouches[0].clientY;
      const deltaY = startY - endY;
      if (Math.abs(deltaY) > 50) {
        handleScroll(deltaY);
      }
    };

    window.addEventListener('touchstart', onTouchStart);
    window.addEventListener('touchend', onTouchEnd);
    return () => {
      window.removeEventListener('touchstart', onTouchStart);
      window.removeEventListener('touchend', onTouchEnd);
    };
  }, [activeSection, loadingComplete]);

  // Keypress events (arrow keys)
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowDown') {
        handleScroll(1);
      } else if (e.key === 'ArrowUp') {
        handleScroll(-1);
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [activeSection, loadingComplete]);

  // Handle Menu Chapter navigation click
  const handleChapterSelect = (hash: string) => {
    const cleanHash = hash.replace('#', '');
    const firstSecOfChapter = sections.findIndex((s) => s.hash === cleanHash);
    if (firstSecOfChapter !== -1) {
      setActiveSection(firstSecOfChapter);
      updateUrlHash(firstSecOfChapter);
    }
  };

  return (
    <div className="corn-theme relative w-full h-screen overflow-hidden">
      {/* 3D Particle Background Engine */}
      <BackgroundCanvas
        sectionIndex={activeSection}
        activeWeather={activeWeather}
        cursorPos={cursorPos}
      />

      {/* Preloader overlay */}
      <Preloader onComplete={() => setLoadingComplete(true)} />

      {/* Header & Global navigation menu overlay */}
      {loadingComplete && (
        <Navigation
          onChapterSelect={handleChapterSelect}
          audioActive={audioActive}
          setAudioActive={setAudioActive}
        />
      )}

      {/* Vertical Pagination dots (right side) */}
      {loadingComplete && (
        <div className="fixed right-6 md:right-8 top-1/2 -translate-y-1/2 flex flex-col gap-3 z-30 pointer-events-auto">
          {sections.map((sec, idx) => (
            <button
              key={idx}
              onClick={() => {
                setActiveSection(idx);
                updateUrlHash(idx);
              }}
              className={`w-2.5 h-2.5 rounded-full transition-all duration-300 border border-cyan-400/30 cursor-pointer ${
                activeSection === idx
                  ? 'bg-cyan-400 scale-125 shadow-[0_0_8px_rgba(18,238,252,0.6)]'
                  : 'bg-transparent hover:bg-cyan-400/40'
              }`}
              title={sec.title}
              aria-label={`Go to ${sec.title}`}
            />
          ))}
        </div>
      )}

      {/* Horizontal Scanline overlays */}
      <div className="fixed inset-0 w-full h-full pointer-events-none z-10 opacity-[0.04] bg-repeat" style={{ backgroundImage: 'linear-gradient(rgba(18, 238, 252, 0.5) 50%, transparent 50%)', backgroundSize: '100% 4px' }} />

      {/* Sliding Main Chapters Container */}
      {loadingComplete && (
        <motion.div
          animate={{ y: `-${activeSection * 100}vh` }}
          transition={{ duration: 1.0, ease: [0.76, 0, 0.24, 1] }}
          className="w-full h-full relative"
        >
          {/* SECTION 0: LANDING */}
          <section className="relative w-full h-screen flex flex-col items-center justify-center text-center px-6 select-none overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30 pointer-events-none z-0" />
            
            {/* Visual: Glowing Corn Cob Image with mouse parallax */}
            <motion.img
              src="/corn/landing_cob.png"
              alt="Pioneer Corn Cob"
              className="absolute top-1/2 left-1/2 w-[340px] md:w-[480px] h-[340px] md:h-[480px] object-contain pointer-events-none z-0 filter drop-shadow-[0_0_40px_rgba(57,229,87,0.2)] opacity-85"
              style={{
                x: cursorPos.x * 0.015 - (typeof window !== 'undefined' ? window.innerWidth * 0.0075 + 170 : 170),
                y: cursorPos.y * 0.015 - (typeof window !== 'undefined' ? window.innerHeight * 0.0075 + 240 : 240),
              }}
            />

            <div className="z-10 flex flex-col items-center gap-6 max-w-4xl">
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 1.2, delay: 0.2, ease: 'easeOut' }}
                className="flex flex-col gap-4 items-center"
              >
                {/* Custom Split Letter Hovering Title Effect */}
                <h1 className="corn-title text-5xl md:text-8xl text-white font-extrabold tracking-wide select-none glow-text-cyan flex gap-2 justify-center flex-wrap">
                  {"CORN. REVOLUTIONIZED.".split(" ").map((word, wordIdx) => (
                    <span key={wordIdx} className="flex">
                      {word.split("").map((char, charIdx) => (
                        <span 
                          key={charIdx} 
                          className="hover:text-cyan-400 hover:scale-110 transition-transform duration-150 inline-block cursor-default"
                        >
                          {char}
                        </span>
                      ))}
                    </span>
                  ))}
                </h1>

                <p className="text-cyan-100/70 text-sm md:text-lg max-w-lg leading-relaxed mt-2">
                  From lab to field, it's corn seed development that will change farming.
                </p>
              </motion.div>

              {/* Scroll down indicator */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.5 }}
                transition={{ delay: 1.5 }}
                onClick={() => handleScroll(1)}
                className="mt-12 flex flex-col items-center gap-2 cursor-pointer group text-cyan-400/80 hover:text-cyan-400 select-none"
              >
                <span className="corn-tech-text text-[10px] tracking-[0.2em] font-semibold">SCROLL TO DISCOVER</span>
                <span className="text-xs scroll-indicator">↓</span>
              </motion.div>
            </div>
          </section>

          {/* CHAPTER 1: SCIENCE (SECTIONS 1, 2, 3) */}
          <ChapterScience activeSection={activeSection} />

          {/* CHAPTER 2: REAL WORLD TESTING (SECTIONS 4, 5) */}
          <ChapterTesting
            activeSection={activeSection}
            onWeatherChange={setActiveWeather}
          />

          {/* CHAPTER 3: RESULT (SECTIONS 6, 7) */}
          <ChapterResult activeSection={activeSection} />
        </motion.div>
      )}
    </div>
  );
}
