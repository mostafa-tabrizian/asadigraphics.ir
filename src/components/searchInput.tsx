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
         <form onSubmit={handleFormSubmit} className='w-full'>
            <input
               onChange={(e) => setSearchQuery(e.target.value)}
               className='rounded-xl bg-slate-100 w-full rtl shadow-[0_0_7px_0_#00000040_inset] py-2 border border-black/25 yekanBold text-center placeholder:text-center text-slate-800 placeholder:text-slate-700'
               type='text'
               placeholder='جستجو میان طرح ها ...'
            />
         </form>
      </div>
   )
}

export default SearchInput
