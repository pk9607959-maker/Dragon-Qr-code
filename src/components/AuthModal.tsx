/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import {
  X,
  Mail,
  Lock,
  User,
  Eye,
  EyeOff,
  AlertCircle,
  CheckCircle2,
  ArrowRight,
  ArrowLeft,
  Loader2,
  Sparkles,
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultMode?: 'login' | 'signup';
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  defaultMode = 'login',
}) => {
  const {
    signInWithEmail,
    signUpWithEmail,
    sendPasswordReset,
    signInWithGoogle,
    signInWithApple,
    authError,
    clearAuthError,
  } = useAuth();

  // Mode: 'chooser' (initial 3 buttons) | 'email-login' | 'email-signup' | 'forgot-password'
  const [view, setView] = useState<'chooser' | 'email' | 'forgot-password'>('chooser');
  const [authMode, setAuthMode] = useState<'login' | 'signup'>(defaultMode);

  // Form states
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [resetSent, setResetSent] = useState(false);
  const [localValidation, setLocalValidation] = useState<string | null>(null);

  React.useEffect(() => {
    if (isOpen) {
      setView('chooser');
      setAuthMode(defaultMode);
      clearAuthError();
      setLocalValidation(null);
      setResetSent(false);
    }
  }, [isOpen, defaultMode]);

  if (!isOpen) return null;

  const handleClose = () => {
    clearAuthError();
    setLocalValidation(null);
    setResetSent(false);
    onClose();
  };

  const validateEmail = (val: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val.trim());
  };

  const handleEmailAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    clearAuthError();
    setLocalValidation(null);

    if (!validateEmail(email)) {
      setLocalValidation('Please enter a valid email address.');
      return;
    }

    if (password.length < 6) {
      setLocalValidation('Password must be at least 6 characters long.');
      return;
    }

    setLoading(true);
    try {
      if (authMode === 'login') {
        await signInWithEmail(email, password);
      } else {
        await signUpWithEmail(email, password, name);
      }
      handleClose();
    } catch {
      // Error handled in AuthContext and displayed via authError
    } finally {
      setLoading(false);
    }
  };

  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    clearAuthError();
    setLocalValidation(null);

    if (!validateEmail(email)) {
      setLocalValidation('Please enter the email address for your Dragon QR account.');
      return;
    }

    setLoading(true);
    try {
      await sendPasswordReset(email);
      setResetSent(true);
    } catch {
      // Error in authError
    } finally {
      setLoading(false);
    }
  };

  const handleGoogle = async () => {
    setLoading(true);
    clearAuthError();
    setLocalValidation(null);
    try {
      await signInWithGoogle();
      handleClose();
    } catch {
      // Handled in authError
    } finally {
      setLoading(false);
    }
  };

  const handleApple = async () => {
    setLoading(true);
    clearAuthError();
    setLocalValidation(null);
    try {
      await signInWithApple();
      handleClose();
    } catch {
      // Handled in authError
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Dark backdrop */}
      <div
        className="fixed inset-0 bg-black/75 backdrop-blur-xs transition-opacity"
        onClick={handleClose}
        aria-hidden="true"
      />

      {/* Modal Dialog */}
      <div className="relative w-full max-w-md bg-[#171717] text-white border border-[#2d2d2d] rounded-2xl shadow-2xl overflow-hidden z-10 animate-in fade-in zoom-in-95 duration-150">
        {/* Header bar */}
        <div className="p-5 sm:p-6 pb-4 border-b border-[#2d2d2d] flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-white text-black flex items-center justify-center font-black shadow-xs">
              <svg
                className="w-4 h-4 text-black"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M12 2L2 7l10 5 10-5-10-5z" />
                <path d="M2 17l10 5 10-5" />
                <path d="M2 12l10 5 10-5" />
              </svg>
            </div>
            <div>
              <div className="font-extrabold text-sm tracking-wider">Dragon QR</div>
              <div className="text-[10px] text-neutral-400 font-mono">Account Access</div>
            </div>
          </div>

          <button
            type="button"
            onClick={handleClose}
            className="p-1.5 text-neutral-400 hover:text-white rounded-lg hover:bg-neutral-800 transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 space-y-5">
          {/* Main Titles as required by user prompt */}
          <div className="text-center space-y-1">
            <h2 className="text-xl font-black text-white tracking-tight">
              Welcome to Dragon QR
            </h2>
            <p className="text-xs text-neutral-400">
              {view === 'forgot-password'
                ? 'Reset your Dragon QR account password'
                : 'Choose your preferred sign-in method.'}
            </p>
          </div>

          {/* Error Banner */}
          {(authError || localValidation) && (
            <div
              role="alert"
              className="p-3 bg-red-950/60 border border-red-800 text-red-200 text-xs rounded-xl flex items-start gap-2.5"
            >
              <AlertCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
              <div className="flex-1 leading-relaxed text-[11px]">
                {localValidation || authError}
              </div>
            </div>
          )}

          {/* VIEW 1: CHOOSER (The three requested primary options) */}
          {view === 'chooser' && (
            <div className="space-y-3">
              {/* Button 1: Continue with Google */}
              <button
                type="button"
                onClick={handleGoogle}
                disabled={loading}
                className="w-full group flex items-center justify-center gap-3 py-3 px-4 rounded-xl bg-white text-neutral-900 hover:bg-neutral-100 font-bold text-xs transition-all duration-150 shadow-sm disabled:opacity-60"
              >
                {/* Official Google Logo SVG */}
                <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24">
                  <path
                    fill="#4285F4"
                    d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.8-2.4 3.66v3.05h3.88c2.27-2.09 3.66-5.17 3.66-9.15z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.24v3.15C3.26 21.36 7.33 24 12 24z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.24C.45 8.15 0 9.92 0 12s.45 3.85 1.24 5.42l4.04-3.15z"
                  />
                  <path
                    fill="#EA4335"
                    d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.33 0 3.26 2.64 1.24 6.58l4.04 3.15c.95-2.83 3.6-4.98 6.72-4.98z"
                  />
                </svg>
                <span>Continue with Google</span>
              </button>

              {/* Button 2: Continue with Apple */}
              <button
                type="button"
                onClick={handleApple}
                disabled={loading}
                className="w-full group flex items-center justify-center gap-3 py-3 px-4 rounded-xl bg-black border border-[#333] hover:border-neutral-500 text-white font-bold text-xs transition-all duration-150 shadow-sm disabled:opacity-60"
              >
                {/* Official Apple Logo SVG */}
                <svg className="w-4 h-4 fill-current shrink-0" viewBox="0 0 170 170">
                  <path d="M150.37 130.25c-2.45 5.66-5.35 10.87-8.71 15.66-4.58 6.53-8.33 11.05-11.22 13.56-4.48 4.12-9.28 6.23-14.42 6.35-3.69 0-8.14-1.05-13.32-3.18-5.19-2.12-9.97-3.17-14.34-3.17-4.58 0-9.49 1.05-14.75 3.17-5.26 2.13-9.5 3.24-12.74 3.35-4.35.13-9.16-1.9-14.42-6.08-3.69-3.04-7.67-7.81-11.96-14.34-6.63-10.11-11.96-21.72-15.98-34.84-4.02-13.12-6.03-25.07-6.03-35.85 0-14.12 3.63-25.75 10.88-34.88 7.25-9.13 16.36-13.78 27.33-13.97 4.58 0 9.77 1.2 15.57 3.6 5.8 2.41 9.49 3.66 11.08 3.76 1.8.11 5.76-1.25 11.89-4.09 6.13-2.83 11.63-4.14 16.51-3.92 12.38.65 22.36 5.23 29.93 13.74-10.77 6.53-16.03 15.55-15.79 27.08.24 9.03 3.65 16.66 10.23 22.88 6.58 6.22 14.39 9.85 23.42 10.88-2.12 6.53-4.8 13.43-8.03 20.71zM119.22 31.84c0-7.39 2.66-14.28 7.98-20.67 5.32-6.39 11.9-10.36 19.74-11.92.22 1.2.33 2.29.33 3.27 0 7.29-2.81 14.35-8.43 21.18-5.62 6.83-12.44 10.87-20.46 12.12-.22-1.3-.33-2.63-.33-3.98z" />
                </svg>
                <span>Continue with Apple</span>
              </button>

              <div className="relative py-2 flex items-center justify-center">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-[#2d2d2d]" />
                </div>
                <span className="relative px-3 bg-[#171717] text-[10px] font-mono uppercase tracking-widest text-neutral-500">
                  Or
                </span>
              </div>

              {/* Button 3: Continue with Email */}
              <button
                type="button"
                onClick={() => setView('email')}
                className="w-full flex items-center justify-center gap-2.5 py-3 px-4 rounded-xl bg-neutral-900 border border-[#2d2d2d] hover:border-neutral-400 text-white font-bold text-xs transition-all duration-150 shadow-sm"
              >
                <Mail className="w-4 h-4 text-neutral-300" />
                <span>Continue with Email</span>
              </button>

              {/* Quick toggle at bottom */}
              <div className="pt-2 text-center text-xs text-neutral-400">
                New to Dragon QR?{' '}
                <button
                  type="button"
                  onClick={() => {
                    setAuthMode('signup');
                    setView('email');
                  }}
                  className="font-bold text-white hover:underline underline-offset-4"
                >
                  Create an account
                </button>
              </div>
            </div>
          )}

          {/* VIEW 2: EMAIL / PASSWORD FORM */}
          {view === 'email' && (
            <div className="space-y-4">
              {/* Back to Chooser button + Auth Mode Tabs */}
              <div className="flex items-center justify-between pb-1">
                <button
                  type="button"
                  onClick={() => {
                    setView('chooser');
                    clearAuthError();
                    setLocalValidation(null);
                  }}
                  className="flex items-center gap-1.5 text-xs text-neutral-400 hover:text-white transition-colors"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>Other methods</span>
                </button>

                {/* Tabs: Login vs Sign Up */}
                <div className="inline-flex bg-neutral-900 p-1 rounded-lg border border-[#2d2d2d] text-xs">
                  <button
                    type="button"
                    onClick={() => {
                      setAuthMode('login');
                      clearAuthError();
                      setLocalValidation(null);
                    }}
                    className={`px-3 py-1 rounded-md font-semibold transition-all ${
                      authMode === 'login'
                        ? 'bg-white text-black shadow-xs font-bold'
                        : 'text-neutral-400 hover:text-white'
                    }`}
                  >
                    Login
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setAuthMode('signup');
                      clearAuthError();
                      setLocalValidation(null);
                    }}
                    className={`px-3 py-1 rounded-md font-semibold transition-all ${
                      authMode === 'signup'
                        ? 'bg-white text-black shadow-xs font-bold'
                        : 'text-neutral-400 hover:text-white'
                    }`}
                  >
                    Create Account
                  </button>
                </div>
              </div>

              <form onSubmit={handleEmailAuth} className="space-y-3.5">
                {/* Name (Only for Sign Up) */}
                {authMode === 'signup' && (
                  <div>
                    <label className="block text-xs font-bold text-neutral-300 mb-1">
                      Full Name <span className="text-neutral-500 font-normal">(optional)</span>
                    </label>
                    <div className="relative">
                      <User className="w-4 h-4 text-neutral-500 absolute left-3 top-3" />
                      <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Dragon User"
                        className="w-full pl-9 pr-3.5 py-2.5 rounded-xl bg-black border border-[#2d2d2d] focus:border-white focus:outline-none text-xs text-white placeholder-neutral-500 transition-colors"
                      />
                    </div>
                  </div>
                )}

                {/* Email input */}
                <div>
                  <label className="block text-xs font-bold text-neutral-300 mb-1">
                    Email Address <span className="text-red-400">*</span>
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-neutral-500 absolute left-3 top-3" />
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="name@example.com"
                      className="w-full pl-9 pr-3.5 py-2.5 rounded-xl bg-black border border-[#2d2d2d] focus:border-white focus:outline-none text-xs text-white placeholder-neutral-500 transition-colors"
                    />
                  </div>
                </div>

                {/* Password input with toggle show/hide */}
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="block text-xs font-bold text-neutral-300">
                      Password <span className="text-red-400">*</span>
                    </label>
                    {authMode === 'login' && (
                      <button
                        type="button"
                        onClick={() => {
                          setView('forgot-password');
                          clearAuthError();
                          setLocalValidation(null);
                        }}
                        className="text-[11px] text-neutral-400 hover:text-white hover:underline transition-colors"
                      >
                        Forgot password?
                      </button>
                    )}
                  </div>
                  <div className="relative">
                    <Lock className="w-4 h-4 text-neutral-500 absolute left-3 top-3" />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Minimum 6 characters"
                      className="w-full pl-9 pr-10 py-2.5 rounded-xl bg-black border border-[#2d2d2d] focus:border-white focus:outline-none text-xs text-white placeholder-neutral-500 transition-colors"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-2.5 text-neutral-500 hover:text-white"
                      aria-label={showPassword ? 'Hide password' : 'Show password'}
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                {/* Submit button */}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3 px-4 rounded-xl bg-white text-black font-extrabold text-xs hover:bg-neutral-200 transition-all shadow-md flex items-center justify-center gap-2 active:scale-[0.99] disabled:opacity-50 mt-2"
                >
                  {loading ? (
                    <Loader2 className="w-4 h-4 animate-spin text-black" />
                  ) : (
                    <>
                      <span>{authMode === 'login' ? 'Sign In' : 'Create Account'}</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </>
                  )}
                </button>
              </form>
            </div>
          )}

          {/* VIEW 3: FORGOT PASSWORD */}
          {view === 'forgot-password' && (
            <div className="space-y-4">
              <button
                type="button"
                onClick={() => {
                  setView('email');
                  setResetSent(false);
                  clearAuthError();
                  setLocalValidation(null);
                }}
                className="flex items-center gap-1.5 text-xs text-neutral-400 hover:text-white transition-colors"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Back to sign in</span>
              </button>

              {resetSent ? (
                <div className="p-4 bg-emerald-950/40 border border-emerald-800 rounded-xl space-y-3 text-center">
                  <CheckCircle2 className="w-8 h-8 text-emerald-400 mx-auto" />
                  <div className="text-xs font-bold text-white">Password Reset Email Sent</div>
                  <p className="text-[11px] text-neutral-300 leading-relaxed">
                    We sent a secure password reset link to <span className="font-mono font-bold text-white">{email}</span>. Please check your inbox and spam folder.
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      setView('email');
                      setAuthMode('login');
                      setResetSent(false);
                    }}
                    className="w-full py-2.5 px-4 bg-white text-black text-xs font-bold rounded-xl hover:bg-neutral-200 transition-colors"
                  >
                    Return to Login
                  </button>
                </div>
              ) : (
                <form onSubmit={handleForgotPassword} className="space-y-3.5">
                  <p className="text-xs text-neutral-400 leading-relaxed">
                    Enter your email address and we will send you a password reset link.
                  </p>
                  <div>
                    <label className="block text-xs font-bold text-neutral-300 mb-1">
                      Your Email Address
                    </label>
                    <div className="relative">
                      <Mail className="w-4 h-4 text-neutral-500 absolute left-3 top-3" />
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="name@example.com"
                        className="w-full pl-9 pr-3.5 py-2.5 rounded-xl bg-black border border-[#2d2d2d] focus:border-white focus:outline-none text-xs text-white placeholder-neutral-500 transition-colors"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-3 px-4 rounded-xl bg-white text-black font-extrabold text-xs hover:bg-neutral-200 transition-all shadow-md flex items-center justify-center gap-2 active:scale-[0.99] disabled:opacity-50"
                  >
                    {loading ? (
                      <Loader2 className="w-4 h-4 animate-spin text-black" />
                    ) : (
                      <span>Send Password Reset Email</span>
                    )}
                  </button>
                </form>
              )}
            </div>
          )}
        </div>

        {/* Footer info */}
        <div className="p-4 bg-black/40 border-t border-[#2d2d2d] text-[10px] text-neutral-400 flex items-center justify-between font-mono">
          <span>End-to-End Encrypted</span>
          <span>Zero Surveillance</span>
        </div>
      </div>
    </div>
  );
};
