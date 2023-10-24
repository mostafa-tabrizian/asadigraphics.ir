import Image from 'next/image'
import dynamic from 'next/dynamic'

import Category, { ICategory } from '@/models/category'
import Design, { IDesign } from '@/models/design'

import dbConnect from '@/lib/dbConnect'
import dehyphen from '@/lib/dehyphen'

import SearchTitle from './components/title'

import GTMSearch from './GTM/GTMSearch'
import limiter from '@/lib/limiter'
const Gallery = dynamic(() => import('@/app/components/gallery'), {
   ssr: false,
   loading: () => (
      <div className='mx-6 my-16 max-w-screen-lg animate-pulse space-y-8 md:mx-auto'>
         <div className='grid grid-cols-2 gap-3 md:col-span-3 md:grid-cols-3'>
            <div className='h-60 rounded bg-gray-200 md:h-80'></div>
            <div className='h-60 rounded bg-gray-200 md:h-80'></div>
            <div className='h-60 rounded bg-gray-200 md:h-80'></div>
            <div className='h-60 rounded bg-gray-200 md:h-80'></div>
            <div className='hidden h-80 rounded bg-gray-200 md:block'></div>
            <div className='hidden h-80 rounded bg-gray-200 md:block'></div>
         </div>
      </div>
   ),
})
import Script from 'next/script'
import hyphen from '@/lib/hyphen'

export const generateMetadata = async ({ params }: { params: { query: string } }) => {
   return {
      title: dehyphen(decodeURI(params.query)) + ' | اسدی گرافیک',
      description:
         'ما در اسدی گرافیک با ارائه طرح‌هایی قبیل لوگو، پوستر، بنر و کارت ویزیت با دیزاین منحصر به فرد و اختصاصی برای شما که بازتابی از شخصیت و سلیقه‌ی شما خواهد بود تحویل میدهیم',
      alternates: {
         canonical: `https://asadigraphics.ir/search/${params.query}`,
      },
   }
}

const getDesigns = async ({ query }: { query: string }) => {
   query = dehyphen(query)

   await dbConnect()

   if (query == 'all') return await Design.find({ active: true }).sort({ createdAt: -1 })

   const designsByName =
      (await Design.find({ $text: { $search: query }, active: true })
         .sort({ createdAt: -1 })
         .exec()) || []

   const categoryId: string | null = await Category.findOne({ slug: query })
      .exec()
      .then((res: ICategory) => res?._id || null)

   const designsByCategory =
      (await Design.find({ category: categoryId, active: true }).sort({ createdAt: -1 }).exec()) ||
      []

   const mergedDesigns: IDesign[] = [...designsByName, ...designsByCategory]

   const uniqueMergedDesigns: IDesign[] = mergedDesigns.reduce((accumulator: IDesign[], design) => {
      const existingDesign = accumulator.find((p) => p._id.toString() === design._id.toString())

      if (!existingDesign) {
         accumulator.push(design)
      }

      return accumulator
   }, [])

   return uniqueMergedDesigns
}

const Search = async ({ params: { query } }: { params: { query: string } }) => {
   query = dehyphen(decodeURI(query))

   const remaining = await limiter.removeTokens(5)

   if (remaining < 0) {
      return (
         <h1 className='mx-10 my-20 max-w-screen-sm text-center md:mx-auto'>
            متاسفانه تعداد درخواست‌های شما به حداکثر مجاز رسیده است. لطفاً کمی صبر کنید و سپس دوباره
            امتحان کنید
         </h1>
      )
   }

   const uniqueMergedDesigns = await getDesigns({ query })

   let creativeWorkJsonLd, breadcrumbJsonLd

   if (uniqueMergedDesigns.length) {
      creativeWorkJsonLd = {
         '@context': 'http://schema.org',
         '@type': 'CreativeWork',
         name: 'اسدی دیزاینس',
         description:
            'ما در اسدی گرافیک با ارائه طرح‌هایی قبیل لوگو، پوستر، بنر و کارت ویزیت با دیزاین منحصر به فرد و اختصاصی برای شما که بازتابی از شخصیت و سلیقه‌ی شما خواهد بود تحویل میدهیم',
         image: ['https://asadigraphics.ir/android-chrome-192x192.png'],
         creator: {
            '@type': 'Person',
            name: 'علی اسدی',
         },
         url: `https://asadigraphics.ir/search/${hyphen(query)}?type=search&name=${query}`,
         dateCreated: uniqueMergedDesigns[0].createdAt,
         dateModified: uniqueMergedDesigns[uniqueMergedDesigns.length - 1].updatedAt,
         keywords: 'طراحی, دیزاین, طراحی لوگو, طراحی بنر, طراحی پوستر، طراحی کارت ویزیت',
         license: 'https://creativecommons.org/licenses/by-nc-sa/4.0/',
         mainEntity: {
            '@type': 'ImageGallery',
            name: 'طرح های اسدی دیزاینس',
            description:
               'ما در اسدی گرافیک با ارائه طرح‌هایی قبیل لوگو، پوستر، بنر و کارت ویزیت با دیزاین منحصر به فرد و اختصاصی برای شما که بازتابی از شخصیت و سلیقه‌ی شما خواهد بود تحویل میدهیم',
            image: uniqueMergedDesigns.map(
               (design) =>
                  `https://tabrizian.storage.iran.liara.space/asadi_designs/designs/${design.frontSrc}`,
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
            { '@type': 'ListItem', position: 2, name: dehyphen(query) },
         ],
      }
   }

   return (
      <>
         {uniqueMergedDesigns.length ? (
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

         <GTMSearch query={query} />

         <div className='my-6 space-y-8 px-3 md:mx-auto md:max-w-screen-2xl md:px-0'>
            <SearchTitle />

            <div className='mb-20 space-y-6 text-center'>
               {uniqueMergedDesigns.length ? (
                  <Gallery designs={JSON.parse(JSON.stringify(uniqueMergedDesigns))} />
               ) : (
                  <div>
                     <span className='Doran text-3xl font-semibold'>!هیچ طرحی یافت نشد</span>
                     <span className='yekanBold mt-3 block text-sm'>
                        عبارت دیگری را امتحان کنید
                     </span>
                     <div className='relative mx-auto aspect-square w-[20rem]'>
                        <Image
                           className='object-contain mix-blend-darken'
                           src={
                              'https://tabrizian.storage.iran.liara.space/asadi_designs/noSearchResult.jpg'
                           }
                           alt='no search result'
                           fill
                           loading='lazy'
                           sizes='(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw'
                        />
                     </div>
                  </div>
               )}
            </div>
         </div>
      </>
   )
}

export default Search
