/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useRef, useState } from 'react';
import QRCodeStyling from 'qr-code-styling';
import {
  Download,
  Copy,
  Check,
  Key,
  Shield,
  ExternalLink,
  Sparkles,
  AlertCircle,
  FileCode,
  Share2,
} from 'lucide-react';
import { QrStyleOptions, SavedQrRecord } from '../types';
import { QrFormData } from '../utils/qrPayload';

interface QrPreviewProps {
  payload: string;
  isValid: boolean;
  validationError?: string;
  styleOptions: QrStyleOptions;
  formData: QrFormData;
  isDynamic: boolean;
  onDynamicCreated?: (record: SavedQrRecord) => void;
  onSaveToHistory: (previewDataUrl: string) => Promise<void>;
}

export const QrPreview: React.FC<QrPreviewProps> = ({
  payload,
  isValid,
  validationError,
  styleOptions,
  formData,
  isDynamic,
  onDynamicCreated,
  onSaveToHistory,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const qrInstanceRef = useRef<QRCodeStyling | null>(null);

  const [downloading, setDownloading] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);
  const [copiedToken, setCopiedToken] = useState(false);

  // Dynamic state
  const [isCreatingDynamic, setIsCreatingDynamic] = useState(false);
  const [dynamicResult, setDynamicResult] = useState<{
    slug: string;
    redirectUrl: string;
    managementToken: string;
  } | null>(null);
  const [dynamicError, setDynamicError] = useState<string | null>(null);

  // Initialize qrCodeStyling instance once
  useEffect(() => {
    if (!containerRef.current) return;

    const qr = new QRCodeStyling({
      width: 280,
      height: 280,
      type: 'canvas',
      data: payload || 'https://dragonpsycho.com',
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

  // Update instance whenever styling or data changes
  const effectiveData = isDynamic && dynamicResult ? dynamicResult.redirectUrl : payload;

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

  // Handle generating / locking in dynamic QR code
  const handleGenerateDynamicQr = async () => {
    if (!isValid) return;
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

      // Extract preview image data URL to store in history
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
    } catch (err: any) {
      setDynamicError(err.message || 'Unable to connect to dynamic QR service.');
    } finally {
      setIsCreatingDynamic(false);
    }
  };

  const capturePreviewUrl = (): string => {
    const canvas = containerRef.current?.querySelector('canvas');
    return canvas ? canvas.toDataURL('image/png') : '';
  };

  const handleDownload = async (format: 'png' | 'svg') => {
    if (!qrInstanceRef.current || !isValid) return;
    setDownloading(true);

    try {
      const label = (formData.label || `dragonqr-${formData.type}`)
        .toLowerCase()
        .replace(/[^a-z0-9_-]/g, '_');

      // Create an export instance with the exact selected resolution for PNG
      if (format === 'png') {
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

        await exportQr.download({
          name: label,
          extension: 'png',
        });
      } else {
        // SVG Vector Download
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

        await exportQrSvg.download({
          name: label,
          extension: 'svg',
        });
      }

      // Save to local history
      const preview = capturePreviewUrl();
      await onSaveToHistory(preview);
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

  return (
    <div className="bg-white border border-[#E3E3E3] rounded-xl p-5 shadow-xs sticky top-20 flex flex-col items-center">
      {/* Header of preview box */}
      <div className="w-full flex items-center justify-between pb-3 border-b border-[#E3E3E3] mb-4">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
          <span className="text-xs font-bold uppercase tracking-wider text-neutral-800">
            Live QR Preview
          </span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-neutral-100 text-neutral-700 border border-neutral-200">
            {isDynamic && dynamicResult ? 'DYNAMIC' : 'STATIC'}
          </span>
          <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-neutral-100 text-neutral-700 border border-neutral-200">
            {styleOptions.resolution}px
          </span>
        </div>
      </div>

      {/* QR Canvas Container with smooth frame */}
      <div className="relative p-3 rounded-2xl bg-neutral-100 border border-neutral-200/80 shadow-inner flex items-center justify-center min-w-[300px] min-h-[300px]">
        {!isValid && (
          <div className="absolute inset-0 bg-neutral-100/90 backdrop-blur-xs rounded-2xl flex flex-col items-center justify-center p-6 text-center z-10">
            <AlertCircle className="w-8 h-8 text-neutral-400 mb-2" />
            <div className="text-xs font-bold text-neutral-700 mb-1">
              Waiting for Input
            </div>
            <div className="text-[11px] text-neutral-500">
              {validationError || 'Enter the required information above to render your QR code.'}
            </div>
          </div>
        )}

        <div
          ref={containerRef}
          className="flex items-center justify-center transition-all duration-200 rounded-xl overflow-hidden bg-white shadow-sm"
        />
      </div>

      {/* Readout of current content */}
      <div className="w-full mt-3 text-center">
        <div className="text-[11px] text-neutral-400 font-mono truncate max-w-xs mx-auto">
          {effectiveData || 'No payload configured'}
        </div>
      </div>

      {/* DYNAMIC MODE ACTIONS & KEY MODAL */}
      {isDynamic && !dynamicResult && (
        <div className="w-full mt-4 p-3.5 bg-neutral-900 text-white rounded-xl text-left border border-neutral-800">
          <div className="flex items-center gap-2 mb-1.5">
            <Sparkles className="w-4 h-4 text-emerald-400" />
            <span className="text-xs font-bold">Dynamic QR Mode Activated</span>
          </div>
          <p className="text-[11px] text-neutral-300 leading-relaxed mb-3">
            Click below to generate your secure redirect link. You will receive an exclusive management key to edit the destination URL anytime.
          </p>
          <button
            type="button"
            onClick={handleGenerateDynamicQr}
            disabled={!isValid || isCreatingDynamic}
            className="w-full py-2 px-3 bg-white text-black font-semibold text-xs rounded-lg hover:bg-neutral-100 transition-all flex items-center justify-center gap-1.5 disabled:opacity-50"
          >
            {isCreatingDynamic ? 'Generating Secure Link...' : 'Create Dynamic QR Link'}
          </button>
          {dynamicError && (
            <p className="text-[11px] text-red-400 mt-2">{dynamicError}</p>
          )}
        </div>
      )}

      {/* DYNAMIC QR SUCCESS PANEL & KEY COPY */}
      {isDynamic && dynamicResult && (
        <div className="w-full mt-4 p-3.5 bg-neutral-950 text-white rounded-xl text-left border border-neutral-800 space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5 text-emerald-400 text-xs font-bold">
              <Shield className="w-4 h-4" />
              <span>Dynamic QR Live</span>
            </div>
            <a
              href={dynamicResult.redirectUrl}
              target="_blank"
              rel="noreferrer"
              className="text-[11px] text-neutral-400 hover:text-white flex items-center gap-1"
            >
              <span>Test Redirect</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>

          <div>
            <div className="text-[10px] text-neutral-400 uppercase tracking-wider mb-0.5">
              Stable Redirect URL (Permanent)
            </div>
            <div className="flex items-center gap-1.5 bg-neutral-900 p-1.5 rounded-lg border border-neutral-800">
              <span className="text-xs font-mono text-emerald-300 truncate flex-1">
                {dynamicResult.redirectUrl}
              </span>
              <button
                type="button"
                onClick={() => handleCopy(dynamicResult.redirectUrl, 'link')}
                className="p-1 rounded hover:bg-neutral-800 text-neutral-300 hover:text-white"
                title="Copy Redirect Link"
              >
                {copiedLink ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              </button>
            </div>
          </div>

          <div className="p-2.5 bg-amber-950/40 border border-amber-800/60 rounded-lg">
            <div className="flex items-center gap-1 text-[11px] font-bold text-amber-300 mb-1">
              <Key className="w-3.5 h-3.5 text-amber-400" />
              <span>Creator Management Key</span>
            </div>
            <p className="text-[10px] text-amber-200/80 mb-2">
              Save this key to edit or delete your destination later. We do not require accounts, so this token is your proof of ownership.
            </p>
            <div className="flex items-center gap-1.5 bg-neutral-900/90 p-1.5 rounded border border-neutral-800">
              <span className="text-[11px] font-mono text-neutral-200 truncate flex-1">
                {dynamicResult.managementToken}
              </span>
              <button
                type="button"
                onClick={() => handleCopy(dynamicResult.managementToken, 'token')}
                className="px-2 py-0.5 bg-neutral-800 hover:bg-neutral-700 text-white text-[10px] font-semibold rounded flex items-center gap-1"
              >
                {copiedToken ? (
                  <>
                    <Check className="w-3 h-3 text-emerald-400" />
                    <span>Copied</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3 h-3" />
                    <span>Copy</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* DOWNLOAD & EXPORT BUTTONS */}
      <div className="w-full mt-5 space-y-2.5">
        <div className="grid grid-cols-2 gap-2">
          <button
            type="button"
            onClick={() => handleDownload('png')}
            disabled={!isValid || downloading}
            className="w-full py-2.5 px-3 bg-[#171717] hover:bg-black text-white text-xs font-bold rounded-lg transition-all flex items-center justify-center gap-1.5 shadow-xs disabled:opacity-40 disabled:cursor-not-allowed"
          >
            <Download className="w-4 h-4" />
            <span>Download PNG</span>
          </button>

          <button
            type="button"
            onClick={() => handleDownload('svg')}
            disabled={!isValid || downloading}
            className="w-full py-2.5 px-3 bg-white hover:bg-neutral-100 text-neutral-900 border border-[#E3E3E3] text-xs font-bold rounded-lg transition-all flex items-center justify-center gap-1.5 shadow-xs disabled:opacity-40 disabled:cursor-not-allowed"
          >
            <FileCode className="w-4 h-4" />
            <span>Download SVG</span>
          </button>
        </div>

        <button
          type="button"
          onClick={async () => {
            if (!isValid) return;
            const preview = capturePreviewUrl();
            await onSaveToHistory(preview);
          }}
          disabled={!isValid}
          className="w-full py-2 text-xs font-semibold text-neutral-600 hover:text-black hover:bg-neutral-100 rounded-lg transition-colors border border-transparent hover:border-neutral-200 disabled:opacity-40"
        >
          Save to History
        </button>
      </div>
    </div>
  );
};
