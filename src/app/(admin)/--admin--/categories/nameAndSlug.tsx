'use client'

import { toast } from 'react-toastify'
import { Formik, Form } from 'formik'
import { NameSlugValidation } from '@/formik/schema/validation'

const NameAndSlug = ({
   params,
}: {
   params: { _doc: { _id: string; name: string; slug: string } }
}) => {
   const name = params._doc.name.charAt(0).toUpperCase() + params._doc.name.slice(1)
   const slug = params._doc.slug.charAt(0).toUpperCase() + params._doc.slug.slice(1)

   const handleSubmit = async ({ name }: { name: string }) => {
      toast.info('در حال ثبت تغییرات...')

      const payload = {
         _id: params._doc._id,
         name: name.trim(),
      }

      try {
         const res = await fetch('/api/--admin--/category', {
            method: 'PATCH',
            body: JSON.stringify(payload),
         })

         const resData = await res.json()

         if (!res.ok) throw new Error()
         else if (resData.message == 'notUnique')
            return toast.warning('این دسته بندی از قبل ثبت شده است')
         else if (resData.status == 500) {
            console.error(resData.message)
            return toast.error('خطا در برقراری ارتباط')
         }

         fetch('/api/--admin--/revalidate?path=/')

         return toast.success('نام دسته بندی با موفقیت تغییر یافت')
      } catch (err) {
         toast.error('در تغییر نام دسته بندی خطایی رخ داد')
         return console.error(err)
      }
   }

   return (
      <Formik
         initialValues={{
            name,
            slug,
         }}
         validationSchema={NameSlugValidation}
         onSubmit={handleSubmit}
      >
         {({ values, setFieldValue, isSubmitting, errors, touched, submitForm }) => (
            <Form className='rtl col-span-4 grid w-full grid-cols-4 items-start'>
               <div className='col-span-2'>
                  <div className='ml-2 space-y-1 text-right'>
                     <input
                        disabled={isSubmitting}
                        placeholder='نام'
                        name='name'
                        onChange={(e) => setFieldValue('name', e.target.value)}
                        value={values.name}
                        className='w-full bg-transparent text-sm'
                        type='text'
                        onKeyDown={(e) => {
                           if (e.key == 'Enter') submitForm()
                        }}
                     />
                  </div>

                  {errors.name && touched.name ? (
                     <p className='text-right text-sm text-red-500'>{errors.name}</p>
                  ) : (
                     ''
                  )}
               </div>
               <div className='col-span-2'>
                  <div className='space-y-1 text-right'>
                     <input
                        name='slug'
                        value={slug}
                        className='w-full bg-transparent text-sm'
                        readOnly
                     />
                  </div>
               </div>
            </Form>
         )}
      </Formik>
   )
}

export default NameAndSlug
