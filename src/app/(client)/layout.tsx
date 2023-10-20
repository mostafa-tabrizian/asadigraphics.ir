import { Metadata } from 'next'
import dynamic from 'next/dynamic'

const Footer = dynamic(() => import('../components/footer'))
const Header = dynamic(() => import('../components/header'))

import dbConnect from '@/lib/dbConnect'
import Category from '@/models/category'

export const metadata: Metadata = {
   title: 'اسدی گرافیک',
   description:
      'ما در اسدی گرافیک با ارائه طرح‌هایی قبیل لوگو، پوستر، بنر و کارت ویزیت با دیزاین منحصر به فرد و اختصاصی برای شما که بازتابی از شخصیت و سلیقه‌ی شما خواهد بود تحویل میدهیم',
   manifest: 'https://asadigraphics.ir/site.webmanifest',
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
         <Header params={{ categories }} />

         <main className='mb-24 md:mt-24 max-w-screen-lg overflow-x-hidden mx-auto'>
            {children}
         </main>

         <Footer />
      </>
   )
}
