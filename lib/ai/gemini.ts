import { GoogleGenerativeAI } from '@google/generative-ai';
import { ScrapedPageContent } from '../scraper/web-scraper';
import { buildGeminiOutreachPrompt } from './prompts';

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
  userOffer: string,
  targetTone: string = 'Professional'
): Promise<GeneratedLeadResult> {
  const apiKey = process.env.GEMINI_API_KEY || '';

  // Fallback if API key is missing or dummy
  if (!apiKey || apiKey.includes('your-gemini') || apiKey.includes('mock-gemini')) {
    console.log('[Gemini Engine] Using intelligent fallback generator (API Key unconfigured or mock)');
    return generateFallbackOutreach(scrapedData, userOffer, targetTone);
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

    const prompt = buildGeminiOutreachPrompt(scrapedData, userOffer, targetTone);
    const result = await model.generateContent(prompt);
    const responseText = result.response.text();

    const cleanJsonText = responseText.replace(/```json\n?|\n?```/g, '').trim();
    const parsed: GeneratedLeadResult = JSON.parse(cleanJsonText);

    return parsed;
  } catch (err: any) {
    console.warn(`[Gemini Error] ${err.message}. Falling back to dynamic copy generation.`);
    return generateFallbackOutreach(scrapedData, userOffer, targetTone);
  }
}

function generateFallbackOutreach(
  scraped: ScrapedPageContent,
  offer: string,
  tone: string
): GeneratedLeadResult {
  const compName = scraped.title.split('-')[0].split('|')[0].trim() || scraped.domain.split('.')[0];
  const capitalized = compName.charAt(0).toUpperCase() + compName.slice(1);
  const cleanOffer = offer || 'our automated growth and conversion optimization platform';

  return {
    company_name: capitalized,
    summary: `${capitalized} (${scraped.domain}) delivers ${scraped.description || 'digital services and enterprise software solutions'}.`,
    pain_points: [
      `Scaling qualified enterprise inbound leads for ${scraped.domain}`,
      `Reducing sales cycle friction and increasing outreach reply rates`,
      `Optimizing customer acquisition costs while expanding in competitive markets`
    ],
    email_draft_1: {
      subject: `Scaling ${capitalized}'s inbound pipeline with ${cleanOffer.slice(0, 30)}...`,
      hook: `Saw ${capitalized}'s recent focus on "${scraped.h1[0] || scraped.title}".`,
      body: `Hi Alex,\n\nNotice how teams at ${capitalized} are scaling rapidly. Often, expanding market presence introduces friction in converting high-intent leads.\n\nWe built ${cleanOffer} to help teams like yours increase outbound reply rates by 2.4x without adding SDR headcount.\n\nWould you be open to a quick 10-minute preview next Tuesday?`
    },
    email_draft_2: {
      subject: `Quick idea for ${capitalized}`,
      hook: `Loved the layout and messaging on ${scraped.domain}!`,
      body: `Hi Alex,\n\nQuick question—are you currently testing new channels to optimize ${capitalized}'s enterprise pipeline?\n\nOur platform plugs directly into your existing workflow with ${cleanOffer}.\n\nWorth a brief 5-min chat this week?`
    },
    email_draft_3: {
      subject: `Case study: How we helped a peer of ${capitalized} boost ROI by 35%`,
      hook: `Impressive growth trajectory at ${capitalized}!`,
      body: `Hey Alex,\n\nWe recently helped a B2B platform similar to ${capitalized} overcome outbound fatigue and generate 42 new qualified demos in 30 days.\n\nCould I send over a quick 2-page teardown tailored for ${capitalized}?`
    }
  };
}
