/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import {
  X,
  User,
  Mail,
  Shield,
  LogOut,
  Calendar,
  Cloud,
  CheckCircle2,
  Copy,
  ExternalLink,
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

interface UserProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  cloudRecordCount: number;
}

export const UserProfileModal: React.FC<UserProfileModalProps> = ({
  isOpen,
  onClose,
  cloudRecordCount,
}) => {
  const { user, userProfile, logOut } = useAuth();
  const [copiedUid, setCopiedUid] = React.useState(false);

  if (!isOpen || !user) return null;

  const handleCopyUid = () => {
    if (user.uid) {
      navigator.clipboard.writeText(user.uid);
      setCopiedUid(true);
      setTimeout(() => setCopiedUid(false), 2000);
    }
  };

  const handleLogout = async () => {
    await logOut();
    onClose();
  };

  const getProviderName = (id?: string) => {
    if (!id) return 'Email & Password';
    if (id.includes('google')) return 'Google Account';
    if (id.includes('apple')) return 'Apple ID';
    return id;
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/75 backdrop-blur-xs transition-opacity"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Modal Dialog */}
      <div className="relative w-full max-w-md bg-[#171717] text-white border border-[#2d2d2d] rounded-2xl shadow-2xl overflow-hidden z-10 animate-in fade-in zoom-in-95 duration-150">
        {/* Header */}
        <div className="p-5 border-b border-[#2d2d2d] flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-white text-black flex items-center justify-center font-black">
              <User className="w-4 h-4" />
            </div>
            <div>
              <div className="font-extrabold text-sm tracking-wider">User Account</div>
              <div className="text-[10px] text-neutral-400 font-mono">Dragon QR Cloud Profile</div>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 text-neutral-400 hover:text-white rounded-lg hover:bg-neutral-800 transition-colors"
            aria-label="Close profile"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* User Avatar + Name + Email */}
          <div className="flex items-center gap-4">
            {user.photoURL ? (
              <img
                src={user.photoURL}
                alt={user.displayName || 'Avatar'}
                className="w-14 h-14 rounded-2xl object-cover border border-neutral-700 shadow-md"
              />
            ) : (
              <div className="w-14 h-14 rounded-2xl bg-neutral-900 border border-neutral-700 flex items-center justify-center text-white font-black text-xl shadow-md">
                {(user.displayName?.[0] || user.email?.[0] || 'U').toUpperCase()}
              </div>
            )}

            <div className="min-w-0 flex-1">
              <div className="text-base font-black text-white truncate">
                {user.displayName || 'Dragon QR User'}
              </div>
              <div className="text-xs text-neutral-400 font-mono truncate">
                {user.email || 'No email provided'}
              </div>
              <div className="mt-1 inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md bg-neutral-900 border border-neutral-800 text-[10px] font-mono text-emerald-400">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                <span>{getProviderName(userProfile?.providerId || user.providerData?.[0]?.providerId)}</span>
              </div>
            </div>
          </div>

          {/* Cloud Sync & Storage Status */}
          <div className="p-4 bg-black/60 rounded-xl border border-[#2d2d2d] space-y-3">
            <div className="flex items-center justify-between text-xs">
              <div className="flex items-center gap-2 text-neutral-300 font-semibold">
                <Cloud className="w-4 h-4 text-emerald-400" />
                <span>Cloud Firestore History</span>
              </div>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-950/80 text-emerald-400 border border-emerald-800">
                Active
              </span>
            </div>

            <div className="grid grid-cols-2 gap-2 pt-1 text-xs">
              <div className="p-2.5 rounded-lg bg-neutral-900/70 border border-neutral-800">
                <span className="text-[10px] uppercase font-mono text-neutral-500 block">Cloud Saved QRs</span>
                <span className="text-sm font-extrabold text-white mt-0.5 block">{cloudRecordCount} records</span>
              </div>
              <div className="p-2.5 rounded-lg bg-neutral-900/70 border border-neutral-800">
                <span className="text-[10px] uppercase font-mono text-neutral-500 block">Zero Surveillance</span>
                <span className="text-sm font-extrabold text-white mt-0.5 block">100% Private</span>
              </div>
            </div>
          </div>

          {/* Account Technical Details */}
          <div className="space-y-2 text-xs">
            <div className="flex items-center justify-between text-neutral-400 pb-1">
              <span className="text-[10px] uppercase font-mono tracking-wider">Account Credentials</span>
            </div>

            {/* UID */}
            <div className="p-2.5 bg-neutral-900 rounded-lg border border-neutral-800 flex items-center justify-between gap-2">
              <div className="min-w-0">
                <div className="text-[10px] text-neutral-500 font-mono">Firebase UID</div>
                <div className="text-xs font-mono text-neutral-300 truncate">{user.uid}</div>
              </div>
              <button
                type="button"
                onClick={handleCopyUid}
                className="p-1.5 rounded bg-neutral-800 hover:bg-neutral-700 text-neutral-300 text-xs shrink-0 flex items-center gap-1"
                title="Copy UID"
              >
                {copiedUid ? <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              </button>
            </div>

            {/* Creation Date */}
            <div className="p-2.5 bg-neutral-900 rounded-lg border border-neutral-800 flex items-center gap-2.5 text-neutral-300">
              <Calendar className="w-4 h-4 text-neutral-500 shrink-0" />
              <div>
                <div className="text-[10px] text-neutral-500 font-mono">Member Since</div>
                <div className="text-xs font-mono">
                  {user.metadata.creationTime
                    ? new Date(user.metadata.creationTime).toLocaleDateString(undefined, {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric',
                      })
                    : 'Recent'}
                </div>
              </div>
            </div>
          </div>

          {/* Sign Out Button */}
          <button
            type="button"
            onClick={handleLogout}
            className="w-full py-3 px-4 rounded-xl bg-neutral-900 hover:bg-red-950/60 border border-neutral-800 hover:border-red-800 text-neutral-200 hover:text-red-300 font-bold text-xs transition-all flex items-center justify-center gap-2"
          >
            <LogOut className="w-4 h-4" />
            <span>Sign Out of Dragon QR</span>
          </button>
        </div>

        {/* Footer info */}
        <div className="p-3.5 bg-black/40 border-t border-[#2d2d2d] text-[10px] text-neutral-500 font-mono text-center">
          Security: No passwords stored in Firestore &bull; Scoped RBAC Rules
        </div>
      </div>
    </div>
  );
};
