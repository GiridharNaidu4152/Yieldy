'use client';

import { Product } from '@/data/products';
import { ConfigState } from '@/components/ProductDetailModal';
import { ramUpgrades, storageUpgrades, osOptions, warrantyOptions } from '@/data/products';
import { X, Trash2, ShoppingBag, ShieldCheck, ArrowRight, Check } from 'lucide-react';
import Image from 'next/image';
import { useState } from 'react';

export interface CartItem {
  id: string;
  product: Product;
  config: ConfigState;
  totalPrice: number;
}

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onRemoveItem: (id: string) => void;
  onClearCart: () => void;
}

export default function CartDrawer({
  isOpen,
  onClose,
  items,
  onRemoveItem,
  onClearCart,
}: CartDrawerProps) {
  const [checkoutStep, setCheckoutStep] = useState<'cart' | 'success'>('cart');

  if (!isOpen) return null;

  const subtotal = items.reduce((acc, item) => acc + item.totalPrice, 0);
  const gst = Math.round(subtotal * 0.18);
  const grandTotal = subtotal;

  const handleCheckout = () => {
    setCheckoutStep('success');
  };

  const handleFinish = () => {
    onClearCart();
    setCheckoutStep('cart');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity" onClick={onClose} />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col">
          {/* Header */}
          <div className="p-6 border-b border-gray-100 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-emerald-600" />
              <h2 className="text-lg font-bold text-slate-900">Your Cart ({items.length})</h2>
            </div>
            <button
              onClick={onClose}
              className="p-2 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {checkoutStep === 'success' ? (
            <div className="flex-1 flex flex-col items-center justify-center p-8 text-center">
              <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mb-4">
                <Check className="w-8 h-8 stroke-[2.5]" />
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-2">Order Confirmed!</h3>
              <p className="text-sm text-slate-500 mb-6">
                Thank you for choosing certified circular tech. Your Blancco sanitization audit report and tracking details have been generated.
              </p>
              <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 w-full text-left text-xs text-slate-600 space-y-1.5 mb-6">
                <p className="font-semibold text-slate-800">Dispatch Timeline: 24 - 48 Hours</p>
                <p>Express Insured Courier via BlueDart Air</p>
                <p>Includes OEM Charger & Diagnostic Audit Sheet</p>
              </div>
              <button
                onClick={handleFinish}
                className="w-full bg-slate-900 hover:bg-emerald-600 text-white font-semibold py-3 rounded-xl transition-colors cursor-pointer"
              >
                Continue Browsing
              </button>
            </div>
          ) : (
            <>
              {/* Items List */}
              <div className="flex-1 overflow-y-auto p-6 space-y-4">
                {items.length === 0 ? (
                  <div className="text-center py-16 text-slate-400">
                    <ShoppingBag className="w-12 h-12 mx-auto mb-3 opacity-30" />
                    <p className="text-base font-medium">Your cart is empty</p>
                    <p className="text-xs text-slate-400 mt-1">Configure and add laptops or workstations to review them here.</p>
                  </div>
                ) : (
                  items.map((item) => (
                    <div
                      key={item.id}
                      className="border border-gray-200 rounded-xl p-4 hover:border-emerald-200 transition-colors bg-white relative group"
                    >
                      <button
                        onClick={() => onRemoveItem(item.id)}
                        className="absolute top-3 right-3 text-slate-300 hover:text-red-500 p-1 transition-colors cursor-pointer"
                        title="Remove unit"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>

                      <div className="flex gap-3">
                        <div className="relative w-16 h-16 rounded-lg overflow-hidden border border-gray-100 flex-shrink-0 bg-slate-50">
                          <Image
                            src={item.product.image}
                            alt={item.product.name}
                            fill
                            sizes="64px"
                            className="object-cover"
                          />
                        </div>
                        <div className="pr-6">
                          <h4 className="text-sm font-bold text-slate-900 leading-tight">{item.product.name}</h4>
                          <span className="inline-block text-[11px] font-medium text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full mt-1">
                            {item.product.grade}
                          </span>
                        </div>
                      </div>

                      <div className="mt-3 pt-3 border-t border-gray-100 text-xs text-slate-500 space-y-1">
                        <p>
                          <span className="text-slate-400">RAM: </span>
                          {ramUpgrades[item.config.ramUpgrade]?.label || 'Base'}
                        </p>
                        <p>
                          <span className="text-slate-400">Storage: </span>
                          {storageUpgrades[item.config.storageUpgrade]?.label || 'Base'}
                        </p>
                        <p>
                          <span className="text-slate-400">OS: </span>
                          {osOptions[item.config.os]?.label}
                        </p>
                        <p>
                          <span className="text-slate-400">Warranty: </span>
                          {warrantyOptions[item.config.warranty]?.label}
                        </p>
                      </div>

                      <div className="mt-3 pt-2 flex items-center justify-between border-t border-gray-100">
                        <span className="text-xs text-emerald-600 flex items-center gap-1 font-medium">
                          <ShieldCheck className="w-3.5 h-3.5" /> 1-Yr Warranty
                        </span>
                        <span className="text-base font-bold text-slate-900">
                          ₹{item.totalPrice.toLocaleString('en-IN')}
                        </span>
                      </div>
                    </div>
                  ))
                )}
              </div>

              {/* Footer Summary */}
              {items.length > 0 && (
                <div className="p-6 border-t border-gray-100 bg-gray-50/50 space-y-3">
                  <div className="flex justify-between text-xs text-slate-500">
                    <span>Tax Included (18% GST invoice provided)</span>
                    <span className="font-medium text-slate-700">₹{gst.toLocaleString('en-IN')}</span>
                  </div>
                  <div className="flex justify-between text-xs text-slate-500">
                    <span>Insured Shipping Across India</span>
                    <span className="font-semibold text-emerald-600">FREE</span>
                  </div>
                  <div className="flex justify-between text-base font-bold text-slate-900 pt-2 border-t border-gray-200">
                    <span>Total Amount</span>
                    <span>₹{grandTotal.toLocaleString('en-IN')}</span>
                  </div>
                  <p className="text-[11px] text-slate-400 text-right">
                    EMI available starting from ₹{Math.round(grandTotal / 12).toLocaleString('en-IN')}/mo
                  </p>

                  <button
                    onClick={handleCheckout}
                    className="w-full bg-slate-900 hover:bg-emerald-600 text-white font-semibold py-3.5 rounded-xl transition-colors flex items-center justify-center gap-2 shadow-sm cursor-pointer"
                  >
                    Proceed to Secure Checkout <ArrowRight className="w-4 h-4" />
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
