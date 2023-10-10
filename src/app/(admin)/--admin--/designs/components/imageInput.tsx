'use client'

import { useState, useMemo } from 'react'
import NextImage from 'next/image'
import { toast } from 'react-toastify'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

import Button from '@mui/material/Button'
import CircularProgress from '@mui/material/CircularProgress'

import ImageDelete from './imageDelete'
import filesSizeValidation from '@/lib/filesSizeValidation'
import filesTypeValidation from '@/lib/filesTypeValidation'
import imageUploadHandler from '@/lib/imageUploadHandler'
import deleteFromS3Bucket from '@/lib/deleteFromS3Bucket'
import { IDesign } from '@/models/design'

const ImageInput = ({ design }: { design: IDesign }) => {
   const [frontDesignPreview, setFrontDesignPreview] = useState<FileList | null>(null)
   const [backDesignPreview, setBackDesignPreview] = useState<FileList | null>(null)
   const [imageDimention, setImageDimention] = useState([0, 0])
   const [loading, setLoading] = useState(false)

   const frontDesignMemo = useMemo(() => {
      return frontDesignPreview && Object.values(frontDesignPreview)
   }, [frontDesignPreview])

   const backDesignMemo = useMemo(() => {
      return backDesignPreview && Object.values(backDesignPreview)
   }, [backDesignPreview])

   const router = useRouter()

   const createDbData = async (type: string, key: string, imageName: string) => {
      const payload = {
         type,
         key,
         imageDimention,
         _id: design._id,
      }

      try {
         const res = await fetch('/api/--admin--/design/image/db', {
            method: 'POST',
            body: JSON.stringify(payload),
         })

         if (!res.ok) throw new Error()

         if (type == 'front') setFrontDesignPreview(null)
         else if (type == 'back') setBackDesignPreview(null)

         toast.success(`تصویر ${imageName} با موفقیت آپلود شد.`)
         router.refresh()
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

   const onSubmit = async () => {
      if (!frontDesignMemo && !backDesignMemo) {
         return toast.warning('هیچ تصویری برای آپلود انتخاب نشده است!')
      }
      if (!design._id) {
         return toast.error('در تعیین طرح خطایی رخ داده است!')
      }

      toast.info('در حال آپلود و ثبت اطلاعات تصویر...')
      setLoading(true)

      try {
         for (const imageData of [
            { design: frontDesignMemo, type: 'front' },
            { design: backDesignMemo, type: 'back' },
         ]) {
            if (!imageData.design) continue

            const res = await imageUploadHandler(imageData.design[0], 'designs')

            if (res) await createDbData(imageData.type, res.key, res.imageName)
            else throw new Error()
         }
         return
      } catch (error) {
         return
      } finally {
         setLoading(false)
      }
   }

   const onFileSelected = (files: FileList | null, type: string) => {
      if (!files) return

      const filesList: File[] = Object.values(files)

      const typeCheckRes = filesTypeValidation(filesList)
      if (!typeCheckRes) return

      const sizeCheckRes = filesSizeValidation(filesList)
      if (!sizeCheckRes) return

      for (const imageFile of filesList) {
         const reader = new FileReader()

         reader.onload = (e) => {
            const img = new Image()
            // @ts-ignore
            img.src = e.target.result as string

            img.onload = () => {
               if (type == 'front') setImageDimention([img.width, img.height])
            }
         }

         reader.readAsDataURL(imageFile)
      }

      if (type == 'front') setFrontDesignPreview(files)
      else if (type == 'back') setBackDesignPreview(files)
   }

   const dragOverHandler = (event: React.DragEvent<HTMLDivElement>) => event.preventDefault()

   const dropHandlerDesign = (event: React.DragEvent<HTMLDivElement>, type: string) => {
      event.preventDefault()
      const files = event.dataTransfer.files

      if (!files) return toast.warning('در دریافت فایل ها خطایی رخ داد')
      else if (files.length !== 1)
         return toast.warning(
            'تعداد تصاویر انتخاب شده بیشتر از یک عدد می‌باشد. تصویر طرح می‌بایست یک عدد باشد',
         )

      onFileSelected(files, type)
   }

   return (
      <div className='text-right space-y-4'>
         {frontDesignMemo?.length ? (
            <div>
               <span className='text-slate-400 yekan'>پیش نمایش تصویر جلو برای آپلود</span>

               {frontDesignMemo.map((imageData: File) => {
                  return (
                     <NextImage
                        key={imageData.name}
                        className='object-contain rounded-xl'
                        src={URL.createObjectURL(imageData)}
                        alt={imageData.name}
                        width='250'
                        height='250'
                        quality={100}
                        loading='lazy'
                     />
                  )
               })}
            </div>
         ) : (
            ''
         )}

         {backDesignMemo?.length ? (
            <div>
               <span className='text-slate-400 yekan'>پیش نمایش تصویر پشت برای آپلود</span>

               {backDesignMemo.map((imageData: File) => {
                  return (
                     <NextImage
                        key={imageData.name}
                        className='object-contain rounded-xl'
                        src={URL.createObjectURL(imageData)}
                        alt={imageData.name}
                        width='250'
                        height='250'
                        quality={100}
                        loading='lazy'
                     />
                  )
               })}
            </div>
         ) : (
            ''
         )}

         <div className='space-y-6'>
            {design.frontSrc ? (
               <div>
                  <span className='text-slate-400 yekan'>تصویر جلو طرح</span>

                  <div className='relative'>
                     <Link
                        target='_blank'
                        href={`https://tabrizian.storage.iran.liara.space/asadi_designs/designs/${design.frontSrc}`}
                     >
                        <div className='flex justify-center mx-auto'>
                           <NextImage
                              className='rounded-lg p-1'
                              src={`https://tabrizian.storage.iran.liara.space/asadi_designs/designs/${design.frontSrc}`}
                              alt={design._id}
                              width={design.width}
                              height={design.height}
                              loading='lazy'
                           />
                        </div>
                     </Link>

                     <ImageDelete type='front' design={design._id} image={design.frontSrc} />
                  </div>
               </div>
            ) : (
               <div
                  onDrop={(e) => dropHandlerDesign(e, 'front')}
                  onDragOver={dragOverHandler}
                  className='w-full text-sm bg-slate-100 border-2 border-slate-200 rounded-lg'
               >
                  <Button component='label' sx={{ width: '100%', padding: '.5rem' }}>
                     <span className='yekan text-sm'>انتخاب جلو طرح</span>
                     <input
                        hidden
                        accept='image/*'
                        type='file'
                        name='frontDesignPreview'
                        onChange={(e) => onFileSelected(e?.target?.files, 'front')}
                        disabled={loading}
                     />
                  </Button>
               </div>
            )}
         </div>

         <div className='space-y-3'>
            {design.backSrc ? (
               <div>
                  <span className='text-slate-400 yekan'>تصویر پشت طرح</span>

                  <div className='relative'>
                     <Link
                        target='_blank'
                        href={`https://tabrizian.storage.iran.liara.space/asadi_designs/designs/${design.backSrc}`}
                     >
                        <div className='flex justify-center mx-auto'>
                           <NextImage
                              className='rounded-lg p-1'
                              src={`https://tabrizian.storage.iran.liara.space/asadi_designs/designs/${design.backSrc}`}
                              alt={design._id}
                              width={design.width}
                              height={design.height}
                              loading='lazy'
                           />
                        </div>
                     </Link>

                     <ImageDelete type='back' design={design._id} image={design.backSrc} />
                  </div>
               </div>
            ) : (
               <div
                  onDrop={(e) => dropHandlerDesign(e, 'back')}
                  onDragOver={dragOverHandler}
                  className='w-full text-sm bg-slate-100 border-2 border-slate-200 rounded-lg'
               >
                  <Button component='label' sx={{ width: '100%', padding: '.5rem' }}>
                     <span className='yekan text-sm'>انتخاب پشت طرح</span>
                     <input
                        hidden
                        accept='image/*'
                        type='file'
                        name='backDesignPreview'
                        onChange={(e) => onFileSelected(e?.target?.files, 'back')}
                        disabled={loading}
                     />
                  </Button>
               </div>
            )}

            <div className='flex justify-center items-center bg-slate-100 border-2 border-slate-200 rounded-lg'>
               {loading ? (
                  <div className='p-1.5'>
                     <CircularProgress color='success' size={20} />
                  </div>
               ) : (
                  <button
                     className='flex gap-5'
                     disabled={loading}
                     onClick={() => onSubmit()}
                     type='button'
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
                     <span className='yekan text-sm'>آپلود تصاویر</span>
                  </button>
               )}
            </div>

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
