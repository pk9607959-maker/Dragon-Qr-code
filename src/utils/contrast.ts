/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * Converts a 3 or 6 hex string to RGB
 */
export function hexToRgb(hex: string): { r: number; g: number; b: number } | null {
  const sanitized = hex.replace('#', '').trim();
  if (sanitized.length === 3) {
    const r = parseInt(sanitized[0] + sanitized[0], 16);
    const g = parseInt(sanitized[1] + sanitized[1], 16);
    const b = parseInt(sanitized[2] + sanitized[2], 16);
    return isNaN(r) || isNaN(g) || isNaN(b) ? null : { r, g, b };
  }
  if (sanitized.length === 6) {
    const r = parseInt(sanitized.substring(0, 2), 16);
    const g = parseInt(sanitized.substring(2, 4), 16);
    const b = parseInt(sanitized.substring(4, 6), 16);
    return isNaN(r) || isNaN(g) || isNaN(b) ? null : { r, g, b };
  }
  return null;
}

/**
 * Calculates relative luminance for WCAG contrast
 */
export function getRelativeLuminance(r: number, g: number, b: number): number {
  const [sR, sG, sB] = [r, g, b].map((val) => {
    const c = val / 255;
    return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
  });
  return 0.2126 * sR + 0.7152 * sG + 0.0722 * sB;
}

/**
 * Calculates the contrast ratio between two hex colors (1 to 21)
 */
export function calculateContrastRatio(fgHex: string, bgHex: string): number {
  const fg = hexToRgb(fgHex) || { r: 0, g: 0, b: 0 };
  const bg = hexToRgb(bgHex) || { r: 255, g: 255, b: 255 };

  const l1 = getRelativeLuminance(fg.r, fg.g, fg.b);
  const l2 = getRelativeLuminance(bg.r, bg.g, bg.b);

  const lighter = Math.max(l1, l2);
  const darker = Math.min(l1, l2);

  const ratio = (lighter + 0.05) / (darker + 0.05);
  return Math.round(ratio * 100) / 100;
}

/**
 * Determines contrast reliability rating for QR scanning
 */
export function getContrastRating(ratio: number): {
  isGood: boolean;
  label: string;
  warning?: string;
} {
  if (ratio >= 4.5) {
    return {
      isGood: true,
      label: 'Optimal contrast',
    };
  }
  if (ratio >= 3.0) {
    return {
      isGood: true,
      label: 'Acceptable contrast',
    };
  }
  return {
    isGood: false,
    label: 'Low contrast',
    warning:
      'Low color contrast (below 3.0:1) may prevent camera scanners from reading the QR code reliably. Dark foreground on light background is strongly recommended.',
  };
}
