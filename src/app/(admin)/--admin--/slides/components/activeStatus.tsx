'use client'

import { useState } from 'react'
import { toast } from 'react-toastify'

import dynamic from 'next/dynamic'
const CircularProgress = dynamic(() => import('@mui/material/CircularProgress'), { ssr: false })


const ActiveStatus = ({
   params: { _id, active },
}: {
   params: { _id: string; active: boolean }
}) => {
   const [loading, setLoading] = useState(false)
   const [status, setStatus] = useState(active)

   const handleClick = async () => {
      if (!_id) {
         return toast.warning('در خواندن اسلاید خطایی رخ داد!')
      }

      setLoading(true)

      const payload = {
         _id: _id,
      }

      try {
         const res = await fetch('/api/--admin--/slide', {
            method: 'PATCH',
            body: JSON.stringify(payload),
         })

         if (!res.ok) throw new Error()

         setStatus((prev) => !prev)

         fetch('/api/--admin--/revalidate?path=/')

         return toast.success('وضعیت اسلاید با موفقیت تغییر یافت.')
      } catch (err) {
         toast.error('در تغییر وضعیت اسلاید خطایی رخ داد!')
         return console.error(err)
      } finally {
         setLoading(false)
      }
   }

   return (
      <div className='flex items-center justify-end drop-shadow space-x-3 absolute left-10 top-0 z-10'>
         {loading ? (
            <div className='py-2'>
               <CircularProgress color='primary' size={20} />
            </div>
         ) : (
            <button type='button' onClick={handleClick}>
               {status ? (
                  <svg
                     className='h-6 w-6 text-white'
                     viewBox='0 0 24 24'
                     fill='none'
                     stroke='currentColor'
                     strokeWidth='2'
                     strokeLinecap='round'
                     strokeLinejoin='round'
                  >
                     {' '}
                     <path d='M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z' />{' '}
                     <circle cx='12' cy='12' r='3' />
                  </svg>
               ) : (
                  <svg
                     className='h-6 w-6 text-white'
                     fill='none'
                     viewBox='0 0 24 24'
                     stroke='currentColor'
                  >
                     <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        strokeWidth='2'
                        d='M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21'
                     />
                  </svg>
               )}
            </button>
         )}
      </div>
   )
}

export default ActiveStatus
