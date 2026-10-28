'use client';

import { useState, useMemo, useRef } from 'react';
import { SlidersHorizontal, ArrowRight, ShieldCheck, CheckCircle2 } from 'lucide-react';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import FilterSidebar from '@/components/FilterSidebar';
import ProductCard from '@/components/ProductCard';
import ProductDetailModal, { ConfigState } from '@/components/ProductDetailModal';
import SellGearModal from '@/components/SellGearModal';
import CartDrawer, { CartItem } from '@/components/CartDrawer';
import WhyYieldy from '@/components/WhyYieldy';
import Footer from '@/components/Footer';
import { products, Product } from '@/data/products';

interface FilterState {
  deviceType: string[];
  processor: string[];
  ram: string[];
  maxPrice: number;
}

export default function Home() {
  const [activeSection, setActiveSection] = useState('hero');
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState<FilterState>({
    deviceType: [],
    processor: [],
    ram: [],
    maxPrice: 100000,
  });
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [showSellModal, setShowSellModal] = useState(false);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [filterSidebarOpen, setFilterSidebarOpen] = useState(false);

  const browseRef = useRef<HTMLDivElement>(null);
  const whyRef = useRef<HTMLDivElement>(null);

  const handleNavigate = (section: string) => {
    setActiveSection(section);
    if (section === 'browse') {
      browseRef.current?.scrollIntoView({ behavior: 'smooth' });
    } else if (section === 'why') {
      whyRef.current?.scrollIntoView({ behavior: 'smooth' });
    } else if (section === 'sell') {
      setShowSellModal(true);
    } else if (section === 'hero') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    if (query) {
      browseRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      // Search filter
      if (searchQuery) {
        const q = searchQuery.toLowerCase();
        const matchesSearch =
          p.name.toLowerCase().includes(q) ||
          p.brand.toLowerCase().includes(q) ||
          p.subtitle.toLowerCase().includes(q) ||
          p.processor.toLowerCase().includes(q) ||
          p.tier.toLowerCase().includes(q);
        
        // Handle chip filters
        const chipMappings: Record<string, boolean> = {
          'thinkpads': p.brand === 'Lenovo' && p.name.includes('ThinkPad'),
          'dell latitude': p.brand === 'Dell' && p.name.includes('Latitude'),
          'hp elitebook': p.brand === 'HP' && p.name.includes('EliteBook'),
          'macbooks': p.brand === 'Apple',
          'workstations': p.tier === 'Pro Desktop' || p.tier === 'Pro',
        };

        const chipMatch = chipMappings[q];
        if (!matchesSearch && chipMatch === undefined) return false;
        if (chipMatch === false) return false;
      }

      // Device type filter
      if (filters.deviceType.length > 0 && !filters.deviceType.includes(p.deviceType)) return false;

      // Processor filter
      if (filters.processor.length > 0 && !filters.processor.includes(p.processorType)) return false;

      // RAM filter
      if (filters.ram.length > 0) {
        const ramMatch = filters.ram.some((r) => {
          if (r === '32') return p.ram >= 32;
          return p.ram === parseInt(r);
        });
        if (!ramMatch) return false;
      }

      // Price filter
      if (p.basePrice > filters.maxPrice) return false;

      return true;
    });
  }, [searchQuery, filters]);

  const handleAddToCart = (product: Product, config: ConfigState, totalPrice: number) => {
    const newItem: CartItem = {
      id: `${product.id}-${Date.now()}`,
      product,
      config,
      totalPrice,
    };
    setCart((prev) => [...prev, newItem]);
    setSelectedProduct(null);
    setIsCartOpen(true);
  };

  const handleBuyNow = (product: Product, config: ConfigState, totalPrice: number) => {
    const newItem: CartItem = {
      id: `${product.id}-${Date.now()}`,
      product,
      config,
      totalPrice,
    };
    setCart((prev) => [...prev, newItem]);
    setSelectedProduct(null);
    setIsCartOpen(true);
  };

  const handleRemoveCartItem = (id: string) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  const handleClearCart = () => {
    setCart([]);
  };

  return (
    <div className="min-h-screen bg-neutral-50 flex flex-col justify-between selection:bg-emerald-100 selection:text-emerald-900">
      <Header
        cartCount={cart.length}
        onNavigate={handleNavigate}
        activeSection={activeSection}
        onOpenCart={() => setIsCartOpen(true)}
      />

      <main className="flex-1">
        {/* Hero Section */}
        <Hero onSearch={handleSearch} onNavigate={handleNavigate} />

        {/* Certified Quality Guarantee Banner */}
        <section className="bg-slate-900 border-t border-slate-800 py-4 text-xs text-slate-300">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
              <span className="font-semibold text-white">Yieldy Re-Certified™ Guarantee</span>
            </div>
            <div className="flex flex-wrap items-center gap-6">
              <span className="flex items-center gap-1.5"><ShieldCheck className="w-3.5 h-3.5 text-emerald-400" /> Blancco NIST 800-88 Wiped</span>
              <span className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> 50-Point Benchmark Certified</span>
              <span className="flex items-center gap-1.5"><ShieldCheck className="w-3.5 h-3.5 text-emerald-400" /> 1-Year Comprehensive Warranty</span>
            </div>
          </div>
        </section>

        {/* Browse / Catalog Section */}
        <section ref={browseRef} className="py-16 sm:py-20 bg-neutral-50" id="browse">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
              <div>
                <span className="text-xs font-bold text-emerald-600 uppercase tracking-wider">Enterprise Catalog</span>
                <h2 className="text-3xl font-extrabold text-slate-900 mt-1">Available Certified Systems</h2>
                <p className="text-slate-500 text-sm mt-1">
                  Showing {filteredProducts.length} verified devices with dynamic upgrade options.
                </p>
              </div>
              <button
                onClick={() => setFilterSidebarOpen(true)}
                className="lg:hidden flex items-center justify-center gap-2 px-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm font-semibold text-slate-700 shadow-sm hover:bg-gray-50 transition-colors"
              >
                <SlidersHorizontal className="w-4 h-4 text-emerald-600" />
                Filter Devices
              </button>
            </div>

            <div className="flex flex-col lg:flex-row gap-8 items-start">
              {/* Filter Sidebar */}
              <FilterSidebar
                filters={filters}
                onFilterChange={setFilters}
                isOpen={filterSidebarOpen}
                onClose={() => setFilterSidebarOpen(false)}
              />

              {/* Product Grid */}
              <div className="flex-1 w-full">
                {filteredProducts.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                    {filteredProducts.map((product) => (
                      <ProductCard
                        key={product.id}
                        product={product}
                        onSelect={setSelectedProduct}
                      />
                    ))}
                  </div>
                ) : (
                  <div className="bg-white rounded-2xl border border-gray-200 p-12 text-center max-w-md mx-auto shadow-sm">
                    <p className="text-slate-700 text-base font-semibold">No devices match your current filters.</p>
                    <p className="text-slate-400 text-xs mt-1">Try adjusting the price slider or device parameters.</p>
                    <button
                      onClick={() => {
                        setFilters({ deviceType: [], processor: [], ram: [], maxPrice: 100000 });
                        setSearchQuery('');
                      }}
                      className="mt-5 inline-block text-sm font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200 hover:bg-emerald-100 px-4 py-2 rounded-xl transition-colors"
                    >
                      Reset All Filters
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* Why Yieldy Section */}
        <div ref={whyRef}>
          <WhyYieldy />
        </div>

        {/* ITAD Trade-In CTA Banner */}
        <section className="py-20 bg-slate-900 text-white relative overflow-hidden">
          <div className="absolute inset-0 opacity-10" style={{
            backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)',
            backgroundSize: '32px 32px'
          }} />

          <div className="relative max-w-4xl mx-auto px-4 text-center">
            <span className="inline-block text-xs font-bold text-emerald-400 uppercase tracking-widest bg-emerald-950/70 border border-emerald-800/80 px-3 py-1 rounded-full mb-4">
              Enterprise ITAD & Trade-In
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-4 leading-tight">
              Liquidate or Trade In Your Corporate Hardware
            </h2>
            <p className="text-slate-300 text-base sm:text-lg mb-8 max-w-2xl mx-auto leading-relaxed">
              Sell individual devices with instant algorithmic valuation, or offload 10+ company workstations with automated CSV manifest pickup and certified data sanitization.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <button
                onClick={() => setShowSellModal(true)}
                className="bg-emerald-600 hover:bg-emerald-500 text-white font-semibold px-8 py-3.5 rounded-xl transition-all shadow-lg text-base flex items-center gap-2 active:scale-95"
              >
                Launch Instant Valuation Engine <ArrowRight className="w-4 h-4" />
              </button>
              <button
                onClick={() => handleNavigate('browse')}
                className="bg-white/10 hover:bg-white/15 text-white font-semibold px-6 py-3.5 rounded-xl border border-white/20 transition-all text-base"
              >
                Browse Refurbished Stock
              </button>
            </div>
          </div>
        </section>
      </main>

      <Footer />

      {/* Product Detail Modal with Interactive Upgrades */}
      {selectedProduct && (
        <ProductDetailModal
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
          onAddToCart={handleAddToCart}
          onBuyNow={handleBuyNow}
        />
      )}

      {/* Sell Gear / ITAD Valuation Modal */}
      {showSellModal && (
        <SellGearModal onClose={() => setShowSellModal(false)} />
      )}

      {/* Interactive Cart Slide-out Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cart}
        onRemoveItem={handleRemoveCartItem}
        onClearCart={handleClearCart}
      />
    </div>
  );
}
