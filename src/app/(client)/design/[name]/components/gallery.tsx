'use client'

import { IDesign } from '@/models/design'
import dynamic from 'next/dynamic'
import Image from 'next/image'
import { useState } from 'react'

const UseLightbox = dynamic(() => import('@/app/components/useLightbox'), { ssr: false })

export interface IPhoto {
   src: string
   backSrc: string
   gallery: [string]
   width: number
   height: number
   alt: string
}

const Gallery = ({ detail, images }: { detail: IDesign; images: string[] }) => {
   const [designData, setDesignData] = useState<IPhoto | null>(null)

   return (
      <>
         {designData ? <UseLightbox designData={designData} setDesignData={setDesignData} /> : ''}

         <div>
            <h2 className='text-sm yekan mb-4'>گالری تصاویر:</h2>
            <div className='flex gap-2 pb-2 overflow-x-scroll items-center styled-scrollbars'>
               {images?.map((image, idx) => {
                  const photo = {
                     src: `https://tabrizian.storage.iran.liara.space/asadi_designs/designs/${image}`,
                     backSrc: detail.backSrc,
                     gallery: detail.gallery,
                     width: detail.width,
                     height: detail.height,
                     alt: detail.name,
                  }

                  return (
                     <Image
                        key={idx}
                        onClick={() => setDesignData(photo as IPhoto)}
                        src={`https://tabrizian.storage.iran.liara.space/asadi_designs/designs/${image}`}
                        alt={detail.name}
                        width={76}
                        height={76}
                        className='rounded-lg w-auto max-w-full h-full'
                     />
                  )
               })}
            </div>
         </div>
      </>
   )
}

export default Gallery
