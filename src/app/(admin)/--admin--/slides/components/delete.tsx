'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import dynamic from 'next/dynamic'

const CircularProgress = dynamic(() => import('@mui/material/CircularProgress'), { ssr: false })
const Dialog = dynamic(() => import('@mui/material/Dialog'), { ssr: false })

const SlideDelete = ({ params: { _id, src } }: { params: { _id: string; src: string } }) => {
   const [loading, setLoading] = useState(false)
   const [confirmation, setConfirmation] = useState(false)

   const router = useRouter()

   const handleDelete = async () => {
      setConfirmation(false)

      if (!_id) {
         const toast = await import('react-toastify').then((mod) => mod.toast)
         return toast.warning('در حذف اسلاید خطایی رخ داده است!')
      }

      setLoading(true)

      try {
         const deleteFromS3Bucket = await import('@/lib/deleteFromS3Bucket').then(
            (mod) => mod.default,
         )
         const fileUploadResult = await deleteFromS3Bucket(src, 'slides')

         if (!fileUploadResult) throw new Error('file upload to s3')

         return await removeFromDb()
      } catch (error) {
         const toast = await import('react-toastify').then((mod) => mod.toast)
         toast.error(
            'در حذف اسلاید خطایی رخ داد. (اگر از VPN استفاده می‌کنید لطفا ابتدا آن را خاموش کنید)',
         )
         return console.error(error)
      } finally {
         setLoading(false)
      }
   }

   const removeFromDb = async () => {
      const payload = {
         _id,
      }

      const toast = await import('react-toastify').then((mod) => mod.toast)

      try {
         const res = await fetch('/api/--admin--/slide', {
            method: 'DELETE',
            body: JSON.stringify(payload),
         })

         if (!res.ok) throw new Error()

         toast.success('اسلاید با موفقیت حذف شد.')

         fetch('/api/--admin--/revalidate?path=/')

         return router.refresh()
      } catch (err) {
         toast.error('در حذف اسلاید خطایی رخ داد!')
         console.error(err)
      }
   }

   return (
      <>
         <div className='absolute left-0 top-0 z-10 flex items-center justify-end space-x-3 drop-shadow'>
            {loading ? (
               <div className='py-2'>
                  <CircularProgress color='error' size={20} />
               </div>
            ) : (
               <button type='button' onClick={() => setConfirmation(true)}>
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
                        d='M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16'
                     />
                  </svg>
               </button>
            )}
         </div>

         <Dialog onClose={() => setConfirmation(false)} open={confirmation}>
            <div className='space-y-5 p-5 text-center'>
               <svg
                  className='mx-auto h-16 w-16 text-rose-500'
                  viewBox='0 0 24 24'
                  fill='none'
                  stroke='currentColor'
                  strokeWidth='2'
                  strokeLinecap='round'
                  strokeLinejoin='round'
               >
                  {' '}
                  <circle cx='12' cy='12' r='10' /> <line x1='15' y1='9' x2='9' y2='15' />{' '}
                  <line x1='9' y1='9' x2='15' y2='15' />
               </svg>
               <h1>آیا مطمئن هستید؟</h1>
               <span className='font-semibold'>
                  .پس از حذف هیچ راه بازگرداندی وجود ندارد <br /> آیا از حذف کردن خود مطمئن هستید؟
               </span>
               <div className='flex justify-around space-x-5'>
                  <button
                     type='button'
                     onClick={() => setConfirmation(false)}
                     className='w-full rounded bg-slate-300 py-1'
                  >
                     لغو
                  </button>
                  <button
                     type='submit'
                     onClick={handleDelete}
                     className='w-full rounded bg-rose-500 py-1 text-white'
                  >
                     حذف
                  </button>
               </div>
            </div>
         </Dialog>
      </>
   )
}

export default SlideDelete
