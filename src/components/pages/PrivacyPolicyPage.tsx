/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { ArrowLeft, Home, Shield, Lock, HardDrive, Trash2, CheckCircle2 } from 'lucide-react';
import { NavTab } from '../../types';

interface PageProps {
  onNavigate: (tab: NavTab) => void;
}

export const PrivacyPolicyPage: React.FC<PageProps> = ({ onNavigate }) => {
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
          <span className="text-black font-bold">Privacy Policy</span>
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
              <Shield className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-2xl font-black text-neutral-900 tracking-tight">Privacy Policy</h1>
              <p className="text-xs text-neutral-500 font-mono mt-0.5">
                DRAGONQR Privacy & Zero-Surveillance Architecture
              </p>
            </div>
          </div>
          <span className="self-start sm:self-auto text-[11px] font-mono font-bold uppercase px-2.5 py-1 rounded bg-neutral-100 text-neutral-700 border border-neutral-200">
            Last Updated: October 2026
          </span>
        </div>

        {/* Highlights Bar */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 p-4 rounded-xl bg-neutral-50 border border-neutral-200 text-xs">
          <div className="flex items-start gap-2.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
            <div>
              <span className="font-bold text-neutral-900 block">Zero Scan Logs</span>
              <span className="text-neutral-500 text-[11px]">No IP, device, or timestamp logging</span>
            </div>
          </div>
          <div className="flex items-start gap-2.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
            <div>
              <span className="font-bold text-neutral-900 block">Device-Local History</span>
              <span className="text-neutral-500 text-[11px]">IndexedDB on client machine only</span>
            </div>
          </div>
          <div className="flex items-start gap-2.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
            <div>
              <span className="font-bold text-neutral-900 block">No Account Required</span>
              <span className="text-neutral-500 text-[11px]">No password or personal data harvested</span>
            </div>
          </div>
        </div>

        {/* Policy Sections */}
        <div className="space-y-6 text-sm text-neutral-700 leading-relaxed">
          <section className="space-y-2">
            <h2 className="text-base font-bold text-neutral-900 flex items-center gap-2">
              <span className="font-mono text-neutral-400 text-xs">01.</span>
              Zero Scan Analytics & No Spyware Guarantee
            </h2>
            <p>
              Dragon Psycho QR Generator (DRAGONQR) is built on an uncompromising privacy foundation: we do not monitor, record, analyze, profile, or monetize QR code scans. Unlike commercial QR services that inject intermediate tracking cookies and log user geolocations, DRAGONQR treats user privacy as non-negotiable.
            </p>
            <p className="text-neutral-600 text-xs">
              When someone scans a static QR code generated on this platform, the scan occurs directly between their device camera and the destination payload. DRAGONQR servers are never contacted.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-bold text-neutral-900 flex items-center gap-2">
              <span className="font-mono text-neutral-400 text-xs">02.</span>
              Device-Local Client Storage (IndexedDB)
            </h2>
            <p>
              Your generated QR codes, styling preferences, and history items are stored exclusively within your browser’s local IndexedDB and LocalStorage. We do not transmit sensitive data (such as Wi-Fi credentials, personal SMS messages, or private URLs) to any remote database.
            </p>
            <p className="text-neutral-600 text-xs">
              Clearing your browser cache or using the "Clear All History" button permanently purges your saved records from your computer.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-bold text-neutral-900 flex items-center gap-2">
              <span className="font-mono text-neutral-400 text-xs">03.</span>
              Dynamic QR Code Redirections & Cryptographic Tokens
            </h2>
            <p>
              When you opt to generate a Dynamic QR code, our redirect routing server stores the destination URL and a cryptographically salted SHA-256 hash of your private management key.
            </p>
            <p className="text-neutral-600 text-xs">
              We never store your raw plaintext management key on the server. Furthermore, the redirect server does not log scanner IP addresses, browser headers, or geographical location coordinates.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-bold text-neutral-900 flex items-center gap-2">
              <span className="font-mono text-neutral-400 text-xs">04.</span>
              Third-Party Integrations & Voluntary Donations
            </h2>
            <p>
              Voluntary contributions to maintain server infrastructure are handled through compliant payment processors (e.g., Cashfree Payments). Dragon Psycho never receives, processes, or stores your credit card, bank account, or payment credentials.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-bold text-neutral-900 flex items-center gap-2">
              <span className="font-mono text-neutral-400 text-xs">05.</span>
              Contacting Us Regarding Privacy
            </h2>
            <p>
              If you have any questions, security vulnerability disclosures, or inquiries regarding our privacy posture, please contact:
            </p>
            <div className="p-3 rounded-lg bg-neutral-100 font-mono text-xs text-neutral-800 border border-neutral-200 inline-block">
              contact@dragonpsycho.dev
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
