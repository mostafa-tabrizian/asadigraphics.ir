import Header from '../components/header'
import Footer from '../components/footer'

import dbConnect from '@/lib/dbConnect'
import Category from '@/models/category'

import { ToastContainer } from 'react-toastify'

const getCategories = async () => {
   await dbConnect()
   const categories = await Category.find()

   return { categories }
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
   const { categories } = await getCategories()

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

         <Header params={{ categories }} />

         <main className='mb-24 md:mt-24 max-w-screen-lg overflow-x-hidden mx-auto'>
            {children}
         </main>

         <Footer />
      </>
   )
}
