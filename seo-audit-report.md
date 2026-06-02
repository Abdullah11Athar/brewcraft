# Beyond SEO + AEO Audit Report

## Cover

* **Client:** BrewCraft
* **Website:** https://brewcraft.shop/
* **Target Market:** New York, NY (Primary Local) & Digital Specialty Coffee Enthusiasts
* **Prepared By:** Beyond SEO (Senior SEO & AEO/GEO Strategist)
* **Date:** May 30, 2026
* **Audit Mode:** Apify Intelligence Mode (Full Site Crawl & Next.js Codebase Audit)

---

## 1. Data Sources Used

```text
Website crawl: Apify Website Content Crawler (Run ID: FUa7AntrWcJZTtgCd)
Codebase inspection: Next.js Workspace (App Router)
Schema analysis: Manual HTML/DOM evaluation
Local profile: Footer NAP & WhatsApp alignment audit
Authority/Backlink: Directional review of domain properties
```

---

## 2. Executive Summary

BrewCraft is a high-end, interactive Next.js landing page built to present a premium, artisan coffee experience. The site features beautiful, fluid 3D canvas animations and a sleek dark aesthetic. However, from a search engine perspective, the site is currently functioning as an **invisible brand brochure** rather than a lead and order-generation engine.

While the frontend execution is stellar, severe structural bottlenecks, local search discrepancies, and a complete lack of structured metadata prevent the site from ranking for high-value transactional keywords. The most critical issue is a severe **geographic and contact mismatch**: the website claims a New York physical address while routing transactions to a Pakistani WhatsApp number, which destroys search engine trust and local ranking capabilities.

By executing the 30/60/90-day SEO/AEO/GEO strategy detailed below, BrewCraft can transition into a highly crawlable, authoritative brand cited by AI search assistants (ChatGPT, Gemini, Perplexity) and dominant in local specialty coffee queries.

---

## 3. Current SEO Health Score

| Category | Score | Status | Notes |
| :--- | :---: | :---: | :--- |
| **Technical SEO** | 12/20 | Needs Work | Next.js pre-renders well, but no `robots.txt` or structured XML sitemap exist. |
| **On-page SEO** | 9/15 | Fair | Titles and descriptions exist but lack geographical or keyword focus. |
| **Content / E-E-A-T** | 8/20 | Poor | Critical lorem-ipsum placeholder text and no author/expert profiles. |
| **Keyword Architecture**| 5/15 | Poor | No blog, hub-and-spoke content, or target keyword mapping. |
| **Authority / Backlinks**| 2/10 | Poor | Brand new domain footprint with minimal external link equity. |
| **Local SEO** | 1/10 | Critical | Direct New York address vs. Pakistani WhatsApp number NAP mismatch. |
| **AEO/GEO** | 1/5 | Critical | No JSON-LD schema, entity graphs, or conversational question assets. |
| **Conversion / Tracking**| 2/5 | Poor | Custom cart '+' button triggers alert instead of adding to a real flow. |
| **TOTAL SCORE** | **40/100** | **CRITICAL**| **High structural opportunity with immediate quick-win potentials.** |

---

## 4. Biggest Opportunity

**Hyper-Local Authority & AI Engine Citation Dominance**
By resolving the New York vs. Pakistan NAP mismatch and embedding rich JSON-LD schema (LocalBusiness, CoffeeShop, and Product), BrewCraft can instantly signals its precise geographical entity to search engines. Adding a dedicated "Artisan Brewing Guide" cluster will build immediate topical authority, securing citations in AI search engines (like Perplexity and ChatGPT Search) for queries like *"Where can I buy premium custom espresso blends in Manhattan?"* or *"Best local artisan mocha in New York."*

---

## 5. Biggest Blockers

> [!WARNING]
> These three issues represent immediate barriers blocking organic indexing, rankings, and conversions.

| Blocker | Evidence | Business Impact | Priority |
| :--- | :--- | :--- | :---: |
| **Severe NAP Mismatch** | Footer lists New York address (`123 Artisan Street, NY 10001`) but WhatsApp button routes to Pakistani number (`+92 317 1036774`). | Google flags the business entity as untrustworthy or fraudulent, completely suppressing it from Google Maps & local search packs. | **CRITICAL** |
| **Lorem Ipsum Placeholders**| "Atmosphere of Inspiration" feature has raw lorem ipsum filler text in `data/products.ts` line 66. | Directly signals low-quality, incomplete content to Google's Helpful Content System, leading to site-wide algorithmic penalties. | **CRITICAL** |
| **Complete Lack of Schema** | Zero JSON-LD tags or microdata found in codebase crawl. | Search engines and AI crawlers cannot programmatically verify product prices, locations, opening hours, or entity relations. | **HIGH** |

---

## 6. Technical SEO Findings

