'use client'

import { Dispatch, SetStateAction, memo, useState } from 'react'

import Drawer from '@mui/material/Drawer'
import Collapse from '@mui/material/Collapse'
import Button from '@mui/material/Button'
import Radio from '@mui/material/Radio'
import RadioGroup from '@mui/material/RadioGroup'
import FormControlLabel from '@mui/material/FormControlLabel'

const SortComponent = ({
   sortValue,
   setSortValue,
}: {
   sortValue: string
   setSortValue: Dispatch<SetStateAction<string>>
}) => {
   const [sortToolsDrawer, setSortToolsDrawer] = useState(false)

   const toggleDrawer = () => (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
         event.type === 'keydown' &&
         ((event as React.KeyboardEvent).key === 'Tab' ||
            (event as React.KeyboardEvent).key === 'Shift')
      ) {
         return
      }

      setSortToolsDrawer(false)
   }

   return (
      <>
         <button
            onClick={() => setSortToolsDrawer(true)}
            className='border rounded-2xl md:hidden border-slate-200 bg-white shadow shadow-slate-200 flex py-2 justify-center items-center flex-1'
         >
            <span className='font-bold text-slate-600 text-base'>مرتب سازی</span>
            <svg
               stroke='currentColor'
               fill='none'
               strokeWidth='0'
               viewBox='0 0 24 24'
               className='w-5 h-5 text-gray-400 ml-2'
               height='1em'
               width='1em'
               xmlns='http://www.w3.org/2000/svg'
            >
               <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth='2'
                  d='M3 4h13M3 8h9m-9 4h9m5-4v12m0 0l-4-4m4 4l4-4'
               ></path>
            </svg>
         </button>

         <Drawer anchor='bottom' open={sortToolsDrawer} onClose={toggleDrawer()}>
            <div className='p-6 bg-slate-100'>
               <div className='text-center'>
                  <span className='font-bold text-base'>مرتب سازی طرح ها</span>
               </div>
               <SortOptions sortValue={sortValue} setSortValue={setSortValue} />
               <Button
                  onClick={toggleDrawer()}
                  variant='contained'
                  sx={{
                     borderRadius: '15px',
                     width: '100%',
                     padding: '.5rem 0',
                     marginButton: '1.5rem',
                  }}
               >
                  اعمال فیلتر
               </Button>
            </div>
         </Drawer>
      </>
   )
}

export default SortComponent

export const SortOptions = memo(
   ({
      sortValue,
      setSortValue,
   }: {
      sortValue: string
      setSortValue: Dispatch<SetStateAction<string>>
   }) => {
      const [sortCollapse, setSortCollapse] = useState(false)

      return (
         <div className='bg-white py-2 my-6 px-5 rounded-xl'>
            <button
               className='flex justify-between w-full'
               onClick={() => setSortCollapse((prev) => !prev)}
            >
               <div>
                  <svg
                     stroke='currentColor'
                     fill='none'
                     strokeWidth='0'
                     viewBox='0 0 24 24'
                     height='1em'
                     width='1em'
                     xmlns='http://www.w3.org/2000/svg'
                  >
                     <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        strokeWidth='2'
                        d='M19 9l-7 7-7-7'
                     ></path>
                  </svg>
               </div>
               <div className='flex gap-x-2'>
                  <span className='font-bold text-base'>مرتب سازی</span>
                  <svg
                     xmlns='http://www.w3.org/2000/svg'
                     viewBox='0 0 20 20'
                     fill='none'
                     className='w-5 h-5 text-secondary-700'
                  >
                     <path
                        fill='currentColor'
                        d='M18.333 8.967a.717.717 0 0 0-.716-.717H2.383c-.4 0-.716.317-.716.717 0 4.908 3.425 8.333 8.333 8.333s8.333-3.433 8.333-8.333Z'
                        opacity='0.4'
                     ></path>
                     <path
                        fill='currentColor'
                        d='m10.442 2.883 2.375 2.367a.629.629 0 0 1 0 .883.629.629 0 0 1-.884 0l-1.308-1.3v7.975a.63.63 0 0 1-.625.625.63.63 0 0 1-.625-.625V4.833l-1.3 1.309a.629.629 0 0 1-.883 0A.627.627 0 0 1 7 5.7c0-.158.058-.317.183-.442l2.375-2.366a.621.621 0 0 1 .884-.009Z'
                     ></path>
                  </svg>
               </div>
            </button>
            <Collapse in={sortCollapse}>
               <hr />
               <RadioGroup
                  aria-labelledby='demo-controlled-radio-buttons-group'
                  name='controlled-radio-buttons-group'
                  value={sortValue}
                  className='rtl'
                  onChange={(e) => setSortValue((e.target as HTMLInputElement).value)}
               >
                  <FormControlLabel value='latest' control={<Radio />} label='جدیدترین' />
                  <FormControlLabel value='oldest' control={<Radio />} label='قدیمی ترین' />
                  <FormControlLabel value='expensive' control={<Radio />} label='گرانترین' />
                  <FormControlLabel value='cheap' control={<Radio />} label='ارزان ترین' />
               </RadioGroup>
            </Collapse>
         </div>
      )
   },
)

SortOptions.displayName = 'SortOption'
