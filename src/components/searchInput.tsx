'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import hyphen from '@/lib/hyphen'
import dynamic from 'next/dynamic'
const CircularProgress = dynamic(() => import('@mui/material/CircularProgress'), { ssr: false })

const SearchInput = () => {
   const [loading, setLoading] = useState(false)
   const [searchQuery, setSearchQuery] = useState('')
   const router = useRouter()

   const handleFormSubmit = (e: React.FormEvent) => {
      e.preventDefault()
      setLoading(true)
      if (searchQuery.trim()) {
         router.push(`/search/${hyphen(searchQuery)}?type=search`)
      }

      setTimeout(() => {
         setLoading(false)
      }, 1500)
   }

   useEffect(() => {
      return () => {
         setLoading(false)
      }
   }, [])

   return (
      <div className='flex justify-center md:w-auto items-center relative mt-2'>
         <form
            onSubmit={handleFormSubmit}
            className='border relative justify-between border-slate-300 rounded-lg bg-slate-100 w-full '
         >
            <input
               onChange={(e) => setSearchQuery(e.target.value)}
               className='text-sm rtl w-full py-2 outline-none yekanBold text-center placeholder:text-center text-slate-800 placeholder:text-slate-500'
               type='text'
               placeholder='جستجو میان طرح ها ...'
            />
            {loading ? (
               <div className='h-7 w-7 m-auto absolute right-5 top-1'>
                  <CircularProgress size={25} />
               </div>
            ) : (
               <svg
                  className='h-7 w-7 m-auto absolute right-5 top-1 text-orange-400 hover:cursor-pointer'
                  width='24'
                  height='24'
                  viewBox='0 0 24 24'
                  strokeWidth='2'
                  stroke='currentColor'
                  fill='none'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  onClick={handleFormSubmit}
               >
                  {' '}
                  <path stroke='none' d='M0 0h24v24H0z' /> <circle cx='10' cy='10' r='7' />{' '}
                  <line x1='21' y1='21' x2='15' y2='15' />
               </svg>
            )}
         </form>
      </div>
   )
}

export default SearchInput
