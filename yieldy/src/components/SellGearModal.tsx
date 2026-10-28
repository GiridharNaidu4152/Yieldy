'use client';

import { useState, useMemo } from 'react';
import { X, Laptop, Monitor, Server, Keyboard, ChevronRight, IndianRupee, Building2, Upload, ArrowRight, Sparkles, Check } from 'lucide-react';

interface SellGearModalProps {
  onClose: () => void;
}

type DeviceType = 'laptop' | 'desktop' | 'server' | 'peripheral' | null;

interface FormState {
  deviceType: DeviceType;
  brand: string;
  series: string;
  specificModel: string;
  customModel: string;
  processorGen: string;
  ram: string;
  storageType: string;
  storageSize: string;
  powerStatus: string;
  screenCondition: string;
  keyboardPorts: string;
  batteryHealth: string;
}

const popularLaptopPills = [
  { label: 'ThinkPad T14', brand: 'Lenovo', series: 'ThinkPad T-Series', model: 'ThinkPad T14 Gen 2', cpu: 'Intel 11th Gen', ram: '16GB', ssd: '512GB' },
  { label: 'Dell Latitude 7420', brand: 'Dell', series: 'Latitude 7000 Series (Premium)', model: 'Latitude 7420 Ultrabook', cpu: 'Intel 11th Gen', ram: '16GB', ssd: '512GB' },
  { label: 'HP EliteBook 840', brand: 'HP', series: 'EliteBook 800 Series', model: 'EliteBook 840 G8', cpu: 'Intel 11th Gen', ram: '16GB', ssd: '512GB' },
  { label: 'MacBook Pro 14"', brand: 'Apple', series: 'MacBook Pro 14"', model: 'MacBook Pro 14" M1 Pro (2021)', cpu: 'Apple M1', ram: '16GB', ssd: '512GB' },
  { label: 'MacBook Air M1', brand: 'Apple', series: 'MacBook Air M1/M2/M3', model: 'MacBook Air 13.3" M1 (2020)', cpu: 'Apple M1', ram: '8GB', ssd: '256GB' },
  { label: 'ThinkPad X1 Carbon', brand: 'Lenovo', series: 'ThinkPad X1 Carbon/Yoga', model: 'ThinkPad X1 Carbon Gen 8/9', cpu: 'Intel 11th Gen', ram: '16GB', ssd: '512GB' },
  { label: 'Dell Latitude 5420', brand: 'Dell', series: 'Latitude 5000 Series (Mainstream)', model: 'Latitude 5420', cpu: 'Intel 11th Gen', ram: '8GB', ssd: '256GB' },
  { label: 'Dell XPS 13', brand: 'Dell', series: 'XPS 13 / XPS 15', model: 'XPS 13 9310 / 9305', cpu: 'Intel 11th Gen', ram: '16GB', ssd: '512GB' },
  { label: 'HP ProBook 440', brand: 'HP', series: 'ProBook 400 Series', model: 'ProBook 440 G8 / G9', cpu: 'Intel 11th Gen', ram: '8GB', ssd: '256GB' },
  { label: 'Surface Laptop', brand: 'Microsoft', series: 'Surface Laptop 3/4/5/6', model: 'Surface Laptop 4', cpu: 'Intel 11th Gen', ram: '16GB', ssd: '512GB' },
];

const brands: Record<string, string[]> = {
  laptop: ['Lenovo', 'Dell', 'HP', 'Apple', 'Asus', 'Acer', 'Microsoft', 'Samsung', 'MSI', 'LG', 'Other Brand'],
  desktop: ['Dell', 'HP', 'Lenovo', 'Apple', 'Asus', 'Acer', 'Custom Gaming/Workstation Tower', 'Other Brand'],
  server: ['Dell PowerEdge', 'HPE ProLiant', 'Lenovo ThinkSystem', 'Supermicro', 'Cisco UCS', 'Other Server'],
  peripheral: ['Dell', 'HP', 'LG', 'Samsung', 'BenQ', 'ViewSonic', 'Apple Studio Display', 'Other Brand'],
};

