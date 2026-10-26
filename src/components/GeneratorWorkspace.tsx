/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import QRCodeStyling from 'qr-code-styling';
import {
  AlignLeft,
  Link as LinkIcon,
  Wifi,
  Phone,
  MessageCircle,
  MapPin,
  MessageSquare,
  Mail,
  Sparkles,
  Download,
  FileCode,
  FileImage,
  BookmarkPlus,
  RotateCcw,
  Sliders,
  Palette,
  Image as ImageIcon,
  Check,
  Upload,
  Trash2,
  AlertCircle,
  AlertTriangle,
  Shield,
  ExternalLink,
  Copy,
  Key,
  ShieldAlert,
} from 'lucide-react';

import { QrStyleOptions, SavedQrRecord, DotType, CornerSquareType, CornerDotType, ErrorCorrectionLevel } from '../types';
import { QrFormData, QrContentType, formatQrPayload, validateQrFormData } from '../utils/qrPayload';
import { calculateContrastRatio, getContrastRating } from '../utils/contrast';

interface GeneratorWorkspaceProps {
  formData: QrFormData;
  onChangeFormData: (data: QrFormData) => void;
  onResetForm: () => void;
  selectedType: QrContentType;
  onSelectType: (type: QrContentType) => void;
  isDynamic: boolean;
  onToggleDynamic: (val: boolean) => void;
  styleOptions: QrStyleOptions;
  onChangeStyleOptions: (opts: QrStyleOptions) => void;
  onSaveToHistory: (previewDataUrl: string) => Promise<void>;
  onDynamicCreated?: (record: SavedQrRecord) => void;
}

