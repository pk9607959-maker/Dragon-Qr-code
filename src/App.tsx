/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { NavDrawer } from './components/NavDrawer';
import { GeneratorWorkspace } from './components/GeneratorWorkspace';
import { HistoryView } from './components/HistoryView';
import { DonateView } from './components/DonateView';
import { DragonPsychoView } from './components/DragonPsychoView';
import { PrivacyPolicyPage } from './components/pages/PrivacyPolicyPage';
import { TermsPage } from './components/pages/TermsPage';
import { DisclaimerPage } from './components/pages/DisclaimerPage';
import { AboutUsPage } from './components/pages/AboutUsPage';
import { ContactUsPage } from './components/pages/ContactUsPage';
import { RefundPolicyPage } from './components/pages/RefundPolicyPage';
import { Footer } from './components/Footer';

import { NavTab, QrStyleOptions, SavedQrRecord } from './types';
import { QrContentType, QrFormData } from './utils/qrPayload';
import {
  getAllHistory,
  saveHistoryEntry,
  deleteHistoryEntry,
  clearAllHistory,
} from './utils/storage';

const DEFAULT_STYLE: QrStyleOptions = {
  fgColor: '#171717',
  bgColor: '#ffffff',
  dotType: 'rounded',
  cornerSquareType: 'extra-rounded',
  cornerDotType: 'dot',
  margin: 10,
  errorCorrectionLevel: 'M',
  resolution: 1024,
  logoSize: 0.22,
};

const DEFAULT_FORM: QrFormData = {
  type: 'url',
  label: '',
  url: 'https://dragonpsycho.com',
  text: '',
  wifi: { ssid: '', security: 'WPA', password: '', hidden: false },
  email: { email: '', subject: '', body: '' },
  phone: '',
  sms: { phoneNumber: '', message: '' },
  whatsapp: { phoneNumber: '', message: '' },
  location: { latitude: '', longitude: '', query: '' },
  event: { title: '', startDateTime: '', endDateTime: '', location: '', description: '' },
  social: { platform: 'youtube', urlOrHandle: '@Dragon_music3e' },
};

