'use client';

import { ShieldCheck, Recycle, Leaf, Award, Truck, HeartHandshake } from 'lucide-react';

export default function WhyYieldy() {
  const reasons = [
    {
      icon: ShieldCheck,
      title: 'Blancco Certified Data Erasure',
      description: 'Every device undergoes NIST 800-88 compliant data sanitization with Blancco — the global gold standard. You get a verifiable certificate.',
    },
    {
      icon: Award,
      title: '50-Point Hardware Stress Test',
      description: 'CPU, RAM, SSD, display, battery, ports — every component is rigorously tested under load. Only units passing all 50 checkpoints make it to our store.',
    },
    {
      icon: Truck,
      title: 'Free Shipping & 7-Day Replacement',
      description: 'Free insured shipping across India. Not happy? Get a replacement unit within 7 days, no questions asked.',
    },
    {
      icon: Recycle,
      title: 'R2v3 Certified Circular Process',
      description: 'Our entire ITAD pipeline is R2v3 certified, ensuring responsible electronics recycling and zero landfill contributions.',
    },
    {
      icon: Leaf,
      title: 'Real Climate Impact',
      description: 'Every refurbished device sold saves ~300 kg of CO₂ versus manufacturing new. Track your impact in your Yieldy dashboard.',
    },
    {
      icon: HeartHandshake,
      title: 'Enterprise-Grade for Startups',
      description: 'The same ThinkPads and Latitudes used by Fortune 500 IT departments — now accessible to bootstrapped founders and freelancers at 60-70% off.',
    },
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <span className="text-sm font-semibold text-emerald-600 uppercase tracking-wider">Why Yieldy</span>
          <h2 className="text-3xl sm:text-4xl font-bold text-zinc-900 mt-2">Not Just Refurbished. Re-Certified.</h2>
          <p className="text-zinc-500 mt-3 max-w-xl mx-auto">
            Every device goes through our enterprise-grade certification pipeline before it reaches you.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {reasons.map((reason, idx) => (
            <div key={idx} className="bg-white rounded-2xl border border-gray-200 p-6 hover:shadow-md hover:border-emerald-200 transition-all duration-300">
              <div className="w-12 h-12 bg-emerald-50 rounded-xl flex items-center justify-center mb-4">
                <reason.icon className="w-6 h-6 text-emerald-600" />
              </div>
              <h3 className="text-lg font-bold text-zinc-900 mb-2">{reason.title}</h3>
              <p className="text-sm text-zinc-500 leading-relaxed">{reason.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
