'use client';

import { useRef, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { features } from '@/data/products';

function BeanOrbitCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const SIZE = 400;
    canvas.width = SIZE;
    canvas.height = SIZE;
    const cx = SIZE / 2;
    const cy = SIZE / 2;

    const beanImg = new Image();
    beanImg.src = '/coffee/bean.png';

    const beans = [
      ...Array.from({ length: 5 }, (_, i) => ({
        angle: (i / 5) * Math.PI * 2,
        radius: 95, speed: 0.009, size: 16, opacity: 0.9,
        tilt: (i * 0.8),
      })),
      ...Array.from({ length: 7 }, (_, i) => ({
        angle: (i / 7) * Math.PI * 2 + 0.5,
        radius: 140, speed: -0.006, size: 22, opacity: 0.75,
        tilt: (i * 0.6),
      })),
      ...Array.from({ length: 9 }, (_, i) => ({
        angle: (i / 9) * Math.PI * 2 + 1.2,
        radius: 182, speed: 0.003, size: 28, opacity: 0.5,
        tilt: (i * 0.4),
      })),
    ];

    const drawBean = (x: number, y: number, size: number, angle: number, opacity: number) => {
      ctx.save();
      ctx.globalAlpha = opacity;
      ctx.translate(x, y);
      ctx.rotate(angle);
      if (beanImg.complete && beanImg.naturalWidth) {
        ctx.drawImage(beanImg, -size / 2, -size / 2, size, size);
      } else {
        ctx.beginPath();
        ctx.ellipse(0, 0, size * 0.35, size * 0.55, 0, 0, Math.PI * 2);
        ctx.fillStyle = '#6B3A1F';
        ctx.fill();
      }
      ctx.restore();
    };

    let t = 0;
    const tick = () => {
      t++;
      ctx.clearRect(0, 0, SIZE, SIZE);
      [95, 140, 182].forEach(r => {
        ctx.beginPath();
        ctx.arc(cx, cy, r, 0, Math.PI * 2);
        ctx.strokeStyle = 'rgba(150,80,30,0.07)';
        ctx.lineWidth = 1;
        ctx.setLineDash([3, 7]);
        ctx.stroke();
        ctx.setLineDash([]);
      });
      beans.forEach(b => {
        b.angle += b.speed;
        const x = cx + Math.cos(b.angle) * b.radius;
        const y = cy + Math.sin(b.angle) * b.radius;
        const op = b.opacity * (0.85 + Math.sin(t * 0.04 + b.angle) * 0.15);
        drawBean(x, y, b.size, b.angle + Math.PI / 2 + b.tilt, op);
      });
      rafRef.current = requestAnimationFrame(tick);
    };

    const start = () => { rafRef.current = requestAnimationFrame(tick); };
    if (beanImg.complete) start();
    else beanImg.onload = start;
    return () => cancelAnimationFrame(rafRef.current);
  }, []);

  return (
    <canvas ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      width={400} height={400} />
  );
}

export default function FeatureSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start end', 'end start'] });
  const cupY = useTransform(scrollYProgress, [0, 1], [30, -30]);

  return (
    <section ref={sectionRef} className="relative py-20 md:py-32 px-4 md:px-8 overflow-hidden">
      <div className="absolute inset-0 bg-[#0a0503]" />

      <div className="relative z-10 max-w-7xl mx-auto">
        <div className="text-center mb-12 md:mb-20">
          <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
            className="text-[#4F9C8F] text-xs tracking-[0.4em] uppercase mb-3">Why Choose Us</motion.p>
          <motion.h2 initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-4xl sm:text-5xl md:text-6xl font-bold text-[#F5E6D3]"
            style={{ fontFamily: 'Playfair Display, serif' }}>
            Crafted with Passion
          </motion.h2>
        </div>

        <div className="flex flex-col lg:grid lg:grid-cols-3 gap-8 items-center">
          {/* Left */}
          <div className="w-full space-y-5 order-2 lg:order-1">
            {features.filter(f => f.position === 'left').map((feature, i) => (
              <motion.div key={i}
                initial={{ opacity: 0, x: -40 }} whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }} transition={{ duration: 0.6, delay: i * 0.12 }}
                whileHover={{ x: 5, transition: { duration: 0.2 } }}
                className="bg-[#1a0a05]/80 backdrop-blur-md p-5 rounded-2xl border border-[#5A4034]/30 relative overflow-hidden group">
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-400 rounded-2xl"
                  style={{ background: 'linear-gradient(135deg, rgba(79,156,143,0.06) 0%, transparent 60%)' }} />
                <div className="text-[#4F9C8F]/12 text-5xl font-bold absolute top-2 right-3"
                  style={{ fontFamily: 'Playfair Display, serif' }}>{String(i + 1).padStart(2, '0')}</div>
                <div className="w-6 h-[1px] bg-[#4F9C8F] mb-3" />
                <h3 className="text-sm md:text-base font-semibold text-[#F5E6D3] mb-2 relative z-10"
                  style={{ fontFamily: 'Playfair Display, serif' }}>{feature.title}</h3>
                <p className="text-xs md:text-sm text-[#C9B8A0] leading-relaxed relative z-10">{feature.description}</p>
              </motion.div>
            ))}
          </div>

          {/* Center — cup + beans — PERFECTLY centered */}
          <motion.div style={{ y: cupY }}
            className="order-1 lg:order-2 flex items-center justify-center w-full">
            <div className="relative" style={{ width: 400, height: 400 }}>
              <BeanOrbitCanvas />
              {/* Glow */}
              <div className="absolute rounded-full blur-3xl pointer-events-none"
                style={{ width: 180, height: 180, top: '50%', left: '50%', transform: 'translate(-50%,-50%)', background: 'rgba(212,165,116,0.1)' }} />
              {/* Cup — pixel perfect center */}
              <motion.img
                src="/coffee/cup-centered.png"
                alt="BrewCraft Cup"
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                style={{
                  position: 'absolute',
                  width: 170,
                  height: 170,
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                  objectFit: 'contain',
                  filter: 'drop-shadow(0 20px 40px rgba(0,0,0,0.9))',
                  zIndex: 10,
                }}
              />
            </div>
          </motion.div>

          {/* Right */}
          <div className="w-full space-y-5 order-3">
            {features.filter(f => f.position === 'right').map((feature, i) => (
              <motion.div key={i}
                initial={{ opacity: 0, x: 40 }} whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }} transition={{ duration: 0.6, delay: i * 0.12 }}
                whileHover={{ x: -5, transition: { duration: 0.2 } }}
                className="bg-[#1a0a05]/80 backdrop-blur-md p-5 rounded-2xl border border-[#5A4034]/30 relative overflow-hidden group">
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-400 rounded-2xl"
                  style={{ background: 'linear-gradient(225deg, rgba(212,165,116,0.06) 0%, transparent 60%)' }} />
                <div className="text-[#D4A574]/12 text-5xl font-bold absolute top-2 right-3"
                  style={{ fontFamily: 'Playfair Display, serif' }}>{String(i + 3).padStart(2, '0')}</div>
                <div className="w-6 h-[1px] bg-[#D4A574] mb-3" />
                <h3 className="text-sm md:text-base font-semibold text-[#F5E6D3] mb-2 relative z-10"
                  style={{ fontFamily: 'Playfair Display, serif' }}>{feature.title}</h3>
                <p className="text-xs md:text-sm text-[#C9B8A0] leading-relaxed relative z-10">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
