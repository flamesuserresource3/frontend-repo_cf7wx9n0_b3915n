import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

const tags = [
  'Milk',
  'Eggs',
  'Bananas',
  'Bread',
  'Rice',
  'Sugar',
  'Detergent',
  'Biscuits',
  'Chips',
  'Toothpaste',
  'Soap',
  'Shampoo',
];

export default function TrendingCarousel({ onPick }) {
  const scroller = useRef(null);

  useEffect(() => {
    const el = scroller.current;
    if (!el) return;
    let raf;
    const speed = 0.35; // px per frame
    const step = () => {
      el.scrollLeft += speed;
      if (el.scrollLeft >= el.scrollWidth - el.clientWidth - 1) {
        el.scrollLeft = 0;
      }
      raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="relative"
    >
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-cyan-400/10 via-fuchsia-500/10 to-pink-500/10 blur-xl" />
      <div
        ref={scroller}
        className="relative flex gap-2 overflow-x-auto no-scrollbar rounded-2xl p-2 backdrop-blur-xl bg-white/5 border border-white/10"
      >
        {tags.map((t, i) => (
          <motion.button
            key={t + i}
            whileTap={{ scale: 0.98 }}
            whileHover={{ y: -1 }}
            onClick={() => onPick?.(t)}
            className="shrink-0 rounded-full px-4 py-2 text-sm text-zinc-100 bg-zinc-900/40 border border-white/10 shadow-[0_10px_30px_-12px_rgba(59,130,246,0.35)]"
          >
            {t}
          </motion.button>
        ))}
      </div>
    </motion.div>
  );
}
