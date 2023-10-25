'use client'

import { useEffect } from 'react'

export default function Error({ error, reset }: { error: Error; reset: () => void }) {
   useEffect(() => {
      console.error('error:', error)
      console.error('message:', error.message)

      return () => {}
   }, [error])

   return (
      <div className='mx-auto my-6 w-fit space-y-5 rounded-lg px-6 py-2 text-center shadow-lg shadow-orange-700/50'>
         <h2>! خطایی رخ داد</h2>
         <button type='button' className='underline' onClick={() => reset()}>
            تلاش مجدد
         </button>
      </div>
   )
}
