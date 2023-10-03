'use client'

import { memo } from 'react'
import { Formik, Form } from 'formik'
import { toast } from 'react-toastify'

import { IDesign } from '@/models/design'
import { ICategory } from '@/models/category'

import { Switch } from '@mui/material'
import TextField from '@mui/material/TextField'
import CircularProgress from '@mui/material/CircularProgress'
import Autocomplete from '@mui/material/Autocomplete'

import ImageInput from './imageInput'
import { DesignEditForm } from '@/formik/schema/validation'

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
      const handleSubmit = async (
         values: {
            name: string
            category: object
            active: boolean
         },
         { resetForm }: { resetForm: () => void },
      ) => {
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
            return resetForm()
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
                        <ImageInput
                           design={{
                              _id: design._id,
                              front: design.designFront,
                              back: design.designBack,
                           }}
                        />
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
                           className='mr-3 rtl w-full text-sm bg-slate-100 border-2 border-slate-200 rounded-lg p-2'
                           type='text'
                        />
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
                           option === value || option._id === value._id
                        }
                        getOptionLabel={(option: ICategory) => option.name}
                        onChange={(_e, value) => {
                           if (value) {
                              setFieldValue('category', value)
                           }
                        }}
                        renderInput={(params) => <TextField {...params} label='دسته بندی' />}
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

                     {!addingNewDesign && (
                        <span className='text-rose-400 yekan flex justify-end !my-0 text-[.65rem] text-right'>
                           .طرح ها قابل حذف نمی‌باشند. تنها میتوان آنها را مخفی کرد
                        </span>
                     )}

                     

                     <button
                        type='submit'
                        disabled={isSubmitting}
                        className='border-2 border-green-600 w-full rounded-lg'
                     >
                        {isSubmitting ? <CircularProgress color='success' size={25} /> : 'ذخیره'}
                     </button>
                  </div>
               </Form>
            )}
         </Formik>
      )
   },
)

DetailForm.displayName = 'DetailForm'

export default DetailForm
