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
            <div className='text-right space-y-1'>
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
                  className='rounded-lg rtl placeholder:text-slate-400'
                  type='text'
                  placeholder='برای مثال: لوگو ماه فروشگاه آسمان'
               />
               <div className='flex items-center justify-end'>
                  <p className='text-xs text-yellow-500'>ترجیحا عنوان طرح نباید تغییر کند</p>
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

            {error && touch ? <p className='text-sm text-red-500'>{error}</p> : ''}
         </>
      )
   },
)

DesignNameInput.displayName = 'DesignNameInput'

export default DesignNameInput
