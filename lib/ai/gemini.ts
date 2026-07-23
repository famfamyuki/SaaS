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

  // Fallback to dynamic template generator if API key is unconfigured or mock
  if (!apiKey || apiKey.includes('your-gemini') || apiKey.includes('mock-gemini')) {
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
  const domainParts = scraped.domain.split('.');
  const rawBrand = domainParts[0];
  const capitalized = rawBrand.charAt(0).toUpperCase() + rawBrand.slice(1);
  const mainH1 = scraped.h1[0] || `${capitalized} Digital Platform`;
  const mainH2 = scraped.h2[0] || 'Core Offerings & Solutions';
  const pageDesc = scraped.description || scraped.aboutText.slice(0, 150) || `${capitalized} provides industry services online.`;

  return {
    company_name: capitalized,
    summary: `${capitalized} (${scraped.domain}) focuses on ${pageDesc.slice(0, 120)}. However, its homepage UI exhibits mobile layout friction and unoptimized CTA contrast.`,
    pain_points: [
      `Mobile navigation friction on ${scraped.domain} around header "${mainH1.slice(0, 45)}"`,
      `Low CTA button contrast beneath section "${mainH2.slice(0, 45)}", causing visitor drop-off`,
      `Outdated typography and visual hierarchy due for a modern UI redesign`
    ],
    email_draft_1: {
      subject: `Quick design teardown for ${scraped.domain}`,
      hook: `Noticed ${capitalized}'s current homepage header "${mainH1.slice(0, 45)}" while auditing top sites in your space.`,
      body: `Hi Alex,\n\nI was reviewing ${scraped.domain} and noticed a few high-impact UI/UX opportunities—specifically around mobile responsiveness and primary CTA contrast beneath "${mainH2.slice(0, 45)}".\n\nOur team specializes in high-converting website redesigns that modernize brand aesthetics while boosting conversion rates by 35%+.\n\nWe created a quick 3-slide redesign concept for ${capitalized}. Would you be open to taking a look?`
    },
    email_draft_2: {
      subject: `Website redesign concept for ${capitalized}`,
      hook: `Quick note regarding ${scraped.domain}'s current mobile user experience.`,
      body: `Hi Alex,\n\nAre you planning any website UI/UX updates for ${scraped.domain} this quarter?\n\nWhile inspecting your homepage ("${scraped.title.slice(0, 50)}"), we identified 3 conversion bottlenecks that often cause bounce rate spikes on mobile devices.\n\nI'd love to share a free 5-minute video audit tailored for ${capitalized}. Up for a quick look?`
    },
    email_draft_3: {
      subject: `Modernizing ${capitalized}'s web conversion flow`,
      hook: `Loved learning about ${capitalized}'s offerings around "${mainH2.slice(0, 40)}", but saw an opportunity to double your lead capture.`,
      body: `Hey Alex,\n\nMost B2B websites lose over 60% of potential inbound traffic due to mobile UX friction and low-contrast call-to-actions.\n\nWe specialize in rebuilding websites for growing brands—turning static sites like ${scraped.domain} into high-performing customer acquisition engines.\n\nCould I send over a complimentary website audit & redesign concept tailored for ${capitalized}?`
    }
  };
}
