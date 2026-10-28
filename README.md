# Yieldy — Circular Electronics & Certified Refurbished Hardware Platform

Yieldy ([yieldy.in](https://yieldy.in)) is an enterprise IT asset disposition (ITAD) and certified refurbished hardware e-commerce web application built strictly according to the **Yieldy AI Web Development Master Prompts & Execution Guide**.

---

## 🛠 Tech Stack

* **Framework:** Next.js 16 (App Router, Turbopack, React 19, TypeScript)
* **Styling:** Tailwind CSS v4 with Minimalist Nordic/Monochrome aesthetic
  - Slate Dark: `#0f172a` (Slate-900)
  - Trust / Circular Economy Emerald: `#059669` (Emerald-600) & `#ecfdf5` (Emerald-50)
  - Background: Neutral-50 (`#f8fafc`) and Pure White (`#ffffff`)
  - Crisp Borders: Gray-200 (`#e5e7eb`)
* **Icons:** `lucide-react`
* **Images:** Next.js `<Image />` with Unsplash hardware CDN URLs

---

## 🌟 Implemented Features

### 1. Catalog & Real Hardware Specifications
* **5 Baseline Hardware Configurations:**
  1. **Lenovo ThinkPad T14 Gen 2** (Starting Tier: ₹24,999 | Core i5-1135G7, 8GB RAM, 256GB SSD, 14" FHD Anti-Glare)
  2. **Dell Latitude 7420 Ultrabook** (Mid Tier: ₹32,499 | Core i7-1185G7, 16GB RAM, 512GB SSD, Carbon Fiber, 14" FHD)
  3. **HP EliteBook 840 G8** (Mid Tier: ₹34,999 | Core i7-1165G7, 16GB RAM, 512GB SSD, Bang & Olufsen Audio)
  4. **Apple MacBook Pro 14"** (Pro Tier: ₹74,999 | M1 Pro 8-Core, 16GB Unified RAM, 512GB SSD, Liquid Retina XDR)
  5. **Dell Precision 3640 Tower** (Pro Desktop: ₹46,000 | Intel Xeon W-1250, 32GB ECC RAM, 512GB SSD + 2TB HDD, Quadro P2200)
* **Trust Badges on Every Card:**
  - *Blancco Certified 100% Data Wiped*
  - *50-Point Hardware Stress-Tested*
  - *1-Year Warranty Included*
* Original MRP with strikethrough, discount pill (Save up to 68%), and Grade A+ Pristine badges.
* **Interactive Filtering Sidebar:** Device Type (Laptops / Workstations), Processor Family (i5, i7, Xeon, Apple Silicon), RAM (8GB, 16GB, 32GB+), and dynamic price budget slider (₹15,000 – ₹1,00,000).

---

### 2. Interactive Product Detail Modal & Hardware Configurator
* **Dynamic Live Upgrades:**
  - **Memory (RAM):** Base (Included) | +16GB DDR4 (+₹1,800) | +32GB DDR4 (+₹4,200) | +64GB DDR4 (+₹8,500 for workstations)
  - **Storage (NVMe SSD):** Base (Included) | +512GB High-Speed NVMe (+₹2,100) | +1TB Ultra NVMe (+₹4,200) | +2TB Enterprise NVMe (+₹8,000)
  - **Operating System:** Windows 11 Pro OEM (Included) | Ubuntu Linux LTS 22.04 (Included) | Dual-Boot Windows + Linux (+₹999)
  - **Warranty:** Standard 1-Year Hardware + 7-Day Replacement (Included) | Yieldy Care+ 2-Year Extended + Accidental Damage (+₹2,499)
* **Real-time Price Engine:** Updates total and calculates 0% No-Cost EMI monthly breakdowns.
* **Free In-Box Perks:** Original OEM charger, certified Blancco data-wipe report PDF, sanitization microfiber cloth.
* **Trust Accordions:** 50-point diagnostic checklist preview, shipping info, and return policy.
* **CTAs:** "Add Configured Unit to Cart" and "Buy Now with 1-Click".

---

### 3. "Sell / Trade-In" Instant Valuation Engine (Prompt 3)
* **Multi-Stage Valuation Funnel:**
  1. **Device Type:** Laptop, Desktop / Mini PC, Enterprise Server, Monitor / Workstation Peripheral
  2. **Brand & Series:** Cascading selection for Lenovo (ThinkPad/IdeaPad), Dell (Latitude/XPS/Precision), HP (EliteBook/ProBook), Apple (MacBook Air/Pro), etc.
  3. **Hardware Specs:** Processor generation, RAM size, storage type (SSD/HDD) and capacity.
  4. **Diagnostic Condition Check:** Power status, screen condition, battery health, and keyboard/port functionality.
  5. **Instant Valuation Payout Card:**
     - Algorithmic valuation range (e.g. ₹14,500 – ₹17,200).
     - **Dual Payout Options:** Instant Direct Bank Transfer (NEFT/UPI within 24h) or **Yieldy Store Credit (+15% bonus value)**.
* **Enterprise Bulk ITAD Toggle:**
  - One-click switch to B2B mode for 10+ devices.
  - Drag-and-drop CSV asset list upload zone.
  - Corporate contact form (Company Name, IT Head Email, City, Expected Pickup Date).

---

### 4. Interactive Cart Slide-out Drawer
* Slide-out drawer displaying all configured custom devices.
* Breakdown of selected RAM, SSD, OS, and warranty plan per unit.
* Item removal and live subtotal recalculation.
* Simulated 1-click checkout with order confirmation and dispatch schedule.

---

### 5. Certifications & Environmental Impact
* R2v3 Certified Circular Disposition
* Blancco Data Erasure Partner
* ISO 14001 Compliant
* CO₂ offset metrics and zero e-waste circular mission.

---

## 🚀 Quick Start Guide

### 1. Navigate to the project directory
```bash
cd yieldy
```

### 2. Start the local development server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### 3. Build for Production
```bash
npm run build
npm run start
```