export const GeneratorWorkspace: React.FC<GeneratorWorkspaceProps> = ({
  formData,
  onChangeFormData,
  onResetForm,
  selectedType,
  onSelectType,
  isDynamic,
  onToggleDynamic,
  styleOptions,
  onChangeStyleOptions,
  onSaveToHistory,
  onDynamicCreated,
}) => {
  // Customization sub-tabs: Pattern & Corners, Colors, Logo, Specs & Error Correction
  const [customTab, setCustomTab] = useState<'patterns' | 'colors' | 'logo' | 'specs'>('patterns');

  // QR preview references
  const containerRef = useRef<HTMLDivElement>(null);
  const qrInstanceRef = useRef<QRCodeStyling | null>(null);
  const logoInputRef = useRef<HTMLInputElement>(null);

  // States
  const [downloading, setDownloading] = useState(false);
  const [savedSuccess, setSavedSuccess] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);
  const [copiedToken, setCopiedToken] = useState(false);
  const [validationError, setValidationError] = useState<string | null>(null);
  const [lastGeneratedAt, setLastGeneratedAt] = useState<Date>(new Date());

  // Dynamic state
  const [isCreatingDynamic, setIsCreatingDynamic] = useState(false);
  const [dynamicResult, setDynamicResult] = useState<{
    slug: string;
    redirectUrl: string;
    managementToken: string;
  } | null>(null);
  const [dynamicError, setDynamicError] = useState<string | null>(null);

  // The 8 PRD requested options: Text, Link, Wi-Fi, Phone, WhatsApp, Location, SMS, and E-mail (No vCard)
  const qrTypes: { id: QrContentType; label: string; icon: React.ReactNode }[] = [
    { id: 'text', label: 'Text', icon: <AlignLeft className="w-3.5 h-3.5" /> },
    { id: 'url', label: 'Link', icon: <LinkIcon className="w-3.5 h-3.5" /> },
    { id: 'wifi', label: 'Wi-Fi', icon: <Wifi className="w-3.5 h-3.5" /> },
    { id: 'phone', label: 'Phone', icon: <Phone className="w-3.5 h-3.5" /> },
    { id: 'whatsapp', label: 'WhatsApp', icon: <MessageCircle className="w-3.5 h-3.5" /> },
    { id: 'location', label: 'Location', icon: <MapPin className="w-3.5 h-3.5" /> },
    { id: 'sms', label: 'SMS', icon: <MessageSquare className="w-3.5 h-3.5" /> },
    { id: 'email', label: 'E-mail', icon: <Mail className="w-3.5 h-3.5" /> },
  ];

  // Colors & styles presets
  const fgPresets = ['#000000', '#171717', '#262626', '#334155', '#1e293b', '#0f172a'];
  const bgPresets = ['#ffffff', '#f5f5f5', '#fafafa', '#f8fafc', '#f3f4f6', '#e5e7eb'];

  const dotPatterns: { id: DotType; label: string }[] = [
    { id: 'square', label: 'Classic Square' },
    { id: 'dots', label: 'Circular Dots' },
    { id: 'rounded', label: 'Rounded' },
    { id: 'classy', label: 'Classy' },
    { id: 'classy-rounded', label: 'Classy Rounded' },
    { id: 'extra-rounded', label: 'Smooth Squircle' },
  ];

  const cornerFrames: { id: CornerSquareType; label: string }[] = [
    { id: 'square', label: 'Square Frame' },
    { id: 'dot', label: 'Circular Frame' },
    { id: 'extra-rounded', label: 'Rounded Squircle' },
  ];

  const cornerEyeballs: { id: CornerDotType; label: string }[] = [
    { id: 'square', label: 'Square Eyeball' },
    { id: 'dot', label: 'Dot Eyeball' },
  ];

  const contrastRatio = calculateContrastRatio(styleOptions.fgColor, styleOptions.bgColor);
  const contrastRating = getContrastRating(contrastRatio);

  const payload = formatQrPayload(formData);
  const validation = validateQrFormData(formData);

  const effectiveData = isDynamic && dynamicResult ? dynamicResult.redirectUrl : payload;

  // Initialize QR instance once
  useEffect(() => {
    if (!containerRef.current) return;

    const qr = new QRCodeStyling({
      width: 290,
      height: 290,
      type: 'canvas',
      data: effectiveData || 'https://dragonpsycho.com',
      image: styleOptions.logoDataUrl,
      margin: styleOptions.margin,
      dotsOptions: {
        color: styleOptions.fgColor,
        type: styleOptions.dotType,
      },
      backgroundOptions: {
        color: styleOptions.bgColor,
      },
      cornersSquareOptions: {
        color: styleOptions.fgColor,
        type: styleOptions.cornerSquareType,
      },
      cornersDotOptions: {
        color: styleOptions.fgColor,
        type: styleOptions.cornerDotType,
      },
      imageOptions: {
        crossOrigin: 'anonymous',
        margin: 4,
        imageSize: styleOptions.logoSize,
        hideBackgroundDots: true,
      },
      qrOptions: {
        errorCorrectionLevel: styleOptions.errorCorrectionLevel,
      },
    });

    containerRef.current.innerHTML = '';
    qr.append(containerRef.current);
    qrInstanceRef.current = qr;

    return () => {
      if (containerRef.current) {
        containerRef.current.innerHTML = '';
      }
    };
  }, []);

  // Update QR instance when options change
  useEffect(() => {
    if (!qrInstanceRef.current) return;

    qrInstanceRef.current.update({
      data: effectiveData || 'https://dragonpsycho.com',
      image: styleOptions.logoDataUrl,
      margin: styleOptions.margin,
      dotsOptions: {
        color: styleOptions.fgColor,
        type: styleOptions.dotType,
      },
      backgroundOptions: {
        color: styleOptions.bgColor,
      },
      cornersSquareOptions: {
        color: styleOptions.fgColor,
        type: styleOptions.cornerSquareType,
      },
      cornersDotOptions: {
        color: styleOptions.fgColor,
        type: styleOptions.cornerDotType,
      },
      imageOptions: {
        crossOrigin: 'anonymous',
        margin: 4,
        imageSize: styleOptions.logoSize,
        hideBackgroundDots: true,
      },
      qrOptions: {
        errorCorrectionLevel: styleOptions.errorCorrectionLevel,
      },
    });
  }, [effectiveData, styleOptions]);

  // Form field updater
  const updateField = (partial: Partial<QrFormData>) => {
    onChangeFormData({ ...formData, ...partial });
    setValidationError(null);
  };

  const updateStyle = (partial: Partial<QrStyleOptions>) => {
    onChangeStyleOptions({ ...styleOptions, ...partial });
  };

  // CREATE BUTTON HANDLER: Validates and triggers generation
  const handleCreate = async () => {
    const val = validateQrFormData(formData);
    if (!val.isValid) {
      setValidationError(val.error || 'Please fill in all required inputs.');
      return;
    }
    setValidationError(null);
    setLastGeneratedAt(new Date());

    if (isDynamic && !dynamicResult) {
      await handleGenerateDynamicQr();
    } else {
      // Static or existing dynamic: save to history preview
      const preview = capturePreviewUrl();
      if (preview) {
        await onSaveToHistory(preview);
        setSavedSuccess(true);
        setTimeout(() => setSavedSuccess(false), 2500);
      }
    }
  };

  // Generate dynamic redirect
  const handleGenerateDynamicQr = async () => {
    setIsCreatingDynamic(true);
    setDynamicError(null);

    try {
      const destination = payload;
      const res = await fetch('/api/dynamic-qr', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          destination_url: destination,
          label: formData.label || `${formData.type.toUpperCase()} Dynamic QR`,
        }),
      });

      if (!res.ok) {
        const errData = await res.json().catch(() => ({}));
        throw new Error(errData.error || 'Failed to generate dynamic QR');
      }

      const data = await res.json();
      const dynamicInfo = {
        slug: data.slug,
        redirectUrl: data.redirect_url,
        managementToken: data.management_token,
      };
      setDynamicResult(dynamicInfo);

      const canvas = containerRef.current?.querySelector('canvas');
      const previewDataUrl = canvas ? canvas.toDataURL('image/png') : '';

      const savedRecord: SavedQrRecord = {
        id: data.id,
        label: data.label || 'Dynamic QR',
        contentType: formData.type,
        formData: { ...formData },
        styleOptions: { ...styleOptions },
        isDynamic: true,
        dynamicSlug: data.slug,
        dynamicRedirectUrl: data.redirect_url,
        managementToken: data.management_token,
        previewDataUrl,
        createdAt: data.created_at || new Date().toISOString(),
      };

      if (onDynamicCreated) {
        onDynamicCreated(savedRecord);
      }
      setSavedSuccess(true);
      setTimeout(() => setSavedSuccess(false), 2500);
    } catch (err: any) {
      setDynamicError(err.message || 'Unable to connect to dynamic redirect service.');
    } finally {
      setIsCreatingDynamic(false);
    }
  };

  const capturePreviewUrl = (): string => {
    const canvas = containerRef.current?.querySelector('canvas');
    return canvas ? canvas.toDataURL('image/png') : '';
  };

  // DOWNLOAD HANDLERS: PNG, SVG, JPG
  const handleDownload = async (format: 'png' | 'svg' | 'jpg') => {
    if (!validation.isValid) {
      setValidationError(validation.error || 'Form is invalid.');
      return;
    }
    setDownloading(true);

    try {
      const label = (formData.label || `dragonqr-${formData.type}`)
        .toLowerCase()
        .replace(/[^a-z0-9_-]/g, '_');

      if (format === 'svg') {
        const exportQrSvg = new QRCodeStyling({
          width: 1024,
          height: 1024,
          type: 'svg',
          data: effectiveData,
          image: styleOptions.logoDataUrl,
          margin: styleOptions.margin * 3,
          dotsOptions: {
            color: styleOptions.fgColor,
            type: styleOptions.dotType,
          },
          backgroundOptions: {
            color: styleOptions.bgColor,
          },
          cornersSquareOptions: {
            color: styleOptions.fgColor,
            type: styleOptions.cornerSquareType,
          },
          cornersDotOptions: {
            color: styleOptions.fgColor,
            type: styleOptions.cornerDotType,
          },
          imageOptions: {
            crossOrigin: 'anonymous',
            margin: 10,
            imageSize: styleOptions.logoSize,
            hideBackgroundDots: true,
          },
          qrOptions: {
            errorCorrectionLevel: styleOptions.errorCorrectionLevel,
          },
        });
        await exportQrSvg.download({ name: label, extension: 'svg' });
      } else if (format === 'png') {
        const exportQr = new QRCodeStyling({
          width: styleOptions.resolution,
          height: styleOptions.resolution,
          type: 'canvas',
          data: effectiveData,
          image: styleOptions.logoDataUrl,
          margin: Math.round(styleOptions.margin * (styleOptions.resolution / 280)),
          dotsOptions: {
            color: styleOptions.fgColor,
            type: styleOptions.dotType,
          },
          backgroundOptions: {
            color: styleOptions.bgColor,
          },
          cornersSquareOptions: {
            color: styleOptions.fgColor,
            type: styleOptions.cornerSquareType,
          },
          cornersDotOptions: {
            color: styleOptions.fgColor,
            type: styleOptions.cornerDotType,
          },
          imageOptions: {
            crossOrigin: 'anonymous',
            margin: Math.round(4 * (styleOptions.resolution / 280)),
            imageSize: styleOptions.logoSize,
            hideBackgroundDots: true,
          },
          qrOptions: {
            errorCorrectionLevel: styleOptions.errorCorrectionLevel,
          },
        });
        await exportQr.download({ name: label, extension: 'png' });
      } else if (format === 'jpg') {
        // High resolution JPG download with solid canvas background
        const exportQr = new QRCodeStyling({
          width: styleOptions.resolution,
          height: styleOptions.resolution,
          type: 'canvas',
          data: effectiveData,
          image: styleOptions.logoDataUrl,
          margin: Math.round(styleOptions.margin * (styleOptions.resolution / 280)),
          dotsOptions: {
            color: styleOptions.fgColor,
            type: styleOptions.dotType,
          },
          backgroundOptions: {
            color: styleOptions.bgColor,
          },
          cornersSquareOptions: {
            color: styleOptions.fgColor,
            type: styleOptions.cornerSquareType,
          },
          cornersDotOptions: {
            color: styleOptions.fgColor,
            type: styleOptions.cornerDotType,
          },
          imageOptions: {
            crossOrigin: 'anonymous',
            margin: Math.round(4 * (styleOptions.resolution / 280)),
            imageSize: styleOptions.logoSize,
            hideBackgroundDots: true,
          },
          qrOptions: {
            errorCorrectionLevel: styleOptions.errorCorrectionLevel,
          },
        });

        try {
          await exportQr.download({ name: label, extension: 'jpeg' });
        } catch {
          // Fallback via container canvas
          const canvas = containerRef.current?.querySelector('canvas');
          if (canvas) {
            const exp = document.createElement('canvas');
            exp.width = canvas.width;
            exp.height = canvas.height;
            const ctx = exp.getContext('2d');
            if (ctx) {
              ctx.fillStyle = styleOptions.bgColor || '#ffffff';
              ctx.fillRect(0, 0, exp.width, exp.height);
              ctx.drawImage(canvas, 0, 0);
              const jpgUrl = exp.toDataURL('image/jpeg', 0.95);
              const a = document.createElement('a');
              a.href = jpgUrl;
              a.download = `${label}.jpg`;
              a.click();
            }
          }
        }
      }

      const preview = capturePreviewUrl();
      if (preview) {
        await onSaveToHistory(preview);
      }
    } catch (err) {
      console.error('Download error:', err);
    } finally {
      setDownloading(false);
    }
  };

  const handleCopy = (text: string, type: 'link' | 'token') => {
    navigator.clipboard.writeText(text);
    if (type === 'link') {
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2000);
    } else {
      setCopiedToken(true);
      setTimeout(() => setCopiedToken(false), 2000);
    }
  };

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 2 * 1024 * 1024) {
      alert('Logo file must be under 2MB.');
      return;
    }

    if (!['image/png', 'image/jpeg', 'image/svg+xml', 'image/webp'].includes(file.type)) {
      alert('Please upload a PNG, JPG, WebP, or SVG logo.');
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const result = event.target?.result as string;
      updateStyle({
        logoDataUrl: result,
        errorCorrectionLevel: 'H',
      });
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="bg-white border border-[#E3E3E3] rounded-2xl p-6 sm:p-8 shadow-xs">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* ============================================================== */}
        {/* LEFT COLUMN: QR content type tabs, input form, customization, and Create button */}
        {/* ============================================================== */}
        <div className="lg:col-span-7 space-y-6">
          {/* 1. Content Type Tabs across the top of the left column */}
          <div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2" role="tablist">
              {qrTypes.map((item) => {
                const isSelected = selectedType === item.id;
                return (
                  <button
                    key={item.id}
                    type="button"
                    role="tab"
                    aria-selected={isSelected}
                    onClick={() => onSelectType(item.id)}
                    className={`flex items-center justify-center gap-2 px-3 py-2.5 rounded-xl text-xs font-semibold border transition-all ${
                      isSelected
                        ? 'bg-[#171717] text-white border-[#171717] shadow-sm'
                        : 'bg-neutral-50 hover:bg-neutral-100 text-neutral-700 border-neutral-200'
                    }`}
                  >
                    <span>{item.icon}</span>
                    <span>{item.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* 2. Input fields relevant to selected type */}
          <div className="space-y-4">

            {/* Type: Text */}
            {selectedType === 'text' && (
              <div>
                <label
                  htmlFor="input-text"
                  className="block text-xs font-bold uppercase tracking-wider text-neutral-700 mb-1"
                >
                  Plain Text Content <span className="text-red-500">*</span>
                </label>
                <textarea
                  id="input-text"
                  rows={4}
                  value={formData.text || ''}
                  onChange={(e) => updateField({ text: e.target.value })}
                  placeholder="Enter any text message, instructions, serial codes..."
                  className="w-full p-3 text-sm rounded-lg border border-[#E3E3E3] bg-white focus:outline-none focus:ring-2 focus:ring-[#171717]"
                />
              </div>
            )}

            {/* Type: Link (URL) */}
            {selectedType === 'url' && (
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label
                    htmlFor="input-url"
                    className="block text-xs font-bold uppercase tracking-wider text-neutral-700"
                  >
                    Destination Web Link <span className="text-red-500">*</span>
                  </label>
                  <div className="inline-flex items-center bg-neutral-100 p-0.5 rounded-lg border border-neutral-200 text-xs">
                    <button
                      type="button"
                      onClick={() => onToggleDynamic(false)}
                      className={`px-2.5 py-1 rounded-md font-semibold transition-all ${
                        !isDynamic
                          ? 'bg-[#171717] text-white shadow-xs'
                          : 'text-neutral-600 hover:text-black'
                      }`}
                    >
                      Static
                    </button>
                    <button
                      type="button"
                      onClick={() => onToggleDynamic(true)}
                      className={`px-2.5 py-1 rounded-md font-semibold transition-all ${
                        isDynamic
                          ? 'bg-[#171717] text-white shadow-xs'
                          : 'text-neutral-600 hover:text-black'
                      }`}
                    >
                      Dynamic
                    </button>
                  </div>
                </div>
                <input
                  id="input-url"
                  type="url"
                  value={formData.url || ''}
                  onChange={(e) => updateField({ url: e.target.value })}
                  placeholder="https://example.com/page"
                  className="w-full px-3.5 py-2.5 text-sm rounded-lg border border-[#E3E3E3] font-mono bg-white focus:outline-none focus:ring-2 focus:ring-[#171717]"
                />
              </div>
            )}

            {/* Type: Wi-Fi */}
            {selectedType === 'wifi' && (
              <div className="space-y-3">
                <div>
                  <label
                    htmlFor="input-wifi-ssid"
                    className="block text-xs font-bold uppercase tracking-wider text-neutral-700 mb-1"
                  >
                    Wi-Fi Network Name (SSID) <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="input-wifi-ssid"
                    type="text"
                    value={formData.wifi?.ssid || ''}
                    onChange={(e) =>
                      updateField({
                        wifi: {
                          ssid: e.target.value,
                          security: formData.wifi?.security || 'WPA',
                          password: formData.wifi?.password || '',
                          hidden: formData.wifi?.hidden || false,
                        },
                      })
                    }
                    placeholder="e.g. DragonHQ_5G"
                    className="w-full px-3.5 py-2.5 text-sm rounded-lg border border-[#E3E3E3] bg-white focus:outline-none focus:ring-2 focus:ring-[#171717]"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label
                      htmlFor="input-wifi-sec"
                      className="block text-xs font-bold uppercase tracking-wider text-neutral-700 mb-1"
                    >
                      Security
                    </label>
                    <select
                      id="input-wifi-sec"
                      value={formData.wifi?.security || 'WPA'}
                      onChange={(e) =>
                        updateField({
                          wifi: {
                            ssid: formData.wifi?.ssid || '',
                            security: e.target.value as any,
                            password: formData.wifi?.password || '',
                            hidden: formData.wifi?.hidden || false,
                          },
                        })
                      }
                      className="w-full px-3 py-2 text-sm rounded-lg border border-[#E3E3E3] bg-white focus:outline-none focus:ring-2 focus:ring-[#171717]"
                    >
                      <option value="WPA">WPA/WPA2/WPA3</option>
                      <option value="WEP">WEP</option>
                      <option value="nopass">None (Open)</option>
                    </select>
                  </div>

                  {formData.wifi?.security !== 'nopass' && (
                    <div>
                      <label
                        htmlFor="input-wifi-pass"
                        className="block text-xs font-bold uppercase tracking-wider text-neutral-700 mb-1"
                      >
                        Password <span className="text-red-500">*</span>
                      </label>
                      <input
                        id="input-wifi-pass"
                        type="password"
                        value={formData.wifi?.password || ''}
                        onChange={(e) =>
                          updateField({
                            wifi: {
                              ssid: formData.wifi?.ssid || '',
                              security: formData.wifi?.security || 'WPA',
                              password: e.target.value,
                              hidden: formData.wifi?.hidden || false,
                            },
                          })
                        }
                        placeholder="Network security password"
                        className="w-full px-3.5 py-2 text-sm rounded-lg border border-[#E3E3E3] bg-white focus:outline-none focus:ring-2 focus:ring-[#171717]"
                      />
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Type: Phone */}
            {selectedType === 'phone' && (
              <div>
                <label
                  htmlFor="input-phone"
                  className="block text-xs font-bold uppercase tracking-wider text-neutral-700 mb-1"
                >
                  Phone Number <span className="text-red-500">*</span>
                </label>
                <input
                  id="input-phone"
                  type="tel"
                  value={formData.phone || ''}
                  onChange={(e) => updateField({ phone: e.target.value })}
                  placeholder="+1 555 123 4567"
                  className="w-full px-3.5 py-2.5 text-sm rounded-lg border border-[#E3E3E3] font-mono bg-white focus:outline-none focus:ring-2 focus:ring-[#171717]"
                />
              </div>
            )}

            {/* Type: WhatsApp */}
            {selectedType === 'whatsapp' && (
              <div className="space-y-3">
                <div>
                  <label
                    htmlFor="input-wa-phone"
                    className="block text-xs font-bold uppercase tracking-wider text-neutral-700 mb-1"
                  >
                    WhatsApp Number (with country code) <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="input-wa-phone"
                    type="tel"
                    value={formData.whatsapp?.phoneNumber || ''}
                    onChange={(e) =>
                      updateField({
                        whatsapp: {
                          phoneNumber: e.target.value,
                          message: formData.whatsapp?.message || '',
                        },
                      })
                    }
                    placeholder="e.g. 15551234567 or 919876543210"
                    className="w-full px-3.5 py-2.5 text-sm rounded-lg border border-[#E3E3E3] font-mono bg-white focus:outline-none focus:ring-2 focus:ring-[#171717]"
                  />
                </div>
                <div>
                  <label
                    htmlFor="input-wa-msg"
                    className="block text-xs font-bold uppercase tracking-wider text-neutral-700 mb-1"
                  >
                    Prefilled Message <span className="text-neutral-400 font-normal lowercase">(optional)</span>
                  </label>
                  <textarea
                    id="input-wa-msg"
                    rows={2}
                    value={formData.whatsapp?.message || ''}
                    onChange={(e) =>
                      updateField({
                        whatsapp: {
                          phoneNumber: formData.whatsapp?.phoneNumber || '',
                          message: e.target.value,
                        },
                      })
                    }
                    placeholder="Hello! Reaching out from your QR code."
                    className="w-full p-2.5 text-sm rounded-lg border border-[#E3E3E3] bg-white focus:outline-none focus:ring-2 focus:ring-[#171717]"
                  />
                </div>
              </div>
            )}

            {/* Type: Location */}
            {selectedType === 'location' && (
              <div className="space-y-3">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label
                      htmlFor="input-loc-lat"
                      className="block text-xs font-bold uppercase tracking-wider text-neutral-700 mb-1"
                    >
                      Latitude
                    </label>
                    <input
                      id="input-loc-lat"
                      type="text"
                      value={formData.location?.latitude || ''}
                      onChange={(e) =>
                        updateField({
                          location: {
                            latitude: e.target.value,
                            longitude: formData.location?.longitude || '',
                            query: formData.location?.query || '',
                          },
                        })
                      }
                      placeholder="37.7749"
                      className="w-full px-3.5 py-2 text-sm rounded-lg border border-[#E3E3E3] font-mono bg-white focus:outline-none focus:ring-2 focus:ring-[#171717]"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="input-loc-lng"
                      className="block text-xs font-bold uppercase tracking-wider text-neutral-700 mb-1"
                    >
                      Longitude
                    </label>
                    <input
                      id="input-loc-lng"
                      type="text"
                      value={formData.location?.longitude || ''}
                      onChange={(e) =>
                        updateField({
                          location: {
                            latitude: formData.location?.latitude || '',
                            longitude: e.target.value,
                            query: formData.location?.query || '',
                          },
                        })
                      }
                      placeholder="-122.4194"
                      className="w-full px-3.5 py-2 text-sm rounded-lg border border-[#E3E3E3] font-mono bg-white focus:outline-none focus:ring-2 focus:ring-[#171717]"
                    />
                  </div>
                </div>
                <div>
                  <label
                    htmlFor="input-loc-query"
                    className="block text-xs font-bold uppercase tracking-wider text-neutral-700 mb-1"
                  >
                    Or Location Name / Address
                  </label>
                  <input
                    id="input-loc-query"
                    type="text"
                    value={formData.location?.query || ''}
                    onChange={(e) =>
                      updateField({
                        location: {
                          latitude: formData.location?.latitude || '',
                          longitude: formData.location?.longitude || '',
                          query: e.target.value,
                        },
                      })
                    }
                    placeholder="Eiffel Tower, Paris or Times Square, NYC"
                    className="w-full px-3.5 py-2 text-sm rounded-lg border border-[#E3E3E3] bg-white focus:outline-none focus:ring-2 focus:ring-[#171717]"
                  />
                </div>
              </div>
            )}

            {/* Type: SMS */}
            {selectedType === 'sms' && (
              <div className="space-y-3">
                <div>
                  <label
                    htmlFor="input-sms-phone"
                    className="block text-xs font-bold uppercase tracking-wider text-neutral-700 mb-1"
                  >
                    SMS Recipient Phone Number <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="input-sms-phone"
                    type="tel"
                    value={formData.sms?.phoneNumber || ''}
                    onChange={(e) =>
                      updateField({
                        sms: {
                          phoneNumber: e.target.value,
                          message: formData.sms?.message || '',
                        },
                      })
                    }
                    placeholder="+1 555 123 4567"
                    className="w-full px-3.5 py-2.5 text-sm rounded-lg border border-[#E3E3E3] font-mono bg-white focus:outline-none focus:ring-2 focus:ring-[#171717]"
                  />
                </div>
                <div>
                  <label
                    htmlFor="input-sms-msg"
                    className="block text-xs font-bold uppercase tracking-wider text-neutral-700 mb-1"
                  >
                    Message <span className="text-neutral-400 font-normal lowercase">(optional)</span>
                  </label>
                  <textarea
                    id="input-sms-msg"
                    rows={2}
                    value={formData.sms?.message || ''}
                    onChange={(e) =>
                      updateField({
                        sms: {
                          phoneNumber: formData.sms?.phoneNumber || '',
                          message: e.target.value,
                        },
                      })
                    }
                    placeholder="Enter prefilled SMS text..."
                    className="w-full p-2.5 text-sm rounded-lg border border-[#E3E3E3] bg-white focus:outline-none focus:ring-2 focus:ring-[#171717]"
                  />
                </div>
              </div>
            )}

            {/* Type: E-mail */}
            {selectedType === 'email' && (
              <div className="space-y-3">
                <div>
                  <label
                    htmlFor="input-email-addr"
                    className="block text-xs font-bold uppercase tracking-wider text-neutral-700 mb-1"
                  >
                    Email Address <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="input-email-addr"
                    type="email"
                    value={formData.email?.email || ''}
                    onChange={(e) =>
                      updateField({
                        email: {
                          email: e.target.value,
                          subject: formData.email?.subject || '',
                          body: formData.email?.body || '',
                        },
                      })
                    }
                    placeholder="contact@dragonpsycho.com"
                    className="w-full px-3.5 py-2.5 text-sm rounded-lg border border-[#E3E3E3] bg-white focus:outline-none focus:ring-2 focus:ring-[#171717]"
                  />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label
                      htmlFor="input-email-sub"
                      className="block text-xs font-bold uppercase tracking-wider text-neutral-700 mb-1"
                    >
                      Subject
                    </label>
                    <input
                      id="input-email-sub"
                      type="text"
                      value={formData.email?.subject || ''}
                      onChange={(e) =>
                        updateField({
                          email: {
                            email: formData.email?.email || '',
                            subject: e.target.value,
                            body: formData.email?.body || '',
                          },
                        })
                      }
                      placeholder="Inquiry from QR Code"
                      className="w-full px-3 py-2 text-sm rounded-lg border border-[#E3E3E3] bg-white focus:outline-none focus:ring-2 focus:ring-[#171717]"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="input-email-body"
                      className="block text-xs font-bold uppercase tracking-wider text-neutral-700 mb-1"
                    >
                      Body
                    </label>
                    <input
                      id="input-email-body"
                      type="text"
                      value={formData.email?.body || ''}
                      onChange={(e) =>
                        updateField({
                          email: {
                            email: formData.email?.email || '',
                            subject: formData.email?.subject || '',
                            body: e.target.value,
                          },
                        })
                      }
                      placeholder="Default email text..."
                      className="w-full px-3 py-2 text-sm rounded-lg border border-[#E3E3E3] bg-white focus:outline-none focus:ring-2 focus:ring-[#171717]"
                    />
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Validation warning */}
          {validationError && (
            <div
              role="alert"
              className="p-3 bg-red-50 border border-red-200 text-red-800 text-xs rounded-xl flex items-center gap-2"
            >
              <AlertCircle className="w-4 h-4 shrink-0 text-red-600" />
              <span>{validationError}</span>
            </div>
          )}

          {/* 4. CUSTOMIZATION SECTION (Horizontal Tabs: Pattern & Corners, Colors, Logo, Specs & Error Correction) */}
          <div className="pt-4 border-t border-[#E3E3E3]">
            <div className="text-xs font-bold uppercase tracking-wider text-neutral-700 mb-2">
              Customization & Styling
            </div>

            <div className="border border-[#E3E3E3] rounded-xl overflow-hidden bg-neutral-50/50">
              {/* Horizontal Tabs */}
              <div className="flex border-b border-[#E3E3E3] bg-neutral-100/80 p-1 gap-1 overflow-x-auto">
                <button
                  type="button"
                  onClick={() => setCustomTab('patterns')}
                  className={`flex-1 py-2 px-2.5 text-xs font-semibold rounded-lg flex items-center justify-center gap-1.5 transition-all whitespace-nowrap ${
                    customTab === 'patterns'
                      ? 'bg-white text-black shadow-xs font-bold'
                      : 'text-neutral-600 hover:text-black'
                  }`}
                >
                  <Sliders className="w-3.5 h-3.5" />
                  <span>Pattern & Corners</span>
                </button>

                <button
                  type="button"
                  onClick={() => setCustomTab('colors')}
                  className={`flex-1 py-2 px-2.5 text-xs font-semibold rounded-lg flex items-center justify-center gap-1.5 transition-all whitespace-nowrap ${
                    customTab === 'colors'
                      ? 'bg-white text-black shadow-xs font-bold'
                      : 'text-neutral-600 hover:text-black'
                  }`}
                >
                  <Palette className="w-3.5 h-3.5" />
                  <span>Colors</span>
                </button>

                <button
                  type="button"
                  onClick={() => setCustomTab('logo')}
                  className={`flex-1 py-2 px-2.5 text-xs font-semibold rounded-lg flex items-center justify-center gap-1.5 transition-all whitespace-nowrap ${
                    customTab === 'logo'
                      ? 'bg-white text-black shadow-xs font-bold'
                      : 'text-neutral-600 hover:text-black'
                  }`}
                >
                  <ImageIcon className="w-3.5 h-3.5" />
                  <span>Logo</span>
                  {styleOptions.logoDataUrl && (
                    <span className="w-1.5 h-1.5 rounded-full bg-black"></span>
                  )}
                </button>

                <button
                  type="button"
                  onClick={() => setCustomTab('specs')}
                  className={`flex-1 py-2 px-2.5 text-xs font-semibold rounded-lg flex items-center justify-center gap-1.5 transition-all whitespace-nowrap ${
                    customTab === 'specs'
                      ? 'bg-white text-black shadow-xs font-bold'
                      : 'text-neutral-600 hover:text-black'
                  }`}
                >
                  <span>Specs & Error</span>
                </button>
              </div>

              {/* Tab Contents */}
              <div className="p-4 bg-white">
                {/* PATTERN & CORNERS */}
                {customTab === 'patterns' && (
                  <div className="space-y-4">
                    <div>
                      <div className="text-[11px] font-bold text-neutral-600 uppercase mb-1.5">
                        Module Dot Pattern
                      </div>
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                        {dotPatterns.map((p) => (
                          <button
                            key={p.id}
                            type="button"
                            onClick={() => updateStyle({ dotType: p.id })}
                            className={`p-2 text-xs rounded-lg border text-left flex items-center justify-between ${
                              styleOptions.dotType === p.id
                                ? 'bg-black text-white border-black font-semibold'
                                : 'bg-neutral-50 text-neutral-800 border-neutral-200 hover:bg-neutral-100'
                            }`}
                          >
                            <span className="truncate">{p.label}</span>
                            {styleOptions.dotType === p.id && <Check className="w-3.5 h-3.5" />}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div>
                      <div className="text-[11px] font-bold text-neutral-600 uppercase mb-1.5">
                        Corner Eye Shape
                      </div>
                      <div className="grid grid-cols-3 gap-2">
                        {cornerFrames.map((f) => (
                          <button
                            key={f.id}
                            type="button"
                            onClick={() => updateStyle({ cornerSquareType: f.id })}
                            className={`p-2 text-xs rounded-lg border text-left flex items-center justify-between ${
                              styleOptions.cornerSquareType === f.id
                                ? 'bg-black text-white border-black font-semibold'
                                : 'bg-neutral-50 text-neutral-800 border-neutral-200 hover:bg-neutral-100'
                            }`}
                          >
                            <span className="truncate">{f.label}</span>
                            {styleOptions.cornerSquareType === f.id && <Check className="w-3.5 h-3.5" />}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div>
                      <div className="text-[11px] font-bold text-neutral-600 uppercase mb-1.5">
                        Corner Eyeball Dot
                      </div>
                      <div className="grid grid-cols-2 gap-2">
                        {cornerEyeballs.map((e) => (
                          <button
                            key={e.id}
                            type="button"
                            onClick={() => updateStyle({ cornerDotType: e.id })}
                            className={`p-2 text-xs rounded-lg border text-left flex items-center justify-between ${
                              styleOptions.cornerDotType === e.id
                                ? 'bg-black text-white border-black font-semibold'
                                : 'bg-neutral-50 text-neutral-800 border-neutral-200 hover:bg-neutral-100'
                            }`}
                          >
                            <span>{e.label}</span>
                            {styleOptions.cornerDotType === e.id && <Check className="w-3.5 h-3.5" />}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-[11px] font-bold text-neutral-600 uppercase">
                          Quiet-Zone Margin: {styleOptions.margin}px
                        </span>
                      </div>
                      <input
                        type="range"
                        min="0"
                        max="35"
                        step="5"
                        value={styleOptions.margin}
                        onChange={(e) => updateStyle({ margin: parseInt(e.target.value, 10) })}
                        className="w-full accent-black cursor-pointer"
                      />
                    </div>
                  </div>
                )}

                {/* COLORS */}
                {customTab === 'colors' && (
                  <div className="space-y-4">
                    <div>
                      <div className="text-[11px] font-bold text-neutral-600 uppercase mb-1.5">
                        Foreground Color
                      </div>
                      <div className="flex items-center gap-2 flex-wrap">
                        {fgPresets.map((hex) => (
                          <button
                            key={hex}
                            type="button"
                            onClick={() => updateStyle({ fgColor: hex })}
                            className={`w-7 h-7 rounded-lg border flex items-center justify-center ${
                              styleOptions.fgColor.toLowerCase() === hex.toLowerCase()
                                ? 'ring-2 ring-black ring-offset-2'
                                : 'border-neutral-300'
                            }`}
                            style={{ backgroundColor: hex }}
                            aria-label={`Foreground ${hex}`}
                          >
                            {styleOptions.fgColor.toLowerCase() === hex.toLowerCase() && (
                              <Check className="w-3.5 h-3.5 text-white" />
                            )}
                          </button>
                        ))}
                        <input
                          type="color"
                          value={styleOptions.fgColor}
                          onChange={(e) => updateStyle({ fgColor: e.target.value })}
                          className="w-7 h-7 rounded-lg border border-neutral-300 cursor-pointer p-0"
                          title="Custom color"
                        />
                        <span className="text-xs font-mono text-neutral-600 uppercase">
                          {styleOptions.fgColor}
                        </span>
                      </div>
                    </div>

                    <div>
                      <div className="text-[11px] font-bold text-neutral-600 uppercase mb-1.5">
                        Background Canvas Color
                      </div>
                      <div className="flex items-center gap-2 flex-wrap">
                        {bgPresets.map((hex) => (
                          <button
                            key={hex}
                            type="button"
                            onClick={() => updateStyle({ bgColor: hex })}
                            className={`w-7 h-7 rounded-lg border flex items-center justify-center ${
                              styleOptions.bgColor.toLowerCase() === hex.toLowerCase()
                                ? 'ring-2 ring-black ring-offset-2'
                                : 'border-neutral-300'
                            }`}
                            style={{ backgroundColor: hex }}
                            aria-label={`Background ${hex}`}
                          >
                            {styleOptions.bgColor.toLowerCase() === hex.toLowerCase() && (
                              <Check className="w-3.5 h-3.5 text-black" />
                            )}
                          </button>
                        ))}
                        <input
                          type="color"
                          value={styleOptions.bgColor}
                          onChange={(e) => updateStyle({ bgColor: e.target.value })}
                          className="w-7 h-7 rounded-lg border border-neutral-300 cursor-pointer p-0"
                          title="Custom background"
                        />
                        <span className="text-xs font-mono text-neutral-600 uppercase">
                          {styleOptions.bgColor}
                        </span>
                      </div>
                    </div>

                    <div className="p-2.5 bg-neutral-50 rounded-lg border border-neutral-200">
                      <div className="flex items-center justify-between text-xs font-bold mb-1">
                        <span className="text-neutral-700">Contrast Ratio</span>
                        <span
                          className={`px-1.5 py-0.5 rounded font-mono ${
                            contrastRating.isGood
                              ? 'bg-emerald-100 text-emerald-800'
                              : 'bg-amber-100 text-amber-800'
                          }`}
                        >
                          {contrastRatio}:1 ({contrastRating.label})
                        </span>
                      </div>
                      {contrastRating.warning && (
                        <p className="text-[11px] text-amber-800 mt-1">{contrastRating.warning}</p>
                      )}
                    </div>
                  </div>
                )}

                {/* LOGO */}
                {customTab === 'logo' && (
                  <div className="space-y-3">
                    {styleOptions.logoDataUrl ? (
                      <div className="flex items-center gap-3 p-3 bg-neutral-50 border border-neutral-200 rounded-xl">
                        <div className="w-12 h-12 rounded-lg bg-white border border-neutral-300 p-1 flex items-center justify-center shrink-0">
                          <img
                            src={styleOptions.logoDataUrl}
                            alt="Logo preview"
                            className="max-h-full max-w-full object-contain"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="text-xs font-bold text-neutral-900">Custom Logo Active</div>
                          <div className="text-[10px] text-neutral-500">
                            Error correction adjusted to Level H (High)
                          </div>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <button
                            type="button"
                            onClick={() => logoInputRef.current?.click()}
                            className="px-2.5 py-1 text-xs font-semibold bg-white border border-neutral-300 rounded-md"
                          >
                            Replace
                          </button>
                          <button
                            type="button"
                            onClick={() => updateStyle({ logoDataUrl: undefined })}
                            className="p-1.5 text-red-600 hover:bg-red-50 rounded-md"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div
                        onClick={() => logoInputRef.current?.click()}
                        className="border-2 border-dashed border-neutral-300 hover:border-black rounded-xl p-5 text-center cursor-pointer bg-neutral-50 transition-colors"
                      >
                        <Upload className="w-6 h-6 mx-auto text-neutral-400 mb-1" />
                        <div className="text-xs font-bold text-neutral-800">Upload Center Logo</div>
                        <div className="text-[10px] text-neutral-500">PNG, JPG, SVG, WebP up to 2MB</div>
                      </div>
                    )}

                    <input
                      ref={logoInputRef}
                      type="file"
                      accept="image/png,image/jpeg,image/svg+xml,image/webp"
                      onChange={handleLogoUpload}
                      className="hidden"
                    />

                    {styleOptions.logoDataUrl && (
                      <div>
                        <div className="flex justify-between items-center text-xs mb-1">
                          <span className="font-bold text-neutral-700">
                            Logo Size: {Math.round(styleOptions.logoSize * 100)}%
                          </span>
                        </div>
                        <input
                          type="range"
                          min="0.15"
                          max="0.35"
                          step="0.02"
                          value={styleOptions.logoSize}
                          onChange={(e) => updateStyle({ logoSize: parseFloat(e.target.value) })}
                          className="w-full accent-black cursor-pointer"
                        />
                      </div>
                    )}
                  </div>
                )}

                {/* SPECS & ERROR CORRECTION */}
                {customTab === 'specs' && (
                  <div className="space-y-3">
                    <div>
                      <div className="text-[11px] font-bold text-neutral-600 uppercase mb-1.5">
                        Error Correction Level
                      </div>
                      <div className="grid grid-cols-4 gap-1.5">
                        {(['L', 'M', 'Q', 'H'] as ErrorCorrectionLevel[]).map((lvl) => (
                          <button
                            key={lvl}
                            type="button"
                            onClick={() => updateStyle({ errorCorrectionLevel: lvl })}
                            className={`p-2 rounded-lg border text-center text-xs ${
                              styleOptions.errorCorrectionLevel === lvl
                                ? 'bg-black text-white border-black font-bold'
                                : 'bg-neutral-50 text-neutral-700 border-neutral-200 hover:bg-neutral-100'
                            }`}
                          >
                            Level {lvl}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div>
                      <div className="text-[11px] font-bold text-neutral-600 uppercase mb-1.5">
                        Export Resolution
                      </div>
                      <div className="grid grid-cols-3 gap-2">
                        {[512, 1024, 2048].map((res) => (
                          <button
                            key={res}
                            type="button"
                            onClick={() => updateStyle({ resolution: res })}
                            className={`p-2 rounded-lg border text-center text-xs ${
                              styleOptions.resolution === res
                                ? 'bg-black text-white border-black font-bold'
                                : 'bg-neutral-50 text-neutral-700 border-neutral-200 hover:bg-neutral-100'
                            }`}
                          >
                            {res} x {res}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* 5. CREATE BUTTON: Large, clearly visible in the position shown in drawing */}
          <div className="pt-2">
            <button
              type="button"
              onClick={handleCreate}
              disabled={isCreatingDynamic}
              className="w-full py-3.5 px-6 bg-[#171717] hover:bg-black text-white text-sm font-extrabold rounded-xl transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2 active:scale-[0.99] disabled:opacity-50"
            >
              <Sparkles className="w-4 h-4 text-emerald-400" />
              <span>
                {isCreatingDynamic
                  ? 'Generating Dynamic Redirect...'
                  : 'Create QR Code'}
              </span>
            </button>
          </div>

          {/* Clear / Reset Helper */}
          <div className="flex items-center justify-between pt-2 border-t border-[#E3E3E3] text-xs text-neutral-500">
            <button
              type="button"
              onClick={onResetForm}
              className="inline-flex items-center gap-1.5 text-neutral-500 hover:text-black transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset form values</span>
            </button>
            <span className="text-[11px]">Live canvas updates in real time</span>
          </div>
        </div>

        {/* ============================================================== */}
        {/* RIGHT COLUMN: Full Details and generated QR preview + Downloads */}
        {/* ============================================================== */}
        <div className="lg:col-span-5 lg:border-l lg:border-[#E3E3E3] lg:pl-8 space-y-6 flex flex-col items-center">
          {/* Header of Right Column */}
          <div className="w-full flex items-center justify-between pb-3 border-b border-[#E3E3E3] mb-4">
            <div>
              <div className="text-sm font-extrabold text-neutral-900 tracking-tight">
                Full Details & Preview
              </div>
              <div className="text-[11px] text-neutral-500">
                {isDynamic ? 'Dynamic QR Redirect' : 'Direct Static Matrix'}
              </div>
            </div>

            <div className="flex items-center gap-1.5">
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-neutral-900 text-white font-bold uppercase">
                {formData.type}
              </span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-neutral-100 text-neutral-700 border border-neutral-200">
                {styleOptions.resolution}px
              </span>
            </div>
          </div>

          {/* Scannable High-Quality QR Canvas */}
          <div className="relative p-4 rounded-2xl bg-[#F5F5F5] border border-neutral-200 shadow-inner flex items-center justify-center min-w-[290px] min-h-[290px] max-w-full">
            <div
              ref={containerRef}
              className="flex items-center justify-center rounded-xl overflow-hidden bg-white shadow-sm"
            />
          </div>

          {/* Full Details summary box */}
          <div className="w-full mt-4 p-3 bg-neutral-50 rounded-xl border border-neutral-200 space-y-1.5 text-left">
            <div className="flex items-center justify-between text-xs">
              <span className="text-neutral-500 font-medium">Encoded Payload:</span>
              <span className="font-mono text-[11px] text-neutral-800 truncate max-w-[200px]">
                {effectiveData || 'Awaiting input'}
              </span>
            </div>
            <div className="flex items-center justify-between text-xs">
              <span className="text-neutral-500 font-medium">Error Correction:</span>
              <span className="font-mono text-[11px] text-neutral-800 font-semibold">
                Level {styleOptions.errorCorrectionLevel}
              </span>
            </div>
            <div className="flex items-center justify-between text-xs">
              <span className="text-neutral-500 font-medium">Quiet Zone:</span>
              <span className="font-mono text-[11px] text-neutral-800">
                {styleOptions.margin}px margin
              </span>
            </div>
          </div>

          {/* DYNAMIC QR ACTIVE PANEL (If Dynamic) */}
          {isDynamic && dynamicResult && (
            <div className="w-full mt-3 p-3.5 bg-neutral-950 text-white rounded-xl text-left border border-neutral-800 space-y-2.5">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5 text-emerald-400 text-xs font-bold">
                  <Shield className="w-3.5 h-3.5" />
                  <span>Dynamic QR Active</span>
                </div>
                <a
                  href={dynamicResult.redirectUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="text-[11px] text-neutral-400 hover:text-white flex items-center gap-1"
                >
                  <span>Test Link</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>

              <div>
                <div className="text-[10px] text-neutral-400 uppercase tracking-wider mb-0.5">
                  Permanent Redirect URL
                </div>
                <div className="flex items-center gap-1.5 bg-neutral-900 p-1.5 rounded-lg border border-neutral-800">
                  <span className="text-xs font-mono text-emerald-300 truncate flex-1">
                    {dynamicResult.redirectUrl}
                  </span>
                  <button
                    type="button"
                    onClick={() => handleCopy(dynamicResult.redirectUrl, 'link')}
                    className="p-1 rounded hover:bg-neutral-800 text-neutral-300"
                    title="Copy Link"
                  >
                    {copiedLink ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  </button>
                </div>
              </div>

              <div className="p-2 bg-amber-950/40 border border-amber-800/60 rounded-lg">
                <div className="flex items-center gap-1 text-[11px] font-bold text-amber-300 mb-0.5">
                  <Key className="w-3.5 h-3.5 text-amber-400" />
                  <span>Management Key</span>
                </div>
                <div className="flex items-center gap-1.5 bg-neutral-900 p-1.5 rounded border border-neutral-800">
                  <span className="text-[11px] font-mono text-neutral-200 truncate flex-1">
                    {dynamicResult.managementToken}
                  </span>
                  <button
                    type="button"
                    onClick={() => handleCopy(dynamicResult.managementToken, 'token')}
                    className="px-2 py-0.5 bg-neutral-800 hover:bg-neutral-700 text-white text-[10px] font-semibold rounded"
                  >
                    {copiedToken ? 'Copied' : 'Copy'}
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* 6. DOWNLOAD OPTIONS DIRECTLY BELOW QR PREVIEW: PNG, SVG, JPG */}
          <div className="w-full mt-5 space-y-2.5">
            <div className="text-xs font-bold uppercase tracking-wider text-neutral-700 text-left">
              Download Options
            </div>

            <div className="grid grid-cols-3 gap-2">
              {/* Download PNG */}
              <button
                type="button"
                onClick={() => handleDownload('png')}
                disabled={downloading}
                className="py-2.5 px-2 bg-[#171717] hover:bg-black text-white text-xs font-bold rounded-xl transition-all flex flex-col items-center justify-center gap-1 shadow-xs disabled:opacity-40"
              >
                <Download className="w-4 h-4" />
                <span>PNG</span>
              </button>

              {/* Download SVG */}
              <button
                type="button"
                onClick={() => handleDownload('svg')}
                disabled={downloading}
                className="py-2.5 px-2 bg-white hover:bg-neutral-100 text-neutral-900 border border-[#E3E3E3] text-xs font-bold rounded-xl transition-all flex flex-col items-center justify-center gap-1 shadow-xs disabled:opacity-40"
              >
                <FileCode className="w-4 h-4" />
                <span>SVG</span>
              </button>

              {/* Download JPG / JPEG */}
              <button
                type="button"
                onClick={() => handleDownload('jpg')}
                disabled={downloading}
                className="py-2.5 px-2 bg-white hover:bg-neutral-100 text-neutral-900 border border-[#E3E3E3] text-xs font-bold rounded-xl transition-all flex flex-col items-center justify-center gap-1 shadow-xs disabled:opacity-40"
              >
                <FileImage className="w-4 h-4" />
                <span>JPG</span>
              </button>
            </div>

            {/* Save to History Button */}
            <button
              type="button"
              onClick={async () => {
                const preview = capturePreviewUrl();
                if (preview) {
                  await onSaveToHistory(preview);
                  setSavedSuccess(true);
                  setTimeout(() => setSavedSuccess(false), 2500);
                }
              }}
              className="w-full py-2.5 px-3 bg-neutral-100 hover:bg-neutral-200 text-neutral-800 text-xs font-bold rounded-xl transition-colors flex items-center justify-center gap-2"
            >
              <BookmarkPlus className="w-4 h-4" />
              <span>{savedSuccess ? 'Saved to History!' : 'Save to History'}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
