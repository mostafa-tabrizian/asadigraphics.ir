'use client'

import { useState, useMemo } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { Formik, Form } from 'formik'
import { toast } from 'react-toastify'

import { SlideValidation } from '@/formik/schema/validation'

import dynamic from 'next/dynamic'
const CircularProgress = dynamic(() => import('@mui/material/CircularProgress'), { ssr: false })
const Button = dynamic(() => import('@mui/material/Button'), { ssr: false })
const Switch = dynamic(() => import('@mui/material/Switch'), { ssr: false })
import filesSizeValidation from '@/lib/filesSizeValidation'
import filesTypeValidation from '@/lib/filesTypeValidation'
import imageUploadHandler from '@/lib/imageUploadHandler'
import deleteFromS3Bucket from '@/lib/deleteFromS3Bucket'

const NewSlide = () => {
   const router = useRouter()

   const [slideImageToUpload, setSlideImageToUpload] = useState<FileList | null>(null)

   const slideImageToUploadMemo = useMemo(() => {
      return slideImageToUpload && Object.values(slideImageToUpload)
   }, [slideImageToUpload])

   const deleteLeftOvers = async (imageKey: string) => {
      try {
         await deleteFromS3Bucket(imageKey, 'slides')
      } catch (err) {
         console.error('deleteLeftOvers', err)
      }
   }

   const createDbData = async (
      values: { alt: string; link: string; active: boolean },
      imageKey: string,
      imageName: string,
   ) => {
      const payload = {
         values,
         imageKey,
      }

      try {
         const res = await fetch('/api/--admin--/slide', {
            method: 'POST',
            body: JSON.stringify(payload),
         })

         if (!res.ok) throw new Error()

         setSlideImageToUpload(null)
         toast.success(`تصویر ${imageName} با موفقیت آپلود شد.`)
      } catch (err) {
         toast.error(`در آپلود تصویر ${imageName} خطایی رخ داد!`)
         console.error(err)

         await deleteLeftOvers(imageKey)
      }
   }

   const handleSubmit = async (
      values: {
         alt: string
         link: string
         active: boolean
      },
      { resetForm }: { resetForm: () => void },
   ) => {
      if (!slideImageToUpload || !slideImageToUploadMemo) {
         return toast.warning('هیچ تصویری برای آپلود انتخاب نشده است!')
      }

      toast.info('در حال آپلود و ثبت اطلاعات تصویر...')

      try {
         if (!slideImageToUploadMemo[0]) return

         const image = slideImageToUploadMemo[0]

         const res = await imageUploadHandler(image, 'slides')

         if (res) {
            await createDbData(values, res.imageKey, res.imageName)

            resetForm()

            router.refresh()

            return fetch('/api/--admin--/revalidate?path=/')
         } else throw new Error('imageUploadHandler')
      } catch (error) {
         toast.error(
            'در آپلود تصویر خطایی رخ داد. (اگر از VPN استفاده می‌کنید لطفا ابتدا آن را خاموش کنید)',
         )
         return console.error(error)
      }
   }

   const handleSlideImageSelect = (files: FileList | null) => {
      if (!files) return

      const filesList: File[] = Object.values(files)

      const typeCheckRes = filesTypeValidation(filesList)
      if (!typeCheckRes) return

      const sizeCheckRes = filesSizeValidation(filesList)
      if (!sizeCheckRes) return

      setSlideImageToUpload(files)
   }

   const dragOverHandler = (event: React.DragEvent<HTMLDivElement>) => event.preventDefault()

   return (
      <div>
         <Formik
            initialValues={{
               alt: '',
               link: '#',
               active: false,
            }}
            validationSchema={SlideValidation}
            onSubmit={handleSubmit}
         >
            {({ values, setFieldValue, isSubmitting, errors, touched }) => (
               <Form className='rtl mt-6 '>
                  <div className='text-sm flex w-fit mx-auto bg-orange-100 border-2 border-slate-200 rounded-xl'>
                     {slideImageToUploadMemo?.length ? (
                        <Image
                           className='rounded-xl aspect-video object-contain'
                           src={URL.createObjectURL(slideImageToUploadMemo[0])}
                           alt={slideImageToUploadMemo[0].name}
                           width={690}
                           height={388.125}
                        />
                     ) : (
                        <div
                           onDrop={(e) => {
                              e.preventDefault()
                              handleSlideImageSelect(e.dataTransfer.files)
                           }}
                           onDragOver={dragOverHandler}
                        >
                           {/* @ts-ignore */}
                           <Button component='label' sx={{ width: '100%', padding: '.5rem' }}>
                              <span>انتخاب تصویر اسلاید</span>
                              <input
                                 hidden
                                 accept='image/*'
                                 type='file'
                                 name='slideImages'
                                 onChange={(e) => handleSlideImageSelect(e.target.files)}
                                 disabled={isSubmitting}
                              />
                           </Button>
                        </div>
                     )}
                  </div>

                  <div className='flex items-end rtl gap-5 mt-6 '>
                     <div className='text-right space-y-1'>
                        <label htmlFor='alt'>
                           <span className='text-slate-400'>عنوان جایگزین</span>
                        </label>
                        {errors.alt && touched.alt ? (
                           <p className='text-sm text-red-500'>{errors.alt}</p>
                        ) : (
                           ''
                        )}
                        <input
                           name='alt'
                           onChange={(e) => setFieldValue('alt', e.target.value)}
                           value={values.alt}
                           className='mr-3 rtl w-full text-sm bg-slate-100 border-2 border-slate-200 rounded-lg p-2'
                           type='text'
                        />
                     </div>

                     <div className='text-right space-y-1'>
                        <label htmlFor='link'>
                           <span className='text-slate-400'>لینک صفحه</span>
                        </label>
                        {errors.link && touched.link ? (
                           <p className='text-sm text-red-500'>{errors.link}</p>
                        ) : (
                           ''
                        )}
                        <input
                           name='link'
                           onChange={(e) => setFieldValue('link', e.target.value)}
                           value={values.link}
                           className='mr-3 ltr w-full text-sm bg-slate-100 border-2 border-slate-200 rounded-lg p-2'
                           type='text'
                        />
                     </div>

                     <div>
                        <span className='text-slate-400 block text-center'>فعال</span>
                        <Switch
                           checked={values.active}
                           name='active'
                           color='success'
                           onChange={() => setFieldValue('active', !values.active)}
                        />
                     </div>

                     {isSubmitting ? (
                        <div className='bg-slate-100 border-2 border-slate-200 rounded-lg py-1 px-10'>
                           <CircularProgress color='success' size={20} />
                        </div>
                     ) : (
                        <button
                           disabled={isSubmitting}
                           className='bg-slate-100 border-2 border-slate-200 rounded-lg py-2 px-10'
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
                  </div>
               </Form>
            )}
         </Formik>
      </div>
   )
}

export default NewSlide
