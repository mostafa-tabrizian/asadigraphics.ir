import { ICategory } from '@/models/category'
const Autocomplete = dynamic(() => import('@mui/material/Autocomplete'))
import { FormikErrors } from 'formik'
import dynamic from 'next/dynamic'
import { memo } from 'react'

const CategoryInput = memo(
   ({
      categories,
      value,
      setFieldValue,
   }: {
      categories: ICategory[]
      value: object
      setFieldValue: (
         field: string,
         value: unknown,
         shouldValidate?: boolean | undefined,
      ) => Promise<void | FormikErrors<{
         name: string
         category: object
         active: boolean
         client: string
         description: string
         designedAt: string
         colorPalettes: string
      }>>
   }) => {
      return (
         <>
            <Autocomplete
               className='rtl'
               id='category'
               value={value as unknown as ICategory}
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
                        <label htmlFor='categoryList' className='yekan1 text-xs text-slate-400'>
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
         </>
      )
   },
)

CategoryInput.displayName = 'CategoryInput'

export default CategoryInput
