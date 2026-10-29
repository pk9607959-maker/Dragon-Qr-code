/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import {
  ArrowLeft,
  Home,
  Mail,
  Send,
  Youtube,
  Instagram,
  Facebook,
  Github,
  ExternalLink,
  CheckCircle2,
  Clock,
  MessageSquare,
} from 'lucide-react';
import { NavTab } from '../../types';

interface PageProps {
  onNavigate: (tab: NavTab) => void;
}

export const ContactUsPage: React.FC<PageProps> = ({ onNavigate }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;

    // Trigger user's mail client as well as displaying confirmation
    const mailtoUrl = `mailto:contact@dragonpsycho.dev?subject=${encodeURIComponent(
      subject || 'Inquiry regarding Dragon Psycho QR'
    )}&body=${encodeURIComponent(
      `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`
    )}`;

    window.location.href = mailtoUrl;
    setIsSubmitted(true);
  };

  const officialChannels = [
    {
      name: 'YouTube',
      handle: '@Dragon_music3e',
      url: 'https://www.youtube.com/@Dragon_music3e',
      icon: <Youtube className="w-5 h-5" />,
      desc: 'Music & Video Releases',
    },
    {
      name: 'Instagram',
      handle: '@dragon__prince_458',
      url: 'https://www.instagram.com/dragon__prince_458?xtok=MXNuaDZkMXNxZG5nMg==',
      icon: <Instagram className="w-5 h-5" />,
      desc: 'Direct Messages & Updates',
    },
    {
      name: 'Facebook',
      handle: 'Dragon Psycho',
      url: 'https://www.facebook.com/share/1CLjxKeFFZ/',
      icon: <Facebook className="w-5 h-5" />,
      desc: 'Community Announcements',
    },
    {
      name: 'GitHub',
      handle: 'pk9607959-maker',
      url: 'https://github.com/pk9607959-maker',
      icon: <Github className="w-5 h-5" />,
      desc: 'Open Source Code & Issues',
    },
  ];

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
          <span className="text-black font-bold">Contact Us</span>
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

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        {/* Left Side: Contact Form */}
        <div className="md:col-span-7 bg-white border border-[#E3E3E3] rounded-2xl p-6 sm:p-8 shadow-xs space-y-6">
          <div className="border-b border-neutral-200 pb-5">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-neutral-900 text-white flex items-center justify-center shadow-xs">
                <Mail className="w-5 h-5" />
              </div>
              <div>
                <h1 className="text-xl font-black text-neutral-900 tracking-tight">Contact Us</h1>
                <p className="text-xs text-neutral-500 font-mono mt-0.5">
                  Direct Inquiries & Developer Support
                </p>
              </div>
            </div>
          </div>

          {isSubmitted ? (
            <div className="p-6 rounded-xl bg-neutral-50 border border-neutral-200 text-center space-y-3">
              <div className="w-12 h-12 rounded-full bg-black text-white flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <h2 className="text-base font-bold text-neutral-900">Message Prepared</h2>
              <p className="text-xs text-neutral-600 max-w-sm mx-auto leading-relaxed">
                Your email client was invoked with your inquiry to <span className="font-mono font-bold text-black">contact@dragonpsycho.dev</span>. If your client did not launch automatically, feel free to send an email directly.
              </p>
              <button
                type="button"
                onClick={() => setIsSubmitted(false)}
                className="mt-2 text-xs font-semibold text-black underline underline-offset-4 hover:text-neutral-600"
              >
                Send another message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <div>
                <label className="block font-bold text-neutral-800 mb-1">Your Name</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. John Doe"
                  className="w-full px-3.5 py-2.5 rounded-lg border border-neutral-300 focus:outline-hidden focus:border-black text-xs transition-colors"
                />
              </div>

              <div>
                <label className="block font-bold text-neutral-800 mb-1">Your Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="john@example.com"
                  className="w-full px-3.5 py-2.5 rounded-lg border border-neutral-300 focus:outline-hidden focus:border-black text-xs transition-colors"
                />
              </div>

              <div>
                <label className="block font-bold text-neutral-800 mb-1">Subject</label>
                <input
                  type="text"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  placeholder="Feature request, feedback, or business inquiry"
                  className="w-full px-3.5 py-2.5 rounded-lg border border-neutral-300 focus:outline-hidden focus:border-black text-xs transition-colors"
                />
              </div>

              <div>
                <label className="block font-bold text-neutral-800 mb-1">Message *</label>
                <textarea
                  rows={4}
                  required
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Write your message here..."
                  className="w-full px-3.5 py-2.5 rounded-lg border border-neutral-300 focus:outline-hidden focus:border-black text-xs transition-colors resize-y"
                />
              </div>

              <button
                type="submit"
                className="w-full flex items-center justify-center gap-2 py-3 px-4 bg-black hover:bg-neutral-800 text-white font-bold rounded-xl transition-all shadow-xs"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Send Direct Inquiry</span>
              </button>
            </form>
          )}
        </div>

        {/* Right Side: Channel Info */}
        <div className="md:col-span-5 space-y-4">
          <div className="bg-[#171717] border border-[#2d2d2d] rounded-2xl p-6 text-white space-y-4 shadow-sm">
            <div>
              <div className="text-[10px] font-mono text-neutral-400 uppercase tracking-wider">
                Direct Email
              </div>
              <div className="text-sm font-mono font-bold text-white mt-1 break-all select-all bg-black/50 p-2.5 rounded-lg border border-neutral-800">
                contact@dragonpsycho.dev
              </div>
            </div>

            <div className="flex items-start gap-2.5 pt-2 border-t border-neutral-800 text-xs text-neutral-400">
              <Clock className="w-4 h-4 text-neutral-300 shrink-0 mt-0.5" />
              <div>
                <div className="font-bold text-white">Estimated Response Time</div>
                <div>Usually within 24 to 48 hours for developer and privacy inquiries.</div>
              </div>
            </div>
          </div>

          {/* Social Channels List */}
          <div className="bg-white border border-[#E3E3E3] rounded-2xl p-5 shadow-xs space-y-3">
            <h2 className="text-xs font-bold uppercase tracking-wider text-neutral-500">
              Official Channels
            </h2>
            <div className="space-y-2">
              {officialChannels.map((c) => (
                <a
                  key={c.name}
                  href={c.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-2.5 rounded-xl border border-neutral-200 hover:border-black hover:bg-neutral-50 transition-colors group"
                >
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-lg bg-neutral-100 group-hover:bg-black group-hover:text-white flex items-center justify-center text-neutral-800 transition-colors">
                      {c.icon}
                    </div>
                    <div>
                      <div className="text-xs font-bold text-neutral-900">{c.name}</div>
                      <div className="text-[10px] text-neutral-500 font-mono truncate max-w-[140px]">
                        {c.handle}
                      </div>
                    </div>
                  </div>
                  <ExternalLink className="w-3.5 h-3.5 text-neutral-400 group-hover:text-black transition-colors" />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Quick Links to Other Dedicated Pages */}
      <div className="bg-white border border-[#E3E3E3] rounded-2xl p-6 shadow-xs">
        <div className="text-xs font-bold text-neutral-500 uppercase tracking-wider mb-3">
          Other Dragon Psycho Pages
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          <button
            type="button"
            onClick={() => onNavigate('privacy')}
            className="p-2.5 rounded-lg border border-neutral-200 hover:border-black text-xs font-semibold text-neutral-800 hover:bg-neutral-50 transition-colors text-center"
          >
            Privacy Policy &rarr;
          </button>
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
        </div>
      </div>
    </div>
  );
};
