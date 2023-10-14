'use client'

import Image from 'next/image'
import dynamic from 'next/dynamic'

import PhotoAlbum from 'react-photo-album'

import { IDesign } from '@/models/design'
import { useState } from 'react'
const UseLightbox = dynamic(() => import('./useLightbox'))

export interface IPhoto {
   src: string
   backSrc: string
   gallery: [string]
   width: number
   height: number
   alt: string
}

const Gallery = ({ designs }: { designs: IDesign[] }) => {
   const [designData, setDesignData] = useState<IPhoto | null>(null)

   return (
      <>
         <PhotoAlbum
            layout='columns'
            columns={(containerWidth) => {
               if (containerWidth < 600) return 2
               return 3
            }}
            onClick={({ photo }) => {
               setDesignData(photo)
               // @ts-ignore
               window.dataLayer = window.dataLayer || []

               // @ts-ignore
               window.dataLayer.push({
                  event: 'click_design',
                  // eslint-disable-next-line camelcase
                  design_name: photo.alt,
               })
            }}
            photos={designs.map(({ name, frontSrc, backSrc, gallery, width, height }) => {
               return {
                  src: `https://tabrizian.storage.iran.liara.space/asadi_designs/designs/${frontSrc}`,
                  backSrc: backSrc,
                  gallery,
                  width,
                  height,
                  alt: name,
               }
            })}
            renderPhoto={({ photo, imageProps: { alt, title, sizes, onClick }, wrapperStyle }) => {
               return (
                  <div
                     style={{ ...wrapperStyle, position: 'relative' }}
                     className='transition-opacity'
                  >
                     <Image
                        className={`rounded-xl border ${
                           photo.backSrc ? 'hover:opacity-0 active:opacity-0' : ''
                        } transition-opacity duration-300`}
                        src={photo}
                        {...{ alt, title, sizes, onClick }}
                     />
                     {photo.backSrc ? (
                        <div>
                           <svg
                              className='h-5 w-5 text-[#f2f2f2] absolute top-0 left-0 m-2'
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
                              <rect x='8' y='4' width='12' height='12' rx='2' />{' '}
                              <path d='M16 16v2a2 2 0 0 1 -2 2h-8a2 2 0 0 1 -2 -2v-8a2 2 0 0 1 2 -2h2' />
                           </svg>
                           <Image
                              className='rounded-xl absolute top-0 left-0 opacity-0 transition-opacity duration-300 hover:opacity-100 active:opacity-100'
                              src={`https://tabrizian.storage.iran.liara.space/asadi_designs/designs/${photo.backSrc}`}
                              width={photo.width}
                              height={photo.height}
                              {...{ alt, title, sizes, onClick }}
                           />
                        </div>
                     ) : (
                        ''
                     )}
                  </div>
               )
            }}
         />
         {designData ? <UseLightbox designData={designData} setDesignData={setDesignData} /> : ''}
      </>
   )
}

export default Gallery
