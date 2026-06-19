'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface ChapterScienceProps {
  activeSection: number;
}

export default function ChapterScience({ activeSection }: ChapterScienceProps) {
  const [showLibraryModal, setShowLibraryModal] = useState(false);
  const [dnaAlignment, setDnaAlignment] = useState(70);

  return (
    <div className="relative w-full h-full">
      {/* SECTION 1: Germplasm Library (Foundation) */}
      <section className="relative w-full h-screen flex items-center justify-start px-6 md:px-24 select-none overflow-hidden">
        <div className="max-w-xl z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="flex flex-col gap-4"
          >
            <span className="corn-tech-text text-cyan-400 text-xs md:text-sm tracking-[0.2em] font-semibold glow-text-cyan">
              CHAPTER 1 / SCIENCE
            </span>
            <h2 className="corn-title text-4xl md:text-6xl text-white font-extrabold leading-tight">
              FIRST, A SOLID <br />FOUNDATION.
            </h2>
            <p className="text-cyan-100/75 text-sm md:text-base leading-relaxed max-w-lg">
              We have the world's most comprehensive corn germplasm library. And every year, we create more unique genetic lines, each one traceable back to the first inbred development program started in 1920.
            </p>

            {/* Radar Explore Button */}
            <div className="mt-8 flex items-center gap-6">
              <button
                onClick={() => setShowLibraryModal(true)}
                className="w-20 h-20 rounded-full border border-cyan-400 bg-cyan-950/40 pulsing-radar flex items-center justify-center cursor-pointer transition-all duration-300 hover:scale-110 active:scale-95 text-cyan-400 hover:text-white"
                aria-label="Explore Library"
              >
                <span className="corn-tech-text text-[9px] font-bold text-center leading-none">
                  EXPLORE<br />LIBRARY
                </span>
              </button>
              <span className="corn-tech-text text-[10px] text-cyan-400/40 tracking-wider">
                Click hotspot to scan
              </span>
            </div>
          </motion.div>
        </div>

        {/* Explore Library HUD Modal Overlay */}
        <AnimatePresence>
          {showLibraryModal && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 bg-[#000c07]/80 backdrop-blur-md flex items-center justify-center p-6"
            >
              <motion.div
                initial={{ scale: 0.9, y: 20 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.9, y: 20 }}
                className="relative max-w-lg w-full hud-border p-8 rounded-lg"
              >
                {/* HUD tech crosshair corners */}
                <span className="absolute top-2 left-2 w-4 h-4 border-t border-l border-cyan-400/50" />
                <span className="absolute top-2 right-2 w-4 h-4 border-t border-r border-cyan-400/50" />
                <span className="absolute bottom-2 left-2 w-4 h-4 border-b border-l border-cyan-400/50" />
                <span className="absolute bottom-2 right-2 w-4 h-4 border-b border-r border-cyan-400/50" />

                <div className="flex justify-between items-start mb-6">
                  <div className="flex flex-col">
                    <span className="corn-tech-text text-cyan-400 text-xs">GENETIC INVENTORY SCAN</span>
                    <h3 className="corn-title text-xl text-white font-bold tracking-wide">BILLIONS OF POSSIBILITIES</h3>
                  </div>
                  <button
                    onClick={() => setShowLibraryModal(false)}
                    className="text-cyan-400/60 hover:text-cyan-400 cursor-pointer font-bold text-lg"
                  >
                    ✕
                  </button>
                </div>

                <div className="flex flex-col gap-4 text-cyan-100/80 text-sm leading-relaxed">
                  <p>
                    From our initial breeding lines a century ago, we've built our germplasm from the ground up. Impeccable pedigree records allow breeders to quickly select genetic lines with the most potential to solve challenges and increase yield.
                  </p>
                  <p className="border-t border-cyan-400/10 pt-4 font-semibold text-cyan-400">
                    STATUS: 100% Traceability verified. The breeding process begins.
                  </p>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </section>

      {/* SECTION 2: Simulations */}
      <section className="relative w-full h-screen flex items-center justify-end px-6 md:px-24 select-none overflow-hidden">
        <div className="max-w-xl z-10 text-right md:text-right flex flex-col items-end">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="flex flex-col gap-4 items-end"
          >
            <span className="corn-tech-text text-green-400 text-xs md:text-sm tracking-[0.2em] font-semibold glow-text-green">
              CHAPTER 1 / DATA PROCESSING
            </span>
            <h2 className="corn-title text-4xl md:text-6xl text-white font-extrabold leading-tight">
              COMPUTERS CUT <br />THE CONTENDERS.
            </h2>
            <p className="text-cyan-100/75 text-sm md:text-base leading-relaxed max-w-lg text-right">
              Petabytes of data (that's one million GB each) feed into computers, running millions of simulations using proprietary algorithms for the most accurate predictions. Nearly 20x more candidates are in our pipeline compared with 10 years ago, far more than we could ever test in the field.
            </p>

            {/* Diagnostic stats hud box */}
            <div className="hud-border p-4 rounded mt-4 w-72 text-left relative overflow-hidden border-green-500/20">
              <div className="flex justify-between items-center text-[10px] corn-tech-text text-green-400 mb-2">
                <span>SIMULATION_ENGINE_v4.2</span>
                <span className="animate-pulse">RUNNING</span>
              </div>
              <div className="flex flex-col gap-1.5 font-mono text-xs text-green-100/80">
                <div className="flex justify-between">
                  <span>DATASETS PROCESSED:</span>
                  <span className="text-white">12.4 Petabytes</span>
                </div>
                <div className="flex justify-between">
                  <span>ALGORITHM ITERATIONS:</span>
                  <span className="text-white">42,000,000 / sec</span>
                </div>
                <div className="flex justify-between">
                  <span>SIMULATION SUCCESS RATE:</span>
                  <span className="text-white">99.998%</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* SECTION 3: Breeders selection */}
      <section className="relative w-full h-screen flex items-center justify-start px-6 md:px-24 select-none overflow-hidden">
        <div className="max-w-xl z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="flex flex-col gap-4"
          >
            <span className="corn-tech-text text-cyan-400 text-xs md:text-sm tracking-[0.2em] font-semibold glow-text-cyan">
              CHAPTER 1 / BREEDING SELECTION
            </span>
            <h2 className="corn-title text-4xl md:text-6xl text-white font-extrabold leading-tight">
              OUR BREEDERS <br />DIAL IT IN FURTHER.
            </h2>
            <p className="text-cyan-100/75 text-sm md:text-base leading-relaxed max-w-lg">
              Advanced breeding technologies have reduced our development time by 30% over the last decade. A purer version of inbreds provides a clearer view into each line's performance, so we narrow the list down even faster.
            </p>

            {/* Interactive alignment slider */}
            <div className="mt-8 flex flex-col gap-3 w-80 hud-border p-5 rounded">
              <div className="flex justify-between items-center text-[10px] corn-tech-text text-cyan-400">
                <span>CHROMOSOME ALIGNMENT</span>
                <span>{dnaAlignment}% MATCH</span>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                value={dnaAlignment}
                onChange={(e) => setDnaAlignment(Number(e.target.value))}
                className="w-full corn-slider cursor-pointer"
              />
              <div className="flex justify-between text-[9px] text-cyan-400/40 font-mono">
                <span>0.0% MIN</span>
                <span>100% MAXIMUM PURITY</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
