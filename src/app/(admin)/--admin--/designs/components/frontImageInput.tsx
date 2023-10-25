import Link from 'next/link'
import ImageDelete from './imageDelete'
import Image from 'next/image'
import dynamic from 'next/dynamic'
import { memo } from 'react'
const Button = dynamic(() => import('@mui/material/Button'), { ssr: false })

const FrontImageInput = memo(
   ({
      design: { frontSrc, _id, width, height },
      frontPrevMemo,
      dragOverHandler,
      dropHandlerDesign,
      onFileSelected,
      loading,
   }: {
      design: {
         frontSrc: string
         _id: string
         width: number
         height: number
      }
      frontPrevMemo: File[] | null
      dragOverHandler: (event: React.DragEvent<HTMLDivElement>) => void
      dropHandlerDesign: (event: React.DragEvent<HTMLDivElement>, type: string) => void
      onFileSelected: (files: FileList | null, type: string) => void
      loading: boolean
   }) => {
      return (
         <div className='space-y-6'>
            {frontSrc ? (
               <div>
                  <span className='yekan text-slate-400'>تصویر جلو طرح</span>

                  <div className='relative'>
                     <Link
                        target='_blank'
                        href={`https://tabrizian.storage.iran.liara.space/asadi_designs/designs/${frontSrc}`}
                     >
                        <div className='mx-auto flex justify-center'>
                           <Image
                              className='rounded-lg p-1'
                              src={`https://tabrizian.storage.iran.liara.space/asadi_designs/designs/${frontSrc}`}
                              alt={_id}
                              width={width}
                              height={height}
                              loading='lazy'
                           />
                        </div>
                     </Link>

                     <ImageDelete type='front' design={_id} imageKey={frontSrc} />
                  </div>
               </div>
            ) : (
               <>
                  {frontPrevMemo?.length ? (
                     <div>
                        <span className='yekan text-slate-400'>پیش نمایش تصویر جلو برای آپلود</span>

                        {frontPrevMemo.map((imageData: File) => {
                           return (
                              <Image
                                 key={imageData.name}
                                 className='rounded-xl object-contain'
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
                  ) : (
                     ''
                  )}

                  <div
                     onDrop={(e) => dropHandlerDesign(e, 'front')}
                     onDragOver={dragOverHandler}
                     className='w-full rounded-lg border-2 border-slate-200 bg-slate-100 text-sm'
                  >
                     <Button
                        type='button'
                        // @ts-ignore
                        component='label'
                        sx={{ width: '100%', padding: '.5rem' }}
                     >
                        <span className='yekan text-sm'>انتخاب جلو طرح</span>
                        <input
                           hidden
                           accept='image/*'
                           type='file'
                           name='frontPreview'
                           onChange={(e) => onFileSelected(e?.target?.files, 'front')}
                           disabled={loading}
                        />
                     </Button>
                  </div>
               </>
            )}
         </div>
      )
   },
)

FrontImageInput.displayName = 'FrontImageInput'

export default FrontImageInput