const seriesMap: Record<string, string[]> = {
  Lenovo: [
    'ThinkPad T-Series (T14/T480/T490)',
    'ThinkPad X1 Carbon/Yoga',
    'ThinkPad L-Series (L14/L15)',
    'ThinkPad E-Series (E14/E15)',
    'ThinkPad P-Series Mobile Workstation',
    'ThinkBook Series',
    'IdeaPad Slim / Pro',
    'Legion Gaming',
    'ThinkCentre Desktop (Tiny/SFF/Tower)',
    'Other Lenovo Model',
  ],
  Dell: [
    'Latitude 7000 Series (Premium 7420/7410)',
    'Latitude 5000 Series (Mainstream 5420/5410)',
    'Latitude 3000 Series (Entry)',
    'XPS 13 / XPS 15 Ultrabook',
    'Precision Mobile Workstation',
    'Inspiron Series',
    'Vostro Series',
    'OptiPlex Desktop (Micro/SFF/Tower)',
    'Alienware / G-Series Gaming',
    'Other Dell Model',
  ],
  HP: [
    'EliteBook 800 Series (840/830/850)',
    'EliteBook 1000 Series x360',
    'ProBook 400 Series (440/450)',
    'ZBook Mobile Workstation',
    'Spectre x360 Series',
    'Envy Series',
    'Pavilion Series',
    'ProDesk / EliteDesk Desktop',
    'Victus / OMEN Gaming',
    'Other HP Model',
  ],
  Apple: [
    'MacBook Pro 14"',
    'MacBook Pro 16"',
    'MacBook Pro 13" (M1/M2/Intel)',
    'MacBook Pro 15" (Intel)',
    'MacBook Air M1/M2/M3',
    'MacBook Air 13" (Intel Retina)',
    'iMac / Mac Mini / Mac Studio',
    'Other Mac Model',
  ],
  Asus: ['ZenBook Series', 'ExpertBook Series', 'ROG Gaming', 'TUF Gaming', 'VivoBook', 'Other Asus Model'],
  Acer: ['Swift Series', 'Aspire Series', 'TravelMate Business', 'Predator / Nitro Gaming', 'Other Acer Model'],
  Microsoft: ['Surface Laptop 3/4/5/6', 'Surface Pro 7/8/9/X', 'Surface Book 2/3', 'Surface Laptop Studio / Go', 'Other Surface Model'],
  Samsung: ['Galaxy Book Pro / 360', 'Galaxy Book 2/3/4', 'Notebook Series', 'Other Samsung Model'],
  MSI: ['Prestige / Modern Series', 'Creator Workstation', 'Stealth / Katana Gaming', 'Other MSI Model'],
  LG: ['LG Gram 14 / 16 / 17', 'UltraPC', 'Other LG Model'],
  'Other Brand': ['Enterprise Laptop', 'Gaming Laptop', 'Thin & Light Ultrabook', 'Desktop PC', 'Custom Model'],
};