export default function App() {
  const [activeTab, setActiveTab] = useState<NavTab>('home');
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  // QR state
  const [selectedType, setSelectedType] = useState<QrContentType>('url');
  const [formData, setFormData] = useState<QrFormData>(DEFAULT_FORM);
  const [isDynamic, setIsDynamic] = useState<boolean>(false);
  const [styleOptions, setStyleOptions] = useState<QrStyleOptions>(DEFAULT_STYLE);
  const [historyRecords, setHistoryRecords] = useState<SavedQrRecord[]>([]);

  // Synchronize URL hash with page state for true multi-page navigation feel
  useEffect(() => {
    const parseHash = () => {
      const hash = window.location.hash.replace(/^#/, '');
      if (hash === 'privacy') setActiveTab('privacy');
      else if (hash === 'terms') setActiveTab('terms');
      else if (hash === 'disclaimer') setActiveTab('disclaimer');
      else if (hash === 'about-us' || hash === 'about') setActiveTab('about-us');
      else if (hash === 'contact-us' || hash === 'contact') setActiveTab('contact-us');
      else if (hash === 'refund' || hash === 'refunds' || hash === 'returns') setActiveTab('refund');
      else if (hash === 'dragon-psycho') setActiveTab('dragon-psycho');
      else if (hash === 'history') setActiveTab('history');
      else if (hash === 'donate') setActiveTab('donate');
      else if (hash === 'home') setActiveTab('home');
    };

    parseHash();
    window.addEventListener('hashchange', parseHash);
    return () => window.removeEventListener('hashchange', parseHash);
  }, []);

  const handleNavigate = (tab: NavTab) => {
    setActiveTab(tab);
    window.location.hash = `#${tab}`;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Load history from IndexedDB on startup
  useEffect(() => {
    getAllHistory().then((data) => {
      setHistoryRecords(data);
    });
  }, []);

  const handleSelectType = (type: QrContentType) => {
    setSelectedType(type);
    setFormData((prev) => ({
      ...prev,
      type,
    }));
    if (type !== 'url') {
      setIsDynamic(false);
    }
  };

  const handleResetForm = () => {
    setFormData({
      ...DEFAULT_FORM,
      type: selectedType,
      url: '',
      text: '',
    });
    setIsDynamic(false);
  };

  // Save to IndexedDB history
  const handleSaveToHistory = async (previewDataUrl: string) => {
    const newRecord: SavedQrRecord = {
      id: crypto.randomUUID ? crypto.randomUUID() : String(Date.now()),
      label: formData.label || `${formData.type.toUpperCase()} QR`,
      contentType: formData.type,
      formData: { ...formData },
      styleOptions: { ...styleOptions },
      isDynamic,
      previewDataUrl,
      createdAt: new Date().toISOString(),
    };

    await saveHistoryEntry(newRecord);
    setHistoryRecords((prev) => [newRecord, ...prev]);
  };

  const handleDynamicCreated = async (record: SavedQrRecord) => {
    await saveHistoryEntry(record);
    setHistoryRecords((prev) => [record, ...prev]);
  };

  const handleReopen = (record: SavedQrRecord) => {
    setSelectedType(record.contentType);
    setFormData(record.formData);
    setStyleOptions(record.styleOptions);
    setIsDynamic(record.isDynamic);
    handleNavigate('home');
  };

  const handleDeleteHistory = async (id: string) => {
    await deleteHistoryEntry(id);
    setHistoryRecords((prev) => prev.filter((r) => r.id !== id));
  };

  const handleClearAllHistory = async () => {
    await clearAllHistory();
    setHistoryRecords([]);
  };

  const handleUpdateRecord = async (updated: SavedQrRecord) => {
    await saveHistoryEntry(updated);
    setHistoryRecords((prev) =>
      prev.map((r) => (r.id === updated.id ? updated : r))
    );
  };

  return (
    <div className="min-h-screen bg-[#F5F5F5] text-[#222222] flex flex-col font-sans selection:bg-neutral-900 selection:text-white">
      {/* 1. HEADER with left hamburger menu and prominent DRAGONQR brand */}
      <Header
        activeTab={activeTab}
        onNavigate={handleNavigate}
        onOpenDrawer={() => setIsDrawerOpen(true)}
        historyCount={historyRecords.length}
      />

      {/* Slide-over Navigation Drawer */}
      <NavDrawer
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        activeTab={activeTab}
        onNavigate={handleNavigate}
        historyCount={historyRecords.length}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-6xl w-full mx-auto px-4 sm:px-6 py-6 sm:py-8">
        {/* 2. MAIN GENERATOR WORKSPACE: Exact Hand-Drawn Two-Column Layout */}
        {activeTab === 'home' && (
          <GeneratorWorkspace
            formData={formData}
            onChangeFormData={setFormData}
            onResetForm={handleResetForm}
            selectedType={selectedType}
            onSelectType={handleSelectType}
            isDynamic={isDynamic}
            onToggleDynamic={setIsDynamic}
            styleOptions={styleOptions}
            onChangeStyleOptions={setStyleOptions}
            onSaveToHistory={handleSaveToHistory}
            onDynamicCreated={handleDynamicCreated}
          />
        )}

        {/* DONATE VIEW */}
        {activeTab === 'donate' && (
          <DonateView onBackToGenerator={() => handleNavigate('home')} />
        )}

        {/* HISTORY VIEW */}
        {activeTab === 'history' && (
          <HistoryView
            records={historyRecords}
            onReopen={handleReopen}
            onDelete={handleDeleteHistory}
            onClearAll={handleClearAllHistory}
            onUpdateRecord={handleUpdateRecord}
          />
        )}

        {/* DRAGON PSYCHO DIRECTORY VIEW */}
        {activeTab === 'dragon-psycho' && (
          <DragonPsychoView onNavigate={handleNavigate} />
        )}

        {/* DEDICATED SEPARATE PAGES */}
        {activeTab === 'privacy' && (
          <PrivacyPolicyPage onNavigate={handleNavigate} />
        )}

        {activeTab === 'terms' && (
          <TermsPage onNavigate={handleNavigate} />
        )}

        {activeTab === 'disclaimer' && (
          <DisclaimerPage onNavigate={handleNavigate} />
        )}

        {activeTab === 'about-us' && (
          <AboutUsPage onNavigate={handleNavigate} />
        )}

        {activeTab === 'contact-us' && (
          <ContactUsPage onNavigate={handleNavigate} />
        )}

        {activeTab === 'refund' && (
          <RefundPolicyPage onNavigate={handleNavigate} />
        )}
      </main>

      {/* 8. FOOTER with Owner Social Media Links */}
      <Footer />
    </div>
  );
}
