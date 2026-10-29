/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { ArrowLeft, Home, AlertTriangle, ShieldCheck, Printer, Globe, Camera } from 'lucide-react';
import { NavTab } from '../../types';

interface PageProps {
  onNavigate: (tab: NavTab) => void;
}

export const DisclaimerPage: React.FC<PageProps> = ({ onNavigate }) => {
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
          <span className="text-black font-bold">Disclaimer</span>
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
              <AlertTriangle className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-2xl font-black text-neutral-900 tracking-tight">Legal Disclaimer</h1>
              <p className="text-xs text-neutral-500 font-mono mt-0.5">
                Technical, Operational, and Third-Party Declarations
              </p>
            </div>
          </div>
          <span className="self-start sm:self-auto text-[11px] font-mono font-bold uppercase px-2.5 py-1 rounded bg-neutral-100 text-neutral-700 border border-neutral-200">
            Official Advisory
          </span>
        </div>

        {/* Advisory Highlights */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 p-4 rounded-xl bg-neutral-50 border border-neutral-200 text-xs">
          <div className="flex items-start gap-2.5">
            <Camera className="w-4 h-4 text-neutral-800 shrink-0 mt-0.5" />
            <div>
              <span className="font-bold text-neutral-900 block">Scanner Variation</span>
              <span className="text-neutral-500 text-[11px]">Hardware & ambient lighting affect scan speed</span>
            </div>
          </div>
          <div className="flex items-start gap-2.5">
            <Printer className="w-4 h-4 text-neutral-800 shrink-0 mt-0.5" />
            <div>
              <span className="font-bold text-neutral-900 block">Mandatory Proofing</span>
              <span className="text-neutral-500 text-[11px]">Test prints required before large runs</span>
            </div>
          </div>
          <div className="flex items-start gap-2.5">
            <Globe className="w-4 h-4 text-neutral-800 shrink-0 mt-0.5" />
            <div>
              <span className="font-bold text-neutral-900 block">External Content</span>
              <span className="text-neutral-500 text-[11px]">No endorsement of linked destinations</span>
            </div>
          </div>
        </div>

        {/* Disclaimer Content */}
        <div className="space-y-6 text-sm text-neutral-700 leading-relaxed">
          <section className="space-y-2">
            <h2 className="text-base font-bold text-neutral-900 flex items-center gap-2">
              <span className="font-mono text-neutral-400 text-xs">01.</span>
              Hardware & Optical Scanning Accuracy
            </h2>
            <p>
              While Dragon Psycho QR Generator implements industry-standard ISO/IEC 18004 QR encoding specifications, the physical scannability of any generated QR code depends significantly on third-party factors. These include camera optical quality, autofocus capabilities, ambient lighting conditions, screen glare, display pixel density, and custom styling parameters (e.g. contrast ratio between foreground and background, logo occlusion percentage, and corner shape curvature).
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-bold text-neutral-900 flex items-center gap-2">
              <span className="font-mono text-neutral-400 text-xs">02.</span>
              Print Production & Pre-Press Proofing
            </h2>
            <p>
              Users are strictly advised to perform physical test scans using multiple real-world smartphones (both iOS and Android) under varied lighting conditions before committing to commercial printing, packaging, signages, or merchandise. Dragon Psycho and its maintainers assume no financial liability for printing expenses or operational downtime resulting from unverified codes.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-bold text-neutral-900 flex items-center gap-2">
              <span className="font-mono text-neutral-400 text-xs">03.</span>
              Third-Party Destinations & User Responsibility
            </h2>
            <p>
              Dragon Psycho is a neutral utility provider. The existence of a QR code generated via DRAGONQR does not constitute an endorsement, certification, or verification of the destination content, author, organization, or website. Users scanning unknown QR codes should exercise caution before entering credentials or submitting sensitive information.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-bold text-neutral-900 flex items-center gap-2">
              <span className="font-mono text-neutral-400 text-xs">04.</span>
              Trademark Notice
            </h2>
            <p>
              "QR Code" is a registered trademark of DENSO WAVE INCORPORATED in Japan and other countries. The use of the word mark "QR Code" is for descriptive reference only and does not imply sponsorship or affiliation with DENSO WAVE INCORPORATED.
            </p>
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
              onClick={() => onNavigate('about-us')}
              className="p-2.5 rounded-lg border border-neutral-200 hover:border-black text-xs font-semibold text-neutral-800 hover:bg-neutral-50 transition-colors text-center"
            >
              About Us &rarr;
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
