'use client';

import { Product } from '@/data/products';
import { ShieldCheck, Cpu, HardDrive, Monitor, CheckCircle2, Award, SlidersHorizontal } from 'lucide-react';
import Image from 'next/image';

interface ProductCardProps {
  product: Product;
  onSelect: (product: Product) => void;
}

export default function ProductCard({ product, onSelect }: ProductCardProps) {
  const savings = Math.round(((product.originalPrice - product.basePrice) / product.originalPrice) * 100);

  return (
    <div className="group bg-white rounded-2xl border border-gray-200 overflow-hidden hover:shadow-xl hover:border-emerald-300 transition-all duration-300 flex flex-col justify-between">
      <div>
        <div className="relative overflow-hidden bg-slate-50/80 border-b border-gray-100 h-56 w-full flex items-center justify-center">
          <Image
            src={product.image}
            alt={product.name}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-contain p-4 group-hover:scale-105 transition-transform duration-500"
            priority={product.id <= 3}
          />
          <div className="absolute top-3 left-3 flex flex-wrap gap-2 z-10">
            <span className="bg-emerald-600 text-white text-xs font-semibold px-2.5 py-1 rounded-full shadow-sm">
              {product.grade}
            </span>
            <span className="bg-slate-900/90 backdrop-blur-sm text-white text-xs font-semibold px-2.5 py-1 rounded-full shadow-sm">
              Save {savings}%
            </span>
          </div>
        </div>

        <div className="p-5 pb-0">
          <div className="mb-1 flex items-center justify-between">
            <span className="text-xs font-semibold text-emerald-600 uppercase tracking-wider">{product.tier}</span>
            <span className="text-xs font-medium text-slate-400">{product.brand}</span>
          </div>
          <h3 className="text-lg font-bold text-slate-900 group-hover:text-emerald-700 transition-colors">
            {product.name}
          </h3>
          <p className="text-sm text-slate-500 mb-3">{product.subtitle}</p>

          <div className="space-y-1.5 mb-4 bg-slate-50 rounded-xl p-3 border border-slate-100">
            <div className="flex items-center gap-2 text-xs font-medium text-slate-700">
              <Cpu className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
              <span className="truncate">{product.processor}</span>
            </div>
            <div className="flex items-center gap-2 text-xs font-medium text-slate-700">
              <HardDrive className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
              <span>{product.ram}GB RAM · {product.storage}GB {product.storageType}</span>
            </div>
            <div className="flex items-center gap-2 text-xs font-medium text-slate-700">
              <Monitor className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
              <span className="truncate">{product.display}</span>
            </div>
          </div>

          {/* Prominent Trust Badges */}
          <div className="space-y-1.5 mb-4 py-2 border-t border-b border-gray-100">
            <div className="flex items-center gap-2 text-xs text-slate-600">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
              <span className="font-medium">Blancco Certified 100% Data Wiped</span>
            </div>
            <div className="flex items-center gap-2 text-xs text-slate-600">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
              <span className="font-medium">50-Point Hardware Stress-Tested</span>
            </div>
            <div className="flex items-center gap-2 text-xs text-slate-600">
              <Award className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
              <span className="font-medium">1-Year Warranty Included</span>
            </div>
          </div>
        </div>
      </div>

      <div className="p-5 pt-0">
        <div className="pt-3 border-t border-gray-100">
          <div className="flex items-baseline justify-between mb-3">
            <div>
              <span className="text-[11px] uppercase tracking-wider text-slate-400 font-medium block">Special Price</span>
              <p className="text-2xl font-extrabold text-slate-900 tracking-tight">₹{product.basePrice.toLocaleString('en-IN')}</p>
            </div>
            <div className="text-right">
              <span className="text-xs text-slate-400 line-through block">MRP ₹{product.originalPrice.toLocaleString('en-IN')}</span>
              <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200/60">Save {savings}%</span>
            </div>
          </div>

          <button
            onClick={() => onSelect(product)}
            className="w-full bg-slate-900 hover:bg-emerald-600 text-white text-sm font-bold py-3.5 px-6 rounded-xl transition-all duration-200 shadow-sm hover:shadow-md flex items-center justify-center gap-2 active:scale-[0.98] cursor-pointer"
          >
            <span>Customize & Buy</span>
            <SlidersHorizontal className="w-4 h-4 text-emerald-400" />
          </button>
        </div>
      </div>
    </div>
  );
}
