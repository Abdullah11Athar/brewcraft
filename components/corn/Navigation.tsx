'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface NavigationProps {
  onChapterSelect: (hash: string) => void;
  audioActive: boolean;
  setAudioActive: (active: boolean) => void;
}

export default function Navigation({ onChapterSelect, audioActive, setAudioActive }: NavigationProps) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  const handleMenuClick = (hash: string) => {
    setIsOpen(false);
    onChapterSelect(hash);
  };

  return (
    <>
      {/* Header bar */}
      <header className="fixed top-0 left-0 w-full z-50 px-6 py-6 md:px-12 md:py-8 flex justify-between items-center pointer-events-none">
        {/* Left Side: Hamburger & Pioneer Logo */}
        <div className="flex items-center gap-6 pointer-events-auto">
          {/* Hamburger Menu Toggle */}
          <button
            onClick={toggleMenu}
            className="w-10 h-10 flex flex-col justify-center items-center gap-1.5 border border-cyan-400/20 bg-[#000c07]/60 hover:bg-cyan-500/10 rounded-full cursor-pointer transition-all duration-300 pointer-events-auto"
            aria-label="Toggle Navigation Menu"
          >
            <span className={`w-5 h-[1px] bg-cyan-400 transition-all duration-300 ${isOpen ? 'rotate-45 translate-y-[7px]' : ''}`} />
            <span className={`w-5 h-[1px] bg-cyan-400 transition-all duration-300 ${isOpen ? 'opacity-0' : ''}`} />
            <span className={`w-5 h-[1px] bg-cyan-400 transition-all duration-300 ${isOpen ? '-rotate-45 -translate-y-[7px]' : ''}`} />
          </button>

          {/* Logo */}
          <a
            href="#landing"
            onClick={(e) => {
              e.preventDefault();
              handleMenuClick('#');
            }}
            className="flex items-center cursor-pointer pointer-events-auto"
          >
            {/* SVG Logo */}
            <svg className="w-28 h-6 text-white fill-current hover:text-cyan-400 transition-colors" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 377.81 70.4">
              <path d="M306.39,9.63V59.7h25.69V50.89l-16.54,0v-9A2.42,2.42,0,0,1,318,39.28H330.1l0-9.06H315.57V20.57a2,2,0,0,1,2.34-1.93l14,0v-9Z" />
              <path d="M349,32.17H356c2.78-.32,3.2-1.59,3.2-1.59,1.18-1.54,1.07-5.14,1.07-5.14.15-3.86-.88-5.38-.88-5.38-.77-1.54-3.23-1.68-3.23-1.68H349Zm0,27.51H339.6V9.55h19.32c6,.09,8.18,4,8.18,4C370.4,18,369.88,25,369.88,25c.34,7.55-2,10.77-2,10.77a8.58,8.58,0,0,1-6.12,4.74l9.84,19.23h-8.55a3.74,3.74,0,0,1-3.36-1.75L352,42.51a1.49,1.49,0,0,0-1.63-1H349Z" />
              <path d="M143.63,18.58V35.09h4.76s3.14.25,4.36-.87c0,0,2-1.39,2-7.42,0,0,0-6.06-2.13-7.46a4,4,0,0,0-3-.77Zm8.26-9c6.18,0,8.87,3.59,8.87,3.59,3.8,4,3.45,13.47,3.45,13.47.43,10.61-3.74,14.13-3.74,14.13-3.57,3.88-9.09,3.6-9.09,3.6h-7.54V59.71h-9.43l0-41h-5l0-9.18h22.59" />
              <polygon points="171.23 9.54 171.24 59.67 180.54 59.67 180.54 9.54 171.23 9.54" />
              <path d="M205.82,18.16a7.66,7.66,0,0,0-4.06.92s-1.85.93-2.39,4.45a77.46,77.46,0,0,0-.76,12.15s.17,8.3.46,9.68c0,0,.3,3.23,1.51,4.61,0,0,1,2,4.74,1.89,0,0,3.25.25,5-1.6,0,0,1.31-1,1.81-4.68,0,0,.34-1.66.48-9.65,0,0,0-9.73-.54-12.21A7.87,7.87,0,0,0,210,19.38s-1.09-1.3-4.15-1.22m9.73-6.7c4.14,2.64,5.15,8.09,5.15,8.09,1.34,4.65,1.17,15.67,1.17,15.67C222,45,221,48.8,221,48.8c-1.14,6-3.82,8.22-3.82,8.22a10.67,10.67,0,0,1-5.57,3.1,22.83,22.83,0,0,1-5.91.63c-5.11.08-7.42-1-7.42-1a10.51,10.51,0,0,1-4.31-2.72c-3.61-3.85-4.19-9.6-4.19-9.6-.5-3-.51-14.34-.51-14.34a60.05,60.05,0,0,1,1-13.16c1.17-4.86,3.48-6.87,3.48-6.87C197.86,8.82,206,9.19,206,9.19c6.75-.21,9.52,2.27,9.52,2.27" />
              <path d="M230,9.55V59.67h8.74V21.35L247.91,56A5,5,0,0,0,253,59.68h9.66l0-50.14h-8.54l0,37.89-9.25-35s-.45-2.91-3.26-2.91Z" />
              <path d="M273,9.49V59.7h25.69v-9l-16.54,0v-9a2.41,2.41,0,0,1,2.42-2.6h12.14l0-9.06H282.18V20.43a2,2,0,0,1,2.35-1.93l14,0v-9Z" />
              <path d="M375,57.37v-.83h.55c.29,0,.59.06.59.39s-.31.44-.66.44Zm0,.34h.47l.7,1.17h.46l-.76-1.19a.68.68,0,0,0,.69-.73c0-.53-.31-.76-.95-.76h-1v2.68h.4Zm.49,2.16a2.33,2.33,0,1,0-2.37-2.34,2.33,2.33,0,0,0,2.37,2.34m-1.89-2.34a1.89,1.89,0,1,1,1.89,1.95,1.88,1.88,0,0,1-1.89-1.95" />
              <path d="M103.79,62.57c-3.8,4.73-11.36,4.37-11.36,4.37H20.78c-8.1,0-11.35-5.69-11.35-5.69a12.39,12.39,0,0,1-1.22-11L23.93,9.62c1.5-4,4.16-5.1,4.16-5.1a13.42,13.42,0,0,1,6.13-1.15H79.86c5.52-.19,7.59,1.74,7.59,1.74,2,1.32,4,6.25,4,6.25l13.45,34.58a26.33,26.33,0,0,1,1.73,5c1.76,6.66-2.86,11.65-2.86,11.65m4.78-16.8L94.27,9.08s-1.62-4.89-5.42-7.35c0,0-2.2-1.87-9.1-1.72H33.31A15.3,15.3,0,0,0,25.7,1.85,12,12,0,0,0,21,7.34L5.49,46.81s-3.93,7.82.1,15.35c0,0,4.09,6.21,9.74,7.62,0,0,2.44.82,8.9.57H92.78s5.29.26,8.83-1.55c0,0,3.64-1.48,6.72-6.4,0,0,4.93-6.45.24-16.63" />
              <path d="M76.69,54s-5.06.88-13.32-6.45c0,0,6.5-6.5,13-6.43,0,0,7.4-.17,8,6.35,0,0,.22,6.26-7.72,6.53M38.43,54c-7.95-.27-7.73-6.53-7.73-6.53.64-6.52,8-6.35,8-6.35,6.5-.07,13,6.43,13,6.43C43.48,54.83,38.43,54,38.43,54M93,47.62a13.59,13.59,0,0,0-5-10.23c-4.72-4-11.26-3.75-11.26-3.75-8.44-.1-15.48,6.11-15.48,6.11a14.16,14.16,0,0,1,7-11.72,17.23,17.23,0,0,1,9-2.31,20.65,20.65,0,0,1,4.07.39c-6.3-7.87-17.19-6.27-20.94.3a26.6,26.6,0,0,0,1.49-8A17,17,0,0,0,57.56,7a17,17,0,0,0-4.32,11.33,26.6,26.6,0,0,0,1.49,8.05c-3.75-6.57-14.64-8.17-20.94-.3a20.65,20.65,0,0,1,4.07-.39,17.23,17.23,0,0,1,9,2.31,14.16,14.16,0,0,1,7,11.72s-7-6.21-15.48-6.11c0,0-6.54-.26-11.26,3.75a13.62,13.62,0,0,0-5,10.23A13.61,13.61,0,0,0,27.44,58a16.89,16.89,0,0,0,10.47,3.49,23.56,23.56,0,0,0,10.56-2.62s3.52-1.54,9.09-6.75c5.56,5.21,9.08,6.75,9.08,6.75A23.56,23.56,0,0,0,77.2,61.51,16.89,16.89,0,0,0,87.67,58,13.61,13.61,0,0,0,93,47.62" />
              <path d="M2,66.77v-.88h.59c.29,0,.61.06.61.41s-.32.47-.69.47Zm0,.36h.5l.74,1.23h.49L2.9,67.11a.75.75,0,0,0,.74-.78c0-.56-.34-.8-1-.8H1.55v2.83H2ZM2.5,69.4a2.46,2.46,0,1,0,0-4.91,2.46,2.46,0,1,0,0,4.91m-2-2.47a2,2,0,0,1,2-2,2.05,2.05,0,1,1-2,2" />
            </svg>
          </a>
        </div>

        {/* Right Side: Sound Control Toggle */}
        <button
          onClick={() => setAudioActive(!audioActive)}
          className="w-10 h-10 flex items-center justify-center border border-cyan-400/20 bg-[#000c07]/60 hover:bg-cyan-500/10 rounded-full cursor-pointer transition-all duration-300 pointer-events-auto"
          aria-label="Toggle Audio Track"
        >
          {audioActive ? (
            /* Animated Equalizer bar lines */
            <div className="flex items-end gap-[2px] h-3.5">
              <span className="w-[2px] bg-cyan-400 animate-[pulse_0.6s_infinite_alternate]" style={{ height: '100%' }} />
              <span className="w-[2px] bg-cyan-400 animate-[pulse_0.4s_infinite_alternate]" style={{ height: '60%', animationDelay: '0.1s' }} />
              <span className="w-[2px] bg-cyan-400 animate-[pulse_0.7s_infinite_alternate]" style={{ height: '80%', animationDelay: '0.2s' }} />
              <span className="w-[2px] bg-cyan-400 animate-[pulse_0.5s_infinite_alternate]" style={{ height: '40%', animationDelay: '0.3s' }} />
            </div>
          ) : (
            /* Silent icon indicator */
            <div className="flex items-end gap-[2px] h-3.5 opacity-40">
              <span className="w-[2px] h-[3px] bg-cyan-400" />
              <span className="w-[2px] h-[3px] bg-cyan-400" />
              <span className="w-[2px] h-[3px] bg-cyan-400" />
              <span className="w-[2px] h-[3px] bg-cyan-400" />
            </div>
          )}
        </button>
      </header>

      {/* Fullscreen Navigation Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5, ease: [0.76, 0, 0.24, 1] }}
            className="fixed inset-0 z-40 bg-[#000804]/95 backdrop-blur-2xl flex flex-col justify-between p-12 md:p-24 corn-theme"
          >
            {/* Tech grid scan overlay lines */}
            <div className="absolute inset-0 bg-radial-gradient from-transparent to-black opacity-40 pointer-events-none" />

            {/* Menu contents */}
            <div className="mt-16 flex-1 flex flex-col md:flex-row justify-between items-start md:items-center max-w-6xl w-full mx-auto z-10 gap-12">
              {/* Left Side: Chapter Navigation Lists */}
              <div className="flex flex-col gap-3">
                <span className="corn-tech-text text-cyan-400/50 text-xs tracking-widest font-semibold mb-3">
                  EXPLORE THE STORY
                </span>
                
                <ul className="flex flex-col gap-6 md:gap-8">
                  {/* Chapter 1: Science */}
                  <motion.li
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1, duration: 0.5 }}
                    onClick={() => handleMenuClick('#science')}
                    className="group cursor-pointer"
                  >
                    <span className="corn-tech-text text-cyan-400/40 text-xs block mb-1 group-hover:text-cyan-400 transition-colors">
                      CHAPTER 1
                    </span>
                    <h2 className="corn-title text-3xl md:text-5xl text-white group-hover:text-cyan-400 group-hover:pl-3 transition-all duration-300">
                      SCIENCE
                    </h2>
                  </motion.li>

                  {/* Chapter 2: Real World Testing */}
                  <motion.li
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2, duration: 0.5 }}
                    onClick={() => handleMenuClick('#testing')}
                    className="group cursor-pointer"
                  >
                    <span className="corn-tech-text text-cyan-400/40 text-xs block mb-1 group-hover:text-cyan-400 transition-colors">
                      CHAPTER 2
                    </span>
                    <h2 className="corn-title text-3xl md:text-5xl text-white group-hover:text-cyan-400 group-hover:pl-3 transition-all duration-300">
                      REAL WORLD TESTING
                    </h2>
                  </motion.li>

                  {/* Chapter 3: Result */}
                  <motion.li
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3, duration: 0.5 }}
                    onClick={() => handleMenuClick('#result')}
                    className="group cursor-pointer"
                  >
                    <span className="corn-tech-text text-cyan-400/40 text-xs block mb-1 group-hover:text-cyan-400 transition-colors">
                      CHAPTER 3
                    </span>
                    <h2 className="corn-title text-3xl md:text-5xl text-white group-hover:text-cyan-400 group-hover:pl-3 transition-all duration-300">
                      RESULT
                    </h2>
                  </motion.li>
                </ul>
              </div>

              {/* Right Side: Action Forms & Links CTAs */}
              <div className="flex flex-col gap-6 md:border-l md:border-cyan-400/10 md:pl-16 py-4">
                <button
                  onClick={() => handleMenuClick('#result')}
                  className="btn-hud text-left text-sm py-4 px-8 w-64 uppercase"
                >
                  SIGN UP FOR NEWS
                </button>
                <button
                  onClick={() => handleMenuClick('#result')}
                  className="btn-hud text-left text-sm py-4 px-8 w-64 uppercase"
                >
                  CONTACT A MANAGER
                </button>
                
                <a
                  href="https://go.pioneer.com/cornrevolution-podcast"
                  target="_blank"
                  rel="noreferrer"
                  className="corn-tech-text text-xs text-cyan-400 hover:text-green-400 transition-colors mt-2"
                >
                  VISIT CORN PODCAST ↗
                </a>
                <a
                  href="https://www.pioneer.com/"
                  target="_blank"
                  rel="noreferrer"
                  className="corn-tech-text text-xs text-cyan-400 hover:text-green-400 transition-colors"
                >
                  VISIT PIONEER.COM ↗
                </a>
              </div>
            </div>

            {/* Menu Footer links */}
            <div className="w-full max-w-6xl mx-auto border-t border-cyan-400/10 pt-6 flex flex-col md:flex-row justify-between items-center z-10 gap-4">
              <div className="flex gap-6 text-xs text-cyan-400/60 font-medium">
                <a href="http://www.pioneer.com/home/site/about/terms-of-use" target="_blank" rel="noreferrer" className="hover:text-cyan-400">TERMS & CONDITIONS</a>
                <a href="https://www.pioneer.com/us/privacy-policy.html" target="_blank" rel="noreferrer" className="hover:text-cyan-400">PRIVACY POLICY</a>
                <a href="https://www.corteva.us/california-privacy-rights.html" target="_blank" rel="noreferrer" className="hover:text-cyan-400">CALIFORNIA PRIVACY</a>
              </div>
              <div className="flex gap-4">
                {/* Social icons */}
                <a href="https://www.twitter.com/pioneerseeds" target="_blank" rel="noreferrer" className="w-8 h-8 rounded-full border border-cyan-400/20 flex items-center justify-center hover:border-cyan-400 hover:text-cyan-400 text-white transition-all">
                  TW
                </a>
                <a href="https://www.facebook.com/PioneerSeeds" target="_blank" rel="noreferrer" className="w-8 h-8 rounded-full border border-cyan-400/20 flex items-center justify-center hover:border-cyan-400 hover:text-cyan-400 text-white transition-all">
                  FB
                </a>
                <a href="https://www.instagram.com/pioneerseeds/" target="_blank" rel="noreferrer" className="w-8 h-8 rounded-full border border-cyan-400/20 flex items-center justify-center hover:border-cyan-400 hover:text-cyan-400 text-white transition-all">
                  IG
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
