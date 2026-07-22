import { ScrapedPageContent } from '../scraper/web-scraper';

export function buildGeminiWebsiteRedesignPrompt(
  scrapedData: ScrapedPageContent,
  userOffer: string = 'High-converting modern website redesign, UI/UX optimization, mobile responsiveness, and speed upgrades',
  targetTone: string = 'Professional'
): string {
  return `
You are a world-class B2B Cold Email Copywriter & UI/UX Audit Specialist working for a high-growth Web Design Agency.

Your mission is to analyze the following scraped prospect website and generate a hyper-personalized, high-converting WEBSITE REDESIGN COLD OUTREACH PROPOSAL package based on Western cold email best practices.

### PROSPECT WEBSITE AUDIT DATA:
- Website URL: ${scrapedData.url}
- Domain: ${scrapedData.domain}
- Page Title: ${scrapedData.title}
- Meta Description: ${scrapedData.description}
- Key Headers (H1/H2): ${[...scrapedData.h1, ...scrapedData.h2].join(' | ')}
- Page Body Snippet: ${scrapedData.aboutText.slice(0, 1200)}

### AGENCY VALUE PROPOSITION:
"${userOffer || 'High-converting modern website redesigns, UI/UX optimization, mobile responsiveness, and conversion rate optimization'}"

### OUTREACH TONE:
"${targetTone}" (Consultative, Professional, Direct, High-Value)

---

### STRICT AUDIT & PROPOSAL REQUIREMENTS:
1. Extract the actual or inferred **Company Name** (e.g. "Acme Corp", "Stripe").
2. Write a 1-2 sentence **Company Summary** in English.
3. Conduct a Website Audit & Identify **3 Specific Design & Conversion Flaws**:
   - Flaw 1: Outdated mobile layout & responsive UI friction.
   - Flaw 2: Weak Call-To-Action (CTA) contrast, low conversion flow, or unoptimized hero hierarchy.
   - Flaw 3: Page load/UX friction, outdated typography, or lack of social proof elements.
4. Generate **3 Distinct Personalised Cold Email Variations in 100% FLUENT, HIGH-CONVERTING ENGLISH**:
   - **Draft 1 (Audit & Teardown)**: Highlight specific UI/UX flaws found on their site and how a redesign boosts conversion rate.
   - **Draft 2 (Short & Direct Executive Pitch)**: 4-sentence high-impact email proposing a free 5-minute custom redesign mockup.
   - **Draft 3 (Case Study / ROI Focus)**: Emphasize how modernizing their mobile UI/UX directly increases leads and lands higher contract values ($3k-$10k).

CRITICAL REQUIREMENT:
All output MUST be 100% in natural, professional ENGLISH.

---

### OUTPUT FORMAT REQUIREMENT:
You MUST return ONLY a valid JSON object matching this exact JSON schema:

{
  "company_name": "Target Company Name",
  "summary": "Concise company summary in English.",
  "pain_points": [
    "Outdated mobile responsive layout & navigation friction",
    "Sub-optimal CTA placement causing high homepage visitor drop-off",
    "Visual typography and visual hierarchy due for a modern UI redesign"
  ],
  "email_draft_1": {
    "subject": "Quick design breakdown for ${scrapedData.domain}",
    "hook": "Opening personalized hook referencing specific website header or layout.",
    "body": "Full body text of Draft 1 in English."
  },
  "email_draft_2": {
    "subject": "Website redesign idea for ${scrapedData.domain}",
    "hook": "Opening short hook.",
    "body": "Full body text of Draft 2 in English."
  },
  "email_draft_3": {
    "subject": "Modernizing ${scrapedData.domain}'s web conversion flow",
    "hook": "Opening case study hook.",
    "body": "Full body text of Draft 3 in English."
  }
}
`;
}
