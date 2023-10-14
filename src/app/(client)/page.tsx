import dbConnect from '@/lib/dbConnect'
import limiter from '@/lib/limiter'
import Slide from '@/models/slide'
import Category from '@/models/category'
import Design from '@/models/design'

import Slides from '@/components/slides'
import Script from 'next/script'
import Categories from './components/categories'
import SampleDesigns from './components/sampleDesigns'
import FAQ from './components/faq'
// import About from './components/about'
import SocialMedia from './components/socialMedia'

export const metadata = {
   title: 'اسدی گرافیک | طراحی لوگو، طراحی پوستر، طراحی بنر و طراحی کارت ویزیت',
   description:
      'ما در اسدی گرافیک با ارائه طرح‌هایی قبیل لوگو، پوستر، بنر و کارت ویزیت با دیزاین منحصر به فرد و اختصاصی برای شما که بازتابی از شخصیت و سلیقه‌ی شما خواهد بود تحویل میدهیم',
   alternates: {
      canonical: 'https://asadigraphics.ir',
   },
}

const getSlides = async () => {
   await dbConnect()
   return await Slide.find({ active: true }).sort({ createdAt: -1 })
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
   logo: 'https://asadigraphics.ir/_next/image?url=%2Flogo%2Flogo.jpg&w=96&q=100',
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
   const slides = await getSlides()

   console.log(
      `%c
   _______    _          _     _             
  |__   __|  | |        (_)   (_)            
     | | __ _| |__  _ __ _ _____  __ _ _ __  
     | |/ _\` | '_ \\| '__| |_  / |/ _\` | '_ \\ 
     | | (_| | |_) | |  | |/ /| | (_| | | | |
     |_|\\__,_|_.__/|_|  |_/___|_|\\__,_|_| |_|
     Telegram: @Tabrizian_dev
`,
      'color: #2495ff; font-weight: bold;',
   )

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
            {slides.length ? <Slides slides={JSON.parse(JSON.stringify(slides))} /> : ''}

            <Categories categoriesData={JSON.parse(JSON.stringify(categoriesData))} />

            {designs.length ? <SampleDesigns designs={designs} /> : ''}

            <FAQ />

            {/* <About /> */}

            <SocialMedia />
         </div>
      </>
   )
}

export default Home
