/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import {
  RotateCcw,
  Globe,
  Radio,
  Lock,
  Eye,
  EyeOff,
  AlertCircle,
  HelpCircle,
} from 'lucide-react';
import { QrFormData, QrContentType } from '../utils/qrPayload';

interface FormFieldsProps {
  formData: QrFormData;
  onChange: (data: QrFormData) => void;
  onReset: () => void;
  isDynamic: boolean;
  onToggleDynamic: (val: boolean) => void;
  onSelectType?: (type: QrContentType) => void;
  error?: string;
}

export const FormFields: React.FC<FormFieldsProps> = ({
  formData,
  onChange,
  onReset,
  isDynamic,
  onToggleDynamic,
  onSelectType,
  error,
}) => {
  const [showWifiPassword, setShowWifiPassword] = React.useState(false);

  // Helper to update specific form parts
  const updateField = (partial: Partial<QrFormData>) => {
    onChange({ ...formData, ...partial });
  };

  const isDynamicSupported =
    formData.type === 'url' || formData.type === 'social';

  return (
    <div className="bg-white border border-[#E3E3E3] rounded-xl p-5 shadow-xs space-y-5">
      {/* Content Type Selector */}
      {onSelectType && (
        <div>
          <label
            htmlFor="qr-content-type-select"
            className="block text-xs font-bold uppercase tracking-wider text-neutral-700 mb-1"
          >
            QR Content Type
          </label>
          <select
            id="qr-content-type-select"
            value={formData.type}
            onChange={(e) => onSelectType(e.target.value as QrContentType)}
            className="w-full px-3.5 py-2.5 text-sm rounded-lg border border-[#E3E3E3] bg-white font-medium focus:outline-none focus:ring-2 focus:ring-[#171717] focus:border-[#171717] transition-all"
          >
            <option value="url">URL / Web Link</option>
            <option value="text">Plain Text</option>
            <option value="wifi">Wi-Fi Network</option>
            <option value="email">Email Address</option>
            <option value="phone">Phone Number</option>
            <option value="sms">SMS Message</option>
            <option value="whatsapp">WhatsApp Chat</option>
            <option value="location">Geographic Location</option>
            <option value="event">Calendar Event</option>
            <option value="social">Social Media</option>
          </select>
        </div>
      )}

      {/* Static / Dynamic Toggle Bar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 p-3.5 bg-[#F5F5F5] rounded-lg border border-[#E3E3E3]">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-wider text-[#171717]">
              QR Mode
            </span>
            <span
              className={`text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wider ${
                isDynamic
                  ? 'bg-black text-white'
                  : 'bg-neutral-200 text-neutral-800'
              }`}
            >
              {isDynamic ? 'Dynamic QR' : 'Static QR'}
            </span>
          </div>
          <p className="text-[12px] text-neutral-600 mt-0.5">
            {isDynamic
              ? 'Destination URL can be updated anytime without changing the printed QR code.'
              : 'Content is directly encoded into the QR code. Works 100% offline.'}
          </p>
        </div>

        <div className="flex items-center bg-white p-1 rounded-lg border border-[#E3E3E3] shadow-xs shrink-0">
          <button
            type="button"
            onClick={() => onToggleDynamic(false)}
            className={`px-3 py-1.5 rounded-md text-xs font-semibold transition-all ${
              !isDynamic
                ? 'bg-[#171717] text-white shadow-xs'
                : 'text-neutral-600 hover:text-black'
            }`}
          >
            Static
          </button>
          <button
            type="button"
            onClick={() => {
              if (isDynamicSupported) {
                onToggleDynamic(true);
              }
            }}
            disabled={!isDynamicSupported}
            className={`px-3 py-1.5 rounded-md text-xs font-semibold transition-all ${
              isDynamic
                ? 'bg-[#171717] text-white shadow-xs'
                : !isDynamicSupported
                ? 'opacity-40 cursor-not-allowed text-neutral-400'
                : 'text-neutral-600 hover:text-black'
            }`}
            title={
              !isDynamicSupported
                ? 'Dynamic mode is available for URL and Social web links'
                : 'Switch to Dynamic QR'
            }
          >
            Dynamic
          </button>
        </div>
      </div>

      {!isDynamicSupported && isDynamic && (
        <div className="text-[12px] text-amber-700 bg-amber-50 border border-amber-200 p-2.5 rounded-lg flex items-center gap-2">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>
            Dynamic mode is optimized for web URLs and social media destinations.
          </span>
        </div>
      )}

      {/* Label (Optional Name for user reference) */}
      <div>
        <label
          htmlFor="qr-label-input"
          className="block text-xs font-bold uppercase tracking-wider text-neutral-600 mb-1"
        >
          Reference Label <span className="text-neutral-400 font-normal lowercase">(optional)</span>
        </label>
        <input
          id="qr-label-input"
          type="text"
          value={formData.label || ''}
          onChange={(e) => updateField({ label: e.target.value })}
          placeholder="e.g. Guest Wi-Fi, Portfolio link, Summer Fest Event"
          className="w-full px-3.5 py-2.5 text-sm rounded-lg border border-[#E3E3E3] bg-white focus:outline-none focus:ring-2 focus:ring-[#171717] focus:border-[#171717] transition-all"
        />
      </div>

      {/* Inputs specific to Selected Content Type */}
      <div className="space-y-4">
        {formData.type === 'url' && (
          <div>
            <label
              htmlFor="url-input"
              className="block text-xs font-bold uppercase tracking-wider text-neutral-700 mb-1"
            >
              Destination URL <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <input
                id="url-input"
                type="url"
                value={formData.url || ''}
                onChange={(e) => updateField({ url: e.target.value })}
                placeholder="https://example.com/my-page"
                className="w-full pl-3.5 pr-10 py-2.5 text-sm rounded-lg border border-[#E3E3E3] bg-white focus:outline-none focus:ring-2 focus:ring-[#171717] focus:border-[#171717] transition-all font-mono"
              />
              <Globe className="w-4 h-4 text-neutral-400 absolute right-3.5 top-3" />
            </div>
            <p className="text-[11px] text-neutral-500 mt-1">
              Supports https://, http:// or raw domain. We will automatically sanitize the protocol.
            </p>
          </div>
        )}

        {formData.type === 'text' && (
          <div>
            <label
              htmlFor="text-input"
              className="block text-xs font-bold uppercase tracking-wider text-neutral-700 mb-1"
            >
              Plain Text Content <span className="text-red-500">*</span>
            </label>
            <textarea
              id="text-input"
              rows={4}
              value={formData.text || ''}
              onChange={(e) => updateField({ text: e.target.value })}
              placeholder="Enter any text message, coupon code, notes, or instructions..."
              className="w-full p-3 text-sm rounded-lg border border-[#E3E3E3] bg-white focus:outline-none focus:ring-2 focus:ring-[#171717] focus:border-[#171717] transition-all"
            />
            <p className="text-[11px] text-neutral-500 mt-1">
              Character count: {(formData.text || '').length} characters.
            </p>
          </div>
        )}

        {formData.type === 'wifi' && (
          <div className="space-y-3.5">
            <div>
              <label
                htmlFor="wifi-ssid"
                className="block text-xs font-bold uppercase tracking-wider text-neutral-700 mb-1"
              >
                Network Name (SSID) <span className="text-red-500">*</span>
              </label>
              <input
                id="wifi-ssid"
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
                  htmlFor="wifi-security"
                  className="block text-xs font-bold uppercase tracking-wider text-neutral-700 mb-1"
                >
                  Security Type
                </label>
                <select
                  id="wifi-security"
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
                  className="w-full px-3 py-2.5 text-sm rounded-lg border border-[#E3E3E3] bg-white focus:outline-none focus:ring-2 focus:ring-[#171717]"
                >
                  <option value="WPA">WPA / WPA2 / WPA3 (Standard)</option>
                  <option value="WEP">WEP (Legacy)</option>
                  <option value="nopass">None (Open Network)</option>
                </select>
              </div>

              {formData.wifi?.security !== 'nopass' && (
                <div>
                  <label
                    htmlFor="wifi-password"
                    className="block text-xs font-bold uppercase tracking-wider text-neutral-700 mb-1"
                  >
                    Wi-Fi Password <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <input
                      id="wifi-password"
                      type={showWifiPassword ? 'text' : 'password'}
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
                      placeholder="Network security key"
                      className="w-full pl-3 pr-10 py-2.5 text-sm rounded-lg border border-[#E3E3E3] bg-white focus:outline-none focus:ring-2 focus:ring-[#171717]"
                    />
                    <button
                      type="button"
                      onClick={() => setShowWifiPassword(!showWifiPassword)}
                      aria-label={showWifiPassword ? 'Hide password' : 'Show password'}
                      className="absolute right-3 top-3 text-neutral-400 hover:text-black"
                    >
                      {showWifiPassword ? (
                        <EyeOff className="w-4 h-4" />
                      ) : (
                        <Eye className="w-4 h-4" />
                      )}
                    </button>
                  </div>
                </div>
              )}
            </div>

            <div className="flex items-center gap-2 pt-1">
              <input
                id="wifi-hidden"
                type="checkbox"
                checked={formData.wifi?.hidden || false}
                onChange={(e) =>
                  updateField({
                    wifi: {
                      ssid: formData.wifi?.ssid || '',
                      security: formData.wifi?.security || 'WPA',
                      password: formData.wifi?.password || '',
                      hidden: e.target.checked,
                    },
                  })
                }
                className="w-4 h-4 text-black rounded border-neutral-300 focus:ring-black"
              />
              <label htmlFor="wifi-hidden" className="text-xs text-neutral-700 font-medium cursor-pointer">
                Hidden Network (SSID is not broadcasting)
              </label>
            </div>
          </div>
        )}

        {formData.type === 'email' && (
          <div className="space-y-3.5">
            <div>
              <label
                htmlFor="email-address"
                className="block text-xs font-bold uppercase tracking-wider text-neutral-700 mb-1"
              >
                Recipient Email <span className="text-red-500">*</span>
              </label>
              <input
                id="email-address"
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

            <div>
              <label
                htmlFor="email-subject"
                className="block text-xs font-bold uppercase tracking-wider text-neutral-700 mb-1"
              >
                Subject <span className="text-neutral-400 font-normal lowercase">(optional)</span>
              </label>
              <input
                id="email-subject"
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
                placeholder="Inquiry from QR Scan"
                className="w-full px-3.5 py-2.5 text-sm rounded-lg border border-[#E3E3E3] bg-white focus:outline-none focus:ring-2 focus:ring-[#171717]"
              />
            </div>

            <div>
              <label
                htmlFor="email-body"
                className="block text-xs font-bold uppercase tracking-wider text-neutral-700 mb-1"
              >
                Message Body <span className="text-neutral-400 font-normal lowercase">(optional)</span>
              </label>
              <textarea
                id="email-body"
                rows={3}
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
                placeholder="Type default pre-filled email body..."
                className="w-full p-3 text-sm rounded-lg border border-[#E3E3E3] bg-white focus:outline-none focus:ring-2 focus:ring-[#171717]"
              />
            </div>
          </div>
        )}

        {formData.type === 'phone' && (
          <div>
            <label
              htmlFor="phone-input"
              className="block text-xs font-bold uppercase tracking-wider text-neutral-700 mb-1"
            >
              Phone Number <span className="text-red-500">*</span>
            </label>
            <input
              id="phone-input"
              type="tel"
              value={formData.phone || ''}
              onChange={(e) => updateField({ phone: e.target.value })}
              placeholder="+1 (555) 123-4567"
              className="w-full px-3.5 py-2.5 text-sm rounded-lg border border-[#E3E3E3] bg-white focus:outline-none focus:ring-2 focus:ring-[#171717] font-mono"
            />
            <p className="text-[11px] text-neutral-500 mt-1">
              Include country code for international compatibility (e.g. +1, +44, +91).
            </p>
          </div>
        )}

        {formData.type === 'sms' && (
          <div className="space-y-3.5">
            <div>
              <label
                htmlFor="sms-phone"
                className="block text-xs font-bold uppercase tracking-wider text-neutral-700 mb-1"
              >
                SMS Recipient Phone Number <span className="text-red-500">*</span>
              </label>
              <input
                id="sms-phone"
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
                className="w-full px-3.5 py-2.5 text-sm rounded-lg border border-[#E3E3E3] bg-white focus:outline-none focus:ring-2 focus:ring-[#171717] font-mono"
              />
            </div>

            <div>
              <label
                htmlFor="sms-message"
                className="block text-xs font-bold uppercase tracking-wider text-neutral-700 mb-1"
              >
                Prefilled SMS Message <span className="text-neutral-400 font-normal lowercase">(optional)</span>
              </label>
              <textarea
                id="sms-message"
                rows={3}
                value={formData.sms?.message || ''}
                onChange={(e) =>
                  updateField({
                    sms: {
                      phoneNumber: formData.sms?.phoneNumber || '',
                      message: e.target.value,
                    },
                  })
                }
                placeholder="e.g. YES to subscribe or send promo code"
                className="w-full p-3 text-sm rounded-lg border border-[#E3E3E3] bg-white focus:outline-none focus:ring-2 focus:ring-[#171717]"
              />
            </div>
          </div>
        )}

        {formData.type === 'whatsapp' && (
          <div className="space-y-3.5">
            <div>
              <label
                htmlFor="wa-phone"
                className="block text-xs font-bold uppercase tracking-wider text-neutral-700 mb-1"
              >
                WhatsApp Number (with country code) <span className="text-red-500">*</span>
              </label>
              <input
                id="wa-phone"
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
                className="w-full px-3.5 py-2.5 text-sm rounded-lg border border-[#E3E3E3] bg-white focus:outline-none focus:ring-2 focus:ring-[#171717] font-mono"
              />
              <p className="text-[11px] text-neutral-500 mt-1">
                Do not include '+' or leading zeros; enter full international digits (e.g. 1 for US, 44 for UK, 91 for India).
              </p>
            </div>

            <div>
              <label
                htmlFor="wa-message"
                className="block text-xs font-bold uppercase tracking-wider text-neutral-700 mb-1"
              >
                Prefilled WhatsApp Chat Message <span className="text-neutral-400 font-normal lowercase">(optional)</span>
              </label>
              <textarea
                id="wa-message"
                rows={3}
                value={formData.whatsapp?.message || ''}
                onChange={(e) =>
                  updateField({
                    whatsapp: {
                      phoneNumber: formData.whatsapp?.phoneNumber || '',
                      message: e.target.value,
                    },
                  })
                }
                placeholder="Hi, I saw your DRAGONQR and would like more information!"
                className="w-full p-3 text-sm rounded-lg border border-[#E3E3E3] bg-white focus:outline-none focus:ring-2 focus:ring-[#171717]"
              />
            </div>
          </div>
        )}

        {formData.type === 'location' && (
          <div className="space-y-3.5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label
                  htmlFor="loc-lat"
                  className="block text-xs font-bold uppercase tracking-wider text-neutral-700 mb-1"
                >
                  Latitude
                </label>
                <input
                  id="loc-lat"
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
                  className="w-full px-3.5 py-2.5 text-sm rounded-lg border border-[#E3E3E3] bg-white focus:outline-none focus:ring-2 focus:ring-[#171717] font-mono"
                />
              </div>

              <div>
                <label
                  htmlFor="loc-lng"
                  className="block text-xs font-bold uppercase tracking-wider text-neutral-700 mb-1"
                >
                  Longitude
                </label>
                <input
                  id="loc-lng"
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
                  className="w-full px-3.5 py-2.5 text-sm rounded-lg border border-[#E3E3E3] bg-white focus:outline-none focus:ring-2 focus:ring-[#171717] font-mono"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="loc-query"
                className="block text-xs font-bold uppercase tracking-wider text-neutral-700 mb-1"
              >
                Or Location Search / Place Name
              </label>
              <input
                id="loc-query"
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
                placeholder="Times Square, New York or Eiffel Tower, Paris"
                className="w-full px-3.5 py-2.5 text-sm rounded-lg border border-[#E3E3E3] bg-white focus:outline-none focus:ring-2 focus:ring-[#171717]"
              />
            </div>
          </div>
        )}

        {formData.type === 'event' && (
          <div className="space-y-3.5">
            <div>
              <label
                htmlFor="event-title"
                className="block text-xs font-bold uppercase tracking-wider text-neutral-700 mb-1"
              >
                Event Name / Title <span className="text-red-500">*</span>
              </label>
              <input
                id="event-title"
                type="text"
                value={formData.event?.title || ''}
                onChange={(e) =>
                  updateField({
                    event: {
                      title: e.target.value,
                      startDateTime: formData.event?.startDateTime || '',
                      endDateTime: formData.event?.endDateTime || '',
                      location: formData.event?.location || '',
                      description: formData.event?.description || '',
                    },
                  })
                }
                placeholder="Product Launch 2026"
                className="w-full px-3.5 py-2.5 text-sm rounded-lg border border-[#E3E3E3] bg-white focus:outline-none focus:ring-2 focus:ring-[#171717]"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label
                  htmlFor="event-start"
                  className="block text-xs font-bold uppercase tracking-wider text-neutral-700 mb-1"
                >
                  Start Date & Time
                </label>
                <input
                  id="event-start"
                  type="datetime-local"
                  value={formData.event?.startDateTime || ''}
                  onChange={(e) =>
                    updateField({
                      event: {
                        title: formData.event?.title || '',
                        startDateTime: e.target.value,
                        endDateTime: formData.event?.endDateTime || '',
                        location: formData.event?.location || '',
                        description: formData.event?.description || '',
                      },
                    })
                  }
                  className="w-full px-3 py-2 text-sm rounded-lg border border-[#E3E3E3] bg-white focus:outline-none focus:ring-2 focus:ring-[#171717]"
                />
              </div>

              <div>
                <label
                  htmlFor="event-end"
                  className="block text-xs font-bold uppercase tracking-wider text-neutral-700 mb-1"
                >
                  End Date & Time
                </label>
                <input
                  id="event-end"
                  type="datetime-local"
                  value={formData.event?.endDateTime || ''}
                  onChange={(e) =>
                    updateField({
                      event: {
                        title: formData.event?.title || '',
                        startDateTime: formData.event?.startDateTime || '',
                        endDateTime: e.target.value,
                        location: formData.event?.location || '',
                        description: formData.event?.description || '',
                      },
                    })
                  }
                  className="w-full px-3 py-2 text-sm rounded-lg border border-[#E3E3E3] bg-white focus:outline-none focus:ring-2 focus:ring-[#171717]"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="event-location"
                className="block text-xs font-bold uppercase tracking-wider text-neutral-700 mb-1"
              >
                Event Location <span className="text-neutral-400 font-normal lowercase">(optional)</span>
              </label>
              <input
                id="event-location"
                type="text"
                value={formData.event?.location || ''}
                onChange={(e) =>
                  updateField({
                    event: {
                      title: formData.event?.title || '',
                      startDateTime: formData.event?.startDateTime || '',
                      endDateTime: formData.event?.endDateTime || '',
                      location: e.target.value,
                      description: formData.event?.description || '',
                    },
                  })
                }
                placeholder="Grand Hall & Live Stream"
                className="w-full px-3.5 py-2.5 text-sm rounded-lg border border-[#E3E3E3] bg-white focus:outline-none focus:ring-2 focus:ring-[#171717]"
              />
            </div>

            <div>
              <label
                htmlFor="event-desc"
                className="block text-xs font-bold uppercase tracking-wider text-neutral-700 mb-1"
              >
                Description <span className="text-neutral-400 font-normal lowercase">(optional)</span>
              </label>
              <textarea
                id="event-desc"
                rows={2}
                value={formData.event?.description || ''}
                onChange={(e) =>
                  updateField({
                    event: {
                      title: formData.event?.title || '',
                      startDateTime: formData.event?.startDateTime || '',
                      endDateTime: formData.event?.endDateTime || '',
                      location: formData.event?.location || '',
                      description: e.target.value,
                    },
                  })
                }
                placeholder="Add meeting agenda or notes..."
                className="w-full p-3 text-sm rounded-lg border border-[#E3E3E3] bg-white focus:outline-none focus:ring-2 focus:ring-[#171717]"
              />
            </div>
          </div>
        )}

        {formData.type === 'social' && (
          <div className="space-y-3.5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label
                  htmlFor="social-platform"
                  className="block text-xs font-bold uppercase tracking-wider text-neutral-700 mb-1"
                >
                  Social Platform
                </label>
                <select
                  id="social-platform"
                  value={formData.social?.platform || 'youtube'}
                  onChange={(e) =>
                    updateField({
                      social: {
                        platform: e.target.value as any,
                        urlOrHandle: formData.social?.urlOrHandle || '',
                      },
                    })
                  }
                  className="w-full px-3 py-2.5 text-sm rounded-lg border border-[#E3E3E3] bg-white focus:outline-none focus:ring-2 focus:ring-[#171717]"
                >
                  <option value="youtube">YouTube</option>
                  <option value="instagram">Instagram</option>
                  <option value="facebook">Facebook</option>
                  <option value="github">GitHub</option>
                  <option value="twitter">X (Twitter)</option>
                  <option value="linkedin">LinkedIn</option>
                  <option value="tiktok">TikTok</option>
                  <option value="telegram">Telegram</option>
                </select>
              </div>

              <div>
                <label
                  htmlFor="social-handle"
                  className="block text-xs font-bold uppercase tracking-wider text-neutral-700 mb-1"
                >
                  Handle or Profile URL <span className="text-red-500">*</span>
                </label>
                <input
                  id="social-handle"
                  type="text"
                  value={formData.social?.urlOrHandle || ''}
                  onChange={(e) =>
                    updateField({
                      social: {
                        platform: formData.social?.platform || 'youtube',
                        urlOrHandle: e.target.value,
                      },
                    })
                  }
                  placeholder="@username or full profile link"
                  className="w-full px-3.5 py-2.5 text-sm rounded-lg border border-[#E3E3E3] bg-white focus:outline-none focus:ring-2 focus:ring-[#171717]"
                />
              </div>
            </div>
            <p className="text-[11px] text-neutral-500">
              Provide either your username (e.g. <code>@Dragon_music3e</code>) or your complete profile URL.
            </p>
          </div>
        )}
      </div>

      {/* Validation error display */}
      {error && (
        <div
          role="alert"
          className="p-3 bg-red-50 border border-red-200 text-red-800 text-xs rounded-lg flex items-center gap-2"
        >
          <AlertCircle className="w-4 h-4 shrink-0 text-red-600" />
          <span>{error}</span>
        </div>
      )}

      {/* Reset & helpers */}
      <div className="flex items-center justify-between pt-2 border-t border-[#E3E3E3]">
        <button
          type="button"
          onClick={onReset}
          className="inline-flex items-center gap-1.5 text-xs text-neutral-500 hover:text-black transition-colors py-1 px-2 rounded-md hover:bg-neutral-100"
          aria-label="Clear form fields"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Clear form</span>
        </button>

        <span className="text-[11px] text-neutral-400">
          Changes update live preview automatically
        </span>
      </div>
    </div>
  );
};
