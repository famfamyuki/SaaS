import { GoogleGenerativeAI } from '@google/generative-ai';
import { ScrapedPageContent } from '../scraper/web-scraper';
import { buildGeminiWebsiteRedesignPrompt } from './prompts';

export interface GeneratedLeadResult {
  company_name: string;
  summary: string;
  pain_points: string[];
  email_draft_1: {
    subject: string;
    hook: string;
    body: string;
  };
  email_draft_2: {
    subject: string;
    hook: string;
    body: string;
  };
  email_draft_3: {
    subject: string;
    hook: string;
    body: string;
  };
}

export async function generateOutreachWithGemini(
  scrapedData: ScrapedPageContent,
  userOffer: string = 'High-converting modern website redesign, UI/UX optimization, and mobile-first performance upgrades',
  targetTone: string = 'Professional'
): Promise<GeneratedLeadResult> {
  const apiKey = process.env.GEMINI_API_KEY || '';

  // Fallback if API key is missing or dummy
  if (!apiKey || apiKey.includes('your-gemini') || apiKey.includes('mock-gemini')) {
    console.log('[Gemini Engine] Using intelligent Website Redesign fallback generator');
    return generateFallbackRedesignOutreach(scrapedData, userOffer, targetTone);
  }

  try {
    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ 
      model: 'gemini-1.5-pro',
      generationConfig: {
        responseMimeType: 'application/json',
        temperature: 0.7,
      } 
    });

    const prompt = buildGeminiWebsiteRedesignPrompt(scrapedData, userOffer, targetTone);
    const result = await model.generateContent(prompt);
    const responseText = result.response.text();

    const cleanJsonText = responseText.replace(/```json\n?|\n?```/g, '').trim();
    const parsed: GeneratedLeadResult = JSON.parse(cleanJsonText);

    return parsed;
  } catch (err: any) {
    console.warn(`[Gemini Error] ${err.message}. Falling back to dynamic Redesign Proposal copy.`);
    return generateFallbackRedesignOutreach(scrapedData, userOffer, targetTone);
  }
}

function generateFallbackRedesignOutreach(
  scraped: ScrapedPageContent,
  offer: string,
  tone: string
): GeneratedLeadResult {
  const compName = scraped.title.split('-')[0].split('|')[0].trim() || scraped.domain.split('.')[0];
  const capitalized = compName.charAt(0).toUpperCase() + compName.slice(1);

  return {
    company_name: capitalized,
    summary: `${capitalized} (${scraped.domain}) provides ${scraped.description || 'business services'}, but its website design exhibits mobile layout friction and unoptimized conversion CTA paths.`,
    pain_points: [
      `Outdated mobile responsive layout & navigation friction on ${scraped.domain}`,
      `Sub-optimal Call-to-Action (CTA) placement causing homepage visitor drop-off`,
      `Visual hierarchy & typography due for a modern UI/UX redesign`
    ],
    email_draft_1: {
      subject: `Quick design teardown & redesign concept for ${scraped.domain}`,
      hook: `Noticed ${capitalized}'s current homepage layout while researching high-growth companies in your space.`,
      body: `Hi Alex,\n\nI was checking out ${scraped.domain} and noticed a few quick UI/UX optimization opportunities—specifically around mobile navigation responsiveness and primary CTA placement.\n\nOur team specializes in high-converting website redesigns that modernize brand aesthetics while increasing conversion rates by 30-50%.\n\nWe put together a quick 3-slide redesign mockup for ${capitalized}. Would you be open to taking a look?`
    },
    email_draft_2: {
      subject: `Website redesign idea for ${capitalized}`,
      hook: `Quick note regarding ${capitalized}'s current website UX.`,
      body: `Hi Alex,\n\nQuick question: Are you planning any website UI/UX updates for ${scraped.domain} this quarter?\n\nWe recently redesigned a site in your industry, resulting in a 42% bump in inbound lead inquiries within 30 days.\n\nI'd love to share a free 5-minute video teardown of ${scraped.domain}. Up for a quick look?`
    },
    email_draft_3: {
      subject: `Modernizing ${capitalized}'s web conversion flow`,
      hook: `Huge fan of ${capitalized}'s work, but saw an opportunity to double your website lead capture.`,
      body: `Hey Alex,\n\nMost B2B websites lose over 60% of potential inbound leads due to subtle UX friction on mobile devices and weak CTA contrast.\n\nWe specialize in rebuilding websites for growing brands—turning static sites into high-performing customer acquisition engines.\n\nCould I send over a complimentary website audit & redesign concept tailored for ${capitalized}?`
    }
  };
}
