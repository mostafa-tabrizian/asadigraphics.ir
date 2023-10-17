import Link from 'next/link'
import { ICategory } from '@/models/category'
import hyphen from '@/lib/hyphen'
import Image from 'next/image'

const Categories = ({ categoriesData }: { categoriesData: ICategory[] }) => {
   return (
      <div className='space-y-4 mx-3 grid grid-cols-1 md:grid-cols-2 items-center md:space-y-0 md:gap-4'>
         {categoriesData.map((category, idx) => {
            return (
               <Link
                  key={idx}
                  id='category'
                  aria-label='دسته بندی'
                  href={`/search/${hyphen(category.slug)}?type=category&name=${category.name}`}
                  className='overflow-hidden rounded-xl relative py-8 px-3 items-center shadow-[0_6px_10px_0_#00000040]'
               >
                  <div className='grid justify-center relative z-10'>
                     <h2 className='text-white' style={{ textShadow: '0 0 5px black' }}>
                        {category.name}
                     </h2>
                     <div className='flex items-center gap-3 p-1 justify-center'>
                        <svg
                           className='h-3 w-3 bg-white rounded-full text-black'
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
                        {/* <svg
                           className='h-6 w-6 text-white'
                           width='24'
                           height='24'
                           viewBox='0 0 24 24'
                           strokeWidth='2'
                           stroke='currentColor'
                           fill='none'
                           strokeLinecap='round'
                           strokeLinejoin='round'
                        >
                           {' '}
                           <path stroke='none' d='M0 0h24v24H0z' />{' '}
                           <polyline points='15 6 9 12 15 18' />
                        </svg> */}
                        <span className='text-white yekan' style={{ textShadow: '0 0 5px black' }}>
                           مشاهده طرح ها
                        </span>
                     </div>
                  </div>
                  {category.cover ? (
                     <div>
                        <Image
                           className='object-cover border border-gray-600 blur-[2px]'
                           src={`https://tabrizian.storage.iran.liara.space/asadi_designs/designs/${category.cover}`}
                           fill
                           alt={category.name}
                           sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                        />
                        <span className='absolute top-0 left-0 h-full w-full bg-gradient-to-t from-black/50 to-black/30'></span>
                     </div>
                  ) : (
                     ''
                  )}
               </Link>
            )
         })}
      </div>
   )
}

export default Categories
