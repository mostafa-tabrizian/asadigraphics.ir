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
            className='col-span-1 hover:cursor-pointer flex justify-center'
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
                  className='rounded-md object-cover w-40 h-10'
                  src={`https://tabrizian.storage.iran.liara.space/asadi_designs/designs/${cover}`}
                  alt={_id}
                  height={50}
                  width={50}
               />
            ) : (
               <svg
                  className='h-6 w-6 text-slate-700 mx-auto'
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
               <div className='p-5 relative text-center space-y-5'>
                  <div
                     className='overflow-hiddenrelative rounded-xl mx-auto flex justify-center border'
                     style={{ width: '484px', height: '138px' }}
                  >
                     {preview ? (
                        <div className='w-full rounded-xl relative py-8 px-3 items-center shadow-[0_6px_10px_0_#00000040]'>
                           <div className='grid justify-center relative z-10'>
                              <h2 className='text-white' style={{ textShadow: '0 0 5px black' }}>
                                 {name}
                              </h2>
                              <div className='flex items-center gap-3 p-1 justify-center'>
                                 <svg
                                    className='h-3 w-3 bg-white rounded-full text-black'
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
                                    className='text-white yekan'
                                    style={{ textShadow: '0 0 5px black' }}
                                 >
                                    مشاهده طرح ها
                                 </span>
                              </div>
                           </div>
                           <div className='rounded-xl'>
                              <Image
                                 className='object-cover rounded-xl border border-gray-600 blur-[2px]'
                                 src={`https://tabrizian.storage.iran.liara.space/asadi_designs/designs/${preview}`}
                                 fill
                                 alt={name}
                                 sizes='(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw'
                              />
                              <span className='absolute rounded-xl top-0 left-0 h-full w-full bg-gradient-to-t from-black/50 to-black/30'></span>
                           </div>
                        </div>
                     ) : (
                        <span className='font-semibold flex items-center'>پیش نمایش</span>
                     )}
                  </div>

                  {designsImages.length ? (
                     <div className='grid grid-cols-8 gap-1 mb-5'>
                        {designsImages.map((image) => {
                           return (
                              <Image
                                 onClick={() => setPreview(image)}
                                 key={image}
                                 className='object-cover rounded-md aspect-square hover:cursor-pointer'
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

                  <div className='flex space-x-5 justify-around'>
                     <button
                        onClick={() => openSettingPanel(false)}
                        className='w-full py-1 rounded bg-slate-300'
                     >
                        لغو
                     </button>
                     <button
                        onClick={handleSubmit}
                        className='w-full py-2 flex justify-center items-center rounded bg-green-600 text-white'
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
