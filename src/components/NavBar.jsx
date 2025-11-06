import { motion } from 'framer-motion';
import { Home, Compass, MessageSquare, User } from 'lucide-react';

const tabs = [
  { key: 'home', label: 'Home', Icon: Home },
  { key: 'explore', label: 'Explore', Icon: Compass },
  { key: 'chat', label: 'Chat', Icon: MessageSquare },
  { key: 'profile', label: 'Profile', Icon: User },
];

export default function NavBar({ current = 'home', onChange }) {
  return (
    <div className="fixed inset-x-0 bottom-4 flex justify-center px-4 z-40">
      <motion.nav
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: 'spring', stiffness: 160, damping: 18 }}
        className="relative w-full max-w-md rounded-full bg-white/10 backdrop-blur-2xl border border-white/10 shadow-[0_20px_60px_-20px_rgba(0,0,0,0.6)]"
      >
        <div className="absolute inset-0 rounded-full pointer-events-none bg-gradient-to-r from-cyan-400/10 via-fuchsia-500/10 to-pink-500/10" />
        <div className="flex items-center justify-between px-4 py-2">
          {tabs.map(({ key, label, Icon }) => {
            const active = current === key;
            return (
              <button
                key={key}
                onClick={() => onChange?.(key)}
                className="relative flex-1 flex items-center justify-center gap-2 py-2"
              >
                {active && (
                  <motion.span
                    layoutId="pill"
                    className="absolute inset-y-0 left-2 right-2 rounded-full bg-white/10"
                    transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                  />
                )}
                <Icon className={`h-5 w-5 ${active ? 'text-white' : 'text-zinc-300'}`} />
                <span className={`text-xs ${active ? 'text-white' : 'text-zinc-300'}`}>{label}</span>
              </button>
            );
          })}
        </div>
      </motion.nav>
    </div>
  );
}
