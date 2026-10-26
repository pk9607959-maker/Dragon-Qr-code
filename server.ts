/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import express, { Request, Response } from 'express';
import path from 'path';
import fs from 'fs';
import crypto from 'crypto';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = parseInt(process.env.PORT || '3000', 10);
const isProd = process.env.NODE_ENV === 'production';

app.use(express.json());

// Persistent dynamic QR storage fallback
const DATA_DIR = path.join(__dirname, '.data');
const DATA_FILE = path.join(DATA_DIR, 'dynamic_qr_codes.json');

interface DynamicQrRecord {
  id: string;
  slug: string;
  destination_url: string;
  label?: string;
  is_active: boolean;
  management_token_hash: string;
  created_at: string;
  updated_at: string;
}

function ensureDataFile(): void {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }
  if (!fs.existsSync(DATA_FILE)) {
    fs.writeFileSync(DATA_FILE, JSON.stringify([]), 'utf-8');
  }
}

function loadDynamicQrs(): DynamicQrRecord[] {
  try {
    ensureDataFile();
    const raw = fs.readFileSync(DATA_FILE, 'utf-8');
    return JSON.parse(raw);
  } catch {
    return [];
  }
}

function saveDynamicQrs(records: DynamicQrRecord[]): void {
  ensureDataFile();
  fs.writeFileSync(DATA_FILE, JSON.stringify(records, null, 2), 'utf-8');
}

function hashToken(token: string): string {
  return crypto.createHash('sha256').update(token.trim()).digest('hex');
}

function generateSlug(length = 7): string {
  const chars = '23456789abcdefghjkmnpqrstuvwxyz';
  let result = '';
  const bytes = crypto.randomBytes(length);
  for (let i = 0; i < length; i++) {
    result += chars[bytes[i] % chars.length];
  }
  return result;
}

// Check for Supabase configuration if present
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_ANON_KEY;

async function querySupabase(endpoint: string, options: RequestInit = {}): Promise<any> {
  if (!supabaseUrl || !supabaseKey) return null;
  try {
    const res = await fetch(`${supabaseUrl.replace(/\/$/, '')}/rest/v1/${endpoint}`, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        apikey: supabaseKey,
        Authorization: `Bearer ${supabaseKey}`,
        ...options.headers,
      },
    });
    if (!res.ok) return null;
    return await res.json();
  } catch {
    return null;
  }
}

// -------------------------------------------------------------
// DYNAMIC QR REDIRECT ENDPOINT (Strictly NO Scan Analytics/Tracking)
// -------------------------------------------------------------
app.get('/r/:slug', async (req: Request, res: Response) => {
  const { slug } = req.params;
  const records = loadDynamicQrs();
  let record = records.find((r) => r.slug.toLowerCase() === slug.toLowerCase());

  // Also query Supabase if configured
  if (!record && supabaseUrl && supabaseKey) {
    const supaData = await querySupabase(`dynamic_qr_codes?slug=eq.${encodeURIComponent(slug)}&select=*`);
    if (Array.isArray(supaData) && supaData.length > 0) {
      record = supaData[0];
    }
  }

  if (!record || !record.is_active) {
    res.status(404).send(`
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>QR Code Inactive | DRAGONQR</title>
        <style>
          body {
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
            background-color: #0f0f0f;
            color: #eaeaea;
            display: flex;
            align-items: center;
            justify-content: center;
            height: 100vh;
            margin: 0;
            padding: 20px;
            box-sizing: border-box;
          }
          .card {
            background: #171717;
            border: 1px solid #2d2d2d;
            border-radius: 12px;
            padding: 36px;
            max-width: 440px;
            text-align: center;
            box-shadow: 0 10px 25px rgba(0,0,0,0.5);
          }
          .badge {
            display: inline-block;
            background: #262626;
            color: #a3a3a3;
            font-size: 11px;
            letter-spacing: 1px;
            padding: 4px 10px;
            border-radius: 4px;
            text-transform: uppercase;
            margin-bottom: 16px;
            font-weight: 600;
          }
          h1 { font-size: 20px; margin: 0 0 10px; color: #ffffff; }
          p { font-size: 14px; line-height: 1.5; color: #a1a1aa; margin: 0 0 24px; }
          a {
            display: inline-block;
            background: #ffffff;
            color: #000000;
            text-decoration: none;
            padding: 10px 20px;
            border-radius: 6px;
            font-size: 13px;
            font-weight: 600;
          }
        </style>
      </head>
      <body>
        <div class="card">
          <div class="badge">DRAGONQR REDIRECT</div>
          <h1>QR Code Inactive or Expired</h1>
          <p>This dynamic QR code destination is currently deactivated or no longer available.</p>
          <a href="/">Go to Dragon Psycho QR</a>
        </div>
      </body>
      </html>
    `);
    return;
  }

  // Sanitize destination URL and redirect directly without tracking
  let destination = record.destination_url.trim();
  if (!/^https?:\/\//i.test(destination)) {
    destination = `https://${destination}`;
  }

  res.redirect(302, destination);
});

