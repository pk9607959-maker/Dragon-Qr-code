/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type QrContentType =
  | 'url'
  | 'text'
  | 'wifi'
  | 'email'
  | 'phone'
  | 'sms'
  | 'whatsapp'
  | 'location'
  | 'event'
  | 'social';

export interface WifiData {
  ssid: string;
  security: 'WPA' | 'WEP' | 'nopass';
  password?: string;
  hidden?: boolean;
}

export interface EmailData {
  email: string;
  subject?: string;
  body?: string;
}

export interface SmsData {
  phoneNumber: string;
  message?: string;
}

export interface WhatsAppData {
  phoneNumber: string;
  message?: string;
}

export interface LocationData {
  latitude: string;
  longitude: string;
  query?: string;
}

export interface EventData {
  title: string;
  startDateTime: string;
  endDateTime: string;
  location?: string;
  description?: string;
}

export interface SocialData {
  platform:
    | 'youtube'
    | 'instagram'
    | 'facebook'
    | 'github'
    | 'twitter'
    | 'linkedin'
    | 'telegram'
    | 'tiktok';
  urlOrHandle: string;
}

export interface QrFormData {
  type: QrContentType;
  label?: string;
  url?: string;
  text?: string;
  wifi?: WifiData;
  email?: EmailData;
  phone?: string;
  sms?: SmsData;
  whatsapp?: WhatsAppData;
  location?: LocationData;
  event?: EventData;
  social?: SocialData;
}

/**
 * Validates a URL ensuring valid protocol
 */
export function sanitizeUrl(raw: string): string {
  const trimmed = raw.trim();
  if (!trimmed) return '';
  if (/^https?:\/\//i.test(trimmed)) {
    return trimmed;
  }
  return `https://${trimmed}`;
}

/**
 * Validates phone numbers (removes spaces and hyphens)
 */
export function sanitizePhone(phone: string): string {
  return phone.replace(/[\s\-\(\)]/g, '').trim();
}

/**
 * Formats ISO or local date strings into iCalendar format (UTC or basic local YYYYMMDDTHHMMSSZ)
 */
export function formatIcsDate(dateStr: string): string {
  if (!dateStr) return '';
  const date = new Date(dateStr);
  if (isNaN(date.getTime())) return '';
  return date.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
}

/**
 * Constructs the social profile URL from platform and handle/url
 */
export function constructSocialUrl(
  platform: SocialData['platform'],
  input: string
): string {
  const cleanInput = input.trim().replace(/^@/, '');
  if (!cleanInput) return '';

  if (/^https?:\/\//i.test(cleanInput)) {
    return cleanInput;
  }

  switch (platform) {
    case 'youtube':
      return cleanInput.startsWith('@')
        ? `https://www.youtube.com/${cleanInput}`
        : `https://www.youtube.com/@${cleanInput}`;
    case 'instagram':
      return `https://www.instagram.com/${cleanInput}`;
    case 'facebook':
      return `https://www.facebook.com/${cleanInput}`;
    case 'github':
      return `https://github.com/${cleanInput}`;
    case 'twitter':
      return `https://x.com/${cleanInput}`;
    case 'linkedin':
      return `https://www.linkedin.com/in/${cleanInput}`;
    case 'telegram':
      return `https://t.me/${cleanInput}`;
    case 'tiktok':
      return `https://www.tiktok.com/@${cleanInput}`;
    default:
      return sanitizeUrl(cleanInput);
  }
}

/**
 * Formats form data into a standards-compliant QR code payload
 */
