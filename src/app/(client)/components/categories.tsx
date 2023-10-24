import Link from 'next/link'
import { ICategory } from '@/models/category'
import hyphen from '@/lib/hyphen'
import Image from 'next/image'

const Categories = ({ categoriesData }: { categoriesData: ICategory[] }) => {
   return (
      <div className='mx-3 grid grid-cols-1 items-center space-y-4 md:grid-cols-2 md:gap-4 md:space-y-0'>
         {categoriesData.map((category, idx) => {
            return (
               <Link
                  key={idx}
                  id='category'
                  aria-label='دسته بندی'
                  href={`/search/${hyphen(category.slug)}?type=category&name=${category.name}`}
                  className='relative items-center overflow-hidden rounded-xl px-3 py-8 shadow-[0_6px_10px_0_#00000040]'
               >
                  <div className='relative z-10 grid justify-center'>
                     <h2 className='text-white' style={{ textShadow: '0 0 5px black' }}>
                        {category.name}
                     </h2>
                     <div className='flex items-center justify-center gap-3 p-1'>
                        <svg
                           className='h-3 w-3 rounded-full bg-white text-black'
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
                        <span className='yekan text-white' style={{ textShadow: '0 0 5px black' }}>
                           مشاهده طرح ها
                        </span>
                     </div>
                  </div>
                  {category.cover ? (
                     <div>
                        <Image
                           className='border border-gray-600 object-cover blur-[2px]'
                           src={`https://tabrizian.storage.iran.liara.space/asadi_designs/designs/${category.cover}`}
                           fill
                           alt={category.name}
                           sizes='(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw'
                        />
                        <span className='absolute left-0 top-0 h-full w-full bg-gradient-to-t from-black/50 to-black/30'></span>
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
