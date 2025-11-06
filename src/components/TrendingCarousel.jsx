import { useEffect, useRef } from "react";

const trending = [
  { label: "Snacks", emoji: "🍿" },
  { label: "Dairy", emoji: "🧀" },
  { label: "Beverages", emoji: "🥤" },
  { label: "Bakery", emoji: "🥐" },
  { label: "Fruits", emoji: "🍎" },
  { label: "Vegetables", emoji: "🥦" },
  { label: "Breakfast", emoji: "🍳" },
  { label: "Personal Care", emoji: "🧴" },
  { label: "Household", emoji: "🧹" },
];

export default function TrendingCarousel({ onPick }) {
  const scroller = useRef(null);

  useEffect(() => {
    const el = scroller.current;
    if (!el) return;
    let raf = 0;
    let x = 0;
    const tick = () => {
      x += 0.3;
      el.scrollLeft = x;
      if (x >= el.scrollWidth - el.clientWidth) x = 0;
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <div className="mx-auto w-full max-w-5xl">
      <div
        ref={scroller}
        className="flex gap-3 overflow-x-auto scroll-smooth rounded-2xl border border-white/10 bg-white/5 p-3 backdrop-blur-xl [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {trending.map((t) => (
          <button
            key={t.label}
            onClick={() => onPick?.(t.label)}
            className="shrink-0 rounded-xl bg-gradient-to-b from-white/10 to-white/5 px-4 py-2 text-sm text-white/90 ring-1 ring-white/10 transition hover:from-white/20 hover:text-white"
          >
            <span className="mr-2 text-lg">{t.emoji}</span>
            {t.label}
          </button>
        ))}
      </div>
    </div>
  );
}
