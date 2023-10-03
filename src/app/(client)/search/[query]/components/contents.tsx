'use client'

import { IDesign } from '@/models/design'

import Image from 'next/image'
import PhotoAlbum from 'react-photo-album'

const Contents = ({
   params: { designs },
}: {
   params: {
      designs: IDesign[]
   }
}) => {
   return (
      <div>
         <div className=''>
            <PhotoAlbum
               layout='columns'
               columns={2}
               photos={designs.map(({ frontSrc, width, height }) => {
                  return {
                     src: `https://tabrizian.storage.iran.liara.space/asadi_designs/designs/${frontSrc}`,
                     width,
                     height,
                  }
               })}
               //    renderPhoto={({
               //       photo,
               //       imageProps: { alt, title, sizes, className, onClick },
               //       wrapperStyle,
               //    }) => {
               //       return (
               //          <div style={{ ...wrapperStyle, position: 'relative' }}>
               //             <Image
               //                fill
               //                src={photo}
               //                placeholder={'blurDataURL' in photo ? 'blur' : undefined}
               //                {...{ alt, title, sizes, className, onClick }}
               //             />
               //          </div>
               //       )
               //    }}
            />
         </div>
      </div>
   )
}

export default Contents
