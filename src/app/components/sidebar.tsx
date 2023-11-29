'use client'

import { useState, useEffect, memo } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import dynamic from 'next/dynamic'
import Image from 'next/image'

const Drawer = dynamic(() => import('@mui/material/Drawer'))
const Collapse = dynamic(() => import('@mui/material/Collapse'))

import { ICategory } from '@/models/category'
import hyphen from '@/lib/hyphen'

const Sidebar = memo(({ categoriesList }: { categoriesList: ICategory[] }) => {
   const [sidebar, setSidebar] = useState(false)
   const [categories, setCategories] = useState(false)
   const [contactUsOptions, setContactUsOptions] = useState(false)

   const pathname = usePathname()

   useEffect(() => setSidebar(false), [pathname])

   useEffect(() => {
      return () => {
         setSidebar(false)
         setCategories(false)
         setContactUsOptions(false)
      }
   }, [])

   return (
      <div className='xl:hidden'>
         <button type='button' onClick={() => setSidebar(true)} aria-label='open sidebar'>
            <svg
               xmlns='http://www.w3.org/2000/svg'
               width='37'
               height='29'
               viewBox='0 0 37 29'
               fill='none'
            >
               <path
                  d='M2 2H22.625M2 14.5H35M14.375 27H35'
                  stroke='black'
                  strokeWidth='4'
                  strokeLinecap='round'
                  strokeLinejoin='round'
               />
            </svg>
         </button>
         <Drawer anchor='right' open={sidebar} onClose={() => setSidebar(false)}>
            <div className='h-full w-[16rem] bg-slate-100'>
               <div className='p-5'>
                  <div className='flex items-center justify-between gap-20'>
                     <button
                        type='button'
                        onClick={() => setSidebar(false)}
                        aria-label='close sidebar'
                     >
                        <svg
                           stroke='currentColor'
                           fill='none'
                           strokeWidth='0'
                           viewBox='0 0 24 24'
                           className='h-8 w-8 text-black'
                           height='1em'
                           width='1em'
                           xmlns='http://www.w3.org/2000/svg'
                        >
                           <path
                              strokeLinecap='round'
                              strokeLinejoin='round'
                              strokeWidth='2'
                              d='M6 18L18 6M6 6l12 12'
                           ></path>
                        </svg>
                     </button>
                     <div>
                        <Link aria-label='صفحه اصلی' href='/' className='flex'>
                           <Image
                              className='aspect-auto object-contain mix-blend-multiply'
                              src={
                                 'https://tabrizian.storage.iran.liara.space/asadi_designs/logo/logo_2.jpg'
                              }
                              alt='لوگو اسدی گرافیک'
                              width={77}
                              height={100}
                              quality={100}
                           />
                        </Link>
                     </div>
                  </div>

                  <hr />

                  <ul className='rtl mt-10 flex flex-col justify-between gap-x-8 gap-y-2 text-gray-700'>
                     <li className='block'>
                        <div className='rounded-lg bg-gradient-to-l from-white to-transparent pr-1 text-gray-700 shadow-inner'>
                           <Link href='/'>
                              <div className='menu-item relative flex items-center'>
                                 <span className='flex cursor-pointer items-center gap-x-2 py-2 font-bold md:py-1'>
                                    <svg
                                       xmlns='http://www.w3.org/2000/svg'
                                       viewBox='0 0 22 22'
                                       fill='none'
                                       className='h-5 w-5'
                                       stroke='currentColor'
                                       strokeWidth={0}
                                    >
                                       <path
                                          fill='currentColor'
                                          d='M20.04 9.719a.75.75 0 0 0-1.5 0h1.5Zm-14.58 0a.75.75 0 1 0-1.5 0h1.5Zm9.053 10.988-.172-.73.172.73Zm-5.026 0 .172-.73-.172.73Zm5.341-15.693-.532.529.532-.529Zm5.64 6.744a.75.75 0 1 0 1.064-1.057l-1.064 1.057ZM9.172 5.014l.532.529-.532-.529Zm-6.704 5.687a.75.75 0 1 0 1.064 1.057l-1.064-1.057Zm7.25 7.62-.737-.14.737.14Zm.02-.104.737.139-.737-.139Zm4.524 0-.737.139.737-.139Zm.02.103.737-.138-.737.138Zm-.29 2.232-.677-.322.677.322Zm-.794-.077a.75.75 0 0 0 1.354.645l-1.354-.645Zm-3.19.077-.677.322.677-.322Zm-.56.568a.75.75 0 0 0 1.354-.645l-1.354.645Zm1.913-4.677-.2-.723.2.723Zm1.278 0 .2-.723-.2.723Zm5.901-6.724v4.918h1.5V9.72h-1.5ZM5.46 14.637V9.72h-1.5v4.918h1.5Zm8.88 5.34a10.18 10.18 0 0 1-4.68 0l-.346 1.46a11.68 11.68 0 0 0 5.372 0l-.345-1.46Zm-4.68 0c-2.457-.58-4.2-2.79-4.2-5.34h-1.5c0 3.24 2.214 6.058 5.354 6.8l.345-1.46Zm5.026 1.46c3.14-.742 5.354-3.56 5.354-6.8h-1.5c0 2.55-1.743 4.76-4.2 5.34l.346 1.46Zm-.39-15.894 6.172 6.215 1.064-1.057-6.171-6.215-1.065 1.057ZM8.64 4.486 2.468 10.7l1.064 1.057 6.172-6.215-1.065-1.057Zm6.722 0c-.652-.657-1.193-1.204-1.68-1.577-.502-.387-1.035-.659-1.681-.659v1.5c.183 0 .397.064.768.348.387.298.847.758 1.528 1.445l1.065-1.057ZM9.704 5.543c.681-.687 1.14-1.147 1.528-1.445.37-.284.585-.348.768-.348v-1.5c-.646 0-1.178.272-1.682.659-.486.373-1.027.92-1.679 1.577l1.065 1.057Zm.752 12.916.019-.103L9 18.079l-.02.103 1.475.277Zm3.07-.103.018.103 1.475-.277-.02-.103-1.474.277Zm-.211 1.874-.117.245 1.354.645.117-.246-1.354-.644Zm-3.984.644.117.246 1.354-.645-.117-.245-1.354.644Zm4.213-2.415c.113.6.032 1.22-.23 1.77l1.355.645c.399-.837.52-1.78.35-2.692l-1.475.277Zm-4.563-.277a4.385 4.385 0 0 0 .35 2.692l1.354-.644a2.884 2.884 0 0 1-.23-1.771l-1.474-.277Zm2.58-1.017c.287-.08.59-.08.877 0l.401-1.445a3.138 3.138 0 0 0-1.678 0l.4 1.445ZM15 18.08a3.024 3.024 0 0 0-2.16-2.36l-.4 1.446c.554.154.978.614 1.086 1.19L15 18.08Zm-4.524.277a1.524 1.524 0 0 1 1.087-1.19l-.401-1.446A3.024 3.024 0 0 0 9 18.079l1.474.277Z'
                                       ></path>
                                    </svg>
                                    <span className='text-base'>صفحه اصلی</span>
                                 </span>
                              </div>
                           </Link>
                        </div>
                     </li>

                     <li className='block'>
                        <div className='rounded-lg bg-gradient-to-l from-white to-transparent pr-1 text-gray-700 shadow-inner'>
                           <Link href='/search/all?type=all&name=تمامی+طرح+ها'>
                              <div className='menu-item relative flex items-center'>
                                 <span className='flex cursor-pointer items-center gap-x-2 py-2 font-bold md:py-1'>
                                    <svg
                                       className='h-5 w-5 text-black'
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
                                       <path d='M12 21a9 9 0 1 1 0 -18a9 8 0 0 1 9 8a4.5 4 0 0 1 -4.5 4h-2.5a2 2 0 0 0 -1 3.75a1.3 1.3 0 0 1 -1 2.25' />{' '}
                                       <circle cx='7.5' cy='10.5' r='.5' fill='currentColor' />{' '}
                                       <circle cx='12' cy='7.5' r='.5' fill='currentColor' />{' '}
                                       <circle cx='16.5' cy='10.5' r='.5' fill='currentColor' />
                                    </svg>
                                    <span className='text-base'>نمونه طراحی ها</span>
                                 </span>
                              </div>
                           </Link>
                        </div>
                     </li>

                     <li className='block'>
                        <div className='rounded-lg bg-gradient-to-l from-white to-transparent pr-1 text-gray-700 shadow-inner'>
                           <button
                              type='button'
                              aria-label='categories'
                              onClick={() => setCategories((prev) => !prev)}
                              className='w-full'
                           >
                              <span className='flex cursor-pointer items-center gap-x-2 py-1 font-bold '>
                                 <svg
                                    className='h-5 w-5'
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
                                    <rect x='4' y='4' width='6' height='6' rx='1' />{' '}
                                    <rect x='14' y='4' width='6' height='6' rx='1' />{' '}
                                    <rect x='4' y='14' width='6' height='6' rx='1' />{' '}
                                    <rect x='14' y='14' width='6' height='6' rx='1' />
                                 </svg>
                                 <span className='text-base'>دسته بندی ها</span>
                                 <svg
                                    stroke='currentColor'
                                    fill='none'
                                    strokeWidth='0'
                                    viewBox='0 0 24 24'
                                    className={`h-4 w-4 transition duration-300 ease-in-out ${
                                       categories ? 'rotate-90' : 'rotate-0'
                                    }`}
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
                              </span>
                           </button>

                           <Collapse in={categories}>
                              <ul className='space-y-4 border-b border-white border-opacity-10 p-3 opacity-90'>
                                 {categoriesList.map((category) => {
                                    return (
                                       <li key={category._id} className='flex items-center'>
                                          <Link
                                             id='category'
                                             className=' flex items-center'
                                             href={`/search/${hyphen(
                                                category.slug,
                                             )}?type=category&name=${category.name}`}
                                          >
                                             <p className='px-2 text-sm font-semibold'>
                                                {category.name}
                                             </p>
                                          </Link>
                                       </li>
                                    )
                                 })}
                              </ul>
                           </Collapse>
                        </div>
                     </li>

                     <li className='block '>
                        <div className='rounded-lg bg-gradient-to-l from-white to-transparent pr-1 text-gray-700 shadow-inner'>
                           <button
                              type='button'
                              aria-label='contact us'
                              onClick={() => setContactUsOptions((prev) => !prev)}
                              className='w-full'
                           >
                              <span className='flex cursor-pointer items-center gap-x-2 py-1 font-bold'>
                                 <svg
                                    className='h-5 w-5'
                                    viewBox='0 0 24 24'
                                    fill='none'
                                    stroke='currentColor'
                                    strokeWidth='2'
                                    strokeLinecap='round'
                                    strokeLinejoin='round'
                                 >
                                    {' '}
                                    <path d='M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z' />
                                 </svg>
                                 <span className='text-base'>ارتباط با ما</span>
                                 <svg
                                    stroke='currentColor'
                                    fill='none'
                                    strokeWidth='0'
                                    viewBox='0 0 24 24'
                                    className={`h-4 w-4 transition duration-300 ease-in-out ${
                                       contactUsOptions ? 'rotate-90' : 'rotate-0'
                                    }`}
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
                              </span>
                           </button>

                           <Collapse in={contactUsOptions}>
                              <ul className='space-y-4 border-b border-white border-opacity-10 p-3 opacity-90'>
                                 <li className='mb-4 flex items-center rounded-lg pr-2 opacity-90'>
                                    <a
                                       id='instagram'
                                       rel='noreferrer'
                                       className=' flex items-center'
                                       href='https://www.instagram.com/asadigraphics.ir'
                                       target='_blank'
                                    >
                                       {/* <span className='bg-gradient-to-br from-orange-500 via-rose-500 to-yellow-500 rounded-md'> */}
                                       <span>
                                          <svg
                                             className='h-5 w-5 text-slate-700'
                                             viewBox='0 0 24 24'
                                             fill='none'
                                             stroke='currentColor'
                                             strokeWidth='2'
                                             strokeLinecap='round'
                                             strokeLinejoin='round'
                                          >
                                             {' '}
                                             <rect
                                                x='2'
                                                y='2'
                                                width='20'
                                                height='20'
                                                rx='5'
                                                ry='5'
                                             />{' '}
                                             <path d='M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z' />{' '}
                                             <line x1='17.5' y1='6.5' x2='17.51' y2='6.5' />
                                          </svg>
                                       </span>
                                       <p className='px-2 font-semibold'>
                                          <span className='text-sm'>اینستاگرام</span>
                                       </p>
                                    </a>
                                 </li>
                                 <li className='mb-4 flex items-center rounded-lg pr-2 opacity-90'>
                                    <a
                                       id='telegram'
                                       rel='noreferrer'
                                       className=' flex items-center'
                                       href='https://t.me/asadigraphics'
                                       target='_blank'
                                    >
                                       {/* <span className='bg-orange-500 rounded-md'> */}
                                       <span>
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
                                             <path d='M15 10l-4 4l6 6l4 -16l-18 7l4 2l2 6l3 -4' />
                                          </svg>
                                       </span>
                                       <p className='px-2 font-semibold'>
                                          <span className='text-sm'>تلگرام</span>
                                       </p>
                                    </a>
                                 </li>
                                 <li className='mb-4 flex items-center rounded-lg pr-2 opacity-90'>
                                    <a
                                       id='eitaa'
                                       rel='noreferrer'
                                       className=' flex items-center'
                                       href='https://eitaa.com/asadigraphics'
                                       target='_blank'
                                    >
                                       {/* <span className='bg-gradient-to-br from-orange-500 via-rose-500 to-yellow-500 rounded-md'> */}
                                       <span>
                                          <svg
                                             className='h-5 w-5 text-slate-700'
                                             viewBox='0 0 24 24'
                                             fill='none'
                                             stroke='currentColor'
                                             strokeWidth='1.8'
                                             strokeLinecap='round'
                                             strokeLinejoin='round'
                                          >
                                             <path d='m5.968 23.942a6.624 6.624 0 0 1 -2.332-.83c-1.62-.929-2.829-2.593-3.217-4.426-.151-.717-.17-1.623-.15-7.207.019-6.009.005-5.699.291-6.689.142-.493.537-1.34.823-1.767 1.055-1.57 2.607-2.578 4.53-2.943.384-.073.94-.08 6.056-.08 6.251 0 6.045-.009 7.066.314a6.807 6.807 0 0 1 4.314 4.184c.33.937.346 1.087.369 3.555l.02 2.23-.391.268c-.558.381-1.29 1.06-2.316 2.15-1.182 1.256-2.376 2.42-2.982 2.907-1.309 1.051-2.508 1.651-3.726 1.864-.634.11-1.682.067-2.302-.095-.553-.144-.517-.168-.726.464a6.355 6.355 0 0 0 -.318 1.546l-.031.407-.146-.03c-1.215-.241-2.419-1.285-2.884-2.5a3.583 3.583 0 0 1 -.26-1.219l-.016-.34-.309-.284c-.644-.59-1.063-1.312-1.195-2.061-.212-1.193.34-2.542 1.538-3.756 1.264-1.283 3.127-2.29 4.953-2.68.658-.14 1.818-.177 2.403-.075 1.138.198 2.067.773 2.645 1.639.182.271.195.31.177.555a.812.812 0 0 1 -.183.493c-.465.651-1.848 1.348-3.336 1.68-2.625.585-4.294-.142-4.033-1.759.026-.163.04-.304.031-.313-.032-.032-.293.104-.575.3-.479.334-.903.984-1.05 1.607-.036.156-.05.406-.034.65.02.331.053.454.192.736.092.186.275.45.408.589l.24.251-.096.122a4.845 4.845 0 0 0 -.677 1.217 3.635 3.635 0 0 0 -.105 1.815c.103.461.421 1.095.739 1.468.242.285.797.764.886.764.024 0 .044-.048.044-.106.001-.23.184-.973.326-1.327.423-1.058 1.351-1.96 2.82-2.74.245-.13.952-.47 1.572-.757 1.36-.63 2.103-1.015 2.511-1.305 1.176-.833 1.903-2.065 2.14-3.625.086-.57.086-1.634 0-2.207-.368-2.438-2.195-4.096-4.818-4.37-2.925-.307-6.648 1.953-8.942 5.427-1.116 1.69-1.87 3.565-2.187 5.443-.123.728-.169 2.08-.093 2.75.193 1.704.822 3.078 1.903 4.156a6.531 6.531 0 0 0 1.87 1.313c2.368 1.13 4.99 1.155 7.295.071.996-.469 1.974-1.196 3.023-2.25 1.02-1.025 1.71-1.88 3.592-4.458 1.04-1.423 1.864-2.368 2.272-2.605l.15-.086-.019 3.091c-.018 2.993-.022 3.107-.123 3.561-.6 2.678-2.54 4.636-5.195 5.242l-.468.107-5.775.01c-4.734.008-5.85-.002-6.19-.056z' />
                                          </svg>
                                       </span>
                                       <p className='px-2 font-semibold'>
                                          <span className='text-sm'>ایتا</span>
                                       </p>
                                    </a>
                                 </li>
                              </ul>
                           </Collapse>
                        </div>
                     </li>

                     <li className='block'>
                        <div className='rounded-lg bg-gradient-to-l from-white to-transparent pr-1 text-gray-700 shadow-inner'>
                           <a id='about_us' href='#about-us' onClick={() => setSidebar(false)}>
                              <div className='menu-item relative flex items-center'>
                                 <span className='flex cursor-pointer items-center gap-x-2 py-2 font-bold md:py-1'>
                                    <svg
                                       className='h-5 w-5'
                                       fill='none'
                                       viewBox='0 0 24 24'
                                       stroke='currentColor'
                                    >
                                       <path
                                          strokeLinecap='round'
                                          strokeLinejoin='round'
                                          strokeWidth='2'
                                          d='M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z'
                                       />
                                    </svg>

                                    <span className='text-base'>درباره ما</span>
                                 </span>
                              </div>
                           </a>
                        </div>
                     </li>
                  </ul>
               </div>
            </div>
         </Drawer>
      </div>
   )
})

Sidebar.displayName = 'Sidebar'

export default Sidebar
