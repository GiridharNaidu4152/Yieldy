'use client';

import { Search, ArrowRight, Shield, Leaf, Award } from 'lucide-react';

interface HeroProps {
  onSearch: (query: string) => void;
  onNavigate: (section: string) => void;
}

export default function Hero({ onSearch, onNavigate }: HeroProps) {
  return (
    <section className="relative bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 overflow-hidden">
      {/* Subtle grid pattern overlay */}
      <div className="absolute inset-0 opacity-5" style={{
        backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)',
        backgroundSize: '40px 40px'
      }} />
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28">
        <div className="max-w-3xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-emerald-600/10 border border-emerald-500/20 rounded-full px-4 py-1.5 mb-6">
            <Leaf className="w-4 h-4 text-emerald-400" />
            <span className="text-sm text-emerald-400 font-medium">Zero E-Waste · Circular Electronics</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
            Enterprise Power.
            <br />
            <span className="text-emerald-400">Bootstrapper Budget.</span>
          </h1>
          
          <p className="text-base sm:text-lg text-slate-300 max-w-xl mx-auto mb-8">
            Certified refurbished ThinkPads, Latitudes & MacBooks — Blancco data-wiped, 
            50-point tested, and backed by a 1-year warranty. Save up to 70%.
          </p>

          {/* Quick CTA actions */}
          <div className="flex flex-wrap items-center justify-center gap-4 mb-8">
            <button
              onClick={() => onNavigate('browse')}
              className="bg-emerald-600 hover:bg-emerald-500 text-white font-semibold px-6 py-3 rounded-xl transition-all shadow-md flex items-center gap-2 text-sm cursor-pointer active:scale-95"
            >
              Browse Certified Tech <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={() => onNavigate('sell')}
              className="bg-white/10 hover:bg-white/15 text-white font-semibold px-6 py-3 rounded-xl border border-white/20 transition-all text-sm cursor-pointer"
            >
              Sell or Trade-In Gear
            </button>
          </div>

          {/* Search Bar */}
          <div className="relative max-w-lg mx-auto mb-6">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
            <input
              type="text"
              placeholder="Search ThinkPad T14, MacBook Pro, Dell Latitude..."
              onChange={(e) => onSearch(e.target.value)}
              className="w-full pl-12 pr-4 py-3.5 bg-white/10 border border-white/20 rounded-2xl text-white placeholder-slate-400 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-sm"
            />
          </div>

          {/* Quick Filter Chips */}
          <div className="flex flex-wrap justify-center gap-2.5 mb-12">
            {['All', 'ThinkPads', 'Dell Latitude', 'HP EliteBook', 'MacBooks', 'Workstations'].map((chip) => (
              <button
                key={chip}
                onClick={() => onSearch(chip === 'All' ? '' : chip)}
                className="px-3.5 py-1.5 text-xs font-medium text-white/80 hover:text-white bg-white/5 hover:bg-white/10 border border-white/10 rounded-full transition-all cursor-pointer"
              >
                {chip}
              </button>
            ))}
          </div>

          {/* Trust Badges Row */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 text-xs sm:text-sm text-slate-400">
            <div className="flex items-center gap-2">
              <Shield className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-400" />
              <span>Blancco Certified Data Wiped</span>
            </div>
            <div className="hidden sm:block w-1 h-1 bg-slate-600 rounded-full" />
            <div className="flex items-center gap-2">
              <Award className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-400" />
              <span>50-Point Stress Tested</span>
            </div>
            <div className="hidden sm:block w-1 h-1 bg-slate-600 rounded-full" />
            <div className="flex items-center gap-2">
              <Shield className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-400" />
              <span>1-Year Warranty Included</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