const specificModelOptions: Record<string, string[]> = {
  'ThinkPad T-Series (T14/T480/T490)': ['ThinkPad T14 Gen 2', 'ThinkPad T14 Gen 1', 'ThinkPad T14 Gen 3', 'ThinkPad T14s Gen 2', 'ThinkPad T490 / T490s', 'ThinkPad T480 / T480s', 'ThinkPad T15'],
  'ThinkPad X1 Carbon/Yoga': ['ThinkPad X1 Carbon Gen 9', 'ThinkPad X1 Carbon Gen 8', 'ThinkPad X1 Carbon Gen 7', 'ThinkPad X1 Carbon Gen 10/11', 'ThinkPad X1 Yoga Gen 5/6', 'ThinkPad X1 Extreme'],
  'ThinkPad L-Series (L14/L15)': ['ThinkPad L14 Gen 2', 'ThinkPad L14 Gen 1', 'ThinkPad L15 Gen 2', 'ThinkPad L490 / L480'],
  'ThinkPad E-Series (E14/E15)': ['ThinkPad E14 Gen 2', 'ThinkPad E14 Gen 3/4', 'ThinkPad E15 Gen 2', 'ThinkPad E490 / E480'],
  'ThinkPad P-Series Mobile Workstation': ['ThinkPad P14s Gen 2', 'ThinkPad P15 Gen 1/2', 'ThinkPad P1 Gen 3/4', 'ThinkPad P53 / P52'],
  'Latitude 7000 Series (Premium 7420/7410)': ['Latitude 7420 Ultrabook', 'Latitude 7410 Ultrabook', 'Latitude 7400', 'Latitude 7490 / 7480', 'Latitude 7320 / 7310', 'Latitude 7430'],
  'Latitude 5000 Series (Mainstream 5420/5410)': ['Latitude 5420', 'Latitude 5410', 'Latitude 5400', 'Latitude 5490 / 5480', 'Latitude 5520', 'Latitude 5320'],
  'XPS 13 / XPS 15 Ultrabook': ['XPS 13 9310', 'XPS 13 9305', 'XPS 13 Plus 9320', 'XPS 13 9300 / 7390', 'XPS 15 9510', 'XPS 15 9500 / 7590'],
  'Precision Mobile Workstation': ['Precision 5550 / 5560', 'Precision 3551 / 3560', 'Precision 7550 / 7560', 'Precision 5540 / 5530'],
  'EliteBook 800 Series (840/830/850)': ['EliteBook 840 G8', 'EliteBook 840 G7', 'EliteBook 840 G6', 'EliteBook 840 G5', 'EliteBook 845 G7/G8 (AMD)', 'EliteBook 830 G7/G8', 'EliteBook 850 G7/G8'],
  'EliteBook 1000 Series x360': ['Elite Dragonfly G2', 'EliteBook x360 1040 G8', 'EliteBook x360 1040 G7', 'EliteBook x360 1030 G7/G8'],
  'ProBook 400 Series (440/450)': ['ProBook 440 G8', 'ProBook 440 G7', 'ProBook 440 G6', 'ProBook 450 G8', 'ProBook 450 G7', 'ProBook 430 G8'],
  'ZBook Mobile Workstation': ['ZBook Firefly 14 G8', 'ZBook Firefly 14 G7', 'ZBook Studio G7/G8', 'ZBook Power G8', 'ZBook 15 G6 / Fury'],
  'MacBook Pro 14"': ['MacBook Pro 14" M1 Pro (2021)', 'MacBook Pro 14" M1 Max (2021)', 'MacBook Pro 14" M2 Pro (2023)', 'MacBook Pro 14" M3 / M3 Pro (2023)'],
  'MacBook Pro 16"': ['MacBook Pro 16" M1 Pro (2021)', 'MacBook Pro 16" M1 Max (2021)', 'MacBook Pro 16" M2 Pro/Max', 'MacBook Pro 16" Intel i7/i9 (2019)'],
  'MacBook Pro 13" (M1/M2/Intel)': ['MacBook Pro 13" M1 (2020)', 'MacBook Pro 13" M2 (2022)', 'MacBook Pro 13" Intel 4-Port (2020)', 'MacBook Pro 13" Intel (2019/2018)'],
  'MacBook Air M1/M2/M3': ['MacBook Air 13.3" M1 (2020)', 'MacBook Air 13.6" M2 (2022)', 'MacBook Air 15.3" M2 (2023)', 'MacBook Air 13" M3 (2024)', 'MacBook Air 15" M3 (2024)'],
};

function DeviceCard({
  icon: Icon,
  label,
  selected,
  onSelect,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  selected: boolean;
  onSelect: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onSelect}
      className={`flex flex-col items-center gap-3 p-6 rounded-2xl border-2 transition-all duration-200 hover:shadow-md cursor-pointer ${
        selected
          ? 'border-emerald-600 bg-emerald-50'
          : 'border-gray-200 bg-white hover:border-gray-300'
      }`}
    >
      <Icon className={`w-10 h-10 ${selected ? 'text-emerald-600' : 'text-slate-400'}`} />
      <span className={`text-sm font-semibold ${selected ? 'text-emerald-700' : 'text-slate-600'}`}>
        {label}
      </span>
    </button>
  );
}

function SelectField({
  label,
  value,
  onChange,
  options,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  options: string[];
}) {
  return (
    <div>
      <label className="block text-sm font-medium text-slate-700 mb-1.5">{label}</label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm text-slate-700 bg-white focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none cursor-pointer"
      >
        <option value="">Select from list...</option>
        {options.map((opt) => (
          <option key={opt} value={opt}>{opt}</option>
        ))}
      </select>
    </div>
  );
}

