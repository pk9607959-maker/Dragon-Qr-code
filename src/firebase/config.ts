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
  apiKey: "AIzaSyDK6mzhMpRMhnruOv1y_bUcrz-hMf-SaAE",
  authDomain: "dragon-qr-56983.firebaseapp.com",
  databaseURL: "https://dragon-qr-56983-default-rtdb.firebaseio.com",
  projectId: "dragon-qr-56983",
  storageBucket: "dragon-qr-56983.firebasestorage.app",
  messagingSenderId: "615361676795",
  appId: "1:615361676795:web:f37d071ff161ccc6ecb75e",
  measurementId: "G-RRBG5K7FH3"
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
