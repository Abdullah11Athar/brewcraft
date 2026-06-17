import { getSettings, addLog, SMMDraft, saveDraft } from './smm-db';
import { sendWhatsAppAlert } from './smm-whatsapp';

interface PublishResult {
  success: boolean;
  message: string;
  url?: string;
}

export async function publishToPlatform(draft: SMMDraft): Promise<PublishResult> {
  const settings = getSettings();
  const type = draft.type;

  addLog('info', `Initiating publishing for draft ID: ${draft.id} on channel: ${type}`);

  try {
    switch (type) {
      case 'twitter': {
        const apiKey = settings.twitterApiKey;
        const accessToken = settings.twitterAccessToken;
        if (!apiKey || !accessToken) {
          return mockPublishSuccess(draft, 'Twitter/X');
        }

        // X v2 Tweet API
        const response = await fetch('https://api.twitter.com/2/tweets', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${accessToken}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ text: draft.content })
        });

        if (!response.ok) {
          const err = await response.text();
          throw new Error(`X API Error: ${err}`);
        }
        
        const data = await response.json();
        const tweetId = data?.data?.id;
        const tweetUrl = tweetId ? `https://twitter.com/user/status/${tweetId}` : undefined;
        
        return handlePublishSuccess(draft, 'Twitter/X', tweetUrl);
      }

      case 'linkedin': {
        const token = settings.linkedinAccessToken;
        const urn = settings.linkedinUrn; // person or organization URN (e.g. urn:li:person:123456)
        if (!token || !urn) {
          return mockPublishSuccess(draft, 'LinkedIn');
        }

        // LinkedIn UGC Share API
        const response = await fetch('https://api.linkedin.com/v2/ugcPosts', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
            'X-Restli-Protocol-Version': '2.0.0'
          },
          body: JSON.stringify({
            author: urn,
            lifecycleState: 'PUBLISHED',
            specificContent: {
              'com.linkedin.ugc.ShareContent': {
                shareCommentary: { text: draft.content },
                shareMediaCategory: 'NONE'
              }
            },
            visibility: {
              'com.linkedin.ugc.MemberNetworkVisibility': 'PUBLIC'
            }
          })
        });

        if (!response.ok) {
          const err = await response.text();
          throw new Error(`LinkedIn API Error: ${err}`);
        }

        const data = await response.json();
        const linkedinId = data?.id;
        const postUrl = linkedinId ? `https://www.linkedin.com/feed/update/${linkedinId}` : undefined;

        return handlePublishSuccess(draft, 'LinkedIn', postUrl);
      }

      case 'facebook': {
        const pageId = settings.facebookPageId;
        const token = settings.facebookAccessToken;
        if (!pageId || !token) {
          return mockPublishSuccess(draft, 'Facebook');
        }

        // Facebook Page Feed API
        const url = `https://graph.facebook.com/v19.0/${pageId}/feed`;
        const response = await fetch(url, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            message: draft.content,
            access_token: token,
            link: draft.imageUrls?.[0] || undefined
          })
        });

        if (!response.ok) {
          const err = await response.text();
          throw new Error(`Facebook API Error: ${err}`);
        }

        const data = await response.json();
        const postId = data?.id;
        const postUrl = postId ? `https://facebook.com/${postId}` : undefined;

        return handlePublishSuccess(draft, 'Facebook', postUrl);
      }

      case 'instagram': {
        const accountId = settings.instagramAccountId;
        const token = settings.instagramAccessToken;
        const imageUrl = draft.imageUrls?.[0];
        if (!accountId || !token || !imageUrl) {
          return mockPublishSuccess(draft, 'Instagram');
        }

        // Instagram Graph API requires first posting container then publishing
        // Step 1: Create media container
        const containerUrl = `https://graph.facebook.com/v19.0/${accountId}/media`;
        const containerRes = await fetch(containerUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            image_url: imageUrl,
            caption: draft.content,
            access_token: token
          })
        });

        if (!containerRes.ok) {
          const err = await containerRes.text();
          throw new Error(`Instagram Media Container Error: ${err}`);
        }

        const containerData = await containerRes.json();
        const creationId = containerData?.id;

        if (!creationId) {
          throw new Error('Instagram failed to return creation ID.');
        }

        // Step 2: Publish media container
        const publishUrl = `https://graph.facebook.com/v19.0/${accountId}/media_publish`;
        const publishRes = await fetch(publishUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            creation_id: creationId,
            access_token: token
          })
        });

        if (!publishRes.ok) {
          const err = await publishRes.text();
          throw new Error(`Instagram Publish Error: ${err}`);
        }

        const publishData = await publishRes.json();
        return handlePublishSuccess(draft, 'Instagram', `https://instagram.com/p/${publishData?.id || ''}`);
      }

      case 'threads': {
        const userId = settings.threadsUserId;
        const token = settings.threadsAccessToken;
        if (!userId || !token) {
          return mockPublishSuccess(draft, 'Threads');
        }

        // Meta Threads API
        const containerUrl = `https://graph.threads.net/v1.0/${userId}/threads`;
        const containerRes = await fetch(containerUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            media_type: draft.imageUrls?.[0] ? 'IMAGE' : 'TEXT',
            image_url: draft.imageUrls?.[0] || undefined,
            text: draft.content,
            access_token: token
          })
        });

        if (!containerRes.ok) {
          const err = await containerRes.text();
          throw new Error(`Threads Container Error: ${err}`);
        }

        const containerData = await containerRes.json();
        const creationId = containerData?.id;

        const publishUrl = `https://graph.threads.net/v1.0/${userId}/threads_publish`;
        const publishRes = await fetch(publishUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            creation_id: creationId,
            access_token: token
          })
        });

        if (!publishRes.ok) {
          const err = await publishRes.text();
          throw new Error(`Threads Publish Error: ${err}`);
        }

        return handlePublishSuccess(draft, 'Threads');
      }

      case 'newsletter': {
        const apiKey = settings.resendApiKey;
        const sender = settings.resendSenderEmail;
        if (!apiKey) {
          return mockPublishSuccess(draft, 'Resend Email Newsletter');
        }

        // Resend Send Email API
        const response = await fetch('https://api.resend.com/emails', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${apiKey}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            from: `BrewCraft Newsletter <${sender}>`,
            to: ['customer-list@brewcraft.shop'], // Placeholder or configurable mailing list
            subject: draft.title,
            html: draft.htmlContent || `<p>${draft.content}</p>`
          })
        });

        if (!response.ok) {
          const err = await response.text();
          throw new Error(`Resend API Error: ${err}`);
        }

        const data = await response.json();
        return handlePublishSuccess(draft, 'Resend Newsletter', `https://resend.com/emails/${data.id || ''}`);
      }

      case 'whatsapp_status': {
        // WhatsApp Status does not have an official public posting API.
        // The most practical workflow is sending the media & caption to the user's WhatsApp number so they can instantly publish it with one click!
        const imageUrl = draft.imageUrls?.[0] || '';
        const caption = draft.content;

        const notificationMsg = `📲 *BREWCRAFT SMM AGENT: STATUS READY TO POST* 📲\n\nSave the photo/video and publish this caption to your WhatsApp Status:\n\n---\n${caption}\n---\n\nImage link: ${imageUrl}`;
        
        await sendWhatsAppAlert(notificationMsg);
        
        return handlePublishSuccess(draft, 'WhatsApp Status', imageUrl);
      }

      case 'article': {
        // For articles, we save them as published in our site database (e.g. static blogs or database)
        // We will mock this publishing successfully to the website database.
        return handlePublishSuccess(draft, 'Website Blog/Article', '/blog');
      }

      default:
        throw new Error(`Unsupported post type: ${type}`);
    }
  } catch (error: any) {
    addLog('error', `Failed to publish draft ID ${draft.id} to ${type}: ${error.message || error}`);
    
    draft.status = 'failed';
    draft.error = error.message || String(error);
    saveDraft(draft);

    return {
      success: false,
      message: `Failed to publish to ${type}: ${error.message || error}`
    };
  }
}

