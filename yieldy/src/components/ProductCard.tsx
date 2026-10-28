'use client';

import { Product } from '@/data/products';
import { ShieldCheck, Cpu, HardDrive, Monitor, CheckCircle2, Award } from 'lucide-react';
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
        <div className="relative overflow-hidden bg-slate-100 h-52 w-full">
          <Image
            src={product.image}
            alt={product.name}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover group-hover:scale-105 transition-transform duration-500"
            priority={product.id <= 2}
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
        <div className="flex items-end justify-between pt-3 border-t border-gray-100">
          <div>
            <p className="text-xs text-slate-400 line-through">MRP ₹{product.originalPrice.toLocaleString('en-IN')}</p>
            <p className="text-2xl font-bold text-slate-900">₹{product.basePrice.toLocaleString('en-IN')}</p>
          </div>
          <button
            onClick={() => onSelect(product)}
            className="bg-slate-900 hover:bg-emerald-600 text-white text-xs sm:text-sm font-semibold px-4 sm:px-5 py-2.5 rounded-xl transition-all duration-200 shadow-sm active:scale-95 cursor-pointer"
          >
            Customize & Buy
          </button>
        </div>
      </div>
    </div>
  );
}
