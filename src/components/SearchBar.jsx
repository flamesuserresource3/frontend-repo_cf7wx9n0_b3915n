import { useState } from "react";
import { Search } from "lucide-react";

export default function SearchBar({ onSearch }) {
  const [query, setQuery] = useState("");

  const submit = (e) => {
    e.preventDefault();
    const q = query.trim();
    if (!q) return;
    onSearch?.(q);
  };

  return (
    <form onSubmit={submit} className="relative mx-auto w-full max-w-2xl">
      <div className="group flex items-center rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl transition focus-within:bg-white/10">
        <Search className="ml-3 h-5 w-5 text-white/70" />
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search products, e.g. Amul milk, Maggi, Coke…"
          className="w-full bg-transparent px-3 py-3 text-sm text-white placeholder:text-white/50 focus:outline-none sm:text-base"
          aria-label="Search products"
        />
        <button
          type="submit"
          className="m-1 rounded-xl bg-gradient-to-r from-fuchsia-500 to-cyan-500 px-4 py-2 text-sm font-semibold text-white shadow-lg shadow-fuchsia-500/20 transition hover:brightness-110"
        >
          Search
        </button>
      </div>
    </form>
  );
}
