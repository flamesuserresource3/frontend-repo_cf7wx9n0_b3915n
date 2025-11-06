import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Search } from 'lucide-react';

export default function SearchBar({ onSearch }) {
  const [query, setQuery] = useState('');
  const [placeholderIndex, setPlaceholderIndex] = useState(0);
  const placeholders = [
    'Milk 1L near me',
    'Amul butter 500g',
    'Banana price in Bandra',
    'Coke 2L best deal',
  ];

  useEffect(() => {
    const t = setInterval(() => setPlaceholderIndex((i) => (i + 1) % placeholders.length), 2400);
    return () => clearInterval(t);
  }, []);

  const submit = (e) => {
    e.preventDefault();
    onSearch?.(query.trim());
  };

  return (
    <motion.form
      onSubmit={submit}
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="relative w-full"
    >
      {/* Outer glass ring */}
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-cyan-400/30 via-fuchsia-500/30 to-pink-500/30 blur-xl opacity-40" />

      <div className="relative flex items-center gap-2 rounded-2xl p-[2px] bg-white/5 backdrop-blur-xl shadow-[0_8px_40px_rgba(0,0,0,0.5)]">
        <div className="absolute inset-0 rounded-2xl pointer-events-none border border-white/10 shadow-inner shadow-white/5" />
        <div className="pointer-events-none absolute -inset-px rounded-2xl bg-gradient-to-r from-cyan-400/0 via-fuchsia-500/10 to-pink-500/0" />

        <div className="relative flex-1 flex items-center gap-3 rounded-2xl bg-zinc-900/40 px-4 py-3">
          <Search className="h-5 w-5 text-zinc-300/80" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full bg-transparent outline-none text-zinc-100 placeholder:text-zinc-400/70 text-[15px]"
            placeholder={placeholders[placeholderIndex]}
          />
        </div>

        <motion.button
          whileTap={{ scale: 0.98 }}
          whileHover={{ y: -1 }}
          type="submit"
          className="relative mr-1 my-1 rounded-xl px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-cyan-500 via-violet-500 to-pink-500 shadow-[0_8px_30px_-8px_rgba(147,51,234,0.75)]"
        >
          Search
        </motion.button>
      </div>
    </motion.form>
  );
}
