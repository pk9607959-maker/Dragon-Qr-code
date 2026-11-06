/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, OAuthProvider } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getAnalytics, isSupported } from 'firebase/analytics';

// Exact Firebase Web Configuration provided by user
export const firebaseConfig = {
  apiKey: "AIzaSyDredW8nk6PQEsDstkvs0ZITXofcZqTHsY",
  authDomain: "dragon-qr-code.firebaseapp.com",
  databaseURL: "https://dragon-qr-code-default-rtdb.firebaseio.com",
  projectId: "dragon-qr-code",
  storageBucket: "dragon-qr-code.firebasestorage.app",
  messagingSenderId: "971001900600",
  appId: "1:971001900600:web:26fca9c5d50a6aeff1c0cd",
  measurementId: "G-Q67VMQYXVB"
};

// Initialize Firebase modular SDK only once
export const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);

// Initialize Firebase Authentication
export const auth = getAuth(app);

// Initialize Cloud Firestore
export const db = getFirestore(app);

// Providers
export const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({
  prompt: 'select_account'
});

export const appleProvider = new OAuthProvider('apple.com');
appleProvider.addScope('email');
appleProvider.addScope('name');

// Optional Analytics initialization if browser supports it
export let analytics: any = null;
if (typeof window !== 'undefined') {
  isSupported()
    .then((supported) => {
      if (supported) {
        analytics = getAnalytics(app);
      }
    })
    .catch(() => {
      // Analytics not supported in this environment
    });
}
