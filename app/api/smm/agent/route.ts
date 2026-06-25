import { NextResponse } from 'next/server';
import { searchRelatedContent, generateAllPlatformDrafts } from '@/lib/smm-llm';
import { saveDraft, addLog } from '@/lib/smm-db';
import { sendWhatsAppAlert } from '@/lib/smm-whatsapp';
import { verifySmmAuth, unauthorizedResponse } from '@/lib/smm-auth';

export async function POST(request: Request) {
  try {
    if (!verifySmmAuth(request)) {
      return unauthorizedResponse();
    }
    const { query } = await request.json().catch(() => ({ query: undefined }));

    await addLog('info', 'Agent triggered manually or via cron scheduler.');

    // 1. Search web/news
    const searchResultJson = await searchRelatedContent(query);
    const searchData = JSON.parse(searchResultJson);

    // 2. Draft content for all platforms
    const drafts = await generateAllPlatformDrafts(searchResultJson);

    // 3. Save all drafts as pending_approval
    const savedDrafts = [];
    for (const d of drafts) {
      const saved = await saveDraft(d);
      savedDrafts.push(saved);
    }

    await addLog('info', `Successfully drafted ${savedDrafts.length} platform posts for topic: "${searchData.resultTitle}"`);

    // 4. Send WhatsApp Alert Notification for user review
    const host = request.headers.get('host') || 'localhost:3000';
    const proto = request.headers.get('x-forwarded-proto') || 'http';
    const reviewUrl = `${proto}://${host}/admin/social-media`;

    const alertMessage = `🤖 *BREWCRAFT SMM AGENT ALERT* 🤖\n\nI have generated *${savedDrafts.length}* new posts pending your review!\n\n*Topic:* ${searchData.resultTitle}\n*Source:* ${searchData.source}\n\n👉 *Review and publish here:* ${reviewUrl}`;
    
    await sendWhatsAppAlert(alertMessage);

    return NextResponse.json({
      success: true,
      topic: searchData.resultTitle,
      draftsCount: savedDrafts.length,
      drafts: savedDrafts
    });
  } catch (err: any) {
    await addLog('error', `Agent execution failed: ${err.message || err}`);
    return NextResponse.json({ error: err.message || 'Internal Server Error' }, { status: 500 });
  }
}
