/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import {
  Link,
  AlignLeft,
  Wifi,
  Mail,
  Phone,
  MessageSquare,
  MessageCircle,
  MapPin,
  Calendar,
  Share2,
} from 'lucide-react';
import { QrContentType } from '../utils/qrPayload';

interface TypeSelectorProps {
  selectedType: QrContentType;
  onSelectType: (type: QrContentType) => void;
}

interface TypeItem {
  type: QrContentType;
  label: string;
  icon: React.ReactNode;
}

export const TypeSelector: React.FC<TypeSelectorProps> = ({
  selectedType,
  onSelectType,
}) => {
  // Exactly 10 supported types. Notice vCard is strictly excluded per PRD requirements.
  const types: TypeItem[] = [
    { type: 'url', label: 'URL / Link', icon: <Link className="w-4 h-4" /> },
    { type: 'text', label: 'Plain Text', icon: <AlignLeft className="w-4 h-4" /> },
    { type: 'wifi', label: 'Wi-Fi', icon: <Wifi className="w-4 h-4" /> },
    { type: 'email', label: 'Email', icon: <Mail className="w-4 h-4" /> },
    { type: 'phone', label: 'Phone', icon: <Phone className="w-4 h-4" /> },
    { type: 'sms', label: 'SMS', icon: <MessageSquare className="w-4 h-4" /> },
    { type: 'whatsapp', label: 'WhatsApp', icon: <MessageCircle className="w-4 h-4" /> },
    { type: 'location', label: 'Location', icon: <MapPin className="w-4 h-4" /> },
    { type: 'event', label: 'Event', icon: <Calendar className="w-4 h-4" /> },
    { type: 'social', label: 'Social Media', icon: <Share2 className="w-4 h-4" /> },
  ];

  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-2">
        <label className="text-xs font-bold uppercase tracking-wider text-neutral-600">
          QR Content Type
        </label>
        <span className="text-[11px] text-neutral-400 font-mono">
          10 formats supported
        </span>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-5 gap-2" role="radiogroup" aria-label="QR Content Type Options">
        {types.map((item) => {
          const isSelected = selectedType === item.type;
          return (
            <button
              key={item.type}
              type="button"
              role="radio"
              aria-checked={isSelected}
              onClick={() => onSelectType(item.type)}
              className={`flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-xs font-medium border text-left transition-all ${
                isSelected
                  ? 'bg-[#171717] text-white border-[#171717] shadow-sm font-semibold ring-1 ring-[#171717]'
                  : 'bg-white text-neutral-800 border-[#E3E3E3] hover:border-neutral-400 hover:bg-neutral-50'
              }`}
            >
              <span
                className={`p-1 rounded ${
                  isSelected ? 'bg-neutral-800 text-white' : 'bg-neutral-100 text-neutral-700'
                }`}
              >
                {item.icon}
              </span>
              <span className="truncate">{item.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
