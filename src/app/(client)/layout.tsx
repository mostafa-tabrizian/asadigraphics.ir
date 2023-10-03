import Header from '../components/header'
import Footer from '../components/footer'

import dbConnect from '@/lib/dbConnect'
import Category from '@/models/category'

const getCategories = async () => {
   dbConnect()
   const categories = await Category.find()

   return { categories }
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
   const { categories } = await getCategories()

   return (
      <>
         <Header params={{ categories }} />

         <main className='mb-24 max-w-screen-lg overflow-x-hidden mx-auto'>{children}</main>

         <Footer />
      </>
   )
}
