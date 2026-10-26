/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useRef } from 'react';
import {
  Palette,
  Sliders,
  Image as ImageIcon,
  Check,
  AlertTriangle,
  Upload,
  Trash2,
  ShieldAlert,
} from 'lucide-react';
import {
  QrStyleOptions,
  DotType,
  CornerSquareType,
  CornerDotType,
  ErrorCorrectionLevel,
} from '../types';
import { calculateContrastRatio, getContrastRating } from '../utils/contrast';

interface StylingPanelProps {
  options: QrStyleOptions;
  onChange: (options: QrStyleOptions) => void;
}

export const StylingPanel: React.FC<StylingPanelProps> = ({ options, onChange }) => {
  const [activeTab, setActiveTab] = React.useState<'design' | 'colors' | 'logo' | 'export'>('design');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const updateOption = (partial: Partial<QrStyleOptions>) => {
    onChange({ ...options, ...partial });
  };

  const contrastRatio = calculateContrastRatio(options.fgColor, options.bgColor);
  const contrastRating = getContrastRating(contrastRatio);

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
      // Auto upgrade error correction to 'H' for scanning reliability
      updateOption({
        logoDataUrl: result,
        errorCorrectionLevel: 'H',
      });
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="bg-white border border-[#E3E3E3] rounded-xl shadow-xs overflow-hidden">
      {/* Panel header tabs */}
      <div className="flex border-b border-[#E3E3E3] bg-[#F5F5F5] p-1 gap-1">
        <button
          type="button"
          onClick={() => setActiveTab('design')}
          className={`flex-1 py-2 text-xs font-semibold rounded-lg flex items-center justify-center gap-1.5 transition-all ${
            activeTab === 'design'
              ? 'bg-white text-black shadow-xs font-bold'
              : 'text-neutral-600 hover:text-black'
          }`}
        >
          <Sliders className="w-3.5 h-3.5" />
          <span>Pattern & Corners</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('colors')}
          className={`flex-1 py-2 text-xs font-semibold rounded-lg flex items-center justify-center gap-1.5 transition-all ${
            activeTab === 'colors'
              ? 'bg-white text-black shadow-xs font-bold'
              : 'text-neutral-600 hover:text-black'
          }`}
        >
          <Palette className="w-3.5 h-3.5" />
          <span>Colors</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('logo')}
          className={`flex-1 py-2 text-xs font-semibold rounded-lg flex items-center justify-center gap-1.5 transition-all ${
            activeTab === 'logo'
              ? 'bg-white text-black shadow-xs font-bold'
              : 'text-neutral-600 hover:text-black'
          }`}
        >
          <ImageIcon className="w-3.5 h-3.5" />
          <span>Logo</span>
          {options.logoDataUrl && (
            <span className="w-1.5 h-1.5 rounded-full bg-black"></span>
          )}
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('export')}
          className={`flex-1 py-2 text-xs font-semibold rounded-lg flex items-center justify-center gap-1.5 transition-all ${
            activeTab === 'export'
              ? 'bg-white text-black shadow-xs font-bold'
              : 'text-neutral-600 hover:text-black'
          }`}
        >
          <span>Specs & Error</span>
        </button>
      </div>

      <div className="p-5">
        {/* DESIGN & CORNERS TAB */}
        {activeTab === 'design' && (
          <div className="space-y-5">
            {/* Module pattern */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-neutral-700 mb-2">
                QR Dot Pattern Style
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {dotPatterns.map((pat) => {
                  const isSelected = options.dotType === pat.id;
                  return (
                    <button
                      key={pat.id}
                      type="button"
                      onClick={() => updateOption({ dotType: pat.id })}
                      className={`px-3 py-2 text-xs font-medium rounded-lg border text-left flex items-center justify-between transition-all ${
                        isSelected
                          ? 'bg-[#171717] text-white border-[#171717] font-semibold'
                          : 'bg-white text-neutral-800 border-[#E3E3E3] hover:bg-neutral-50'
                      }`}
                    >
                      <span className="truncate">{pat.label}</span>
                      {isSelected && <Check className="w-3.5 h-3.5 shrink-0" />}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Corner Frame */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-neutral-700 mb-2">
                Corner Eye / Frame Shape
              </label>
              <div className="grid grid-cols-3 gap-2">
                {cornerFrames.map((frame) => {
                  const isSelected = options.cornerSquareType === frame.id;
                  return (
                    <button
                      key={frame.id}
                      type="button"
                      onClick={() => updateOption({ cornerSquareType: frame.id })}
                      className={`px-3 py-2 text-xs font-medium rounded-lg border text-left flex items-center justify-between transition-all ${
                        isSelected
                          ? 'bg-[#171717] text-white border-[#171717] font-semibold'
                          : 'bg-white text-neutral-800 border-[#E3E3E3] hover:bg-neutral-50'
                      }`}
                    >
                      <span className="truncate">{frame.label}</span>
                      {isSelected && <Check className="w-3.5 h-3.5 shrink-0" />}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Corner Eyeball */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-neutral-700 mb-2">
                Corner Eyeball / Dot Shape
              </label>
              <div className="grid grid-cols-2 gap-2">
                {cornerEyeballs.map((eye) => {
                  const isSelected = options.cornerDotType === eye.id;
                  return (
                    <button
                      key={eye.id}
                      type="button"
                      onClick={() => updateOption({ cornerDotType: eye.id })}
                      className={`px-3 py-2 text-xs font-medium rounded-lg border text-left flex items-center justify-between transition-all ${
                        isSelected
                          ? 'bg-[#171717] text-white border-[#171717] font-semibold'
                          : 'bg-white text-neutral-800 border-[#E3E3E3] hover:bg-neutral-50'
                      }`}
                    >
                      <span>{eye.label}</span>
                      {isSelected && <Check className="w-3.5 h-3.5 shrink-0" />}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Quiet zone / margin */}
            <div>
              <div className="flex justify-between items-center mb-1">
                <label
                  htmlFor="quiet-zone-slider"
                  className="text-xs font-bold uppercase tracking-wider text-neutral-700"
                >
                  Quiet-Zone Margin: {options.margin}px
                </label>
                <span className="text-[11px] text-neutral-500">
                  {options.margin < 5 ? 'Minimal' : options.margin > 20 ? 'Generous' : 'Standard'}
                </span>
              </div>
              <input
                id="quiet-zone-slider"
                type="range"
                min="0"
                max="35"
                step="5"
                value={options.margin}
                onChange={(e) => updateOption({ margin: parseInt(e.target.value, 10) })}
                className="w-full accent-black cursor-pointer"
              />
              <p className="text-[11px] text-neutral-500 mt-1">
                Preserving an adequate quiet margin ensures smartphone cameras isolate the code quickly.
              </p>
            </div>
          </div>
        )}

        {/* COLORS TAB */}
        {activeTab === 'colors' && (
          <div className="space-y-5">
            {/* Foreground Color */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-neutral-700 mb-2">
                QR Foreground (Dark Elements)
              </label>
              <div className="flex flex-wrap items-center gap-2 mb-2">
                {fgPresets.map((hex) => (
                  <button
                    key={hex}
                    type="button"
                    onClick={() => updateOption({ fgColor: hex })}
                    className={`w-8 h-8 rounded-lg border flex items-center justify-center transition-all ${
                      options.fgColor.toLowerCase() === hex.toLowerCase()
                        ? 'ring-2 ring-black ring-offset-2'
                        : 'border-neutral-300'
                    }`}
                    style={{ backgroundColor: hex }}
                    aria-label={`Foreground ${hex}`}
                  >
                    {options.fgColor.toLowerCase() === hex.toLowerCase() && (
                      <Check className="w-4 h-4 text-white" />
                    )}
                  </button>
                ))}
                <div className="flex items-center gap-1.5 ml-2">
                  <input
                    type="color"
                    value={options.fgColor}
                    onChange={(e) => updateOption({ fgColor: e.target.value })}
                    className="w-8 h-8 rounded-lg border border-neutral-300 cursor-pointer p-0.5"
                    aria-label="Custom Foreground Color"
                  />
                  <span className="font-mono text-xs uppercase text-neutral-600">
                    {options.fgColor}
                  </span>
                </div>
              </div>
            </div>

            {/* Background Color */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-neutral-700 mb-2">
                QR Background (Canvas)
              </label>
              <div className="flex flex-wrap items-center gap-2 mb-2">
                {bgPresets.map((hex) => (
                  <button
                    key={hex}
                    type="button"
                    onClick={() => updateOption({ bgColor: hex })}
                    className={`w-8 h-8 rounded-lg border flex items-center justify-center transition-all ${
                      options.bgColor.toLowerCase() === hex.toLowerCase()
                        ? 'ring-2 ring-black ring-offset-2'
                        : 'border-neutral-300'
                    }`}
                    style={{ backgroundColor: hex }}
                    aria-label={`Background ${hex}`}
                  >
                    {options.bgColor.toLowerCase() === hex.toLowerCase() && (
                      <Check className="w-4 h-4 text-black" />
                    )}
                  </button>
                ))}
                <div className="flex items-center gap-1.5 ml-2">
                  <input
                    type="color"
                    value={options.bgColor}
                    onChange={(e) => updateOption({ bgColor: e.target.value })}
                    className="w-8 h-8 rounded-lg border border-neutral-300 cursor-pointer p-0.5"
                    aria-label="Custom Background Color"
                  />
                  <span className="font-mono text-xs uppercase text-neutral-600">
                    {options.bgColor}
                  </span>
                </div>
              </div>
            </div>

            {/* Contrast Meter */}
            <div className="p-3.5 bg-[#F5F5F5] rounded-xl border border-[#E3E3E3]">
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-xs font-bold uppercase tracking-wider text-neutral-700">
                  Color Contrast Ratio
                </span>
                <span
                  className={`text-xs font-bold px-2 py-0.5 rounded font-mono ${
                    contrastRating.isGood
                      ? 'bg-emerald-100 text-emerald-800'
                      : 'bg-amber-100 text-amber-800'
                  }`}
                >
                  {contrastRatio}:1 ({contrastRating.label})
                </span>
              </div>
              <div className="w-full bg-neutral-200 h-2 rounded-full overflow-hidden">
                <div
                  className={`h-full transition-all ${
                    contrastRatio >= 4.5
                      ? 'bg-emerald-600'
                      : contrastRatio >= 3.0
                      ? 'bg-amber-500'
                      : 'bg-red-500'
                  }`}
                  style={{ width: `${Math.min(100, (contrastRatio / 21) * 100)}%` }}
                />
              </div>

              {contrastRating.warning && (
                <div className="mt-2 text-xs text-amber-800 bg-amber-50 p-2 rounded-lg border border-amber-200 flex items-start gap-1.5">
                  <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5 text-amber-600" />
                  <span>{contrastRating.warning}</span>
                </div>
              )}
            </div>
          </div>
        )}

        {/* LOGO TAB */}
        {activeTab === 'logo' && (
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-neutral-700 mb-1">
                Embedded Center Logo
              </label>
              <p className="text-xs text-neutral-500 mb-3">
                Embed your brand icon or symbol in the center of the QR code.
              </p>

              {options.logoDataUrl ? (
                <div className="flex items-center gap-4 p-3 bg-neutral-50 border border-neutral-200 rounded-xl">
                  <div className="w-14 h-14 rounded-lg bg-white border border-neutral-300 p-1 flex items-center justify-center shrink-0">
                    <img
                      src={options.logoDataUrl}
                      alt="Uploaded Logo Preview"
                      className="max-h-full max-w-full object-contain"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-xs font-semibold text-neutral-900 truncate">
                      Custom Logo Active
                    </div>
                    <div className="text-[11px] text-neutral-500">
                      Error Correction automatically adjusted to High (H)
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      className="px-2.5 py-1.5 text-xs font-semibold bg-white border border-neutral-300 hover:bg-neutral-100 rounded-lg text-neutral-700"
                    >
                      Replace
                    </button>
                    <button
                      type="button"
                      onClick={() => updateOption({ logoDataUrl: undefined })}
                      className="p-1.5 text-red-600 hover:bg-red-50 rounded-lg"
                      aria-label="Remove logo"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ) : (
                <div
                  onClick={() => fileInputRef.current?.click()}
                  className="border-2 border-dashed border-neutral-300 hover:border-black rounded-xl p-6 text-center cursor-pointer bg-neutral-50/50 hover:bg-neutral-50 transition-all"
                >
                  <Upload className="w-8 h-8 mx-auto text-neutral-400 mb-2" />
                  <div className="text-xs font-semibold text-neutral-800">
                    Click to select logo file
                  </div>
                  <div className="text-[11px] text-neutral-500 mt-0.5">
                    PNG, JPG, SVG, WebP up to 2MB
                  </div>
                </div>
              )}

              <input
                ref={fileInputRef}
                type="file"
                accept="image/png,image/jpeg,image/svg+xml,image/webp"
                onChange={handleLogoUpload}
                className="hidden"
              />
            </div>

            {options.logoDataUrl && (
              <div>
                <div className="flex justify-between items-center mb-1">
                  <label
                    htmlFor="logo-size-slider"
                    className="text-xs font-bold uppercase tracking-wider text-neutral-700"
                  >
                    Logo Scale: {Math.round(options.logoSize * 100)}%
                  </label>
                  <span className="text-[11px] text-neutral-500">
                    {options.logoSize > 0.28 ? 'Large' : 'Recommended'}
                  </span>
                </div>
                <input
                  id="logo-size-slider"
                  type="range"
                  min="0.15"
                  max="0.35"
                  step="0.02"
                  value={options.logoSize}
                  onChange={(e) => updateOption({ logoSize: parseFloat(e.target.value) })}
                  className="w-full accent-black cursor-pointer"
                />

                {options.logoSize > 0.28 && (
                  <div className="mt-2 text-[11px] text-amber-800 bg-amber-50 p-2 rounded-lg border border-amber-200 flex items-center gap-1.5">
                    <ShieldAlert className="w-4 h-4 shrink-0 text-amber-600" />
                    <span>
                      Logo size above 28% can obscure scanner data blocks. Test with your camera app before printing.
                    </span>
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        {/* EXPORT & ERROR CORRECTION TAB */}
        {activeTab === 'export' && (
          <div className="space-y-4">
            {/* Error correction */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-neutral-700 mb-1">
                Error Correction Level
              </label>
              <p className="text-[11px] text-neutral-500 mb-2">
                Higher levels recover corrupted or obscured data blocks (recommended for printed or logo codes).
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {[
                  { id: 'L', label: 'Level L', desc: '~7% recovery' },
                  { id: 'M', label: 'Level M', desc: '~15% recovery' },
                  { id: 'Q', label: 'Level Q', desc: '~25% recovery' },
                  { id: 'H', label: 'Level H', desc: '~30% (Best)' },
                ].map((lvl) => {
                  const isSelected = options.errorCorrectionLevel === lvl.id;
                  return (
                    <button
                      key={lvl.id}
                      type="button"
                      onClick={() =>
                        updateOption({ errorCorrectionLevel: lvl.id as ErrorCorrectionLevel })
                      }
                      className={`p-2.5 rounded-lg border text-left transition-all ${
                        isSelected
                          ? 'bg-[#171717] text-white border-[#171717] font-semibold'
                          : 'bg-white text-neutral-800 border-[#E3E3E3] hover:bg-neutral-50'
                      }`}
                    >
                      <div className="text-xs font-bold">{lvl.label}</div>
                      <div className={`text-[10px] ${isSelected ? 'text-neutral-300' : 'text-neutral-500'}`}>
                        {lvl.desc}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Resolution */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-neutral-700 mb-1">
                Export Resolution (PNG)
              </label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { res: 512, label: '512 x 512', desc: 'Screen / Web' },
                  { res: 1024, label: '1024 x 1024', desc: 'Standard Print' },
                  { res: 2048, label: '2048 x 2048', desc: 'Ultra High-Res' },
                ].map((item) => {
                  const isSelected = options.resolution === item.res;
                  return (
                    <button
                      key={item.res}
                      type="button"
                      onClick={() => updateOption({ resolution: item.res })}
                      className={`p-2.5 rounded-lg border text-left transition-all ${
                        isSelected
                          ? 'bg-[#171717] text-white border-[#171717] font-semibold'
                          : 'bg-white text-neutral-800 border-[#E3E3E3] hover:bg-neutral-50'
                      }`}
                    >
                      <div className="text-xs font-bold">{item.label}</div>
                      <div className={`text-[10px] ${isSelected ? 'text-neutral-300' : 'text-neutral-500'}`}>
                        {item.desc}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
