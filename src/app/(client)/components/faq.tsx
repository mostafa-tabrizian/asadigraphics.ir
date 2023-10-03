'use client'

import { useState } from 'react'

import Collapse from '@mui/material/Collapse'

const FAQ = () => {
   const [q1, setQ1] = useState(false)
   const [q2, setQ2] = useState(false)

   return (
      <div className='border-t-2 px-7 space-y-3 border-black/25 rounded-2xl text-center bg-gradient-to-b from-[#ff7b005f] via-transparent to-transparent'>
         <div className='mb-5'>
            <h2 className='mt-10'>سوالات متداول</h2>
            <span className='yekanBold'>سوالاتی که شاید برای شما هم پیش آمده باشد</span>
         </div>

         <div className='border border-black px-3 rounded-xl'>
            <button
               className='flex justify-between w-full items-center'
               aria-label='categories'
               onClick={() => setQ1((prev) => !prev)}
            >
               <svg
                  className={`h-8 w-8 transition-transform text-black ${
                     q1 ? 'rotate-45' : 'rotate-0'
                  }`}
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

               <span className='yekanBold text-base'>چطور میتونم سفارشم رو ثبت کنم؟</span>
            </button>

            <Collapse in={q1}>
               <p className='yekanBold text-base text-right pb-3'>
                  از طریق سایت میتونید به صفحه خدمات مورد نظرتون برید و بعد از کسب اطلاعات کافی
                  .دکمه ثبت سفارش رو بزنید
               </p>
            </Collapse>
         </div>

         <div className='border border-black px-3 rounded-xl'>
            <button
               className='flex justify-between w-full items-center'
               aria-label='categories'
               onClick={() => setQ2((prev) => !prev)}
            >
               <svg
                  className={`h-8 w-8 transition-transform text-black ${
                     q2 ? 'rotate-45' : 'rotate-0'
                  }`}
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

               <span className='yekanBold text-base'>چطور میتونم سفارشم رو ثبت کنم؟</span>
            </button>

            <Collapse in={q2}>
               <p className='yekanBold text-base text-right pb-3'>
                  از طریق سایت میتونید به صفحه خدمات مورد نظرتون برید و بعد از کسب اطلاعات کافی
                  .دکمه ثبت سفارش رو بزنید
               </p>
            </Collapse>
         </div>
      </div>
   )
}

export default FAQ
