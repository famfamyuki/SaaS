import { ScrapedPageContent } from '../scraper/web-scraper';

export function buildGeminiOutreachPrompt(
  scrapedData: ScrapedPageContent,
  userOffer: string,
  targetTone: string = 'Professional'
): string {
  return `
You are an elite B2B sales copywriter and enterprise intelligence analyst.

Analyze the following scraped target company website content and construct a high-converting personalized cold email package.

### TARGET COMPANY SCRAPED DATA:
- Website URL: ${scrapedData.url}
- Company Domain: ${scrapedData.domain}
- Page Title: ${scrapedData.title}
- Meta Description: ${scrapedData.description}
- Key Headers (H1/H2): ${[...scrapedData.h1, ...scrapedData.h2].join(' | ')}
- About / Content Text: ${scrapedData.aboutText.slice(0, 1200)}

### MY PRODUCT / VALUE PROPOSITION (WHAT I AM SELLING):
"${userOffer || 'AI-driven workflow automation to increase sales conversion and reduce operational churn'}"

### TARGET TONE OF VOICE:
"${targetTone}" (e.g. Casual, Professional, Direct, Witty, High-Energy)

---

### REQUIRED INSTRUCTIONS:
1. Extract the actual or inferred **Company Name** (e.g., "Stripe", "Vercel", "Acme Corp").
2. Write a concise **Company Summary** (1-2 sentences summarizing what they do).
3. Identify **3 Specific Pain Points or Growth Challenges** this target company likely faces based on their domain and industry.
4. Craft **3 Distinct Personalised Cold Email Variations**:
   - **Draft 1 (Problem-Agitation-Solution)**: Focus on solving a key pain point.
   - **Draft 2 (Short & Direct)**: 3-4 sentence low-friction outreach for busy executives.
   - **Draft 3 (Case Study / Social Proof Hook)**: Emphasize ROI & specific metrics.

Each draft must contain:
- \`subject\`: Compelling, non-spammy subject line (under 8 words).
- \`hook\`: A hyper-personalized opening line referencing their specific website content or headers.
- \`body\`: Complete cold email body with greeting, hook, pitch, clear low-friction Call To Action (CTA), and professional sign-off placeholder.

---

### OUTPUT FORMAT REQUIREMENT:
You MUST return ONLY a valid JSON object matching this exact JSON schema:

{
  "company_name": "Target Company Name",
  "summary": "Concise company summary text.",
  "pain_points": [
    "Pain point 1",
    "Pain point 2",
    "Pain point 3"
  ],
  "email_draft_1": {
    "subject": "Subject line 1",
    "hook": "Opening personalized hook 1",
    "body": "Full body text 1"
  },
  "email_draft_2": {
    "subject": "Subject line 2",
    "hook": "Opening personalized hook 2",
    "body": "Full body text 2"
  },
  "email_draft_3": {
    "subject": "Subject line 3",
    "hook": "Opening personalized hook 3",
    "body": "Full body text 3"
  }
}
`;
}
