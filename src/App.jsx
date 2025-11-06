import { useCallback, useMemo, useState } from "react";
import NavBar from "./components/NavBar";
import TitleHero from "./components/TitleHero";
import SearchBar from "./components/SearchBar";
import TrendingCarousel from "./components/TrendingCarousel";
import PriceCards from "./components/PriceCards";

function App() {
  const [active, setActive] = useState("home");
  const [expandedId, setExpandedId] = useState(null);
  const [items, setItems] = useState([]);

  // This function will call backend later. For now, keep UI wired.
  const runSearch = useCallback(async (query) => {
    setExpandedId(null);
    // Placeholder: local demo mapping to avoid empty UI while backend gets implemented.
    // The structure matches expected real API data shape.
    const sample = [
      {
        id: "amul-taza-1l",
        name: "Amul Taaza Toned Milk 1L",
        image:
          "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1f/Amul_Taaza_Pack.jpg/320px-Amul_Taaza_Pack.jpg",
        prices: [
          { store: "Zepto", logo: "https://seeklogo.com/images/Z/zepto-logo-21C3E0EBA8-seeklogo.com.png", price: 64, fee: 15, gst: 3.4, total: 82.4 },
          { store: "Blinkit", logo: "https://seeklogo.com/images/B/blinkit-logo-9C19F5E82B-seeklogo.com.png", price: 64, fee: 18, gst: 3.8, total: 85.8 },
          { store: "Swiggy Instamart", logo: "https://upload.wikimedia.org/wikipedia/commons/1/15/Swiggy_logo.svg", price: 64, fee: 12, gst: 3.2, total: 79.2 },
          { store: "BigBasket", logo: "https://upload.wikimedia.org/wikipedia/commons/9/99/Bigbasket_logo.png", price: 63, fee: 10, gst: 3.1, total: 76.1 },
          { store: "Flipkart", logo: "https://upload.wikimedia.org/wikipedia/commons/1/1b/Flipkart_logo.png", price: 64, fee: 16, gst: 3.6, total: 83.6 },
          { store: "Amazon Fresh", logo: "https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg", price: 64, fee: 20, gst: 4.0, total: 88.0 },
        ],
      },
    ];

    // Demo filter by query to keep it relevant visually
    const filtered = sample.filter((p) => p.name.toLowerCase().includes(query.toLowerCase()));
    setItems(filtered);
  }, []);

  const onPick = (label) => runSearch(label);

  const page = useMemo(() => {
    if (active === "explore") return <div className="mx-auto max-w-6xl px-4 text-white/80">Coming soon: curated categories, top deals, and seasonal highlights.</div>;
    if (active === "chat") return <div className="mx-auto max-w-6xl px-4 text-white/80">Chatbot coming soon: ask things like "show snacks under ₹200".</div>;
    if (active === "profile") return <div className="mx-auto max-w-6xl px-4 text-white/80">Profile coming soon: Google login, favorites, and preferences.</div>;

    return (
      <div className="mx-auto w-full max-w-6xl px-4">
        <SearchBar onSearch={runSearch} />
        <div className="mt-4" />
        <TrendingCarousel onPick={onPick} />
        <PriceCards items={items} expandedId={expandedId} setExpandedId={setExpandedId} />
      </div>
    );
  }, [active, expandedId, items, runSearch]);

  return (
    <div className="min-h-screen w-full bg-[#0B0F12] text-white">
      {/* subtle grid */}
      <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(255,255,255,0.06)_1px,transparent_1px)] [background-size:24px_24px]" />

      <NavBar onNav={setActive} active={active} />
      <TitleHero />
      <main className="relative z-10 pb-20">{page}</main>
    </div>
  );
}

export default App;
