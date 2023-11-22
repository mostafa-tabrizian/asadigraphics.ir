'use client'

import { SlideValidation } from '@/formik/schema/validation'
import OnSubmittingPreventExit from '@/lib/onSubmittingPreventExit'

import { Form, Formik } from 'formik'
import dynamic from 'next/dynamic'
import { useRouter } from 'next/navigation'
import { memo, useMemo, useState } from 'react'

import ActiveInput from './activeInput'
import ImageInput from './imageInput'
import NameInput from './nameInput'

const CircularProgress = dynamic(() => import('@mui/material/CircularProgress'), { ssr: false })

const NewSlide = memo(() => {
   const router = useRouter()

   const [slideImageToUpload, setSlideImageToUpload] = useState<FileList | null>(null)

   const slideImageToUploadMemo = useMemo(() => {
      return slideImageToUpload && Object.values(slideImageToUpload)
   }, [slideImageToUpload])

   const successUpload = async (imageName: string) => {
      setSlideImageToUpload(null)
      const toast = await import('react-toastify').then((mod) => mod.toast)
      toast.success(`تصویر ${imageName} با موفقیت آپلود شد.`)
      router.refresh()
      return fetch('/api/--admin--/revalidate?path=/')
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

         return res
      } catch (err) {
         const toast = await import('react-toastify').then((mod) => mod.toast)
         toast.error(`در آپلود تصویر ${imageName} خطایی رخ داد!`)
         console.error(err)

         return false
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
      const toast = await import('react-toastify').then((mod) => mod.toast)

      if (!slideImageToUpload || !slideImageToUploadMemo) {
         return toast.warning('هیچ تصویری برای آپلود انتخاب نشده است!')
      }

      toast.info('در حال آپلود و ثبت اطلاعات تصویر...')

      try {
         if (!slideImageToUploadMemo[0]) return

         const image = slideImageToUploadMemo[0]

         // first
         const imageName = image.name.replace(' ', '-')

         // presign
         const createS3Presign = await import('@/lib/createS3Presign').then((mod) => mod.default)
         const s3SignedUrl = await createS3Presign(imageName, 'slides')
         if (!s3SignedUrl) return

         // middle
         const { imageKey, uploadUrl } = await s3SignedUrl.json()

         // db
         const createDataResult = await createDbData(values, imageKey, imageName)
         if (!createDataResult) return

         // put
         const putInS3Bucket = await import('@/lib/PutInS3Bucket').then((mod) => mod.default)
         const fileUploadResult = await putInS3Bucket(uploadUrl, image)

         if (!fileUploadResult) {
            const dbData = await createDataResult.json()
            const uploadErrorDeleteData = await import('./uploadErrorDeleteData').then(
               (mod) => mod.default,
            )
            return await uploadErrorDeleteData(dbData.newSlide._id)
         }

         resetForm()
         successUpload(imageName)
      } catch (error) {
         toast.error(
            'در آپلود تصویر خطایی رخ داد. (اگر از VPN استفاده می‌کنید لطفا ابتدا آن را خاموش کنید)',
         )
         return console.error(error)
      }
   }

   return (
      <div>
         <Formik
            initialValues={{
               alt: '',
               link: '',
               active: false,
            }}
            validationSchema={SlideValidation}
            onSubmit={handleSubmit}
         >
            {({ values, setFieldValue, isSubmitting, errors, touched }) => (
               <Form className='rtl mt-6 '>
                  <ImageInput
                     setSlideImageToUpload={setSlideImageToUpload}
                     slideImageToUploadMemo={slideImageToUploadMemo}
                     isSubmitting={isSubmitting}
                  />

                  <div className='rtl mt-6 flex items-end gap-5 '>
                     <NameInput
                        params={{
                           error: errors.alt,
                           touch: touched.alt,
                           value: values.alt,
                           setFieldValue,
                        }}
                     />

                     <div className='space-y-1 text-right'>
                        <label htmlFor='link'>
                           <span className='text-slate-400'>
                              {' '}
                              لینک صفحه{' '}
                              <span className='text-yellow-500'>
                                 برای داخل سایت بدون دامنه: (design/X/) اما برای خارج از وب سایت
                                 لینک کامل: (eitaa.com/X)
                              </span>
                           </span>
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
                           className='ltr mr-3 w-full rounded-lg border-2 border-slate-200 bg-slate-100 p-2 text-sm placeholder:text-slate-400'
                           type='text'
                        />
                     </div>

                     <ActiveInput value={values.active} setFieldValue={setFieldValue} />

                     {isSubmitting ? (
                        <div className='rounded-lg border-2 border-slate-200 bg-slate-100 px-10 py-1'>
                           <CircularProgress color='success' size={20} />
                        </div>
                     ) : (
                        <button
                           type='submit'
                           disabled={isSubmitting}
                           className='rounded-lg border-2 border-slate-200 bg-slate-100 px-10 py-2'
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
                  <OnSubmittingPreventExit isSubmitting={isSubmitting} />
               </Form>
            )}
         </Formik>
      </div>
   )
})

NewSlide.displayName = 'NewSlide'

export default NewSlide
