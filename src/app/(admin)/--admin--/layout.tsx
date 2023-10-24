import { ToastContainer } from 'react-toastify'

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
         <ToastContainer
            position='top-center'
            autoClose={3000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme='light'
         />
         <main className='mx-auto mb-24 max-w-screen-lg overflow-x-hidden'>{children}</main>
      </>
   )
}
