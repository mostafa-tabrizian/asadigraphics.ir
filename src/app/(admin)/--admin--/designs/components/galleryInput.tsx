import Link from 'next/link'
import ImageDelete from './imageDelete'
import Image from 'next/image'
import dynamic from 'next/dynamic'
import { memo } from 'react'
const Button = dynamic(() => import('@mui/material/Button'), { ssr: false })

const GalleryInput = memo(
   ({
      design: { gallery, _id, width, height },
      galleryPrevMemo,
      dragOverHandler,
      dropHandlerDesign,
      onFileSelected,
      loading,
   }: {
      design: {
         gallery: string[]
         _id: string
         width: number
         height: number
      }
      galleryPrevMemo: File[] | null
      dragOverHandler: (event: React.DragEvent<HTMLDivElement>) => void
      dropHandlerDesign: (event: React.DragEvent<HTMLDivElement>, type: string) => void
      onFileSelected: (files: FileList | null, type: string) => void
      loading: boolean
   }) => {
      return (
         <>
            <div>
               {gallery.length ? <span className='text-slate-400 yekan'>تصاویر گالری</span> : ''}
               {gallery.map((image: string, idx: number) => {
                  return (
                     <div key={idx} className='relative'>
                        <Link
                           target='_blank'
                           href={`https://tabrizian.storage.iran.liara.space/asadi_designs/designs/${image}`}
                        >
                           <div className='flex justify-center mx-auto'>
                              <Image
                                 className='rounded-lg p-1'
                                 src={`https://tabrizian.storage.iran.liara.space/asadi_designs/designs/${image}`}
                                 alt={_id}
                                 width={width}
                                 height={height}
                                 loading='lazy'
                              />
                           </div>
                        </Link>

                        <ImageDelete type='gallery' design={_id} imageKey={image} />
                     </div>
                  )
               })}
            </div>

            {galleryPrevMemo?.length ? (
               <div>
                  <span className='text-slate-400 yekan'>پیش نمایش تصاویر گالری برای آپلود</span>
                  <div className='space-y-3'>
                     {galleryPrevMemo.map((imageData: File) => {
                        return (
                           <Image
                              key={imageData.name}
                              className='object-contain rounded-xl'
                              src={URL.createObjectURL(imageData)}
                              alt={imageData.name}
                              width='250'
                              height='250'
                              quality={100}
                              loading='lazy'
                           />
                        )
                     })}
                  </div>
               </div>
            ) : (
               ''
            )}

            <div
               onDrop={(e) => dropHandlerDesign(e, 'gallery')}
               onDragOver={dragOverHandler}
               className='w-full text-sm bg-slate-100 border-2 border-slate-200 rounded-lg'
            >
               {/* @ts-ignore */}
               <Button component='label' sx={{ width: '100%', padding: '.5rem' }}>
                  <span className='yekan text-sm'>انتخاب تصاویر گالری</span>
                  <input
                     hidden
                     accept='image/*'
                     type='file'
                     name='galleryPreview'
                     multiple
                     onChange={(e) => onFileSelected(e?.target?.files, 'gallery')}
                     disabled={loading}
                  />
               </Button>
            </div>
         </>
      )
   },
)

GalleryInput.displayName = 'GalleryInput'

export default GalleryInput
