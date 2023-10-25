'use client'

import Script from 'next/script'

export default function Analytics() {
   const GTM_ID = 'GTM-T2CBCSRQ'

   return (
      <>
         <noscript>
            <iframe
               src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
               height='0'
               width='0'
               style={{ display: 'none', visibility: 'hidden' }}
            />
         </noscript>
         <Script
            id='gtm-script'
            strategy='afterInteractive'
            dangerouslySetInnerHTML={{
               __html: `
                  (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
                  new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
                  j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
                  'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
                  })(window,document,'script','dataLayer', '${GTM_ID}');
               `,
            }}
         />
         <Script
            id='umami-script'
            strategy='afterInteractive'
            async
            src='https://analytics.eu.umami.is/script.js'
            data-website-id='f1b0226f-3196-4b5b-bc72-8445225ea3ea'
         />
      </>
   )
}
