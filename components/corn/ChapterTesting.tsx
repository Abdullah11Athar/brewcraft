'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface ChapterTestingProps {
  activeSection: number;
  onWeatherChange: (weather: string) => void;
}

const conditions = [
  {
    id: 'wind',
    label: 'WIND',
    title: 'Boreas Mobile Wind Stress',
    body: 'The Boreas mobile wind machine simulates high winds to test stalk and root strength at critical points in the growing season.'
  },
  {
    id: 'drought',
    label: 'DROUGHT',
    title: 'Managed Stress Environments',
    body: 'Pioneer tests in dedicated managed stress environments and water-limited environments to develop new hybrids. In two years of testing, P1548YHR demonstrated a 9 bu/A yield advantage in stress environments.'
  },
  {
    id: 'disease',
    label: 'DISEASE',
    title: 'Blight & Wilt Resistance',
    body: "We've achieved 9% improvement in northern leaf blight resistance for the Eastern Corn Belt since 2015. For the Western Corn Belt, resistance to diseases like Goss's wilt continues to lead the industry."
  },
  {
    id: 'soil',
    label: 'SOIL',
    title: 'Agronomic Placement Guidelines',
    body: 'Performance is tested in different soil types and environments to ensure the best placement and management advice for farmer success.'
  },
  {
    id: 'population',
    label: 'POPULATION',
    title: 'Optimal Planting Densities',
    body: 'Plants are tested at different seedling rates to uncover the optimal balance of population and performance.'
  }
];

