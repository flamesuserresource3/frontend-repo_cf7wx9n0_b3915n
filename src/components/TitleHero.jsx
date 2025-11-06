import { useEffect, useRef } from 'react';
import { motion, useMotionValue, useTransform } from 'framer-motion';
import Spline from '@splinetool/react-spline';

export default function TitleHero() {
  const containerRef = useRef(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rotateX = useTransform(my, [-50, 50], [8, -8]);
  const rotateY = useTransform(mx, [-50, 50], [-8, 8]);
  const translateY = useTransform(my, [-50, 50], [-6, 6]);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const onMove = (e) => {
      const rect = el.getBoundingClientRect();
      const x = e.clientX - (rect.left + rect.width / 2);
      const y = e.clientY - (rect.top + rect.height / 2);
      mx.set(Math.max(-50, Math.min(50, x / 10)));
      my.set(Math.max(-50, Math.min(50, y / 10)));
    };
    el.addEventListener('mousemove', onMove);
    return () => el.removeEventListener('mousemove', onMove);
  }, [mx, my]);

  return (
    <div ref={containerRef} className="relative w-full h-[420px] sm:h-[520px] md:h-[600px] overflow-hidden rounded-3xl">
      <div className="absolute inset-0">
        <Spline scene="https://prod.spline.design/4Zh-Q6DWWp5yPnQf/scene.splinecode" style={{ width: '100%', height: '100%' }} />
      </div>

      {/* Gradient aurora overlay for depth */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-24 -left-16 h-72 w-72 rounded-full blur-3xl opacity-30 bg-gradient-to-br from-cyan-400 via-fuchsia-500 to-pink-500" />
        <div className="absolute -bottom-16 -right-12 h-64 w-64 rounded-full blur-3xl opacity-25 bg-gradient-to-br from-purple-500 via-cyan-500 to-emerald-400" />
      </div>

      {/* Title content with subtle parallax */}
      <motion.div
        style={{ rotateX, rotateY, y: translateY }}
        className="relative z-10 h-full flex flex-col items-center justify-center text-center select-none"
      >
        <motion.h1
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="text-5xl sm:text-6xl md:text-7xl font-black tracking-tight bg-clip-text text-transparent bg-[conic-gradient(at_10%_10%,#06b6d4,45%,#a855f7,70%,#ec4899)] drop-shadow-[0_2px_24px_rgba(168,85,247,0.35)]"
        >
          PRIMANIA
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 0.9, y: 0 }}
          transition={{ delay: 0.2, duration: 0.7 }}
          className="mt-3 text-sm sm:text-base text-zinc-300/90"
        >
          Real-time grocery prices across India with premium, glassy vibes
        </motion.p>

        {/* Neon underline glow */}
        <motion.div
          initial={{ opacity: 0, width: 0 }}
          animate={{ opacity: 1, width: '56%' }}
          transition={{ delay: 0.4, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="mt-5 h-[2px] rounded-full bg-gradient-to-r from-cyan-400 via-violet-500 to-pink-500 shadow-[0_0_32px_8px_rgba(99,102,241,0.35)]"
        />
      </motion.div>

      {/* Glass reflection strip */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-20 bg-gradient-to-b from-white/10 to-transparent opacity-25" />
    </div>
  );
}
