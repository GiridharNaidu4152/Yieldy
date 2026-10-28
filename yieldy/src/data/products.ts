export interface Product {
  id: number;
  name: string;
  subtitle: string;
  brand: string;
  processor: string;
  processorType: string;
  ram: number;
  storage: number;
  storageType: string;
  display: string;
  extras: string;
  basePrice: number;
  originalPrice: number;
  image: string;
  tier: 'Starting' | 'Mid' | 'Pro' | 'Pro Desktop';
  grade: string;
  deviceType: 'Laptop' | 'Desktop';
}

export const products: Product[] = [
  {
    id: 1,
    name: 'Lenovo ThinkPad T14 Gen 2',
    subtitle: 'Enterprise Standard',
    brand: 'Lenovo',
    processor: 'Core i5-1135G7',
    processorType: 'i5',
    ram: 8,
    storage: 256,
    storageType: 'NVMe SSD',
    display: '14" FHD IPS Anti-Glare',
    extras: '',
    basePrice: 24999,
    originalPrice: 78000,
    image: 'https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?auto=format&fit=crop&w=800&q=80',
    tier: 'Starting',
    grade: 'Grade A+ Pristine',
    deviceType: 'Laptop',
  },
  {
    id: 2,
    name: 'Dell Latitude 7420 Ultrabook',
    subtitle: 'Business Premium',
    brand: 'Dell',
    processor: 'Core i7-1185G7',
    processorType: 'i7',
    ram: 16,
    storage: 512,
    storageType: 'NVMe SSD',
    display: '14" FHD',
    extras: 'Carbon Fiber',
    basePrice: 32499,
    originalPrice: 95000,
    image: 'https://images.unsplash.com/photo-1593642632823-8f785ba67e45?auto=format&fit=crop&w=800&q=80',
    tier: 'Mid',
    grade: 'Grade A+ Pristine',
    deviceType: 'Laptop',
  },
  {
    id: 3,
    name: 'HP EliteBook 840 G8',
    subtitle: 'Executive Thin & Light',
    brand: 'HP',
    processor: 'Core i7-1165G7',
    processorType: 'i7',
    ram: 16,
    storage: 512,
    storageType: 'NVMe SSD',
    display: '14" FHD IPS',
    extras: 'Bang & Olufsen Audio',
    basePrice: 34999,
    originalPrice: 89000,
    image: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=800&q=80',
    tier: 'Mid',
    grade: 'Grade A+ Pristine',
    deviceType: 'Laptop',
  },
  {
    id: 4,
    name: 'Apple MacBook Pro 14',
    subtitle: 'M1 Pro - Developer Edition',
    brand: 'Apple',
    processor: 'Apple M1 Pro 8-Core',
    processorType: 'Apple Silicon',
    ram: 16,
    storage: 512,
    storageType: 'SSD',
    display: 'Liquid Retina XDR',
    extras: '',
    basePrice: 74999,
    originalPrice: 169900,
    image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=800&q=80',
    tier: 'Pro',
    grade: 'Grade A+ Pristine',
    deviceType: 'Laptop',
  },
  {
    id: 5,
    name: 'Dell Precision 3640 Tower',
    subtitle: 'Engineering & AI Workstation',
    brand: 'Dell',
    processor: 'Intel Xeon W-1250',
    processorType: 'Xeon',
    ram: 32,
    storage: 512,
    storageType: 'SSD + 2TB HDD',
    display: 'N/A (Tower)',
    extras: 'NVIDIA Quadro P2200',
    basePrice: 46000,
    originalPrice: 120000,
    image: 'https://images.unsplash.com/photo-1587202372775-e229f172b9d7?auto=format&fit=crop&w=800&q=80',
    tier: 'Pro Desktop',
    grade: 'Grade A Excellent',
    deviceType: 'Desktop',
  },
];

export const ramUpgrades = [
  { label: 'Keep Current Base', price: 0 },
  { label: 'Upgrade to 16GB DDR4', price: 1800, minBase: 8 },
  { label: 'Upgrade to 32GB DDR4', price: 4200 },
  { label: 'Upgrade to 64GB DDR4', price: 8500, workstationOnly: true },
];

export const storageUpgrades = [
  { label: 'Keep Current Base NVMe', price: 0 },
  { label: 'Upgrade to 512GB NVMe SSD', price: 2100, minBase: 256 },
  { label: 'Upgrade to 1TB Ultra NVMe SSD', price: 4200 },
  { label: 'Upgrade to 2TB Enterprise NVMe SSD', price: 8000 },
];

export const osOptions = [
  { label: 'Windows 11 Pro (OEM Activated)', price: 0 },
  { label: 'Ubuntu Linux LTS 22.04', price: 0 },
  { label: 'Dual-Boot Windows + Linux', price: 999 },
];

export const warrantyOptions = [
  { label: 'Yieldy Standard: 1-Year + 7-Day Replacement', price: 0 },
  { label: 'Yieldy Care+: 2-Year Extended + Accidental Damage', price: 2499 },
];
