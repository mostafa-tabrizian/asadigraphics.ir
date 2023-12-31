'use client'

import Image from 'next/image'
import dynamic from 'next/dynamic'

const PhotoAlbum = dynamic(() => import('react-photo-album'), { ssr: false })

import { IDesign } from '@/models/design'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import hyphen from '@/lib/hyphen'

export interface IPhoto {
   src: string
   backSrc: string
   gallery: [string]
   width: number
   height: number
   alt: string
}

const Gallery = ({ designs }: { designs: IDesign[] }) => {
   const [designsList, setDesignsList] = useState<IPhoto[]>([])

   useEffect(() => {
      const designsListBeta: IPhoto[] = []

      designs.forEach(({ name, frontSrc, backSrc, gallery, width, height }) => {
         if (!frontSrc) return

         designsListBeta.push({
            src: `https://tabrizian.storage.iran.liara.space/asadi_designs/designs/${frontSrc}`,
            backSrc: backSrc,
            gallery,
            width,
            height,
            alt: name,
         })
      })

      setDesignsList(designsListBeta)

      return () => {
         setDesignsList([])
      }
   }, [designs])

   return (
      <>
         <PhotoAlbum
            layout='columns'
            columns={(containerWidth) => {
               if (containerWidth < 600) return 2
               return 3
            }}
            photos={designsList}
            renderPhoto={({ photo, imageProps: { alt, title, sizes, onClick }, wrapperStyle }) => {
               return (
                  <Link id='design' href={`/design/${hyphen(photo.alt as string)}`}>
                     <div
                        style={{ ...wrapperStyle, position: 'relative' }}
                        className='transition-opacity'
                     >
                        <Image
                           className={`rounded-xl border ${
                              // @ts-ignore
                              photo.backSrc ? 'hover:opacity-0 active:opacity-0' : ''
                           } transition-opacity duration-300`}
                           src={photo}
                           width={photo.width}
                           height={photo.height}
                           {...{ alt, title, sizes, onClick }}
                        />
                        {/* @ts-ignore */}
                        {photo.backSrc ? (
                           <div>
                              <svg
                                 className='absolute left-0 top-0 m-2 h-5 w-5 text-[#f2f2f2]'
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
                                 className='absolute left-0 top-0 rounded-xl opacity-0 transition-opacity duration-300 hover:opacity-100 active:opacity-100'
                                 // @ts-ignore
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
                  </Link>
               )
            }}
         />
      </>
   )
}

export default Gallery
