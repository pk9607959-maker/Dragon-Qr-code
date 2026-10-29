/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { ArrowLeft, Home, Info, Code2, Shield, Heart, Zap } from 'lucide-react';
import { NavTab } from '../../types';

interface PageProps {
  onNavigate: (tab: NavTab) => void;
}

export const AboutUsPage: React.FC<PageProps> = ({ onNavigate }) => {
  return (
    <div className="max-w-4xl mx-auto space-y-6 animate-in fade-in duration-200">
      {/* Top Navigation & Breadcrumbs */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-white p-4 rounded-xl border border-[#E3E3E3] shadow-xs">
        <div className="flex items-center gap-2 text-xs text-neutral-600 font-mono">
          <button
            type="button"
            onClick={() => onNavigate('home')}
            className="hover:text-black flex items-center gap-1 font-semibold transition-colors"
          >
            <Home className="w-3.5 h-3.5" />
            Home
          </button>
          <span>/</span>
          <button
            type="button"
            onClick={() => onNavigate('dragon-psycho')}
            className="hover:text-black font-semibold transition-colors"
          >
            Dragon Psycho
          </button>
          <span>/</span>
          <span className="text-black font-bold">About Us</span>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => onNavigate('dragon-psycho')}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-neutral-100 hover:bg-neutral-200 text-xs font-semibold text-neutral-800 transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            Back to Dragon Psycho
          </button>
          <button
            type="button"
            onClick={() => onNavigate('home')}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-black hover:bg-neutral-800 text-xs font-semibold text-white transition-colors"
          >
            Go to Generator
          </button>
        </div>
      </div>

      {/* Main Content Card */}
      <div className="bg-white border border-[#E3E3E3] rounded-2xl p-6 sm:p-10 shadow-xs space-y-8">
        {/* Page Header */}
        <div className="border-b border-neutral-200 pb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-neutral-900 text-white flex items-center justify-center shadow-xs">
              <Info className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-2xl font-black text-neutral-900 tracking-tight">About Dragon Psycho</h1>
              <p className="text-xs text-neutral-500 font-mono mt-0.5">
                Philosophy, Creator Mission, and Technical Architecture
              </p>
            </div>
          </div>
          <span className="self-start sm:self-auto text-[11px] font-mono font-bold uppercase px-2.5 py-1 rounded bg-neutral-100 text-neutral-700 border border-neutral-200">
            Developer Manifesto
          </span>
        </div>

        {/* Brand Story */}
        <div className="space-y-6 text-sm text-neutral-700 leading-relaxed">
          <section className="space-y-3">
            <h2 className="text-base font-bold text-neutral-900">
              The Mission: Clean, Unadulterated Digital Utilities
            </h2>
            <p>
              Dragon Psycho QR Generator (DRAGONQR) was conceived as a direct response to the current state of internet QR utilities. If you search the web for a QR generator today, virtually every top result is cluttered with deceptive bait-and-switch pricing, non-functional free tiers, artificial monthly scan caps, intrusive advertising, and aggressive user tracking.
            </p>
            <p>
              Dragon Psycho stands for something different: pure utility, strict privacy, and beautiful monochrome engineering. We believe creating a barcode or QR code should never require handing over your email address, entering a credit card, or submitting your visitors to third-party surveillance cookies.
            </p>
          </section>

          {/* Pillars */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
            <div className="p-4 rounded-xl bg-neutral-50 border border-neutral-200 space-y-2">
              <div className="w-8 h-8 rounded-lg bg-black text-white flex items-center justify-center">
                <Shield className="w-4 h-4" />
              </div>
              <h3 className="font-bold text-neutral-900 text-sm">Zero Scan Surveillance</h3>
              <p className="text-xs text-neutral-600 leading-relaxed">
                We never store scanner IP addresses, device user-agents, geographic coordinates, or scan frequency. Your audience is strictly your own.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-neutral-50 border border-neutral-200 space-y-2">
              <div className="w-8 h-8 rounded-lg bg-black text-white flex items-center justify-center">
                <Code2 className="w-4 h-4" />
              </div>
              <h3 className="font-bold text-neutral-900 text-sm">Device-First Architecture</h3>
              <p className="text-xs text-neutral-600 leading-relaxed">
                All QR renders and styling computations are calculated client-side in your browser. Saved QR history resides in local IndexedDB.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-neutral-50 border border-neutral-200 space-y-2">
              <div className="w-8 h-8 rounded-lg bg-black text-white flex items-center justify-center">
                <Zap className="w-4 h-4" />
              </div>
              <h3 className="font-bold text-neutral-900 text-sm">Strict Monochrome Aesthetic</h3>
              <p className="text-xs text-neutral-600 leading-relaxed">
                Rejecting noisy gradients and commercial clutter, DRAGONQR follows an intentional black, white, and grey industrial design system.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-neutral-50 border border-neutral-200 space-y-2">
              <div className="w-8 h-8 rounded-lg bg-black text-white flex items-center justify-center">
                <Heart className="w-4 h-4" />
              </div>
              <h3 className="font-bold text-neutral-900 text-sm">Community Funded</h3>
              <p className="text-xs text-neutral-600 leading-relaxed">
                Free for all users worldwide. Maintained voluntarily through developer passion and community donations via Cashfree.
              </p>
            </div>
          </div>

          <section className="space-y-2 pt-2">
            <h2 className="text-base font-bold text-neutral-900">
              Technical Stack
            </h2>
            <p className="text-xs text-neutral-600">
              DRAGONQR is engineered using a robust modern stack:
            </p>
            <div className="flex flex-wrap gap-2 pt-1 font-mono text-xs">
              <span className="px-3 py-1 bg-neutral-100 rounded-md border border-neutral-200 font-semibold text-neutral-800">
                React 18
              </span>
              <span className="px-3 py-1 bg-neutral-100 rounded-md border border-neutral-200 font-semibold text-neutral-800">
                TypeScript
              </span>
              <span className="px-3 py-1 bg-neutral-100 rounded-md border border-neutral-200 font-semibold text-neutral-800">
                Vite
              </span>
              <span className="px-3 py-1 bg-neutral-100 rounded-md border border-neutral-200 font-semibold text-neutral-800">
                Tailwind CSS
              </span>
              <span className="px-3 py-1 bg-neutral-100 rounded-md border border-neutral-200 font-semibold text-neutral-800">
                IndexedDB (idb-keyval)
              </span>
              <span className="px-3 py-1 bg-neutral-100 rounded-md border border-neutral-200 font-semibold text-neutral-800">
                qr-code-styling
              </span>
            </div>
          </section>
        </div>

        {/* Quick Links to Other Dedicated Pages */}
        <div className="pt-6 border-t border-neutral-200">
          <div className="text-xs font-bold text-neutral-500 uppercase tracking-wider mb-3">
            Other Dragon Psycho Pages
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            <button
              type="button"
              onClick={() => onNavigate('privacy')}
              className="p-2.5 rounded-lg border border-neutral-200 hover:border-black text-xs font-semibold text-neutral-800 hover:bg-neutral-50 transition-colors text-center"
            >
              Privacy Policy &rarr;
            </button>
            <button
              type="button"
              onClick={() => onNavigate('terms')}
              className="p-2.5 rounded-lg border border-neutral-200 hover:border-black text-xs font-semibold text-neutral-800 hover:bg-neutral-50 transition-colors text-center"
            >
              Terms & Conditions &rarr;
            </button>
            <button
              type="button"
              onClick={() => onNavigate('disclaimer')}
              className="p-2.5 rounded-lg border border-neutral-200 hover:border-black text-xs font-semibold text-neutral-800 hover:bg-neutral-50 transition-colors text-center"
            >
              Disclaimer &rarr;
            </button>
            <button
              type="button"
              onClick={() => onNavigate('contact-us')}
              className="p-2.5 rounded-lg border border-neutral-200 hover:border-black text-xs font-semibold text-neutral-800 hover:bg-neutral-50 transition-colors text-center"
            >
              Contact Us &rarr;
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
