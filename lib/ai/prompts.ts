import { ScrapedPageContent } from '../scraper/web-scraper';

export function buildGeminiWebsiteRedesignPrompt(
  scrapedData: ScrapedPageContent,
  userOffer: string = 'High-converting modern website redesign, UI/UX optimization, mobile responsiveness, and speed upgrades',
  targetTone: string = 'Professional'
): string {
  const companyNameGuess = scrapedData.title.split('-')[0].split('|')[0].trim() || scrapedData.domain.split('.')[0];
  const h1Text = scrapedData.h1.join('; ') || 'Modern Digital Web Experience';
  const h2Text = scrapedData.h2.slice(0, 4).join('; ') || 'Services & Solutions';
  const bodyText = (scrapedData.aboutText || scrapedData.description || scrapedData.bodySnippet).slice(0, 1200);

  return `
You are an expert B2B Cold Email Copywriter and Senior UI/UX Designer auditing prospect websites.

Your mission is to perform a HIGHLY SPECIFIC, DYNAMIC UI/UX audit for the following website and generate a customized WEBSITE REDESIGN COLD PROPOSAL package.

### PROSPECT WEBSITE DATA (DYNAMICALLY EXTRACTED):
- Target URL: ${scrapedData.url}
- Domain Name: ${scrapedData.domain}
- Inferred Company Name: ${companyNameGuess}
- Page Title: ${scrapedData.title}
- Meta Description: ${scrapedData.description}
- Main H1 Headlines: ${h1Text}
- Sub-Headlines (H2): ${h2Text}
- Extracted Page Content: ${bodyText}

### MY AGENCY VALUE PROPOSITION:
"${userOffer}"

### DESIRED OUTREACH TONE:
"${targetTone}"

---

### INSTRUCTIONS FOR DYNAMIC CUSTOMIZATION:
1. DO NOT use generic or repetitive template text.
2. In "company_name", use the real brand name (e.g. "${companyNameGuess}").
3. In "summary", summarize what ${companyNameGuess} specifically does based on the extracted content: "${bodyText.slice(0, 200)}...".
4. In "pain_points", list 3 UNIQUE UI/UX & conversion flaws SPECIFIC to ${scrapedData.domain} (e.g., referencing their actual headlines "${h1Text.slice(0, 60)}" or mobile navigation friction).
5. Generate 3 distinct cold email proposal variations in 100% FLUENT, HIGH-CONVERTING ENGLISH:
   - **Draft 1 (Audit Teardown)**: Reference their actual page title ("${scrapedData.title}") and main headline ("${h1Text.slice(0, 50)}"), pointing out specific UI/UX improvements.
   - **Draft 2 (Short Executive Pitch)**: 4-sentence high-impact proposal for a 5-minute custom redesign mockup.
   - **Draft 3 (ROI / Case Study Focus)**: Highlight how modernizing ${scrapedData.domain}'s mobile UX and CTA contrast increases conversion rates by 35%+.

---

### REQUIRED JSON OUTPUT SCHEMA:
Return ONLY valid JSON matching this exact structure:

{
  "company_name": "${companyNameGuess}",
  "summary": "Specific 1-2 sentence summary of ${companyNameGuess}'s actual services.",
  "pain_points": [
    "Specific flaw 1 referencing ${scrapedData.domain}'s current mobile layout or header '${h1Text.slice(0, 40)}'",
    "Specific flaw 2 regarding low CTA contrast and homepage visitor drop-off",
    "Specific flaw 3 regarding visual typography & UI hierarchy modernization"
  ],
  "email_draft_1": {
    "subject": "Quick design breakdown & redesign concept for ${scrapedData.domain}",
    "hook": "Opening hook referencing ${companyNameGuess} and their headline '${h1Text.slice(0, 50)}'.",
    "body": "Full email body referencing specific details from ${scrapedData.domain}."
  },
  "email_draft_2": {
    "subject": "Website redesign idea for ${companyNameGuess}",
    "hook": "Opening short executive hook.",
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
