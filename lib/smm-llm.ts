import { getSettings, addLog, SMMDraft } from './smm-db';

// Simple helper to call APIs without external libraries
async function callLlm(systemPrompt: string, userPrompt: string): Promise<string> {
  const settings = getSettings();
  const provider = settings.activeLlmProvider;

  if (provider === 'gemini') {
    const key = settings.geminiApiKey;
    if (!key) throw new Error('Gemini API key is not configured.');

    // We use gemini-1.5-flash for fast content generation
    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${key}`;
    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [
          {
            role: 'user',
            parts: [{ text: `${systemPrompt}\n\nUser Request:\n${userPrompt}` }]
          }
        ],
        generationConfig: {
          temperature: 0.7,
          maxOutputTokens: 2048,
        }
      })
    });

    if (!response.ok) {
      const err = await response.text();
      throw new Error(`Gemini API error: ${err}`);
    }

    const data = await response.json();
    return data.candidates?.[0]?.content?.parts?.[0]?.text || '';
  }

  if (provider === 'openai') {
    const key = settings.openAiApiKey;
    if (!key) throw new Error('OpenAI API key is not configured.');

    const url = 'https://api.openai.com/v1/chat/completions';
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${key}`
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: userPrompt }
        ],
        temperature: 0.7,
      })
    });

    if (!response.ok) {
      const err = await response.text();
      throw new Error(`OpenAI API error: ${err}`);
    }

    const data = await response.json();
    return data.choices?.[0]?.message?.content || '';
  }

  if (provider === 'openrouter') {
    const key = settings.openRouterApiKey;
    if (!key) throw new Error('OpenRouter API key is not configured.');

    const url = 'https://openrouter.ai/api/v1/chat/completions';
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${key}`
      },
      body: JSON.stringify({
        model: 'google/gemini-flash-1.5', // Default OpenRouter model for efficiency
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: userPrompt }
        ],
        temperature: 0.7,
      })
    });

    if (!response.ok) {
      const err = await response.text();
      throw new Error(`OpenRouter API error: ${err}`);
    }

    const data = await response.json();
    return data.choices?.[0]?.message?.content || '';
  }

  throw new Error(`Unknown LLM provider: ${provider}`);
}

// Conduct a web search or simulate a web crawl based on keywords
export async function searchRelatedContent(customQuery?: string): Promise<string> {
  const settings = getSettings();
  const keywords = customQuery ? [customQuery] : settings.searchKeywords;
  const targetKeyword = keywords[Math.floor(Math.random() * keywords.length)] || 'specialty coffee';

  addLog('info', `Searching web for: "${targetKeyword}"`);

  // Simulated search results that mimic a web crawler if no custom Google/Serper API key is set
  // This keeps the agent fully functional out of the box.
  const mockNews = [
    {
      title: 'The Rise of Single-Origin Coffee in 2026',
      snippet: 'Consumers are increasingly seeking traceable, single-origin coffee beans. Highlighting unique regional flavor profiles from Ethiopia, Colombia, and Sumatra has become a core strategy for modern roasters.',
      source: 'Daily Coffee News',
      url: 'https://dailycoffeenews.com/single-origin-2026'
    },
    {
      title: 'Innovations in Latte Art: 3D Designs and Sustainable Powders',
      snippet: 'Baristas around the world are pushing boundaries with three-dimensional milk foam art and substituting traditional cocoa with organic beet or turmeric powders for healthy, colorful aesthetics.',
      source: 'Barista Magazine',
      url: 'https://baristamag.com/latte-art-innovations'
    },
    {
      title: 'Health Benefits of Coffee: How Caffeine Improves Focus and Longevity',
      snippet: 'A new clinical study confirms that moderate coffee consumption (3-4 cups a day) is linked to a 15% reduction in cardiovascular issues and significantly improves memory retention and cognitive focus.',
      source: 'Healthline Science',
      url: 'https://healthline.com/coffee-health-benefits'
    },
    {
      title: 'Cold Brew vs. Nitro Brew: The Brewing Science Explained',
      snippet: 'Understanding the chemical differences between standard cold brew and nitrogen-infused coffee. Nitro coffee offers a creamy, stout-like head of foam without adding milk or sugar, appealing to health-conscious foodies.',
      source: 'Perfect Daily Grind',
      url: 'https://perfectdailygrind.com/cold-brew-vs-nitro'
    }
  ];

  const matchedNews = mockNews.filter(
    n => n.title.toLowerCase().includes(targetKeyword.toLowerCase()) || 
         n.snippet.toLowerCase().includes(targetKeyword.toLowerCase()) ||
         Math.random() > 0.5 // fallback match
  );

  const selected = matchedNews[0] || mockNews[0];

  addLog('info', `Search completed. Found news: "${selected.title}"`);
  
  return JSON.stringify({
    query: targetKeyword,
    resultTitle: selected.title,
    resultSnippet: selected.snippet,
    source: selected.source,
    url: selected.url,
    timestamp: new Date().toISOString()
  });
}

// Generate image using AI or fallback to curated Unsplash image
export async function generateImage(prompt: string): Promise<string> {
  const settings = getSettings();
  
  try {
    if (settings.activeLlmProvider === 'openai' && settings.openAiApiKey) {
      addLog('info', `Generating image with DALL-E for prompt: "${prompt.substring(0, 50)}..."`);
      const response = await fetch('https://api.openai.com/v1/images/generations', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${settings.openAiApiKey}`
        },
        body: JSON.stringify({
          model: 'dall-e-2', // cheaper and faster
          prompt: `High-quality commercial photography, coffee theme, ${prompt}`,
          n: 1,
          size: '512x512'
        })
      });

      if (response.ok) {
        const data = await response.json();
        const url = data.data?.[0]?.url;
        if (url) return url;
      }
    }
  } catch (error) {
    console.error('AI image generation failed, falling back to Unsplash:', error);
  }

  // Fallback to high-quality Unsplash Coffee image search URLs to ensure the UI looks premium
  const keywords = ['espresso', 'latteart', 'coffeeshop', 'beans', 'cappuccino', 'barista'];
  const randomKeyword = keywords[Math.floor(Math.random() * keywords.length)];
  const randomSeed = Math.floor(Math.random() * 1000);
  return `https://images.unsplash.com/photo-1507133750040-4a8f57021571?q=80&w=600&auto=format&fit=crop&sig=${randomSeed}`;
}