// -------------------------------------------------------------
// DYNAMIC QR REST APIS
// -------------------------------------------------------------

// POST /api/dynamic-qr - Create new dynamic QR
app.post('/api/dynamic-qr', async (req: Request, res: Response) => {
  try {
    const { destination_url, label } = req.body;
    if (!destination_url || typeof destination_url !== 'string') {
      res.status(400).json({ error: 'Destination URL is required' });
      return;
    }

    let sanitizedUrl = destination_url.trim();
    if (!/^https?:\/\//i.test(sanitizedUrl)) {
      sanitizedUrl = `https://${sanitizedUrl}`;
    }

    // Verify basic valid URL structure
    try {
      new URL(sanitizedUrl);
    } catch {
      res.status(400).json({ error: 'Invalid URL format' });
      return;
    }

    const records = loadDynamicQrs();
    let slug = generateSlug();
    while (records.some((r) => r.slug === slug)) {
      slug = generateSlug();
    }

    const managementToken = crypto.randomBytes(24).toString('hex');
    const tokenHash = hashToken(managementToken);
    const now = new Date().toISOString();

    const newRecord: DynamicQrRecord = {
      id: crypto.randomUUID(),
      slug,
      destination_url: sanitizedUrl,
      label: typeof label === 'string' ? label.slice(0, 100) : '',
      is_active: true,
      management_token_hash: tokenHash,
      created_at: now,
      updated_at: now,
    };

    records.push(newRecord);
    saveDynamicQrs(records);

    // Also push to Supabase if credentials are provided
    if (supabaseUrl && supabaseKey) {
      await querySupabase('dynamic_qr_codes', {
        method: 'POST',
        headers: { Prefer: 'return=representation' },
        body: JSON.stringify(newRecord),
      });
    }

    // Determine host origin for redirect URL
    const appUrl = process.env.APP_URL || process.env.PUBLIC_DOMAIN || `${req.protocol}://${req.get('host')}`;
    const redirectUrl = `${appUrl.replace(/\/$/, '')}/r/${slug}`;

    res.status(201).json({
      success: true,
      id: newRecord.id,
      slug: newRecord.slug,
      redirect_url: redirectUrl,
      destination_url: newRecord.destination_url,
      label: newRecord.label,
      management_token: managementToken, // returned once to creator!
      created_at: newRecord.created_at,
    });
  } catch (err: any) {
    res.status(500).json({ error: err.message || 'Internal server error' });
  }
});

// GET /api/dynamic-qr/:slug - Get public status
app.get('/api/dynamic-qr/:slug', async (req: Request, res: Response) => {
  const { slug } = req.params;
  const records = loadDynamicQrs();
  const record = records.find((r) => r.slug.toLowerCase() === slug.toLowerCase());

  if (!record) {
    res.status(404).json({ error: 'Dynamic QR not found' });
    return;
  }

  res.json({
    slug: record.slug,
    destination_url: record.destination_url,
    label: record.label,
    is_active: record.is_active,
    created_at: record.created_at,
  });
});

