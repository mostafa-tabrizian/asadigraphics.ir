import dynamic from 'next/dynamic'
import Script from 'next/script'

import dbConnect from '@/lib/dbConnect'
import limiter from '@/lib/limiter'

import Category from '@/models/category'
import Design from '@/models/design'

const Categories = dynamic(() => import('./components/categories'))
const FAQ = dynamic(() => import('./components/faq'), { ssr: false })
const SocialMedia = dynamic(() => import('./components/socialMedia'))
const SampleDesigns = dynamic(() => import('./components/sampleDesigns'))

export const metadata = {
   title: 'اسدی گرافیک | طراحی لوگو، طراحی پوستر، طراحی بنر و طراحی کارت ویزیت',
   description:
      'ما در اسدی گرافیک با ارائه طرح‌هایی قبیل لوگو، پوستر، بنر و کارت ویزیت با دیزاین منحصر به فرد و اختصاصی برای شما که بازتابی از شخصیت و سلیقه‌ی شما خواهد بود تحویل میدهیم',
   alternates: {
      canonical: 'https://asadigraphics.ir',
   },
}

const getCategories = async () => {
   await dbConnect()
   return await Category.find()
}

const getDesigns = async () => {
   await dbConnect()
   return await Design.find({ active: true }).limit(14).sort({ createdAt: -1 })
}

const jsonLd = {
   '@context': 'https://schema.org',
   '@type': 'WebSite',
   id: 'https://asadigraphics.ir/#webSite',
   name: 'اسدی گرافیک',
   url: 'https://asadigraphics.ir',
}

const corporationJsonLd = {
   '@context': 'https://schema.org',
   '@type': 'Corporation',
   id: 'https://asadigraphics.ir/#corporation',
   name: 'اسدی گرافیک',
   alternateName: ['اسدی گرافیک'],
   legalName: 'اسدی گرافیک',
   url: 'https://asadigraphics.ir',
   logo: 'https://asadigraphics.ir/android-chrome-192x192.png',
   email: '',
   sameAs: [
      'https://www.instagram.com/aliasadi_graphics',
      'https://t.me/aliasadi_graphics',
      'https://eitaa.com/aliasadi_graphics',
   ],
   contactPoint: [
      {
         '@type': 'ContactPoint',
         telephone: '+989352601280',
         contactType: 'customer service',
         areaServed: 'IR',
         availableLanguage: 'Persian',
      },
   ],
   founders: [
      {
         '@context': 'https://schema.org',
         '@type': 'Person',
         jobTitle: 'Chief executive officer',
         name: 'Ali Asadi',
         sameAs: [
            'https://www.instagram.com/aliasadi_graphics',
            'https://t.me/aliasadi_graphics',
            'https://eitaa.com/aliasadi_graphics',
         ],
      },
      {
         '@context': 'https://schema.org',
         '@type': 'Person',
         image: '',
         jobTitle: 'Chairman',
         name: 'Ali Asadi',
         sameAs: [
            'https://www.instagram.com/aliasadi_graphics',
            'https://t.me/aliasadi_graphics',
            'https://eitaa.com/aliasadi_graphics',
         ],
      },
   ],
}

async function Home() {
   const remaining = await limiter.removeTokens(3)

   if (remaining < 0) {
      return (
         <h1 className='text-center mx-10 md:mx-auto my-20 max-w-screen-sm'>
            متاسفانه تعداد درخواست‌های شما به حداکثر مجاز رسیده است. لطفاً کمی صبر کنید و سپس دوباره
            امتحان کنید
         </h1>
      )
   }

   const designs = await getDesigns()
   const categoriesData = await getCategories()

   return (
      <>
         <Script
            id='website-jsonld'
            type='application/ld+json'
            dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
         />

         <Script
            id='corporation-jsonld'
            type='application/ld+json'
            dangerouslySetInnerHTML={{ __html: JSON.stringify(corporationJsonLd) }}
         />

         <div className='space-y-16 my-6 px-2'>
            <Categories categoriesData={JSON.parse(JSON.stringify(categoriesData))} />

            {designs.length ? <SampleDesigns designs={JSON.parse(JSON.stringify(designs))} /> : ''}

            <FAQ />

            <SocialMedia />
         </div>
      </>
   )
}

export default Home
