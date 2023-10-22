'use client'

import { useState, useMemo } from 'react'
import NextImage from 'next/image'
import { toast } from 'react-toastify'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

import dynamic from 'next/dynamic'
const CircularProgress = dynamic(() => import('@mui/material/CircularProgress'), { ssr: false })
const Button = dynamic(() => import('@mui/material/Button'), { ssr: false })

import ImageDelete from './imageDelete'
import filesSizeValidation from '@/lib/filesSizeValidation'
import filesTypeValidation from '@/lib/filesTypeValidation'
import imageUploadHandler from '@/lib/imageUploadHandler'
import deleteFromS3Bucket from '@/lib/deleteFromS3Bucket'
import { IDesign } from '@/models/design'

const ImageInput = ({ design }: { design: IDesign }) => {
   const [frontPreview, setFrontPreview] = useState<FileList | null>(null)
   const [backPreview, setBackPreview] = useState<FileList | null>(null)
   const [galleryPreview, setGalleryPreview] = useState<FileList | null>(null)
   const [imageDimention, setImageDimention] = useState([0, 0])
   const [loading, setLoading] = useState(false)

   const frontPrevMemo = useMemo(() => {
      return frontPreview && Object.values(frontPreview)
   }, [frontPreview])

   const backPrevMemo = useMemo(() => {
      return backPreview && Object.values(backPreview)
   }, [backPreview])

   const galleryPrevMemo = useMemo(() => {
      return galleryPreview && Object.values(galleryPreview)
   }, [galleryPreview])

   const router = useRouter()

   const createDbData = async (type: string, imageKey: string, imageName: string) => {
      const payload = {
         type,
         imageKey,
         imageDimention,
         _id: design._id,
      }

      try {
         const res = await fetch('/api/--admin--/design/image/db', {
            method: 'POST',
            body: JSON.stringify(payload),
         })

         if (!res.ok) throw new Error()

         if (type == 'front') setFrontPreview(null)
         else if (type == 'back') setBackPreview(null)
         else if (type == 'gallery') setGalleryPreview(null)

         toast.success(`تصویر ${imageName} با موفقیت آپلود شد.`)

         fetch('/api/--admin--/revalidate?path=/')
         fetch('/api/--admin--/revalidate?path=/search/[query]')

         router.refresh()
      } catch (err) {
         toast.error(`در آپلود تصویر ${imageName} به دیتابیس خطایی رخ داد!`)
         console.error(err)

         await deleteLeftOvers(imageKey)
      }
   }

   const deleteLeftOvers = async (imageKey: string) => {
      try {
         await deleteFromS3Bucket(imageKey, 'designs')
      } catch (err) {
         console.error('deleteLeftOvers', err)
      }
   }

   const onSubmit = async () => {
      if (!frontPrevMemo && !backPrevMemo && !galleryPrevMemo) {
         return toast.warning('هیچ تصویری برای آپلود انتخاب نشده است!')
      }
      if (!design._id) {
         return toast.error('در تعیین طرح خطایی رخ داده است!')
      }

      toast.info('در حال آپلود و ثبت اطلاعات تصویر...')
      setLoading(true)

      try {
         for (const imageData of [
            { design: frontPrevMemo, type: 'front' },
            { design: backPrevMemo, type: 'back' },
            { design: galleryPrevMemo, type: 'gallery' },
         ]) {
            if (!imageData.design) continue

            for (const image of imageData.design) {
               const res = await imageUploadHandler(image, 'designs')

               if (res) await createDbData(imageData.type, res.imageKey, res.imageName)
               else throw new Error('imageUploadHandler')
            }
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

      if (type == 'front') {
         setFrontPreview(files)
         for (const imageFile of filesList) {
            // calculate and set image dimention
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
      } else if (type == 'back') setBackPreview(files)
      else if (type == 'gallery') setGalleryPreview(files)
   }

   const dragOverHandler = (event: React.DragEvent<HTMLDivElement>) => event.preventDefault()

   const dropHandlerDesign = (event: React.DragEvent<HTMLDivElement>, type: string) => {
      event.preventDefault()
      const files = event.dataTransfer.files

      if (!files) return toast.warning('در دریافت فایل ها خطایی رخ داد')
      else if (files.length !== 1 && type !== 'gallery')
         return toast.warning(
            'تعداد تصاویر انتخاب شده بیشتر از یک عدد می‌باشد. تصویر طرح می‌بایست یک عدد باشد',
         )

      onFileSelected(files, type)
   }

   return (
      <div className='text-right space-y-4'>
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

                     <ImageDelete type='front' design={design._id} imageKey={design.frontSrc} />
                  </div>
               </div>
            ) : (
               <>
                  {frontPrevMemo?.length ? (
                     <div>
                        <span className='text-slate-400 yekan'>پیش نمایش تصویر جلو برای آپلود</span>

                        {frontPrevMemo.map((imageData: File) => {
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

                  <div
                     onDrop={(e) => dropHandlerDesign(e, 'front')}
                     onDragOver={dragOverHandler}
                     className='w-full text-sm bg-slate-100 border-2 border-slate-200 rounded-lg'
                  >
                     {/* @ts-ignore */}
                     <Button component='label' sx={{ width: '100%', padding: '.5rem' }}>
                        <span className='yekan text-sm'>انتخاب جلو طرح</span>
                        <input
                           hidden
                           accept='image/*'
                           type='file'
                           name='frontPreview'
                           onChange={(e) => onFileSelected(e?.target?.files, 'front')}
                           disabled={loading}
                        />
                     </Button>
                  </div>
               </>
            )}
         </div>

         <hr />

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

                     <ImageDelete type='back' design={design._id} imageKey={design.backSrc} />
                  </div>
               </div>
            ) : (
               <>
                  {backPrevMemo?.length ? (
                     <div>
                        <span className='text-slate-400 yekan'>پیش نمایش تصویر پشت برای آپلود</span>

                        {backPrevMemo.map((imageData: File) => {
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

                  <div
                     onDrop={(e) => dropHandlerDesign(e, 'back')}
                     onDragOver={dragOverHandler}
                     className='w-full text-sm bg-slate-100 border-2 border-slate-200 rounded-lg'
                  >
                     {/* @ts-ignore */}
                     <Button component='label' sx={{ width: '100%', padding: '.5rem' }}>
                        <span className='yekan text-sm'>انتخاب پشت طرح</span>
                        <input
                           hidden
                           accept='image/*'
                           type='file'
                           name='backPreview'
                           onChange={(e) => onFileSelected(e?.target?.files, 'back')}
                           disabled={loading}
                        />
                     </Button>
                  </div>
               </>
            )}

            <hr />

            <div>
               {design.gallery.length ? (
                  <span className='text-slate-400 yekan'>تصاویر گالری</span>
               ) : (
                  ''
               )}
               {design.gallery.map((image: string, idx: number) => {
                  return (
                     <div key={idx} className='relative'>
                        <Link
                           target='_blank'
                           href={`https://tabrizian.storage.iran.liara.space/asadi_designs/designs/${image}`}
                        >
                           <div className='flex justify-center mx-auto'>
                              <NextImage
                                 className='rounded-lg p-1'
                                 src={`https://tabrizian.storage.iran.liara.space/asadi_designs/designs/${image}`}
                                 alt={design._id}
                                 width={design.width}
                                 height={design.height}
                                 loading='lazy'
                              />
                           </div>
                        </Link>

                        <ImageDelete type='gallery' design={design._id} imageKey={image} />
                     </div>
                  )
               })}
            </div>

            {galleryPrevMemo?.length ? (
               <div>
                  <span className='text-slate-400 yekan'>پیش نمایش تصاویر گالری برای آپلود</span>
                  <div className='space-y-3'>
                     {galleryPrevMemo.map((imageData: File) => {
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
               </div>
            ) : (
               ''
            )}

            <div
               onDrop={(e) => dropHandlerDesign(e, 'gallery')}
               onDragOver={dragOverHandler}
               className='w-full text-sm bg-slate-100 border-2 border-slate-200 rounded-lg'
            >
               {/* @ts-ignore */}
               <Button component='label' sx={{ width: '100%', padding: '.5rem' }}>
                  <span className='yekan text-sm'>انتخاب تصاویر گالری</span>
                  <input
                     hidden
                     accept='image/*'
                     type='file'
                     name='galleryPreview'
                     multiple
                     onChange={(e) => onFileSelected(e?.target?.files, 'gallery')}
                     disabled={loading}
                  />
               </Button>
            </div>

            <hr />

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
