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

  // 1. Strict Environment Key Verification
  if (!apiKey || apiKey.includes('your-gemini') || apiKey.includes('mock-gemini')) {
    throw new Error(
      'Gemini API Key is unconfigured in server environment variables (GEMINI_API_KEY). Please configure a valid Google Gemini API Key in Vercel settings.'
    );
  }

  // 2. Direct Gemini 1.5 Pro AI Call (No silent dummy fallback)
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

    if (!responseText) {
      throw new Error('Gemini API returned an empty response.');
    }

    const cleanJsonText = responseText.replace(/```json\n?|\n?```/g, '').trim();
    const parsed: GeneratedLeadResult = JSON.parse(cleanJsonText);

    if (!parsed.company_name || !parsed.email_draft_1 || !parsed.email_draft_2 || !parsed.email_draft_3) {
      throw new Error('Gemini API output did not match expected proposal JSON structure.');
    }

    return parsed;
  } catch (err: any) {
    console.error('[Gemini API Direct Exception]:', err);
    throw new Error(`Gemini API Error: ${err.message || 'Failed to call Gemini LLM model'}`);
  }
}
