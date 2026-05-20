'use client';

import { useRef, useEffect, useState, useCallback } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';

// Steam + coffee drop particles canvas
function AtmosphereCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef = useRef<number>(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setIsMobile(window.innerWidth < 768);
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (isMobile) return; // Disable on mobile to save performance and fix overlapping issue

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    type Particle = {
      x: number; y: number;
      vx: number; vy: number;
      size: number; opacity: number;
      life: number; maxLife: number;
      type: 'steam' | 'drop' | 'spark';
      hue: number;
    };

    const particles: Particle[] = [];

    const spawn = () => {
      const W = canvas.width;
      const H = canvas.height;
      const type = Math.random() < 0.6 ? 'steam' : Math.random() < 0.7 ? 'drop' : 'spark';

      if (type === 'steam') {
        particles.push({
          x: W * 0.3 + Math.random() * W * 0.4,
          y: H * 0.85 + Math.random() * H * 0.1,
          vx: (Math.random() - 0.5) * 0.4,
          vy: -(0.5 + Math.random() * 0.8),
          size: 20 + Math.random() * 40,
          opacity: 0,
          life: 0,
          maxLife: 180 + Math.random() * 120,
          type,
          hue: 30 + Math.random() * 20,
        });
      } else if (type === 'drop') {
        particles.push({
          x: W * 0.2 + Math.random() * W * 0.6,
          y: -10,
          vx: (Math.random() - 0.5) * 1.5,
          vy: 1 + Math.random() * 2,
          size: 2 + Math.random() * 4,
          opacity: 0.6 + Math.random() * 0.4,
          life: 0,
          maxLife: 100 + Math.random() * 80,
          type,
          hue: 25 + Math.random() * 15,
        });
      } else {
        particles.push({
          x: W * 0.1 + Math.random() * W * 0.8,
          y: H * 0.3 + Math.random() * H * 0.5,
          vx: (Math.random() - 0.5) * 2,
          vy: (Math.random() - 0.5) * 2,
          size: 1 + Math.random() * 2,
          opacity: 0.8,
          life: 0,
          maxLife: 60 + Math.random() * 40,
          type,
          hue: 40 + Math.random() * 20,
        });
      }
    };

    let frame = 0;
    const tick = () => {
      frame++;
      const W = canvas.width;
      const H = canvas.height;
      ctx.clearRect(0, 0, W, H);

      // Spawn
      if (frame % 4 === 0) spawn();
      if (frame % 8 === 0) spawn();

      // Draw & update
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.life++;
        p.x += p.vx;
        p.y += p.vy;
        const t = p.life / p.maxLife;

        if (p.type === 'steam') {
          p.vx += (Math.random() - 0.5) * 0.05;
          p.size += 0.3;
          const alpha = t < 0.2 ? (t / 0.2) * 0.12 : t > 0.7 ? ((1 - t) / 0.3) * 0.12 : 0.12;
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
          ctx.fillStyle = `hsla(${p.hue}, 40%, 70%, ${alpha})`;
          ctx.fill();
        } else if (p.type === 'drop') {
          const alpha = t > 0.8 ? (1 - t) / 0.2 * p.opacity : p.opacity;
          ctx.save();
          ctx.translate(p.x, p.y);
          ctx.rotate(Math.atan2(p.vy, p.vx) + Math.PI / 2);
          ctx.beginPath();
          ctx.moveTo(0, -p.size * 1.5);
          ctx.bezierCurveTo(p.size * 0.5, -p.size * 0.5, p.size * 0.5, p.size, 0, p.size * 1.2);
          ctx.bezierCurveTo(-p.size * 0.5, p.size, -p.size * 0.5, -p.size * 0.5, 0, -p.size * 1.5);
          ctx.fillStyle = `hsla(${p.hue}, 70%, 45%, ${alpha * 0.7})`;
          ctx.fill();
          ctx.restore();
        } else {
          const alpha = t > 0.7 ? (1 - t) / 0.3 * p.opacity : p.opacity;
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size * (1 - t * 0.5), 0, Math.PI * 2);
          ctx.fillStyle = `hsla(${p.hue}, 80%, 65%, ${alpha})`;
          ctx.fill();
        }

        if (p.life >= p.maxLife || p.y > H + 20 || p.y < -20) {
          particles.splice(i, 1);
        }
      }

      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener('resize', resize);
    };
  }, [isMobile]);

  if (isMobile) return null;

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none" />;
}

