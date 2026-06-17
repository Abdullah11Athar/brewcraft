import fs from 'fs';
import path from 'path';

const DB_PATH = path.join(process.cwd(), 'data', 'smm-db.json');

export interface SMMDraft {
  id: string;
  status: 'draft' | 'pending_approval' | 'approved' | 'published' | 'failed';
  type: 'facebook' | 'instagram' | 'threads' | 'twitter' | 'linkedin' | 'newsletter' | 'article' | 'whatsapp_status';
  title: string;
  content: string;
  htmlContent?: string;
  imageUrls: string[];
  videoScript?: {
    scenes: Array<{ sceneNumber: number; visual: string; voiceover: string; duration: number }>;
  };
  createdAt: string;
  scheduledFor?: string;
  publishedAt?: string;
  sourceTopic?: string;
  error?: string;
}

export interface SMMSettings {
  // LLM Keys
  openRouterApiKey: string;
  openAiApiKey: string;
  geminiApiKey: string;
  activeLlmProvider: 'openrouter' | 'openai' | 'gemini';

  // WhatsApp Alerts
  whatsappNumber: string;
  whatsappAlertType: 'whatsapp_web' | 'callmebot' | 'twilio' | 'none';
  callmebotApiKey: string;
  twilioAccountSid: string;
  twilioAuthToken: string;
  twilioFromNumber: string;

  // Social Keys
  twitterApiKey: string;
  twitterApiSecret: string;
  twitterAccessToken: string;
  twitterAccessSecret: string;
  
  linkedinClientId: string;
  linkedinClientSecret: string;
  linkedinAccessToken: string;
  linkedinUrn: string; // User ID or Organization ID

  facebookPageId: string;
  facebookAccessToken: string;

  instagramAccountId: string;
  instagramAccessToken: string;

  threadsUserId: string;
  threadsAccessToken: string;

  // Email Marketing
  resendApiKey: string;
  resendSenderEmail: string;

  // Search/Topic Config
  searchKeywords: string[];
  searchFrequencyHours: number;
  lastSearchTime?: string;
}

export interface SMMLog {
  timestamp: string;
  level: 'info' | 'warn' | 'error';
  message: string;
}

export interface SMMDatabaseSchema {
  settings: SMMSettings;
  drafts: SMMDraft[];
  logs: SMMLog[];
}

const defaultSettings: SMMSettings = {
  openRouterApiKey: '',
  openAiApiKey: '',
  geminiApiKey: '',
  activeLlmProvider: 'gemini',
  whatsappNumber: '923171036774', // Default from components/WhatsApp.tsx
  whatsappAlertType: 'callmebot',
  callmebotApiKey: '',
  twilioAccountSid: '',
  twilioAuthToken: '',
  twilioFromNumber: '',
  twitterApiKey: '',
  twitterApiSecret: '',
  twitterAccessToken: '',
  twitterAccessSecret: '',
  linkedinClientId: '',
  linkedinClientSecret: '',
  linkedinAccessToken: '',
  linkedinUrn: '',
  facebookPageId: '',
  facebookAccessToken: '',
  instagramAccountId: '',
  instagramAccessToken: '',
  threadsUserId: '',
  threadsAccessToken: '',
  resendApiKey: '',
  resendSenderEmail: 'newsletter@brewcraft.shop',
  searchKeywords: ['coffee trends 2026', 'specialty coffee brewing', 'latte art techniques', 'caffeine benefits'],
  searchFrequencyHours: 12,
};

// Initialize DB if not exists
export function initDb(): SMMDatabaseSchema {
  const dir = path.dirname(DB_PATH);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }

  if (!fs.existsSync(DB_PATH)) {
    const defaultDb: SMMDatabaseSchema = {
      settings: defaultSettings,
      drafts: [],
      logs: [{
        timestamp: new Date().toISOString(),
        level: 'info',
        message: 'Social Media Manager Database initialized.'
      }],
    };
    fs.writeFileSync(DB_PATH, JSON.stringify(defaultDb, null, 2), 'utf8');
    return defaultDb;
  }

  try {
    const raw = fs.readFileSync(DB_PATH, 'utf8');
    const parsed = JSON.parse(raw) as SMMDatabaseSchema;
    // Merge missing settings keys
    parsed.settings = { ...defaultSettings, ...parsed.settings };
    return parsed;
  } catch (err) {
    console.error('Error reading SMM DB, resetting to defaults', err);
    const defaultDb: SMMDatabaseSchema = {
      settings: defaultSettings,
      drafts: [],
      logs: [{
        timestamp: new Date().toISOString(),
        level: 'error',
        message: 'Failed to read database, reset to default configuration.'
      }],
    };
    fs.writeFileSync(DB_PATH, JSON.stringify(defaultDb, null, 2), 'utf8');
    return defaultDb;
  }
}

export function saveDb(data: SMMDatabaseSchema): void {
  fs.writeFileSync(DB_PATH, JSON.stringify(data, null, 2), 'utf8');
}

export function getSettings(): SMMSettings {
  const db = initDb();
  return db.settings;
}

export function updateSettings(settings: Partial<SMMSettings>): SMMSettings {
  const db = initDb();
  db.settings = { ...db.settings, ...settings };
  saveDb(db);
  addLog('info', 'Settings updated successfully.');
  return db.settings;
}

export function getDrafts(): SMMDraft[] {
  const db = initDb();
  return db.drafts;
}

export function saveDraft(draft: Omit<SMMDraft, 'id' | 'createdAt'> & { id?: string }): SMMDraft {
  const db = initDb();
  const now = new Date().toISOString();
  
  const finalDraft: SMMDraft = {
    ...draft,
    id: draft.id || `draft_${Math.random().toString(36).substring(2, 9)}_${Date.now()}`,
    createdAt: now,
  } as SMMDraft;

  const existingIndex = db.drafts.findIndex(d => d.id === finalDraft.id);
  if (existingIndex > -1) {
    db.drafts[existingIndex] = { ...db.drafts[existingIndex], ...draft } as SMMDraft;
  } else {
    db.drafts.unshift(finalDraft);
  }

  saveDb(db);
  return finalDraft;
}

export function deleteDraft(id: string): boolean {
  const db = initDb();
  const originalLength = db.drafts.length;
  db.drafts = db.drafts.filter(d => d.id !== id);
  saveDb(db);
  return db.drafts.length < originalLength;
}

export function addLog(level: 'info' | 'warn' | 'error', message: string): void {
  const db = initDb();
  const log: SMMLog = {
    timestamp: new Date().toISOString(),
    level,
    message,
  };
  db.logs.unshift(log);
  // Cap logs at 500 entries
  if (db.logs.length > 500) {
    db.logs = db.logs.slice(0, 500);
  }
  saveDb(db);
}

export function getLogs(): SMMLog[] {
  const db = initDb();
  return db.logs;
}
