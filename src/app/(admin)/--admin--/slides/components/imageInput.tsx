import NextImage from 'next/image'

const Button = dynamic(() => import('@mui/material/Button'), {
   ssr: false,
   loading: () => <span className='px-4'>لطفا صبر کنید...</span>,
})

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
      const handleSlideImageSelect = async (files: FileList | null) => {
         if (!files) return

         const filesList: File[] = Object.values(files)

         const filesTypeValidation = await import('@/lib/filesTypeValidation').then(
            (mod) => mod.default,
         )
         const typeCheckRes = filesTypeValidation(filesList)
         if (!typeCheckRes) return

         const filesSizeValidation = await import('@/lib/filesSizeValidation').then(
            (mod) => mod.default,
         )
         const sizeCheckRes = filesSizeValidation(filesList)
         if (!sizeCheckRes) return

         const dimentionCalculate = await import('./dimentionCalculate').then((mod) => mod.default)
         const dimentionCheckRes = await dimentionCalculate(filesList[0])
         if (!dimentionCheckRes) {
            const toast = await import('react-toastify').then((mod) => mod.toast)
            return toast.error('ابعاد اسلاید می‌بایست 16:9 باشد')
         }

         setSlideImageToUpload(files)
      }

      const dragOverHandler = (event: React.DragEvent<HTMLDivElement>) => event.preventDefault()

      return (
         <div className='mx-auto flex w-fit rounded-xl border-2 border-slate-200 bg-slate-100 text-sm'>
            {slideImageToUploadMemo?.length ? (
               <NextImage
                  className='aspect-video h-auto rounded-xl object-contain'
                  src={URL.createObjectURL(slideImageToUploadMemo[0])}
                  alt={slideImageToUploadMemo[0].name}
                  width={816}
                  height={459}
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
                  <Button type='button' component='label' sx={{ width: '100%', padding: '.5rem' }}>
                     <span className='yekan text-sm'>انتخاب تصویر اسلاید</span>
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
