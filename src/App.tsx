/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useMemo } from 'react';
import { Header } from './components/Header';
import { BottomNav } from './components/BottomNav';
import { FormFields } from './components/FormFields';
import { StylingPanel } from './components/StylingPanel';
import { QrPreview } from './components/QrPreview';
import { HistoryView } from './components/HistoryView';
import { DonateView } from './components/DonateView';
import { DragonPsychoView } from './components/DragonPsychoView';

import { NavTab, QrStyleOptions, SavedQrRecord } from './types';
import {
  QrContentType,
  QrFormData,
  formatQrPayload,
  validateQrFormData,
} from './utils/qrPayload';
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
  const [selectedType, setSelectedType] = useState<QrContentType>('url');
  const [formData, setFormData] = useState<QrFormData>(DEFAULT_FORM);
  const [isDynamic, setIsDynamic] = useState<boolean>(false);
  const [styleOptions, setStyleOptions] = useState<QrStyleOptions>(DEFAULT_STYLE);
  const [historyRecords, setHistoryRecords] = useState<SavedQrRecord[]>([]);

  // Load history on mount
  useEffect(() => {
    getAllHistory().then((data) => {
      setHistoryRecords(data);
    });
  }, []);

  // Update formData when type changes
  const handleSelectType = (type: QrContentType) => {
    setSelectedType(type);
    setFormData((prev) => ({
      ...prev,
      type,
    }));
    // If not URL or Social, force static mode
    if (type !== 'url' && type !== 'social') {
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

  // Compute validation and payload
  const validation = useMemo(() => {
    return validateQrFormData(formData);
  }, [formData]);

  const payload = useMemo(() => {
    return formatQrPayload(formData);
  }, [formData]);

  // Save successful generation to history
  const handleSaveToHistory = async (previewDataUrl: string) => {
    if (!validation.isValid) return;

    const newRecord: SavedQrRecord = {
      id: crypto.randomUUID ? crypto.randomUUID() : String(Date.now()),
      label: formData.label || `${formData.type.toUpperCase()} Code`,
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
    setActiveTab('home');
    window.scrollTo({ top: 0, behavior: 'smooth' });
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
      {/* Top Application Header */}
      <Header activeTab={activeTab} onNavigate={setActiveTab} />

      {/* Main Body with bottom padding to ensure bottom navigation never clips content */}
      <main className="flex-1 max-w-6xl w-full mx-auto px-4 sm:px-6 py-6 pb-28">
        {/* HOME VIEW: The QR Workspace */}
        {activeTab === 'home' && (
          <div className="space-y-6">


            {/* Two-Column Grid on Desktop */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
              {/* Left Column: Form Fields & Styling Controls */}
              <div className="lg:col-span-7 space-y-6">
                <FormFields
                  formData={formData}
                  onChange={setFormData}
                  onReset={handleResetForm}
                  isDynamic={isDynamic}
                  onToggleDynamic={setIsDynamic}
                  onSelectType={handleSelectType}
                  error={validation.isValid ? undefined : validation.error}
                />

                <StylingPanel
                  options={styleOptions}
                  onChange={setStyleOptions}
                />
              </div>

              {/* Right Column: Live QR Preview & Export Controls */}
              <div className="lg:col-span-5">
                <QrPreview
                  payload={payload}
                  isValid={validation.isValid}
                  validationError={validation.error}
                  styleOptions={styleOptions}
                  formData={formData}
                  isDynamic={isDynamic}
                  onDynamicCreated={handleDynamicCreated}
                  onSaveToHistory={handleSaveToHistory}
                />
              </div>
            </div>
          </div>
        )}

        {/* DONATE VIEW */}
        {activeTab === 'donate' && (
          <DonateView onBackToGenerator={() => setActiveTab('home')} />
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

        {/* DRAGON PSYCHO VIEW */}
        {activeTab === 'dragon-psycho' && <DragonPsychoView />}
      </main>

      {/* Persistent Global Bottom Navigation */}
      <BottomNav
        activeTab={activeTab}
        onNavigate={setActiveTab}
        historyCount={historyRecords.length}
      />
    </div>
  );
}
