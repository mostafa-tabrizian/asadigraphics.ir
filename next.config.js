// eslint-disable-next-line @typescript-eslint/no-var-requires
// const { withSentryConfig } = require('@sentry/nextjs')

/** @type {import('next').NextConfig} */

const nextConfig = {
   async headers() {
      return [
         {
            source: '/(.*)',
            headers: [
               {
                  key: 'X-Frame-Options',
                  value: 'SAMEORIGIN',
               },
               {
                  key: 'X-Content-Type-Options',
                  value: 'nosniff',
               },
               {
                  key: 'Strict-Transport-Security',
                  value: 'max-age=3571000; includeSubDomains; preload',
               },
            ],
         },
      ]
   },
   images: {
      formats: ['image/avif', 'image/webp'],
      minimumCacheTTL: 1 * 30 * 24 * 60 * 60,
      remotePatterns: [
         {
            protocol: 'https',
            hostname: 'tabrizian.storage.iran.liara.space',
            port: '',
         },
      ],
   },
   output: 'standalone',
   // sentry: {
      // For all available options, see:
      // https://docs.sentry.io/platforms/javascript/guides/nextjs/manual-setup/

      // Upload a larger set of source maps for prettier stack traces (increases build time)
      // widenClientFileUpload: true,

      // Routes browser requests to Sentry through a Next.js rewrite to circumvent ad-blockers (increases server load)
      // tunnelRoute: '/monitoring',

      // Hides source maps from generated client bundles
      // hideSourceMaps: true,

      // Automatically tree-shake Sentry logger statements to reduce bundle size
      // disableLogger: true,
   // },
   webpack: (config) => {
      config.externals.push({
         '@aws-sdk/signature-v4-multi-region': 'commonjs @aws-sdk/signature-v4-multi-region',
      })

      return config
   },
}

// const sentryWebpackPluginOptions = {
   // For all available options, see:
   // https://github.com/getsentry/sentry-webpack-plugin#options

   // Suppresses source map uploading logs during build
   // silent: true,
   // org: 'tabriziancodes',
   // project: 'asadigraphics',
// }

// eslint-disable-next-line @typescript-eslint/no-var-requires
const withBundleAnalyzer = require('@next/bundle-analyzer')({
   enabled: process.env.ANALYZE === 'true',
})

module.exports = withBundleAnalyzer(nextConfig)
