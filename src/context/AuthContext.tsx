/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { createContext, useContext, useEffect, useState } from 'react';
import {
  User,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signInWithPopup,
  signInWithRedirect,
  getRedirectResult,
  signOut,
  updateProfile,
} from 'firebase/auth';
import { auth, googleProvider, appleProvider } from '../firebase/config';
import { syncUserProfile } from '../firebase/firestore';
import { UserProfile } from '../types';

interface AuthContextType {
  user: User | null;
  userProfile: UserProfile | null;
  loading: boolean;
  authError: string | null;
  clearAuthError: () => void;
  signInWithEmail: (email: string, pass: string) => Promise<void>;
  signUpWithEmail: (email: string, pass: string, name?: string) => Promise<void>;
  sendPasswordReset: (email: string) => Promise<void>;
  signInWithGoogle: () => Promise<void>;
  signInWithApple: () => Promise<void>;
  logOut: () => Promise<void>;
  refreshUserProfile: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [authError, setAuthError] = useState<string | null>(null);

  const clearAuthError = () => setAuthError(null);

  // Handle redirect result if redirect login was triggered
  useEffect(() => {
    getRedirectResult(auth)
      .then(async (result) => {
        if (result?.user) {
          try {
            const profile = await syncUserProfile(result.user);
            setUserProfile(profile);
          } catch (e) {
            console.error('Failed to sync profile after redirect login:', e);
          }
        }
      })
      .catch((err) => {
        console.error('Redirect sign in error:', err);
        setAuthError(formatFirebaseError(err));
      });
  }, []);