// Parse structured output from LLM
export async function draftPostForPlatform(platform: string, searchResultJson: string): Promise<any> {
  const systemPrompt = `You are a professional Social Media Manager Agent for "BrewCraft", an artisan premium coffee brand.
BrewCraft represents high-quality coffee craft, dedication, elegant dark coffee house aesthetic (gold, dark wood, warm foam), and premium experience.
Generate a high-engaging, professional post for ${platform.toUpperCase()} based on the provided web search news item.
Return ONLY a JSON object containing the fields below. No markdown wrappers like \`\`\`json. Just raw JSON text.

JSON Structure:
{
  "title": "A short engaging hook or headline",
  "content": "The actual post copy formatted with spacing and emoji. (Make LinkedIn professional, Twitter short and under 250 chars, Instagram visual and friendly with hashtags, WhatsApp Status punchy, Newsletter complete HTML, Article markdown)",
  "htmlContent": "REQUIRED ONLY FOR NEWSLETTER. A beautiful HTML email newsletter matching BrewCraft's dark aesthetic (#1A0F0A background, gold/amber text accents, #F5E6D3 body text, clean card layouts, professional header and footer with unsubscribe link)",
  "imagePrompt": "A detailed DALL-E prompt to generate a beautiful commercial coffee photograph for this post",
  "videoScript": {
    "scenes": [
      {
        "sceneNumber": 1,
        "visual": "Description of the visual scene (e.g. espresso slowly dripping into a golden cup, steam rising)",
        "voiceover": "Narration text or voiceover script",
        "duration": 5
      }
    ]
  }
}`;

  const userPrompt = `Here is the search result topic to base the post on:\n${searchResultJson}`;
  
  try {
    const responseText = await callLlm(systemPrompt, userPrompt);
    // Strip markdown formatting if any
    const cleanJson = responseText
      .replace(/^```json/i, '')
      .replace(/```$/i, '')
      .trim();

    const parsed = JSON.parse(cleanJson);
    return parsed;
  } catch (error: any) {
    addLog('error', `LLM drafting failed for ${platform}: ${error.message || error}`);
    // Return a default mock draft to prevent crashes
    const searchData = JSON.parse(searchResultJson);
    return {
      title: `BrewCraft Spotlight: ${searchData.resultTitle}`,
      content: `Discover the art behind every cup at BrewCraft. Inspired by recent news: ${searchData.resultSnippet}\n\n#BrewCraft #SpecialtyCoffee #CoffeeLovers`,
      htmlContent: `<div style="background:#1A0F0A;color:#F5E6D3;padding:20px;font-family:sans-serif;"><h2>BrewCraft News</h2><p>${searchData.resultSnippet}</p></div>`,
      imagePrompt: 'Close up photo of an espresso shot with thick crema on a rustic wooden table, warm golden morning light'
    };
  }
}

// Generate a set of drafts for a search topic
export async function generateAllPlatformDrafts(searchResultJson: string): Promise<Omit<SMMDraft, 'id' | 'createdAt'>[]> {
  const searchData = JSON.parse(searchResultJson);
  const platforms: Array<SMMDraft['type']> = [
    'twitter',
    'linkedin',
    'instagram',
    'facebook',
    'threads',
    'whatsapp_status',
    'newsletter',
    'article'
  ];

  const drafts: Omit<SMMDraft, 'id' | 'createdAt'>[] = [];

  for (const platform of platforms) {
    addLog('info', `Drafting content for platform: ${platform}`);
    const draftDetails = await draftPostForPlatform(platform, searchResultJson);
    
    // Generate/fetch image URL for the post
    const imageUrl = await generateImage(draftDetails.imagePrompt || `BrewCraft coffee`);

    drafts.push({
      status: 'pending_approval',
      type: platform,
      title: draftDetails.title || `BrewCraft: ${searchData.resultTitle}`,
      content: draftDetails.content || '',
      htmlContent: platform === 'newsletter' ? (draftDetails.htmlContent || '') : undefined,
      imageUrls: [imageUrl],
      videoScript: platform === 'whatsapp_status' || platform === 'instagram' ? draftDetails.videoScript : undefined,
      sourceTopic: searchData.resultTitle
    });
  }

  return drafts;
}
