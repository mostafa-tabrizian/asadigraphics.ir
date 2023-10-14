import { Metadata } from 'next'
import { ToastContainer } from 'react-toastify'

import Footer from '../components/footer'
import Header from '../components/header'

import dbConnect from '@/lib/dbConnect'
import Category from '@/models/category'

export const metadata: Metadata = {
   title: 'اسدی گرافیک',
   description:
      'ما در اسدی گرافیک با ارائه طرح‌هایی قبیل لوگو، پوستر، بنر و کارت ویزیت با دیزاین منحصر به فرد و اختصاصی برای شما که بازتابی از شخصیت و سلیقه‌ی شما خواهد بود تحویل میدهیم',
   manifest: 'http://localhost:3000/site.webmanifest',
}

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