// Magnetic button
function MagneticButton() {
  const btnRef = useRef<HTMLButtonElement>(null);
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [hovered, setHovered] = useState(false);

  const onMove = useCallback((e: React.MouseEvent<HTMLButtonElement>) => {
    const btn = btnRef.current;
    if (!btn) return;
    const r = btn.getBoundingClientRect();
    const x = e.clientX - r.left - r.width / 2;
    const y = e.clientY - r.top - r.height / 2;
    setPos({ x: x * 0.35, y: y * 0.35 });
  }, []);

  const onLeave = useCallback(() => {
    setPos({ x: 0, y: 0 });
    setHovered(false);
  }, []);

  const springX = useSpring(pos.x, { stiffness: 200, damping: 20 });
  const springY = useSpring(pos.y, { stiffness: 200, damping: 20 });

  const handleClick = () => {
    document.getElementById('menu')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <motion.button
      ref={btnRef}
      onMouseMove={onMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={onLeave}
      onClick={handleClick}
      style={{ x: springX, y: springY }}
      className="relative px-8 sm:px-12 md:px-16 py-4 md:py-5 rounded-full text-base md:text-lg font-semibold text-white overflow-hidden group"
    >
      {/* Base */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#4F9C8F] to-[#2d7a6e] rounded-full" />
      {/* Hover shimmer */}
      <motion.div
        className="absolute inset-0 rounded-full"
        style={{
          background: 'linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.15) 50%, transparent 60%)',
          backgroundSize: '200% 100%',
        }}
        animate={hovered ? { backgroundPosition: ['200% 0', '-200% 0'] } : {}}
        transition={{ duration: 0.6 }}
      />
      {/* Glow ring */}
      <motion.div
        className="absolute inset-[-2px] rounded-full"
        style={{ background: 'linear-gradient(135deg, rgba(79,156,143,0.6), rgba(212,165,116,0.4))' }}
        animate={{ opacity: hovered ? 1 : 0 }}
        transition={{ duration: 0.3 }}
      />
      <div className="absolute inset-[2px] bg-gradient-to-r from-[#4F9C8F] to-[#2d7a6e] rounded-full" />
      <span className="relative z-10 tracking-wide">Explore Full Menu</span>
    </motion.button>
  );
}

export default function FinalCTA() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], [50, -50]);

  // Word-by-word reveal
  const words = ['Find', 'the', 'Perfect', 'Coffee', 'for', 'You'];

  return (
    <section ref={ref} className="relative py-24 md:py-36 lg:py-48 px-4 overflow-hidden min-h-screen flex items-center">
      {/* Deep background */}
      <div className="absolute inset-0 bg-[#050201]" />

      {/* Large radial coffee glow */}
      <motion.div
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[900px] h-[500px] rounded-full blur-[120px] pointer-events-none"
        style={{ background: 'radial-gradient(ellipse, rgba(120,55,15,0.35) 0%, transparent 70%)' }}
        animate={{ scale: [1, 1.1, 1], opacity: [0.6, 1, 0.6] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* Teal accent glow top */}
      <motion.div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] rounded-full blur-[100px] pointer-events-none"
        style={{ background: 'radial-gradient(ellipse, rgba(79,156,143,0.12) 0%, transparent 70%)' }}
        animate={{ scale: [1, 1.2, 1] }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
      />

      {/* Atmosphere particles */}
      <AtmosphereCanvas />

      {/* Horizontal divider lines */}
      <motion.div
        className="absolute top-16 left-0 right-0 h-[1px] pointer-events-none"
        style={{ background: 'linear-gradient(to right, transparent, rgba(212,165,116,0.15), transparent)' }}
        initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }} viewport={{ once: true }}
        transition={{ duration: 1.5 }}
      />
      <motion.div
        className="absolute bottom-16 left-0 right-0 h-[1px] pointer-events-none"
        style={{ background: 'linear-gradient(to right, transparent, rgba(79,156,143,0.15), transparent)' }}
        initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }} viewport={{ once: true }}
        transition={{ duration: 1.5, delay: 0.3 }}
      />

      <motion.div style={{ y }} className="relative z-10 max-w-5xl mx-auto text-center w-full">

        {/* Eyebrow */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex items-center justify-center gap-4 mb-10"
        >
          <div className="w-12 h-[1px] bg-[#4F9C8F]/50" />
          <p className="text-[#4F9C8F] text-xs tracking-[0.5em] uppercase">Begin Your Journey</p>
          <div className="w-12 h-[1px] bg-[#4F9C8F]/50" />
        </motion.div>

        {/* Word-by-word headline */}
        <h2 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-bold text-[#F5E6D3] leading-tight mb-8 flex flex-wrap justify-center gap-x-4 md:gap-x-6"
          style={{ fontFamily: 'Playfair Display, serif' }}>
          {words.map((word, i) => (
            <motion.span
              key={i}
              initial={{ opacity: 0, y: 60, rotateX: -40 }}
              whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
              style={{ display: 'inline-block' }}
            >
              {word}
            </motion.span>
          ))}
        </h2>

        {/* Decorative line */}
        <motion.div
          initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }} viewport={{ once: true }}
          transition={{ delay: 0.7, duration: 1 }}
          className="w-32 h-[1px] mx-auto mb-8"
          style={{ background: 'linear-gradient(to right, transparent, rgba(212,165,116,0.7), transparent)' }}
        />

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="text-lg md:text-xl text-[#C9B8A0]/80 mb-16 max-w-lg mx-auto leading-relaxed"
        >
          Experience the art of coffee craftsmanship — where every cup tells a story
        </motion.p>

        {/* Magnetic CTA */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6, type: 'spring', stiffness: 200 }}
        >
          <MagneticButton />
        </motion.div>

        {/* Stats row */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.8 }}
          className="mt-16 md:mt-20 flex flex-wrap items-center justify-center gap-8 sm:gap-12 md:gap-20"
        >
          {[
            { num: '15+', label: 'Blends' },
            { num: '★ 4.9', label: 'Rating' },
            { num: '10K+', label: 'Happy Customers' },
          ].map((stat, i) => (
            <div key={i} className="text-center">
              <div className="text-2xl md:text-3xl font-bold text-[#D4A574]"
                style={{ fontFamily: 'Playfair Display, serif' }}>
                {stat.num}
              </div>
              <div className="text-xs text-[#C9B8A0]/60 tracking-widest uppercase mt-1">{stat.label}</div>
            </div>
          ))}
        </motion.div>

        {/* Footer note */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 1 }}
          className="mt-16 text-xs text-[#5A4034] tracking-widest uppercase"
        >
          Artisan Coffee · Est. 2024
        </motion.p>
      </motion.div>
    </section>
  );
}