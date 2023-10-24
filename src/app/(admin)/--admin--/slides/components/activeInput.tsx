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
         value: boolean,
         shouldValidate?: boolean | undefined,
      ) => Promise<void | FormikErrors<{
         alt: string
         link: string
         active: boolean
      }>>
   }) => {
      return (
         <div>
            <span className='block text-center text-slate-400'>فعال</span>
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
