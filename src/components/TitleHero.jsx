import { motion } from "framer-motion";

export default function TitleHero() {
  return (
    <section className="relative w-full pt-20 pb-8 sm:pt-28 sm:pb-12">
      {/* Ambient gradient glow */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
        <div className="h-56 w-56 sm:h-80 sm:w-80 rounded-full bg-gradient-to-br from-fuchsia-500/20 via-cyan-500/20 to-emerald-500/20 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-6xl px-4 text-center">
        <motion.h1
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="select-none text-5xl font-extrabold tracking-tight sm:text-7xl"
        >
          <span className="inline-block bg-gradient-to-r from-fuchsia-400 via-cyan-300 to-emerald-300 bg-clip-text text-transparent">
            PRIMANIA
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15, duration: 0.6 }}
          className="mx-auto mt-4 max-w-2xl text-balance text-sm leading-relaxed text-white/70 sm:text-base"
        >
          Real-time grocery price intelligence for India. Compare Zepto, Blinkit, Swiggy Instamart, BigBasket, Flipkart Minutes, and Amazon Fresh in one sleek view.
        </motion.p>

        {/* Gentle underline pulse */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 0.4, duration: 0.8, ease: "easeOut" }}
          className="mx-auto mt-6 h-px max-w-[640px] origin-left bg-gradient-to-r from-transparent via-white/30 to-transparent"
        />
      </div>
    </section>
  );
}
