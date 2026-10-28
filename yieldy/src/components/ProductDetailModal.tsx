'use client';

import { useState, useMemo } from 'react';
import { Product, ramUpgrades, storageUpgrades, osOptions, warrantyOptions } from '@/data/products';
import { X, ShieldCheck, Truck, FileCheck, Package, CreditCard, ChevronDown, ChevronUp, Cpu, HardDrive, Check } from 'lucide-react';
import Image from 'next/image';

export interface ConfigState {
  ramUpgrade: number;
  storageUpgrade: number;
  os: number;
  warranty: number;
}

interface ProductDetailModalProps {
  product: Product;
  onClose: () => void;
  onAddToCart: (product: Product, config: ConfigState, totalPrice: number) => void;
  onBuyNow: (product: Product, config: ConfigState, totalPrice: number) => void;
}

function OptionPill({ 
  label, price, selected, onClick 
}: { 
  label: string; price: number; selected: boolean; onClick: () => void 
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`w-full text-left px-4 py-3 rounded-xl border-2 transition-all duration-200 flex items-center justify-between ${
        selected
          ? 'border-emerald-600 bg-emerald-50/70 shadow-sm'
          : 'border-gray-200 bg-white hover:border-gray-300'
      }`}
    >
      <div className="flex items-center gap-2.5">
        <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
          selected ? 'border-emerald-600 bg-emerald-600' : 'border-gray-300'
        }`}>
          {selected && <Check className="w-2.5 h-2.5 text-white stroke-[3]" />}
        </div>
        <span className={`text-sm font-medium ${selected ? 'text-emerald-900 font-semibold' : 'text-zinc-700'}`}>
          {label}
        </span>
      </div>
      <span className={`text-xs sm:text-sm font-semibold px-2 py-0.5 rounded-md ${
        price === 0 
          ? 'text-emerald-700 bg-emerald-100/60' 
          : selected ? 'text-emerald-800 bg-emerald-100' : 'text-zinc-600 bg-gray-100'
      }`}>
        {price === 0 ? 'Included' : `+₹${price.toLocaleString('en-IN')}`}
      </span>
    </button>
  );
}

function AccordionItem({ 
  title, 
  icon: Icon, 
  expanded, 
  onToggle, 
  children 
}: { 
  title: string; 
  icon: React.ComponentType<{ className?: string }>; 
  expanded: boolean; 
  onToggle: () => void; 
  children: React.ReactNode 
}) {
  return (
    <div className="border border-gray-200 rounded-xl overflow-hidden bg-white">
      <button
        type="button"
        onClick={onToggle}
        className="w-full flex items-center justify-between px-4 py-3 hover:bg-gray-50 transition-colors text-left"
      >
        <div className="flex items-center gap-2">
          <Icon className="w-4 h-4 text-emerald-600 flex-shrink-0" />
          <span className="text-sm font-semibold text-zinc-800">{title}</span>
        </div>
        {expanded ? (
          <ChevronUp className="w-4 h-4 text-zinc-400" />
        ) : (
          <ChevronDown className="w-4 h-4 text-zinc-400" />
        )}
      </button>
      {expanded && (
        <div className="px-4 pb-4 text-xs sm:text-sm text-zinc-600 border-t border-gray-100 pt-3 leading-relaxed">
          {children}
        </div>
      )}
    </div>
  );
}

export default function ProductDetailModal({ product, onClose, onAddToCart, onBuyNow }: ProductDetailModalProps) {
  const [config, setConfig] = useState<ConfigState>({
    ramUpgrade: 0,
    storageUpgrade: 0,
    os: 0,
    warranty: 0,
  });
  const [expandedAccordion, setExpandedAccordion] = useState<string | null>('diagnostic');

  const isWorkstation = product.tier === 'Pro Desktop';

  const availableRamUpgrades = useMemo(() => {
    return ramUpgrades.filter((u) => {
      if (u.workstationOnly && !isWorkstation) return false;
      if (u.minBase && product.ram >= (u.label.includes('16GB') ? 16 : 0)) return false;
      return true;
    });
  }, [product, isWorkstation]);

  const availableStorageUpgrades = useMemo(() => {
    return storageUpgrades.filter((u) => {
      if (u.minBase && product.storage >= 512) return false;
      return true;
    });
  }, [product]);

  const correctTotal = useMemo(() => {
    return (
      product.basePrice +
      (availableRamUpgrades[config.ramUpgrade]?.price ?? 0) +
      (availableStorageUpgrades[config.storageUpgrade]?.price ?? 0) +
      (osOptions[config.os]?.price ?? 0) +
      (warrantyOptions[config.warranty]?.price ?? 0)
    );
  }, [product, config, availableRamUpgrades, availableStorageUpgrades]);

  const emiMonthly = Math.round(correctTotal / 12);

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center bg-black/60 backdrop-blur-sm overflow-y-auto p-4 sm:p-6 lg:p-8">
      <div className="bg-white rounded-2xl max-w-5xl w-full shadow-2xl relative my-auto overflow-hidden border border-gray-100">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2.5 rounded-full bg-white/90 hover:bg-gray-100 border border-gray-200 text-zinc-600 transition-colors shadow-sm"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-0 max-h-[90vh] overflow-y-auto lg:overflow-visible">
          {/* Left: Product Info + Configurator */}
          <div className="lg:col-span-7 p-6 sm:p-8 lg:overflow-y-auto lg:max-h-[90vh]">
            <div className="flex flex-col sm:flex-row items-start gap-5 mb-8 pb-6 border-b border-gray-100">
              <div className="relative w-full sm:w-40 h-40 rounded-xl overflow-hidden border border-gray-200 flex-shrink-0 bg-zinc-50 p-2">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  sizes="(max-width: 640px) 100vw, 160px"
                  className="object-contain p-2"
                />
              </div>
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xs font-bold text-emerald-600 uppercase tracking-wider">{product.tier}</span>
                  <span className="text-xs text-zinc-300">·</span>
                  <span className="bg-emerald-100 text-emerald-800 text-xs font-semibold px-2 py-0.5 rounded-full">
                    {product.grade}
                  </span>
                </div>
                <h2 className="text-2xl font-bold text-zinc-900 leading-tight">{product.name}</h2>
                <p className="text-zinc-500 text-sm mt-0.5">{product.subtitle}</p>

                <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-zinc-600 mt-3 pt-3 border-t border-gray-100">
                  <span className="flex items-center gap-1"><Cpu className="w-3.5 h-3.5 text-emerald-600" /> {product.processor}</span>
                  <span className="flex items-center gap-1"><HardDrive className="w-3.5 h-3.5 text-emerald-600" /> Base {product.ram}GB / {product.storage}GB {product.storageType}</span>
                </div>
              </div>
            </div>

            {/* RAM Upgrade Selector */}
            <div className="mb-6">
              <div className="flex items-center justify-between mb-2.5">
                <h3 className="text-xs font-bold text-zinc-900 uppercase tracking-wider">
                  1. Memory (RAM) Customization
                </h3>
                <span className="text-xs text-zinc-400">Tested DDR4/DDR5</span>
              </div>
              <div className="space-y-2">
                {availableRamUpgrades.map((upgrade, idx) => (
                  <OptionPill
                    key={idx}
                    label={upgrade.label}
                    price={upgrade.price}
                    selected={config.ramUpgrade === idx}
                    onClick={() => setConfig({ ...config, ramUpgrade: idx })}
                  />
                ))}
              </div>
            </div>

            {/* Storage Upgrade Selector */}
            <div className="mb-6">
              <div className="flex items-center justify-between mb-2.5">
                <h3 className="text-xs font-bold text-zinc-900 uppercase tracking-wider">
                  2. High-Speed Storage (NVMe SSD)
                </h3>
                <span className="text-xs text-zinc-400">SMART Verified 100% Health</span>
              </div>
              <div className="space-y-2">
                {availableStorageUpgrades.map((upgrade, idx) => (
                  <OptionPill
                    key={idx}
                    label={upgrade.label}
                    price={upgrade.price}
                    selected={config.storageUpgrade === idx}
                    onClick={() => setConfig({ ...config, storageUpgrade: idx })}
                  />
                ))}
              </div>
            </div>

            {/* Operating System Options */}
            <div className="mb-6">
              <div className="flex items-center justify-between mb-2.5">
                <h3 className="text-xs font-bold text-zinc-900 uppercase tracking-wider">
                  3. Operating System Setup
                </h3>
                <span className="text-xs text-zinc-400">Clean Pre-Installed & Driver Verified</span>
              </div>
              <div className="space-y-2">
                {osOptions.map((opt, idx) => (
                  <OptionPill
                    key={idx}
                    label={opt.label}
                    price={opt.price}
                    selected={config.os === idx}
                    onClick={() => setConfig({ ...config, os: idx })}
                  />
                ))}
              </div>
            </div>

            {/* Warranty & Assurance */}
            <div className="mb-6">
              <div className="flex items-center justify-between mb-2.5">
                <h3 className="text-xs font-bold text-zinc-900 uppercase tracking-wider">
                  4. Warranty & Support Plan
                </h3>
                <span className="text-xs text-zinc-400">Pan-India Support</span>
              </div>
              <div className="space-y-2">
                {warrantyOptions.map((opt, idx) => (
                  <OptionPill
                    key={idx}
                    label={opt.label}
                    price={opt.price}
                    selected={config.warranty === idx}
                    onClick={() => setConfig({ ...config, warranty: idx })}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Right: Sticky Summary Card */}
          <div className="lg:col-span-5 bg-zinc-50 p-6 sm:p-8 border-t lg:border-t-0 lg:border-l border-gray-200 flex flex-col justify-between lg:overflow-y-auto lg:max-h-[90vh]">
            <div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-base font-bold text-zinc-900">Live Configuration Summary</h3>
                <span className="text-xs text-emerald-600 font-semibold bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                  Ready to Dispatch
                </span>
              </div>
              
              <div className="bg-white rounded-xl border border-gray-200 p-4 space-y-2.5 mb-6 text-xs sm:text-sm">
                <div className="flex justify-between">
                  <span className="text-zinc-500">Base Unit ({product.name})</span>
                  <span className="font-semibold text-zinc-800">₹{product.basePrice.toLocaleString('en-IN')}</span>
                </div>
                
                <div className="flex justify-between border-t border-gray-100 pt-2">
                  <span className="text-zinc-500">
                    RAM: <span className="text-zinc-700 font-medium">{availableRamUpgrades[config.ramUpgrade]?.label}</span>
                  </span>
                  <span className="font-semibold text-zinc-800">
                    {availableRamUpgrades[config.ramUpgrade]?.price === 0 ? '₹0' : `+₹${availableRamUpgrades[config.ramUpgrade]?.price.toLocaleString('en-IN')}`}
                  </span>
                </div>

                <div className="flex justify-between border-t border-gray-100 pt-2">
                  <span className="text-zinc-500">
                    SSD: <span className="text-zinc-700 font-medium">{availableStorageUpgrades[config.storageUpgrade]?.label}</span>
                  </span>
                  <span className="font-semibold text-zinc-800">
                    {availableStorageUpgrades[config.storageUpgrade]?.price === 0 ? '₹0' : `+₹${availableStorageUpgrades[config.storageUpgrade]?.price.toLocaleString('en-IN')}`}
                  </span>
                </div>

                <div className="flex justify-between border-t border-gray-100 pt-2">
                  <span className="text-zinc-500">
                    OS: <span className="text-zinc-700 font-medium">{osOptions[config.os]?.label}</span>
                  </span>
                  <span className="font-semibold text-zinc-800">
                    {osOptions[config.os]?.price === 0 ? '₹0' : `+₹${osOptions[config.os]?.price.toLocaleString('en-IN')}`}
                  </span>
                </div>

                <div className="flex justify-between border-t border-gray-100 pt-2">
                  <span className="text-zinc-500">
                    Plan: <span className="text-zinc-700 font-medium">{warrantyOptions[config.warranty]?.label}</span>
                  </span>
                  <span className="font-semibold text-zinc-800">
                    {warrantyOptions[config.warranty]?.price === 0 ? '₹0' : `+₹${warrantyOptions[config.warranty]?.price.toLocaleString('en-IN')}`}
                  </span>
                </div>
              </div>

              {/* Total Price Section */}
              <div className="border-t border-gray-200 pt-4 mb-4">
                <div className="flex justify-between items-baseline">
                  <div>
                    <span className="text-xs uppercase tracking-wider font-semibold text-zinc-400">Total Price</span>
                    <p className="text-xs text-zinc-500">Includes all taxes & warranty</p>
                  </div>
                  <div className="text-right">
                    <span className="text-3xl font-extrabold text-zinc-900">₹{correctTotal.toLocaleString('en-IN')}</span>
                  </div>
                </div>
                <div className="bg-emerald-50 text-emerald-800 rounded-lg px-3 py-1.5 mt-2.5 text-xs flex items-center justify-between font-medium">
                  <span>EMI breakdown hint:</span>
                  <span className="font-bold">Or pay ₹{emiMonthly.toLocaleString('en-IN')}/mo with 0% No-Cost EMI</span>
                </div>
              </div>

              {/* Included Free Perks Box */}
              <div className="bg-zinc-100/80 rounded-xl p-3.5 mb-5 border border-zinc-200">
                <p className="text-xs font-bold text-zinc-800 mb-2 uppercase tracking-wider">Included Free in Box:</p>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                  <div className="flex items-center gap-1.5 text-xs text-zinc-600">
                    <Package className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
                    <span>OEM Charger</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-xs text-zinc-600">
                    <FileCheck className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
                    <span>Blancco Report</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-xs text-zinc-600">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
                    <span>Cleaning Kit</span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-2.5 mb-6">
                <button
                  type="button"
                  onClick={() => onAddToCart(product, config, correctTotal)}
                  className="w-full bg-zinc-950 hover:bg-zinc-900 text-white font-semibold py-3.5 rounded-xl transition-all shadow-sm active:scale-98"
                >
                  Add Configured Unit to Cart
                </button>
                <button
                  type="button"
                  onClick={() => onBuyNow(product, config, correctTotal)}
                  className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-3.5 rounded-xl transition-all shadow-sm flex items-center justify-center gap-2 active:scale-98"
                >
                  <CreditCard className="w-4 h-4" />
                  Buy Now with 1-Click
                </button>
              </div>

              {/* Trust Accordion */}
              <div className="space-y-2">
                <AccordionItem
                  title="50-Point Diagnostic Checklist Preview"
                  icon={ShieldCheck}
                  expanded={expandedAccordion === 'diagnostic'}
                  onToggle={() => setExpandedAccordion(expandedAccordion === 'diagnostic' ? null : 'diagnostic')}
                >
                  <p className="mb-2">Every machine is verified across 50 rigorous hardware stress points:</p>
                  <ul className="list-disc list-inside space-y-1 text-xs text-zinc-600">
                    <li>Intel BurnIn / Prime95 CPU stress test under 100% thermals</li>
                    <li>MemTest86+ full RAM parity & timing verification</li>
                    <li>NVMe read/write speed & SMART zero-bad-sector audit</li>
                    <li>Display panel calibration: uniform backlighting & 0 dead pixels</li>
                    <li>Battery endurance verified to hold &gt;80% original design capacity</li>
                    <li>All Thunderbolt, USB-C, HDMI, audio & peripheral ports verified</li>
                  </ul>
                </AccordionItem>
                <AccordionItem
                  title="Shipping & Pan-India Delivery"
                  icon={Truck}
                  expanded={expandedAccordion === 'shipping'}
                  onToggle={() => setExpandedAccordion(expandedAccordion === 'shipping' ? null : 'shipping')}
                >
                  <p>Free tracked express delivery via BlueDart & Delhivery Air. Dispatches within 24 hours in multi-layer anti-static impact packaging.</p>
                </AccordionItem>
                <AccordionItem
                  title="Warranty & 7-Day Replacement Policy"
                  icon={Package}
                  expanded={expandedAccordion === 'returns'}
                  onToggle={() => setExpandedAccordion(expandedAccordion === 'returns' ? null : 'returns')}
                >
                  <p>Includes a 7-day hassle-free doorstep replacement guarantee and 1 full year of hardware warranty. Free return pickup arranged if required.</p>
                </AccordionItem>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
