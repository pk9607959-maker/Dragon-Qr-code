/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import {
  Shield,
  FileText,
  Info,
  Mail,
  ExternalLink,
  Youtube,
  Instagram,
  Facebook,
  Github,
  CheckCircle,
  X,
  Code2,
} from 'lucide-react';

export const DragonPsychoView: React.FC = () => {
  const [activeModal, setActiveModal] = useState<'privacy' | 'terms' | null>(null);

  const socialLinks = [
    {
      platform: 'YouTube',
      handle: '@Dragon_music3e',
      url: 'https://www.youtube.com/@Dragon_music3e',
      icon: <Youtube className="w-5 h-5" />,
      desc: 'Official Music & Releases',
    },
    {
      platform: 'Instagram',
      handle: '@dragon__prince_458',
      url: 'https://www.instagram.com/dragon__prince_458?xtok=MXNuaDZkMXNxZG5nMg==',
      icon: <Instagram className="w-5 h-5" />,
      desc: 'Behind the Scenes & Updates',
    },
    {
      platform: 'Facebook',
      handle: 'Dragon Psycho Official',
      url: 'https://www.facebook.com/share/1CLjxKeFFZ/',
      icon: <Facebook className="w-5 h-5" />,
      desc: 'Community & Announcements',
    },
    {
      platform: 'GitHub',
      handle: 'pk9607959-maker',
      url: 'https://github.com/pk9607959-maker',
      icon: <Github className="w-5 h-5" />,
      desc: 'Open Source Repositories',
    },
  ];

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Brand Profile Banner */}
      <div className="bg-[#171717] text-white rounded-2xl p-6 sm:p-8 shadow-sm border border-[#2d2d2d]">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5">
          <div className="w-16 h-16 rounded-2xl bg-white text-black flex items-center justify-center font-black text-2xl shadow-md border border-neutral-300 shrink-0">
            DP
          </div>

          <div className="space-y-1 flex-1">
            <div className="flex items-center gap-2">
              <h1 className="text-xl sm:text-2xl font-black tracking-tight">Dragon Psycho</h1>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-neutral-800 text-neutral-300 border border-neutral-700 uppercase">
                Creator & Brand
              </span>
            </div>
            <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed">
              Dragon Psycho QR Generator (DRAGONQR) was engineered to deliver clean, ad-free, high-fidelity QR tools with absolute zero scan tracking or user surveillance.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-6 pt-6 border-t border-neutral-800 text-xs">
          <div>
            <div className="text-[10px] uppercase font-mono text-neutral-400">Architecture</div>
            <div className="font-bold text-white mt-0.5">React + TS + Vite</div>
          </div>
          <div>
            <div className="text-[10px] uppercase font-mono text-neutral-400">Scan Analytics</div>
            <div className="font-bold text-emerald-400 mt-0.5">Strictly 0% / None</div>
          </div>
          <div>
            <div className="text-[10px] uppercase font-mono text-neutral-400">User Accounts</div>
            <div className="font-bold text-white mt-0.5">Not Required</div>
          </div>
          <div>
            <div className="text-[10px] uppercase font-mono text-neutral-400">License</div>
            <div className="font-bold text-white mt-0.5">Open Source</div>
          </div>
        </div>
      </div>

      {/* Navigation to Supporting Sections */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Privacy Policy Card */}
        <div className="bg-white border border-[#E3E3E3] rounded-xl p-5 shadow-xs flex flex-col justify-between">
          <div>
            <div className="w-9 h-9 rounded-lg bg-neutral-100 flex items-center justify-center text-neutral-800 mb-3">
              <Shield className="w-5 h-5" />
            </div>
            <h2 className="text-sm font-bold text-neutral-900 mb-1">Privacy Policy</h2>
            <p className="text-xs text-neutral-600 leading-relaxed mb-4">
              Learn how DRAGONQR protects your data: zero scan counting, no IP tracking, and 100% device-local history storage.
            </p>
          </div>
          <button
            type="button"
            onClick={() => setActiveModal('privacy')}
            className="w-full py-2 px-3 text-xs font-semibold bg-neutral-100 hover:bg-neutral-200 text-neutral-800 rounded-lg transition-colors text-center"
          >
            Read Privacy Policy &rarr;
          </button>
        </div>

        {/* Terms and Conditions Card */}
        <div className="bg-white border border-[#E3E3E3] rounded-xl p-5 shadow-xs flex flex-col justify-between">
          <div>
            <div className="w-9 h-9 rounded-lg bg-neutral-100 flex items-center justify-center text-neutral-800 mb-3">
              <FileText className="w-5 h-5" />
            </div>
            <h2 className="text-sm font-bold text-neutral-900 mb-1">Terms and Conditions</h2>
            <p className="text-xs text-neutral-600 leading-relaxed mb-4">
              Terms of acceptable use, QR destination responsibilities, disclaimer of warranties, and service reliability limits.
            </p>
          </div>
          <button
            type="button"
            onClick={() => setActiveModal('terms')}
            className="w-full py-2 px-3 text-xs font-semibold bg-neutral-100 hover:bg-neutral-200 text-neutral-800 rounded-lg transition-colors text-center"
          >
            Read Terms & Conditions &rarr;
          </button>
        </div>
      </div>

      {/* About & Contact Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="bg-white border border-[#E3E3E3] rounded-xl p-5 shadow-xs">
          <div className="w-9 h-9 rounded-lg bg-neutral-100 flex items-center justify-center text-neutral-800 mb-3">
            <Info className="w-5 h-5" />
          </div>
          <h2 className="text-sm font-bold text-neutral-900 mb-1">About Dragon Psycho</h2>
          <p className="text-xs text-neutral-600 leading-relaxed">
            Dragon Psycho creates minimalist digital experiences and developer utilities focused on precision, privacy, and visual elegance. DRAGONQR is built to provide an uncompromised alternative to ad-cluttered commercial QR services.
          </p>
        </div>

        <div className="bg-white border border-[#E3E3E3] rounded-xl p-5 shadow-xs">
          <div className="w-9 h-9 rounded-lg bg-neutral-100 flex items-center justify-center text-neutral-800 mb-3">
            <Mail className="w-5 h-5" />
          </div>
          <h2 className="text-sm font-bold text-neutral-900 mb-1">Contact & Inquiries</h2>
          <p className="text-xs text-neutral-600 leading-relaxed mb-2">
            For support questions, open-source feedback, or security inquiries, reach out through the social channels below or developer email:
          </p>
          <div className="text-xs font-mono bg-neutral-50 p-2 rounded border border-neutral-200 text-neutral-700">
            contact@dragonpsycho.dev
          </div>
        </div>
      </div>

      {/* VISUALLY DISTINCT BLACK SQUARE-STYLE SOCIAL MEDIA PANEL */}
      <div className="bg-[#171717] border border-[#2d2d2d] rounded-2xl p-6 sm:p-7 shadow-xl text-white">
        <div className="flex items-center justify-between pb-4 border-b border-neutral-800 mb-5">
          <div>
            <h2 className="text-base font-extrabold tracking-tight">Social Media & Official Channels</h2>
            <p className="text-xs text-neutral-400 mt-0.5">
              Connect with Dragon Psycho across official developer and creator platforms.
            </p>
          </div>
          <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-neutral-800 text-neutral-300 border border-neutral-700">
            Verified Links
          </span>
        </div>

        {/* Distinct Square-Style Panels */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {socialLinks.map((item) => (
            <a
              key={item.platform}
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex flex-col justify-between p-4 bg-black border border-[#262626] hover:border-neutral-400 rounded-xl transition-all duration-150 hover:-translate-y-0.5"
            >
              <div className="flex items-center justify-between mb-3">
                <div className="w-9 h-9 rounded-lg bg-neutral-900 group-hover:bg-neutral-800 text-white flex items-center justify-center border border-neutral-800 transition-colors">
                  {item.icon}
                </div>
                <ExternalLink className="w-3.5 h-3.5 text-neutral-500 group-hover:text-white transition-colors" />
              </div>

              <div>
                <div className="text-xs font-bold text-white group-hover:text-neutral-200 flex items-center gap-1">
                  <span>{item.platform}</span>
                </div>
                <div className="text-[11px] font-mono text-neutral-400 truncate mt-0.5">
                  {item.handle}
                </div>
                <div className="text-[10px] text-neutral-500 mt-1">
                  {item.desc}
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>

      {/* DEDICATED PRIVACY POLICY MODAL */}
      {activeModal === 'privacy' && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[85vh] flex flex-col border border-neutral-200 shadow-2xl overflow-hidden">
            <div className="p-5 border-b border-neutral-200 flex items-center justify-between bg-neutral-50">
              <div className="flex items-center gap-2">
                <Shield className="w-5 h-5 text-neutral-900" />
                <h2 className="text-sm font-bold text-neutral-900">DRAGONQR Privacy Policy</h2>
              </div>
              <button
                type="button"
                onClick={() => setActiveModal(null)}
                className="text-neutral-500 hover:text-black p-1"
                aria-label="Close Privacy Modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 overflow-y-auto space-y-4 text-xs text-neutral-700 leading-relaxed">
              <p className="font-semibold text-neutral-900">Effective Date: October 2026</p>

              <div>
                <h3 className="font-bold text-neutral-900 mb-1">1. Zero Scan Analytics Guarantee</h3>
                <p>
                  Dragon Psycho QR Generator does not monitor, record, analyze, or monetize QR code scans. We explicitly do not log scanning device models, IP addresses, geographical coordinates, user-agent headers, or timestamp history when a dynamic QR redirect is processed.
                </p>
              </div>

              <div>
                <h3 className="font-bold text-neutral-900 mb-1">2. Local Browser Storage</h3>
                <p>
                  Your generated QR codes and history are persisted locally on your device via IndexedDB and LocalStorage. This information is private to your browser profile. We never transmit sensitive credentials (such as Wi-Fi passwords or confidential text) to external databases merely to render your local history.
                </p>
              </div>

              <div>
                <h3 className="font-bold text-neutral-900 mb-1">3. Dynamic QR Destination Storage</h3>
                <p>
                  When you explicitly choose to create a Dynamic QR code, the destination URL and a cryptographically salted SHA-256 hash of your management token are securely stored in Supabase / our backend database. The plaintext management token is never retained on the server.
                </p>
              </div>

              <div>
                <h3 className="font-bold text-neutral-900 mb-1">4. Third-Party Services</h3>
                <p>
                  Voluntary donations are processed through Cashfree Payments under their strict compliance standards. No financial or credit card data is ever collected or stored by Dragon Psycho.
                </p>
              </div>

              <div>
                <h3 className="font-bold text-neutral-900 mb-1">5. Data Deletion</h3>
                <p>
                  You may clear your entire local browser history at any time with one click. Dynamic QR codes can be deactivated using your private management token.
                </p>
              </div>
            </div>

            <div className="p-4 border-t border-neutral-200 bg-neutral-50 flex justify-end">
              <button
                type="button"
                onClick={() => setActiveModal(null)}
                className="px-4 py-2 bg-black text-white text-xs font-bold rounded-lg hover:bg-neutral-800"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* DEDICATED TERMS AND CONDITIONS MODAL */}
      {activeModal === 'terms' && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[85vh] flex flex-col border border-neutral-200 shadow-2xl overflow-hidden">
            <div className="p-5 border-b border-neutral-200 flex items-center justify-between bg-neutral-50">
              <div className="flex items-center gap-2">
                <FileText className="w-5 h-5 text-neutral-900" />
                <h2 className="text-sm font-bold text-neutral-900">DRAGONQR Terms and Conditions</h2>
              </div>
              <button
                type="button"
                onClick={() => setActiveModal(null)}
                className="text-neutral-500 hover:text-black p-1"
                aria-label="Close Terms Modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 overflow-y-auto space-y-4 text-xs text-neutral-700 leading-relaxed">
              <p className="font-semibold text-neutral-900">Last Revised: October 2026</p>

              <div>
                <h3 className="font-bold text-neutral-900 mb-1">1. Acceptable Use</h3>
                <p>
                  Dragon Psycho QR Generator provides free static and dynamic QR code generation. You agree not to generate QR codes leading to phishing campaigns, malware dissemination, illegal material, scams, or fraudulent websites. We reserve the right to deactivate dynamic links that violate these terms.
                </p>
              </div>

              <div>
                <h3 className="font-bold text-neutral-900 mb-1">2. Content Responsibility</h3>
                <p>
                  You are solely responsible for the correctness and legal compliance of any content or URLs encoded in your generated QR codes. Always test scans on physical devices before mass printing.
                </p>
              </div>

              <div>
                <h3 className="font-bold text-neutral-900 mb-1">3. Management Token Custody</h3>
                <p>
                  Dynamic QR codes rely on a unique management token for destination edits. Because no user accounts are maintained, if you misplace or lose your management key, the destination cannot be modified.
                </p>
              </div>

              <div>
                <h3 className="font-bold text-neutral-900 mb-1">4. Disclaimer of Warranty</h3>
                <p>
                  The service is provided "AS IS" without warranties of any kind. While high uptime is prioritized, we do not guarantee uninterrupted availability of redirect infrastructure.
                </p>
              </div>
            </div>

            <div className="p-4 border-t border-neutral-200 bg-neutral-50 flex justify-end">
              <button
                type="button"
                onClick={() => setActiveModal(null)}
                className="px-4 py-2 bg-black text-white text-xs font-bold rounded-lg hover:bg-neutral-800"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