| Issue | Evidence | Impact | Fix | Priority |
| :--- | :--- | :--- | :--- | :---: |
| **Missing `robots.txt`** | Request to `/robots.txt` returns a 404 status. | Crawlers waste crawl budget or index unwanted system routes (e.g. preview links). | Create a structured `robots.txt` file in the `public/` directory mapping the sitemap. | **HIGH** |
| **Incomplete Sitemap** | `app/sitemap.ts` only registers the homepage (`/`). | New pages (e.g., future blog posts or blend guides) will remain orphaned and unindexed. | Update `sitemap.ts` to dynamically generate routes for products and informational pages. | **MEDIUM** |
| **Client-Only Canvas Hydration** | Main interactive elements are wrapped inside `'use client'` React components. | Crawlers that do not execute heavy JS may miss critical product descriptions and pricing. | Move static semantic text elements to SSR components; use client hydration purely for visual interactive canvas frames. | **HIGH** |

---

## 7. On-Page SEO Findings

| URL | Issue | Fix | Priority |
| :--- | :--- | :--- | :---: |
| `https://brewcraft.shop/` | Title (`BrewCraft \| Artisan Coffee Experience`) is generic and lacks local/keyword targeting. | Revise title tag to include primary geo-target: `BrewCraft \| Artisan Coffee Shop & Specialty Blends New York`. | **HIGH** |
| `https://brewcraft.shop/` | Meta description lacks a compelling call-to-action (CTA) and search keyword. | Rewrite description: `Discover premium, artisan-roasted specialty coffee blends in New York. Order signature espresso, lattes, and mochas crafted by expert baristas.` | **HIGH** |
| `https://brewcraft.shop/` | Headings contain non-semantic layout markers rather than clean SEO typography. | Ensure standard HTML elements (`<h1>`, `<h2>`) are fully readable without nested client code manipulation. | **MEDIUM** |

---

## 8. Content / E-E-A-T Findings

| Page/Cluster | Gap | Fix | Priority |
| :--- | :--- | :--- | :---: |
| **Signature Blends** | Thin content: product descriptions are only 15-20 words long with no origin details. | Expand each blend (Latte, Cappuccino, Mocha) to explain bean origin (e.g., Ethiopian, Colombian), roast profile, and notes. | **HIGH** |
| **About / Trust** | Complete lack of expert profiles, founder stories, or barista credentials. | Add a "Meet Our Baristas" section or "Our Craft" story highlighting professional credentials and sourcing practices. | **HIGH** |
| **Features Section** | Placeholders in features like "Atmosphere of Inspiration" contain `Lorem ipsum`. | Replace lorem ipsum with meaningful content detailing the actual cafe atmosphere or community focus. | **CRITICAL** |

---

## 9. Keyword Snapshot & Strategy

Since no historical search console data exists, we have prioritized high-intent local and specialty keywords:

| Keyword | Target Intent | Search Volume (Est.) | Feasibility | Priority | Action |
| :--- | :--- | :---: | :---: | :---: | :--- |
| `artisan coffee shop new york` | Local / Transactional | 2,400/mo | Medium | **HIGH** | Optimize Homepage H1 & Metadata |
| `specialty coffee blends nyc` | Product / Transactional| 850/mo | High | **HIGH** | Create dedicated products subpage |
| `how to brew pour over coffee` | Informational / AEO | 18,100/mo | Medium | **MEDIUM**| Write comprehensive hub article |
| `custom espresso roast manhattan`| Niche / Transactional | 320/mo | High | **HIGH** | Optimize footer & schema elements |

---

## 10. Keyword-to-Page Map

| Cluster | Target URL | Existing/New | Focus Keywords | Priority |
| :--- | :--- | :---: | :--- | :---: |
| **Home / Cafe** | `/` | Existing | `artisan coffee shop new york`, `brewcraft cafe` | **HIGH** |
| **Specialty Blends** | `/collections/signature-blends` | **NEW** | `specialty coffee blends nyc`, `buy artisan coffee online` | **HIGH** |
| **Brewing Academy** | `/academy/brew-guides` | **NEW** | `how to brew pour over coffee`, `barista coffee guide` | **MEDIUM** |

---

## 11. Competitor Gap

| Competitor | Strength | Client Gap | Action |
| :--- | :--- | :--- | :--- |
| **Blue Bottle Coffee** | Massive topical authority, structured brew guides, deep organic footprint. | Complete absence of informational content and authoritative external backlinks. | Launch a "Brewing Academy" subfolder to build competitive topical depth. |
| **La Cabra NYC** | Pristine Local Business profiles, high-quality reviews, elegant clean schema. | Missing GBP profile, wrong NAP information, and zero active reviews. | Set up a verified New York Google Business Profile and correct matching contact info. |

---

## 12. Local SEO Gap

| Area | Issue | Fix | Priority |
| :--- | :--- | :--- | :---: |
| **Contact NAP** | Mismatch between NY address and +92 (Pakistan) phone number. | Update phone to local NY area code (+1 212) or align address to actual operating market. | **CRITICAL** |
| **Google Maps** | No Google Business Profile or map embed present on page. | Create and verify Google Business Profile; embed matching Google Map iframe in footer. | **HIGH** |
| **Local Schema**| No local schema marking NAP in code. | Inject `LocalBusiness` JSON-LD schema specifying address, phone, and opening hours. | **HIGH** |

---

## 13. Backlink / Authority Gap

