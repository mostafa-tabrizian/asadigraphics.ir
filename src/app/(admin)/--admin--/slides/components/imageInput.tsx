import Image from 'next/image'

const Button = dynamic(() => import('@mui/material/Button'), { ssr: false })

import filesSizeValidation from '@/lib/filesSizeValidation'
import filesTypeValidation from '@/lib/filesTypeValidation'
import { Dispatch, SetStateAction, memo } from 'react'
import dynamic from 'next/dynamic'

const ImageInput = memo(
   ({
      setSlideImageToUpload,
      slideImageToUploadMemo,
      isSubmitting,
   }: {
      setSlideImageToUpload: Dispatch<SetStateAction<FileList | null>>
      slideImageToUploadMemo: File[] | null
      isSubmitting: boolean
   }) => {
      const handleSlideImageSelect = (files: FileList | null) => {
         if (!files) return

         const filesList: File[] = Object.values(files)

         const typeCheckRes = filesTypeValidation(filesList)
         if (!typeCheckRes) return

         const sizeCheckRes = filesSizeValidation(filesList)
         if (!sizeCheckRes) return

         setSlideImageToUpload(files)
      }

      const dragOverHandler = (event: React.DragEvent<HTMLDivElement>) => event.preventDefault()

      return (
         <div className='mx-auto flex w-fit rounded-xl border-2 border-slate-200 bg-orange-100 text-sm'>
            {slideImageToUploadMemo?.length ? (
               <Image
                  className='aspect-video rounded-xl object-contain'
                  src={URL.createObjectURL(slideImageToUploadMemo[0])}
                  alt={slideImageToUploadMemo[0].name}
                  width={690}
                  height={388.125}
               />
            ) : (
               <div
                  onDrop={(e) => {
                     e.preventDefault()
                     handleSlideImageSelect(e.dataTransfer.files)
                  }}
                  onDragOver={dragOverHandler}
               >
                  {/* @ts-ignore */}
                  <Button component='label' sx={{ width: '100%', padding: '.5rem' }}>
                     <span>انتخاب تصویر اسلاید</span>
                     <input
                        hidden
                        accept='image/*'
                        type='file'
                        name='slideImages'
                        onChange={(e) => handleSlideImageSelect(e.target.files)}
                        disabled={isSubmitting}
                     />
                  </Button>
               </div>
            )}
         </div>
      )
   },
)

ImageInput.displayName = 'ImageInput'

export default ImageInput
