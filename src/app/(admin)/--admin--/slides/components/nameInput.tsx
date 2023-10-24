import { FormikErrors } from 'formik'
import { memo } from 'react'

const NameInput = memo(
   ({
      params: { error, touch, value, setFieldValue },
   }: {
      params: {
         error: string | undefined
         touch: boolean | undefined
         value: string
         setFieldValue: (
            field: string,
            value: string,
            shouldValidate?: boolean | undefined,
         ) => Promise<void | FormikErrors<{
            alt: string
            link: string
            active: boolean
         }>>
      }
   }) => {
      return (
         <div className='space-y-1 text-right'>
            <label htmlFor='alt'>
               <span className='text-slate-400'>عنوان جایگزین</span>
            </label>
            {error && touch ? <p className='text-sm text-red-500'>{error}</p> : ''}
            <input
               name='alt'
               onChange={(e) => setFieldValue('alt', e.target.value)}
               value={value}
               className='rtl mr-3 w-full rounded-lg border-2 border-slate-200 bg-slate-100 p-2 text-sm'
               type='text'
            />
         </div>
      )
   },
)

NameInput.displayName = 'NameInput'

export default NameInput
