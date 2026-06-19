'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface ChapterResultProps {
  activeSection: number;
}

const tabData = [
  {
    id: 'yield',
    label: 'YIELD',
    title: '8.8 bu/A Advantage',
    body: 'Spanning the past three years, the 2020 advancement class has demonstrated a noticeable benefit on the farm, delivering an 8.8 bu/A average yield advantage over competitors in on-farm and IMPACT trials.[2]'
  },
  {
    id: 'consistency',
    label: 'CONSISTENCY',
    title: 'Win Every Year',
    body: 'Our genetic predictions, which allow us to simulate across environments, along with two-year late-stage testing in multiple locations, deliver reliable performance year over year.'
  },
  {
    id: 'qrome',
    label: 'QROME PRODUCTS',
    title: 'Optimized Protection',
    body: 'The most optimized balance of insect protection and agronomic performance in the Pioneer portfolio. Two modes of action above and two below for effective insect control, as well as a 7.7 bu/A yield advantage over SmartStax technology.'
  }
];

export default function ChapterResult({ activeSection }: ChapterResultProps) {
  const [activeTab, setActiveTab] = useState(tabData[0]);
  const [sliderVal, setSliderVal] = useState(0);
  const [activeForm, setActiveForm] = useState<'none' | 'signup' | 'contact'>('none');
  const [zipCode, setZipCode] = useState('');
  const [signupForm, setSignupForm] = useState({ firstName: '', lastName: '', email: '', zip: '', acres: '' });
  const [formSubmitted, setFormSubmitted] = useState(false);

  const handleSliderChange = (val: number) => {
    setSliderVal(val);
    // Map slider progress (0-100) to the three tabs
    if (val < 33) {
      setActiveTab(tabData[0]);
    } else if (val >= 33 && val < 66) {
      setActiveTab(tabData[1]);
    } else {
      setActiveTab(tabData[2]);
    }
  };

  const handleZipSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (zipCode.length >= 4) {
      setFormSubmitted(true);
    }
  };

  const handleSignupSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (signupForm.email && signupForm.firstName) {
      setFormSubmitted(true);
    }
  };

  const resetFormState = (type: 'none' | 'signup' | 'contact') => {
    setActiveForm(type);
    setFormSubmitted(false);
    setZipCode('');
    setSignupForm({ firstName: '', lastName: '', email: '', zip: '', acres: '' });
  };

  return (
    <div className="relative w-full h-full">
      {/* SECTION 6: The 0.01% Class */}
      <section className="relative w-full h-screen flex items-center justify-start px-6 md:px-24 select-none overflow-hidden">
        {/* Visual: Giant Rotating Golden Corn Kernel */}
        <motion.img
          src="/corn/golden_kernel.png"
          alt="Golden Corn Kernel"
          className="absolute top-1/2 left-1/2 w-[280px] md:w-[420px] h-[280px] md:h-[420px] object-contain pointer-events-none z-0 opacity-75 filter drop-shadow-[0_0_50px_rgba(255,223,122,0.3)]"
          style={{
            x: '-50%',
            y: '-50%'
          }}
          animate={{ rotate: sliderVal * 3.6 }}
          transition={{ type: 'spring', stiffness: 60, damping: 15 }}
        />

        <div className="max-w-xl z-10 flex flex-col gap-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="flex flex-col gap-4"
          >
            <span className="corn-tech-text text-cyan-400 text-xs md:text-sm tracking-[0.2em] font-semibold glow-text-cyan">
              CHAPTER 3 / THE ADVANCEMENT CLASS
            </span>
            <h2 className="corn-title text-4xl md:text-6xl text-white font-extrabold leading-tight">
              LESS THAN 0.01% <br />OF SEEDS MAKE IT.
            </h2>
            <p className="text-cyan-100/75 text-sm md:text-base leading-relaxed max-w-lg">
              These are the very best of the best. They're the contenders that have survived the computer simulations, the lab tests, the field tests and the discerning breeders to make it into a Pioneer bag. It's our new class.
            </p>

            {/* Slider Widget: Drag kernel to discover */}
            <div className="mt-6 flex flex-col gap-3 w-80 hud-border p-5 rounded">
              <div className="flex justify-between items-center text-[10px] corn-tech-text text-cyan-400">
                <span>DRAG KERNEL TO DISCOVER</span>
                <span>{activeTab.label}</span>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                value={sliderVal}
                onChange={(e) => handleSliderChange(Number(e.target.value))}
                className="w-full corn-slider cursor-pointer"
              />
              <div className="flex justify-between text-[9px] text-cyan-400/40 font-mono">
                <span>YIELD</span>
                <span>CONSISTENCY</span>
                <span>QROME</span>
              </div>
            </div>

            {/* Current Active Tab Info Card */}
            <motion.div
              key={activeTab.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-4 border-l-2 border-cyan-400 pl-4 py-1 max-w-lg"
            >
              <h4 className="corn-title text-white font-bold text-sm tracking-wide mb-1">
                {activeTab.title}
              </h4>
              <p className="text-cyan-100/60 text-xs leading-relaxed">
                {activeTab.body}
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* SECTION 7: Footer Menu Lists & Forms */}
      <section className="relative w-full h-screen flex flex-col justify-between px-6 py-20 md:px-24 md:py-24 select-none overflow-hidden bg-[#000603]/40">
        <div className="flex-1 flex flex-col items-center justify-center max-w-4xl mx-auto w-full z-10 gap-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false }}
            className="flex flex-col gap-6 w-full text-center"
          >
            <h3 className="corn-title text-cyan-400 text-xs tracking-[0.2em] font-semibold glow-text-cyan">
              REVOLUTIONIZE YOUR FARM
            </h3>
            
            {/* Main Footer navigation links */}
            <div className="flex flex-col items-center gap-5 w-full max-w-lg mx-auto">
              <button
                onClick={() => resetFormState('signup')}
                className="btn-hud w-full py-4 uppercase text-center"
              >
                SIGN UP FOR NEWS
              </button>
              <button
                onClick={() => resetFormState('contact')}
                className="btn-hud w-full py-4 uppercase text-center"
              >
                CONTACT A TERRITORY MANAGER
              </button>
              
              <div className="flex flex-col md:flex-row gap-6 mt-6 text-xs corn-tech-text text-cyan-400/70">
                <a href="https://go.pioneer.com/cornrevolution-podcast" target="_blank" rel="noreferrer" className="hover:text-cyan-400 hover:underline">
                  Visit Corn Revolution Podcast
                </a>
                <a href="https://www.pioneer.com/" target="_blank" rel="noreferrer" className="hover:text-cyan-400 hover:underline">
                  Visit Pioneer.com
                </a>
              </div>
            </div>
          </motion.div>
        </div>

        {/* References citations at the very bottom */}
        <div className="w-full border-t border-cyan-400/5 pt-4 text-[9px] text-cyan-100/30 leading-normal font-sans max-w-6xl mx-auto z-10 flex flex-col gap-2">
          <p>
            [1] Pioneer brand Optimum AQUAmax products were grown in 13,623 on-farm comparisons across the United States against competitor brand products in 2018. Water-limited yield data includes 240 competitive comparisons with a win ratio of 63 percent. Favorable growing conditions include 13,383 competitive comparisons. Product performance is variable and depends on many factors.
          </p>
          <p>
            [2] 2018 Qrome product performance data is based on the average of 244 comparisons made in the United States. Comparisons are against all competitor triple-stack products segment matched within +/- 3 CRM.
          </p>
          <div className="flex flex-wrap gap-4 mt-2 border-t border-cyan-400/5 pt-2 text-[8px]">
            <span>© 2026 Pioneer. All rights reserved. Trademarks and service marks of Dow AgroSciences, DuPont or Pioneer, and their affiliated companies.</span>
            <a href="http://www.pioneer.com/home/site/about/terms-of-use" className="hover:underline">Terms of Use</a>
            <a href="https://www.pioneer.com/us/privacy-policy.html" className="hover:underline">Privacy Policy</a>
            <a href="https://www.corteva.us/california-privacy-rights.html" className="hover:underline">California Privacy Rights</a>
          </div>
        </div>

        {/* Form Modal Drawer Overlays */}
        <AnimatePresence>
          {activeForm !== 'none' && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 bg-[#000c07]/85 backdrop-blur-md flex items-center justify-center p-6"
            >
              <motion.div
                initial={{ scale: 0.9, y: 20 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.9, y: 20 }}
                className="relative max-w-md w-full hud-border p-8 rounded-lg"
              >
                {/* Tech HUD crosshairs */}
                <span className="absolute top-2 left-2 w-4 h-4 border-t border-l border-cyan-400/50" />
                <span className="absolute top-2 right-2 w-4 h-4 border-t border-r border-cyan-400/50" />
                <span className="absolute bottom-2 left-2 w-4 h-4 border-b border-l border-cyan-400/50" />
                <span className="absolute bottom-2 right-2 w-4 h-4 border-b border-r border-cyan-400/50" />

                <div className="flex justify-between items-start mb-6 border-b border-cyan-400/10 pb-3">
                  <h4 className="corn-title text-lg text-white font-bold tracking-wide">
                    {activeForm === 'signup' ? 'SIGN UP FOR NEWS' : 'FIND TERRITORY MANAGER'}
                  </h4>
                  <button
                    onClick={() => setActiveForm('none')}
                    className="text-cyan-400/60 hover:text-cyan-400 cursor-pointer text-sm font-bold"
                  >
                    ✕ CLOSE
                  </button>
                </div>

                {!formSubmitted ? (
                  activeForm === 'signup' ? (
                    /* Sign Up Form */
                    <form onSubmit={handleSignupSubmit} className="flex flex-col gap-4">
                      <div className="flex gap-4">
                        <div className="flex-1 flex flex-col gap-1">
                          <label className="text-[9px] corn-tech-text text-cyan-400/70">FIRST NAME</label>
                          <input
                            type="text"
                            required
                            className="bg-cyan-950/20 border border-cyan-400/20 rounded px-3 py-2 text-xs text-white focus:outline-none focus:border-cyan-400"
                            placeholder="John"
                            value={signupForm.firstName}
                            onChange={(e) => setSignupForm({ ...signupForm, firstName: e.target.value })}
                          />
                        </div>
                        <div className="flex-1 flex flex-col gap-1">
                          <label className="text-[9px] corn-tech-text text-cyan-400/70">LAST NAME</label>
                          <input
                            type="text"
                            required
                            className="bg-cyan-950/20 border border-cyan-400/20 rounded px-3 py-2 text-xs text-white focus:outline-none focus:border-cyan-400"
                            placeholder="Doe"
                            value={signupForm.lastName}
                            onChange={(e) => setSignupForm({ ...signupForm, lastName: e.target.value })}
                          />
                        </div>
                      </div>

                      <div className="flex flex-col gap-1">
                        <label className="text-[9px] corn-tech-text text-cyan-400/70">EMAIL ADDRESS</label>
                        <input
                          type="email"
                          required
                          className="bg-cyan-950/20 border border-cyan-400/20 rounded px-3 py-2 text-xs text-white focus:outline-none focus:border-cyan-400"
                          placeholder="john.doe@farm.com"
                          value={signupForm.email}
                          onChange={(e) => setSignupForm({ ...signupForm, email: e.target.value })}
                        />
                      </div>

                      <div className="flex gap-4">
                        <div className="flex-1 flex flex-col gap-1">
                          <label className="text-[9px] corn-tech-text text-cyan-400/70">ZIP CODE</label>
                          <input
                            type="text"
                            required
                            className="bg-cyan-950/20 border border-cyan-400/20 rounded px-3 py-2 text-xs text-white focus:outline-none focus:border-cyan-400"
                            placeholder="54000"
                            value={signupForm.zip}
                            onChange={(e) => setSignupForm({ ...signupForm, zip: e.target.value })}
                          />
                        </div>
                        <div className="flex-1 flex flex-col gap-1">
                          <label className="text-[9px] corn-tech-text text-cyan-400/70">TOTAL ACRES</label>
                          <input
                            type="number"
                            className="bg-cyan-950/20 border border-cyan-400/20 rounded px-3 py-2 text-xs text-white focus:outline-none focus:border-cyan-400"
                            placeholder="500"
                            value={signupForm.acres}
                            onChange={(e) => setSignupForm({ ...signupForm, acres: e.target.value })}
                          />
                        </div>
                      </div>

                      <button type="submit" className="btn-hud w-full py-3 mt-4 uppercase">
                        SUBMIT INVENTORY REQUEST
                      </button>
                    </form>
                  ) : (
                    /* Contact Manager Form */
                    <form onSubmit={handleZipSearch} className="flex flex-col gap-4">
                      <div className="flex flex-col gap-1">
                        <label className="text-[9px] corn-tech-text text-cyan-400/70">ENTER YOUR ZIP CODE</label>
                        <input
                          type="text"
                          required
                          className="bg-cyan-950/20 border border-cyan-400/20 rounded px-3 py-2 text-xs text-white focus:outline-none focus:border-cyan-400"
                          placeholder="e.g. 50266"
                          value={zipCode}
                          onChange={(e) => setZipCode(e.target.value)}
                        />
                      </div>
                      <button type="submit" className="btn-hud w-full py-3 mt-2 uppercase">
                        FIND LOCAL MANAGER
                      </button>
                    </form>
                  )
                ) : (
                  /* Success Feedback HUD Panel */
                  <div className="flex flex-col items-center gap-4 text-center py-6">
                    <div className="w-12 h-12 rounded-full border border-green-500 flex items-center justify-center text-green-500 animate-pulse text-xl">
                      ✓
                    </div>
                    <span className="corn-tech-text text-green-400 text-xs tracking-wider">
                      TRANSMISSION SUCCESSFUL
                    </span>
                    <h5 className="corn-title text-white text-md font-semibold">
                      {activeForm === 'signup' ? 'Subscription Complete' : 'Territory Representative Found'}
                    </h5>
                    <p className="text-cyan-100/60 text-xs max-w-xs leading-relaxed">
                      {activeForm === 'signup'
                        ? 'Thank you! You will begin receiving genetic advancement reports directly to your inbox.'
                        : `Pioneer agent ID: BR-549 located. Representative: Mike Harris. Phone: (515) 555-0199. Email: mike.harris@pioneer.com`}
                    </p>
                  </div>
                )}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </section>
    </div>
  );
}
