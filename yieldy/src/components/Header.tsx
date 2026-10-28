'use client';

import { useState } from 'react';
import { ShoppingCart, Menu, X, Recycle, Sparkles } from 'lucide-react';

interface HeaderProps {
  cartCount: number;
  onNavigate: (section: string) => void;
  activeSection: string;
  onOpenCart: () => void;
}

export default function Header({ cartCount, onNavigate, activeSection, onOpenCart }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { key: 'browse', label: 'Browse Tech' },
    { key: 'sell', label: 'Sell Gear' },
    { key: 'why', label: 'Why Yieldy' },
  ];

  return (
    <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <button onClick={() => onNavigate('hero')} className="flex items-center gap-2.5 group">
            <div className="w-9 h-9 bg-slate-900 rounded-xl flex items-center justify-center group-hover:bg-emerald-600 transition-colors shadow-sm">
              <Recycle className="w-5 h-5 text-emerald-400 group-hover:text-white transition-colors" />
            </div>
            <div className="text-left">
              <span className="text-xl font-extrabold tracking-tight text-slate-900 flex items-center gap-1">
                Yieldy<span className="w-1.5 h-1.5 rounded-full bg-emerald-500 inline-block"></span>
              </span>
              <span className="block text-[10px] uppercase font-semibold tracking-wider text-slate-400 -mt-1">
                Circular ITAD
              </span>
            </div>
          </button>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <button
                key={item.key}
                onClick={() => onNavigate(item.key)}
                className={`text-sm font-semibold transition-colors ${
                  activeSection === item.key
                    ? 'text-emerald-600'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {item.label}
              </button>
            ))}
            <button
              onClick={() => onNavigate('sell')}
              className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 hover:bg-emerald-100 transition-colors"
            >
              <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
              Instant Valuation
            </button>
          </nav>

          {/* Cart + Mobile Toggle */}
          <div className="flex items-center gap-3">
            <button
              onClick={onOpenCart}
              className="relative p-2.5 rounded-xl border border-gray-200 hover:border-emerald-300 hover:bg-emerald-50/50 transition-all text-slate-700"
              aria-label="View Cart"
            >
              <ShoppingCart className="w-5 h-5 text-slate-700" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-emerald-600 text-white text-[11px] font-bold rounded-full flex items-center justify-center shadow-sm animate-pulse">
                  {cartCount}
                </span>
              )}
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-xl border border-gray-200 text-slate-700 hover:bg-gray-100 transition-colors"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden pb-4 border-t border-gray-100 pt-3 space-y-1">
            {navItems.map((item) => (
              <button
                key={item.key}
                onClick={() => { onNavigate(item.key); setMobileMenuOpen(false); }}
                className="block w-full text-left px-4 py-2.5 text-sm font-medium text-slate-700 hover:text-emerald-600 hover:bg-emerald-50 rounded-xl transition-colors"
              >
                {item.label}
              </button>
            ))}
            <button
              onClick={() => { onNavigate('sell'); setMobileMenuOpen(false); }}
              className="block w-full text-left px-4 py-2.5 text-sm font-semibold text-emerald-700 bg-emerald-50 rounded-xl transition-colors"
            >
              Sell Your Gear (Instant Valuation)
            </button>
          </div>
        )}
      </div>
    </header>
  );
}
