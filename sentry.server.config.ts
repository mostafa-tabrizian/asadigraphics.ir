// This file configures the initialization of Sentry on the server.
// The config you add here will be used whenever the server handles a request.
// https://docs.sentry.io/platforms/javascript/guides/nextjs/

import { init } from '@sentry/nextjs';

init({
  dsn: 'https://281e5ed4cddd50d26ffaa735e6bb499a@o4506054884786176.ingest.sentry.io/4506054887800832',

  tracesSampleRate: 1.0,  // Adjust this value in production, or use tracesSampler for greater control
  profilesSampleRate: 1.0, // Profiling sample rate is relative to tracesSampleRate

  debug: false,  // Setting this option to true will print useful information to the console while you're setting up Sentry.
});
