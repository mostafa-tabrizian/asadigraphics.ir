import { FormikErrors } from 'formik'
import { memo } from 'react'

const DesignNameInput = memo(
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
         <>
            <div className='space-y-1 text-right'>
               <label htmlFor='name'>
                  <span className='text-slate-400'>عنوان طرح</span>
               </label>
               <input
                  name='name'
                  onChange={(e) => setFieldValue('name', e.target.value)}
                  value={value}
                  style={{
                     border: '1px solid #cccccc',
                     padding: '10px',
                     width: '100%',
                  }}
                  className='rtl rounded-lg placeholder:text-slate-400'
                  type='text'
                  placeholder='برای مثال: لوگو ماه فروشگاه آسمان'
               />
               <div className='rounded-lg border border-yellow-600 p-2 text-right'>
                  <span className='text-xs text-yellow-500'>
                     ـ⚠️ تنها در صورت لزوم عنوان را تغییر دهید، در غیر این صورت هرگز این کار را
                     نکنید، در عملکرد سرچ گوگل اثر منفی می‌گذارد
                  </span>
               </div>
            </div>

            {error && touch ? <p className='text-sm text-red-500'>{error}</p> : ''}
         </>
      )
   },
)

DesignNameInput.displayName = 'DesignNameInput'

export default DesignNameInput
