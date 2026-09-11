export const config = {
  apiBaseUrl: import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000',
  newsletterEndpoint: import.meta.env.VITE_NEWSLETTER_ENDPOINT || '/api/newsletter',
  gaId: import.meta.env.VITE_GA_ID || '',
  sentryDsn: import.meta.env.VITE_SENTRY_DSN || '',
};
