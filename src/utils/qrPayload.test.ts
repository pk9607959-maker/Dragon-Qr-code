/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import test from 'node:test';
import assert from 'node:assert/strict';
import { calculateContrastRatio, getContrastRating, hexToRgb } from './contrast';
import {
  formatQrPayload,
  validateQrFormData,
  constructSocialUrl,
  sanitizePhone,
  sanitizeUrl,
} from './qrPayload';

test('hexToRgb parses standard hex colors', () => {
  assert.deepEqual(hexToRgb('#ffffff'), { r: 255, g: 255, b: 255 });
  assert.deepEqual(hexToRgb('#000000'), { r: 0, g: 0, b: 0 });
  assert.deepEqual(hexToRgb('#fff'), { r: 255, g: 255, b: 255 });
  assert.deepEqual(hexToRgb('171717'), { r: 23, g: 23, b: 23 });
});

test('calculateContrastRatio calculates black and white correctly', () => {
  const bw = calculateContrastRatio('#000000', '#ffffff');
  assert.equal(bw, 21);
  const rating = getContrastRating(bw);
  assert.equal(rating.isGood, true);

  // Very close colors fail contrast check
  const low = calculateContrastRatio('#333333', '#444444');
  assert.equal(low < 3.0, true);
  const lowRating = getContrastRating(low);
  assert.equal(lowRating.isGood, false);
});

test('sanitizeUrl handles scheme prefixing', () => {
  assert.equal(sanitizeUrl('example.com'), 'https://example.com');
  assert.equal(sanitizeUrl('http://insecure.org'), 'http://insecure.org');
  assert.equal(sanitizeUrl('https://secure.org/path?q=1'), 'https://secure.org/path?q=1');
});

test('sanitizePhone cleans formatting', () => {
  assert.equal(sanitizePhone('+1 (555) 019-2834'), '+15550192834');
});

test('constructSocialUrl formats social profiles correctly', () => {
  assert.equal(
    constructSocialUrl('github', 'pk9607959-maker'),
    'https://github.com/pk9607959-maker'
  );
  assert.equal(
    constructSocialUrl('youtube', '@Dragon_music3e'),
    'https://www.youtube.com/@Dragon_music3e'
  );
  assert.equal(
    constructSocialUrl('instagram', 'dragon__prince_458'),
    'https://www.instagram.com/dragon__prince_458'
  );
});

test('formatQrPayload formats Wi-Fi correctly', () => {
  const payload = formatQrPayload({
    type: 'wifi',
    wifi: {
      ssid: 'DragonGuest',
      security: 'WPA',
      password: 'dragonSecret123',
      hidden: false,
    },
  });
  assert.equal(
    payload,
    'WIFI:S:DragonGuest;T:WPA;P:dragonSecret123;H:false;;'
  );
});

test('formatQrPayload formats Email correctly', () => {
  const payload = formatQrPayload({
    type: 'email',
    email: {
      email: 'test@example.com',
      subject: 'Hello QR',
      body: 'Testing QR email payload',
    },
  });
  assert.equal(
    payload,
    'mailto:test@example.com?subject=Hello%20QR&body=Testing%20QR%20email%20payload'
  );
});

test('formatQrPayload formats Phone correctly', () => {
  const payload = formatQrPayload({
    type: 'phone',
    phone: '+1 234 567 8900',
  });
  assert.equal(payload, 'tel:+12345678900');
});

test('formatQrPayload formats WhatsApp correctly', () => {
  const payload = formatQrPayload({
    type: 'whatsapp',
    whatsapp: {
      phoneNumber: '+1234567890',
      message: 'Hello from Dragon QR',
    },
  });
  assert.equal(payload, 'https://wa.me/1234567890?text=Hello%20from%20Dragon%20QR');
});

test('validateQrFormData validates required inputs', () => {
  const invalidUrl = validateQrFormData({ type: 'url', url: '' });
  assert.equal(invalidUrl.isValid, false);

  const validUrl = validateQrFormData({ type: 'url', url: 'https://example.com' });
  assert.equal(validUrl.isValid, true);

  const invalidWifi = validateQrFormData({
    type: 'wifi',
    wifi: { ssid: '', security: 'WPA', password: '' },
  });
  assert.equal(invalidWifi.isValid, false);
});