export default function ChapterTesting({ activeSection, onWeatherChange }: ChapterTestingProps) {
  const [selectedCond, setSelectedCond] = useState(conditions[0]);
  const [isTestMode, setIsTestMode] = useState(false);

  const handleCondSelect = (cond: typeof conditions[0]) => {
    setSelectedCond(cond);
    onWeatherChange(cond.id);
  };

  const startTestMode = () => {
    setIsTestMode(true);
    onWeatherChange(selectedCond.id);
  };

  const exitTestMode = () => {
    setIsTestMode(false);
    onWeatherChange('none');
  };

  return (
    <div className="relative w-full h-full">
      {/* SECTION 4: Field Testing */}
      <section className="relative w-full h-screen flex items-center justify-start px-6 md:px-24 select-none overflow-hidden">
        {/* Visual: Hyper-realistic Corn Stalk in center background */}
        <img
          src="/corn/testing_stalk.png"
          alt="Pioneer Corn Stalk"
          className="absolute top-1/2 left-1/2 w-[300px] md:w-[480px] h-[300px] md:h-[480px] object-contain -translate-x-1/2 -translate-y-1/2 pointer-events-none z-0 opacity-65 filter drop-shadow-[0_0_30px_rgba(57,229,87,0.15)]"
        />

        <div className="max-w-xl z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="flex flex-col gap-4"
          >
            <span className="corn-tech-text text-cyan-400 text-xs md:text-sm tracking-[0.2em] font-semibold glow-text-cyan">
              CHAPTER 2 / FIELD TESTING
            </span>
            <h2 className="corn-title text-4xl md:text-6xl text-white font-extrabold leading-tight">
              WE TAKE IT <br />TO THE FIELD.
            </h2>
            <p className="text-cyan-100/75 text-sm md:text-base leading-relaxed max-w-lg">
              Now, the testing gets exponentially tougher. At each of Pioneer's research plots, corn seeds that have made it this far undergo rigorous stress tests. New tools give precise measurements on how the plants respond.
            </p>

            {/* Experience Tests Hotspot */}
            {!isTestMode && (
              <div className="mt-8 flex items-center gap-6">
                <button
                  onClick={startTestMode}
                  className="w-20 h-20 rounded-full border border-cyan-400 bg-cyan-950/40 pulsing-radar flex items-center justify-center cursor-pointer transition-all duration-300 hover:scale-110 active:scale-95 text-cyan-400 hover:text-white"
                  aria-label="Experience the Tests"
                >
                  <span className="corn-tech-text text-[9px] font-bold text-center leading-none">
                    EXPERIENCE<br />TESTS
                  </span>
                </button>
                <span className="corn-tech-text text-[10px] text-cyan-400/40 tracking-wider">
                  Click hotspot to simulate stress conditions
                </span>
              </div>
            )}
          </motion.div>
        </div>

        {/* HUD Environment Simulator Dashboard */}
        <AnimatePresence>
          {isTestMode && (
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 50 }}
              className="absolute right-6 md:right-24 top-24 bottom-24 w-full max-w-md hud-border p-6 rounded flex flex-col justify-between z-20 border-cyan-500/20"
            >
              <div className="flex justify-between items-center border-b border-cyan-400/10 pb-4">
                <div className="flex flex-col">
                  <span className="corn-tech-text text-cyan-400 text-[10px]">PIONEER STRESS CHAMBER</span>
                  <h3 className="corn-title text-lg text-white font-bold">STRESS ENVIRONMENTS</h3>
                </div>
                <button
                  onClick={exitTestMode}
                  className="text-cyan-400/60 hover:text-cyan-400 font-bold text-sm cursor-pointer"
                >
                  EXIT TEST
                </button>
              </div>

              {/* Selector Tabs */}
              <div className="flex flex-wrap gap-2 my-6">
                {conditions.map((cond) => (
                  <button
                    key={cond.id}
                    onClick={() => handleCondSelect(cond)}
                    className={`corn-tech-text text-[9px] px-3 py-2 border rounded transition-all duration-200 cursor-pointer ${
                      selectedCond.id === cond.id
                        ? 'border-cyan-400 bg-cyan-950/60 text-white shadow-[0_0_10px_rgba(18,238,252,0.2)]'
                        : 'border-cyan-400/20 text-cyan-400/60 hover:border-cyan-400/50'
                    }`}
                  >
                    {cond.label}
                  </button>
                ))}
              </div>

              {/* Condition HUD Details card */}
              <div className="flex-1 flex flex-col justify-start gap-4">
                <span className="corn-tech-text text-cyan-400/50 text-[10px] tracking-widest uppercase">
                  SIMULATING METRICS: ACTIVE
                </span>
                <h4 className="corn-title text-white text-md font-semibold tracking-wide">
                  {selectedCond.title}
                </h4>
                <p className="text-cyan-100/70 text-xs leading-relaxed">
                  {selectedCond.body}
                </p>

                {/* Animated tech visual graph mock */}
                <div className="mt-4 border border-cyan-400/10 p-3 rounded bg-[#000804]/30 relative overflow-hidden flex-1 min-h-[80px]">
                  <div className="absolute top-2 left-2 text-[9px] font-mono text-cyan-400/40">VECTOR ANALYSIS</div>
                  {/* Glowing waves */}
                  <div className="w-full h-full flex items-center justify-center gap-1.5 opacity-80 pt-6">
                    {Array.from({ length: 14 }).map((_, i) => (
                      <span
                        key={i}
                        className="w-[2px] bg-cyan-400/80 rounded"
                        style={{
                          height: `${Math.floor(Math.random() * 50) + 10}%`,
                          animation: `pulse ${0.4 + i * 0.05}s infinite alternate`
                        }}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </section>

      {/* SECTION 5: Late-Stage Testing */}
      <section className="relative w-full h-screen flex items-center justify-end px-6 md:px-24 select-none overflow-hidden">
        {/* Visual: High-tech checkered aerial fields background */}
        <img
          src="/corn/field_grid.png"
          alt="Pioneer Fields Checkered Grid"
          className="absolute inset-0 w-full h-full object-cover pointer-events-none z-0 opacity-15 mix-blend-overlay"
        />
        {/* Left Side: Dotted US Map */}
        <div className="absolute left-6 md:left-24 top-1/2 -translate-y-1/2 w-[300px] md:w-[600px] h-[200px] md:h-[400px] opacity-40 z-0 flex items-center justify-center">
          {/* Stylized SVG US Map */}
          <svg className="w-full h-full text-cyan-500/25" viewBox="0 0 1000 600" fill="none" stroke="currentColor" strokeWidth="1.5">
            {/* Outline of USA */}
            <path d="M100 250 L120 180 L200 150 L300 120 L350 110 L450 120 L510 160 L590 140 L650 110 L700 80 L750 90 L850 140 L880 200 L920 220 L900 300 L850 350 L840 400 L880 430 L850 480 L800 500 L760 500 L740 450 L710 440 L690 470 L650 480 L620 450 L560 460 L540 490 L490 520 L400 480 L350 490 L300 450 L250 420 L220 430 L180 390 L120 380 L100 300 Z" strokeDasharray="5 5" />
            
            {/* Testing dots with pulsing radar rings */}
            <g className="text-cyan-400">
              {/* Plot 1 */}
              <circle cx="650" cy="220" r="4" fill="currentColor" />
              <circle cx="650" cy="220" r="12" stroke="currentColor" strokeWidth="0.5" className="animate-ping" />
              {/* Plot 2 */}
              <circle cx="580" cy="280" r="4" fill="currentColor" />
              <circle cx="580" cy="280" r="10" stroke="currentColor" strokeWidth="0.5" className="animate-ping" />
              {/* Plot 3 */}
              <circle cx="720" cy="260" r="4" fill="currentColor" />
              <circle cx="720" cy="260" r="14" stroke="currentColor" strokeWidth="0.5" className="animate-ping" />
              {/* Plot 4 */}
              <circle cx="680" cy="310" r="4" fill="currentColor" />
              <circle cx="680" cy="310" r="12" stroke="currentColor" strokeWidth="0.5" className="animate-ping" />
              {/* Plot 5 */}
              <circle cx="510" cy="200" r="3" fill="currentColor" className="opacity-70" />
              {/* Plot 6 */}
              <circle cx="450" cy="330" r="3" fill="currentColor" className="opacity-70" />
            </g>
          </svg>
        </div>

        <div className="max-w-xl z-10 text-right flex flex-col items-end">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="flex flex-col gap-4 items-end"
          >
            <span className="corn-tech-text text-green-400 text-xs md:text-sm tracking-[0.2em] font-semibold glow-text-green">
              CHAPTER 2 / PRE-COMMERCIAL TESTING
            </span>
            <h2 className="corn-title text-4xl md:text-6xl text-white font-extrabold leading-tight">
              TESTING, TESTING <br />AND MORE TESTING.
            </h2>
            <p className="text-cyan-100/75 text-sm md:text-base leading-relaxed max-w-lg">
              A second year of pre-commercial testing. More locations. Expanding decision zones. Now we conduct 8x more late-stage field tests, comparing proven leaders, competitive seeds and experimental hybrids, so only the best make it to a farmer's field.
            </p>

            {/* Dotted HUD indicator */}
            <div className="flex gap-4 items-center mt-6">
              <span className="text-[10px] corn-tech-text text-cyan-400">EXPANDED REGIONS:</span>
              <div className="flex gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-pulse" />
                <span className="w-2.5 h-2.5 rounded-full bg-cyan-400/70" />
                <span className="w-2.5 h-2.5 rounded-full bg-cyan-400/40" />
                <span className="w-2.5 h-2.5 rounded-full bg-cyan-400/10" />
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
