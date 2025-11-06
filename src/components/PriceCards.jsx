import { useMemo } from "react";
import { ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const stores = [
  { key: "zepto", name: "Zepto", logo: "https://seeklogo.com/images/Z/zepto-logo-21C3E0EBA8-seeklogo.com.png" },
  { key: "blinkit", name: "Blinkit", logo: "https://seeklogo.com/images/B/blinkit-logo-9C19F5E82B-seeklogo.com.png" },
  { key: "instamart", name: "Swiggy Instamart", logo: "https://upload.wikimedia.org/wikipedia/commons/1/15/Swiggy_logo.svg" },
  { key: "bigbasket", name: "BigBasket", logo: "https://upload.wikimedia.org/wikipedia/commons/9/99/Bigbasket_logo.png" },
  { key: "flipkart", name: "Flipkart", logo: "https://upload.wikimedia.org/wikipedia/commons/1/1b/Flipkart_logo.png" },
  { key: "amazon", name: "Amazon Fresh", logo: "https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg" },
];

function Card({ product, onExpand, expanded }) {
  const best = useMemo(() => {
    if (!product.prices || product.prices.length === 0) return null;
    return product.prices.slice().sort((a, b) => a.total - b.total)[0];
  }, [product]);

  return (
    <motion.div layout className="group rounded-2xl border border-white/10 bg-white/5 p-3 backdrop-blur-xl transition hover:bg-white/10">
      <div className="flex items-center gap-3">
        <img
          src={product.image}
          alt={product.name}
          className="h-16 w-16 rounded-xl object-contain bg-white/80"
          loading="lazy"
        />
        <div className="min-w-0 flex-1">
          <h3 className="truncate font-semibold text-white">{product.name}</h3>
          {best && (
            <div className="mt-1 flex items-center gap-2 text-sm">
              <img src={best.logo} alt="store" className="h-4" />
              <span className="text-emerald-300 font-semibold">₹{best.total.toFixed(2)}</span>
              <span className="text-white/50">best price</span>
            </div>
          )}
        </div>
        <button
          onClick={() => onExpand(product.id)}
          className="rounded-xl bg-white/10 p-2 text-white/80 transition hover:bg-white/20"
          aria-label="Expand"
        >
          <ChevronDown className={`h-5 w-5 transition ${expanded ? "rotate-180" : "rotate-0"}`} />
        </button>
      </div>

      <AnimatePresence initial={false}>
        {expanded && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="mt-3 space-y-2"
          >
            {product.prices
              .slice()
              .sort((a, b) => a.total - b.total)
              .map((p) => (
                <div key={p.store} className="flex items-center justify-between rounded-xl bg-white/5 p-2">
                  <div className="flex items-center gap-2">
                    <img src={p.logo} alt={p.store} className="h-4" />
                    <span className="text-sm text-white/80">{p.store}</span>
                  </div>
                  <div className="text-sm text-white">
                    ₹{p.total.toFixed(2)}
                    <span className="ml-2 text-xs text-white/60">(base ₹{p.price.toFixed(2)} + fees ₹{p.fee.toFixed(0)} + GST ₹{p.gst.toFixed(0)})</span>
                  </div>
                </div>
              ))}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function PriceCards({ items, expandedId, setExpandedId }) {
  const onExpand = (id) => setExpandedId(expandedId === id ? null : id);

  if (!items || items.length === 0) {
    return (
      <div className="mt-8 text-center text-white/60">Search to see real prices across apps.</div>
    );
  }

  return (
    <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {items.map((p) => (
        <Card key={p.id} product={p} onExpand={onExpand} expanded={expandedId === p.id} />
      ))}
    </div>
  );
}
