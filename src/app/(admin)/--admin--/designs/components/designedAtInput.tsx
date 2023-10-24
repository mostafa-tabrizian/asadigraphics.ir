import { FormikErrors } from 'formik'
import { memo } from 'react'

const DesignedAtInput = memo(
   ({
      value,
      setFieldValue,
      error,
      touch,
   }: {
      value: string
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
      error: string | undefined
      touch: boolean | undefined
   }) => {
      return (
         <div className='text-right space-y-1'>
            <label htmlFor='designedAt'>
               <span className='text-slate-400'>تاریخ طراحی</span>
            </label>
            <input
               name='designedAt'
               onChange={(e) => setFieldValue('designedAt', e.target.value)}
               value={value}
               style={{
                  border: '1px solid #cccccc',
                  padding: '10px',
                  width: '100%',
               }}
               className='rounded-lg rtl placeholder:text-slate-400'
               type='text'
               placeholder='برای مثال: ۱۰ دی ۱۴۰۲'
            />
            {error && touch ? <p className='text-sm text-red-500'>{error}</p> : ''}
         </div>
      )
   },
)

DesignedAtInput.displayName = 'DesignedAtInput'

export default DesignedAtInput
