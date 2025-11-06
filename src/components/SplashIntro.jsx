import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function SplashIntro() {
  const [show, setShow] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setShow(false), 1900);
    return () => clearTimeout(t);
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-0 z-50 grid place-items-center bg-black"
        >
          <motion.div
            initial={{ scale: 0.8, rotate: -8, opacity: 0 }}
            animate={{ scale: 1, rotate: 0, opacity: 1 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="relative"
          >
            <div className="absolute -inset-10 blur-3xl opacity-40 bg-[conic-gradient(at_50%_50%,#06b6d4,45%,#a855f7,70%,#ec4899)] rounded-full" />
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1.02 }}
              transition={{ repeat: Infinity, repeatType: 'mirror', duration: 1.2, ease: 'easeInOut' }}
              className="relative px-8 py-5 rounded-3xl bg-white/10 backdrop-blur-2xl border border-white/10"
            >
              <div className="text-4xl sm:text-5xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-violet-500 to-pink-500">
                PRIMANIA
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
