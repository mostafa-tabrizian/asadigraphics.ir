import { FormikErrors } from 'formik'
import { memo } from 'react'

const PalettesColorInput = memo(
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
               <label htmlFor='colorPalettes' className='flex justify-between'>
                  <span className='text-yellow-500'>تفکیک رنگ ها با علامت , می‌باشد</span>
                  <span className='text-slate-400'>پالت های رنگی</span>
               </label>
               <input
                  name='colorPalettes'
                  onChange={(e) => setFieldValue('colorPalettes', e.target.value)}
                  value={value}
                  style={{
                     border: '1px solid #cccccc',
                     padding: '10px',
                     width: '100%',
                  }}
                  className='rounded-lg font-mono placeholder:text-slate-400'
                  type='text'
                  placeholder='#111111,#222222'
               />
            </div>
            <div className='flex justify-between'>
               <div className='flex gap-2'>
                  {value?.split(',')?.map((color, idx) => {
                     return (
                        <span
                           title={color}
                           key={idx}
                           className='h-7 w-7 rounded-full'
                           style={{
                              background: color,
                              boxShadow: '0px 0px 4px rgba(0, 0, 0, 0.25)',
                           }}
                        ></span>
                     )
                  })}
               </div>
               <span className='text-slate-400'>پیش نمایش رنگ ها</span>
            </div>
            {error && touch ? <p className='text-sm text-red-500'>{error}</p> : ''}
         </>
      )
   },
)

PalettesColorInput.displayName = 'PalettesColorInput'

export default PalettesColorInput
