import { createClient } from '@supabase/supabase-js';
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
  linkedinUrn: string;

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
  whatsappNumber: '923171036774',
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

// Initialize Supabase client if credentials exist in environment variables
const supabaseUrl = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
const supabase = supabaseUrl && supabaseKey ? createClient(supabaseUrl, supabaseKey) : null;

// Local DB initialization fallback
function initDbLocal(): SMMDatabaseSchema {
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
        message: 'Social Media Manager Database initialized locally.'
      }],
    };
    fs.writeFileSync(DB_PATH, JSON.stringify(defaultDb, null, 2), 'utf8');
    return defaultDb;
  }

  try {
    const raw = fs.readFileSync(DB_PATH, 'utf8');
    const parsed = JSON.parse(raw) as SMMDatabaseSchema;
    parsed.settings = { ...defaultSettings, ...parsed.settings };
    return parsed;
  } catch (err) {
    const defaultDb: SMMDatabaseSchema = {
      settings: defaultSettings,
      drafts: [],
      logs: [{
        timestamp: new Date().toISOString(),
        level: 'error',
        message: 'Failed to read local database, reset to default configuration.'
      }],
    };
    fs.writeFileSync(DB_PATH, JSON.stringify(defaultDb, null, 2), 'utf8');
    return defaultDb;
  }
}

function saveDbLocal(data: SMMDatabaseSchema): void {
  fs.writeFileSync(DB_PATH, JSON.stringify(data, null, 2), 'utf8');
}

// Universal database handlers (supports async operations)
export async function getSettings(): Promise<SMMSettings> {
  if (supabase) {
    try {
      const { data, error } = await supabase
        .from('smm_state')
        .select('value')
        .eq('key', 'settings')
        .single();
      if (data && data.value) {
        return { ...defaultSettings, ...data.value };
      }
    } catch (err) {
      console.error('Supabase read settings failed, trying fallback:', err);
    }
  }
  const db = initDbLocal();
  return db.settings;
}

export async function updateSettings(settings: Partial<SMMSettings>): Promise<SMMSettings> {
  const current = await getSettings();
  const updated = { ...current, ...settings };

  if (supabase) {
    try {
      await supabase.from('smm_state').upsert({ key: 'settings', value: updated });
      await addLog('info', 'Settings updated successfully in cloud database.');
      return updated;
    } catch (err) {
      console.error('Supabase write settings failed:', err);
    }
  }

  const db = initDbLocal();
  db.settings = updated;
  saveDbLocal(db);
  await addLog('info', 'Settings updated successfully in local database.');
  return updated;
}

export async function getDrafts(): Promise<SMMDraft[]> {
  if (supabase) {
    try {
      const { data } = await supabase
        .from('smm_state')
        .select('value')
        .eq('key', 'drafts')
        .single();
      if (data && data.value) {
        return data.value as SMMDraft[];
      }
    } catch (err) {
      console.error('Supabase read drafts failed:', err);
    }
  }
  const db = initDbLocal();
  return db.drafts;
}

export async function saveDraft(draft: Omit<SMMDraft, 'id' | 'createdAt'> & { id?: string }): Promise<SMMDraft> {
  const drafts = await getDrafts();
  const now = new Date().toISOString();

  const finalDraft: SMMDraft = {
    ...draft,
    id: draft.id || `draft_${Math.random().toString(36).substring(2, 9)}_${Date.now()}`,
    createdAt: draft.id ? undefined : now, // set only on creation
  } as SMMDraft;

  const existingIndex = drafts.findIndex(d => d.id === finalDraft.id);
  if (existingIndex > -1) {
    drafts[existingIndex] = { ...drafts[existingIndex], ...draft } as SMMDraft;
  } else {
    finalDraft.createdAt = now;
    drafts.unshift(finalDraft);
  }

  if (supabase) {
    try {
      await supabase.from('smm_state').upsert({ key: 'drafts', value: drafts });
      return finalDraft;
    } catch (err) {
      console.error('Supabase write drafts failed:', err);
    }
  }

  const db = initDbLocal();
  db.drafts = drafts;
  saveDbLocal(db);
  return finalDraft;
}

export async function deleteDraft(id: string): Promise<boolean> {
  const drafts = await getDrafts();
  const originalLength = drafts.length;
  const filtered = drafts.filter(d => d.id !== id);

  if (filtered.length === originalLength) {
    return false;
  }

  if (supabase) {
    try {
      await supabase.from('smm_state').upsert({ key: 'drafts', value: filtered });
      return true;
    } catch (err) {
      console.error('Supabase delete draft failed:', err);
    }
  }

  const db = initDbLocal();
  db.drafts = filtered;
  saveDbLocal(db);
  return true;
}

export async function getLogs(): Promise<SMMLog[]> {
  if (supabase) {
    try {
      const { data } = await supabase
        .from('smm_state')
        .select('value')
        .eq('key', 'logs')
        .single();
      if (data && data.value) {
        return data.value as SMMLog[];
      }
    } catch (err) {
      console.error('Supabase read logs failed:', err);
    }
  }
  const db = initDbLocal();
  return db.logs;
}

export async function addLog(level: 'info' | 'warn' | 'error', message: string): Promise<void> {
  const logs = await getLogs();
  const log: SMMLog = {
    timestamp: new Date().toISOString(),
    level,
    message,
  };
  logs.unshift(log);

  // Cap logs at 500 entries
  const trimmed = logs.slice(0, 500);

  if (supabase) {
    try {
      await supabase.from('smm_state').upsert({ key: 'logs', value: trimmed });
      return;
    } catch (err) {
      console.error('Supabase write logs failed:', err);
    }
  }

  const db = initDbLocal();
  db.logs = trimmed;
  saveDbLocal(db);
}
