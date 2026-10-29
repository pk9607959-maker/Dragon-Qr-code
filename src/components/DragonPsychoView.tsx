/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import {
  Shield,
  FileText,
  AlertTriangle,
  Info,
  Mail,
  ArrowRight,
  ArrowLeft,
  Home,
  ExternalLink,
  Youtube,
  Instagram,
  Facebook,
  Github,
  CheckCircle,
} from 'lucide-react';
import { NavTab } from '../types';

interface DragonPsychoViewProps {
  onNavigate: (tab: NavTab) => void;
}

export const DragonPsychoView: React.FC<DragonPsychoViewProps> = ({ onNavigate }) => {
  // The five dedicated pages requested by the user
  const directoryLinks: {
    number: string;
    title: string;
    tab: NavTab;
    description: string;
    icon: React.ReactNode;
  }[] = [
    {
      number: '1',
      title: 'Privacy Policy',
      tab: 'privacy',
      description: 'Zero scan analytics guarantee, no IP tracking, and 100% device-local storage.',
      icon: <Shield className="w-5 h-5 text-neutral-900" />,
    },
    {
      number: '2',
      title: 'Terms and Conditions',
      tab: 'terms',
      description: 'Acceptable use guidelines, prohibited payloads, and service responsibilities.',
      icon: <FileText className="w-5 h-5 text-neutral-900" />,
    },
    {
      number: '3',
      title: 'Disclaimer',
      tab: 'disclaimer',
      description: 'Scanner hardware variances, mandatory pre-print testing, and third-party links.',
      icon: <AlertTriangle className="w-5 h-5 text-neutral-900" />,
    },
    {
      number: '4',
      title: 'About Us',
      tab: 'about-us',
      description: 'The Dragon Psycho manifesto: anti-surveillance, pure utility, and monochrome design.',
      icon: <Info className="w-5 h-5 text-neutral-900" />,
    },
    {
      number: '5',
      title: 'Contact Us',
      tab: 'contact-us',
      description: 'Direct developer support at contact@dragonpsycho.dev and inquiry form.',
      icon: <Mail className="w-5 h-5 text-neutral-900" />,
    },
  ];

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
    <div className="max-w-4xl mx-auto space-y-6 animate-in fade-in duration-200">
      {/* Top Breadcrumb & Return to Home */}
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
          <span className="text-black font-bold">Dragon Psycho</span>
        </div>

        <button
          type="button"
          onClick={() => onNavigate('home')}
          className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-black hover:bg-neutral-800 text-xs font-semibold text-white transition-colors shadow-xs"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          Back to Generator
        </button>
      </div>

      {/* 5 CLICKABLE LINKS NEAR THE TOP */}
      <div className="bg-white border border-[#E3E3E3] rounded-2xl p-6 sm:p-8 shadow-xs space-y-5">
        <div className="border-b border-neutral-200 pb-4">
          <div className="flex items-center justify-between flex-wrap gap-2">
            <div>
              <h2 className="text-lg font-black text-neutral-900 tracking-tight">
                Dragon Psycho Directory
              </h2>
              <p className="text-xs text-neutral-500 mt-0.5">
                Select any section below to open its dedicated full page:
              </p>
            </div>
            <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-neutral-100 text-neutral-700 border border-neutral-200 font-bold">
              5 Dedicated Pages
            </span>
          </div>
        </div>

        {/* The 5 Clickable Links List */}
        <div className="space-y-2.5">
          {directoryLinks.map((item) => (
            <button
              key={item.tab}
              type="button"
              onClick={() => onNavigate(item.tab)}
              className="w-full group flex items-center justify-between p-4 rounded-xl border border-neutral-200 hover:border-black bg-neutral-50 hover:bg-white text-left transition-all duration-150 shadow-xs hover:shadow-sm"
            >
              <div className="flex items-start sm:items-center gap-3.5">
                {/* Number Badge */}
                <div className="w-8 h-8 rounded-lg bg-white group-hover:bg-black group-hover:text-white border border-neutral-200 group-hover:border-black flex items-center justify-center font-mono font-black text-xs text-neutral-800 transition-colors shrink-0">
                  {item.number}
                </div>

                <div className="space-y-0.5">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-bold text-neutral-900 group-hover:text-black">
                      {item.title}
                    </span>
                  </div>
                  <p className="text-xs text-neutral-500 group-hover:text-neutral-700 line-clamp-1">
                    {item.description}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2 shrink-0 pl-3">
                <span className="hidden sm:inline text-xs font-semibold text-neutral-400 group-hover:text-black transition-colors font-mono">
                  Open Page
                </span>
                <div className="w-7 h-7 rounded-md bg-white group-hover:bg-neutral-100 border border-neutral-200 flex items-center justify-center text-neutral-600 group-hover:text-black transition-colors">
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

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
    </div>
  );
};
