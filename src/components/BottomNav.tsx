/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Home, Heart, History, User } from 'lucide-react';
import { NavTab } from '../types';

interface BottomNavProps {
  activeTab: NavTab;
  onNavigate: (tab: NavTab) => void;
  historyCount?: number;
}

export const BottomNav: React.FC<BottomNavProps> = ({
  activeTab,
  onNavigate,
  historyCount = 0,
}) => {
  const navItems: { id: NavTab; label: string; icon: React.ReactNode; badge?: number }[] = [
    {
      id: 'home',
      label: 'Home',
      icon: <Home className="w-5 h-5" />,
    },
    {
      id: 'donate',
      label: 'Donate',
      icon: <Heart className="w-5 h-5" />,
    },
    {
      id: 'history',
      label: 'History',
      icon: <History className="w-5 h-5" />,
      badge: historyCount > 0 ? historyCount : undefined,
    },
    {
      id: 'dragon-psycho',
      label: 'Dragon Psycho',
      icon: <User className="w-5 h-5" />,
    },
  ];

  return (
    <nav
      className="fixed bottom-0 left-0 right-0 z-40 bg-[#171717] border-t border-[#2d2d2d] text-white shadow-2xl safe-area-pb"
      aria-label="Bottom Global Navigation"
    >
      <div className="max-w-md mx-auto px-2 flex items-center justify-around h-16">
        {navItems.map((item) => {
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className={`flex-1 flex flex-col items-center justify-center py-1.5 px-1 rounded-xl transition-all relative ${
                isActive
                  ? 'text-white font-semibold'
                  : 'text-neutral-400 hover:text-neutral-200 focus:text-neutral-200'
              }`}
              aria-current={isActive ? 'page' : undefined}
            >
              <div
                className={`p-1 rounded-lg transition-transform ${
                  isActive ? 'bg-neutral-800 scale-110 text-white' : ''
                }`}
              >
                {item.icon}
                {item.badge !== undefined && (
                  <span className="absolute top-1.5 right-1/2 translate-x-4 bg-white text-black text-[10px] font-bold px-1.5 py-0.2 rounded-full min-w-4 text-center">
                    {item.badge > 99 ? '99+' : item.badge}
                  </span>
                )}
              </div>
              <span className={`text-[11px] mt-0.5 tracking-tight ${isActive ? 'font-bold text-white' : 'font-medium'}`}>
                {item.label}
              </span>
              {isActive && (
                <span className="w-6 h-0.5 bg-white rounded-full mt-0.5"></span>
              )}
            </button>
          );
        })}
      </div>
    </nav>
  );
};