> [!TIP]
> Do not buy cheap backlink packages. Focus on highly relevant niche citations and local PR.

| Finding | Evidence | Action | Priority |
| :--- | :--- | :--- | :---: |
| **Zero Referral Authority** | Domain has near-zero referring domains or backlink equity. | Submit site to premium local directories (Yelp, TripAdvisor, YellowPages, Foursquare). | **HIGH** |
| **No Partner Citations** | Missing connections to local food blogs or coffee curators. | Outreach to NYC food & coffee bloggers for blend reviews and editorial links. | **MEDIUM** |

---

## 14. AEO / GEO Gap

*How to get BrewCraft cited inside AI search tools like ChatGPT Search and Perplexity:*

| Question/Entity | Gap | Fix | Priority |
| :--- | :--- | :--- | :---: |
| *"Who sells the best custom coffee blends in New York?"* | AI models cannot associate the brand "BrewCraft" with "New York" due to missing entities. | Inject `Organization` schema linking the brand name, social profiles, and physical address together. | **HIGH** |
| *"How does BrewCraft make signature coffee blends?"* | The exact process from sourcing to roasting is not explained on the website. | Add a structured "Our Process" section detailing roast levels, bean sourcing, and micro-lot roasting. | **HIGH** |
| *Product Pricing Questions* | Pricing is locked in standard text, making it hard for Gemini/ChatGPT to extract details dynamically. | Inject `Product` schema for each coffee blend specifying `name`, `price`, `availability`, and `rating`. | **HIGH** |

---

## 15. Conversion SEO Gap

* organic traffic is useless if it doesn't convert: *

| Page/Flow | Issue | Fix | Priority |
| :--- | :--- | :--- | :---: |
| **Product Showcase** | Clicking "+" on products triggers a raw browser `alert()` pop-up instead of a conversion event. | Replace browser alert with an interactive sliding cart panel or direct link to WhatsApp ordering. | **HIGH** |
| **WhatsApp Order Link** | Raw, untracked link makes it impossible to measure conversions in analytics. | Add UTM parameters to the WhatsApp link (`utm_source=organic&utm_medium=whatsapp_btn&utm_campaign=order`) to track conversion. | **HIGH** |
| **Form Friction** | No simple lead capture or email subscription box on page. | Add a small newsletter form in the footer offering a "10% off your first blend" incentive. | **MEDIUM** |

---

## 16. 30-Day Plan: Core Foundations

### Phase 1: Clean Up & Align

| Week | Task | Owner | KPI |
| :--- | :--- | :---: | :--- |
| **Week 1** | **Resolve NAP Mismatch:** Standardize NY phone and address or align Pakistani coordinates. Clean all placeholder text. | Developer / Copywriter | 100% accurate contact info & 0% lorem ipsum text. |
| **Week 2** | **Technical Implementation:** Deploy `robots.txt` and rich dynamic `sitemap.ts` routes. | Developer | Valid 200 responses on `/robots.txt` and `/sitemap.xml`. |
| **Week 3** | **Inject JSON-LD Schema:** Deploy `LocalBusiness`, `CoffeeShop`, `Organization`, and `Product` tags. | Developer | Zero schema errors on Schema.org Validator. |
| **Week 4** | **On-Page Optimization:** Rewrite homepage titles, meta descriptions, and semantic headings. | SEO Strategist | Indexed title matches target keyword structure. |

---

## 17. 60-Day Plan: Content & Authority

| Task | Why | KPI |
| :--- | :--- | :--- |
| **Google Business Setup** | Establishes critical local map pack and search authority in New York. | 100% verified profile with initial 5-star customer reviews. |
| **Blend Pages Launch** | Expands pages beyond the single landing route to index for specific blend keywords. | 3 new high-quality product pages crawled and indexed. |
| **Local Citations Push** | Submits NAP details to premium directories to build domain-level authority. | 25+ clean, consistent local directory listings. |

---

## 18. 90-Day Plan: AI Engine Domination

| Month | Focus | Deliverables |
| :--- | :---: | :--- |
| **Month 3** | **Topical Hubs & AI Citation Worthiness** | Launch "Brewing Academy" hub containing 5 detailed guides targeting informational coffee questions to secure citation listings in ChatGPT Search and Perplexity. |

---

## 19. KPIs

| KPI | Baseline | Target (90 Days) | Source |
| :--- | :---: | :---: | :--- |
| **Organic Monthly Traffic** | ~0 | 1,200 | Google Analytics (GA4) |
| **Local Map Impressions** | 0 | 5,000 | Google Business Profile |
| **Organic Conversions (Orders)** | 0 | 80 / month | GA4 Custom Conversion Event |
| **AI Engine Mentions** | 0 | Citations in 3+ major models | ChatGPT / Perplexity verification |

---

## 20. Missing Data / Next Checks

1. **Google Search Console Integration:** Verify GSC to audit live indexation status.
2. **Google Analytics (GA4) Tracking:** Set up tracking code in `layout.tsx` to log bounce rates and user session duration.
3. **Core Web Vitals Performance:** Run Lighthouse audits once canvas video loops are optimized to ensure LCP is under 2.5 seconds.
