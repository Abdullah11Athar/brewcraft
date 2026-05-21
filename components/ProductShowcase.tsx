'use client';

import { useRef, useState, useCallback, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { coffeeProducts } from '@/data/products';

const FRAMES_PATH = '/frames';
const TOTAL = 192;
const CARD_FRAMES: Record<string, string> = {
  cappuccino: 'latte',
  latte: 'latte2',
  mocha: 'mocha',
};

const pools: Record<string, HTMLImageElement[]> = {};
let poolsReady = false;

function initPools() {
  if (poolsReady) return;
  poolsReady = true;
  ['latte', 'latte2', 'mocha', 'splash'].forEach(prefix => {
    pools[prefix] = [];
    for (let i = 0; i < TOTAL; i++) {
      const img = new Image();
      img.src = `${FRAMES_PATH}/${prefix}_${i}.webp`;
      pools[prefix].push(img);
    }
  });
}

function FrameCanvas({ prefix, isHovered }: { prefix: string; isHovered: boolean }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef = useRef<number>(0);
  const fRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const imgs = pools[prefix] || [];

    const draw = () => {
      const img = imgs[Math.round(fRef.current)];
      if (!img?.complete || !img.naturalWidth) return;
      const W = canvas.offsetWidth || 400;
      const H = canvas.offsetHeight || 220;
      if (canvas.width !== W || canvas.height !== H) { canvas.width = W; canvas.height = H; }
      ctx.clearRect(0, 0, W, H);
      const s = Math.max(W / img.naturalWidth, H / img.naturalHeight);
      const w = img.naturalWidth * s;
      const h = img.naturalHeight * s;
      ctx.drawImage(img, (W - w) / 2, (H - h) / 2, w, h);
    };

    const tick = () => {
      const max = TOTAL - 1;
      if (isHovered) fRef.current = Math.min(fRef.current + 2, max);
      else fRef.current = Math.max(fRef.current - 3, 0);
      draw();
      const done = isHovered ? fRef.current >= max : fRef.current <= 0;
      if (!done) rafRef.current = requestAnimationFrame(tick);
    };

    cancelAnimationFrame(rafRef.current);
    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, [isHovered, prefix]);

  return (
    <canvas ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none rounded-xl"
      style={{ opacity: isHovered ? 1 : 0, transition: 'opacity 0.25s ease', zIndex: 20 }} />
  );
}

function SplashBanner() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef = useRef<number>(0);
  const fRef = useRef(0);

  useEffect(() => {
    initPools();
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const draw = () => {
      const imgs = pools['splash'] || [];
      const img = imgs[Math.round(fRef.current) % TOTAL];
      if (!img?.complete || !img.naturalWidth) return;
      const W = canvas.offsetWidth || 1200;
      const H = canvas.offsetHeight || 580;
      if (canvas.width !== W || canvas.height !== H) { canvas.width = W; canvas.height = H; }
      ctx.clearRect(0, 0, W, H);
      const s = Math.max(W / img.naturalWidth, H / img.naturalHeight);
      const w = img.naturalWidth * s;
      const h = img.naturalHeight * s;
      let drawX = (W - w) / 2;
      if (window.innerWidth < 768) {
        drawX += W * 0.15; // Shift right on mobile to center the splash glass
      }
      ctx.drawImage(img, drawX, (H - h) / 2, w, h);
    };

    const tick = () => {
      fRef.current = (fRef.current + 0.35) % TOTAL;
      draw();
      rafRef.current = requestAnimationFrame(tick);
    };

    const imgs = pools['splash'] || [];
    if (imgs[0]?.complete) rafRef.current = requestAnimationFrame(tick);
    else if (imgs[0]) imgs[0].onload = () => { rafRef.current = requestAnimationFrame(tick); };

    const onResize = () => draw();
    window.addEventListener('resize', onResize);
    return () => { cancelAnimationFrame(rafRef.current); window.removeEventListener('resize', onResize); };
  }, []);

  return (
    <div className="absolute inset-0 pointer-events-none opacity-60">
      <canvas ref={canvasRef} className="w-full h-full object-cover" />
    </div>
  );
}

