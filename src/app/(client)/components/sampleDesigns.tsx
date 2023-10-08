import Gallery from '@/app/components/gallery'
import { IDesign } from '@/models/design'
import Link from 'next/link'

const SampleDesigns = ({ designs }: { designs: IDesign[] }) => {
   return (
      <div className='border-t-2 border-black/25 rounded-2xl bg-gradient-to-b from-orange-200 to-transparent'>
         <h2 className='my-10 text-center'>نمونه طراحی ها</h2>
         <div className='mx-5 relative min-h-[50vh]'>
            <Gallery designs={JSON.parse(JSON.stringify(designs))} />
            <span className='bg-gradient-to-t from-[#F2F2F2] rounded-xl to-transparent absolute bottom-0 min-h-[50vh] w-full'></span>
            <Link href='/search/all?type=all&name=تمامی+طرح+ها' className='flex w-full justify-center'>
               <span className='border-2 border-black rounded-full yekanBold px-3 py-1 absolute bottom-0  bg-[#F2F2F2]'>
                  نمایش بیشتر
               </span>
            </Link>
         </div>
      </div>
   )
}

export default SampleDesigns
