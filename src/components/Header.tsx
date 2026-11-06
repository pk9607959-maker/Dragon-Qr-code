/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Menu, LogIn, User as UserIcon, Cloud } from 'lucide-react';
import { NavTab } from '../types';
import { useAuth } from '../context/AuthContext';

interface HeaderProps {
  activeTab: NavTab;
  onNavigate: (tab: NavTab) => void;
  onOpenDrawer: () => void;
  historyCount: number;
  onOpenAuth: () => void;
  onOpenProfile: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  onNavigate,
  onOpenDrawer,
  historyCount,
  onOpenAuth,
  onOpenProfile,
}) => {
  const { user } = useAuth();

  return (
    <header className="sticky top-0 z-30 bg-[#0F0F0F]/95 backdrop-blur-md text-white border-b border-[#262626] transition-all">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        {/* Left Side: Hamburger Menu + Brand */}
        <div className="flex items-center gap-3 sm:gap-4">
          <button
            type="button"
            onClick={onOpenDrawer}
            className="p-2 -ml-2 text-neutral-400 hover:text-white hover:bg-neutral-800/80 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-white/20"
            aria-label="Open Navigation Menu"
          >
            <Menu className="w-5 h-5" />
          </button>

          {/* DRAGONQR Brand Prominently */}
          <button
            onClick={() => onNavigate('home')}
            className="flex items-center gap-2.5 text-left focus:outline-none focus:ring-2 focus:ring-white/20 rounded-lg p-1 transition-all group"
            aria-label="DRAGONQR Home"
          >
            <div className="w-8 h-8 rounded-lg bg-white text-black flex items-center justify-center font-black tracking-tight text-base shadow-sm border border-neutral-300 shrink-0 group-hover:scale-105 transition-transform">
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
            <div className="flex items-baseline gap-1.5">
              <span className="font-extrabold tracking-wider text-base text-white">
                DRAGON QR
              </span>
            </div>
          </button>
        </div>

        {/* Right Side: Navigation & Auth Account Action */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Desktop Quick Nav Tabs */}
          <nav className="hidden md:flex items-center gap-1 text-xs font-semibold" aria-label="Desktop Navigation">
            <button
              type="button"
              onClick={() => onNavigate('home')}
              className={`px-3 py-1.5 rounded-lg transition-all ${
                activeTab === 'home'
                  ? 'bg-white text-black font-bold shadow-xs'
                  : 'text-neutral-400 hover:text-white hover:bg-neutral-800/50'
              }`}
            >
              Generator
            </button>
            <button
              type="button"
              onClick={() => onNavigate('history')}
              className={`px-3 py-1.5 rounded-lg transition-all flex items-center gap-1.5 ${
                activeTab === 'history'
                  ? 'bg-white text-black font-bold shadow-xs'
                  : 'text-neutral-400 hover:text-white hover:bg-neutral-800/50'
              }`}
            >
              <span>History</span>
              {historyCount > 0 && (
                <span className={`text-[10px] px-1.5 py-0.5 rounded-full font-mono font-bold ${
                  activeTab === 'history'
                    ? 'bg-black text-white'
                    : 'bg-neutral-800 text-neutral-300 border border-neutral-700'
                }`}>
                  {historyCount}
                </span>
              )}
            </button>
            <button
              type="button"
              onClick={() => onNavigate('donate')}
              className={`px-3 py-1.5 rounded-lg transition-all ${
                activeTab === 'donate'
                  ? 'bg-white text-black font-bold shadow-xs'
                  : 'text-neutral-400 hover:text-white hover:bg-neutral-800/50'
              }`}
            >
              Donate
            </button>
            <button
              type="button"
              onClick={() => onNavigate('dragon-psycho')}
              className={`px-3 py-1.5 rounded-lg transition-all ${
                activeTab === 'dragon-psycho'
                  ? 'bg-white text-black font-bold shadow-xs'
                  : 'text-neutral-400 hover:text-white hover:bg-neutral-800/50'
              }`}
            >
              Dragon Psycho
            </button>
          </nav>

          <div className="h-4 w-[1px] bg-neutral-800 hidden md:block mx-1" />

          {/* User Auth Action (Desktop & Mobile) */}
          {user ? (
            <button
              type="button"
              onClick={onOpenProfile}
              className="flex items-center gap-2 px-2.5 py-1.5 rounded-xl bg-neutral-900 border border-neutral-800 hover:border-neutral-600 text-xs text-white transition-all shadow-xs group"
              title="View account profile"
            >
              {user.photoURL ? (
                <img
                  src={user.photoURL}
                  alt={user.displayName || 'User'}
                  className="w-5 h-5 rounded-md object-cover border border-neutral-700"
                />
              ) : (
                <div className="w-5 h-5 rounded-md bg-neutral-800 border border-neutral-700 flex items-center justify-center font-mono font-bold text-[10px] text-white">
                  {(user.displayName?.[0] || user.email?.[0] || 'U').toUpperCase()}
                </div>
              )}
              <span className="hidden sm:inline font-semibold truncate max-w-[110px]">
                {user.displayName || user.email?.split('@')[0] || 'Account'}
              </span>
              <Cloud className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
            </button>
          ) : (
            <button
              type="button"
              onClick={onOpenAuth}
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-white hover:bg-neutral-100 text-black font-extrabold text-xs transition-all shadow-xs active:scale-[0.98]"
            >
              <LogIn className="w-3.5 h-3.5 text-black" />
              <span>Sign In</span>
            </button>
          )}
        </div>
      </div>
    </header>
  );
};
