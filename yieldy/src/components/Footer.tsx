'use client';

import { Recycle, Shield, Leaf, Award } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-zinc-950 text-zinc-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-emerald-600 rounded-lg flex items-center justify-center">
                <Recycle className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-white">Yieldy</span>
            </div>
            <p className="text-sm leading-relaxed">
              India&apos;s certified circular electronics marketplace. Enterprise-grade refurbished hardware with complete data security assurance.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">Shop</h4>
            <ul className="space-y-2.5 text-sm">
              <li><a href="#" className="hover:text-emerald-400 transition-colors">Browse All Laptops</a></li>
              <li><a href="#" className="hover:text-emerald-400 transition-colors">Desktop Workstations</a></li>
              <li><a href="#" className="hover:text-emerald-400 transition-colors">Apple MacBooks</a></li>
              <li><a href="#" className="hover:text-emerald-400 transition-colors">Enterprise Servers</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">Company</h4>
            <ul className="space-y-2.5 text-sm">
              <li><a href="#" className="hover:text-emerald-400 transition-colors">About Yieldy</a></li>
              <li><a href="#" className="hover:text-emerald-400 transition-colors">ITAD for Enterprises</a></li>
              <li><a href="#" className="hover:text-emerald-400 transition-colors">Sustainability Report</a></li>
              <li><a href="#" className="hover:text-emerald-400 transition-colors">Contact Us</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">Support</h4>
            <ul className="space-y-2.5 text-sm">
              <li><a href="#" className="hover:text-emerald-400 transition-colors">Warranty Policy</a></li>
              <li><a href="#" className="hover:text-emerald-400 transition-colors">Return & Refund</a></li>
              <li><a href="#" className="hover:text-emerald-400 transition-colors">Shipping Info</a></li>
              <li><a href="#" className="hover:text-emerald-400 transition-colors">FAQ</a></li>
            </ul>
          </div>
        </div>

        {/* Certifications */}
        <div className="mt-12 pt-8 border-t border-zinc-800">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="flex flex-wrap items-center justify-center gap-6">
              <div className="flex items-center gap-2 text-xs">
                <Shield className="w-4 h-4 text-emerald-500" />
                <span>R2v3 Certified</span>
              </div>
              <div className="flex items-center gap-2 text-xs">
                <Award className="w-4 h-4 text-emerald-500" />
                <span>Blancco Data Erasure Partner</span>
              </div>
              <div className="flex items-center gap-2 text-xs">
                <Leaf className="w-4 h-4 text-emerald-500" />
                <span>ISO 14001 Compliant</span>
              </div>
            </div>
            <p className="text-xs text-zinc-500">
              © 2024 Yieldy (yieldy.in). All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
