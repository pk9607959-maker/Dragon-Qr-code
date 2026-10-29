/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import {
  X,
  Home,
  History,
  Heart,
  User,
  Youtube,
  Instagram,
  Facebook,
  Github,
} from 'lucide-react';
import { NavTab } from '../types';

interface NavDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  activeTab: NavTab;
  onNavigate: (tab: NavTab) => void;
  historyCount: number;
  onOpenLegalModal?: (modal: 'privacy' | 'terms' | 'about' | 'contact') => void;
}

export const NavDrawer: React.FC<NavDrawerProps> = ({
  isOpen,
  onClose,
  activeTab,
  onNavigate,
  historyCount,
}) => {
  if (!isOpen) return null;

  const handleNav = (tab: NavTab) => {
    onNavigate(tab);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/70 backdrop-blur-xs transition-opacity"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Drawer Panel */}
      <div className="relative w-full max-w-xs bg-[#171717] text-white h-full shadow-2xl flex flex-col z-10 border-r border-[#2d2d2d] animate-in slide-in-from-left duration-200">
        {/* Drawer Header */}
        <div className="p-5 border-b border-[#2d2d2d] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-white text-black flex items-center justify-center font-black">
              <svg
                className="w-4 h-4 text-black"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M12 2L2 7l10 5 10-5-10-5z" />
                <path d="M2 17l10 5 10-5" />
                <path d="M2 12l10 5 10-5" />
              </svg>
            </div>
            <div>
              <div className="font-extrabold text-sm tracking-wider">DRAGONQR</div>
              <div className="text-[10px] text-neutral-400 font-mono">Dragon Psycho Engine</div>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 text-neutral-400 hover:text-white rounded-lg hover:bg-neutral-800 transition-colors"
            aria-label="Close navigation menu"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation Items */}
        <div className="flex-1 overflow-y-auto p-4 space-y-6">
          <div className="space-y-1">
            <div className="text-[10px] font-bold uppercase tracking-wider text-neutral-500 px-3 mb-2">
              Main Menu
            </div>

            <button
              type="button"
              onClick={() => handleNav('home')}
              className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-xs font-semibold transition-all ${
                activeTab === 'home'
                  ? 'bg-white text-black font-bold shadow-xs'
                  : 'text-neutral-300 hover:bg-neutral-800/80 hover:text-white'
              }`}
            >
              <div className="flex items-center gap-3">
                <Home className="w-4 h-4" />
                <span>Home</span>
              </div>
            </button>

            <button
              type="button"
              onClick={() => handleNav('history')}
              className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-xs font-semibold transition-all ${
                activeTab === 'history'
                  ? 'bg-white text-black font-bold shadow-xs'
                  : 'text-neutral-300 hover:bg-neutral-800/80 hover:text-white'
              }`}
            >
              <div className="flex items-center gap-3">
                <History className="w-4 h-4" />
                <span>History</span>
              </div>
              {historyCount > 0 && (
                <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-neutral-800 text-neutral-200 border border-neutral-700 font-mono">
                  {historyCount}
                </span>
              )}
            </button>

            <button
              type="button"
              onClick={() => handleNav('donate')}
              className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-xs font-semibold transition-all ${
                activeTab === 'donate'
                  ? 'bg-white text-black font-bold shadow-xs'
                  : 'text-neutral-300 hover:bg-neutral-800/80 hover:text-white'
              }`}
            >
              <div className="flex items-center gap-3">
                <Heart className="w-4 h-4" />
                <span>Donate</span>
              </div>
            </button>

            <button
              type="button"
              onClick={() => handleNav('dragon-psycho')}
              className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-xs font-semibold transition-all ${
                activeTab === 'dragon-psycho'
                  ? 'bg-white text-black font-bold shadow-xs'
                  : 'text-neutral-300 hover:bg-neutral-800/80 hover:text-white'
              }`}
            >
              <div className="flex items-center gap-3">
                <User className="w-4 h-4" />
                <span>Dragon Psycho</span>
              </div>
            </button>
          </div>

          {/* Social Channels in Drawer */}
          <div className="pt-4 border-t border-neutral-800 space-y-2">
            <div className="text-[10px] font-bold uppercase tracking-wider text-neutral-500 px-3">
              Official Channels
            </div>
            <div className="grid grid-cols-2 gap-2 px-1">
              <a
                href="https://www.youtube.com/@Dragon_music3e"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 p-2 rounded-lg bg-neutral-900 border border-neutral-800 hover:border-neutral-600 text-[11px] text-neutral-300 hover:text-white transition-colors"
              >
                <Youtube className="w-3.5 h-3.5 text-red-500" />
                <span className="truncate">YouTube</span>
              </a>
              <a
                href="https://www.instagram.com/dragon__prince_458?xtok=MXNuaDZkMXNxZG5nMg=="
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 p-2 rounded-lg bg-neutral-900 border border-neutral-800 hover:border-neutral-600 text-[11px] text-neutral-300 hover:text-white transition-colors"
              >
                <Instagram className="w-3.5 h-3.5 text-pink-500" />
                <span className="truncate">Instagram</span>
              </a>
              <a
                href="https://www.facebook.com/share/1CLjxKeFFZ/"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 p-2 rounded-lg bg-neutral-900 border border-neutral-800 hover:border-neutral-600 text-[11px] text-neutral-300 hover:text-white transition-colors"
              >
                <Facebook className="w-3.5 h-3.5 text-blue-500" />
                <span className="truncate">Facebook</span>
              </a>
              <a
                href="https://github.com/pk9607959-maker"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 p-2 rounded-lg bg-neutral-900 border border-neutral-800 hover:border-neutral-600 text-[11px] text-neutral-300 hover:text-white transition-colors"
              >
                <Github className="w-3.5 h-3.5" />
                <span className="truncate">GitHub</span>
              </a>
            </div>
          </div>
        </div>

        {/* Drawer Footer */}
        <div className="p-4 border-t border-[#2d2d2d] bg-black/40 text-[10px] text-neutral-500 font-mono flex items-center justify-between">
          <span>Zero Scan Analytics</span>
          <span>v1.0 Free</span>
        </div>
      </div>
    </div>
  );
};
