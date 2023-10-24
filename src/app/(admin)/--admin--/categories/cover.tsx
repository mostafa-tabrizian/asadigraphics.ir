'use client'

import { IDesign } from '@/models/design'
import dynamic from 'next/dynamic'
import Image from 'next/image'
import { useState, useRef } from 'react'
import { toast } from 'react-toastify'
import { useRouter } from 'next/navigation'

const CircularProgress = dynamic(() => import('@mui/material/CircularProgress'), { ssr: false })
const Dialog = dynamic(() => import('@mui/material/Dialog'), { ssr: false })

const Cover = ({
   params: { _id, name, cover },
}: {
   params: { _id: string; name: string; cover: string }
}) => {
   const [settingPanel, openSettingPanel] = useState(false)
   const [preview, setPreview] = useState(cover)
   const [designsImages, setDesignsImages] = useState<string[]>([])
   const [loading, setLoading] = useState(false)

   const importDialog = useRef(false)

   const router = useRouter()

   const dialogImportedFetchDesignsImages = async () => {
      const designsImages = await getDesignsImages()
      setDesignsImages(designsImages)
   }

   const getDesignsImages = async () => {
      const res = await fetch(`/api/--admin--/design?id=${_id}`)
      const designs: IDesign[] = await res.json()

      const designsImages: string[] = []

      designs?.length
         ? designs.reverse().map((design) => {
              designsImages.push(design.frontSrc)
              design.backSrc && designsImages.push(design.backSrc)
              design.gallery.length &&
                 design.gallery.forEach((image: string) => {
                    designsImages.push(image)
                 })
           })
         : []

      return designsImages
   }

   const handleSubmit = async () => {
      setLoading(true)
      toast.info('در حال ثبت تغییرات...')

      const payload = {
         _id,
         cover: preview,
      }

      try {
         const res = await fetch('/api/--admin--/category', {
            method: 'PUT',
            body: JSON.stringify(payload),
         })

         const resData = await res.json()

         if (!res.ok) throw new Error()
         else if (resData.status == 500) {
            console.error(resData.message)
            return toast.error('خطا در برقراری ارتباط')
         }

         fetch('/api/--admin--/revalidate?path=/')

         router.refresh()

         openSettingPanel(false)

         return toast.success('کاور دسته بندی با موفقیت تغییر یافت')
      } catch (err) {
         toast.error('در تغییر کاور دسته بندی خطایی رخ داد')
         return console.error(err)
      } finally {
         setLoading(false)
      }
   }

   return (
      <>
         <div
            className='col-span-1 flex justify-center hover:cursor-pointer'
            onClick={() => {
               if (!importDialog.current) {
                  dialogImportedFetchDesignsImages()
                  importDialog.current = true
               }

               openSettingPanel(true)
            }}
         >
            {cover ? (
               <Image
                  className='h-10 w-40 rounded-md object-cover'
                  src={`https://tabrizian.storage.iran.liara.space/asadi_designs/designs/${cover}`}
                  alt={_id}
                  height={50}
                  width={50}
               />
            ) : (
               <svg
                  className='mx-auto h-6 w-6 text-slate-700'
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
                  <path stroke='none' d='M0 0h24v24H0z' /> <line x1='15' y1='8' x2='15.01' y2='8' />{' '}
                  <rect x='4' y='4' width='16' height='16' rx='3' />{' '}
                  <path d='M4 15l4 -4a3 5 0 0 1 3 0l 5 5' />{' '}
                  <path d='M14 14l1 -1a3 5 0 0 1 3 0l 2 2' />
               </svg>
            )}
         </div>

         {importDialog.current && (
            <Dialog onClose={() => openSettingPanel(false)} open={settingPanel}>
               <div className='relative space-y-5 p-5 text-center'>
                  <div
                     className='overflow-hiddenrelative mx-auto flex justify-center rounded-xl border'
                     style={{ width: '484px', height: '138px' }}
                  >
                     {preview ? (
                        <div className='relative w-full items-center rounded-xl px-3 py-8 shadow-[0_6px_10px_0_#00000040]'>
                           <div className='relative z-10 grid justify-center'>
                              <h2 className='text-white' style={{ textShadow: '0 0 5px black' }}>
                                 {name}
                              </h2>
                              <div className='flex items-center justify-center gap-3 p-1'>
                                 <svg
                                    className='h-3 w-3 rounded-full bg-white text-black'
                                    fill='none'
                                    viewBox='0 0 24 24'
                                    stroke='currentColor'
                                 >
                                    <path
                                       strokeLinecap='round'
                                       strokeLinejoin='round'
                                       strokeWidth='2'
                                       d='M15 19l-7-7 7-7'
                                    />
                                 </svg>
                                 <span
                                    className='yekan text-white'
                                    style={{ textShadow: '0 0 5px black' }}
                                 >
                                    مشاهده طرح ها
                                 </span>
                              </div>
                           </div>
                           <div className='rounded-xl'>
                              <Image
                                 className='rounded-xl border border-gray-600 object-cover blur-[2px]'
                                 src={`https://tabrizian.storage.iran.liara.space/asadi_designs/designs/${preview}`}
                                 fill
                                 alt={name}
                                 sizes='(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw'
                              />
                              <span className='absolute left-0 top-0 h-full w-full rounded-xl bg-gradient-to-t from-black/50 to-black/30'></span>
                           </div>
                        </div>
                     ) : (
                        <span className='flex items-center font-semibold'>پیش نمایش</span>
                     )}
                  </div>

                  {designsImages.length ? (
                     <div className='mb-5 grid grid-cols-8 gap-1'>
                        {designsImages.map((image) => {
                           return (
                              <Image
                                 onClick={() => setPreview(image)}
                                 key={image}
                                 className='aspect-square rounded-md object-cover hover:cursor-pointer'
                                 src={`https://tabrizian.storage.iran.liara.space/asadi_designs/designs/${image}`}
                                 loading='lazy'
                                 width={100}
                                 height={100}
                                 alt={image}
                              />
                           )
                        })}
                     </div>
                  ) : (
                     <CircularProgress color='info' size={30} />
                  )}

                  <div className='flex justify-around space-x-5'>
                     <button
                        onClick={() => openSettingPanel(false)}
                        className='w-full rounded bg-slate-300 py-1'
                     >
                        لغو
                     </button>
                     <button
                        onClick={handleSubmit}
                        className='flex w-full items-center justify-center rounded bg-green-600 py-2 text-white'
                     >
                        {loading ? <CircularProgress color='inherit' size={25} /> : 'دخیره'}
                     </button>
                  </div>
               </div>
            </Dialog>
         )}
      </>
   )
}

export default Cover