// PATCH /api/dynamic-qr/:slug - Update destination URL using management token
app.patch('/api/dynamic-qr/:slug', async (req: Request, res: Response) => {
  try {
    const { slug } = req.params;
    const { management_token, destination_url, label, is_active } = req.body;

    if (!management_token || typeof management_token !== 'string') {
      res.status(401).json({ error: 'Management token is required' });
      return;
    }

    const records = loadDynamicQrs();
    const index = records.findIndex((r) => r.slug.toLowerCase() === slug.toLowerCase());

    if (index === -1) {
      res.status(404).json({ error: 'Dynamic QR record not found' });
      return;
    }

    const target = records[index];
    const incomingHash = hashToken(management_token);

    if (target.management_token_hash !== incomingHash) {
      res.status(403).json({ error: 'Invalid management token. Access denied.' });
      return;
    }

    if (destination_url && typeof destination_url === 'string') {
      let sanitizedUrl = destination_url.trim();
      if (!/^https?:\/\//i.test(sanitizedUrl)) {
        sanitizedUrl = `https://${sanitizedUrl}`;
      }
      try {
        new URL(sanitizedUrl);
        target.destination_url = sanitizedUrl;
      } catch {
        res.status(400).json({ error: 'Invalid URL format' });
        return;
      }
    }

    if (typeof label === 'string') {
      target.label = label.slice(0, 100);
    }

    if (typeof is_active === 'boolean') {
      target.is_active = is_active;
    }

    target.updated_at = new Date().toISOString();
    records[index] = target;
    saveDynamicQrs(records);

    if (supabaseUrl && supabaseKey) {
      await querySupabase(`dynamic_qr_codes?slug=eq.${encodeURIComponent(slug)}`, {
        method: 'PATCH',
        body: JSON.stringify({
          destination_url: target.destination_url,
          label: target.label,
          is_active: target.is_active,
          updated_at: target.updated_at,
        }),
      });
    }

    res.json({
      success: true,
      slug: target.slug,
      destination_url: target.destination_url,
      label: target.label,
      is_active: target.is_active,
      updated_at: target.updated_at,
    });
  } catch (err: any) {
    res.status(500).json({ error: err.message || 'Internal server error' });
  }
});

// DELETE /api/dynamic-qr/:slug - Deactivate or remove dynamic QR
app.delete('/api/dynamic-qr/:slug', async (req: Request, res: Response) => {
  try {
    const { slug } = req.params;
    const { management_token } = req.body;

    if (!management_token || typeof management_token !== 'string') {
      res.status(401).json({ error: 'Management token is required' });
      return;
    }

    const records = loadDynamicQrs();
    const index = records.findIndex((r) => r.slug.toLowerCase() === slug.toLowerCase());

    if (index === -1) {
      res.status(404).json({ error: 'Dynamic QR record not found' });
      return;
    }

    const target = records[index];
    const incomingHash = hashToken(management_token);

    if (target.management_token_hash !== incomingHash) {
      res.status(403).json({ error: 'Invalid management token. Access denied.' });
      return;
    }

    // Mark as inactive (or delete)
    target.is_active = false;
    target.updated_at = new Date().toISOString();
    records[index] = target;
    saveDynamicQrs(records);

    if (supabaseUrl && supabaseKey) {
      await querySupabase(`dynamic_qr_codes?slug=eq.${encodeURIComponent(slug)}`, {
        method: 'PATCH',
        body: JSON.stringify({ is_active: false, updated_at: target.updated_at }),
      });
    }

    res.json({ success: true, message: 'Dynamic QR code deactivated successfully' });
  } catch (err: any) {
    res.status(500).json({ error: err.message || 'Internal server error' });
  }
});

// GET /api/config - Returns public app configuration (e.g. Cashfree URL, social links)
app.get('/api/config', (_req: Request, res: Response) => {
  res.json({
    cashfreePaymentUrl:
      process.env.CASHFREE_PAYMENT_URL || 'https://payments.cashfree.com/forms/dragonpsycho-donate',
    publicDomain: process.env.PUBLIC_DOMAIN || '',
    appUrl: process.env.APP_URL || '',
  });
});

// -------------------------------------------------------------
// VITE DEV SERVER OR STATIC PROD SERVING
// -------------------------------------------------------------
async function startServer() {
  if (!isProd) {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(__dirname, 'dist');
    app.use(express.static(distPath));
    app.get('*', (_req: Request, res: Response) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(port, '0.0.0.0', () => {
    console.log(`Dragon Psycho QR Server running on http://0.0.0.0:${port}`);
  });
}

startServer();
