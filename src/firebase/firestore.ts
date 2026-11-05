/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  doc,
  setDoc,
  getDoc,
  collection,
  query,
  getDocs,
  deleteDoc,
  serverTimestamp,
  orderBy,
} from 'firebase/firestore';
import { db } from './config';
import { UserProfile, SavedQrRecord } from '../types';
import { User } from 'firebase/auth';

/**
 * Creates or updates the user profile document in Firestore:
 * Collection: "users", Document ID: user.uid
 */
export async function syncUserProfile(user: User): Promise<UserProfile> {
  const userRef = doc(db, 'users', user.uid);
  const snap = await getDoc(userRef);

  const nowIso = new Date().toISOString();
  const providerId = user.providerData?.[0]?.providerId || 'password';

  let profileData: UserProfile;

  if (snap.exists()) {
    const existing = snap.data();
    profileData = {
      uid: user.uid,
      email: user.email || existing.email || null,
      displayName: user.displayName || existing.displayName || null,
      photoURL: user.photoURL || existing.photoURL || null,
      providerId: providerId || existing.providerId || 'password',
      createdAt: existing.createdAt || nowIso,
      lastLoginAt: nowIso,
    };
    await setDoc(
      userRef,
      {
        ...profileData,
        updatedAt: serverTimestamp(),
      },
      { merge: true }
    );
  } else {
    profileData = {
      uid: user.uid,
      email: user.email || null,
      displayName: user.displayName || null,
      photoURL: user.photoURL || null,
      providerId,
      createdAt: nowIso,
      lastLoginAt: nowIso,
    };
    await setDoc(userRef, {
      ...profileData,
      createdAtServer: serverTimestamp(),
      updatedAt: serverTimestamp(),
    });
  }

  return profileData;
}

/**
 * Fetch a user profile by UID
 */
export async function getUserProfile(uid: string): Promise<UserProfile | null> {
  try {
    const userRef = doc(db, 'users', uid);
    const snap = await getDoc(userRef);
    if (snap.exists()) {
      return snap.data() as UserProfile;
    }
    return null;
  } catch (err) {
    console.error('Error fetching user profile:', err);
    return null;
  }
}

/**
 * Save a generated QR record to the authenticated user's Cloud Firestore history
 * Path: users/{uid}/qrHistory/{recordId}
 */
export async function saveUserCloudQr(userId: string, record: SavedQrRecord): Promise<void> {
  try {
    const recordRef = doc(db, 'users', userId, 'qrHistory', record.id);
    await setDoc(recordRef, {
      ...record,
      userId,
      isSyncedToCloud: true,
      savedAtServer: serverTimestamp(),
    });
  } catch (err) {
    console.error('Failed to save QR code to cloud:', err);
    throw err;
  }
}

/**
 * Load all cloud QR codes for the authenticated user
 */
export async function getUserCloudHistory(userId: string): Promise<SavedQrRecord[]> {
  try {
    const historyCol = collection(db, 'users', userId, 'qrHistory');
    const q = query(historyCol, orderBy('createdAt', 'desc'));
    const snap = await getDocs(q);

    const records: SavedQrRecord[] = [];
    snap.forEach((docSnap) => {
      records.push(docSnap.data() as SavedQrRecord);
    });
    return records;
  } catch (err) {
    console.warn('Could not load user cloud history (user may be offline or permissions pending):', err);
    return [];
  }
}

/**
 * Delete a QR record from the user's cloud history
 */
export async function deleteUserCloudQr(userId: string, recordId: string): Promise<void> {
  try {
    const recordRef = doc(db, 'users', userId, 'qrHistory', recordId);
    await deleteDoc(recordRef);
  } catch (err) {
    console.error('Failed to delete QR code from cloud:', err);
    throw err;
  }
}
