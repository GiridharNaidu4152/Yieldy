'use client';

import { SlidersHorizontal, X } from 'lucide-react';

export interface FilterState {
  deviceType: string[];
  processor: string[];
  ram: string[];
  maxPrice: number;
}

interface FilterSidebarProps {
  filters: FilterState;
  onFilterChange: (filters: FilterState) => void;
  isOpen: boolean;
  onClose: () => void;
}

function FilterCheckbox({
  checked,
  onChange,
  label,
}: {
  checked: boolean;
  onChange: () => void;
  label: string;
}) {
  return (
    <label className="flex items-center gap-2.5 cursor-pointer group select-none">
      <input
        type="checkbox"
        checked={checked}
        onChange={onChange}
        className="w-4 h-4 rounded border-gray-300 text-emerald-600 focus:ring-emerald-500 cursor-pointer"
      />
      <span className="text-sm text-slate-600 group-hover:text-slate-900 transition-colors">{label}</span>
    </label>
  );
}

export default function FilterSidebar({ filters, onFilterChange, isOpen, onClose }: FilterSidebarProps) {
  const toggleFilter = (category: keyof FilterState, value: string) => {
    const current = filters[category] as string[];
    const updated = current.includes(value)
      ? current.filter((v) => v !== value)
      : [...current, value];
    onFilterChange({ ...filters, [category]: updated });
  };

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-xs z-40 lg:hidden" onClick={onClose} />
      )}
      
      <aside className={`
        fixed lg:sticky top-0 left-0 h-full lg:h-auto lg:top-24
        w-72 bg-white border-r lg:border lg:rounded-2xl border-gray-200 p-6
        z-50 lg:z-auto transform transition-transform duration-300
        ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        overflow-y-auto shadow-sm
      `}>
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <SlidersHorizontal className="w-5 h-5 text-emerald-600" />
            <h2 className="text-lg font-bold text-slate-900">Filter Hardware</h2>
          </div>
          <button onClick={onClose} className="lg:hidden p-1 text-slate-500 hover:text-slate-700">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="space-y-6">
          <div>
            <h3 className="text-xs font-bold text-slate-900 mb-3 uppercase tracking-wider">Device Form Factor</h3>
            <div className="space-y-2.5">
              <FilterCheckbox
                checked={filters.deviceType.includes('Laptop')}
                onChange={() => toggleFilter('deviceType', 'Laptop')}
                label="Enterprise Laptops"
              />
              <FilterCheckbox
                checked={filters.deviceType.includes('Desktop')}
                onChange={() => toggleFilter('deviceType', 'Desktop')}
                label="Desktops & Workstations"
              />
            </div>
          </div>

          <div className="border-t border-gray-100 pt-5">
            <h3 className="text-xs font-bold text-slate-900 mb-3 uppercase tracking-wider">Processor Family</h3>
            <div className="space-y-2.5">
              <FilterCheckbox
                checked={filters.processor.includes('i5')}
                onChange={() => toggleFilter('processor', 'i5')}
                label="Intel Core i5"
              />
              <FilterCheckbox
                checked={filters.processor.includes('i7')}
                onChange={() => toggleFilter('processor', 'i7')}
                label="Intel Core i7"
              />
              <FilterCheckbox
                checked={filters.processor.includes('Xeon')}
                onChange={() => toggleFilter('processor', 'Xeon')}
                label="Intel Xeon Workstation"
              />
              <FilterCheckbox
                checked={filters.processor.includes('Apple Silicon')}
                onChange={() => toggleFilter('processor', 'Apple Silicon')}
                label="Apple Silicon (M1/Pro)"
              />
            </div>
          </div>

          <div className="border-t border-gray-100 pt-5">
            <h3 className="text-xs font-bold text-slate-900 mb-3 uppercase tracking-wider">System Memory</h3>
            <div className="space-y-2.5">
              <FilterCheckbox
                checked={filters.ram.includes('8')}
                onChange={() => toggleFilter('ram', '8')}
                label="8 GB RAM"
              />
              <FilterCheckbox
                checked={filters.ram.includes('16')}
                onChange={() => toggleFilter('ram', '16')}
                label="16 GB RAM"
              />
              <FilterCheckbox
                checked={filters.ram.includes('32')}
                onChange={() => toggleFilter('ram', '32')}
                label="32 GB+ Workstation"
              />
            </div>
          </div>

          <div className="border-t border-gray-100 pt-5">
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">Budget Ceiling</h3>
              <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-md">
                ₹{filters.maxPrice.toLocaleString('en-IN')}
              </span>
            </div>
            <input
              type="range"
              min={15000}
              max={100000}
              step={1000}
              value={filters.maxPrice}
              onChange={(e) => onFilterChange({ ...filters, maxPrice: parseInt(e.target.value) })}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-emerald-600"
            />
            <div className="flex justify-between mt-2">
              <span className="text-[11px] text-slate-400">₹15,000</span>
              <span className="text-[11px] text-slate-400">₹1,00,000</span>
            </div>
          </div>

          <button
            onClick={() => onFilterChange({
              deviceType: [],
              processor: [],
              ram: [],
              maxPrice: 100000,
            })}
            className="w-full text-xs font-semibold text-slate-600 hover:text-emerald-700 py-2.5 border border-gray-200 rounded-xl hover:bg-emerald-50 hover:border-emerald-200 transition-colors"
          >
            Reset All Filters
          </button>
        </div>
      </aside>
    </>
  );
}