export function formatQrPayload(data: QrFormData): string {
  switch (data.type) {
    case 'url': {
      return sanitizeUrl(data.url || '');
    }

    case 'text': {
      return (data.text || '').trim();
    }

    case 'wifi': {
      const { ssid = '', security = 'WPA', password = '', hidden = false } =
        data.wifi || { ssid: '', security: 'WPA' };
      const escapedSsid = ssid.replace(/([\\;,:"])/g, '\\$1');
      const escapedPass = password.replace(/([\\;,:"])/g, '\\$1');
      return `WIFI:S:${escapedSsid};T:${security};P:${escapedPass};H:${hidden ? 'true' : 'false'};;`;
    }

    case 'email': {
      const email = (data.email?.email || '').trim();
      if (!email) return '';
      const params: string[] = [];
      if (data.email?.subject?.trim()) {
        params.push(`subject=${encodeURIComponent(data.email.subject.trim())}`);
      }
      if (data.email?.body?.trim()) {
        params.push(`body=${encodeURIComponent(data.email.body.trim())}`);
      }
      return `mailto:${email}${params.length ? `?${params.join('&')}` : ''}`;
    }

    case 'phone': {
      const phone = sanitizePhone(data.phone || '');
      return phone ? `tel:${phone}` : '';
    }

    case 'sms': {
      const phone = sanitizePhone(data.sms?.phoneNumber || '');
      if (!phone) return '';
      const message = data.sms?.message?.trim();
      return message ? `sms:${phone}?body=${encodeURIComponent(message)}` : `sms:${phone}`;
    }

    case 'whatsapp': {
      const phone = sanitizePhone(data.whatsapp?.phoneNumber || '').replace(/^\+/, '');
      if (!phone) return '';
      const message = data.whatsapp?.message?.trim();
      return message
        ? `https://wa.me/${phone}?text=${encodeURIComponent(message)}`
        : `https://wa.me/${phone}`;
    }

    case 'location': {
      const lat = (data.location?.latitude || '').trim();
      const lng = (data.location?.longitude || '').trim();
      if (lat && lng) {
        return `https://maps.google.com/?q=${lat},${lng}`;
      }
      if (data.location?.query?.trim()) {
        return `https://maps.google.com/?q=${encodeURIComponent(data.location.query.trim())}`;
      }
      return '';
    }

    case 'event': {
      const title = (data.event?.title || '').trim();
      if (!title) return '';
      const start = formatIcsDate(data.event?.startDateTime || '');
      const end = formatIcsDate(data.event?.endDateTime || '');
      const loc = (data.event?.location || '').trim();
      const desc = (data.event?.description || '').trim();

      const lines = [
        'BEGIN:VCALENDAR',
        'VERSION:2.0',
        'PRODID:-//DragonPsycho//DRAGONQR//EN',
        'BEGIN:VEVENT',
        `SUMMARY:${title}`,
      ];
      if (start) lines.push(`DTSTART:${start}`);
      if (end) lines.push(`DTEND:${end}`);
      if (loc) lines.push(`LOCATION:${loc}`);
      if (desc) lines.push(`DESCRIPTION:${desc}`);
      lines.push('END:VEVENT', 'END:VCALENDAR');
      return lines.join('\n');
    }

    case 'social': {
      if (!data.social) return '';
      return constructSocialUrl(data.social.platform, data.social.urlOrHandle);
    }

    default:
      return '';
  }
}

/**
 * Validates whether the form data contains required fields to render
 */
export function validateQrFormData(data: QrFormData): { isValid: boolean; error?: string } {
  switch (data.type) {
    case 'url':
      if (!data.url || !data.url.trim()) return { isValid: false, error: 'Destination URL is required' };
      return { isValid: true };

    case 'text':
      if (!data.text || !data.text.trim()) return { isValid: false, error: 'Plain text is required' };
      return { isValid: true };

    case 'wifi':
      if (!data.wifi?.ssid?.trim()) return { isValid: false, error: 'Wi-Fi Network Name (SSID) is required' };
      if (data.wifi.security !== 'nopass' && (!data.wifi.password || data.wifi.password.length < 4)) {
        return { isValid: false, error: 'Wi-Fi password is required (minimum 4 characters)' };
      }
      return { isValid: true };

    case 'email':
      if (!data.email?.email?.trim()) return { isValid: false, error: 'Email address is required' };
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email.email.trim())) {
        return { isValid: false, error: 'Please enter a valid email address' };
      }
      return { isValid: true };

    case 'phone':
      if (!data.phone || !data.phone.trim()) return { isValid: false, error: 'Phone number is required' };
      if (sanitizePhone(data.phone).length < 3) return { isValid: false, error: 'Please enter a valid phone number' };
      return { isValid: true };

    case 'sms':
      if (!data.sms?.phoneNumber?.trim()) return { isValid: false, error: 'Phone number is required' };
      return { isValid: true };

    case 'whatsapp':
      if (!data.whatsapp?.phoneNumber?.trim()) return { isValid: false, error: 'WhatsApp phone number with country code is required' };
      return { isValid: true };

    case 'location':
      if (!data.location?.query?.trim() && (!data.location?.latitude?.trim() || !data.location?.longitude?.trim())) {
        return { isValid: false, error: 'Latitude & Longitude or a search location is required' };
      }
      return { isValid: true };

    case 'event':
      if (!data.event?.title?.trim()) return { isValid: false, error: 'Event title is required' };
      return { isValid: true };

    case 'social':
      if (!data.social?.urlOrHandle?.trim()) return { isValid: false, error: 'Profile handle or URL is required' };
      return { isValid: true };

    default:
      return { isValid: false, error: 'Invalid content type' };
  }
}
