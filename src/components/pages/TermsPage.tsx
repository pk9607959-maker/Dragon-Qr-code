/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { ArrowLeft, Home, FileText, CheckCircle2, AlertOctagon, Scale } from 'lucide-react';
import { NavTab } from '../../types';

interface PageProps {
  onNavigate: (tab: NavTab) => void;
}

export const TermsPage: React.FC<PageProps> = ({ onNavigate }) => {
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
          <span className="text-black font-bold">Terms and Conditions</span>
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
              <FileText className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-2xl font-black text-neutral-900 tracking-tight">Terms and Conditions</h1>
              <p className="text-xs text-neutral-500 font-mono mt-0.5">
                DRAGONQR Service Agreement & Acceptable Use Policy
              </p>
            </div>
          </div>
          <span className="self-start sm:self-auto text-[11px] font-mono font-bold uppercase px-2.5 py-1 rounded bg-neutral-100 text-neutral-700 border border-neutral-200">
            Last Revised: October 2026
          </span>
        </div>

        {/* Highlights Bar */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 p-4 rounded-xl bg-neutral-50 border border-neutral-200 text-xs">
          <div className="flex items-start gap-2.5">
            <CheckCircle2 className="w-4 h-4 text-neutral-900 shrink-0 mt-0.5" />
            <div>
              <span className="font-bold text-neutral-900 block">Free & Unrestricted</span>
              <span className="text-neutral-500 text-[11px]">Personal and commercial use allowed</span>
            </div>
          </div>
          <div className="flex items-start gap-2.5">
            <AlertOctagon className="w-4 h-4 text-neutral-900 shrink-0 mt-0.5" />
            <div>
              <span className="font-bold text-neutral-900 block">No Illegal Payloads</span>
              <span className="text-neutral-500 text-[11px]">Strict anti-malware and anti-phishing</span>
            </div>
          </div>
          <div className="flex items-start gap-2.5">
            <Scale className="w-4 h-4 text-neutral-900 shrink-0 mt-0.5" />
            <div>
              <span className="font-bold text-neutral-900 block">User Responsibility</span>
              <span className="text-neutral-500 text-[11px]">Mandatory physical scan verification</span>
            </div>
          </div>
        </div>

        {/* Policy Sections */}
        <div className="space-y-6 text-sm text-neutral-700 leading-relaxed">
          <section className="space-y-2">
            <h2 className="text-base font-bold text-neutral-900 flex items-center gap-2">
              <span className="font-mono text-neutral-400 text-xs">01.</span>
              Acceptance of Terms
            </h2>
            <p>
              By accessing or using the Dragon Psycho QR Generator (DRAGONQR), you agree to be bound by these Terms and Conditions. If you do not agree to these terms, please refrain from using the generator or redirect services.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-bold text-neutral-900 flex items-center gap-2">
              <span className="font-mono text-neutral-400 text-xs">02.</span>
              Acceptable Use Policy
            </h2>
            <p>
              You agree not to encode, transmit, or generate QR codes containing or directing to:
            </p>
            <ul className="list-disc pl-5 space-y-1 text-xs text-neutral-600">
              <li>Phishing schemes, credential harvesting, or fraudulent banking impersonations.</li>
              <li>Malware, viruses, trojans, ransomware, or malicious APK downloads.</li>
              <li>Unsolicited spam campaigns or illicit deceptive communications.</li>
              <li>Content promoting illegal activities, hate speech, or severe exploitation.</li>
            </ul>
            <p className="text-neutral-600 text-xs">
              We actively enforce automated and manual mitigation. Any dynamic redirect discovered violating these terms will be immediately terminated without prior notification.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-bold text-neutral-900 flex items-center gap-2">
              <span className="font-mono text-neutral-400 text-xs">03.</span>
              Testing & Pre-Print Responsibility
            </h2>
            <p>
              DRAGONQR provides styling features such as custom dot types, corner squares, colors, and embedded logos. You are solely responsible for testing and verifying scannability with multiple physical devices and scanning applications prior to mass printing on physical media (e.g., billboards, product packaging, menus).
            </p>
            <p className="text-neutral-600 text-xs">
              We accept no liability for costs associated with misprinted or unscannable materials resulting from extreme color combinations, insufficient contrast, or damaged logos.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-bold text-neutral-900 flex items-center gap-2">
              <span className="font-mono text-neutral-400 text-xs">04.</span>
              Dynamic QR Custody & Management Tokens
            </h2>
            <p>
              When a dynamic QR code is created, a unique Management Key is generated on your device. Since DRAGONQR does not utilize centralized user login accounts, we cannot recover or reset a lost management key. It is the creator’s sole duty to securely record this token if future destination updates are required.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-bold text-neutral-900 flex items-center gap-2">
              <span className="font-mono text-neutral-400 text-xs">05.</span>
              Disclaimer of Warranties
            </h2>
            <p>
              The service is provided on an "AS IS" and "AS AVAILABLE" basis without warranties of any kind, whether express, implied, or statutory. Dragon Psycho makes no guarantee of 100% uninterrupted server uptime for dynamic redirect endpoints.
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
              onClick={() => onNavigate('disclaimer')}
              className="p-2.5 rounded-lg border border-neutral-200 hover:border-black text-xs font-semibold text-neutral-800 hover:bg-neutral-50 transition-colors text-center"
            >
              Disclaimer &rarr;
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
