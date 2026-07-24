/**
 * Dynamically resolves the authentication OAuth redirect URL.
 * Automatically adapts between local browser origin, Vercel deployments, and production URLs.
 */
export function getAuthRedirectUrl(): string {
  if (typeof window !== 'undefined' && window.location?.origin) {
    return `${window.location.origin}/api/auth/callback`;
  }
  if (process.env.NEXT_PUBLIC_SITE_URL) {
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL.startsWith('http')
      ? process.env.NEXT_PUBLIC_SITE_URL
      : `https://${process.env.NEXT_PUBLIC_SITE_URL}`;
    return `${siteUrl}/api/auth/callback`;
  }
  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL}/api/auth/callback`;
  }
  return 'https://saa-s-green.vercel.app/api/auth/callback';
}
