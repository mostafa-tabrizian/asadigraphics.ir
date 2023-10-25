import Link from 'next/link'
import Image from 'next/image'
import dynamic from 'next/dynamic'

import dbConnect from '@/lib/dbConnect'
import Slide from '@/models/slide'
import NewSlide from './components/newSlide'

const Breadcrumbs = dynamic(() => import('@mui/material/Breadcrumbs'), { ssr: false })
const Delete = dynamic(() => import('./components/delete'), { ssr: false })
const ActiveStatus = dynamic(() => import('./components/activeStatus'), { ssr: false })

export const revalidate = 0

export const metadata = {
   title: 'اسدی گرافیک | پنل ادمین | اسلاید ها',
}

const getSlides = async () => {
   await dbConnect()
   return await Slide.find()
}

const AdminSlides = async () => {
   const slides = (await getSlides()).reverse()

   return (
      <div className='relative mx-6 my-16 max-w-screen-lg space-y-10 md:mx-auto'>
         <Breadcrumbs aria-label='breadcrumb'>
            <Link className='text-gray-400' href='/'>
               صفحه اصلی
            </Link>
            <Link className='text-gray-400' href='/--admin--'>
               ادمین
            </Link>
            <h5 className='font-semibold'>اسلاید ها</h5>
         </Breadcrumbs>

         <NewSlide />

         <hr />

         <div className='grid grid-cols-1 gap-5 md:grid-cols-2'>
            {slides.length ? (
               slides.map((slide) => {
                  return (
                     <div key={slide._id} className='relative'>
                        <Delete
                           params={JSON.parse(JSON.stringify({ _id: slide._id, src: slide.src }))}
                        />
                        <ActiveStatus
                           params={JSON.parse(
                              JSON.stringify({ _id: slide._id, active: slide.active }),
                           )}
                        />
                        <Link
                           target='_blank'
                           href={`https://tabrizian.storage.iran.liara.space/asadi_designs/slides/${slide.src}`}
                        >
                           <Image
                              className='aspect-video rounded-xl object-contain'
                              src={`https://tabrizian.storage.iran.liara.space/asadi_designs/slides/${slide.src}`}
                              alt={slide.alt}
                              width={690}
                              height={388.125}
                              loading='lazy'
                           />
                        </Link>

                        <Link href={`/${slide.link}`} target='_blank'>
                           <div className='absolute bottom-4 right-2 flex flex-col rounded bg-white/40 p-1'>
                              <span className='text-right'>
                                 <strong>{slide.alt}</strong>
                              </span>
                              <span className='text-right'>
                                 <strong>{slide.link}</strong>
                              </span>
                           </div>
                        </Link>
                     </div>
                  )
               })
            ) : (
               <span className='text-slate-400'>هیچ اسلایدی وجود ندارد!</span>
            )}
         </div>
      </div>
   )
}

export default AdminSlides
