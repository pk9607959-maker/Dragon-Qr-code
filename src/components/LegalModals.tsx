/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Shield, FileText, Info, Mail, X, ExternalLink, Youtube, Instagram, Facebook, Github } from 'lucide-react';

interface LegalModalsProps {
  activeModal: 'privacy' | 'terms' | 'about' | 'contact' | null;
  onClose: () => void;
}

export const LegalModals: React.FC<LegalModalsProps> = ({ activeModal, onClose }) => {
  if (!activeModal) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[85vh] flex flex-col border border-neutral-200 shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        {/* Header */}
        <div className="p-5 border-b border-neutral-200 flex items-center justify-between bg-neutral-50">
          <div className="flex items-center gap-2.5">
            {activeModal === 'privacy' && <Shield className="w-5 h-5 text-neutral-900" />}
            {activeModal === 'terms' && <FileText className="w-5 h-5 text-neutral-900" />}
            {activeModal === 'about' && <Info className="w-5 h-5 text-neutral-900" />}
            {activeModal === 'contact' && <Mail className="w-5 h-5 text-neutral-900" />}
            <h2 className="text-sm font-bold text-neutral-900">
              {activeModal === 'privacy' && 'DRAGONQR Privacy Policy'}
              {activeModal === 'terms' && 'DRAGONQR Terms and Conditions'}
              {activeModal === 'about' && 'About Dragon Psycho'}
              {activeModal === 'contact' && 'Contact & Developer Inquiries'}
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="text-neutral-500 hover:text-black p-1 rounded-lg hover:bg-neutral-200/60 transition-colors"
            aria-label="Close Modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 overflow-y-auto space-y-4 text-xs text-neutral-700 leading-relaxed">
          {activeModal === 'privacy' && (
            <>
              <p className="font-semibold text-neutral-900">Effective Date: October 2026</p>
              <div>
                <h3 className="font-bold text-neutral-900 mb-1">1. Absolute Zero Scan Analytics</h3>
                <p>
                  Dragon Psycho QR Generator does not monitor, record, store, or sell QR code scans. When a dynamic QR code redirect is resolved, our server does not record IP addresses, device types, operating systems, coordinates, or scan timestamps.
                </p>
              </div>
              <div>
                <h3 className="font-bold text-neutral-900 mb-1">2. Device-Local Storage</h3>
                <p>
                  Your generated QR history is stored exclusively on your device using IndexedDB and LocalStorage. Sensitive data like Wi-Fi passwords and personal messages remain strictly on your client machine.
                </p>
              </div>
              <div>
                <h3 className="font-bold text-neutral-900 mb-1">3. Dynamic QR Management</h3>
                <p>
                  For dynamic QR codes, only the destination URL and a cryptographically hashed management token are retained to allow edits. Plaintext management tokens are never stored on the server.
                </p>
              </div>
            </>
          )}

          {activeModal === 'terms' && (
            <>
              <p className="font-semibold text-neutral-900">Last Revised: October 2026</p>
              <div>
                <h3 className="font-bold text-neutral-900 mb-1">1. Acceptable Use</h3>
                <p>
                  You agree to use DRAGONQR for lawful purposes only. Generating QR codes containing malware, phishing links, fraud schemes, or abusive content is strictly forbidden and subject to instant link deactivation.
                </p>
              </div>
              <div>
                <h3 className="font-bold text-neutral-900 mb-1">2. Content Responsibility</h3>
                <p>
                  You are solely responsible for testing and verifying the contents of your QR code before printing or distributing it. Always conduct test scans on physical camera devices.
                </p>
              </div>
              <div>
                <h3 className="font-bold text-neutral-900 mb-1">3. Disclaimer of Warranty</h3>
                <p>
                  DRAGONQR is provided free of charge on an "AS IS" basis without warranties of uninterrupted uptime or error-free performance.
                </p>
              </div>
            </>
          )}

          {activeModal === 'about' && (
            <>
              <div>
                <h3 className="font-bold text-neutral-900 mb-1">Dragon Psycho</h3>
                <p>
                  Dragon Psycho QR Generator (DRAGONQR) was engineered as a high-performance, minimalist alternative to commercial QR services that inject intrusive ads, force expensive subscriptions, or harvest scanning analytics.
                </p>
              </div>
              <div>
                <h3 className="font-bold text-neutral-900 mb-1">Open Source & Free</h3>
                <p>
                  Built with React, TypeScript, Vite, and Tailwind CSS. All features including high-resolution vector exports, custom styling, and dynamic redirect tokens are 100% free forever without user registration.
                </p>
              </div>
            </>
          )}

          {activeModal === 'contact' && (
            <>
              <p>
                Have questions, bug reports, or feature requests? Reach out to the creator directly:
              </p>
              <div className="p-3 bg-neutral-100 rounded-lg border border-neutral-200 font-mono text-neutral-900">
                contact@dragonpsycho.dev
              </div>
              <div className="pt-2">
                <div className="font-bold text-neutral-900 mb-2">Connect across official channels:</div>
                <div className="grid grid-cols-2 gap-2">
                  <a
                    href="https://www.youtube.com/@Dragon_music3e"
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-2 p-2 rounded-lg bg-neutral-50 border border-neutral-200 hover:bg-neutral-100 text-[11px]"
                  >
                    <Youtube className="w-4 h-4 text-red-600" />
                    <span>YouTube Channel</span>
                  </a>
                  <a
                    href="https://www.instagram.com/dragon__prince_458?xtok=MXNuaDZkMXNxZG5nMg=="
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-2 p-2 rounded-lg bg-neutral-50 border border-neutral-200 hover:bg-neutral-100 text-[11px]"
                  >
                    <Instagram className="w-4 h-4 text-pink-600" />
                    <span>Instagram Profile</span>
                  </a>
                  <a
                    href="https://www.facebook.com/share/1CLjxKeFFZ/"
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-2 p-2 rounded-lg bg-neutral-50 border border-neutral-200 hover:bg-neutral-100 text-[11px]"
                  >
                    <Facebook className="w-4 h-4 text-blue-600" />
                    <span>Facebook Page</span>
                  </a>
                  <a
                    href="https://github.com/pk9607959-maker"
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-2 p-2 rounded-lg bg-neutral-50 border border-neutral-200 hover:bg-neutral-100 text-[11px]"
                  >
                    <Github className="w-4 h-4 text-neutral-900" />
                    <span>GitHub Repos</span>
                  </a>
                </div>
              </div>
            </>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-neutral-200 bg-neutral-50 flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 bg-black text-white text-xs font-bold rounded-lg hover:bg-neutral-800 transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
