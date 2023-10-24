import Link from 'next/link'

import dbConnect from '@/lib/dbConnect'
import Design from '@/models/design'

const Breadcrumbs = dynamic(() => import('@mui/material/Breadcrumbs'), { ssr: false })
import dynamic from 'next/dynamic'

const DesignsTable = dynamic(() => import('./components/designsTable'), {
   ssr: false,
   loading: () => (
      <div className='mx-auto my-16 max-w-screen-lg animate-pulse space-y-2'>
         <div className='h-32 rounded bg-slate-50'></div>
         <div className='h-32 rounded bg-slate-50'></div>
         <div className='h-32 rounded bg-slate-50'></div>
         <div className='h-32 rounded bg-slate-50'></div>
         <div className='h-32 rounded bg-slate-50'></div>
         <div className='h-32 rounded bg-slate-50'></div>
      </div>
   ),
})

export const revalidate = 0

export const metadata = {
   title: 'اسدی گرافیک | پنل ادمین | طرح ها',
}

const getDesigns = async () => {
   await dbConnect()
   const designs = await Design.aggregate([
      {
         $lookup: {
            from: 'categories',
            localField: 'category',
            foreignField: '_id',
            as: 'category',
         },
      },
   ])

   return designs.reverse().map((design) => {
      return {
         ...design,
         category: design.category[0].name,
      }
   })
}

const AdminDesigns = async () => {
   const designs = await getDesigns()

   return (
      <div className='relative mx-6 my-16 max-w-screen-lg space-y-10 md:mx-auto'>
         <>
            <Breadcrumbs aria-label='breadcrumb'>
               <Link className='text-gray-400' href='/'>
                  صفحه اصلی
               </Link>
               <Link className='text-gray-400' href='/--admin--'>
                  ادمین
               </Link>
               <h5 className='font-semibold'>طرح ها</h5>
            </Breadcrumbs>

            <Link href='/--admin--/designs/new'>
               <button className='fixed bottom-10 right-5 z-10 rounded-full border-2 border-orange-500 bg-white p-3'>
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

            <DesignsTable designs={JSON.parse(JSON.stringify(designs))} />
         </>
      </div>
   )
}

export default AdminDesigns