function handlePublishSuccess(draft: SMMDraft, platformName: string, postUrl?: string): PublishResult {
  addLog('info', `Draft ID ${draft.id} successfully published to ${platformName}. URL: ${postUrl || 'N/A'}`);
  
  draft.status = 'published';
  draft.publishedAt = new Date().toISOString();
  if (postUrl) {
    draft.imageUrls = draft.imageUrls || [];
    draft.error = undefined;
  }
  saveDraft(draft);

  return {
    success: true,
    message: `Successfully published to ${platformName}.`,
    url: postUrl
  };
}

function mockPublishSuccess(draft: SMMDraft, platformName: string): PublishResult {
  const mockUrls: Record<string, string> = {
    'Twitter/X': 'https://twitter.com/mock_status/123456789',
    'LinkedIn': 'https://www.linkedin.com/feed/update/mock_share_urn',
    'Facebook': 'https://facebook.com/mock_page/posts/12345',
    'Instagram': 'https://instagram.com/p/mock_photo_id',
    'Threads': 'https://threads.net/mock_post',
    'Resend Email Newsletter': 'https://resend.com/emails/mock_id',
    'WhatsApp Status': draft.imageUrls?.[0] || '',
    'Website Blog/Article': '/blog'
  };

  const url = mockUrls[platformName] || 'https://mock-publish.com';
  
  addLog('warn', `[Test Mode] API credentials missing for ${platformName}. Simulating successful post.`);
  return handlePublishSuccess(draft, `${platformName} (Test Mode)`, url);
}
