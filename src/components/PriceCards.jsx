import { useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

const sample = {
  title: 'Amul Taaza Toned Milk 1L',
  image: 'https://images.unsplash.com/photo-1550581190-9c1c48d21d6c?q=80&w=1200&auto=format&fit=crop',
  stores: [
    { name: 'Blinkit', price: 62, delivery: 15, gst: 0, eta: '15-20m' },
    { name: 'Zepto', price: 61, delivery: 14, gst: 0, eta: '20-30m' },
    { name: 'Instamart', price: 63, delivery: 10, gst: 0, eta: '25-35m' },
    { name: 'BigBasket', price: 60, delivery: 25, gst: 0, eta: 'Same day' },
    { name: 'Flipkart', price: 59, delivery: 30, gst: 0, eta: 'Same day' },
    { name: 'Amazon', price: 58, delivery: 40, gst: 0, eta: 'Tomorrow' },
  ],
};

export default function PriceCards({ query }) {
  const [open, setOpen] = useState(false);
  const data = useMemo(() => {
    if (!query) return null;
    return sample;
  }, [query]);

  if (!data) return null;

  const totals = data.stores.map((s) => ({ ...s, total: s.price + s.delivery + (s.gst || 0) }));
  const best = totals.reduce((a, b) => (a.total < b.total ? a : b));

  return (
    <div className="space-y-4">
      <motion.div
        initial={{ opacity: 0, y: 12, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ type: 'spring', stiffness: 140, damping: 18 }}
        className="relative rounded-3xl bg-zinc-900/50 backdrop-blur-2xl border border-white/10 shadow-[0_20px_120px_-20px_rgba(168,85,247,0.35)] overflow-hidden"
      >
        <div className="absolute -inset-px rounded-3xl pointer-events-none bg-gradient-to-r from-cyan-400/10 via-fuchsia-500/10 to-pink-500/10" />

        <div className="flex gap-4 p-4">
          <div className="relative h-20 w-20 shrink-0 rounded-2xl overflow-hidden bg-zinc-800/60 border border-white/10">
            <img src={data.image} alt={data.title} className="h-full w-full object-cover" loading="lazy" />
            <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-white/10 to-transparent" />
          </div>
          <div className="flex-1"> 
            <div className="flex items-start justify-between gap-3">
              <div>
                <h3 className="text-base sm:text-lg font-semibold text-white">{data.title}</h3>
                <p className="text-xs text-zinc-400">Best total</p>
              </div>
              <div className="text-right">
                <div className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-violet-400 to-pink-400">
                  ₹{best.total}
                </div>
                <div className="text-[11px] text-zinc-400">at {best.name} · {best.eta}</div>
              </div>
            </div>

            <div className="mt-3 flex items-center gap-2">
              <motion.button
                whileTap={{ scale: 0.98 }}
                whileHover={{ y: -1 }}
                onClick={() => setOpen((v) => !v)}
                className="inline-flex items-center gap-1 rounded-xl px-3 py-2 text-xs font-medium text-white bg-gradient-to-r from-cyan-500 via-violet-500 to-pink-500 shadow-[0_10px_30px_-12px_rgba(99,102,241,0.85)]"
              >
                View all stores
                <motion.span animate={{ rotate: open ? 180 : 0 }} className="inline-block">
                  <ChevronDown className="h-4 w-4" />
                </motion.span>
              </motion.button>
            </div>
          </div>
        </div>

        <AnimatePresence initial={false}>
          {open && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ type: 'spring', stiffness: 150, damping: 20 }}
              className="px-4 pb-4"
            >
              <div className="grid grid-cols-1 divide-y divide-white/10 rounded-2xl overflow-hidden bg-zinc-900/40 border border-white/10">
                {totals.map((s) => (
                  <div key={s.name} className="flex items-center justify-between p-3">
                    <div className="text-sm text-white">{s.name} <span className="text-zinc-400 text-xs">· {s.eta}</span></div>
                    <div className="text-sm text-zinc-300">₹{s.price} + ₹{s.delivery}{s.gst ? ` + ₹${s.gst}` : ''} <span className="text-white font-semibold">= ₹{s.total}</span></div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