  // Listen to Auth State
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        try {
          const profile = await syncUserProfile(currentUser);
          setUserProfile(profile);
        } catch (err) {
          console.warn('Could not sync user profile to Firestore:', err);
          // Fallback user profile in memory
          setUserProfile({
            uid: currentUser.uid,
            email: currentUser.email,
            displayName: currentUser.displayName,
            photoURL: currentUser.photoURL,
            providerId: currentUser.providerData?.[0]?.providerId || 'password',
            createdAt: new Date().toISOString(),
            lastLoginAt: new Date().toISOString(),
          });
        }
      } else {
        setUserProfile(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const refreshUserProfile = async () => {
    if (auth.currentUser) {
      try {
        const profile = await syncUserProfile(auth.currentUser);
        setUserProfile(profile);
      } catch (e) {
        console.error('Error refreshing profile:', e);
      }
    }
  };

  // 1. Email & Password: Sign In
  const signInWithEmail = async (email: string, pass: string) => {
    setAuthError(null);
    try {
      const res = await signInWithEmailAndPassword(auth, email.trim(), pass);
      const profile = await syncUserProfile(res.user);
      setUserProfile(profile);
    } catch (err: any) {
      const formatted = formatFirebaseError(err);
      setAuthError(formatted);
      throw new Error(formatted);
    }
  };

  // 1. Email & Password: Sign Up
  const signUpWithEmail = async (email: string, pass: string, name?: string) => {
    setAuthError(null);
    try {
      const res = await createUserWithEmailAndPassword(auth, email.trim(), pass);
      if (name && name.trim()) {
        await updateProfile(res.user, { displayName: name.trim() });
      }
      const profile = await syncUserProfile(res.user);
      setUserProfile(profile);
    } catch (err: any) {
      const formatted = formatFirebaseError(err);
      setAuthError(formatted);
      throw new Error(formatted);
    }
  };

  // 1. Email & Password: Password Reset
  const sendPasswordReset = async (email: string) => {
    setAuthError(null);
    try {
      await sendPasswordResetEmail(auth, email.trim());
    } catch (err: any) {
      const formatted = formatFirebaseError(err);
      setAuthError(formatted);
      throw new Error(formatted);
    }
  };

  // 2. Google Sign-In with real GoogleAuthProvider
  const signInWithGoogle = async () => {
    setAuthError(null);
    try {
      const res = await signInWithPopup(auth, googleProvider);
      if (res?.user) {
        const profile = await syncUserProfile(res.user);
        setUserProfile(profile);
      }
    } catch (err: any) {
      if (
        err.code === 'auth/popup-blocked' ||
        err.code === 'auth/popup-closed-by-user' ||
        err.code === 'auth/cancelled-popup-request'
      ) {
        // Fallback to signInWithRedirect if popup is blocked
        try {
          await signInWithRedirect(auth, googleProvider);
          return;
        } catch (redirectErr: any) {
          const formatted = formatFirebaseError(redirectErr);
          setAuthError(formatted);
          throw new Error(formatted);
        }
      }
      const formatted = formatFirebaseError(err);
      setAuthError(formatted);
      throw new Error(formatted);
    }
  };

  // 3. Apple Sign-In with official Apple OAuthProvider
  const signInWithApple = async () => {
    setAuthError(null);
    try {
      const res = await signInWithPopup(auth, appleProvider);
      if (res?.user) {
        const profile = await syncUserProfile(res.user);
        setUserProfile(profile);
      }
    } catch (err: any) {
      // Check if Apple is not yet configured in Firebase console
      if (
        err.code === 'auth/operation-not-allowed' ||
        err.code === 'auth/configuration-not-found' ||
        err.code === 'auth/invalid-provider-id'
      ) {
        const message =
          'Apple Sign-In is not currently enabled for this application. Please sign in with Google or Email.';
        setAuthError(message);
        throw new Error(message);
      }

      if (
        err.code === 'auth/popup-blocked' ||
        err.code === 'auth/popup-closed-by-user' ||
        err.code === 'auth/cancelled-popup-request'
      ) {
        try {
          await signInWithRedirect(auth, appleProvider);
          return;
        } catch (redirectErr: any) {
          const formatted = formatFirebaseError(redirectErr);
          setAuthError(formatted);
          throw new Error(formatted);
        }
      }

      const formatted = formatFirebaseError(err);
      setAuthError(formatted);
      throw new Error(formatted);
    }
  };

  // Sign out
  const logOut = async () => {
    setAuthError(null);
    try {
      await signOut(auth);
      setUser(null);
      setUserProfile(null);
    } catch (err: any) {
      const formatted = formatFirebaseError(err);
      setAuthError(formatted);
      throw new Error(formatted);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        userProfile,
        loading,
        authError,
        clearAuthError,
        signInWithEmail,
        signUpWithEmail,
        sendPasswordReset,
        signInWithGoogle,
        signInWithApple,
        logOut,
        refreshUserProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

/**
 * Format Firebase Auth errors into clear, actionable messages
 */
function formatFirebaseError(err: any): string {
  if (!err) return 'An unexpected authentication error occurred.';
  const code = err.code || '';

  switch (code) {
    case 'auth/invalid-email':
      return 'The email address is improperly formatted.';
    case 'auth/user-disabled':
      return 'This user account has been disabled.';
    case 'auth/user-not-found':
      return 'No account exists with this email. Please check or create an account.';
    case 'auth/wrong-password':
    case 'auth/invalid-credential':
      return 'Incorrect password or email credentials. Please verify your details or reset your password.';
    case 'auth/email-already-in-use':
      return 'An account already exists with this email address. Please sign in instead.';
    case 'auth/weak-password':
      return 'Password is too weak. Please use at least 6 characters.';
    case 'auth/operation-not-allowed':
      return 'This sign-in method is currently disabled. Please sign in with Google or Email.';
    case 'auth/popup-blocked':
      return 'Popup was blocked by your browser. Please allow popups or use redirect.';
    case 'auth/popup-closed-by-user':
      return 'The sign-in popup was closed before completing authentication.';
    case 'auth/network-request-failed':
      return 'Network connection error. Please check your internet connection.';
    case 'auth/too-many-requests':
      return 'Too many failed login attempts. Access has been temporarily disabled. Please try again later or reset your password.';
    default:
      return err.message || 'An error occurred during authentication. Please try again.';
  }
}
