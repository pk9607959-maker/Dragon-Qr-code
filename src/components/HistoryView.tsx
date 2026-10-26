/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import {
  History,
  Trash2,
  Download,
  ExternalLink,
  RotateCcw,
  Search,
  AlertTriangle,
  Key,
  Check,
  Edit2,
  X,
  FileCode,
} from 'lucide-react';
import { SavedQrRecord } from '../types';
import QRCodeStyling from 'qr-code-styling';

interface HistoryViewProps {
  records: SavedQrRecord[];
  onReopen: (record: SavedQrRecord) => void;
  onDelete: (id: string) => void;
  onClearAll: () => void;
  onUpdateRecord: (updated: SavedQrRecord) => void;
}

export const HistoryView: React.FC<HistoryViewProps> = ({
  records,
  onReopen,
  onDelete,
  onClearAll,
  onUpdateRecord,
}) => {
  const [search, setSearch] = useState('');
  const [filterType, setFilterType] = useState<string>('all');
  const [confirmClearOpen, setConfirmClearOpen] = useState(false);

  // Edit dynamic destination modal
  const [editingRecord, setEditingRecord] = useState<SavedQrRecord | null>(null);
  const [editToken, setEditToken] = useState('');
  const [editDestination, setEditDestination] = useState('');
  const [editStatus, setEditStatus] = useState<{ loading: boolean; error?: string; success?: string }>({
    loading: false,
  });

  const filteredRecords = records.filter((r) => {
    const matchesSearch =
      (r.label || '').toLowerCase().includes(search.toLowerCase()) ||
      r.contentType.toLowerCase().includes(search.toLowerCase()) ||
      (r.formData.url || '').toLowerCase().includes(search.toLowerCase()) ||
      (r.formData.wifi?.ssid || '').toLowerCase().includes(search.toLowerCase());

    const matchesType = filterType === 'all' || r.contentType === filterType;
    return matchesSearch && matchesType;
  });

  const downloadHistoryQr = async (record: SavedQrRecord, format: 'png' | 'svg') => {
    const effectiveData =
      record.isDynamic && record.dynamicRedirectUrl
        ? record.dynamicRedirectUrl
        : record.formData.url || record.label || 'dragonqr';

    const qr = new QRCodeStyling({
      width: record.styleOptions.resolution || 1024,
      height: record.styleOptions.resolution || 1024,
      type: format === 'svg' ? 'svg' : 'canvas',
      data: effectiveData,
      image: record.styleOptions.logoDataUrl,
      margin: record.styleOptions.margin,
      dotsOptions: {
        color: record.styleOptions.fgColor,
        type: record.styleOptions.dotType,
      },
      backgroundOptions: {
        color: record.styleOptions.bgColor,
      },
      cornersSquareOptions: {
        color: record.styleOptions.fgColor,
        type: record.styleOptions.cornerSquareType,
      },
      cornersDotOptions: {
        color: record.styleOptions.fgColor,
        type: record.styleOptions.cornerDotType,
      },
      qrOptions: {
        errorCorrectionLevel: record.styleOptions.errorCorrectionLevel,
      },
    });

    const safeName = (record.label || `dragonqr-${record.contentType}`)
      .toLowerCase()
      .replace(/[^a-z0-9_-]/g, '_');

    await qr.download({
      name: safeName,
      extension: format,
    });
  };

  const openEditModal = (rec: SavedQrRecord) => {
    setEditingRecord(rec);
    setEditToken(rec.managementToken || '');
    setEditDestination(rec.formData.url || rec.dynamicRedirectUrl || '');
    setEditStatus({ loading: false });
  };

  const handleSaveDestination = async () => {
    if (!editingRecord || !editingRecord.dynamicSlug) return;
    setEditStatus({ loading: true, error: undefined, success: undefined });

    try {
      const res = await fetch(`/api/dynamic-qr/${editingRecord.dynamicSlug}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          management_token: editToken,
          destination_url: editDestination,
        }),
      });

      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.error || 'Failed to update destination URL');
      }

      const data = await res.json();
      const updated: SavedQrRecord = {
        ...editingRecord,
        formData: {
          ...editingRecord.formData,
          url: data.destination_url,
        },
      };

      onUpdateRecord(updated);
      setEditStatus({ loading: false, success: 'Destination updated successfully!' });
      setTimeout(() => {
        setEditingRecord(null);
      }, 1500);
    } catch (err: any) {
      setEditStatus({ loading: false, error: err.message || 'Update failed.' });
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header and Controls */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-[#E3E3E3]">
        <div>
          <h1 className="text-xl font-black text-neutral-900 tracking-tight">
            Generated QR History
          </h1>
          <p className="text-xs text-neutral-600 mt-0.5">
            Locally preserved in your browser. Reopen, edit destinations, or export anytime.
          </p>
        </div>

        {records.length > 0 && (
          <button
            type="button"
            onClick={() => setConfirmClearOpen(true)}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-red-600 hover:text-white hover:bg-red-600 border border-red-200 hover:border-red-600 rounded-lg transition-colors"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>Clear All History</span>
          </button>
        )}
      </div>

      {/* Search and Filter */}
      {records.length > 0 && (
        <div className="flex flex-col sm:flex-row gap-2.5">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-neutral-400 absolute left-3 top-3" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by label, type or content..."
              className="w-full pl-9 pr-3.5 py-2 text-xs rounded-lg border border-[#E3E3E3] bg-white focus:outline-none focus:ring-2 focus:ring-[#171717]"
            />
          </div>

          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            className="px-3 py-2 text-xs rounded-lg border border-[#E3E3E3] bg-white focus:outline-none focus:ring-2 focus:ring-[#171717]"
            aria-label="Filter by QR type"
          >
            <option value="all">All Content Types</option>
            <option value="url">URL</option>
            <option value="wifi">Wi-Fi</option>
            <option value="text">Plain Text</option>
            <option value="email">Email</option>
            <option value="phone">Phone</option>
            <option value="sms">SMS</option>
            <option value="whatsapp">WhatsApp</option>
            <option value="location">Location</option>
            <option value="event">Event</option>
            <option value="social">Social Media</option>
          </select>
        </div>
      )}

      {/* History List */}
      {records.length === 0 ? (
        <div className="bg-white border border-[#E3E3E3] rounded-2xl p-12 text-center max-w-md mx-auto">
          <div className="w-12 h-12 bg-neutral-100 rounded-full flex items-center justify-center mx-auto mb-3 text-neutral-400">
            <History className="w-6 h-6" />
          </div>
          <h2 className="text-sm font-bold text-neutral-800 mb-1">No Saved QR Codes Yet</h2>
          <p className="text-xs text-neutral-500 mb-4">
            Every QR code you generate or download is saved here in your browser for easy re-export and editing.
          </p>
        </div>
      ) : filteredRecords.length === 0 ? (
        <div className="bg-white border border-[#E3E3E3] rounded-xl p-8 text-center text-xs text-neutral-500">
          No records match your search filter.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredRecords.map((item) => (
            <div
              key={item.id}
              className="bg-white border border-[#E3E3E3] rounded-xl p-4 shadow-xs flex flex-col justify-between hover:border-neutral-400 transition-all"
            >
              <div className="flex items-start gap-3.5 mb-3">
                {/* Thumbnail */}
                <div className="w-20 h-20 bg-neutral-50 border border-neutral-200 rounded-lg p-1 flex items-center justify-center shrink-0 overflow-hidden">
                  {item.previewDataUrl ? (
                    <img
                      src={item.previewDataUrl}
                      alt={item.label || 'QR Thumbnail'}
                      className="max-h-full max-w-full object-contain"
                    />
                  ) : (
                    <div className="text-[10px] text-neutral-400 font-mono">DRAGONQR</div>
                  )}
                </div>

                {/* Details */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1.5 flex-wrap mb-1">
                    <span className="text-[10px] font-bold px-1.5 py-0.5 rounded uppercase bg-neutral-900 text-white font-mono">
                      {item.contentType}
                    </span>
                    <span
                      className={`text-[10px] font-bold px-1.5 py-0.5 rounded uppercase font-mono ${
                        item.isDynamic
                          ? 'bg-emerald-100 text-emerald-800'
                          : 'bg-neutral-100 text-neutral-700'
                      }`}
                    >
                      {item.isDynamic ? 'Dynamic' : 'Static'}
                    </span>
                  </div>

                  <div className="text-sm font-bold text-neutral-900 truncate">
                    {item.label || `${item.contentType.toUpperCase()} QR`}
                  </div>

                  <div className="text-[11px] text-neutral-500 font-mono truncate mt-0.5">
                    {item.isDynamic && item.dynamicRedirectUrl
                      ? item.dynamicRedirectUrl
                      : item.formData.url || item.formData.wifi?.ssid || item.formData.text || 'Payload stored'}
                  </div>

                  <div className="text-[10px] text-neutral-400 mt-1">
                    {new Date(item.createdAt).toLocaleDateString()} at{' '}
                    {new Date(item.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center justify-between pt-2.5 border-t border-[#E3E3E3] text-xs">
                <div className="flex items-center gap-1.5">
                  <button
                    type="button"
                    onClick={() => onReopen(item)}
                    className="inline-flex items-center gap-1 px-2.5 py-1 font-semibold text-neutral-800 bg-neutral-100 hover:bg-neutral-200 rounded-md transition-colors"
                    title="Load back into generator"
                  >
                    <RotateCcw className="w-3 h-3" />
                    <span>Reopen</span>
                  </button>

                  {item.isDynamic && item.dynamicSlug && (
                    <button
                      type="button"
                      onClick={() => openEditModal(item)}
                      className="inline-flex items-center gap-1 px-2 py-1 font-semibold text-emerald-800 bg-emerald-50 hover:bg-emerald-100 rounded-md transition-colors"
                      title="Edit Destination URL"
                    >
                      <Edit2 className="w-3 h-3" />
                      <span>Edit Link</span>
                    </button>
                  )}
                </div>

                <div className="flex items-center gap-1">
                  <button
                    type="button"
                    onClick={() => downloadHistoryQr(item, 'png')}
                    className="p-1.5 text-neutral-600 hover:text-black hover:bg-neutral-100 rounded-md"
                    title="Download PNG"
                    aria-label="Download PNG"
                  >
                    <Download className="w-4 h-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => downloadHistoryQr(item, 'svg')}
                    className="p-1.5 text-neutral-600 hover:text-black hover:bg-neutral-100 rounded-md"
                    title="Download SVG"
                    aria-label="Download SVG"
                  >
                    <FileCode className="w-4 h-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => onDelete(item.id)}
                    className="p-1.5 text-neutral-400 hover:text-red-600 hover:bg-red-50 rounded-md"
                    title="Delete record"
                    aria-label="Delete entry"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Privacy Notice Box */}
      <div className="p-4 bg-[#F5F5F5] rounded-xl border border-[#E3E3E3] text-xs text-neutral-600">
        <div className="font-bold text-neutral-800 mb-1 flex items-center gap-1.5">
          <span>Local Device Privacy</span>
        </div>
        <p className="leading-relaxed">
          History records are stored exclusively in your local browser storage (IndexedDB). Wi-Fi passwords and personal details are never transmitted to external servers to populate this list. Anyone with access to your device browser profile can view this history.
        </p>
      </div>

      {/* Clear Confirmation Modal */}
      {confirmClearOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-xl p-6 max-w-sm w-full border border-[#E3E3E3] shadow-2xl">
            <div className="flex items-center gap-2 text-red-600 font-bold text-sm mb-2">
              <AlertTriangle className="w-5 h-5 shrink-0" />
              <span>Confirm Clear History</span>
            </div>
            <p className="text-xs text-neutral-600 mb-5 leading-relaxed">
              Are you sure you want to permanently clear all generated QR records from this browser? This action cannot be undone.
            </p>
            <div className="flex items-center justify-end gap-2">
              <button
                type="button"
                onClick={() => setConfirmClearOpen(false)}
                className="px-3 py-1.5 text-xs font-semibold text-neutral-700 bg-neutral-100 hover:bg-neutral-200 rounded-lg"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => {
                  onClearAll();
                  setConfirmClearOpen(false);
                }}
                className="px-3 py-1.5 text-xs font-semibold text-white bg-red-600 hover:bg-red-700 rounded-lg"
              >
                Yes, Clear All
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Dynamic Destination Modal */}
      {editingRecord && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-xl p-6 max-w-md w-full border border-[#E3E3E3] shadow-2xl">
            <div className="flex items-center justify-between pb-3 border-b border-[#E3E3E3] mb-4">
              <div className="text-sm font-bold text-neutral-900">
                Update Dynamic QR Destination
              </div>
              <button
                type="button"
                onClick={() => setEditingRecord(null)}
                className="text-neutral-400 hover:text-black"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-3.5">
              <div>
                <label className="block text-xs font-bold text-neutral-700 uppercase mb-1">
                  Permanent Redirect URL
                </label>
                <div className="text-xs font-mono p-2 bg-neutral-100 rounded text-neutral-600">
                  {editingRecord.dynamicRedirectUrl}
                </div>
                <p className="text-[10px] text-neutral-500 mt-0.5">
                  The printed QR code remains untouched. Only the redirection destination changes.
                </p>
              </div>

              <div>
                <label className="block text-xs font-bold text-neutral-700 uppercase mb-1">
                  New Destination URL <span className="text-red-500">*</span>
                </label>
                <input
                  type="url"
                  value={editDestination}
                  onChange={(e) => setEditDestination(e.target.value)}
                  placeholder="https://new-destination.com"
                  className="w-full px-3 py-2 text-xs rounded-lg border border-[#E3E3E3] font-mono focus:outline-none focus:ring-2 focus:ring-black"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-neutral-700 uppercase mb-1">
                  Management Key <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <input
                    type="password"
                    value={editToken}
                    onChange={(e) => setEditToken(e.target.value)}
                    placeholder="Enter the secret key given upon creation"
                    className="w-full px-3 py-2 text-xs rounded-lg border border-[#E3E3E3] font-mono focus:outline-none focus:ring-2 focus:ring-black"
                  />
                  <Key className="w-4 h-4 text-neutral-400 absolute right-3 top-2.5" />
                </div>
              </div>

              {editStatus.error && (
                <div className="p-2 bg-red-50 border border-red-200 text-red-700 text-xs rounded">
                  {editStatus.error}
                </div>
              )}

              {editStatus.success && (
                <div className="p-2 bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs rounded flex items-center gap-1.5">
                  <Check className="w-4 h-4" />
                  <span>{editStatus.success}</span>
                </div>
              )}
            </div>

            <div className="flex items-center justify-end gap-2 mt-5">
              <button
                type="button"
                onClick={() => setEditingRecord(null)}
                className="px-3 py-1.5 text-xs font-semibold text-neutral-600 hover:bg-neutral-100 rounded-lg"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleSaveDestination}
                disabled={editStatus.loading || !editDestination || !editToken}
                className="px-4 py-1.5 text-xs font-bold text-white bg-black hover:bg-neutral-800 rounded-lg disabled:opacity-50"
              >
                {editStatus.loading ? 'Updating...' : 'Save Changes'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
