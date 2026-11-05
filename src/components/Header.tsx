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
    <header className="sticky top-0 z-30 bg-[#171717] text-white border-b border-[#2d2d2d] shadow-sm">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        {/* Left Side: Hamburger Menu + Brand */}
        <div className="flex items-center gap-3 sm:gap-4">
          <button
            type="button"
            onClick={onOpenDrawer}
            className="p-2 -ml-2 text-neutral-300 hover:text-white hover:bg-neutral-800 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-white/40"
            aria-label="Open Navigation Menu"
          >
            <Menu className="w-5 h-5" />
          </button>

          {/* DRAGONQR Brand Prominently */}
          <button
            onClick={() => onNavigate('home')}
            className="flex items-center gap-3 text-left focus:outline-none focus:ring-2 focus:ring-white/40 rounded-lg p-1 transition-colors"
            aria-label="DRAGONQR Home"
          >
            <div className="w-9 h-9 rounded-lg bg-white text-black flex items-center justify-center font-black tracking-tighter text-lg shadow-sm border border-neutral-300 shrink-0">
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
              <span className="font-extrabold tracking-wider text-base sm:text-lg">
                DRAGONQR
              </span>
            </div>
          </button>
        </div>

        {/* Right Side: Navigation & Auth Account Action */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Desktop Quick Nav Tabs */}
          <nav className="hidden md:flex items-center gap-1 text-xs font-medium" aria-label="Desktop Navigation">
            <button
              type="button"
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
              type="button"
              onClick={() => onNavigate('history')}
              className={`px-3 py-1.5 rounded-md transition-colors flex items-center gap-1.5 ${
                activeTab === 'history'
                  ? 'bg-neutral-800 text-white font-semibold'
                  : 'text-neutral-400 hover:text-white hover:bg-neutral-800/50'
              }`}
            >
              <span>History</span>
              {historyCount > 0 && (
                <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-neutral-700 text-neutral-200 font-mono">
                  {historyCount}
                </span>
              )}
            </button>
            <button
              type="button"
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
              type="button"
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

          <div className="h-5 w-[1px] bg-neutral-800 hidden md:block mx-1" />

          {/* User Auth Action (Desktop & Mobile) */}
          {user ? (
            <button
              type="button"
              onClick={onOpenProfile}
              className="flex items-center gap-2 px-2.5 py-1.5 rounded-xl bg-black border border-neutral-700 hover:border-neutral-500 text-xs text-white transition-all shadow-xs group"
              title="View account profile"
            >
              {user.photoURL ? (
                <img
                  src={user.photoURL}
                  alt={user.displayName || 'User'}
                  className="w-6 h-6 rounded-lg object-cover border border-neutral-700"
                />
              ) : (
                <div className="w-6 h-6 rounded-lg bg-neutral-800 border border-neutral-700 flex items-center justify-center font-mono font-bold text-[11px] text-white">
                  {(user.displayName?.[0] || user.email?.[0] || 'U').toUpperCase()}
                </div>
              )}
              <span className="hidden sm:inline font-bold truncate max-w-[110px]">
                {user.displayName || user.email?.split('@')[0] || 'Account'}
              </span>
              <Cloud className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
            </button>
          ) : (
            <button
              type="button"
              onClick={onOpenAuth}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white hover:bg-neutral-200 text-black font-extrabold text-xs transition-all shadow-xs active:scale-[0.98]"
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
