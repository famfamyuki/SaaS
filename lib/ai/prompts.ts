import { ScrapedPageContent } from '../scraper/web-scraper';

export function buildGeminiWebsiteRedesignPrompt(
  scrapedData: ScrapedPageContent,
  userOffer: string = 'High-converting modern website redesign, UI/UX optimization, and mobile-first performance upgrades',
  targetTone: string = 'Professional'
): string {
  return `
You are a world-class B2B Sales Director & UI/UX Audit Specialist working for a top-tier Web Design Agency.

Your task is to analyze the following scraped prospect website and craft a compelling, high-converting WEBSITE REDESIGN COLD OUTREACH PROPOSAL package.

### PROSPECT WEBSITE AUDIT DATA:
- Website URL: ${scrapedData.url}
- Domain: ${scrapedData.domain}
- Page Title: ${scrapedData.title}
- Meta Description: ${scrapedData.description}
- Key Headers (H1/H2): ${[...scrapedData.h1, ...scrapedData.h2].join(' | ')}
- Page Body Snippet: ${scrapedData.aboutText.slice(0, 1200)}

### MY AGENCY VALUE PROPOSITION (WHAT I OFFER):
"${userOffer || 'High-converting modern website redesigns, UI/UX optimization, mobile responsiveness, and conversion-focused landing pages'}"

### OUTREACH TONE:
"${targetTone}" (e.g., Professional, Consultative, Direct, High-Value)

---

### SPECIFIC AUDIT & PROPOSAL INSTRUCTIONS:
1. Identify the **Company Name** from domain/content (e.g. "Acme Corp", "Stripe").
2. Write a 1-2 sentence **Company Summary** describing their business and current web presence.
3. Perform a Website Design Audit & Identify **3 Specific Website Pain Points / Redesign Opportunities**:
   - Issue 1: Mobile responsiveness & outdated UI/layout aesthetics.
   - Issue 2: Weak Call-To-Action (CTA), low conversion path, or unoptimized header hierarchy.
   - Issue 3: Page load/UX friction, lack of social proof, or outdated visual typography.
4. Generate **3 High-Converting Cold Email Variations in ENGLISH** designed to book website redesign consultation calls:
   - **Draft 1 (Audit & Friction Teardown)**: Highlight specific design/UX friction points found on their site and how a redesign will boost conversions.
   - **Draft 2 (Short & Direct Executive Pitch)**: A 4-sentence high-impact email proposing a free 5-minute custom redesign mockup.
   - **Draft 3 (Case Study / ROI Focus)**: Focus on how modernizing their UI/UX and mobile conversion flow directly increases revenue and leads.

CRITICAL REQUIREMENT:
All email subject lines, hooks, and body copy MUST be generated in fluent, high-converting ENGLISH.

---

### OUTPUT FORMAT REQUIREMENT:
You MUST return ONLY a valid JSON object matching this exact JSON schema:

{
  "company_name": "Target Company Name",
  "summary": "Concise company & website summary.",
  "pain_points": [
    "Outdated mobile layout & responsive navigation friction",
    "Sub-optimal CTA placement causing high homepage bounce rate",
    "Visual typography and visual hierarchy due for a modern redesign"
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
