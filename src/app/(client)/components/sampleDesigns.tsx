import Gallery from '@/app/components/gallery'
import { IDesign } from '@/models/design'
import Link from 'next/link'

const SampleDesigns = ({ designs }: { designs: IDesign[] }) => {
   return (
      // border-t-2 border-black/25 rounded-2xl bg-gradient-to-b from-orange-200 to-transparent
      <div>
         <div className='relative mx-auto max-w-screen-sm'>
            <svg
               xmlns='http://www.w3.org/2000/svg'
               className='absolute right-16 top-1 h-14 w-14 text-black/10 md:right-40'
               viewBox='0 0 1024 1024'
               version='1.1'
            >
               <path
                  d='M870.4 448a64 64 0 0 0 0-128h-114.56l26.88-148.48a64 64 0 0 0-126.08-23.04l-32 171.52h-156.8l26.88-148.48a64 64 0 0 0-126.08-23.04l-32 171.52H198.4a64 64 0 1 0 0 128h116.16l-23.36 128H153.6a64 64 0 0 0 0 128h114.56l-26.88 148.48a64 64 0 1 0 126.08 23.04l32-171.52h157.76l-26.88 148.48a64 64 0 1 0 126.08 23.04l32-171.52h137.28a64 64 0 1 0 0-128h-116.16l23.36-128z m-291.2 128h-157.76l23.36-128h157.76z'
                  fill='currentColor'
               />
            </svg>
            <h2 className='mx-5 my-10 rounded-2xl border-black/25 bg-gradient-to-br from-[#FF7A0094] to-orange-100 py-5 text-center shadow-[0_6px_10px_0_#00000040]'>
               نمونه طراحی ها
            </h2>
         </div>
         <div className='relative mx-5 min-h-[50vh]'>
            <Gallery designs={JSON.parse(JSON.stringify(designs))} />
            <span className='pointer-events-none absolute bottom-0 min-h-[50vh] w-full rounded-xl bg-gradient-to-t from-[#F2F2F2] to-transparent'></span>
            <Link
               href='/search/all?type=all&name=تمامی+طرح+ها'
               className='flex w-full justify-center'
            >
               <span className='yekanBold absolute bottom-0 rounded-full border-2 border-black bg-[#F2F2F2] px-3  py-1'>
                  نمایش بیشتر
               </span>
            </Link>
         </div>
      </div>
   )
}

export default SampleDesigns
