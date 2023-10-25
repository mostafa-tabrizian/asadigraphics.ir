'use client'

import dynamic from 'next/dynamic'
import NextImage from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { memo, useMemo, useState } from 'react'

import FrontImageInput from './frontImageInput'
import GalleryInput from './galleryInput'

const CircularProgress = dynamic(() => import('@mui/material/CircularProgress'), { ssr: false })
const Button = dynamic(() => import('@mui/material/Button'), { ssr: false })
const ImageDelete = dynamic(() => import('./imageDelete'), { ssr: false })

const ImageInput = memo(
   ({
      design,
   }: {
      design: {
         _id: string
         gallery: string[]
         frontSrc: string
         backSrc: string
         width: number
         height: number
      }
   }) => {
      const [frontPreview, setFrontPreview] = useState<FileList | null>(null)
      const [backPreview, setBackPreview] = useState<FileList | null>(null)
      const [galleryPreview, setGalleryPreview] = useState<FileList | null>(null)
      const [frontImageDimention, setFrontImageDimention] = useState([0, 0])
      const [backImageDimention, setBackImageDimention] = useState([0, 0])
      const [loading, setLoading] = useState(false)

      const designMemo = useMemo(() => design, [design])

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
            imageDimention: type == 'front' ? frontImageDimention : backImageDimention,
            _id: designMemo._id,
         }

         try {
            const res = await fetch('/api/--admin--/design/image/db', {
               method: 'POST',
               body: JSON.stringify(payload),
            })

            if (!res.ok) throw new Error()

            const resData = await res.json()
            if (resData.message) throw new Error(resData.message)

            return res
         } catch (err) {
            const toast = await import('react-toastify').then((mod) => mod.toast)

            if (String(err).includes('please upload front design first')) {
               toast.warning('ابتدا تصویر جلو طرح را آپلود کنید')
               console.warn(err)
            } else if (String(err).includes('dimention not equal to front design')) {
               toast.warning('ابعاد تصویر جلو طرح و پشت طرح یکسان نمی‌باشد')
               console.warn(err)
            } else {
               toast.error(`در آپلود تصویر ${imageName} به دیتابیس خطایی رخ داد!`)
               console.error(err)
            }
            return false
         }
      }

      const successUpload = async (type: string, name: string) => {
         if (type == 'front') setFrontPreview(null)
         else if (type == 'back') setBackPreview(null)
         else if (type == 'gallery') setGalleryPreview(null)

         fetch('/api/--admin--/revalidate?path=/')
         fetch('/api/--admin--/revalidate?path=/search/[query]')

         const toast = await import('react-toastify').then((mod) => mod.toast)
         toast.success(`تصویر ${name} با موفقیت آپلود شد.`)

         router.refresh()
      }

      const onSubmit = async () => {
         const toast = await import('react-toastify').then((mod) => mod.toast)

         if (!frontPrevMemo && !backPrevMemo && !galleryPrevMemo) {
            return toast.warning('هیچ تصویری برای آپلود انتخاب نشده است!')
         }
         if (!designMemo._id) {
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
                  // first
                  const imageName = image.name.replace(' ', '-')

                  // presign
                  const createS3Presign = await import('@/lib/createS3Presign').then(
                     (mod) => mod.default,
                  )
                  const s3SignedUrl = await createS3Presign(imageName, 'designs')
                  if (!s3SignedUrl) return

                  // middle
                  const { imageKey, uploadUrl } = await s3SignedUrl.json()

                  // db
                  const createDataResult = await createDbData(imageData.type, imageKey, imageName)
                  if (!createDataResult) return

                  // put
                  const putInS3Bucket = await import('@/lib/PutInS3Bucket').then(
                     (mod) => mod.default,
                  )
                  const fileUploadResult = await putInS3Bucket(uploadUrl, image)

                  if (!fileUploadResult) {
                     const uploadErrorDeleteData = await import('./uploadErrorDeleteData').then(
                        (mod) => mod.default,
                     )
                     return await uploadErrorDeleteData(imageData.type, imageKey, designMemo._id)
                  }

                  successUpload(imageData.type, image.name)
               }
            }
         } catch (err) {
            toast.error(
               'در آپلود تصویر خطایی رخ داد. (اگر از VPN استفاده می‌کنید لطفا ابتدا آن را خاموش کنید)',
            )
            console.error(err)
         } finally {
            setLoading(false)
         }
      }

      const dimentionCalculate = (file: File, type: string) => {
         const reader = new FileReader()

         reader.onload = (e) => {
            const img = new Image()
            // @ts-ignore
            img.src = e.target.result as string

            img.onload = () => {
               const dimention = [img.width, img.height]
               if (type == 'front') setFrontImageDimention(dimention)
               else if (type == 'back') setBackImageDimention(dimention)
            }
         }

         reader.readAsDataURL(file)
      }

      const onFileSelected = async (files: FileList | null, type: string) => {
         if (!files) return

         const filesList: File[] = Object.values(files)

         const filesTypeValidation = await import('@/lib/filesTypeValidation').then(
            (mod) => mod.default,
         )
         const typeCheckRes = filesTypeValidation(filesList)
         if (!typeCheckRes) return

         const filesSizeValidation = await import('@/lib/filesSizeValidation').then(
            (mod) => mod.default,
         )
         const sizeCheckRes = filesSizeValidation(filesList)
         if (!sizeCheckRes) return

         dimentionCalculate(filesList[0], type)

         if (type == 'front') {
            setFrontPreview(files)
         } else if (type == 'back') {
            setBackPreview(files)
         } else if (type == 'gallery') setGalleryPreview(files)
      }

      const dragOverHandler = (event: React.DragEvent<HTMLDivElement>) => event.preventDefault()

      const dropHandlerDesign = async (event: React.DragEvent<HTMLDivElement>, type: string) => {
         event.preventDefault()
         const files = event.dataTransfer.files
         const toast = await import('react-toastify').then((mod) => mod.toast)

         if (!files) return toast.warning('در دریافت فایل ها خطایی رخ داد')
         else if (files.length !== 1 && type !== 'gallery') {
            return toast.warning(
               'تعداد تصاویر انتخاب شده بیشتر از یک عدد می‌باشد. تصویر طرح می‌بایست یک عدد باشد',
            )
         }

         onFileSelected(files, type)
      }

      return (
         <div className='space-y-4 text-right'>
            <FrontImageInput
               design={{
                  frontSrc: designMemo.frontSrc,
                  _id: designMemo._id,
                  width: designMemo.width,
                  height: designMemo.height,
               }}
               frontPrevMemo={frontPrevMemo}
               dragOverHandler={dragOverHandler}
               dropHandlerDesign={dropHandlerDesign}
               onFileSelected={onFileSelected}
               loading={loading}
            />

            <hr />

            <div className='space-y-3'>
               {designMemo.backSrc ? (
                  <div>
                     <span className='yekan text-slate-400'>تصویر پشت طرح</span>

                     <div className='relative'>
                        <Link
                           target='_blank'
                           href={`https://tabrizian.storage.iran.liara.space/asadi_designs/designs/${designMemo.backSrc}`}
                        >
                           <div className='mx-auto flex justify-center'>
                              <NextImage
                                 className='rounded-lg p-1'
                                 src={`https://tabrizian.storage.iran.liara.space/asadi_designs/designs/${designMemo.backSrc}`}
                                 alt={designMemo._id}
                                 width={designMemo.width}
                                 height={designMemo.height}
                                 loading='lazy'
                              />
                           </div>
                        </Link>

                        <ImageDelete
                           type='back'
                           design={designMemo._id}
                           imageKey={designMemo.backSrc}
                        />
                     </div>
                  </div>
               ) : (
                  <>
                     {backPrevMemo?.length ? (
                        <div>
                           <span className='yekan text-slate-400'>
                              پیش نمایش تصویر پشت برای آپلود
                           </span>

                           {backPrevMemo.map((imageData: File) => {
                              return (
                                 <NextImage
                                    key={imageData.name}
                                    className='rounded-xl object-contain'
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
                        className='w-full rounded-lg border-2 border-slate-200 bg-slate-100 text-sm'
                     >
                        <Button
                           type='button'
                           // @ts-ignore
                           component='label'
                           sx={{ width: '100%', padding: '.5rem' }}
                        >
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

               <GalleryInput
                  design={{
                     gallery: designMemo.gallery,
                     _id: designMemo._id,
                     width: designMemo.width,
                     height: designMemo.height,
                  }}
                  galleryPrevMemo={galleryPrevMemo}
                  dragOverHandler={dragOverHandler}
                  dropHandlerDesign={dropHandlerDesign}
                  onFileSelected={onFileSelected}
                  loading={loading}
               />

               <hr />

               <div className='flex items-center justify-center rounded-lg border-2 border-slate-200 bg-slate-100'>
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

               <div className=' mt-2 rounded-lg border border-green-600/50 p-2 text-right'>
                  <span className='yekan text-xs text-green-600/70'>
                     تصویر کم حجم تر برابر با <br /> امکان ذخیره سازی تصاویر بیشتر
                  </span>
               </div>

               <div className=' mt-2 rounded-lg border border-green-600/50 p-2 text-right'>
                  <span className='yekan text-xs text-green-600/70'>
                     حجم ایده آل تا ۱۵۰ کیلوبایت می‌باشد
                  </span>
               </div>

               <div className=' mt-2 rounded-lg border border-green-600/50 p-2 text-right'>
                  <span className='yekan text-xs text-green-600/70'>
                     حجم عکس تاثیر قابل توجهی بر کاربر نمی‌گذارد
                  </span>
               </div>
            </div>
         </div>
      )
   },
)

ImageInput.displayName = 'ImageInput'

export default ImageInput
