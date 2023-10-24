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
      <div className='relative mt-2 flex items-center justify-center md:w-auto'>
         <form
            onSubmit={handleFormSubmit}
            className='relative w-full justify-between rounded-lg border border-slate-300 bg-slate-100 '
         >
            <input
               onChange={(e) => setSearchQuery(e.target.value)}
               className='rtl yekanBold w-full py-2 text-center text-sm text-slate-800 outline-none placeholder:text-center placeholder:text-slate-500'
               type='text'
               placeholder='جستجو میان طرح ها ...'
            />
            {loading ? (
               <div className='absolute right-5 top-1 m-auto h-7 w-7'>
                  <CircularProgress size={25} />
               </div>
            ) : (
               <svg
                  className='absolute right-5 top-1 m-auto h-7 w-7 text-orange-400 hover:cursor-pointer'
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
