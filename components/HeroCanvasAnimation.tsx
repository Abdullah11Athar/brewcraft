'use client';

import { useRef, useEffect, useState, useCallback } from 'react';
import { motion, useSpring, useTransform } from 'framer-motion';

const TOTAL_FRAMES = 192;
const FRAME_PATH = '/frames';

export default function HeroCanvasAnimation() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const progressRef = useRef(0);

  const [imagesLoaded, setImagesLoaded] = useState(false);
  const [loadProgress, setLoadProgress] = useState(0);

  const springProgress = useSpring(0, {
    stiffness: 80,
    damping: 25,
    restDelta: 0.001,
  });

  const frameIndex = useTransform(springProgress, [0, 1], [0, TOTAL_FRAMES - 1]);
  const yOffset = useTransform(springProgress, [0, 1], [0, -30]);

  const s1Opacity = useTransform(springProgress, [0, 0.08, 0.18, 0.24], [0, 1, 1, 0]);
  const s2Opacity = useTransform(springProgress, [0.28, 0.35, 0.5, 0.56], [0, 1, 1, 0]);
  const s3Opacity = useTransform(springProgress, [0.6, 0.67, 0.8, 0.86], [0, 1, 1, 0]);
  const s4Opacity = useTransform(springProgress, [0.9, 0.94, 0.99, 1], [0, 1, 1, 0]);
  const indicatorOpacity = useTransform(springProgress, [0, 0.08], [1, 0]);

  const renderFrame = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const currentFrame = Math.round(frameIndex.get());
    const img = imagesRef.current[Math.max(0, Math.min(currentFrame, TOTAL_FRAMES - 1))];
    if (!img?.complete || !img.naturalWidth) return;

    const dpr = window.devicePixelRatio || 1;
    const w = window.innerWidth;
    const h = window.innerHeight;

    canvas.width = w * dpr;
    canvas.height = h * dpr;
    canvas.style.width = `${w}px`;
    canvas.style.height = `${h}px`;
    ctx.scale(dpr, dpr);

    const imgRatio = img.naturalWidth / img.naturalHeight;
    const viewRatio = w / h;

    let drawW, drawH, drawX, drawY;
    if (imgRatio > viewRatio) {
      drawH = h;
      drawW = h * imgRatio;
      drawX = (w - drawW) / 2;
      drawY = 0;
    } else {
      drawW = w;
      drawH = w / imgRatio;
      drawX = 0;
      drawY = (h - drawH) / 2;
    }

    ctx.clearRect(0, 0, w, h);
    ctx.drawImage(img, drawX, drawY, drawW, drawH);
  }, [frameIndex]);

  // Preload frames
  useEffect(() => {
    let loaded = 0;
    const images: HTMLImageElement[] = new Array(TOTAL_FRAMES);
    imagesRef.current = images;

    for (let i = 0; i < TOTAL_FRAMES; i++) {
      const img = new Image();
      img.src = `${FRAME_PATH}/frame_${i}.png`;
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

  // Scroll tracking — runs AFTER images loaded so DOM is fully rendered
  useEffect(() => {
    if (!imagesLoaded) return;

    const getProgress = () => {
      const container = containerRef.current;
      if (!container) return 0;
      const rect = container.getBoundingClientRect();
      const scrollable = container.offsetHeight - window.innerHeight;
      const scrolled = -rect.top;
      return Math.max(0, Math.min(1, scrolled / scrollable));
    };

    const handleScroll = () => {
      const p = getProgress();
      progressRef.current = p;
      springProgress.set(p);
    };

    // Set initial value
    handleScroll();

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, [imagesLoaded, springProgress]);

  // Canvas render
  useEffect(() => {
    if (!imagesLoaded) return;
    renderFrame();
    const unsubscribe = frameIndex.on('change', renderFrame);
    const handleResize = () => renderFrame();
    window.addEventListener('resize', handleResize);
    return () => {
      unsubscribe();
      window.removeEventListener('resize', handleResize);
    };
  }, [imagesLoaded, renderFrame, frameIndex]);

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
    <div ref={containerRef} className="relative h-[600vh]">
      <div className="sticky top-0 w-full h-screen overflow-hidden bg-[#1A0F0A]">

        <motion.div style={{ y: yOffset }} className="absolute inset-0 w-full h-full">
          <canvas ref={canvasRef} className="block w-full h-full" />
        </motion.div>

        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/60 pointer-events-none" />

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

        <motion.div style={{ opacity: s4Opacity }}
          className="absolute inset-0 flex flex-col items-center justify-center text-center px-6 pointer-events-none">
          <h2 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-amber-50 leading-tight mb-8"
            style={{ fontFamily: 'Playfair Display, serif' }}>
            Discover<br />Your Blend
          </h2>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-8 sm:px-12 py-4 bg-gradient-to-r from-[#4F9C8F] to-[#3D8B7F] text-white rounded-full text-base sm:text-lg font-semibold shadow-2xl pointer-events-auto">
            Explore Collection ↓
          </motion.button>
        </motion.div>

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