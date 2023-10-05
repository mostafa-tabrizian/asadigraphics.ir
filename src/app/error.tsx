'use client'

import { useEffect } from 'react'

export default function Error({ error, reset }: { error: Error; reset: () => void }) {
   useEffect(() => {
      console.error('error:', error)
      console.error('message:', error.message)

      return () => {}
   }, [error])

   return (
      <div className='text-center space-y-5 py-2 px-6 rounded-lg shadow-lg mx-auto my-6 w-fit shadow-orange-700/50'>
         <h2>! خطایی رخ داد</h2>
         <button className='underline' onClick={() => reset()}>
            تلاش مجدد
         </button>
      </div>
   )
}