function ConditionRadio({
  name,
  value,
  currentValue,
  label,
  onChange,
}: {
  name: string;
  value: string;
  currentValue: string;
  label: string;
  onChange: (v: string) => void;
}) {
  const isSelected = currentValue === value;
  return (
    <label className={`flex items-center gap-2.5 px-4 py-2.5 rounded-xl border-2 cursor-pointer transition-all select-none ${
      isSelected ? 'border-emerald-600 bg-emerald-50' : 'border-gray-200 hover:border-gray-300'
    }`}>
      <input
        type="radio"
        name={name}
        value={value}
        checked={isSelected}
        onChange={() => onChange(value)}
        className="sr-only"
      />
      <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
        isSelected ? 'border-emerald-600' : 'border-gray-300'
      }`}>
        {isSelected && <div className="w-2 h-2 rounded-full bg-emerald-600" />}
      </div>
      <span className={`text-sm ${isSelected ? 'text-emerald-700 font-medium' : 'text-slate-600'}`}>{label}</span>
    </label>
  );
}

export default function SellGearModal({ onClose }: SellGearModalProps) {
  const [step, setStep] = useState(1);
  const [isBulk, setIsBulk] = useState(false);
  const [form, setForm] = useState<FormState>({
    deviceType: null,
    brand: '',
    series: '',
    specificModel: '',
    customModel: '',
    processorGen: '',
    ram: '',
    storageType: '',
    storageSize: '',
    powerStatus: '',
    screenCondition: '',
    keyboardPorts: '',
    batteryHealth: '',
  });
  const [bulkForm, setBulkForm] = useState({
    companyName: '',
    email: '',
    city: '',
    pickupDate: '',
  });

  const availableSpecificModels = useMemo(() => {
    if (!form.series) return [];
    return specificModelOptions[form.series] || [];
  }, [form.series]);

  const handleSelectPopularPill = (item: typeof popularLaptopPills[0]) => {
    setForm((prev) => ({
      ...prev,
      deviceType: 'laptop',
      brand: item.brand,
      series: item.series,
      specificModel: item.model,
      customModel: '',
      processorGen: item.cpu,
      ram: item.ram,
      storageType: 'SSD',
      storageSize: item.ssd,
    }));
    setStep(3);
  };

  const estimatedValue = useMemo(() => {
    let base = 0;
    // Base pricing by RAM
    const ramVal = parseInt(form.ram) || 0;
    if (ramVal >= 32) base = 19000;
    else if (ramVal >= 16) base = 14500;
    else if (ramVal >= 8) base = 9500;
    else base = 4500;

    // Processor bonus
    if (form.processorGen.includes('13th') || form.processorGen.includes('M3')) base += 8500;
    else if (form.processorGen.includes('12th') || form.processorGen.includes('M2')) base += 6500;
    else if (form.processorGen.includes('11th') || form.processorGen.includes('M1')) base += 4500;
    else if (form.processorGen.includes('10th') || form.processorGen.includes('Ryzen 5000')) base += 2800;
    else base += 1200;

    // Storage bonus
    const storageVal = parseInt(form.storageSize) || 0;
    if (form.storageType === 'SSD') base += Math.min(storageVal * 3, 4000);
    else base += Math.min(storageVal, 1000);

    // Premium model additions
    const modelStr = `${form.series} ${form.specificModel} ${form.customModel}`.toLowerCase();
    if (modelStr.includes('x1 carbon') || modelStr.includes('pro 14') || modelStr.includes('zbook') || modelStr.includes('xps 15')) {
      base += 5000;
    }

    // Condition deductions
    if (form.powerStatus === 'intermittent') base *= 0.6;
    if (form.powerStatus === 'dead') base *= 0.2;
    if (form.screenCondition === 'cracked') base *= 0.4;
    if (form.screenCondition === 'minor') base *= 0.85;
    if (form.batteryHealth === 'service') base *= 0.85;
    if (form.batteryHealth === 'dead') base *= 0.7;
    if (form.keyboardPorts === 'faulty') base *= 0.8;

    // Brand premium
    if (form.brand === 'Apple') base *= 1.35;
    else if (['Lenovo', 'Dell', 'HP'].includes(form.brand)) base *= 1.1;

    const low = Math.round(base * 0.85 / 100) * 100;
    const high = Math.round(base * 1.15 / 100) * 100;
    return { low: Math.max(low, 500), high: Math.max(high, 1000) };
  }, [form]);

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center bg-black/50 backdrop-blur-sm overflow-y-auto p-4 pt-8 pb-8">
      <div className="bg-white rounded-2xl max-w-2xl w-full shadow-2xl relative my-auto border border-gray-100">
        <button onClick={onClose} className="absolute top-4 right-4 z-10 p-2 rounded-full bg-white/80 hover:bg-gray-100 transition-colors">
          <X className="w-5 h-5 text-slate-600" />
        </button>

        <div className="p-6 lg:p-8">
          <div className="flex items-center gap-2 mb-1">
            <h2 className="text-2xl font-bold text-slate-900">Sell Your Hardware / ITAD Trade-In</h2>
          </div>
          <p className="text-sm text-slate-500 mb-6">Select your exact laptop model or enter corporate asset inquiries</p>

          {/* Progress bar */}
          <div className="flex gap-2 mb-8">
            {[1, 2, 3, 4, 5].map((s) => (
              <div key={s} className={`h-1.5 flex-1 rounded-full transition-colors ${step >= s ? 'bg-emerald-600' : 'bg-gray-200'}`} />
            ))}
          </div>

          {/* Bulk toggle */}
          {step === 1 && (
            <div className="flex items-center justify-between bg-slate-50 rounded-xl p-4 mb-6 border border-slate-200/60">
              <div className="flex items-center gap-2">
                <Building2 className="w-5 h-5 text-slate-600" />
                <span className="text-sm font-medium text-slate-700">Have 10+ devices? Switch to B2B ITAD</span>
              </div>
              <button
                type="button"
                onClick={() => setIsBulk(!isBulk)}
                className={`relative w-12 h-6 rounded-full transition-colors ${isBulk ? 'bg-emerald-600' : 'bg-gray-300'}`}
              >
                <div className={`absolute top-0.5 w-5 h-5 rounded-full bg-white shadow transition-transform ${isBulk ? 'translate-x-6' : 'translate-x-0.5'}`} />
              </button>
            </div>
          )}

          {isBulk ? (
            /* Bulk / B2B Mode */
            <div className="space-y-4">
              <div className="border-2 border-dashed border-gray-300 rounded-2xl p-8 text-center hover:border-emerald-400 transition-colors cursor-pointer bg-slate-50/50">
                <Upload className="w-10 h-10 text-slate-400 mx-auto mb-3" />
                <p className="text-sm font-semibold text-slate-700">Drag & Drop CSV Asset List</p>
                <p className="text-xs text-slate-400 mt-1">Upload company hardware asset list or fleet manifest</p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">Company Name</label>
                  <input type="text" value={bulkForm.companyName} onChange={(e) => setBulkForm({ ...bulkForm, companyName: e.target.value })} className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-emerald-500" placeholder="Acme Technologies" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">IT Head Email</label>
                  <input type="email" value={bulkForm.email} onChange={(e) => setBulkForm({ ...bulkForm, email: e.target.value })} className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-emerald-500" placeholder="it.director@company.com" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">City</label>
                  <input type="text" value={bulkForm.city} onChange={(e) => setBulkForm({ ...bulkForm, city: e.target.value })} className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-emerald-500" placeholder="Bengaluru / Mumbai" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">Expected Pickup Date</label>
                  <input type="date" value={bulkForm.pickupDate} onChange={(e) => setBulkForm({ ...bulkForm, pickupDate: e.target.value })} className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-emerald-500" />
                </div>
              </div>
              <button
                type="button"
                onClick={() => alert('Corporate ITAD request received! A Yieldy enterprise disposition manager will contact you within 2 business hours.')}
                className="w-full bg-slate-900 hover:bg-emerald-600 text-white font-semibold py-3.5 rounded-xl transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-sm"
              >
                Submit Enterprise ITAD Inquiry <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <>
              {/* Step 1: Device Type */}
              {step === 1 && (
                <div className="space-y-6">
                  <div className="grid grid-cols-2 gap-4">
                    <DeviceCard
                      icon={Laptop}
                      label="Laptop"
                      selected={form.deviceType === 'laptop'}
                      onSelect={() => { setForm({ ...form, deviceType: 'laptop' }); setStep(2); }}
                    />
                    <DeviceCard
                      icon={Monitor}
                      label="Desktop / Mini PC"
                      selected={form.deviceType === 'desktop'}
                      onSelect={() => { setForm({ ...form, deviceType: 'desktop' }); setStep(2); }}
                    />
                    <DeviceCard
                      icon={Server}
                      label="Enterprise Server / Rack"
                      selected={form.deviceType === 'server'}
                      onSelect={() => { setForm({ ...form, deviceType: 'server' }); setStep(2); }}
                    />
                    <DeviceCard
                      icon={Keyboard}
                      label="Monitor / Peripheral"
                      selected={form.deviceType === 'peripheral'}
                      onSelect={() => { setForm({ ...form, deviceType: 'peripheral' }); setStep(2); }}
                    />
                  </div>

                  {/* 1-Tap Quick Select Pills for Top Enterprise Laptops */}
                  <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-4">
                    <div className="flex items-center gap-1.5 text-xs font-bold text-slate-800 uppercase tracking-wider mb-2.5">
                      <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
                      Quick-Select Popular Laptops
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {popularLaptopPills.map((item) => (
                        <button
                          key={item.label}
                          type="button"
                          onClick={() => handleSelectPopularPill(item)}
                          className="px-3 py-1.5 bg-white hover:bg-emerald-50 hover:border-emerald-300 border border-gray-200 text-xs font-medium text-slate-700 rounded-lg transition-colors cursor-pointer"
                        >
                          {item.label}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Step 2: Comprehensive Brand & Model Selection */}
              {step === 2 && (
                <div className="space-y-5">
                  {/* Brand Selector */}
                  <div>
                    <label className="block text-sm font-semibold text-slate-800 mb-2">1. Select Manufacturer / Brand</label>
                    <div className="grid grid-cols-3 sm:grid-cols-4 gap-2 mb-3">
                      {(form.deviceType ? brands[form.deviceType] || [] : []).map((b) => (
                        <button
                          key={b}
                          type="button"
                          onClick={() => setForm({ ...form, brand: b, series: '', specificModel: '', customModel: '' })}
                          className={`px-3 py-2 text-xs font-semibold rounded-xl border text-center transition-all cursor-pointer ${
                            form.brand === b
                              ? 'border-emerald-600 bg-emerald-50 text-emerald-800 font-bold shadow-xs'
                              : 'border-gray-200 bg-white text-slate-700 hover:border-gray-300 hover:bg-gray-50'
                          }`}
                        >
                          {b}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Series Selector */}
                  {form.brand && seriesMap[form.brand] && (
                    <div>
                      <SelectField
                        label={`2. ${form.brand} Series / Product Line`}
                        value={form.series}
                        onChange={(v) => setForm({ ...form, series: v, specificModel: '' })}
                        options={seriesMap[form.brand] || []}
                      />
                    </div>
                  )}

                  {/* Specific Model Selector (if available) */}
                  {form.series && availableSpecificModels.length > 0 && (
                    <div>
                      <SelectField
                        label={`3. Specific ${form.brand} Model Variant`}
                        value={form.specificModel}
                        onChange={(v) => setForm({ ...form, specificModel: v })}
                        options={availableSpecificModels}
                      />
                    </div>
                  )}

                  {/* Open Model / Custom Input (Always available so any user can type or clarify their exact laptop model) */}
                  {form.brand && (
                    <div className="bg-slate-50 border border-slate-200/80 rounded-xl p-3.5">
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Exact Model Number or Sub-variant (Optional or if not listed above)
                      </label>
                      <input
                        type="text"
                        value={form.customModel}
                        onChange={(e) => setForm({ ...form, customModel: e.target.value })}
                        placeholder="e.g. ThinkPad T14 Gen 2 (Type 20W0), Latitude 7420 Carbon, 14-inch M1 Pro 2021..."
                        className="w-full px-3.5 py-2 text-xs sm:text-sm bg-white border border-gray-200 rounded-lg outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                      />
                      <p className="text-[11px] text-slate-400 mt-1">You can specify any exact laptop model or sub-variant here.</p>
                    </div>
                  )}

                  <div className="flex gap-3 pt-2">
                    <button type="button" onClick={() => setStep(1)} className="flex-1 py-2.5 rounded-xl border border-gray-200 text-sm font-medium text-slate-600 hover:bg-gray-50 transition-colors cursor-pointer">
                      Back
                    </button>
                    <button
                      type="button"
                      onClick={() => setStep(3)}
                      disabled={!form.brand}
                      className="flex-1 py-2.5 rounded-xl bg-slate-900 text-white text-sm font-semibold hover:bg-emerald-600 transition-colors disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center gap-1 cursor-pointer"
                    >
                      Next: Hardware Specs <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}

              {/* Step 3: Specs */}
              {step === 3 && (
                <div className="space-y-4">
                  <div className="bg-emerald-50/70 border border-emerald-200 rounded-xl px-4 py-2.5 text-xs text-emerald-800 font-medium flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                    <span>Selected: <strong>{form.brand}</strong> {form.specificModel || form.customModel || form.series}</span>
                  </div>

                  <SelectField
                    label="Processor Generation"
                    value={form.processorGen}
                    onChange={(v) => setForm({ ...form, processorGen: v })}
                    options={['Intel 8th Gen', 'Intel 9th Gen', 'Intel 10th Gen', 'Intel 11th Gen', 'Intel 12th Gen', 'Intel 13th Gen', 'AMD Ryzen 3000', 'AMD Ryzen 5000', 'AMD Ryzen 7000', 'Apple M1', 'Apple M2', 'Apple M3']}
                  />
                  <SelectField
                    label="Current RAM"
                    value={form.ram}
                    onChange={(v) => setForm({ ...form, ram: v })}
                    options={['4GB', '8GB', '16GB', '32GB', '64GB+']}
                  />
                  <div className="grid grid-cols-2 gap-4">
                    <SelectField
                      label="Storage Type"
                      value={form.storageType}
                      onChange={(v) => setForm({ ...form, storageType: v })}
                      options={['SSD', 'HDD']}
                    />
                    <SelectField
                      label="Storage Size"
                      value={form.storageSize}
                      onChange={(v) => setForm({ ...form, storageSize: v })}
                      options={['128GB', '256GB', '512GB', '1TB', '2TB']}
                    />
                  </div>
                  <div className="flex gap-3 pt-2">
                    <button type="button" onClick={() => setStep(2)} className="flex-1 py-2.5 rounded-xl border border-gray-200 text-sm font-medium text-slate-600 hover:bg-gray-50 transition-colors cursor-pointer">Back</button>
                    <button type="button" onClick={() => setStep(4)} disabled={!form.processorGen || !form.ram} className="flex-1 py-2.5 rounded-xl bg-slate-900 text-white text-sm font-semibold hover:bg-emerald-600 transition-colors disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center gap-1 cursor-pointer">
                      Next: Condition Audit <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}

              {/* Step 4: Condition */}
              {step === 4 && (
                <div className="space-y-5">
                  <div>
                    <p className="text-sm font-medium text-slate-700 mb-2">Power Status</p>
                    <div className="space-y-2">
                      <ConditionRadio name="power" value="normal" currentValue={form.powerStatus} label="Powers on normally" onChange={(v) => setForm({ ...form, powerStatus: v })} />
                      <ConditionRadio name="power" value="intermittent" currentValue={form.powerStatus} label="Intermittent / Unstable" onChange={(v) => setForm({ ...form, powerStatus: v })} />
                      <ConditionRadio name="power" value="dead" currentValue={form.powerStatus} label="Dead / Won't turn on" onChange={(v) => setForm({ ...form, powerStatus: v })} />
                    </div>
                  </div>
                  {form.deviceType === 'laptop' && (
                    <>
                      <div>
                        <p className="text-sm font-medium text-slate-700 mb-2">Screen Condition</p>
                        <div className="space-y-2">
                          <ConditionRadio name="screen" value="flawless" currentValue={form.screenCondition} label="Flawless (No scratches/marks)" onChange={(v) => setForm({ ...form, screenCondition: v })} />
                          <ConditionRadio name="screen" value="minor" currentValue={form.screenCondition} label="Minor cosmetic scratches" onChange={(v) => setForm({ ...form, screenCondition: v })} />
                          <ConditionRadio name="screen" value="cracked" currentValue={form.screenCondition} label="Dead pixels or cracked glass" onChange={(v) => setForm({ ...form, screenCondition: v })} />
                        </div>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-slate-700 mb-2">Battery Health</p>
                        <div className="space-y-2">
                          <ConditionRadio name="battery" value="good" currentValue={form.batteryHealth} label="Normal (>80% design capacity)" onChange={(v) => setForm({ ...form, batteryHealth: v })} />
                          <ConditionRadio name="battery" value="service" currentValue={form.batteryHealth} label="Service Recommended" onChange={(v) => setForm({ ...form, batteryHealth: v })} />
                          <ConditionRadio name="battery" value="dead" currentValue={form.batteryHealth} label="Dead / Not holding charge" onChange={(v) => setForm({ ...form, batteryHealth: v })} />
                        </div>
                      </div>
                    </>
                  )}
                  <div>
                    <p className="text-sm font-medium text-slate-700 mb-2">Keyboard & Ports</p>
                    <div className="space-y-2">
                      <ConditionRadio name="keyboard" value="working" currentValue={form.keyboardPorts} label="All working perfectly" onChange={(v) => setForm({ ...form, keyboardPorts: v })} />
                      <ConditionRadio name="keyboard" value="faulty" currentValue={form.keyboardPorts} label="Few keys or ports faulty" onChange={(v) => setForm({ ...form, keyboardPorts: v })} />
                    </div>
                  </div>
                  <div className="flex gap-3 pt-2">
                    <button type="button" onClick={() => setStep(3)} className="flex-1 py-2.5 rounded-xl border border-gray-200 text-sm font-medium text-slate-600 hover:bg-gray-50 transition-colors cursor-pointer">Back</button>
                    <button type="button" onClick={() => setStep(5)} disabled={!form.powerStatus || !form.keyboardPorts} className="flex-1 py-2.5 rounded-xl bg-slate-900 text-white text-sm font-semibold hover:bg-emerald-600 transition-colors disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center gap-1 cursor-pointer">
                      Calculate Valuation <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}

              {/* Step 5: Instant Valuation Result */}
              {step === 5 && (
                <div className="text-center">
                  <div className="bg-gradient-to-br from-emerald-50 to-white rounded-2xl border border-emerald-200 p-8 mb-6 shadow-sm">
                    <span className="text-xs font-bold text-emerald-700 uppercase tracking-wider bg-emerald-100/60 px-3 py-1 rounded-full">
                      Algorithmic Market Valuation
                    </span>
                    <p className="text-sm font-medium text-slate-500 mt-3 mb-1">Estimated Direct Payout Range</p>
                    <div className="flex items-center justify-center gap-1 mb-1">
                      <IndianRupee className="w-8 h-8 text-emerald-600" />
                      <span className="text-4xl font-extrabold text-slate-900">{estimatedValue.low.toLocaleString('en-IN')}</span>
                      <span className="text-2xl text-slate-400 mx-2">–</span>
                      <span className="text-4xl font-extrabold text-slate-900">₹{estimatedValue.high.toLocaleString('en-IN')}</span>
                    </div>
                    <p className="text-xs text-slate-600 mt-2 font-medium">
                      {form.brand} {form.specificModel || form.customModel || form.series} · {form.processorGen} · {form.ram} RAM · {form.storageSize} {form.storageType}
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                    <button
                      type="button"
                      className="p-5 rounded-2xl border-2 border-gray-200 hover:border-emerald-600 transition-all text-left bg-white group cursor-pointer"
                    >
                      <IndianRupee className="w-6 h-6 text-slate-400 group-hover:text-emerald-600 mb-2 transition-colors" />
                      <p className="text-sm font-bold text-slate-800">Instant Direct Bank Transfer</p>
                      <p className="text-xs text-slate-400 mt-1">Direct NEFT / UPI transfer within 24 hours of doorstep pickup.</p>
                    </button>
                    <button
                      type="button"
                      className="p-5 rounded-2xl border-2 border-emerald-500 bg-emerald-50/60 hover:bg-emerald-50 transition-all text-left group cursor-pointer shadow-xs"
                    >
                      <div className="w-6 h-6 bg-emerald-600 text-white rounded-full flex items-center justify-center text-xs font-extrabold mb-2">+15%</div>
                      <p className="text-sm font-bold text-emerald-900">Yieldy Store Credit</p>
                      <p className="text-xs text-emerald-700 mt-1">Get ₹{Math.round(estimatedValue.high * 1.15).toLocaleString('en-IN')} towards your next certified refurbished machine.</p>
                    </button>
                  </div>

                  <button
                    type="button"
                    onClick={() => alert(`Pickup request scheduled for ${form.brand} ${form.specificModel || form.customModel || form.series}! An agent will arrive at your address with anti-static packaging and execute instant Blancco audit.`)}
                    className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-semibold py-4 rounded-xl transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-sm text-base"
                  >
                    Schedule Free Doorstep Pickup <ArrowRight className="w-4 h-4" />
                  </button>
                  <button type="button" onClick={() => setStep(1)} className="w-full mt-3 py-2 text-xs text-slate-400 hover:text-slate-600 transition-colors">
                    Reset & Value Another Device
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
