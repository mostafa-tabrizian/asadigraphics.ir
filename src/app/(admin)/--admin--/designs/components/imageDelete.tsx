'use client'

import { useState } from 'react'
import { toast } from 'react-toastify'

import deleteFromS3Bucket from '@/lib/deleteFromS3Bucket'

import CircularProgress from '@mui/material/CircularProgress'
import Dialog from '@mui/material/Dialog'

const ImageDelete = ({
   type,
   image,
   design,
}: {
   type: string
   image: string
   design: string
}) => {
   const [loading, setLoading] = useState(false)
   const [confirmation, setConfirmation] = useState(false)

   const handleDelete = async () => {
      setConfirmation(false)

      if (!image) {
         return toast.warning('در حذف تصویر خطایی رخ داده است!')
      }

      if (!design) {
         return toast.error('در تعیین طرح خطایی رخ داده است!')
      }

      setLoading(true)

      try {
         const fileUploadResult = await deleteFromS3Bucket(image, 'designs')

         if (!fileUploadResult) throw new Error('file upload to s3')

         return await removeFromDb()
      } catch (error) {
         toast.error(
            'در آپلود تصویر خطایی رخ داد. (اگر از VPN استفاده می‌کنید لطفا ابتدا آن را خاموش کنید)',
         )
         return console.error(error)
      } finally {
         setLoading(false)
      }
   }

   const removeFromDb = async () => {
      const payload = {
         type,
         key: image,
         _id: design,
      }

      try {
         const res = await fetch('/api/--admin--/design/image/db', {
            method: 'DELETE',
            body: JSON.stringify(payload),
         })

         if (!res.ok) throw new Error()

         toast.success('تصویر با موفقیت حذف شد.')
      } catch (err) {
         toast.error('در حذف تصویر خطایی رخ داد!')
         console.error(err)
      }
   }

   return (
      <>
         <div className='flex items-center justify-end space-x-3 absolute -left-5 top-0'>
            {loading ? (
               <div className='py-2'>
                  <CircularProgress color='success' size={15} />
               </div>
            ) : (
               <button type='button' onClick={() => setConfirmation(true)}>
                  <svg
                     className='h-4 w-4 text-slate-400'
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
                     <path stroke='none' d='M0 0h24v24H0z' /> <line x1='18' y1='6' x2='6' y2='18' />{' '}
                     <line x1='6' y1='6' x2='18' y2='18' />
                  </svg>
               </button>
            )}
         </div>

         <Dialog onClose={() => setConfirmation(false)} open={confirmation}>
            <div className='p-5 text-center space-y-5'>
               <svg
                  className='h-16 w-16 mx-auto text-rose-500'
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
               <div className='flex space-x-5 justify-around'>
                  <button
                     onClick={() => setConfirmation(false)}
                     className='w-full py-1 rounded bg-slate-300'
                  >
                     لغو
                  </button>
                  <button
                     onClick={handleDelete}
                     className='w-full py-1 rounded bg-rose-500 text-white'
                  >
                     حذف
                  </button>
               </div>
            </div>
         </Dialog>
      </>
   )
}

export default ImageDelete
