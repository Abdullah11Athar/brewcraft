'use client';

import { useRef, useState, useCallback, useEffect } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
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
      let scale = 1.0;
      if (window.innerWidth < 768) {
        scale = 0.88; // Scale down slightly to fit the cup width
      }

      const s = Math.max(W / img.naturalWidth, H / img.naturalHeight) * scale;
      const w = img.naturalWidth * s;
      const h = img.naturalHeight * s;
      let drawX = (W - w) / 2;
      if (window.innerWidth < 768) {
        drawX -= W * 0.045; // Shift left slightly to pull the right-aligned handle into the viewport
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

function Card3D({ product, index, onBook }: { product: typeof coffeeProducts[0]; index: number; onBook: (product: typeof coffeeProducts[0]) => void }) {
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

  const handleBookClick = (e: React.MouseEvent) => {
    e.stopPropagation(); // Stop parent click events
    onBook(product);
  };

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
                onClick={handleBookClick}
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

const SEATING_AREAS = {
  rooftop: {
    name: 'Rooftop Seating',
    price: 15.00,
    priceStr: '$15.00',
    image: '/coffee/rooftop_seating.png',
  },
  inside: {
    name: 'Inside Lounge',
    price: 10.00,
    priceStr: '$10.00',
    image: '/coffee/inside_lounge.png',
  },
  outside: {
    name: 'Outside Garden',
    price: 12.00,
    priceStr: '$12.00',
    image: '/coffee/outside_garden.png',
  }
};

function BookingModal({ product, onClose }: { product: typeof coffeeProducts[0]; onClose: () => void }) {
  const [seatingKey, setSeatingKey] = useState<'rooftop' | 'inside' | 'outside'>('rooftop');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('7:30 PM');
  const [guests, setGuests] = useState('2 Guests');
  const [tableNumber, setTableNumber] = useState('Table 1');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    setDate(tomorrow.toISOString().split('T')[0]);
  }, []);

  const activeSeating = SEATING_AREAS[seatingKey];

  // Parse coffee price
  const coffeeNumeric = parseFloat(product.price.replace(/[^0-9.]/g, '')) || 0;
  const guestCount = parseInt(guests.split(' ')[0]) || 1;
  const totalAmount = (coffeeNumeric * guestCount) + activeSeating.price;

  const handleBook = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!date) {
      alert('Please select a reservation date.');
      return;
    }
    setLoading(true);
    try {
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id: product.id,
          name: product.name,
          price: `$${totalAmount.toFixed(2)}`, // total combined price passed as price
          image: activeSeating.image, // show restaurant image in Stripe Checkout
          booking: {
            seatingArea: activeSeating.name,
            date,
            time,
            guests,
            tableNumber,
          }
        }),
      });
      const data = await response.json();
      if (data.url) {
        window.location.href = data.url; // Secure redirect to Stripe Checkout
      } else {
        alert(data.error || 'Failed to initialize booking payment.');
        setLoading(false);
      }
    } catch (err) {
      console.error(err);
      alert('Connection error. Please try again.');
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
      {/* Backdrop Closer */}
      <div className="absolute inset-0 cursor-pointer" onClick={onClose} />

      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        className="relative bg-[#130A06] border border-[#5A4034]/70 rounded-2xl w-full max-w-md max-h-[90vh] overflow-y-auto text-[#C9B8A0] shadow-2xl z-10 custom-scrollbar"
      >
        {/* Glow Line */}
        <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#4F9C8F] via-[#D4A574] to-[#4F9C8F]" />

        {/* Modal Image Header (Shows Selected Seating Space Photo!) */}
        <div className="relative w-full h-48 bg-[#0a0300]">
          <img src={activeSeating.image} alt={activeSeating.name} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#130A06] via-transparent to-transparent" />
          <button
            type="button"
            onClick={onClose}
            className="absolute top-4 right-4 bg-black/55 text-white w-8 h-8 rounded-full flex items-center justify-center hover:bg-black/80 transition-colors text-sm"
          >
            ✕
          </button>
          <div className="absolute bottom-4 left-6">
            <span className="text-2xs px-2 py-0.5 rounded-full border border-[#4F9C8F] text-[#4F9C8F] font-semibold uppercase tracking-wider bg-[#0a0300]/40">
              Booking with {product.name}
            </span>
            <h3 className="text-2xl font-bold text-white mt-1.5" style={{ fontFamily: 'Playfair Display, serif' }}>
              {activeSeating.name}
            </h3>
          </div>
        </div>

        {/* Modal Form */}
        <form onSubmit={handleBook} className="p-6 space-y-4">
          {/* Seating Area Radio Selector */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-[#D4A574] mb-2">
              Choose Seating Area
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              {(Object.keys(SEATING_AREAS) as Array<keyof typeof SEATING_AREAS>).map((key) => {
                const area = SEATING_AREAS[key];
                const active = seatingKey === key;
                return (
                  <button
                    key={key}
                    type="button"
                    onClick={() => setSeatingKey(key)}
                    className={`px-4 py-3 sm:px-2 sm:py-3 rounded-xl border transition-all duration-200 flex flex-row sm:flex-col items-center justify-between sm:justify-center ${
                      active
                        ? 'bg-[#4F9C8F]/15 border-[#4F9C8F] text-[#F5E6D3] font-semibold'
                        : 'bg-[#1A0F0A] border-[#3D2820] text-[#C9B8A0]/75 hover:border-[#5A4034]'
                    }`}
                  >
                    <div className="text-xs uppercase tracking-wider font-semibold">{area.name.split(' ')[0]}</div>
                    <div className={`text-xs sm:mt-1 font-medium ${active ? 'text-[#4F9C8F]' : 'text-[#C9B8A0]'}`}>
                      +{area.priceStr}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Date Picker */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-[#D4A574] mb-1.5">
              Select Date
            </label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full bg-[#1A0F0A] border border-[#3D2820] rounded-xl px-4 py-2.5 text-[#F5E6D3] text-sm focus:outline-none focus:border-[#4F9C8F] transition-colors"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            {/* Time Slot Selector */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-[#D4A574] mb-1.5">
                Time Slot
              </label>
              <select
                value={time}
                onChange={(e) => setTime(e.target.value)}
                className="w-full bg-[#1A0F0A] border border-[#3D2820] rounded-xl px-3 py-2.5 text-[#F5E6D3] text-sm focus:outline-none focus:border-[#4F9C8F] transition-colors cursor-pointer"
              >
                {['6:00 PM', '7:00 PM', '8:00 PM', '9:00 PM', '10:00 PM'].map((t) => (
                  <option key={t} value={t} className="bg-[#1A0F0A]">{t}</option>
                ))}
              </select>
            </div>

            {/* Table Number Selector */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-[#D4A574] mb-1.5">
                Table Number
              </label>
              <select
                value={tableNumber}
                onChange={(e) => setTableNumber(e.target.value)}
                className="w-full bg-[#1A0F0A] border border-[#3D2820] rounded-xl px-3 py-2.5 text-[#F5E6D3] text-sm focus:outline-none focus:border-[#4F9C8F] transition-colors cursor-pointer"
              >
                {[...Array(10)].map((_, i) => (
                  <option key={i} value={`Table ${i + 1}`} className="bg-[#1A0F0A]">Table {i + 1}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Guest Count */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-[#D4A574] mb-1.5">
              Number of Guests
            </label>
            <select
              value={guests}
              onChange={(e) => setGuests(e.target.value)}
              className="w-full bg-[#1A0F0A] border border-[#3D2820] rounded-xl px-4 py-2.5 text-[#F5E6D3] text-sm focus:outline-none focus:border-[#4F9C8F] transition-colors cursor-pointer"
            >
              {[1, 2, 3, 4, 5, 6, 7, 8].map((g) => (
                <option key={g} value={`${g} ${g === 1 ? 'Guest' : 'Guests'}`} className="bg-[#1A0F0A]">
                  {g} {g === 1 ? 'Guest' : 'Guests'}
                </option>
              ))}
            </select>
          </div>

          {/* Cost Breakdown Summary */}
          <div className="bg-[#0A0300] border border-[#3D2820]/60 rounded-xl p-4 text-xs space-y-2">
            <div className="flex justify-between">
              <span className="text-[#C9B8A0]/60">{product.name} ({guestCount}x):</span>
              <span className="text-[#F5E6D3] font-medium">${(coffeeNumeric * guestCount).toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#C9B8A0]/60">{activeSeating.name} reservation:</span>
              <span className="text-[#F5E6D3] font-medium">+{activeSeating.priceStr}</span>
            </div>
            <div className="h-[1px] bg-[#3D2820]/60 my-1" />
            <div className="flex justify-between text-sm font-semibold">
              <span className="text-[#D4A574]">Total Cost:</span>
              <span className="text-[#4F9C8F]">${totalAmount.toFixed(2)}</span>
            </div>
          </div>

          {/* Action Button */}
          <button
            type="submit"
            disabled={loading}
            className={`w-full mt-2 py-3 bg-gradient-to-r from-[#4F9C8F] to-[#2d6b62] text-white text-sm font-semibold rounded-xl hover:shadow-lg hover:shadow-[#4F9C8F]/20 transition-all duration-300 flex items-center justify-center gap-2 ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
          >
            {loading ? (
              <>
                <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                Processing Reservation...
              </>
            ) : (
              `Reserve & Pay $${totalAmount.toFixed(2)}`
            )}
          </button>
        </form>
      </motion.div>
    </div>
  );
}

export default function ProductShowcase() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const bannerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: bp } = useScroll({ target: bannerRef, offset: ['start end', 'end start'] });
  const bannerY = useTransform(bp, [0, 1], [20, -20]);
  const [activeBooking, setActiveBooking] = useState<typeof coffeeProducts[0] | null>(null);

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
      <div id="menu" className="max-w-7xl mx-auto relative z-10">
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
          <p className="text-xs text-[#C9B8A0]/60 mt-4 max-w-md mx-auto leading-relaxed">
            Select a drink to experience the interactive table booking module. This storefront serves as a live, functional preview of our premium design template.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-8">
          {coffeeProducts.map((product, index) => (
            <Card3D key={product.id} product={product} index={index} onBook={setActiveBooking} />
          ))}
        </div>
      </div>

      <AnimatePresence>
        {activeBooking && (
          <BookingModal product={activeBooking} onClose={() => setActiveBooking(null)} />
        )}
      </AnimatePresence>
    </section>
  );
}
