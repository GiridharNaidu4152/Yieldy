'use client';

import { useState, useMemo } from 'react';
import { X, Laptop, Monitor, Server, Keyboard, ChevronRight, IndianRupee, Building2, Upload, ArrowRight } from 'lucide-react';

interface SellGearModalProps {
  onClose: () => void;
}

type DeviceType = 'laptop' | 'desktop' | 'server' | 'peripheral' | null;

interface FormState {
  deviceType: DeviceType;
  brand: string;
  series: string;
  processorGen: string;
  ram: string;
  storageType: string;
  storageSize: string;
  powerStatus: string;
  screenCondition: string;
  keyboardPorts: string;
  batteryHealth: string;
}

const brands: Record<string, string[]> = {
  laptop: ['Lenovo', 'Dell', 'HP', 'Apple', 'Asus', 'Acer'],
  desktop: ['Dell', 'HP', 'Lenovo', 'Custom Tower'],
  server: ['Dell', 'HP Enterprise', 'Lenovo', 'Supermicro'],
  peripheral: ['Dell', 'HP', 'LG', 'Samsung', 'BenQ'],
};

const seriesMap: Record<string, string[]> = {
  Lenovo: ['ThinkPad', 'IdeaPad', 'Legion', 'ThinkCentre'],
  Dell: ['Latitude', 'XPS', 'Precision', 'OptiPlex', 'Inspiron'],
  HP: ['EliteBook', 'ProBook', 'ProDesk', 'Pavilion'],
  Apple: ['MacBook Air', 'MacBook Pro', 'iMac', 'Mac Mini'],
  Asus: ['ZenBook', 'VivoBook', 'ROG', 'ExpertBook'],
  Acer: ['Aspire', 'Swift', 'Nitro', 'TravelMate'],
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
        <option value="">Select...</option>
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

  const estimatedValue = useMemo(() => {
    let base = 0;
    // Simple valuation algorithm
    const ramVal = parseInt(form.ram) || 0;
    if (ramVal >= 32) base = 18000;
    else if (ramVal >= 16) base = 14000;
    else if (ramVal >= 8) base = 9000;
    else base = 4000;

    // Processor bonus
    if (form.processorGen.includes('13th') || form.processorGen.includes('M3')) base += 8000;
    else if (form.processorGen.includes('12th') || form.processorGen.includes('M2')) base += 6000;
    else if (form.processorGen.includes('11th') || form.processorGen.includes('M1')) base += 4000;
    else if (form.processorGen.includes('10th') || form.processorGen.includes('Ryzen 5000')) base += 2500;
    else base += 1000;

    // Storage bonus
    const storageVal = parseInt(form.storageSize) || 0;
    if (form.storageType === 'SSD') base += Math.min(storageVal * 3, 4000);
    else base += Math.min(storageVal, 1000);

    // Condition deductions
    if (form.powerStatus === 'intermittent') base *= 0.6;
    if (form.powerStatus === 'dead') base *= 0.2;
    if (form.screenCondition === 'cracked') base *= 0.4;
    if (form.screenCondition === 'minor') base *= 0.85;
    if (form.batteryHealth === 'service') base *= 0.85;
    if (form.batteryHealth === 'dead') base *= 0.7;
    if (form.keyboardPorts === 'faulty') base *= 0.8;

    // Brand premium
    if (form.brand === 'Apple') base *= 1.4;
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
          <h2 className="text-2xl font-bold text-slate-900 mb-1">Sell Your Hardware / Enterprise ITAD</h2>
          <p className="text-sm text-slate-500 mb-6">Get an instant valuation or offload corporate IT assets securely</p>

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
              )}

              {/* Step 2: Brand & Series */}
              {step === 2 && (
                <div className="space-y-4">
                  <SelectField
                    label="Brand"
                    value={form.brand}
                    onChange={(v) => setForm({ ...form, brand: v, series: '' })}
                    options={form.deviceType ? brands[form.deviceType] || [] : []}
                  />
                  {form.brand && seriesMap[form.brand] && (
                    <SelectField
                      label="Series / Model Line"
                      value={form.series}
                      onChange={(v) => setForm({ ...form, series: v })}
                      options={seriesMap[form.brand] || []}
                    />
                  )}
                  <div className="flex gap-3 pt-2">
                    <button type="button" onClick={() => setStep(1)} className="flex-1 py-2.5 rounded-xl border border-gray-200 text-sm font-medium text-slate-600 hover:bg-gray-50 transition-colors">Back</button>
                    <button type="button" onClick={() => setStep(3)} disabled={!form.brand} className="flex-1 py-2.5 rounded-xl bg-slate-900 text-white text-sm font-semibold hover:bg-emerald-600 transition-colors disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center gap-1 cursor-pointer">
                      Next <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}

              {/* Step 3: Specs */}
              {step === 3 && (
                <div className="space-y-4">
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
                    <button type="button" onClick={() => setStep(2)} className="flex-1 py-2.5 rounded-xl border border-gray-200 text-sm font-medium text-slate-600 hover:bg-gray-50 transition-colors">Back</button>
                    <button type="button" onClick={() => setStep(4)} disabled={!form.processorGen || !form.ram} className="flex-1 py-2.5 rounded-xl bg-slate-900 text-white text-sm font-semibold hover:bg-emerald-600 transition-colors disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center gap-1 cursor-pointer">
                      Next <ChevronRight className="w-4 h-4" />
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
                    <button type="button" onClick={() => setStep(3)} className="flex-1 py-2.5 rounded-xl border border-gray-200 text-sm font-medium text-slate-600 hover:bg-gray-50 transition-colors">Back</button>
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
                    <p className="text-xs text-slate-500 mt-2 font-medium">
                      {form.brand} {form.series} · {form.processorGen} · {form.ram} RAM · {form.storageSize} {form.storageType}
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
                    onClick={() => alert(`Pickup request scheduled! An agent will arrive at your address with anti-static packaging and execute instant Blancco audit.`)}
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
