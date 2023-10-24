'use client'

import { useRouter } from 'next/navigation'

const Back = () => {
   const router = useRouter()
   return (
      <button
         onClick={() => router.back()}
         className='absolute left-3 top-32 z-10 md:relative md:right-[90%] md:top-0 md:flex md:items-center'
         style={{ filter: 'drop-shadow(2px 3px 3px #00000045)' }}
         aria-label='دکمه بازگشت'
      >
         <span className='hidden text-lg md:block'>بازگشت</span>
         <svg
            className='h-8 w-8 text-white md:text-black'
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
      </button>
   )
}

export default Back
