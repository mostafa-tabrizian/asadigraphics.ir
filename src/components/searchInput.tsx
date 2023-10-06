'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import hyphen from '@/lib/hyphen'
import { toast } from 'react-toastify'
import CircularProgress from '@mui/material/CircularProgress'

const SearchInput = () => {
   const [searchQuery, setSearchQuery] = useState('')
   const router = useRouter()

   const handleFormSubmit = (e: React.FormEvent) => {
      e.preventDefault()

      toast(
         <div className='mx-auto flex justify-center'>
            <CircularProgress size={25} />
         </div>,
         {
            hideProgressBar: true,
            closeButton: false,
            style: {
               display: 'flex',
               justifyContent: 'center',
               textAlign: 'center',
               width: '3.5rem',
               marginLeft: 'auto',
               marginRight: 'auto',
            },
            autoClose: 750,
         },
      )

      if (searchQuery.trim()) {
         router.push(`/search/${hyphen(searchQuery)}?type=search`)
      }
   }

   return (
      <div className='flex justify-center md:w-auto items-center relative mt-2'>
         <form
            onSubmit={handleFormSubmit}
            className='border grid grid-cols-6 justify-between border-slate-300 rounded-lg bg-slate-100 w-full '
         >
            <input
               onChange={(e) => setSearchQuery(e.target.value)}
               className='text-sm rtl py-2 col-span-5 outline-none yekanBold text-center placeholder:text-center text-slate-800 placeholder:text-slate-500'
               type='text'
               placeholder='جستجو میان طرح ها ...'
            />
            <svg
               className='h-7 w-7 m-auto text-orange-400'
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
               <path stroke='none' d='M0 0h24v24H0z' /> <circle cx='10' cy='10' r='7' />{' '}
               <line x1='21' y1='21' x2='15' y2='15' />
            </svg>
         </form>
      </div>
   )
}

export default SearchInput
