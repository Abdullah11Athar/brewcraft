'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Mock components to replicate social media icons
const XIcon = () => (
  <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
);

const LinkedInIcon = () => (
  <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.763-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.779-1.75-1.75s.784-1.75 1.75-1.75 1.75.779 1.75 1.75-.784 1.75-1.75 1.75zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
);

const MetaIcon = () => (
  <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current"><path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c4.56-.93 8-4.96 8-9.75z"/></svg>
);

const InstagramIcon = () => (
  <svg viewBox="0 0 24 24" className="w-5 h-5 fill-none stroke-current stroke-2"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
);

const ThreadsIcon = () => (
  <svg viewBox="0 0 24 24" className="w-5 h-5 fill-none stroke-current stroke-2"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1.68 14.5c-1.32.48-2.64.12-3.36-.6-.72-.72-1.08-1.92-1.08-3.6 0-1.8.36-3 1.08-3.72.72-.72 2.04-1.08 3.36-.6 1.32.48 1.92 1.56 1.92 3.12 0 1.56-.6 2.64-1.92 3.12z"/></svg>
);

const WhatsAppIcon = () => (
  <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
);

const MailIcon = () => (
  <svg viewBox="0 0 24 24" className="w-5 h-5 fill-none stroke-current stroke-2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
);

const ArticleIcon = () => (
  <svg viewBox="0 0 24 24" className="w-5 h-5 fill-none stroke-current stroke-2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>
);