function Card3D({ product, index }: { product: typeof coffeeProducts[0]; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => { 
    setIsMobile(window.innerWidth < 768);
    initPools(); 
  }, []);

  const framePrefix = CARD_FRAMES[product.id] || 'latte';

  const onMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (isMobile) return;
    const el = cardRef.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    setRotateX(((e.clientY - r.top - r.height / 2) / (r.height / 2)) * -12);
    setRotateY(((e.clientX - r.left - r.width / 2) / (r.width / 2)) * 12);
  }, [isMobile]);

  const onLeave = useCallback(() => {
    if (isMobile) return;
    setRotateX(0); setRotateY(0); setIsHovered(false);
  }, [isMobile]);

  const onEnter = useCallback(() => {
    if (isMobile) return;
    setIsHovered(true);
  }, [isMobile]);

  const onCardClick = useCallback(() => {
    if (isMobile) {
      setIsHovered(prev => !prev);
    }
  }, [isMobile]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.7, delay: index * 0.12, ease: [0.22, 1, 0.36, 1] }}
      style={{ perspective: '1000px' }}
    >
      <motion.div
        ref={cardRef}
        onMouseMove={onMove}
        onMouseEnter={onEnter}
        onMouseLeave={onLeave}
        onClick={onCardClick}
        animate={{ rotateX, rotateY, scale: isHovered ? 1.03 : 1 }}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        style={{ transformStyle: 'preserve-3d' }}
        className="relative rounded-2xl overflow-hidden cursor-pointer"
      >
        <div className="relative bg-[#1e0f08] border border-[#3D2820] rounded-2xl p-5 md:p-6 overflow-hidden">
          {/* Stars */}
          <div className="flex items-center gap-2 mb-4">
            <div className="flex gap-[2px]">
              {[...Array(5)].map((_, i) => (
                <motion.span key={i} initial={{ scale: 0 }} whileInView={{ scale: 1 }}
                  transition={{ delay: index * 0.1 + i * 0.05 + 0.3 }}
                  className="text-[#FFD700] text-sm">★</motion.span>
              ))}
            </div>
            <span className="text-[#C9B8A0] text-xs">{product.rating}</span>
          </div>

          {/* Image — no green glow, just clean */}
          <div className="relative w-full aspect-[4/3] md:aspect-[1.3] rounded-xl overflow-hidden mb-5 bg-[#1e0f08]"
            style={{ transform: 'translateZ(20px)' }}>
            <motion.img src={product.image} alt={product.name}
              className="absolute inset-0 w-full h-full object-cover object-center"
              animate={{ opacity: isHovered ? 0 : 1 }}
              transition={{ duration: 0.3 }} />
            <FrameCanvas prefix={framePrefix} isHovered={isHovered} />
            <div className="absolute inset-0 bg-gradient-to-t from-[#1e0f08]/50 via-transparent to-transparent pointer-events-none z-10" />
          </div>

          <div style={{ transform: 'translateZ(10px)' }}>
            <h3 className="text-xl md:text-2xl font-bold text-[#F5E6D3] mb-2"
              style={{ fontFamily: 'Playfair Display, serif' }}>{product.name}</h3>
            <p className="text-xs md:text-sm text-[#C9B8A0] mb-4 leading-relaxed line-clamp-2">{product.description}</p>
            <div className="flex gap-2 mb-5 flex-wrap">
              {product.features.map((f, i) => (
                <span key={i} className="text-xs px-2 py-1 rounded-full border border-[#4F9C8F]/30 text-[#4F9C8F]/80">{f}</span>
              ))}
            </div>
            <div className="flex items-center justify-between">
              <span className="text-2xl md:text-3xl font-bold text-[#F5E6D3]"
                style={{ fontFamily: 'Playfair Display, serif' }}>{product.price}</span>
              <motion.button
                whileHover={{ scale: 1.15, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => alert(`${product.name} added to cart!`)}
                className="w-11 h-11 rounded-full bg-gradient-to-br from-[#4F9C8F] to-[#2d6b62] flex items-center justify-center shadow-lg">
                <span className="text-white text-xl font-bold leading-none">+</span>
              </motion.button>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function ProductShowcase() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const bannerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: bp } = useScroll({ target: bannerRef, offset: ['start end', 'end start'] });
  const bannerY = useTransform(bp, [0, 1], [20, -20]);

  return (
    <section ref={sectionRef} className="relative py-20 md:py-32 px-4 md:px-8 overflow-hidden">
      <div className="absolute inset-0 bg-[#0d0604]" />

      {/* Banner */}
      <motion.div ref={bannerRef} style={{ y: bannerY }}
        className="relative w-full h-[320px] sm:h-[420px] md:h-[520px] mb-16 md:mb-24 rounded-2xl md:rounded-3xl overflow-hidden">
        <div className="absolute inset-0 bg-[#0a0300]" />
        <SplashBanner />
        <div className="absolute inset-0 pointer-events-none"
          style={{ background: 'radial-gradient(ellipse at center, transparent 30%, rgba(10,3,0,0.3) 65%, rgba(10,3,0,0.85) 100%)' }} />
        <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-[#0a0300]/25 via-transparent to-[#0a0300]/45" />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center z-10 pointer-events-none">
          <motion.p initial={{ opacity: 0, letterSpacing: '0.8em' }} whileInView={{ opacity: 1, letterSpacing: '0.3em' }}
            viewport={{ once: true }} transition={{ duration: 1.4 }}
            className="text-[#D4A574] text-xs sm:text-sm uppercase tracking-[0.3em]">
            Artisan · Premium · Excellence
          </motion.p>
          <motion.div initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }} viewport={{ once: true }}
            transition={{ delay: 0.6, duration: 1 }}
            className="w-12 h-[1px] bg-[#4F9C8F]/60 mx-auto mt-4" />
        </div>
        {[...Array(5)].map((_, i) => (
          <motion.div key={i} className="absolute w-5 h-5 md:w-7 md:h-7 opacity-20 z-10"
            style={{ left: `${15 + i * 17}%`, top: `${25 + (i % 2) * 25}%` }}
            animate={{ y: [0, -18, 0], rotate: [0, 360] }}
            transition={{ duration: 3 + i * 0.5, repeat: Infinity, delay: i * 0.7, ease: 'easeInOut' }}>
            <img src="/coffee/bean.png" alt="" className="w-full h-full object-contain" />
          </motion.div>
        ))}
      </motion.div>

      {/* Heading */}
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-12 md:mb-16">
          <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
            className="text-[#4F9C8F] text-xs tracking-[0.4em] uppercase mb-3">Our Collection</motion.p>
          <motion.h2 initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            transition={{ delay: 0.1, duration: 0.8 }}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-[#F5E6D3]"
            style={{ fontFamily: 'Playfair Display, serif' }}>
            Signature Blends
          </motion.h2>
          <motion.div initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }} viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="w-20 h-[1px] bg-gradient-to-r from-transparent via-[#4F9C8F] to-transparent mx-auto mt-5" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-8">
          {coffeeProducts.map((product, index) => (
            <Card3D key={product.id} product={product} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
