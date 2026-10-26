/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { NavTab } from '../types';

interface HeaderProps {
  activeTab: NavTab;
  onNavigate: (tab: NavTab) => void;
}

export const Header: React.FC<HeaderProps> = ({ activeTab, onNavigate }) => {
  return (
    <header className="sticky top-0 z-30 bg-[#171717] text-white border-b border-[#2d2d2d] shadow-sm">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        {/* DRAGONQR Branding */}
        <button
          onClick={() => onNavigate('home')}
          className="flex items-center gap-3 text-left focus:outline-none focus:ring-2 focus:ring-white/40 rounded-lg p-1 transition-colors"
          aria-label="DRAGONQR Home"
        >
          <div className="w-9 h-9 rounded-lg bg-white text-black flex items-center justify-center font-black tracking-tighter text-lg shadow-sm border border-neutral-300">
            {/* Dragon stylized monogram */}
            <svg
              className="w-5 h-5 text-black"
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
            <div className="flex items-center gap-2">
              <span className="font-extrabold tracking-wider text-base sm:text-lg">DRAGONQR</span>
              <span className="hidden sm:inline-block text-[10px] font-mono uppercase px-1.5 py-0.5 rounded bg-neutral-800 text-neutral-300 border border-neutral-700">
                v1.0
              </span>
            </div>
            <div className="text-[11px] text-neutral-400 font-medium tracking-tight">
              Dragon Psycho QR Generator
            </div>
          </div>
        </button>

        {/* Desktop Quick Nav */}
        <nav className="hidden md:flex items-center gap-1 text-xs font-medium" aria-label="Desktop Navigation">
          <button
            onClick={() => onNavigate('home')}
            className={`px-3 py-1.5 rounded-md transition-colors ${
              activeTab === 'home'
                ? 'bg-neutral-800 text-white font-semibold'
                : 'text-neutral-400 hover:text-white hover:bg-neutral-800/50'
            }`}
          >
            Generator
          </button>
          <button
            onClick={() => onNavigate('history')}
            className={`px-3 py-1.5 rounded-md transition-colors ${
              activeTab === 'history'
                ? 'bg-neutral-800 text-white font-semibold'
                : 'text-neutral-400 hover:text-white hover:bg-neutral-800/50'
            }`}
          >
            History
          </button>
          <button
            onClick={() => onNavigate('donate')}
            className={`px-3 py-1.5 rounded-md transition-colors ${
              activeTab === 'donate'
                ? 'bg-neutral-800 text-white font-semibold'
                : 'text-neutral-400 hover:text-white hover:bg-neutral-800/50'
            }`}
          >
            Donate
          </button>
          <button
            onClick={() => onNavigate('dragon-psycho')}
            className={`px-3 py-1.5 rounded-md transition-colors ${
              activeTab === 'dragon-psycho'
                ? 'bg-neutral-800 text-white font-semibold'
                : 'text-neutral-400 hover:text-white hover:bg-neutral-800/50'
            }`}
          >
            Dragon Psycho
          </button>
        </nav>


      </div>
    </header>
  );
};
