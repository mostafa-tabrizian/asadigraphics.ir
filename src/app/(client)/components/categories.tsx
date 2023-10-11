import Link from 'next/link'
import { ICategory } from '@/models/category'
import hyphen from '@/lib/hyphen'

const Categories = ({ categoriesData }: { categoriesData: ICategory[] }) => {
   return (
      <div className='space-y-4 mx-3 md:grid md:grid-cols-2 items-center md:space-y-0 md:gap-4'>
         {categoriesData.map((category, idx) => {
            return (
               <Link
                  key={idx}
                  aria-label='دسته بندی'
                  href={`/search/${hyphen(category.slug)}?type=category&name=${category.name}`}
                  className='grid grid-cols-6 overflow-hidden whitespace-pre border py-6 px-3 items-center rounded-xl border-black/25 bg-gradient-to-br from-[#FF7A0094] to-orange-100 shadow-[0_6px_10px_0_#00000040]'
               >
                  <div className='col-span-3 text-right'>
                     <h2>{category.name}</h2>
                     <div className='bg-black rounded-l-full w-fit mt-2 ml-auto flex items-center gap-3 p-1'>
                        <svg
                           className='h-5 w-5 bg-white rounded-full text-black'
                           fill='none'
                           viewBox='0 0 24 24'
                           stroke='currentColor'
                        >
                           <path
                              strokeLinecap='round'
                              strokeLinejoin='round'
                              strokeWidth='2'
                              d='M15 19l-7-7 7-7'
                           />
                        </svg>
                        <span className='text-white yekan'>مشاهده طرح ها</span>
                     </div>
                  </div>
                  <div className='col-span-3'>
                     <span className='text-center block BebasNeue opacity-30 leading-[2.7rem] tracking-tight text-6xl whitespace-pre'>
                        {category.slug.toUpperCase().replaceAll(' ', '\n')}
                     </span>
                  </div>
               </Link>
            )
         })}
      </div>
   )
}

export default Categories
