import { useState } from 'react';
import { motion } from 'framer-motion';
import TitleHero from './components/TitleHero.jsx';
import SearchBar from './components/SearchBar.jsx';
import TrendingCarousel from './components/TrendingCarousel.jsx';
import PriceCards from './components/PriceCards.jsx';
import NavBar from './components/NavBar.jsx';
import SplashIntro from './components/SplashIntro.jsx';

export default function App() {
  const [tab, setTab] = useState('home');
  const [query, setQuery] = useState('');

  const onSearch = (q) => {
    if (!q) return;
    setQuery(q);
  };

  return (
    <div className="min-h-screen bg-[#0a0a0b] text-white font-inter relative overflow-hidden">
      {/* Background animated gradient flow */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-32 left-1/2 -translate-x-1/2 h-[480px] w-[720px] rounded-full blur-[120px] opacity-30 bg-[radial-gradient(ellipse_at_center,rgba(14,165,233,0.35),rgba(124,58,237,0.25),rgba(236,72,153,0.2)_70%)] animate-pulse" />
      </div>

      <SplashIntro />

      {/* Content */}
      <div className="relative z-10 mx-auto w-full max-w-screen-sm p-4 pb-28">
        <header className="py-2">
          <TitleHero />
        </header>

        <main className="mt-6 space-y-6">
          <SearchBar onSearch={onSearch} />
          <TrendingCarousel onPick={onSearch} />

          {tab === 'home' && (
            <motion.section initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
              <PriceCards query={query} />
            </motion.section>
          )}

          {tab === 'explore' && (
            <motion.section initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="text-zinc-300">
              Coming soon: Explore curated categories and top deals.
            </motion.section>
          )}

          {tab === 'chat' && (
            <motion.section initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="text-zinc-300">
              Coming soon: Ask in natural language for price comparisons.
            </motion.section>
          )}

          {tab === 'profile' && (
            <motion.section initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="text-zinc-300">
              Coming soon: Sign in with Google, favorites, and preferences.
            </motion.section>
          )}
        </main>
      </div>

      <NavBar current={tab} onChange={setTab} />
    </div>
  );
}
