import { FormikErrors } from 'formik'
import { memo } from 'react'

const ClientInput = memo(
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
         <div className='space-y-1 text-right'>
            <label htmlFor='client'>
               <span className='text-slate-400'>سفارش دهنده</span>
            </label>
            <input
               name='client'
               onChange={(e) => setFieldValue('client', e.target.value)}
               value={value}
               style={{
                  border: '1px solid #cccccc',
                  padding: '10px',
                  width: '100%',
               }}
               className='rtl rounded-lg placeholder:text-slate-400'
               type='text'
               placeholder='برای مثال: فروشگاه آسمان'
            />
            {error && touch ? <p className='text-sm text-red-500'>{error}</p> : ''}
         </div>
      )
   },
)

ClientInput.displayName = 'ClientInput'

export default ClientInput
