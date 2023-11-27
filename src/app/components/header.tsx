'use client'

import { memo, useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { ICategory } from '@/models/category'
import dynamic from 'next/dynamic'

const SearchInput = dynamic(() => import('@/components/searchInput'), { ssr: false })
const Sidebar = dynamic(() => import('./sidebar'), { ssr: false })
const LinksForDesktop = dynamic(() => import('./headerLinksforDesktop'), { ssr: false })

const Header = memo(({ params: { categories } }: { params: { categories: ICategory[] } }) => {
   const [enterEffect, setEnterEffect] = useState(0)

   useEffect(() => {
      setEnterEffect(1)
   }, [])

   return (
      <header className='z-20 w-screen rounded-b-xl border border-black/25 bg-white px-5 py-3 xl:fixed xl:left-0 xl:top-0'>
         <div className='mx-auto flex items-center justify-between xl:grid xl:max-w-screen-2xl xl:grid-cols-8'>
            <div className='mb-auto hidden md:col-span-2 md:block md:w-80 xl:w-3/4'>
               <SearchInput />
            </div>

            <LinksForDesktop categoriesList={JSON.parse(JSON.stringify(categories))} />

            <Link
               aria-label='صفحه اصلی'
               href='/'
               className='col-span-1 flex justify-end lg:hidden xl:flex'
            >
               <Image
                  className='object-contain'
                  src={'https://tabrizian.storage.iran.liara.space/asadi_designs/logo/logo_2.jpg'}
                  alt='لوگو اسدی گرافیک'
                  width={77}
                  height={52}
                  quality={100}
                  loading='lazy'
               />
            </Link>

            <Sidebar categoriesList={JSON.parse(JSON.stringify(categories))} />
         </div>

         <div className='md:hidden'>
            <SearchInput />
         </div>

         <a
            style={{
               transitionDuration: '2s',
               transform: enterEffect ? 'translateX(0px)' : 'translateX(-70px)',
               opacity: enterEffect,
            }}
            aria-label='ایتا'
            id='eitaa'
            href='https://eitaa.com/asadigraphics'
            className='fixed bottom-16 left-5 z-20 flex items-center gap-2 rounded-lg border-2 border-orange-400 bg-gradient-to-b from-white to-slate-200 py-1 pl-9 pr-1 shadow-md shadow-orange-300 xl:bottom-[4.3rem] xl:rounded-xl xl:py-2 xl:pl-12 xl:pr-2'
            title='ایتا با پشتیبانی'
            target='_blank'
            rel='noreferrer'
         >
            <svg
               className='top-.5 delay-[3s] absolute left-1 h-6 w-6 text-orange-400 xl:h-7 xl:w-7'
               viewBox='0 0 24 24'
               fill='none'
               stroke='currentColor'
               strokeWidth='1.8'
               strokeLinecap='round'
               strokeLinejoin='round'
            >
               <path d='m5.968 23.942a6.624 6.624 0 0 1 -2.332-.83c-1.62-.929-2.829-2.593-3.217-4.426-.151-.717-.17-1.623-.15-7.207.019-6.009.005-5.699.291-6.689.142-.493.537-1.34.823-1.767 1.055-1.57 2.607-2.578 4.53-2.943.384-.073.94-.08 6.056-.08 6.251 0 6.045-.009 7.066.314a6.807 6.807 0 0 1 4.314 4.184c.33.937.346 1.087.369 3.555l.02 2.23-.391.268c-.558.381-1.29 1.06-2.316 2.15-1.182 1.256-2.376 2.42-2.982 2.907-1.309 1.051-2.508 1.651-3.726 1.864-.634.11-1.682.067-2.302-.095-.553-.144-.517-.168-.726.464a6.355 6.355 0 0 0 -.318 1.546l-.031.407-.146-.03c-1.215-.241-2.419-1.285-2.884-2.5a3.583 3.583 0 0 1 -.26-1.219l-.016-.34-.309-.284c-.644-.59-1.063-1.312-1.195-2.061-.212-1.193.34-2.542 1.538-3.756 1.264-1.283 3.127-2.29 4.953-2.68.658-.14 1.818-.177 2.403-.075 1.138.198 2.067.773 2.645 1.639.182.271.195.31.177.555a.812.812 0 0 1 -.183.493c-.465.651-1.848 1.348-3.336 1.68-2.625.585-4.294-.142-4.033-1.759.026-.163.04-.304.031-.313-.032-.032-.293.104-.575.3-.479.334-.903.984-1.05 1.607-.036.156-.05.406-.034.65.02.331.053.454.192.736.092.186.275.45.408.589l.24.251-.096.122a4.845 4.845 0 0 0 -.677 1.217 3.635 3.635 0 0 0 -.105 1.815c.103.461.421 1.095.739 1.468.242.285.797.764.886.764.024 0 .044-.048.044-.106.001-.23.184-.973.326-1.327.423-1.058 1.351-1.96 2.82-2.74.245-.13.952-.47 1.572-.757 1.36-.63 2.103-1.015 2.511-1.305 1.176-.833 1.903-2.065 2.14-3.625.086-.57.086-1.634 0-2.207-.368-2.438-2.195-4.096-4.818-4.37-2.925-.307-6.648 1.953-8.942 5.427-1.116 1.69-1.87 3.565-2.187 5.443-.123.728-.169 2.08-.093 2.75.193 1.704.822 3.078 1.903 4.156a6.531 6.531 0 0 0 1.87 1.313c2.368 1.13 4.99 1.155 7.295.071.996-.469 1.974-1.196 3.023-2.25 1.02-1.025 1.71-1.88 3.592-4.458 1.04-1.423 1.864-2.368 2.272-2.605l.15-.086-.019 3.091c-.018 2.993-.022 3.107-.123 3.561-.6 2.678-2.54 4.636-5.195 5.242l-.468.107-5.775.01c-4.734.008-5.85-.002-6.19-.056z' />
            </svg>

            <span className='yekanBold text-sm'>ثبت سفارش</span>
         </a>

         <a
            style={{
               transitionDuration: '2s',
               transform: enterEffect ? 'translateX(0px)' : 'translateX(-70px)',
               opacity: enterEffect,
            }}
            aria-label='تلگرام'
            id='telegram'
            href='https://t.me/asadigraphics'
            className='fixed bottom-5 delay-[1s] left-5 z-20 flex items-center gap-2 rounded-lg border-2 border-sky-500 bg-gradient-to-b from-white to-slate-200 py-1 pl-9 pr-1 shadow-md shadow-sky-300 xl:rounded-xl xl:py-2 xl:pl-12 xl:pr-2'
            title='تلگرام با پشتیبانی'
            target='_blank'
            rel='noreferrer'
         >
            <svg
               xmlns='http://www.w3.org/2000/svg'
               width='32'
               height='32'
               className='absolute left-0 top-0 h-8 w-8 xl:h-9 xl:w-9'
               viewBox='0 0 32 32'
               fill='none'
            >
               <rect width='32' height='32' fill='url(#pattern0)' />
               <defs>
                  <pattern
                     id='pattern0'
                     patternContentUnits='objectBoundingBox'
                     width='1'
                     height='1'
                  >
                     <use xlinkHref='#image0_252_64' transform='scale(0.01)' />
                  </pattern>
                  <image
                     id='image0_252_64'
                     width='100'
                     height='100'
                     xlinkHref='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAABkCAYAAABw4pVUAAAACXBIWXMAAAsTAAALEwEAmpwYAAAJR0lEQVR4nO1daYwcRxUuQyAhHIEgxA0hAgSEQ2BA4Vwg9kzVrM0htIRDREgQFEIgIJC4JBxOGRAKgcjBOQSKiEBOCBAbe/u9McPhBBESQSDkgMQmDk6y2Zn3eh2H+Ahu9Hp25dn1VE9f0z3TW5/U/2arXvXr+t6rd9Qq5eDg4ODg4ODg4ODg4ODg4ODg4ODgUA5qTf+1Bvk8g7TJAP/UIH1HQ/vUksRZnphozTxOI31MI99ikIN+jwb6mfyubFkrjdq0/3yDdL5B9m2KWPJsUUGwomy5q4UgWNHAjjbIv9ZI/4upiJ7HP73sJVQCemv7CRrpExro9uRKWERdUPZaxhoG515ogL9vkOeyKOLIQ52y1zS2tKSBt6ajpYgH6FDZyxsbvH3H7OMN0DlZaEkDsQb6rkHe3V8hfHfZ6xwLb0kjfy8TLQHfbKBz1mrv3sdObQoerZEOWH73+7LXO7LQSG+UA5xGejjVbhA6A0Lt0dped3bS81dG/N2Gclc9koc4/6PhF53eFvgG+IL6Nj6p3xwG+MyInXRm8aseQUyif7JBWi9eTgaDfJsBOldoKWou2QW2MWT3qGWLIFhhmv5qDbw5rbfUpTO6utHkt8ad1iD/0aLQgxOtXcep5YaJ1q7jDNIZGvnvw6IlG6Y2BY/UyA9alPsXtZyw2uPnZaWl0OWNQUs2THqdl0ZQ3mVqOXlLBuhQnt5SGsjOjFDIOaqq0FuDY8PFA9+UgZbmhJZkZ+Ul13z0t+98je2d16uqYRXMPiNMAAG1y6KlKGjk39l2YaXyIZOev1IjXz4KtBTp1VlyI5K8UpWhJeS/ZqMl2libnn1RIZFhq/3gn6hxRW2682wN/E0NNJtBEbdqpLOz0EQd+S0a+ULdaj8rzu8b4L/HTpP8WbUsvSXkLdrza1loSeyURr7CAB2WcevYeV2cv+u63Bb5PH6bGhdaqnv8IQN0Y1ZvaRLmXpBFlpU3BI8ywJ/RwHt7xj4v7t8bJK8/XdHhyS3+k9Qoo9GaeZoG/3Ma+D+pFQF0h4yRx2I10MRRJ3vgCxKO0ZdiNdCdagy8pYNpFaGRd2jwpyRMkVWeeXq6fIGeepR9WRLaa2yn50Z8OFeqUUKYsAF/SgNfm3438APiLdW3d07JQ6YuPdG5S+hpYa4fr1sXPCLJeNrjd0Uo5ItqFLC2+cBThVIkbZl6NwDdKWPUpv0T85JLIrfWfAjQlROt4JikY2rgr9rWIPl5VSbCjBnQRgP00CjQ0gImm+1nhvRknZeuTqMMgYT4bePKh6mKhlCAvEA5DWcw0g91Xxi9LG/ZhJ5C2rMrY1o8vrRzGOQ9I1HUcBrOPVkDrTPI96RWBNIuOTgNwzXU0GkYpH8NmN/LkjiSHWCnXN6sioJG+kCW07QG+o0YwzxpaXHKln8VY1e21lyz53iVAfOlpbY5vqKKgPHo4+mUwP/VSJfkTUsLkAiuRv5GHPslXl8eEVjxoqzzNPmdatiQQJ1B2p9IEch3ibckFDe8SCu9P7ZHB3T9KqQT8phaA11lm2cN0nPUsGGAfhhfEXSDRGzTei9xoJFfKQVosT8Q4Jvy/DAM0k4LJc+qIiBngwFGcn9YgDbkzqHatH+ihDcSFboB3SZhm7xkEEfkqFP+kfcwrYpAND/TTkn0D3P+iVZwTB3pkxqJktkvur2+7f6n5ymLRHEj3sV6VQQ08L8H0NQBaeGSgN0Q5j4tXdUh7Yyb10gCiQ7b5pT8iCoCGuniBMb8Fvma39HiJ2aZs76NTzJIP0+uiPDZnbS+Ki7CvIll3qzpgGReVsIkUlg8BnSpAf/VSeZac82e4yVOJO5ySmXcM8wXE9HoOVdoP6G0d9mN2SDl0J91kz886EBm0D/d2mcRj6ZmGtB+8ZC7b/uWqEr1iSoacuhJalgXCQ3E4iUtfWm1aXqFrZwm9gPU1k16+VDX73XeEPExnK/KgNgGDfSlTJm/7gtshQc75A1p+zVMj6KLqDIPWcIiQwPog6pMSEKnjv6qLA0wOT376k16UxFrNkg/ssmRVyItz4Z6KXq+v0hlaOQHpXSnqHXaylhFjmFGJlJD8guZcyQYVxl0wDQ7psi1WesCgK9To475gOT6LE6AiVBGWCJaIDT6r4nYqReq8Wo97pyVsTw0OPI10iHJqRS9jrBP0SoTf0SNI6Q8PzrHzXHsxo4yZNfIF9lkqjf5VWqckaVqUQN/rSSZr7fSZ4bc/EggMuOG0Y+42kXLKx6UNeINdKMad3QNfjpjvmZA+EXOR3nWdAkk/Rxh0y5VVUDKRv4/DHZNw2v2dkrRQ16yhsXh9o/kbFUFRFX+mRT2Q1K0orAe43+XNNTkIavE3+wyVeR+RQko5mU/auFlMvTPo/+GZmSerLL2KnrJ7nh4GH2LpSHJtUga6UC/xYeudEStmAQe4zbg2GxS3wLt0H7wzapK0EDfymI/GtJSFq+eeF9a7yzKAZEzlargnbep7IcJa3eTJMxof5oitjp03hehkE+rSiEIVnSNb3z7MX8m2JjU/nQpRtLQdEYSEQ3QtyPoMPeijtIxf7NbMOBFHhT7ITVRUh+cShk9hjhJ7MkgNS0yHc6rEnKkIMmlwS+Rd4RVKMD/iEFtewfaFaDDGvhTceSzXmwDdIeqIsLrjYDvHcD/nga6b/BO4rvFzZWOKatntJhyvjy4FMkq0yZVVURFUk1sKuK/yQUEC2NK+VGc+1E08g9s5TsG+d0R1Pd5VVXILXAmk0LIk5uol46rm+2XWDudFtPPxn5Nnwb561aFyGUFVcV8C1o7pUI2ROWzJXwSx5OTisSl48h979bfb937FFVl6KS01T2DxLp1QXo2+odWltoU3tzb6hZh23arqkND+9QEFLVfNzvvTdEXODiNDNSStPP8PV02xf1SLQeYsHhuoDJm0kZYu/0l9KcYO+VaKQaM+E3s+1DGGvXtnVMGFFnfmjXPERZdIP82pb2aN+jFVryUCu35tX4FdxroF3m1UU9dt/sxUQZ7AKUdzNpqMXaYkCpzj9ZK7j38pypDKKKW+1jCu7qS7g7kK/KWxaEnShD2sMRVBtB9efYrOtjbq61F1D3PvoZHb+47hsNQlPIF2/8TkSvDpRU772kd4vS+dEtGN4itkIym5GGS3qXl4ODg4ODg4ODg4ODg4ODg4ODg4KCKxP8BP3SNbtWtjpUAAAAASUVORK5CYII='
                  />
               </defs>
            </svg>

            <span className='yekanBold text-sm'>ثبت سفارش</span>
         </a>
      </header>
   )
})

Header.displayName = 'Header'

export default Header
