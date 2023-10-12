'use client'

import '@/app/styles/globals.scss'
import '@/app/styles/mui.scss'
import '@/app/styles/lightbox.scss'

import 'react-toastify/dist/ReactToastify.min.css'

import { SessionProvider } from 'next-auth/react'
import Analytics from './GTM'

export default function RootLayout({ children }: { children: React.ReactNode }) {
   console.log(
      `%c
   _______    _          _     _             
  |__   __|  | |        (_)   (_)            
     | | __ _| |__  _ __ _ _____  __ _ _ __  
     | |/ _\` | '_ \\| '__| |_  / |/ _\` | '_ \\ 
     | | (_| | |_) | |  | |/ /| | (_| | | | |
     |_|\\__,_|_.__/|_|  |_/___|_|\\__,_|_| |_|
     Telegram: @Tabrizian_dev
`,
      'color: #2495ff; font-weight: bold;',
   )

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
