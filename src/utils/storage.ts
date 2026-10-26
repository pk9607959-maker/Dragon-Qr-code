/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { SavedQrRecord } from '../types';

const DB_NAME = 'DragonQR_Database';
const STORE_NAME = 'qr_history';
const DB_VERSION = 1;

function openDb(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    if (typeof window === 'undefined' || !window.indexedDB) {
      reject(new Error('IndexedDB not supported'));
      return;
    }

    const request = window.indexedDB.open(DB_NAME, DB_VERSION);

    request.onupgradeneeded = (event) => {
      const db = (event.target as IDBOpenDBRequest).result;
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME, { keyPath: 'id' });
      }
    };

    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

const LOCAL_STORAGE_FALLBACK_KEY = 'dragonqr_history_fallback';

function getFallbackRecords(): SavedQrRecord[] {
  try {
    const raw = localStorage.getItem(LOCAL_STORAGE_FALLBACK_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function saveFallbackRecords(records: SavedQrRecord[]): void {
  try {
    localStorage.setItem(LOCAL_STORAGE_FALLBACK_KEY, JSON.stringify(records));
  } catch (err) {
    console.warn('LocalStorage save failed:', err);
  }
}

export async function getAllHistory(): Promise<SavedQrRecord[]> {
  try {
    const db = await openDb();
    return new Promise((resolve) => {
      const tx = db.transaction(STORE_NAME, 'readonly');
      const store = tx.objectStore(STORE_NAME);
      const req = store.getAll();
      req.onsuccess = () => {
        const records = (req.result as SavedQrRecord[]) || [];
        // sort newest first
        records.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
        resolve(records);
      };
      req.onerror = () => {
        resolve(getFallbackRecords());
      };
    });
  } catch {
    return getFallbackRecords();
  }
}

export async function saveHistoryEntry(record: SavedQrRecord): Promise<void> {
  try {
    const db = await openDb();
    await new Promise<void>((resolve, reject) => {
      const tx = db.transaction(STORE_NAME, 'readwrite');
      const store = tx.objectStore(STORE_NAME);
      const req = store.put(record);
      req.onsuccess = () => resolve();
      req.onerror = () => reject(req.error);
    });
  } catch {
    const fallback = getFallbackRecords();
    const existingIndex = fallback.findIndex((r) => r.id === record.id);
    if (existingIndex >= 0) {
      fallback[existingIndex] = record;
    } else {
      fallback.unshift(record);
    }
    saveFallbackRecords(fallback);
  }
}

export async function deleteHistoryEntry(id: string): Promise<void> {
  try {
    const db = await openDb();
    await new Promise<void>((resolve, reject) => {
      const tx = db.transaction(STORE_NAME, 'readwrite');
      const store = tx.objectStore(STORE_NAME);
      const req = store.delete(id);
      req.onsuccess = () => resolve();
      req.onerror = () => reject(req.error);
    });
  } catch {
    const fallback = getFallbackRecords().filter((r) => r.id !== id);
    saveFallbackRecords(fallback);
  }
}

export async function clearAllHistory(): Promise<void> {
  try {
    const db = await openDb();
    await new Promise<void>((resolve, reject) => {
      const tx = db.transaction(STORE_NAME, 'readwrite');
      const store = tx.objectStore(STORE_NAME);
      const req = store.clear();
      req.onsuccess = () => resolve();
      req.onerror = () => reject(req.error);
    });
  } catch {
    saveFallbackRecords([]);
  }
}
