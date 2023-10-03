import Image from 'next/legacy/image'

import Category from '@/models/category'
import Design, { IDesign } from '@/models/design'

import dbConnect from '@/lib/dbConnect'
import dehyphen from '@/lib/dehyphen'

import Contents from './components/contents'
import SearchTitle from './components/title'

import GTMViewItemList from './GTM/GTMViewItemList'
import GTMSearch from './GTM/GTMSearch'
import limiter from '@/lib/limiter'

const getDesigns = async ({ query }: { query: string }) => {
   query = dehyphen(query)

   const queryRegex = { $regex: new RegExp('^' + query + '$', 'i') }

   dbConnect()

   const categoryId: string | null = await Category.findOne({
      $or: [{ slug: queryRegex }, { name: queryRegex }],
   })
      .exec()
      .then((res) => res?._id)

   const designsByNameSlugDescription = await Design.find({ $text: { $search: query } }).exec()
   const designsByCategory = await Design.find({
      $or: [{ category: categoryId }],
   }).exec()

   const mergedDesigns: IDesign[] = [
      ...designsByNameSlugDescription,
      ...designsByCategory,
   ]

   const uniqueMergedDesigns: IDesign[] = mergedDesigns.reduce(
      (accumulator: IDesign[], design) => {
         const existingDesign = accumulator.find(
            (p) => p._id.toString() === design._id.toString(),
         )

         if (!existingDesign) {
            accumulator.push(design)
         }

         return accumulator
      },
      [],
   )

   return { uniqueMergedDesigns }
}

export const generateMetadata = async ({ params }: { params: { query: string } }) => {
   return {
      title: dehyphen(decodeURI(params.query)) + ' | اسدی گرافیکس',
      description:
         'ما در اسدی گرافیکس به حفاظت از شما و محیط‌هایتان متعهدیم. با ارائه ابزارهای پیشرفته دوربین مداربسته، سیستم‌های اعلام حریق، دزدگیرهای امنیتی و تجهیزات شبکه، ما به شما امکان می‌دهیم تا نظارت، امنیت، و ارتباطات خود را به سطح جدیدی برسانید. ما در تلاشیم تا با ارائه راه‌حل‌هایی نوآورانه و اطمینان‌بخش، زندگی و کسب و کار شما را تقویت کنیم. به ما بپیوندید و با ما در جهت ساختن یک آینده امن‌تر و بهتر همکاری کنید. ',
      alternates: {
         canonical: `https://asadi_designs.ir/search/${params.query}`,
      },
   }
}

const Search = async ({ params: { query } }: { params: { query: string } }) => {
   query = dehyphen(decodeURI(query))

   const remaining = await limiter.removeTokens(1)
   if (remaining < 0) {
      return (
         <h1 className='text-center mx-10 md:mx-auto my-20 max-w-screen-sm'>
            متاسفانه تعداد درخواست‌های شما به حداکثر مجاز رسیده است. لطفاً کمی صبر کنید و سپس دوباره
            امتحان کنید
         </h1>
      )
   }

   const { uniqueMergedDesigns } = await getDesigns({ query })

   return (
      <>
         {uniqueMergedDesigns.length ? (
            <GTMViewItemList
               params={JSON.parse(
                  JSON.stringify({
                     query,
                     designList: uniqueMergedDesigns,
                  }),
               )}
            />
         ) : (
            ''
         )}

         <GTMSearch query={query} />

         <div className='px-3 md:px-0 md:max-w-screen-2xl md:mx-auto space-y-8 my-6'>
            <SearchTitle />

            <div className='mb-20 text-center space-y-6'>
               {uniqueMergedDesigns.length ? (
                  <Contents
                     params={JSON.parse(
                        JSON.stringify({
                           dbDesigns: uniqueMergedDesigns
                        }),
                     )}
                  />
               ) : (
                  <div>
                     <span className='font-semibold text-xl'>!هیچ طرحی یافت نشد</span>
                     <span className='text-sm block'>عبارت دیگری را امتحان کنید</span>
                     <div className='w-[20rem] mx-auto aspect-square relative'>
                        <Image
                           src={
                              'https://tabrizian.storage.iran.liara.space/asadi_designs/noSearchResult.jpg'
                           }
                           alt='no search result'
                           layout='fill'
                           objectFit='contain'
                           loading='lazy'
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
