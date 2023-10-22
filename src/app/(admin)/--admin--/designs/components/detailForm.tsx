'use client'

import { memo } from 'react'
import dynamic from 'next/dynamic'
import { useRouter } from 'next/navigation'

import { Formik, Form } from 'formik'
import { toast } from 'react-toastify'

import { IDesign } from '@/models/design'
import { ICategory } from '@/models/category'

const CircularProgress = dynamic(() => import('@mui/material/CircularProgress'), { ssr: false })
const Switch = dynamic(() => import('@mui/material/Switch'), { ssr: false })
const Autocomplete = dynamic(() => import('@mui/material/Autocomplete'), { ssr: false })

import ImageInput from './imageInput'
import { DesignEditForm } from '@/formik/schema/validation'
import hyphen from '@/lib/hyphen'

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

      const handleSubmit = async (values: { name: string; category: object; active: boolean }) => {
         try {
            toast.info('در حال ثبت اطلاعات طرح...')

            const payload = {
               _id: addingNewDesign ? null : design._id,
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
               router.push(`/--admin--/designs/${hyphen(values.name)}`)
            }
         } catch (err) {
            toast.error('خطا در برقراری ارتباط. لطفا مجدد تلاش کنید.')
            return console.error(err)
         }
      }

      const handleDeleteDesign = async () => {
         try {
            if (design.frontSrc || design.backSrc) {
               return toast.warning('برای حذف طرح ابتدا می‌بایست تصاویر مربوطه حذف گردد')
            }

            toast.info('در حال حذف طرح...')

            const payload = {
               _id: design._id,
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
               name: addingNewDesign ? '' : design.name,
               // @ts-ignore
               category: addingNewDesign ? categories[0] : design.category[0],
               active: addingNewDesign ? true : design.active,
            }}
            validationSchema={DesignEditForm}
            onSubmit={handleSubmit}
         >
            {({ values, setFieldValue, isSubmitting, errors, touched }) => (
               <Form className='grid grid-cols-3 gap-5 mt-6 '>
                  <div className='col-span-1'>
                     {addingNewDesign ? (
                        ''
                     ) : (
                        <ImageInput design={JSON.parse(JSON.stringify(design))} />
                     )}
                  </div>
                  <div className='space-y-5 col-span-2'>
                     <div className='text-right space-y-1'>
                        <label htmlFor='name'>
                           <span className='text-slate-400'>عنوان طرح</span>
                        </label>
                        <input
                           name='name'
                           onChange={(e) => setFieldValue('name', e.target.value)}
                           value={values.name}
                           style={{
                              border: '1px solid #cccccc',
                              padding: '10px',
                              width: '100%',
                           }}
                           className='rounded-lg rtl'
                           type='text'
                        />
                        <div className='flex items-center justify-end'>
                           <p className='text-xs text-yellow-500'>
                              ترجیحا عنوان طرح نباید تغییر کند
                           </p>
                           <svg
                              className='h-5 w-5 text-yellow-500'
                              fill='none'
                              viewBox='0 0 24 24'
                              stroke='currentColor'
                           >
                              <path
                                 strokeLinecap='round'
                                 strokeLinejoin='round'
                                 strokeWidth='2'
                                 d='M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z'
                              />
                           </svg>
                        </div>
                     </div>

                     {errors.name && touched.name ? (
                        <p className='text-sm text-red-500'>{errors.name}</p>
                     ) : (
                        ''
                     )}

                     <Autocomplete
                        className='rtl'
                        id='category'
                        value={values.category as unknown as ICategory}
                        options={categories}
                        isOptionEqualToValue={(option, value) =>
                           // @ts-ignore
                           option === value || option._id === value._id
                        }
                        // @ts-ignore
                        getOptionLabel={(option: ICategory) => option.name}
                        onChange={(_e, value) => {
                           if (value) {
                              setFieldValue('category', value)
                           }
                        }}
                        renderInput={(params) => {
                           return (
                              <div ref={params.InputProps.ref}>
                                 <label
                                    htmlFor='categoryList'
                                    className='text-xs yekan1 text-slate-400'
                                 >
                                    دسته بندی
                                 </label>
                                 <input
                                    id='categoryList'
                                    type='text'
                                    placeholder='عنوان دسته بندی را بنویسید...'
                                    style={{
                                       border: '1px solid #cccccc',
                                       borderRadius: '10px',
                                       padding: '10px',
                                       width: '100%',
                                    }}
                                    {...params.inputProps}
                                 />
                              </div>
                           )
                        }}
                        sx={{ width: '100%' }}
                     />

                     {errors.category && touched.category ? (
                        // @ts-ignore
                        <p className='text-sm text-red-500'>{errors.category}</p>
                     ) : (
                        ''
                     )}

                     <div className='flex items-center gap-5 rtl'>
                        <span className='text-slate-400 yekan'>طرح نمایش داده شود</span>

                        <Switch
                           checked={values.active}
                           name='active'
                           color='success'
                           onChange={() => setFieldValue('active', !values.active)}
                        />
                     </div>

                     <button
                        type='submit'
                        disabled={isSubmitting}
                        className='border-2 border-green-600 hover:shadow-md hover:shadow-green-600/40 w-full rounded-lg'
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
                           className='border-2 border-rose-300 hover:shadow-md hover:shadow-rose-300/40 w-full rounded-lg'
                        >
                           {isSubmitting ? <CircularProgress color='error' size={25} /> : 'حذف'}
                        </button>
                     )}
                  </div>
               </Form>
            )}
         </Formik>
      )
   },
)

DetailForm.displayName = 'DetailForm'

export default DetailForm
