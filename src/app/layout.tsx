'use client'

import '@/app/styles/globals.scss'
import '@/app/styles/mui.scss'
import '@/app/styles/lightbox.scss'

import 'react-toastify/dist/ReactToastify.min.css'

import { SessionProvider } from 'next-auth/react'
import Analytics from './GTM'

export default function RootLayout({ children }: { children: React.ReactNode }) {
   return (
      <html lang='fa'>
         <meta name='color-scheme' content='light only' />
         <body>
            <Analytics />
            <SessionProvider>
               <main className='overflow-x-hidden mx-auto'>{children}</main>
            </SessionProvider>
         </body>
      </html>
   )
}
