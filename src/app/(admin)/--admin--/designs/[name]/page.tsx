import Link from 'next/link'

import dbConnect from '@/lib/dbConnect'
import Breadcrumbs from '@mui/material/Breadcrumbs'
import Design from '@/models/design'
import Category from '@/models/category'
import DetailDesign from '../components/detailForm'
import dehyphen from '@/lib/dehyphen'

export const metadata = {
   title: 'اسدی گرافیک | ادمین | طرح',
}

const DesignPage = async ({ params: { name } }: { params: { name: string } }) => {
   const addingNewDesign = name === 'new'

   try {
      await dbConnect()

      const categories = await Category.find()

      let design = null

      if (!addingNewDesign) {
         const designData = await Design.aggregate([
            { $match: { name: dehyphen(decodeURI(name)) } },
            {
               $lookup: {
                  from: 'categories',
                  localField: 'category',
                  foreignField: '_id',
                  as: 'category',
               },
            },
            {
               $limit: 1,
            },
         ])

         design = designData[0]
      }

      return (
         <div className='mx-6 my-16 relative'>
            <div className='mx-6 md:mx-auto max-w-screen-xl space-y-10 my-16'>
               {addingNewDesign || design ? (
                  <>
                     <Breadcrumbs aria-label='breadcrumb'>
                        <Link className='text-gray-400' href='/'>
                           صفحه اصلی
                        </Link>
                        <Link className='text-gray-400' href='/--admin--'>
                           ادمین
                        </Link>
                        <Link className='text-gray-400' href='/--admin--/designs'>
                           طرح ها
                        </Link>
                        <h5 className='font-semibold rtl'>
                           {addingNewDesign ? 'افزودن طرح جدید' : design.name}
                        </h5>
                     </Breadcrumbs>

                     <div className='max-w-xl mx-auto'>
                        <Link href='/--admin--/designs/new'>
                           <button className='bg-white z-10 border-2 border-orange-500 rounded-full p-3 fixed bottom-10 right-5'>
                              <svg
                                 className='h-6 w-6 text-orange-500'
                                 fill='none'
                                 viewBox='0 0 24 24'
                                 stroke='currentColor'
                              >
                                 <path
                                    strokeLinecap='round'
                                    strokeLinejoin='round'
                                    strokeWidth='2'
                                    d='M12 4v16m8-8H4'
                                 />
                              </svg>
                           </button>
                        </Link>

                        <DetailDesign
                           addingNewDesign={addingNewDesign}
                           design={JSON.parse(JSON.stringify(design))}
                           categories={JSON.parse(JSON.stringify(categories))}
                        />
                     </div>
                  </>
               ) : (
                  <h1>آیتم پیدا نشد!</h1>
               )}
            </div>
         </div>
      )
   } catch (error) {
      console.error('Error fetching data:', error)
      return
   }
}

export default DesignPage
