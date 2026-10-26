/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Heart, ExternalLink, ShieldCheck, Coffee, Sparkles, HelpCircle } from 'lucide-react';

interface DonateViewProps {
  onBackToGenerator: () => void;
}

export const DonateView: React.FC<DonateViewProps> = ({ onBackToGenerator }) => {
  const [cashfreeUrl, setCashfreeUrl] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    fetch('/api/config')
      .then((res) => res.json())
      .then((data) => {
        setCashfreeUrl(data.cashfreePaymentUrl || '');
      })
      .catch(() => {
        setCashfreeUrl('');
      })
      .finally(() => setLoading(false));
  }, []);

  const handleDonateClick = () => {
    if (cashfreeUrl) {
      window.open(cashfreeUrl, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div className="bg-white border border-[#E3E3E3] rounded-2xl p-6 sm:p-8 shadow-xs text-center">
        <div className="w-14 h-14 bg-red-50 text-red-600 rounded-2xl flex items-center justify-center mx-auto mb-4 border border-red-100 shadow-xs">
          <Heart className="w-7 h-7 fill-red-500 text-red-500" />
        </div>

        <h1 className="text-2xl font-black text-[#171717] tracking-tight mb-2">
          Support Dragon Psycho QR
        </h1>
        <p className="text-sm text-neutral-600 max-w-md mx-auto leading-relaxed mb-6">
          DRAGONQR is a completely free, open-source, and tracker-free QR generation suite. If this project helps your daily work or business, voluntary contributions help cover infrastructure and hosting costs.
        </p>

        {/* Feature Highlights */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-8 text-left">
          <div className="p-3.5 bg-[#F5F5F5] rounded-xl border border-[#E3E3E3]">
            <div className="text-xs font-bold text-neutral-900 mb-0.5">100% Free Forever</div>
            <div className="text-[11px] text-neutral-500 leading-snug">
              No locked features, paywalls, or premium tiers.
            </div>
          </div>
          <div className="p-3.5 bg-[#F5F5F5] rounded-xl border border-[#E3E3E3]">
            <div className="text-xs font-bold text-neutral-900 mb-0.5">Zero Scan Analytics</div>
            <div className="text-[11px] text-neutral-500 leading-snug">
              No IP tracking, cookies, or scanning device surveillance.
            </div>
          </div>
          <div className="p-3.5 bg-[#F5F5F5] rounded-xl border border-[#E3E3E3]">
            <div className="text-xs font-bold text-neutral-900 mb-0.5">Community Driven</div>
            <div className="text-[11px] text-neutral-500 leading-snug">
              Directly supports open-source software by Dragon Psycho.
            </div>
          </div>
        </div>

        {/* Cashfree Donation Action */}
        <div className="p-6 bg-neutral-900 text-white rounded-xl border border-neutral-800 space-y-4">
          <div className="flex items-center justify-center gap-2">
            <Coffee className="w-5 h-5 text-amber-400" />
            <span className="text-sm font-bold tracking-wide">
              Official Cashfree Payment Portal
            </span>
          </div>

          <p className="text-xs text-neutral-300 max-w-md mx-auto leading-relaxed">
            All donations are processed securely through Cashfree Payments. You can contribute via UPI, Card, NetBanking, or Wallet.
          </p>

          <div className="pt-2">
            {loading ? (
              <div className="text-xs text-neutral-400 py-2">Loading payment gateway details...</div>
            ) : cashfreeUrl ? (
              <button
                type="button"
                onClick={handleDonateClick}
                className="w-full sm:w-auto px-8 py-3 bg-white text-black font-extrabold text-sm rounded-xl hover:bg-neutral-100 transition-all shadow-md inline-flex items-center justify-center gap-2"
              >
                <span>Proceed to Donate via Cashfree</span>
                <ExternalLink className="w-4 h-4" />
              </button>
            ) : (
              <div className="p-3 bg-neutral-800 rounded-lg text-xs text-neutral-400">
                The official Cashfree donation URL will be supplied by the product owner before launch.
              </div>
            )}
          </div>

          <div className="flex items-center justify-center gap-1.5 text-[11px] text-neutral-400 pt-2">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>Secure 256-bit encrypted checkout via Cashfree</span>
          </div>
        </div>

        <div className="mt-6 flex items-center justify-center gap-4 text-xs">
          <button
            type="button"
            onClick={onBackToGenerator}
            className="text-neutral-600 hover:text-black font-semibold"
          >
            &larr; Return to QR Generator
          </button>
        </div>
      </div>
    </div>
  );
};