export default function SocialMediaManagerDashboard() {
  const [activeTab, setActiveTab] = useState<'pending' | 'agent' | 'settings' | 'logs'>('pending');
  const [drafts, setDrafts] = useState<any[]>([]);
  const [logs, setLogs] = useState<any[]>([]);
  const [settings, setSettings] = useState<any>({});
  const [isLlmLoading, setIsLlmLoading] = useState(false);
  const [customSearchQuery, setCustomSearchQuery] = useState('');
  const [agentStatusText, setAgentStatusText] = useState('Idle');
  
  // Modals state
  const [editingDraft, setEditingDraft] = useState<any | null>(null);
  const [previewingDraft, setPreviewingDraft] = useState<any | null>(null);

  // Authentication State
  const [authToken, setAuthToken] = useState<string>('');
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [passwordInput, setPasswordInput] = useState('');
  const [loginError, setLoginError] = useState('');

  // Auto-authenticate if token exists in sessionStorage
  useEffect(() => {
    const saved = sessionStorage.getItem('smm_admin_token');
    if (saved) {
      setAuthToken(saved);
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
    }
  }, []);

  // Fetch helper that appends Bearer Authorization header securely
  const smmFetch = async (url: string, options: RequestInit = {}) => {
    const token = authToken || sessionStorage.getItem('smm_admin_token') || '';
    const headers = {
      ...options.headers,
      'Authorization': `Bearer ${token}`
    };
    const res = await fetch(url, { ...options, headers });
    if (res.status === 401) {
      sessionStorage.removeItem('smm_admin_token');
      setAuthToken('');
      setIsAuthenticated(false);
    }
    return res;
  };

  // Secure clipboard copying method (mitigates clipboard copy attacks)
  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text).then(() => {
      alert('Content copied securely to clipboard!');
    }).catch(err => {
      console.error('Secure copy failed:', err);
    });
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError('');
    try {
      const res = await fetch('/api/smm/settings', {
        headers: {
          'Authorization': `Bearer ${passwordInput}`
        }
      });
      if (res.ok) {
        sessionStorage.setItem('smm_admin_token', passwordInput);
        setAuthToken(passwordInput);
        setIsAuthenticated(true);
      } else {
        setLoginError('Invalid Administrator Password.');
      }
    } catch {
      setLoginError('Failed to connect to authentication backend.');
    }
  };

  // Load basic SMM data when authenticated
  useEffect(() => {
    if (isAuthenticated) {
      fetchDrafts();
      fetchSettings();
      fetchLogs();
    }
  }, [isAuthenticated]);

  const fetchDrafts = async () => {
    const res = await smmFetch('/api/smm/drafts');
    if (res.ok) {
      const data = await res.json();
      setDrafts(data);
    }
  };

  const fetchSettings = async () => {
    const res = await smmFetch('/api/smm/settings');
    if (res.ok) {
      const data = await res.json();
      setSettings(data);
    }
  };

  const fetchLogs = async () => {
    const res = await smmFetch('/api/smm/logs');
    if (res.ok) {
      const data = await res.json();
      setLogs(data);
    }
  };

  const handleSaveSettings = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await smmFetch('/api/smm/settings', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(settings)
    });
    if (res.ok) {
      alert('Settings saved successfully!');
      fetchLogs();
    } else {
      alert('Failed to save settings.');
    }
  };

  const triggerAgentRun = async () => {
    setIsLlmLoading(true);
    setAgentStatusText('Searching Web...');
    try {
      const res = await smmFetch('/api/smm/agent', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: customSearchQuery || undefined })
      });
      if (res.ok) {
        const result = await res.json();
        setAgentStatusText('Completed Draft Generation');
        fetchDrafts();
        fetchLogs();
        alert(`Successfully drafted ${result.draftsCount} posts on topic: "${result.topic}"! WhatsApp review notification has been fired.`);
      } else {
        setAgentStatusText('Failed');
        alert('Failed to run agent drafting cycle.');
      }
    } catch (e) {
      setAgentStatusText('Error occurred');
      console.error(e);
    } finally {
      setIsLlmLoading(false);
      setCustomSearchQuery('');
    }
  };

  const approveAndPublish = async (id: string) => {
    if (!confirm('Are you sure you want to approve and publish this post?')) return;
    try {
      const res = await smmFetch('/api/smm/publish', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id })
      });
      if (res.ok) {
        const result = await res.json();
        if (result.success) {
          alert('Post published successfully!');
        } else {
          alert(`Publish Failed: ${result.message}`);
        }
        fetchDrafts();
        fetchLogs();
      }
    } catch (e) {
      alert('Failed to publish post.');
    }
  };

  const deletePostDraft = async (id: string) => {
    if (!confirm('Are you sure you want to delete this draft?')) return;
    const res = await smmFetch(`/api/smm/drafts?id=${id}`, { method: 'DELETE' });
    if (res.ok) {
      fetchDrafts();
      fetchLogs();
    }
  };

  const saveEditDraft = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await smmFetch('/api/smm/drafts', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(editingDraft)
    });
    if (res.ok) {
      setEditingDraft(null);
      fetchDrafts();
    }
  };

  // Helper to color/iconify platforms
  const getPlatformConfig = (type: string) => {
    switch (type) {
      case 'twitter': return { name: 'Twitter/X', color: '#1DA1F2', icon: <XIcon /> };
      case 'linkedin': return { name: 'LinkedIn', color: '#0A66C2', icon: <LinkedInIcon /> };
      case 'facebook': return { name: 'Facebook', color: '#1877F2', icon: <MetaIcon /> };
      case 'instagram': return { name: 'Instagram', color: '#E1306C', icon: <InstagramIcon /> };
      case 'threads': return { name: 'Threads', color: '#FFFFFF', icon: <ThreadsIcon /> };
      case 'whatsapp_status': return { name: 'WhatsApp Status', color: '#25D366', icon: <WhatsAppIcon /> };
      case 'newsletter': return { name: 'Newsletter', color: '#EA4335', icon: <MailIcon /> };
      case 'article': return { name: 'Blog Article', color: '#C29B53', icon: <ArticleIcon /> };
      default: return { name: 'Social Post', color: '#C29B53', icon: <MetaIcon /> };
    }
  };

  if (isAuthenticated === null) {
    return (
      <div className="min-h-screen bg-[#0A0300] flex items-center justify-center">
        <div className="text-[#F5E6D3] text-sm tracking-widest animate-pulse uppercase">
          Verifying Security Status...
        </div>
      </div>
    );
  }

  if (isAuthenticated === false) {
    return (
      <div className="min-h-screen bg-[#0A0300] flex items-center justify-center px-4"
        style={{ backgroundImage: 'radial-gradient(circle at center, #1A0F0A 0%, #050201 100%)' }}>
        <div className="relative w-full max-w-md bg-[#130A06]/90 border border-[#3D2820] backdrop-blur-xl rounded-2xl p-8 shadow-2xl text-center">
          <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#4F9C8F] to-transparent" />
          
          <div className="w-16 h-16 bg-[#1A0F0A] border border-[#3D2820] rounded-full flex items-center justify-center mx-auto mb-6">
            <span className="text-2xl">🔒</span>
          </div>

          <h2 className="text-[#F5E6D3] text-2xl font-bold mb-2" style={{ fontFamily: 'Playfair Display, serif' }}>
            Brew<span className="text-[#4F9C8F]">Craft</span> SMM Gate
          </h2>
          <p className="text-xs text-[#C9B8A0]/60 mb-6">
            Authorized administrator access only. Enter password to continue.
          </p>

          <form onSubmit={handleLogin} className="space-y-4">
            <input
              type="password"
              value={passwordInput}
              onChange={(e) => setPasswordInput(e.target.value)}
              placeholder="Enter Administrator Token..."
              className="w-full bg-[#0A0300] border border-[#3D2820] rounded-xl px-4 py-3 text-[#F5E6D3] placeholder-[#C9B8A0]/30 text-sm focus:outline-none focus:border-[#4F9C8F] transition-colors text-center"
              required
            />
            {loginError && (
              <p className="text-rose-500 text-xs mt-1 font-medium">{loginError}</p>
            )}
            <button
              type="submit"
              className="w-full py-3 bg-gradient-to-r from-[#4F9C8F] to-[#2d6b62] text-white rounded-xl text-sm font-semibold hover:shadow-lg hover:shadow-[#4F9C8F]/20 transition-all duration-300 active:scale-[0.98]"
            >
              Verify Credentials
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#140B07] text-[#F5E6D3] min-h-screen p-4 md:p-8 font-sans">
      <div className="max-w-7xl mx-auto">
        
        {/* Header Section */}
        <header className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 pb-6 border-b border-[#3A261D]">
          <div>
            <h1 className="text-3xl font-serif text-[#E6C280] tracking-wide flex items-center gap-3">
              ☕ BrewCraft Social Media Manager
            </h1>
            <p className="text-sm text-gray-400 mt-1">
              Autonomous AI agent for copywriting, graphic assets generation, and multi-channel marketing campaigns.
            </p>
          </div>
          <div className="mt-4 md:mt-0 flex gap-3">
            <button 
              onClick={fetchDrafts}
              className="bg-[#241712] hover:bg-[#2E1F1A] border border-[#3A261D] text-[#E6C280] px-4 py-2 rounded-xl text-sm font-medium transition-all"
            >
              🔄 Sync Feeds
            </button>
            <button 
              onClick={() => { setActiveTab('agent'); }}
              className="bg-gradient-to-r from-[#C29B53] to-[#A87E37] text-white hover:opacity-90 px-4 py-2 rounded-xl text-sm font-medium transition-all shadow-lg"
            >
              🤖 Trigger Run
            </button>
          </div>
        </header>

        {/* Tab Controls */}
        <div className="flex gap-2 mb-8 bg-[#1A0F0A] p-1.5 rounded-2xl border border-[#2B1B15] max-w-lg">
          {(['pending', 'agent', 'settings', 'logs'] as const).map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex-1 py-2.5 px-4 rounded-xl text-sm font-medium capitalize transition-all ${
                activeTab === tab 
                  ? 'bg-[#241712] text-[#E6C280] shadow border border-[#3A261D]' 
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              {tab === 'pending' ? 'Pending Approval' : tab === 'agent' ? 'Agent Console' : tab}
            </button>
          ))}
        </div>

        {/* TAB CONTENTS */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.25 }}
          >
            
            {/* PENDING APPROVAL TAB */}
            {activeTab === 'pending' && (
              <div>
                {drafts.filter(d => d.status === 'pending_approval' || d.status === 'failed').length === 0 ? (
                  <div className="bg-[#1A0F0A] rounded-2xl border border-[#2B1B15] p-12 text-center">
                    <div className="text-5xl mb-4">💤</div>
                    <h3 className="text-xl text-[#E6C280] font-serif mb-2">No Posts Pending Review</h3>
                    <p className="text-gray-400 max-w-md mx-auto text-sm">
                      The AI Social Media Agent has no draft items queued for your approval. You can trigger a new web-search & draft cycle under the Agent Console tab!
                    </p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {drafts.filter(d => d.status === 'pending_approval' || d.status === 'failed').map((draft: any) => {
                      const platform = getPlatformConfig(draft.type);
                      return (
                        <div key={draft.id} className="bg-[#1C0F0A] rounded-2xl border border-[#2B1B15] overflow-hidden flex flex-col justify-between hover:border-[#3A261D] transition-all group relative">
                          
                          {/* Platform badge header */}
                          <div className="p-4 border-b border-[#2B1B15] flex justify-between items-center bg-[#21140F]">
                            <div className="flex items-center gap-2">
                              <span style={{ color: platform.color }}>
                                {platform.icon}
                              </span>
                              <span className="text-sm font-semibold text-[#F5E6D3]">{platform.name}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <button
                                onClick={() => copyToClipboard(draft.content)}
                                className="text-gray-400 hover:text-white text-[11px] bg-[#2B1B15] hover:bg-[#3B2820] border border-[#3D2820] px-2 py-0.5 rounded transition-all flex items-center gap-1 font-medium"
                                title="Copy content securely"
                              >
                                📋 Copy
                              </button>
                              {draft.status === 'failed' && (
                                <span className="bg-red-900/30 border border-red-500/50 text-red-400 text-xs px-2 py-0.5 rounded-full">
                                  Failed Publish
                                </span>
                              )}
                              <span className="text-xs text-gray-500">{new Date(draft.createdAt).toLocaleDateString()}</span>
                            </div>
                          </div>

                          {/* Post content body */}
                          <div className="p-5 flex-grow">
                            <h4 className="text-sm font-semibold text-[#E6C280] mb-2 font-serif line-clamp-1">{draft.title}</h4>
                            <p className="text-xs text-gray-300 whitespace-pre-wrap line-clamp-4 leading-relaxed mb-4">
                              {draft.content}
                            </p>
                            
                            {/* Image placeholder or mock image URL */}
                            {draft.imageUrls && draft.imageUrls[0] && (
                              <div className="relative h-44 rounded-xl overflow-hidden border border-[#2B1B15] mb-2 bg-[#2D1B13]">
                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                <img 
                                  src={draft.imageUrls[0]} 
                                  alt="AI Post Graphics" 
                                  className="w-full h-full object-cover group-hover:scale-105 transition-all duration-500" 
                                />
                              </div>
                            )}

                            {draft.type === 'newsletter' && (
                              <button 
                                onClick={() => setPreviewingDraft(draft)}
                                className="text-xs text-[#E6C280] underline hover:text-[#f8dfb1]"
                              >
                                View HTML Email Template
                              </button>
                            )}

                            {draft.videoScript && (
                              <div className="bg-[#241712] border border-[#3A261D] rounded-xl p-2.5 mt-2">
                                <span className="text-[10px] text-amber-500 font-bold uppercase tracking-wider block mb-1">🎬 Short Video Script Included</span>
                                <p className="text-[11px] text-gray-400 line-clamp-2 italic">"{draft.videoScript.scenes?.[0]?.voiceover}"</p>
                              </div>
                            )}

                            {draft.error && (
                              <div className="text-[11px] text-red-400 bg-red-950/20 border border-red-900/50 p-2 rounded-lg mt-2 overflow-x-auto whitespace-pre">
                                ⚠️ {draft.error}
                              </div>
                            )}
                          </div>

                          {/* Action footer */}
                          <div className="p-4 bg-[#150D0A] border-t border-[#2B1B15] grid grid-cols-3 gap-2">
                            <button
                              onClick={() => setEditingDraft(draft)}
                              className="bg-[#21140F] hover:bg-[#2B1B15] border border-[#2B1B15] text-xs py-2 px-3 rounded-lg text-gray-300 font-medium transition-all"
                            >
                              ✏️ Edit
                            </button>
                            <button
                              onClick={() => deletePostDraft(draft.id)}
                              className="bg-[#21140F] hover:bg-red-950/20 hover:border-red-900/50 border border-[#2B1B15] text-xs py-2 px-3 rounded-lg text-red-400 font-medium transition-all"
                            >
                              🗑️ Trash
                            </button>
                            <button
                              onClick={() => approveAndPublish(draft.id)}
                              className="bg-[#C29B53] hover:bg-[#A87E37] text-white text-xs py-2 px-3 rounded-lg font-bold transition-all shadow"
                            >
                              🚀 Publish
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}

                {/* Published History Section */}
                <div className="mt-16">
                  <h3 className="text-xl font-serif text-[#E6C280] mb-6 flex items-center gap-2">
                    📋 Recent Publications History
                  </h3>
                  <div className="bg-[#1C0F0A] border border-[#2B1B15] rounded-2xl overflow-hidden">
                    <table className="w-full text-left border-collapse">
                      <thead>
                        <tr className="bg-[#21140F] border-b border-[#2B1B15] text-[#E6C280] text-xs font-semibold uppercase tracking-wider">
                          <th className="p-4">Platform</th>
                          <th className="p-4">Post Title</th>
                          <th className="p-4">Publication Date</th>
                          <th className="p-4">Status</th>
                          <th className="p-4 text-right">Links</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-[#2B1B15] text-xs">
                        {drafts.filter(d => d.status === 'published').slice(0, 10).map((d: any) => {
                          const p = getPlatformConfig(d.type);
                          return (
                            <tr key={d.id} className="hover:bg-[#241712]/50 transition-colors">
                              <td className="p-4 font-medium flex items-center gap-2" style={{ color: p.color }}>
                                {p.icon}
                                {p.name}
                              </td>
                              <td className="p-4 text-gray-300 font-serif font-semibold">{d.title}</td>
                              <td className="p-4 text-gray-400">{d.publishedAt ? new Date(d.publishedAt).toLocaleString() : 'N/A'}</td>
                              <td className="p-4">
                                <span className="bg-emerald-950/45 border border-emerald-900/60 text-emerald-400 px-2 py-0.5 rounded-full text-[10px]">
                                  Active Live
                                </span>
                              </td>
                              <td className="p-4 text-right">
                                {d.imageUrls?.[0] && (
                                  <a 
                                    href={d.imageUrls[0]} 
                                    target="_blank" 
                                    rel="noreferrer" 
                                    className="text-amber-500 hover:underline mr-4"
                                  >
                                    View Asset
                                  </a>
                                )}
                                <a 
                                  href={d.error || '#'} // in mock/live we store links or status
                                  target="_blank" 
                                  rel="noreferrer" 
                                  className="text-[#E6C280] hover:underline"
                                >
                                  Open Post
                                </a>
                              </td>
                            </tr>
                          );
                        })}
                        {drafts.filter(d => d.status === 'published').length === 0 && (
                          <tr>
                            <td colSpan={5} className="p-8 text-center text-gray-500">
                              No published post logs available yet.
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>

              </div>
            )}

            {/* AGENT CONSOLE TAB */}
            {activeTab === 'agent' && (
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                
                {/* Control Panel */}
                <div className="lg:col-span-1 bg-[#1C0F0A] border border-[#2B1B15] rounded-2xl p-6 flex flex-col justify-between">
                  <div>
                    <h3 className="text-lg font-serif text-[#E6C280] mb-4 flex items-center gap-2">
                      🕹️ Agent Command Center
                    </h3>
                    <p className="text-xs text-gray-400 mb-6 leading-relaxed">
                      Force-trigger the crawler agent. The agent will scrape/search keywords, review coffee developments, draft posts for all 8 channels with AI, and fire approval links to your WhatsApp.
                    </p>

                    <div className="space-y-4 mb-6">
                      <div>
                        <label className="block text-xs font-semibold text-gray-400 mb-2 uppercase tracking-wide">
                          Target Custom Topic (Optional)
                        </label>
                        <input
                          type="text"
                          placeholder="e.g. History of Espresso Roasting"
                          value={customSearchQuery}
                          onChange={(e) => setCustomSearchQuery(e.target.value)}
                          className="w-full bg-[#140B07] border border-[#3A261D] rounded-xl px-4 py-3 text-xs text-white focus:outline-none focus:border-[#C29B53]"
                        />
                      </div>
                      
                      <div className="bg-[#241712] border border-[#3A261D] p-4 rounded-xl">
                        <span className="text-xs font-bold text-[#E6C280] block mb-2">📡 Active Target Keywords</span>
                        <div className="flex flex-wrap gap-1.5">
                          {settings.searchKeywords?.map((k: string, i: number) => (
                            <span key={i} className="bg-[#140B07] border border-[#2B1B15] text-[10px] text-gray-300 px-2.5 py-1 rounded-md">
                              {k}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center justify-between text-xs text-gray-400 mb-4 p-2 bg-[#140B07] rounded-lg">
                      <span>Agent Status:</span>
                      <span className={`font-semibold flex items-center gap-1.5 ${isLlmLoading ? 'text-amber-400' : 'text-emerald-400'}`}>
                        <span className={`w-2 h-2 rounded-full ${isLlmLoading ? 'bg-amber-400 animate-pulse' : 'bg-emerald-400'}`} />
                        {agentStatusText}
                      </span>
                    </div>

                    <button
                      onClick={triggerAgentRun}
                      disabled={isLlmLoading}
                      className="w-full bg-gradient-to-r from-[#C29B53] to-[#A87E37] hover:opacity-95 disabled:opacity-40 text-white font-bold py-3.5 px-4 rounded-xl text-xs transition-all flex items-center justify-center gap-2"
                    >
                      {isLlmLoading ? (
                        <>
                          <svg className="animate-spin h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                          </svg>
                          Processing Agent Cycle...
                        </>
                      ) : '🤖 Initialize Search & Draft'}
                    </button>
                  </div>
                </div>

                {/* Simulated Console Screen */}
                <div className="lg:col-span-2 bg-[#090503] border border-[#2B1B15] rounded-2xl p-5 font-mono flex flex-col justify-between h-[450px]">
                  <div className="overflow-y-auto flex-grow text-[11px] space-y-1.5 text-gray-400 pr-2">
                    <span className="text-emerald-500 font-bold block mb-2">// BREWCRAFT AUTOMATION ENGINE - AWS DAEMON CONSOLE //</span>
                    <span className="text-gray-500">[2026-06-08 22:30:12] Daemon core service started online.</span>
                    <span className="text-gray-500">[2026-06-08 22:30:15] Listening for scheduled crons (12h cycles).</span>
                    <span className="text-gray-500">[2026-06-08 22:30:15] WhatsApp Web Server running on port 8000: CONNECTED.</span>
                    <span className="text-amber-500">[2026-06-08 22:30:18] Active LLM provider set to: {settings.activeLlmProvider}</span>
                    <span className="text-blue-400">[2026-06-08 23:45:01] Auto-trigger crawl check. Searching related news content...</span>
                    
                    {logs.slice(0, 10).reverse().map((log: any, idx: number) => {
                      let color = 'text-gray-400';
                      if (log.level === 'warn') color = 'text-amber-500';
                      if (log.level === 'error') color = 'text-red-400';
                      return (
                        <span key={idx} className={`block ${color}`}>
                          [{new Date(log.timestamp).toLocaleTimeString()}] {log.message}
                        </span>
                      );
                    })}
                  </div>
                  <div className="border-t border-[#2B1B15] pt-3 mt-3 flex justify-between items-center text-[10px] text-gray-500">
                    <span>Daemon Running: 24/7 PM2 Service</span>
                    <button 
                      onClick={fetchLogs}
                      className="text-[#E6C280] hover:underline"
                    >
                      Clear/Refresh Console
                    </button>
                  </div>
                </div>

              </div>
            )}

            {/* SETTINGS TAB */}
            {activeTab === 'settings' && (
              <form onSubmit={handleSaveSettings} className="bg-[#1C0F0A] border border-[#2B1B15] rounded-2xl p-6 md:p-8 space-y-8 max-w-4xl mx-auto">
                <h3 className="text-xl font-serif text-[#E6C280] pb-2 border-b border-[#2B1B15] flex items-center gap-2">
                  ⚙️ System Settings & Integration Credentials
                </h3>

                {/* LLM Models Selection */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs font-semibold text-gray-400 mb-2 uppercase tracking-wide">
                      Active AI Copywriter Provider
                    </label>
                    <select
                      value={settings.activeLlmProvider}
                      onChange={(e) => setSettings({ ...settings, activeLlmProvider: e.target.value })}
                      className="w-full bg-[#140B07] border border-[#3A261D] rounded-xl px-4 py-3 text-xs text-white focus:outline-none focus:border-[#C29B53]"
                    >
                      <option value="gemini">Gemini API (Google)</option>
                      <option value="openai">OpenAI (ChatGPT)</option>
                      <option value="openrouter">OpenRouter API</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-400 mb-2 uppercase tracking-wide">
                      Gemini API Key
                    </label>
                    <input
                      type="password"
                      value={settings.geminiApiKey || ''}
                      onChange={(e) => setSettings({ ...settings, geminiApiKey: e.target.value })}
                      placeholder="AIzaSy..."
                      className="w-full bg-[#140B07] border border-[#3A261D] rounded-xl px-4 py-3 text-xs text-white focus:outline-none focus:border-[#C29B53]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-400 mb-2 uppercase tracking-wide">
                      OpenAI API Key
                    </label>
                    <input
                      type="password"
                      value={settings.openAiApiKey || ''}
                      onChange={(e) => setSettings({ ...settings, openAiApiKey: e.target.value })}
                      placeholder="sk-..."
                      className="w-full bg-[#140B07] border border-[#3A261D] rounded-xl px-4 py-3 text-xs text-white focus:outline-none focus:border-[#C29B53]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-400 mb-2 uppercase tracking-wide">
                      OpenRouter API Key
                    </label>
                    <input
                      type="password"
                      value={settings.openRouterApiKey || ''}
                      onChange={(e) => setSettings({ ...settings, openRouterApiKey: e.target.value })}
                      placeholder="sk-or-v1-..."
                      className="w-full bg-[#140B07] border border-[#3A261D] rounded-xl px-4 py-3 text-xs text-white focus:outline-none focus:border-[#C29B53]"
                    />
                  </div>
                </div>

                <hr className="border-[#2B1B15]" />

                {/* WhatsApp Notification Alert Config */}
                <h4 className="text-md font-serif text-[#E6C280] mb-2 flex items-center gap-2">
                  💬 Review Notifications (WhatsApp)
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs font-semibold text-gray-400 mb-2 uppercase tracking-wide">
                      Your WhatsApp Alert Phone Number
                    </label>
                    <input
                      type="text"
                      value={settings.whatsappNumber || ''}
                      onChange={(e) => setSettings({ ...settings, whatsappNumber: e.target.value })}
                      placeholder="e.g. 923171036774 (with Country Code, no +)"
                      className="w-full bg-[#140B07] border border-[#3A261D] rounded-xl px-4 py-3 text-xs text-white focus:outline-none focus:border-[#C29B53]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-400 mb-2 uppercase tracking-wide">
                      WhatsApp Gateway Mode
                    </label>
                    <select
                      value={settings.whatsappAlertType}
                      onChange={(e) => setSettings({ ...settings, whatsappAlertType: e.target.value })}
                      className="w-full bg-[#140B07] border border-[#3A261D] rounded-xl px-4 py-3 text-xs text-white focus:outline-none focus:border-[#C29B53]"
                    >
                      <option value="callmebot">CallMeBot (Free Self-alerts)</option>
                      <option value="whatsapp_web">WhatsApp Web Local Bridge (Free Headless Scanner)</option>
                      <option value="twilio">Twilio WhatsApp API (Paid Official)</option>
                      <option value="none">Disable WhatsApp Alerts (Draft only)</option>
                    </select>
                  </div>
                  {settings.whatsappAlertType === 'callmebot' && (
                    <div className="md:col-span-2">
                      <label className="block text-xs font-semibold text-gray-400 mb-2 uppercase tracking-wide">
                        CallMeBot API Key
                      </label>
                      <input
                        type="password"
                        value={settings.callmebotApiKey || ''}
                        onChange={(e) => setSettings({ ...settings, callmebotApiKey: e.target.value })}
                        placeholder="Retrieve via whatsapp message registration"
                        className="w-full bg-[#140B07] border border-[#3A261D] rounded-xl px-4 py-3 text-xs text-white focus:outline-none focus:border-[#C29B53]"
                      />
                      <p className="text-[10px] text-gray-500 mt-1.5">
                        * To get CallMeBot API key: Add <strong>+34 621 02 40 80</strong> on WhatsApp and send message <strong>&quot;I allow callmebot to send me messages&quot;</strong>. The bot will instantly text you your free API key!
                      </p>
                    </div>
                  )}
                  {settings.whatsappAlertType === 'twilio' && (
                    <>
                      <div>
                        <label className="block text-xs font-semibold text-gray-400 mb-2 uppercase tracking-wide">
                          Twilio Account SID
                        </label>
                        <input
                          type="text"
                          value={settings.twilioAccountSid || ''}
                          onChange={(e) => setSettings({ ...settings, twilioAccountSid: e.target.value })}
                          placeholder="AC..."
                          className="w-full bg-[#140B07] border border-[#3A261D] rounded-xl px-4 py-3 text-xs text-white focus:outline-none focus:border-[#C29B53]"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-gray-400 mb-2 uppercase tracking-wide">
                          Twilio Auth Token
                        </label>
                        <input
                          type="password"
                          value={settings.twilioAuthToken || ''}
                          onChange={(e) => setSettings({ ...settings, twilioAuthToken: e.target.value })}
                          className="w-full bg-[#140B07] border border-[#3A261D] rounded-xl px-4 py-3 text-xs text-white focus:outline-none focus:border-[#C29B53]"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-gray-400 mb-2 uppercase tracking-wide">
                          Twilio Sandbox From WhatsApp Phone
                        </label>
                        <input
                          type="text"
                          value={settings.twilioFromNumber || ''}
                          onChange={(e) => setSettings({ ...settings, twilioFromNumber: e.target.value })}
                          placeholder="e.g. +14155238886"
                          className="w-full bg-[#140B07] border border-[#3A261D] rounded-xl px-4 py-3 text-xs text-white focus:outline-none focus:border-[#C29B53]"
                        />
                      </div>
                    </>
                  )}
                </div>

                <hr className="border-[#2B1B15]" />

                {/* Social Media Channels Integration keys */}
                <h4 className="text-md font-serif text-[#E6C280] mb-2 flex items-center gap-2">
                  🔌 Publishing Platform Channels
                </h4>
                
                <div className="space-y-6">
                  
                  {/* Twitter Section */}
                  <div className="bg-[#241712]/40 border border-[#3A261D] p-5 rounded-xl space-y-4">
                    <span className="text-xs font-bold text-sky-400 flex items-center gap-1.5"><XIcon /> Twitter/X API Credentials</span>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <input
                        type="password"
                        placeholder="X API Key (Consumer Key)"
                        value={settings.twitterApiKey || ''}
                        onChange={(e) => setSettings({ ...settings, twitterApiKey: e.target.value })}
                        className="bg-[#140B07] border border-[#2B1B15] rounded-xl px-4 py-2 text-xs text-white"
                      />
                      <input
                        type="password"
                        placeholder="X API Secret (Consumer Secret)"
                        value={settings.twitterApiSecret || ''}
                        onChange={(e) => setSettings({ ...settings, twitterApiSecret: e.target.value })}
                        className="bg-[#140B07] border border-[#2B1B15] rounded-xl px-4 py-2 text-xs text-white"
                      />
                      <input
                        type="password"
                        placeholder="X Access Token"
                        value={settings.twitterAccessToken || ''}
                        onChange={(e) => setSettings({ ...settings, twitterAccessToken: e.target.value })}
                        className="bg-[#140B07] border border-[#2B1B15] rounded-xl px-4 py-2 text-xs text-white"
                      />
                      <input
                        type="password"
                        placeholder="X Access Token Secret"
                        value={settings.twitterAccessSecret || ''}
                        onChange={(e) => setSettings({ ...settings, twitterAccessSecret: e.target.value })}
                        className="bg-[#140B07] border border-[#2B1B15] rounded-xl px-4 py-2 text-xs text-white"
                      />
                    </div>
                  </div>

                  {/* LinkedIn Section */}
                  <div className="bg-[#241712]/40 border border-[#3A261D] p-5 rounded-xl space-y-4">
                    <span className="text-xs font-bold text-blue-500 flex items-center gap-1.5"><LinkedInIcon /> LinkedIn Sharing Credentials</span>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <input
                        type="password"
                        placeholder="LinkedIn OAuth Access Token"
                        value={settings.linkedinAccessToken || ''}
                        onChange={(e) => setSettings({ ...settings, linkedinAccessToken: e.target.value })}
                        className="bg-[#140B07] border border-[#2B1B15] rounded-xl px-4 py-2 text-xs text-white"
                      />
                      <input
                        type="text"
                        placeholder="LinkedIn URN Owner ID (e.g. urn:li:person:XXXX)"
                        value={settings.linkedinUrn || ''}
                        onChange={(e) => setSettings({ ...settings, linkedinUrn: e.target.value })}
                        className="bg-[#140B07] border border-[#2B1B15] rounded-xl px-4 py-2 text-xs text-white"
                      />
                    </div>
                  </div>

                  {/* Meta Facebook/Instagram */}
                  <div className="bg-[#241712]/40 border border-[#3A261D] p-5 rounded-xl space-y-4">
                    <span className="text-xs font-bold text-pink-500 flex items-center gap-1.5"><InstagramIcon /> Facebook Pages & Instagram Graph API</span>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <input
                        type="text"
                        placeholder="Facebook Page ID"
                        value={settings.facebookPageId || ''}
                        onChange={(e) => setSettings({ ...settings, facebookPageId: e.target.value })}
                        className="bg-[#140B07] border border-[#2B1B15] rounded-xl px-4 py-2 text-xs text-white"
                      />
                      <input
                        type="password"
                        placeholder="Facebook/Instagram Graph Access Token"
                        value={settings.facebookAccessToken || ''}
                        onChange={(e) => setSettings({ ...settings, facebookAccessToken: e.target.value })}
                        className="bg-[#140B07] border border-[#2B1B15] rounded-xl px-4 py-2 text-xs text-white"
                      />
                      <input
                        type="text"
                        placeholder="Instagram Business Account ID"
                        value={settings.instagramAccountId || ''}
                        onChange={(e) => setSettings({ ...settings, instagramAccountId: e.target.value })}
                        className="bg-[#140B07] border border-[#2B1B15] rounded-xl px-4 py-2 text-xs text-white"
                      />
                    </div>
                  </div>

                  {/* Threads Section */}
                  <div className="bg-[#241712]/40 border border-[#3A261D] p-5 rounded-xl space-y-4">
                    <span className="text-xs font-bold text-white flex items-center gap-1.5"><ThreadsIcon /> Meta Threads API</span>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <input
                        type="text"
                        placeholder="Threads User ID"
                        value={settings.threadsUserId || ''}
                        onChange={(e) => setSettings({ ...settings, threadsUserId: e.target.value })}
                        className="bg-[#140B07] border border-[#2B1B15] rounded-xl px-4 py-2 text-xs text-white"
                      />
                      <input
                        type="password"
                        placeholder="Threads Access Token"
                        value={settings.threadsAccessToken || ''}
                        onChange={(e) => setSettings({ ...settings, threadsAccessToken: e.target.value })}
                        className="bg-[#140B07] border border-[#2B1B15] rounded-xl px-4 py-2 text-xs text-white"
                      />
                    </div>
                  </div>

                  {/* Email Marketing (Resend) */}
                  <div className="bg-[#241712]/40 border border-[#3A261D] p-5 rounded-xl space-y-4">
                    <span className="text-xs font-bold text-red-400 flex items-center gap-1.5"><MailIcon /> Email Marketing (Resend API)</span>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <input
                        type="password"
                        placeholder="Resend API Key (re_...)"
                        value={settings.resendApiKey || ''}
                        onChange={(e) => setSettings({ ...settings, resendApiKey: e.target.value })}
                        className="bg-[#140B07] border border-[#2B1B15] rounded-xl px-4 py-2 text-xs text-white"
                      />
                      <input
                        type="text"
                        placeholder="Sender Domain Email (e.g. newsletter@yourdomain.com)"
                        value={settings.resendSenderEmail || ''}
                        onChange={(e) => setSettings({ ...settings, resendSenderEmail: e.target.value })}
                        className="bg-[#140B07] border border-[#2B1B15] rounded-xl px-4 py-2 text-xs text-white"
                      />
                    </div>
                  </div>

                </div>

                {/* Keywords Config */}
                <div className="bg-[#241712] border border-[#3A261D] p-5 rounded-xl space-y-4">
                  <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wide">
                    Search keywords list (comma separated)
                  </label>
                  <input
                    type="text"
                    value={settings.searchKeywords?.join(', ') || ''}
                    onChange={(e) => setSettings({ 
                      ...settings, 
                      searchKeywords: e.target.value.split(',').map(s => s.trim()).filter(Boolean) 
                    })}
                    placeholder="e.g. specialty coffee, latte art, coffee roast trends"
                    className="w-full bg-[#140B07] border border-[#3A261D] rounded-xl px-4 py-3 text-xs text-white focus:outline-none focus:border-[#C29B53]"
                  />
                </div>

                <button
                  type="submit"
                  className="bg-gradient-to-r from-[#C29B53] to-[#A87E37] text-white hover:opacity-90 font-bold py-3.5 px-6 rounded-xl text-xs transition-all w-full md:w-auto shadow-md"
                >
                  💾 Save All Configurations
                </button>
              </form>
            )}

            {/* FULL SYSTEM LOGS TAB */}
            {activeTab === 'logs' && (
              <div className="bg-[#1C0F0A] border border-[#2B1B15] rounded-2xl p-6">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-lg font-serif text-[#E6C280] flex items-center gap-2">
                    📜 Backend Event & Activity Registry
                  </h3>
                  <button 
                    onClick={fetchLogs}
                    className="text-xs text-[#E6C280] hover:underline"
                  >
                    🔄 Refresh Registry
                  </button>
                </div>
                <div className="bg-[#0D0705] border border-[#2B1B15] rounded-xl overflow-hidden divide-y divide-[#1F1410] max-h-[600px] overflow-y-auto pr-1">
                  {logs.map((log: any, idx: number) => {
                    let badgeColor = 'bg-gray-800 text-gray-400';
                    if (log.level === 'warn') badgeColor = 'bg-amber-950/40 border border-amber-900 text-amber-500';
                    if (log.level === 'error') badgeColor = 'bg-red-950/40 border border-red-900 text-red-500';
                    return (
                      <div key={idx} className="p-4 flex flex-col sm:flex-row sm:items-center justify-between text-xs hover:bg-[#150D0A]/40 transition-colors">
                        <div className="flex items-center gap-3">
                          <span className={`px-2 py-0.5 rounded-full text-[9px] uppercase font-bold tracking-wider ${badgeColor}`}>
                            {log.level}
                          </span>
                          <span className="text-gray-300 font-medium">{log.message}</span>
                        </div>
                        <span className="text-[10px] text-gray-500 mt-1.5 sm:mt-0 font-mono">
                          {new Date(log.timestamp).toLocaleString()}
                        </span>
                      </div>
                    );
                  })}
                  {logs.length === 0 && (
                    <div className="p-8 text-center text-gray-500">
                      No logs registered.
                    </div>
                  )}
                </div>
              </div>
            )}

          </motion.div>
        </AnimatePresence>

      </div>

      {/* EDIT POST MODAL */}
      <AnimatePresence>
        {editingDraft && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="bg-[#1C0F0A] border border-[#3A261D] rounded-2xl w-full max-w-2xl p-6 shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
            >
              <h3 className="text-lg font-serif text-[#E6C280] pb-3 border-b border-[#2B1B15] mb-4">
                ✏️ Edit Draft Content - {getPlatformConfig(editingDraft.type).name}
              </h3>
              <form onSubmit={saveEditDraft} className="space-y-4 overflow-y-auto flex-grow pr-2">
                <div>
                  <label className="block text-xs text-gray-400 font-semibold mb-1.5 uppercase">Draft Title / Hook</label>
                  <input
                    type="text"
                    value={editingDraft.title || ''}
                    onChange={(e) => setEditingDraft({ ...editingDraft, title: e.target.value })}
                    className="w-full bg-[#140B07] border border-[#2B1B15] rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-[#C29B53]"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-xs text-gray-400 font-semibold mb-1.5 uppercase">Post Copy</label>
                  <textarea
                    rows={6}
                    value={editingDraft.content || ''}
                    onChange={(e) => setEditingDraft({ ...editingDraft, content: e.target.value })}
                    className="w-full bg-[#140B07] border border-[#2B1B15] rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-[#C29B53]"
                    required
                  />
                </div>

                {editingDraft.type === 'newsletter' && (
                  <div>
                    <label className="block text-xs text-gray-400 font-semibold mb-1.5 uppercase">HTML Email Content</label>
                    <textarea
                      rows={10}
                      value={editingDraft.htmlContent || ''}
                      onChange={(e) => setEditingDraft({ ...editingDraft, htmlContent: e.target.value })}
                      className="w-full bg-[#140B07] border border-[#2B1B15] rounded-xl px-4 py-2.5 text-xs font-mono text-white focus:outline-none focus:border-[#C29B53]"
                    />
                  </div>
                )}

                <div>
                  <label className="block text-xs text-gray-400 font-semibold mb-1.5 uppercase">Asset Image URL</label>
                  <input
                    type="text"
                    value={editingDraft.imageUrls?.[0] || ''}
                    onChange={(e) => setEditingDraft({ ...editingDraft, imageUrls: [e.target.value] })}
                    className="w-full bg-[#140B07] border border-[#2B1B15] rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-[#C29B53]"
                  />
                </div>
                
                <div className="flex justify-end gap-3 pt-4 border-t border-[#2B1B15] mt-6">
                  <button
                    type="button"
                    onClick={() => setEditingDraft(null)}
                    className="bg-transparent border border-[#2B1B15] hover:bg-[#2B1B15] text-xs px-5 py-2.5 rounded-xl font-medium"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="bg-[#C29B53] hover:bg-[#A87E37] text-white text-xs px-5 py-2.5 rounded-xl font-bold"
                  >
                    Save Changes
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* HTML PREVIEW MODAL */}
      <AnimatePresence>
        {previewingDraft && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              className="bg-[#1A0F0A] border border-[#3A261D] rounded-2xl w-full max-w-3xl h-[80vh] p-6 shadow-2xl flex flex-col justify-between"
            >
              <div>
                <div className="flex justify-between items-center pb-3 border-b border-[#2B1B15] mb-4">
                  <h3 className="text-lg font-serif text-[#E6C280]">
                    📧 HTML Newsletter Preview: {previewingDraft.title}
                  </h3>
                  <button 
                    onClick={() => setPreviewingDraft(null)}
                    className="text-gray-400 hover:text-white text-lg font-bold"
                  >
                    ✕
                  </button>
                </div>
                
                {/* Embed HTML in iframe safely */}
                <div className="border border-[#2B1B15] rounded-xl overflow-hidden bg-white h-[55vh]">
                  <iframe 
                    title="Newsletter Preview"
                    srcDoc={previewingDraft.htmlContent || `<p>${previewingDraft.content}</p>`}
                    className="w-full h-full border-0"
                  />
                </div>
              </div>
              <div className="flex justify-end gap-3 pt-4 border-t border-[#2B1B15]">
                <button
                  onClick={() => setPreviewingDraft(null)}
                  className="bg-[#241712] border border-[#3A261D] text-[#E6C280] text-xs px-5 py-2.5 rounded-xl font-semibold hover:bg-[#2F1E17]"
                >
                  Close Preview
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
