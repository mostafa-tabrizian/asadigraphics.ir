import Gallery from '@/app/components/gallery'
import { IDesign } from '@/models/design'
import Link from 'next/link'
import Image from 'next/image'

const SampleDesigns = ({ designs }: { designs: IDesign[] }) => {
   return (
      // border-t-2 border-black/25 rounded-2xl bg-gradient-to-b from-orange-200 to-transparent
      <div>
         <div className='relative mx-auto max-w-screen-sm'>
            <h2 className='mx-5 relative z-10 my-10 py-5 text-center'>
               نمونه طراحی ها
            </h2>
            <Image
               className='h-auto shadow-lg shadow-orange-200 w-auto max-w-full rounded-xl object-cover'
               src='https://tabrizian.storage.iran.liara.space/asadi_designs/titleRectangle2.jpg'
               alt='پس زمینه عنوان'
               fill
            />
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
