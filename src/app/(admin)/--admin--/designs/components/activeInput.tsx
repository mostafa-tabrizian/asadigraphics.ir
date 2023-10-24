import Switch from '@mui/material/Switch'
import { FormikErrors } from 'formik'
import { memo } from 'react'

const ActiveInput = memo(
   ({
      value,
      setFieldValue,
   }: {
      value: boolean
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
         <div className='rtl flex items-center gap-5'>
            <span className='yekan text-slate-400'>طرح نمایش داده شود</span>

            <Switch
               checked={value}
               name='active'
               color='success'
               onChange={() => setFieldValue('active', !value)}
            />
         </div>
      )
   },
)

ActiveInput.displayName = 'ActiveInput'

export default ActiveInput
