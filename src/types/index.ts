/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { QrContentType, QrFormData } from '../utils/qrPayload';

export type DotType =
  | 'square'
  | 'dots'
  | 'rounded'
  | 'classy'
  | 'classy-rounded'
  | 'extra-rounded';

export type CornerSquareType = 'square' | 'dot' | 'extra-rounded';
export type CornerDotType = 'square' | 'dot';

export type ErrorCorrectionLevel = 'L' | 'M' | 'Q' | 'H';

export interface QrStyleOptions {
  fgColor: string;
  bgColor: string;
  dotType: DotType;
  cornerSquareType: CornerSquareType;
  cornerDotType: CornerDotType;
  margin: number;
  errorCorrectionLevel: ErrorCorrectionLevel;
  resolution: number;
  logoDataUrl?: string;
  logoSize: number; // percentage 0.15 to 0.35
}

export interface SavedQrRecord {
  id: string;
  label: string;
  contentType: QrContentType;
  formData: QrFormData;
  styleOptions: QrStyleOptions;
  isDynamic: boolean;
  dynamicSlug?: string;
  dynamicRedirectUrl?: string;
  managementToken?: string;
  previewDataUrl: string;
  createdAt: string;
}

export type NavTab =
  | 'home'
  | 'donate'
  | 'history'
  | 'dragon-psycho'
  | 'privacy'
  | 'terms'
  | 'disclaimer'
  | 'about-us'
  | 'contact-us'
  | 'refund';
