/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Youtube, Instagram, Facebook, Github, ExternalLink, ShieldCheck } from 'lucide-react';

interface FooterProps {
  onOpenLegalModal?: (modal: 'privacy' | 'terms' | 'about' | 'contact') => void;
}

export const Footer: React.FC<FooterProps> = () => {
  const socialLinks = [
    {
      name: 'YouTube',
      url: 'https://www.youtube.com/@Dragon_music3e',
      icon: <Youtube className="w-4 h-4" />,
      handle: '@Dragon_music3e',
    },
    {
      name: 'Instagram',
      url: 'https://www.instagram.com/dragon__prince_458?xtok=MXNuaDZkMXNxZG5nMg==',
      icon: <Instagram className="w-4 h-4" />,
      handle: '@dragon__prince_458',
    },
    {
      name: 'Facebook',
      url: 'https://www.facebook.com/share/1CLjxKeFFZ/',
      icon: <Facebook className="w-4 h-4" />,
      handle: 'Dragon Psycho',
    },
    {
      name: 'GitHub',
      url: 'https://github.com/pk9607959-maker',
      icon: <Github className="w-4 h-4" />,
      handle: 'pk9607959-maker',
    },
  ];

  return (
    <footer className="w-full bg-[#171717] text-white border-t border-[#2d2d2d] py-6">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 flex flex-wrap items-center justify-center gap-3">
        {socialLinks.map((s) => (
          <a
            key={s.name}
            href={s.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-black border border-[#2d2d2d] hover:border-neutral-400 text-xs text-neutral-300 hover:text-white transition-all shadow-xs"
          >
            {s.icon}
            <span className="font-semibold">{s.name}</span>
            <ExternalLink className="w-3 h-3 text-neutral-500" />
          </a>
        ))}
      </div>
    </footer>
  );
};
