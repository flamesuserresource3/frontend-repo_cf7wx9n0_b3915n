import { User, Home, Compass, MessageCircle } from "lucide-react";

export default function NavBar({ onNav, active = "home" }) {
  const Item = ({ id, icon: Icon, label }) => (
    <button
      onClick={() => onNav?.(id)}
      className={`flex items-center gap-2 rounded-xl px-3 py-2 text-sm transition ${
        active === id ? "bg-white/15 text-white" : "text-white/70 hover:bg-white/10 hover:text-white"
      }`}
      aria-label={label}
    >
      <Icon className="h-4 w-4" />
      <span className="hidden sm:inline">{label}</span>
    </button>
  );

  return (
    <header className="sticky top-0 z-30 w-full backdrop-blur-xl">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        <div className="flex items-center gap-2">
          <div className="h-6 w-6 rounded-lg bg-gradient-to-br from-fuchsia-500 to-cyan-500" />
          <span className="bg-gradient-to-r from-fuchsia-300 to-cyan-300 bg-clip-text text-lg font-extrabold tracking-tight text-transparent">PRIMANIA</span>
        </div>
        <nav className="flex items-center gap-1 rounded-xl border border-white/10 bg-white/5 p-1">
          <Item id="home" icon={Home} label="Home" />
          <Item id="explore" icon={Compass} label="Explore" />
          <Item id="chat" icon={MessageCircle} label="Chat" />
          <Item id="profile" icon={User} label="Profile" />
        </nav>
      </div>
    </header>
  );
}
