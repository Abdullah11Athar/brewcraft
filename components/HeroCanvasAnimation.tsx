'use client';

import { useRef, useEffect, useState, useCallback } from 'react';
import { motion, useSpring, useTransform } from 'framer-motion';

const TOTAL_FRAMES = 192;
const FRAME_PATH = '/frames';

// Header height constants (must match Header.tsx h-16 md:h-20)
const HEADER_H_MOBILE = 64;  // h-16 = 4rem = 64px
const HEADER_H_DESKTOP = 80; // h-20 = 5rem = 80px

export default function HeroCanvasAnimation() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imagesRef = useRef<HTMLImageElement[]>([]);

  const [imagesLoaded, setImagesLoaded] = useState(false);
  const [loadProgress, setLoadProgress] = useState(0);

  const springProgress = useSpring(0, { stiffness: 140, damping: 28, restDelta: 0.001 });

  const s1Opacity = useTransform(springProgress, [0, 0.08, 0.18, 0.24], [0, 1, 1, 0]);
  const s2Opacity = useTransform(springProgress, [0.28, 0.35, 0.5, 0.56], [0, 1, 1, 0]);
  const s3Opacity = useTransform(springProgress, [0.6, 0.67, 0.8, 0.86], [0, 1, 1, 0]);
  const s4Opacity = useTransform(springProgress, [0.9, 0.94, 0.99, 1], [0, 1, 1, 0]);
  const indicatorOpacity = useTransform(springProgress, [0, 0.08], [1, 0]);

  // Returns the current header height based on viewport width
  const getHeaderHeight = useCallback(() => {
    return window.innerWidth >= 768 ? HEADER_H_DESKTOP : HEADER_H_MOBILE;
  }, []);

  // Resize canvas pixel buffer to match its actual CSS size × DPR
  // Called in the RAF loop every frame so it self-heals if initial size was 0
  const resizeCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return false;
    const dpr = window.devicePixelRatio || 1;
    const cssW = canvas.clientWidth;
    const cssH = canvas.clientHeight;
    if (cssW === 0 || cssH === 0) return false;
    const targetW = Math.round(cssW * dpr);
    const targetH = Math.round(cssH * dpr);
    if (canvas.width === targetW && canvas.height === targetH) return true; // already correct
    canvas.width = targetW;
    canvas.height = targetH;
    return true;
  }, []);

  // Draw a single frame — with containment scaling on mobile
  const drawFrame = useCallback((frameIdx: number) => {
    const canvas = canvasRef.current;
    if (!canvas || canvas.width === 0 || canvas.height === 0) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const idx = Math.max(0, Math.min(Math.round(frameIdx), TOTAL_FRAMES - 1));
    const img = imagesRef.current[idx];
    if (!img || !img.complete || !img.naturalWidth) return;

    const W = canvas.width;
    const H = canvas.height;

    const imgRatio = img.naturalWidth / img.naturalHeight;
    const viewRatio = W / H;

    let drawW, drawH, drawX, drawY;
    let scale = 1.0;
    
    // Scale down image on mobile to fit the cup inside the screen sides
    if (window.innerWidth < 768) {
      scale = 0.82; 
    }

    if (imgRatio > viewRatio) {
      drawH = H * scale;
      drawW = H * imgRatio * scale;
      drawX = (W - drawW) / 2;
      drawY = (H - drawH) / 2;
    } else {
      drawW = W * scale;
      drawH = (W / imgRatio) * scale;
      drawX = (W - drawW) / 2;
      drawY = (H - drawH) / 2;
    }

    // Shift image slightly to right on mobile to perfectly center the glass cup
    if (window.innerWidth < 768) {
      drawX += W * 0.035; 
    }

    ctx.clearRect(0, 0, W, H);
    ctx.drawImage(img, drawX, drawY, drawW, drawH);
  }, []);

  // Preload all frames
  useEffect(() => {
    let loaded = 0;
    const images: HTMLImageElement[] = new Array(TOTAL_FRAMES);
    imagesRef.current = images;

    for (let i = 0; i < TOTAL_FRAMES; i++) {
      const img = new Image();
      img.src = `${FRAME_PATH}/frame_${i}.webp`;
      img.onload = () => {
        loaded++;
        setLoadProgress((loaded / TOTAL_FRAMES) * 100);
        if (loaded === TOTAL_FRAMES) setImagesLoaded(true);
      };
      img.onerror = () => {
        loaded++;
        if (loaded === TOTAL_FRAMES) setImagesLoaded(true);
      };
      images[i] = img;
    }
  }, []);

  // RAF render loop — starts after images load
  useEffect(() => {
    if (!imagesLoaded) return;

    const getScrollProgress = () => {
      const container = containerRef.current;
      if (!container) return 0;
      const rect = container.getBoundingClientRect();
      const scrollable = container.offsetHeight - window.innerHeight;
      if (scrollable <= 0) return 0;
      const scrolled = -rect.top;
      return Math.max(0, Math.min(1, scrolled / scrollable));
    };

    let rafId: number;
    let lastRenderedFrame = -1;

    const loop = () => {
      // Self-healing resize: if canvas was 0×0 at init, fix it now
      const resized = resizeCanvas();

      if (resized) {
        const p = getScrollProgress();
        const frameToRender = Math.round(p * (TOTAL_FRAMES - 1));

        if (frameToRender !== lastRenderedFrame) {
          drawFrame(frameToRender);
          lastRenderedFrame = frameToRender;
        }

        springProgress.set(p);
      }

      rafId = requestAnimationFrame(loop);
    };

    rafId = requestAnimationFrame(loop);

    const handleResize = () => {
      resizeCanvas();
      const p = getScrollProgress();
      drawFrame(Math.round(p * (TOTAL_FRAMES - 1)));
      lastRenderedFrame = -1;
    };

    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('resize', handleResize);
    };
  }, [imagesLoaded, resizeCanvas, drawFrame, springProgress]);

  if (!imagesLoaded) {
    return (
      <div className="fixed inset-0 bg-[#1A0F0A] flex flex-col items-center justify-center z-50 gap-6">
        <p className="text-[#D4A574] text-sm tracking-[0.3em] uppercase font-light">
          Brewing your experience
        </p>
        <div className="w-72 h-[2px] bg-[#3D2820] rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-[#D4A574] to-[#4F9C8F]"
            initial={{ width: '0%' }}
            animate={{ width: `${loadProgress}%` }}
            transition={{ duration: 0.2 }}
          />
        </div>
        <p className="text-[#5A4034] text-xs">{Math.round(loadProgress)}%</p>
      </div>
    );
  }

  return (
    <div ref={containerRef} className="relative h-[380vh] md:h-[550vh]">
      {/*
        KEY FIX: sticky top-16 md:top-20 puts canvas BELOW the fixed header.
        Height = 100vh minus header = full visible area below nav.
        This ensures ALL animation frames are fully visible (nothing cut off by header).
        position:sticky works because no ancestor has overflow:hidden/clip.
      */}
      <div
        className="sticky w-full bg-[#1A0F0A]"
        style={{
          top: 'var(--header-h, 64px)',
          height: 'calc(var(--vh, 100vh) - var(--header-h, 64px))',
        }}
      >
        <canvas
          ref={canvasRef}
          className="absolute inset-0"
          style={{ display: 'block', width: '100%', height: '100%' }}
        />

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/60 pointer-events-none" />

        {/* Scene 1 */}
        <motion.div style={{ opacity: s1Opacity }}
          className="absolute inset-0 flex flex-col items-center justify-center text-center px-6 pointer-events-none">

          <h1 className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-bold text-amber-50 leading-none tracking-tight mb-4"
            style={{ fontFamily: 'Playfair Display, serif' }}>
            Experience<br />Coffee
          </h1>
          <p className="text-base sm:text-xl md:text-2xl text-amber-100/70 tracking-wide">
            Where every sip defies gravity
          </p>
        </motion.div>

        {/* Scene 2 */}
        <motion.div style={{ opacity: s2Opacity }}
          className="absolute inset-0 flex flex-col justify-center px-8 sm:px-16 md:px-24 pointer-events-none">
          <h2 className="text-4xl sm:text-6xl md:text-7xl font-semibold text-amber-50 leading-tight mb-4 max-w-xl"
            style={{ fontFamily: 'Playfair Display, serif' }}>
            Crafted to<br />Perfection
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-amber-100/60 max-w-sm">
            From bean to cup, excellence floats in every drop
          </p>
        </motion.div>

        {/* Scene 3 */}
        <motion.div style={{ opacity: s3Opacity }}
          className="absolute inset-0 flex flex-col justify-center items-end px-8 sm:px-16 md:px-24 pointer-events-none">
          <h2 className="text-4xl sm:text-6xl md:text-7xl font-semibold text-amber-50 leading-tight mb-4 max-w-xl text-right"
            style={{ fontFamily: 'Playfair Display, serif' }}>
            Anti-Gravity<br />Flavor
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-amber-100/60 max-w-sm text-right">
            Defying expectations, elevating taste beyond limits
          </p>
        </motion.div>

        {/* Scene 4 */}
        <motion.div style={{ opacity: s4Opacity }}
          className="absolute inset-0 flex flex-col items-center justify-center text-center px-6 pointer-events-none">
          <h2 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-amber-50 leading-tight mb-8"
            style={{ fontFamily: 'Playfair Display, serif' }}>
            Discover<br />Your Blend
          </h2>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => document.getElementById('menu')?.scrollIntoView({ behavior: 'smooth' })}
            className="px-8 sm:px-12 py-4 bg-gradient-to-r from-[#4F9C8F] to-[#3D8B7F] text-white rounded-full text-base sm:text-lg font-semibold shadow-2xl pointer-events-auto">
            Explore Collection ↓
          </motion.button>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div style={{ opacity: indicatorOpacity }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 pointer-events-none">
          <p className="text-amber-100/50 text-xs tracking-[0.25em] uppercase">Scroll to explore</p>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 1.5, ease: 'easeInOut' }}
            className="w-5 h-9 border border-amber-100/30 rounded-full flex items-start justify-center pt-2">
            <div className="w-[2px] h-2 bg-amber-100/50 rounded-full" />
          </motion.div>
        </motion.div>

      </div>
    </div>
  );
}