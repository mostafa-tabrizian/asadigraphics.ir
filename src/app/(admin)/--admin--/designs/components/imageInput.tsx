import { useState, useMemo } from 'react'
import Image from 'next/legacy/image'
import { toast } from 'react-toastify'
import Link from 'next/link'

import Button from '@mui/material/Button'
import CircularProgress from '@mui/material/CircularProgress'

import ImageDelete from './imageDelete'
import filesSizeValidation from '@/lib/filesSizeValidation'
import filesTypeValidation from '@/lib/filesTypeValidation'
import imageUploadHandler from '@/lib/imageUploadHandler'
import deleteFromS3Bucket from '@/lib/deleteFromS3Bucket'

const ImageInput = ({ design }: { design: { _id: string; front: string; back: string } }) => {
   const [imageToUpload, setImageToUpload] = useState<FileList | null>(null)
   const [loading, setLoading] = useState(false)

   const imageToUploadMemo = useMemo(() => {
      return imageToUpload && Object.values(imageToUpload)
   }, [imageToUpload])

   const createDbData = async (type: string, key: string, imageName: string) => {
      const payload = {
         type,
         key,
         _id: design._id,
      }

      try {
         const res = await fetch('/api/--admin--/design/image/db', {
            method: 'POST',
            body: JSON.stringify(payload),
         })

         if (!res.ok) throw new Error()

         setImageToUpload(null)
         toast.success(`تصویر ${imageName} با موفقیت آپلود شد.`)
      } catch (err) {
         toast.error(`در آپلود تصویر ${imageName} به دیتابیس خطایی رخ داد!`)
         console.error(err)

         await deleteLeftOvers(key)
      }
   }

   const deleteLeftOvers = async (key: string) => {
      try {
         await deleteFromS3Bucket(key, 'designs')
      } catch (err) {
         console.error('deleteLeftOvers', err)
      }
   }

   const onSubmit = async (type: string) => {
      toast.info('در حال آپلود و ثبت اطلاعات تصویر...')

      if (!imageToUpload || !imageToUploadMemo) {
         return toast.warning('هیچ تصویری برای آپلود انتخاب نشده است!')
      }
      if (!design._id) {
         return toast.error('در تعیین طرح خطایی رخ داده است!')
      }

      setLoading(true)

      try {
         for (const image of imageToUploadMemo) {
            const res = await imageUploadHandler(image, 'designs')

            if (res) await createDbData(type, res.key, res.imageName)
            else throw new Error()
         }
         return
      } catch (error) {
         return
      } finally {
         setLoading(false)
      }
   }

   const onImagesSelected = (files: FileList | null) => {
      if (!files) return

      const filesList: File[] = Object.values(files)

      const typeCheckRes = filesTypeValidation(filesList)
      if (!typeCheckRes) return

      const sizeCheckRes = filesSizeValidation(filesList)
      if (!sizeCheckRes) return

      setImageToUpload(files)
   }

   const dragOverHandler = (event: React.DragEvent<HTMLDivElement>) => event.preventDefault()

   const dropHandlerDesign = (event: React.DragEvent<HTMLDivElement>) => {
      event.preventDefault()
      const files = event.dataTransfer.files

      if (!files) return toast.warning('در دریافت فایل ها خطایی رخ داد')
      else if (files.length !== 1)
         return toast.warning(
            'تعداد تصاویر انتخاب شده بیشتر از یک عدد می‌باشد. تصویر طرح می‌بایست یک عدد باشد',
         )

      onImagesSelected(files)
   }

   return (
      <div className='text-right space-y-4'>
         {imageToUploadMemo?.length ? (
            <div>
               <span className='text-slate-400 yekan'>پیش نمایش تصویر برای آپلود</span>

               {imageToUploadMemo.map((imageData: File) => {
                  return (
                     <Image
                        key={imageData.name}
                        className='object-contain rounded-xl'
                        src={URL.createObjectURL(imageData)}
                        alt={imageData.name}
                        width='250'
                        height='250'
                        quality={100}
                        objectFit='contain'
                        loading='lazy'
                     />
                  )
               })}
            </div>
         ) : (
            ''
         )}

         <div className='space-y-6'>
            {design.front ? (
               <div>
                  <span className='text-slate-400 yekan'>تصویر جلو طرح</span>

                  <div className='relative'>
                     <Link
                        target='_blank'
                        href={`https://tabrizian.storage.iran.liara.space/asadi_designs/designs/${design.front}`}
                     >
                        <div className='flex justify-center mx-auto w-full relative aspect-square'>
                           <Image
                              className='rounded-lg p-1'
                              src={`https://tabrizian.storage.iran.liara.space/asadi_designs/designs/${design.front}`}
                              alt={design._id}
                              layout='fill'
                              sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
                              loading='lazy'
                           />
                        </div>
                     </Link>

                     <ImageDelete design={design._id} image={design.front} />
                  </div>
               </div>
            ) : (
               <div className='flex items-center justify-end space-x-3'>
                  {loading ? (
                     <div className='bg-slate-100 border-2 border-slate-200 rounded-lg p-1.5'>
                        <CircularProgress color='success' size={20} />
                     </div>
                  ) : (
                     <button
                        disabled={loading}
                        onClick={() => onSubmit('front')}
                        className='bg-slate-100 border-2 border-slate-200 rounded-lg p-2'
                     >
                        <svg
                           className='h-5 w-5'
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
                           <path stroke='none' d='M0 0h24v24H0z' />{' '}
                           <path d='M7 18a4.6 4.4 0 0 1 0 -9h0a5 4.5 0 0 1 11 2h1a3.5 3.5 0 0 1 0 7h-1' />{' '}
                           <polyline points='9 15 12 12 15 15' />{' '}
                           <line x1='12' y1='12' x2='12' y2='21' />
                        </svg>
                     </button>
                  )}
                  <div
                     onDrop={dropHandlerDesign}
                     onDragOver={dragOverHandler}
                     className='w-full text-sm bg-slate-100 border-2 border-slate-200 rounded-lg'
                  >
                     <Button component='label' sx={{ width: '100%', padding: '.5rem' }}>
                        <span className='yekan'>انتخاب جلو طرح</span>
                        <input
                           hidden
                           accept='image/*'
                           type='file'
                           name='imageToUpload'
                           onChange={(e) => onImagesSelected(e?.target?.files)}
                           disabled={loading}
                        />
                     </Button>
                  </div>
               </div>
            )}
         </div>

         <div className='space-y-3'>
            {design.back ? (
               <div>
                  <span className='text-slate-400 yekan'>تصویر پشت طرح</span>

                  <div className='relative'>
                     <Link
                        target='_blank'
                        href={`https://tabrizian.storage.iran.liara.space/asadi_designs/designs/${design.back}`}
                     >
                        <div className='flex justify-center mx-auto w-full relative aspect-square'>
                           <Image
                              className='rounded-lg p-1'
                              src={`https://tabrizian.storage.iran.liara.space/asadi_designs/designs/${design.back}`}
                              alt={design._id}
                              layout='fill'
                              sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
                              loading='lazy'
                           />
                        </div>
                     </Link>

                     <ImageDelete design={design._id} image={design.back} />
                  </div>
               </div>
            ) : (
               <div className='flex items-center justify-end space-x-3'>
                  {loading ? (
                     <div className='bg-slate-100 border-2 border-slate-200 rounded-lg p-1.5'>
                        <CircularProgress color='success' size={20} />
                     </div>
                  ) : (
                     <button
                        disabled={loading}
                        onClick={() => onSubmit('back')}
                        className='bg-slate-100 border-2 border-slate-200 rounded-lg p-2'
                     >
                        <svg
                           className='h-5 w-5'
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
                           <path stroke='none' d='M0 0h24v24H0z' />{' '}
                           <path d='M7 18a4.6 4.4 0 0 1 0 -9h0a5 4.5 0 0 1 11 2h1a3.5 3.5 0 0 1 0 7h-1' />{' '}
                           <polyline points='9 15 12 12 15 15' />{' '}
                           <line x1='12' y1='12' x2='12' y2='21' />
                        </svg>
                     </button>
                  )}
                  <div
                     onDrop={dropHandlerDesign}
                     onDragOver={dragOverHandler}
                     className='w-full text-sm bg-slate-100 border-2 border-slate-200 rounded-lg'
                  >
                     <Button component='label' sx={{ width: '100%', padding: '.5rem' }}>
                        <span className='yekan'>انتخاب پشت طرح</span>
                        <input
                           hidden
                           accept='image/*'
                           type='file'
                           name='imageToUpload'
                           onChange={(e) => onImagesSelected(e?.target?.files)}
                           disabled={loading}
                        />
                     </Button>
                  </div>
               </div>
            )}

            <div className=' border border-green-600/50 p-2 mt-2 rounded-lg text-right'>
               <span className='text-xs text-green-600/70 yekan'>
                  تصویر کم حجم تر برابر با <br /> امکان ذخیره سازی تصاویر بیشتر
               </span>
            </div>

            <div className=' border border-green-600/50 p-2 mt-2 rounded-lg text-right'>
               <span className='text-xs text-green-600/70 yekan'>
                  حجم ایده آل تا ۱۵۰ کیلوبایت می‌باشد
               </span>
            </div>

            <div className=' border border-green-600/50 p-2 mt-2 rounded-lg text-right'>
               <span className='text-xs text-green-600/70 yekan'>
                  حجم عکس تاثیر قابل توجهی بر کاربر نمی‌گذارد
               </span>
            </div>
         </div>
      </div>
   )
}

export default ImageInput
