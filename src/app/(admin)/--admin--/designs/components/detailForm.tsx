'use client'

import { memo, useMemo } from 'react'
import dynamic from 'next/dynamic'
import { useRouter } from 'next/navigation'

import { Formik, Form } from 'formik'

import { IDesign } from '@/models/design'
import { ICategory } from '@/models/category'

const CircularProgress = dynamic(() => import('@mui/material/CircularProgress'), { ssr: false })

import ImageInput from './imageInput'
import { DesignEditForm } from '@/formik/schema/validation'
import OnSubmittingPreventExit from '@/lib/onSubmittingPreventExit'

import DesignNameInput from './designNameInput'
import ClientInput from './clientInput'
import DesignedAtInput from './designedAtInput'
import DescriptionInput from './descriptionInput'
import PalettesColorInput from './palettesColorInput'
import ActiveInput from './activeInput'
import CategoryInput from './categoryInput'

const DetailForm = memo(
   ({
      addingNewDesign,
      design,
      categories,
   }: {
      addingNewDesign: boolean
      design: IDesign
      categories: ICategory[]
   }) => {
      const router = useRouter()

      const designMemo = useMemo(() => design, [design])

      const handleSubmit = async (values: {
         name: string
         category: object
         active: boolean
         client: string
         description: string
         designedAt: string
         colorPalettes: string
      }) => {
         const toast = await import('react-toastify').then((mod) => mod.toast)

         try {
            toast.info('در حال ثبت اطلاعات طرح...')

            const payload = {
               _id: addingNewDesign ? null : designMemo._id,
               ...values,
            }

            const res = await fetch('/api/--admin--/design', {
               method: addingNewDesign ? 'POST' : 'PATCH',
               body: JSON.stringify(payload),
            })

            const resData = await res.json()

            if (!res.ok) throw new Error()
            else if (resData.status == 500) {
               console.error(resData.message)
               return toast.error('خطا در برقراری ارتباط')
            }

            toast.success('اطلاعات طرح با موفقیت ثبت گردید.')

            fetch('/api/--admin--/revalidate?path=/')
            fetch('/api/--admin--/revalidate?path=/search/[query]')

            if (addingNewDesign) {
               const hyphen = await import('@/lib/hyphen').then(mod => mod.default)
               router.push(`/--admin--/designs/${hyphen(values.name)}`)
            }
         } catch (err) {
            toast.error('خطا در برقراری ارتباط. لطفا مجدد تلاش کنید.')
            return console.error(err)
         }
      }

      const handleDeleteDesign = async () => {
         const toast = await import('react-toastify').then((mod) => mod.toast)

         try {
            if (designMemo.frontSrc || designMemo.backSrc) {
               return toast.warning('برای حذف طرح ابتدا می‌بایست تصاویر مربوطه حذف گردد')
            }

            toast.info('در حال حذف طرح...')

            const payload = {
               _id: designMemo._id,
            }

            const res = await fetch('/api/--admin--/design', {
               method: 'DELETE',
               body: JSON.stringify(payload),
            })

            const resData = await res.json()

            if (!res.ok) throw new Error()
            else if (resData.status == 500) {
               console.error(resData.message)
               return toast.error('خطا در برقراری ارتباط')
            }

            toast.success('طرح با موفقیت حذف گردید.')

            fetch('/api/--admin--/revalidate?path=/')
            fetch('/api/--admin--/revalidate?path=/search/[query]')

            router.push('/--admin--/designs')
         } catch (err) {
            toast.error('خطا در برقراری ارتباط. لطفا مجدد تلاش کنید.')
            return console.error(err)
         }
      }

      return (
         <Formik
            initialValues={{
               name: addingNewDesign ? '' : designMemo.name,
               // @ts-ignore
               category: addingNewDesign ? categories[0] : designMemo.category[0],
               active: addingNewDesign ? true : designMemo.active,
               client: addingNewDesign ? '' : designMemo.client,
               description: addingNewDesign ? '' : designMemo.description,
               designedAt: addingNewDesign ? '' : designMemo.designedAt,
               colorPalettes: addingNewDesign ? '' : designMemo.colorPalettes,
            }}
            validationSchema={DesignEditForm}
            onSubmit={handleSubmit}
         >
            {({ values, setFieldValue, isSubmitting, errors, touched }) => (
               <Form className='mt-6 grid grid-cols-3 gap-5 '>
                  <div className='col-span-1'>
                     {addingNewDesign ? (
                        ''
                     ) : (
                        <ImageInput
                           design={{
                              _id: designMemo._id,
                              gallery: designMemo.gallery,
                              frontSrc: designMemo.frontSrc,
                              backSrc: designMemo.backSrc,
                              width: designMemo.width,
                              height: designMemo.height,
                           }}
                        />
                     )}
                  </div>
                  <div className='col-span-2 space-y-5'>
                     <CategoryInput
                        categories={categories}
                        value={values.category}
                        setFieldValue={setFieldValue}
                     />

                     <hr />

                     <DesignNameInput
                        value={values.name}
                        setFieldValue={setFieldValue}
                        error={errors.name}
                        touch={touched.name}
                     />

                     <ClientInput
                        value={values.client}
                        setFieldValue={setFieldValue}
                        error={errors.client}
                        touch={touched.client}
                     />

                     <DesignedAtInput
                        value={values.designedAt}
                        setFieldValue={setFieldValue}
                        error={errors.designedAt}
                        touch={touched.designedAt}
                     />

                     <hr />

                     <DescriptionInput
                        value={values.description}
                        setFieldValue={setFieldValue}
                        error={errors.description}
                        touch={touched.description}
                     />

                     <hr />

                     <PalettesColorInput
                        value={values.colorPalettes}
                        setFieldValue={setFieldValue}
                        error={errors.colorPalettes}
                        touch={touched.colorPalettes}
                     />

                     <hr />

                     <ActiveInput value={values.active} setFieldValue={setFieldValue} />

                     <button
                        type='submit'
                        disabled={isSubmitting}
                        className='w-full rounded-lg border-2 border-green-600 hover:shadow-md hover:shadow-green-600/40'
                     >
                        {isSubmitting ? <CircularProgress color='success' size={25} /> : 'ذخیره'}
                     </button>

                     {addingNewDesign ? (
                        ''
                     ) : (
                        <button
                           type='button'
                           disabled={isSubmitting}
                           onClick={handleDeleteDesign}
                           className='w-full rounded-lg border-2 border-rose-300 hover:shadow-md hover:shadow-rose-300/40'
                        >
                           {isSubmitting ? <CircularProgress color='error' size={25} /> : 'حذف'}
                        </button>
                     )}
                  </div>
                  <OnSubmittingPreventExit isSubmitting={isSubmitting} />
               </Form>
            )}
         </Formik>
      )
   },
)

DetailForm.displayName = 'DetailForm'

export default DetailForm
