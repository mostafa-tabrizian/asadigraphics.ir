import { FormikErrors } from 'formik'
import { memo } from 'react'

const DescriptionInput = memo(
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
            <label htmlFor='description'>
               <span className='text-slate-400'>توضیحات</span>
            </label>

            <div className=' border border-green-600/50 p-2 rounded-lg text-right'>
               <span className='text-xs text-green-600/70'>
                  ترجیحا تعداد کلمات می‌بایست ما بین ۵۰ تا ۳۰۰ کلمه باشد ✅ <br /> کیفیت متن با
                  جزئیات بیشتر و تعداد کلمات مناسب، در عملکرد صفحات در گوگل تاثیر بسیار مثبتی
                  میگذارد
               </span>
            </div>

            <span className='text-slate-500 text-xs'>
               تعداد کلمات توضیحات: {value ? value.split(' ')?.length.toLocaleString('fa') : '۰'}
            </span>

            <textarea
               name='description'
               onChange={(e) => setFieldValue('description', e.target.value)}
               value={value}
               rows={8}
               placeholder='توضیحات طرح ...'
               style={{
                  border: '1px solid #cccccc',
                  padding: '10px',
                  width: '100%',
               }}
               className='rounded-lg rtl placeholder:text-slate-400'
            />
            {error && touch ? <p className='text-sm text-red-500'>{error}</p> : ''}
         </div>
      )
   },
)

DescriptionInput.displayName = 'DescriptionInput'

export default DescriptionInput
