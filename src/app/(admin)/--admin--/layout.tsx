export const metadata = {
   robots: {
      index: false,
      follow: false,
      nocache: true,
      googleBot: {
         index: false,
         follow: false,
      },
   },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
   return (
      <>
         <main className='mb-24 max-w-screen-lg overflow-x-hidden mx-auto'>{children}</main>
      </>
   )
}
