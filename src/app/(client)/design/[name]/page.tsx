import dbConnect from '@/lib/dbConnect'
import dehyphen from '@/lib/dehyphen'

import Design, { IDesign } from '@/models/design'

import dynamic from 'next/dynamic'
import Image from 'next/image'
import Script from 'next/script'

import Back from './components/back'
const Gallery = dynamic(() => import('./components/gallery'))

const DesignNotFound = dynamic(() => import('./components/designNotFound'))

const getDesignDetailDate = async (name: string) => {
   name = dehyphen(decodeURI(name))

   await dbConnect()
   return await Design.findOne({
      name,
      active: true,
   }).exec()
}

export const generateMetadata = async ({ params: { name } }: { params: { name: string } }) => {
   const detail: IDesign = await getDesignDetailDate(name)

   return {
      title: (detail?.name || '404') + ' | اسدی گرافیک',
      description:
         detail?.description ||
         'ما در اسدی گرافیک با ارائه طرح‌هایی قبیل لوگو، پوستر، بنر و کارت ویزیت با دیزاین منحصر به فرد و اختصاصی برای شما که بازتابی از شخصیت و سلیقه‌ی شما خواهد بود تحویل میدهیم',
      alternates: {
         canonical: `https://asadigraphics.ir/design/${detail?.name || '404'}`,
      },
   }
}

const DesignDetail = async ({ params: { name } }: { params: { name: string } }) => {
   const detail: IDesign = await getDesignDetailDate(name)

   let creativeWorkJsonLd, breadcrumbJsonLd

   if (detail) {
      creativeWorkJsonLd = {
         '@context': 'http://schema.org',
         '@type': 'CreativeWork',
         name: detail.name,
         description:
            detail.description ||
            'ما در اسدی گرافیک با ارائه طرح‌هایی قبیل لوگو، پوستر، بنر و کارت ویزیت با دیزاین منحصر به فرد و اختصاصی برای شما که بازتابی از شخصیت و سلیقه‌ی شما خواهد بود تحویل میدهیم',
         image: `https://tabrizian.storage.iran.liara.space/asadi_designs/designs/${detail.frontSrc}`,
         creator: {
            '@type': 'Person',
            name: 'علی اسدی',
         },
         url: `https://asadigraphics.ir/design/${name}`,
         dateCreated: detail.createdAt,
         dateModified: detail.updatedAt,
         keywords: 'طراحی, دیزاین, طراحی لوگو, طراحی بنر, طراحی پوستر، طراحی کارت ویزیت',
         license: 'https://creativecommons.org/licenses/by-nc-sa/4.0/',
         mainEntity: {
            '@type': 'ImageGallery',
            name: `گالری تصاویر طراحی ${detail.name}`,
            description:
               'ما در اسدی گرافیک با ارائه طرح‌هایی قبیل لوگو، پوستر، بنر و کارت ویزیت با دیزاین منحصر به فرد و اختصاصی برای شما که بازتابی از شخصیت و سلیقه‌ی شما خواهد بود تحویل میدهیم',
            image: [detail.frontSrc, detail.backSrc, ...detail.gallery].map(
               (src) => `https://tabrizian.storage.iran.liara.space/asadi_designs/designs/${src}`,
            ),
         },
      }

      breadcrumbJsonLd = {
         '@context': 'https://schema.org',
         '@type': 'BreadcrumbList',
         itemListElement: [
            {
               '@type': 'ListItem',
               position: 1,
               name: 'اسدی دیزاینس',
               item: {
                  '@type': 'Corporation',
                  '@id': 'https://asadigraphics.ir/#corporation',
               },
            },
            { '@type': 'ListItem', position: 2, name: detail.name },
         ],
      }
   }

   return (
      <>
         {detail ? (
            <>
               <Script
                  id='breadcrumb-jsonld'
                  type='application/ld+json'
                  dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
               />

               <Script
                  id='creativeWork-jsonld'
                  type='application/ld+json'
                  dangerouslySetInnerHTML={{ __html: JSON.stringify(creativeWorkJsonLd) }}
               />
            </>
         ) : (
            ''
         )}

         {detail ? (
            <div className='rtl min-h-screen md:relative md:mt-20 md:min-h-[80vh]'>
               <Back />
               <div className='ltr grid-cols-2 md:grid md:gap-16 md:p-4'>
                  <div className='relative h-[363px] w-screen md:h-auto md:w-full md:rounded-3xl'>
                     {detail?.frontSrc ? (
                        <Image
                           priority
                           className='object-cover md:!h-auto md:rounded-3xl md:shadow-[0px_4px_19px_0px_#00000040]'
                           src={`https://tabrizian.storage.iran.liara.space/asadi_designs/designs/${detail.frontSrc}`}
                           alt={detail.name}
                           sizes='(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw'
                           fill
                        />
                     ) : (
                        ''
                     )}
                  </div>
                  <div className='rtl absolute top-[27rem] mx-2 grid justify-center md:relative md:top-0'>
                     <div
                        className='mb-5 w-[96vw] space-y-6 rounded-3xl bg-white px-6 py-8 md:w-full'
                        style={{ boxShadow: '0px 4px 19px 0px rgba(0, 0, 0, 0.25)' }}
                     >
                        <div>
                           <h1 className='mb-2 text-2xl'>{detail.name}</h1>
                           <div className='flex justify-between'>
                              <h2 className='yekan text-sm font-normal'>{detail.client}</h2>
                              <div>
                                 <span>{detail.designedAt}</span>
                              </div>
                           </div>
                        </div>
                        <div>
                           <h2 className='yekan mb-2 text-sm'>توضیحات:</h2>
                           <p className='text-sm'>{detail.description}</p>
                        </div>
                        <div className='flex justify-between'>
                           <h2 className='yekan text-sm'>پالت های رنگی:</h2>
                           <div className='ltr flex gap-2'>
                              {detail.colorPalettes?.split(',')?.map((color, idx) => {
                                 return (
                                    <span
                                       title={color}
                                       key={idx}
                                       className='h-7 w-7 rounded-full'
                                       style={{
                                          background: color,
                                          boxShadow: '0px 0px 4px rgba(0, 0, 0, 0.25)',
                                       }}
                                    ></span>
                                 )
                              })}
                           </div>
                        </div>

                        {[detail?.frontSrc, detail?.backSrc, ...detail.gallery].length ? (
                           <Gallery
                              detail={JSON.parse(JSON.stringify(detail))}
                              images={[detail?.frontSrc, detail?.backSrc, ...detail.gallery]}
                           />
                        ) : (
                           ''
                        )}
                     </div>
                  </div>
               </div>
            </div>
         ) : (
            <DesignNotFound />
         )}
      </>
   )
}

export default DesignDetail
