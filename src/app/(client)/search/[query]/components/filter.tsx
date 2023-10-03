'use client'

import { Dispatch, SetStateAction, useState, memo } from 'react'

import Drawer from '@mui/material/Drawer'
import Collapse from '@mui/material/Collapse'
import Button from '@mui/material/Button'
import Radio from '@mui/material/Radio'
import RadioGroup from '@mui/material/RadioGroup'
import FormControlLabel from '@mui/material/FormControlLabel'
import Slider from '@mui/material/Slider'
import { IBrand } from '@/models/brand'
import { IModel } from '@/models/model'

const FilterComponent = ({
   filters,
   setFilters,
   brands,
   models,
}: {
   filters: {
      type: null | string
      priceRange: number[]
      brand: null | string
      model: null | string
   }
   setFilters: Dispatch<
      SetStateAction<{
         type: null | string
         priceRange: number[]
         brand: null | string
         model: null | string
      }>
   >
   brands: IBrand[]
   models: IModel[]
}) => {
   const [filterToolsDrawer, setFilterToolsDrawer] = useState(false)

   const toggleDrawer = () => (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
         event.type === 'keydown' &&
         ((event as React.KeyboardEvent).key === 'Tab' ||
            (event as React.KeyboardEvent).key === 'Shift')
      ) {
         return
      }

      setFilterToolsDrawer(false)
   }

   return (
      <>
         <button
            onClick={() => setFilterToolsDrawer(true)}
            className='border rounded-2xl md:hidden border-slate-200 bg-white shadow shadow-slate-200 flex py-2 justify-center items-center flex-1'
         >
            <span className='font-bold text-slate-600 text-base'>فیلتر طرح ها</span>
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
                  d='M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4'
               ></path>
            </svg>
         </button>

         <Drawer anchor='bottom' open={filterToolsDrawer} onClose={toggleDrawer()}>
            <div className='p-6 bg-slate-100'>
               <div className='text-center'>
                  <span className='font-bold text-base'>فیلتر طرح ها</span>
               </div>

               <FilterOptions
                  filters={filters}
                  setFilters={setFilters}
                  brands={brands}
                  models={models}
               />

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

export default FilterComponent

export const FilterOptions = memo(
   ({
      filters,
      setFilters,
      brands,
      models,
   }: {
      filters: {
         type: null | string
         priceRange: number[]
         brand: null | string
         model: null | string
      }
      setFilters: Dispatch<
         SetStateAction<{
            type: null | string
            priceRange: number[]
            brand: null | string
            model: null | string
         }>
      >
      brands: IBrand[]
      models: IModel[]
   }) => {
      const [typeCollapse, setTypeCollapse] = useState(false)
      const [brandCollapse, setBrandCollapse] = useState(false)
      const [modelCollapse, setModelCollapse] = useState(false)

      return (
         <div>
            <div className='bg-white rtl text-right py-2 my-3 px-3 rounded-xl'>
               <div className='flex md:block justify-between mb-3'>
                  <span className='text-base'>بازه قیمتی</span>

                  <div>
                     <span className='text-base font-semibold'>
                        {(filters.priceRange[1] * 200_000).toLocaleString('fa')} تومان
                     </span>{' '}
                     تا
                     <span className='mr-2 text-base font-semibold'>
                        {(filters.priceRange[0] * 200_000).toLocaleString('fa')} تومان
                     </span>
                  </div>
               </div>

               <div className='px-5'>
                  <Slider
                     sx={{ direction: 'rtl' }}
                     getAriaLabel={() => 'بازه قیمتی'}
                     value={filters.priceRange}
                     onChange={(_e, newValue) =>
                        setFilters({
                           ...filters,
                           type: 'available',
                           priceRange: newValue as number[],
                        })
                     }
                     valueLabelDisplay='auto'
                     getAriaValueText={(value) => `تومان ${(value * 200_000).toLocaleString('fa')}`}
                     valueLabelFormat={() => ''}
                  />
               </div>
            </div>

            <div className='bg-white py-2 my-3 pl-2 pr-3 rounded-xl'>
               <button
                  className='flex justify-between w-full'
                  onClick={() => setTypeCollapse((prev) => !prev)}
               >
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
                  <div className='flex gap-x-2'>
                     <span className='font-bold text-base'>نوع طرح ها</span>
                     <svg
                        className='h-5 w-5 text-slate-700'
                        width='24'
                        height='24'
                        viewBox='0 0 24 24'
                        strokeWidth='2'
                        stroke='currentColor'
                        fill='none'
                        strokeLinecap='round'
                        strokeLinejoin='round'
                     >
                        {' '}
                        <path stroke='none' d='M0 0h24v24H0z' />{' '}
                        <rect x='4' y='4' width='6' height='5' rx='2' />{' '}
                        <rect x='4' y='13' width='6' height='7' rx='2' />{' '}
                        <rect x='14' y='4' width='6' height='16' rx='2' />
                     </svg>
                  </div>
               </button>
               <Collapse in={typeCollapse}>
                  <hr />
                  <RadioGroup
                     aria-labelledby='demo-controlled-radio-buttons-group'
                     name='controlled-radio-buttons-group'
                     value={filters.type}
                     className='rtl'
                     onClick={(e) => {
                        const newValue = (e.target as HTMLInputElement).value
                        const prevValue = filters.type

                        setFilters({
                           ...filters,
                           type: newValue == prevValue ? null : newValue,
                        })
                     }}
                  >
                     <FormControlLabel value='discounted' control={<Radio />} label='تخفیف دار' />
                     <FormControlLabel value='available' control={<Radio />} label='موجود' />
                  </RadioGroup>
               </Collapse>
            </div>
            <div className='bg-white py-2 my-3 pl-2 pr-3 rounded-xl'>
               <button
                  className='flex justify-between w-full'
                  onClick={() => setBrandCollapse((prev) => !prev)}
               >
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
                  <div className='flex gap-x-2'>
                     <span className='font-bold text-base'>برند طرح ها</span>
                     <svg
                        className='h-5 w-5 text-slate-700'
                        width='24'
                        height='24'
                        viewBox='0 0 24 24'
                        strokeWidth='2'
                        stroke='currentColor'
                        fill='none'
                        strokeLinecap='round'
                        strokeLinejoin='round'
                     >
                        {' '}
                        <path stroke='none' d='M0 0h24v24H0z' />{' '}
                        <path d='M11 3L20 12a1.5 1.5 0 0 1 0 2L14 20a1.5 1.5 0 0 1 -2 0L3 11v-4a4 4 0 0 1 4 -4h4' />{' '}
                        <circle cx='9' cy='9' r='2' />
                     </svg>
                  </div>
               </button>
               <Collapse in={brandCollapse}>
                  <hr />
                  <RadioGroup
                     aria-labelledby='demo-controlled-radio-buttons-group'
                     name='controlled-radio-buttons-group'
                     value={filters.brand}
                     className='rtl'
                     onClick={(e) => {
                        const newValue = (e.target as HTMLInputElement).value
                        const prevValue = filters.brand

                        setFilters({
                           ...filters,
                           brand: newValue == prevValue ? null : newValue,
                        })
                     }}
                  >
                     {brands.map((brand) => (
                        <FormControlLabel
                           key={brand._id}
                           value={brand._id}
                           control={<Radio />}
                           label={`${brand.name} | ${brand.slug}`}
                        />
                     ))}
                  </RadioGroup>
               </Collapse>
            </div>

            <div className='bg-white py-2 my-3 pl-2 pr-3 rounded-xl'>
               <button
                  className='flex justify-between w-full'
                  onClick={() => setModelCollapse((prev) => !prev)}
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
                     <span className='font-bold text-base'>مدل طرح ها</span>
                     <svg
                        className='h-5 w-5 text-slate-700'
                        width='24'
                        height='24'
                        viewBox='0 0 24 24'
                        strokeWidth='2'
                        stroke='currentColor'
                        fill='none'
                        strokeLinecap='round'
                        strokeLinejoin='round'
                     >
                        {' '}
                        <path stroke='none' d='M0 0h24v24H0z' /> <circle cx='12' cy='18' r='2' />{' '}
                        <circle cx='7' cy='6' r='2' /> <circle cx='17' cy='6' r='2' />{' '}
                        <path d='M7 8v2a2 2 0 0 0 2 2h6a2 2 0 0 0 2 -2v-2' />{' '}
                        <line x1='12' y1='12' x2='12' y2='16' />
                     </svg>
                  </div>
               </button>
               <Collapse in={modelCollapse}>
                  <hr />
                  <RadioGroup
                     aria-labelledby='demo-controlled-radio-buttons-group'
                     name='controlled-radio-buttons-group'
                     value={filters.model}
                     className='rtl'
                     onClick={(e) => {
                        const newValue = (e.target as HTMLInputElement).value
                        const prevValue = filters.model

                        setFilters({
                           ...filters,
                           model: newValue == prevValue ? null : newValue,
                        })
                     }}
                  >
                     {models.map((model) => (
                        <FormControlLabel
                           key={model._id}
                           value={model._id}
                           control={<Radio />}
                           label={`${model.name} | ${model.slug}`}
                        />
                     ))}
                  </RadioGroup>
               </Collapse>
            </div>
         </div>
      )
   },
)

FilterOptions.displayName = 'FilterOptions'
