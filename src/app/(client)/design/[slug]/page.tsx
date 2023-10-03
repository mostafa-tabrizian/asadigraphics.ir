import Image from 'next/legacy/image'
import Link from 'next/link'
import Script from 'next/script'

import Images from '@/components/design/images'
import dbConnect from '@/lib/dbConnect'
import dehyphen from '@/lib/dehyphen'
import hyphen from '@/lib/hyphen'
import limiter from '@/lib/limiter'
import Design, { IDesign } from '@/models/design'
import DesignSuggestion from './components/designSuggestion'

import Breadcrumbs from '@mui/material/Breadcrumbs'
import GTMViewItem from './components/GTMViewItem'

const getDesign = async (slug: string) => {
   dbConnect()

   const designsMatch = await Design.aggregate([
      { $match: { slug: dehyphen(slug) } },
      {
         $lookup: {
            from: 'categories',
            localField: 'category',
            foreignField: '_id',
            as: 'category',
         },
      },
      {
         $lookup: {
            from: 'brands',
            localField: 'brand',
            foreignField: '_id',
            as: 'brand',
         },
      },
      {
         $lookup: {
            from: 'models',
            localField: 'model',
            foreignField: '_id',
            as: 'model',
         },
      },
      {
         $limit: 1,
      },
   ])

   return designsMatch[0]
}

const getDesignsByBrand = async (
   slug: string,
   category: { _id: string },
   brand: { _id: string },
) => {
   dbConnect()

   const designsByBrand = await Design.find({
      category: category._id,
      brand: brand._id,
   })
      .limit(10)
      .exec()

   const designsWithoutCurrentOne = designsByBrand.filter(
      (design) => design.slug !== dehyphen(slug) && design.active == true,
   )

   return designsWithoutCurrentOne
}

export const generateMetadata = async ({ params }: { params: { slug: string } }) => {
   const remaining = await limiter.removeTokens(1)

   if (remaining < 0)
      return {
         title: 'خطای 429',
      }

   const design = await getDesign(params.slug)

   if (design) {
      return {
         title: dehyphen(design.name) + ' | اسدی گرافیکس',
         description:
            'ما در اسدی گرافیکس به حفاظت از شما و محیط‌هایتان متعهدیم. با ارائه ابزارهای پیشرفته دوربین مداربسته، سیستم‌های اعلام حریق، دزدگیرهای امنیتی و تجهیزات شبکه، ما به شما امکان می‌دهیم تا نظارت، امنیت، و ارتباطات خود را به سطح جدیدی برسانید. ما در تلاشیم تا با ارائه راه‌حل‌هایی نوآورانه و اطمینان‌بخش، زندگی و کسب و کار شما را تقویت کنیم. به ما بپیوندید و با ما در جهت ساختن یک آینده امن‌تر و بهتر همکاری کنید. ',
         alternates: {
            canonical: `https://asadi_designs.ir/design/${hyphen(design.slug)}`,
         },
      }
   } else {
      return {
         title: 'محصولی یافت نشد! | اسدی گرافیکس',
         description:
            'ما در اسدی گرافیکس به حفاظت از شما و محیط‌هایتان متعهدیم. با ارائه ابزارهای پیشرفته دوربین مداربسته، سیستم‌های اعلام حریق، دزدگیرهای امنیتی و تجهیزات شبکه، ما به شما امکان می‌دهیم تا نظارت، امنیت، و ارتباطات خود را به سطح جدیدی برسانید. ما در تلاشیم تا با ارائه راه‌حل‌هایی نوآورانه و اطمینان‌بخش، زندگی و کسب و کار شما را تقویت کنیم. به ما بپیوندید و با ما در جهت ساختن یک آینده امن‌تر و بهتر همکاری کنید. ',
      }
   }
}

const DesignPage = async ({ params }: { params: { slug: string } }) => {
   const remaining = await limiter.removeTokens(1)

   if (remaining < 0) {
      return (
         <h1 className='text-center mx-10 md:mx-auto my-20 max-w-screen-sm'>
            متاسفانه تعداد درخواست‌های شما به حداکثر مجاز رسیده است. لطفاً کمی صبر کنید و سپس دوباره
            امتحان کنید
         </h1>
      )
   }

   const slug = params.slug
   const design: IDesign = await getDesign(slug)

   if (!design)
      return (
         <div className='my-20 text-center space-y-2'>
            <span className='font-semibold text-xl'>!هیچ محصولی یافت نشد</span>
            <span className='text-sm block'>
               این طرح وجود ندارد یا در حال حاضر غیر فعال می‌باشد
            </span>
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
      )

   const category = design.category[0] as unknown as { _id: string; name: string; slug: string }
   const brand = design.brand[0] as unknown as { _id: string; name: string; slug: string }
   const model = design.model[0] as unknown as { _id: string; name: string; slug: string }

   const designsByBrand: IDesign[] = await getDesignsByBrand(slug, category, brand)

   const imagesListForJsonLd = []
   imagesListForJsonLd.push(
      `https://tabrizian.storage.iran.liara.space/asadi_designs/designs/${design.thumbnail}`,
   )
   design.images.map((image) =>
      imagesListForJsonLd.push(
         `https://tabrizian.storage.iran.liara.space/asadi_designs/designs/${image}`,
      ),
   )

   const designJsonLd = {
      '@type': 'Design',
      '@context': 'https://www.schema.org',
      name: design.name,
      alternateName: design.slug,
      image: imagesListForJsonLd,
      description: design.description,
      mpn: design.barcode,
      sku: design.barcode,
      category: `https://asadi_designs.ir/search/${hyphen(category.slug)}?type=category&name=${
         category.name
      }`,
      brand: {
         '@type': 'Brand',

         name: brand.name,
         url: `https://asadi_designs.ir/search/${hyphen(category.slug)}?type=category&name=${
            category.name
         }`,
         '@id': `https://asadi_designs.ir/search/${hyphen(
            category.slug,
         )}#brand?type=category&name=${category.name}`,
      },
      offers: {
         '@type': 'Offer',
         priceCurrency: 'IRR',
         price: design.price * 10, // rial
         itemCondition: 'https://schema.org/NewCondition',
         availability: `https://schema.org/${design.inStock ? 'InStock' : 'SoldOut'}`,
      },
   }

   const breadcrumbJsonLd = {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
         {
            '@type': 'ListItem',
            position: 1,
            name: 'صفحه اصلی اینترنتی اسدی گرافیکس',
            item: {
               '@type': 'Corporation',
               '@id': 'https://asadi_designs.ir/#corporation',
            },
         },
         {
            '@type': 'ListItem',
            position: 2,

            name: category.name,

            item: `https://asadi_designs.ir/search/${hyphen(category.slug)}?type=category&name=${
               category.name
            }`,
         },
         {
            '@type': 'ListItem',
            position: 3,

            name: brand.name,

            item: `https://asadi_designs.ir/search/${hyphen(brand.slug)}?type=brand&name=${
               brand.name
            }`,
         },
         { '@type': 'ListItem', position: 4, name: design.name },
      ],
   }

   return (
      <>
         <Script
            id='design-jsonld'
            type='application/ld+json'
            dangerouslySetInnerHTML={{ __html: JSON.stringify(designJsonLd) }}
         />

         <Script
            id='breadcrumb-jsonld'
            type='application/ld+json'
            dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
         />

         <GTMViewItem
            params={JSON.parse(
               JSON.stringify({
                  design,

                  category: category.name,

                  brand: brand.name,
               }),
            )}
         />

         <div className='mx-6 md:mx-auto max-w-screen-lg my-6'>
            {design?.active ? (
               <div>
                  <div className='bg-white flex-nowrap shadow shadow-slate-200 rounded-lg px-3 py-1 my-2 rtl'>
                     <Breadcrumbs aria-label='breadcrumb'>
                        <Link className='text-gray-400' href='/'>
                           <span className='text-xs hover:text-blue-500'>خانه</span>
                        </Link>
                        <Link
                           className='text-gray-400'
                           href={`/search/${hyphen(category.slug)}?type=category&name=${
                              category.name
                           }`}
                        >
                           <span className='text-xs hover:text-blue-500'>{category.name}</span>
                        </Link>
                        <Link
                           className='text-gray-400'
                           href={`/search/${hyphen(brand.slug)}?type=brand&name=${brand.name}`}
                        >
                           <span className='text-xs hover:text-blue-500'>{brand.name}</span>
                        </Link>
                        <span className='text-xs font-semibold'>{design.name}</span>
                     </Breadcrumbs>
                  </div>

                  <div className='md:grid flex flex-col-reverse grid-cols-2 md:gap-12'>
                     <div className='mt-10 md:mt-0 space-y-6'>
                        <div className='bg-white shadow shadow-slate-200 rounded-lg px-3 py-5 rtl'>
                           <h1 className='text-right'>{design.name}</h1>
                           <h2 className='text-right text-xs yekan1 text-gray-400'>
                              {design.slug}
                           </h2>
                           <div className='flex gap-5'>
                              <div>
                                 <span>شناسه طرح: </span>
                                 <span className='text-blue-500 font-bold'>{design.barcode}</span>
                              </div>
                           </div>
                           <div className='flex gap-5'>
                              <div>
                                 <span>دسته بندی: </span>
                                 <Link
                                    id='category'
                                    href={`/search/${hyphen(category.slug)}?type=category&name=${
                                       category.name
                                    }`}
                                 >
                                    <span className='text-blue-500 font-bold'>{category.name}</span>
                                 </Link>
                              </div>

                              <div>
                                 <span>مدل: </span>
                                 <Link
                                    id='model'
                                    href={`/search/${hyphen(model.slug)}?type=model&name=${
                                       model.name
                                    }`}
                                 >
                                    <span className='text-blue-500 font-bold'>{model.name}</span>
                                 </Link>
                              </div>

                              <div>
                                 <span>برند: </span>
                                 <Link
                                    id='brand'
                                    href={`/search/${hyphen(brand.slug)}?type=brand&name=${
                                       brand.name
                                    }`}
                                 >
                                    <span className='text-blue-500 font-bold'>{brand.name}</span>
                                 </Link>
                              </div>
                           </div>
                        </div>

                        <div className='bg-white shadow shadow-slate-200 space-y-5 rounded-lg px-3 py-5 rtl'>
                           <span className='doranExtraBold text-xl'>جزئیات</span>
                           <ul className='space-y-2'>
                              {design.detail
                                 ? Object.entries(design.detail).map((data, idx) => {
                                      return (
                                         <li key={idx} className='text-slate-500 text-sm'>
                                            {data[0]} : {data[1]}
                                         </li>
                                      )
                                   })
                                 : ''}
                           </ul>
                        </div>

                        <div className='flex items-center justify-between bg-white shadow shadow-slate-200 rounded-lg px-3 py-5'>
                           {design.inStock ? (
                              <>
                                 <div className='flex'>
                                    <div className='font-bold flex items-center'>
                                       <svg
                                          xmlns='http://www.w3.org/2000/svg'
                                          data-name='Layer 2'
                                          viewBox='0 0 51.29 27.19'
                                          width='51'
                                          height='27'
                                          className='text-slate-400 w-6 h-6'
                                          stroke='currentColor'
                                          fill='currentColor'
                                       >
                                          <path
                                             d='M36.48 22.85c1.78-.83 2.93-1.81 3.45-2.94h-1.65c-2.53 0-4.69-.66-6.47-1.97-.59.68-1.23 1.2-1.93 1.55s-1.54.53-2.5.53c-1.03 0-1.87-.18-2.51-.53-.65-.35-1.14-.96-1.5-1.83-.35-.87-.56-2.08-.63-3.62-.02-.28-.04-.6-.04-.97s-.01-.72-.04-1.07c-.14-3.42-.28-6.26-.42-8.51l-5.8 1.37c.73 1.64 1.34 3.34 1.83 5.08.49 1.75.74 3.58.74 5.5 0 1.6-.37 3.12-1.11 4.57-.74 1.46-1.85 2.64-3.32 3.57-1.48.93-3.27 1.39-5.38 1.39s-3.82-.45-5.21-1.34C2.61 22.74 1.6 21.6.96 20.22c-.63-1.38-.95-2.84-.95-4.36 0-1.2.13-2.28.4-3.25.27-.97.63-1.93 1.07-2.87l2.39 1.34c-.38.92-.65 1.71-.83 2.39-.18.68-.26 1.48-.26 2.39 0 1.76.49 3.19 1.48 4.29s2.63 1.65 4.92 1.65c1.55 0 2.87-.32 3.96-.95 1.09-.63 1.9-1.44 2.43-2.43.53-.98.79-1.98.79-2.99 0-2.65-.82-5.82-2.46-9.5l1.69-3.52L22.38.79c.16-.05.39-.07.67-.07.54 0 .98.19 1.32.56s.53.88.58 1.51c.14 2.04.27 5.02.39 8.94.02.38.04.75.04 1.13s.01.71.04 1.02c.05 1.03.22 1.78.53 2.25s.81.7 1.51.7c.84 0 1.52-.18 2.04-.53.52-.35.97-1 1.37-1.93.75-1.71 1.33-2.96 1.74-3.75.41-.79.94-1.46 1.58-2.04.64-.57 1.44-.86 2.37-.86 1.83 0 3.27.94 4.31 2.83s1.69 4.06 1.95 6.53c1.57-.02 2.77-.13 3.61-.33.83-.2 1.41-.49 1.72-.88.32-.39.47-.89.47-1.5 0-.75-.16-1.67-.49-2.76-.33-1.09-.69-2.1-1.09-3.04l2.43-1.23c1.22 3.1 1.83 5.44 1.83 7.04 0 1.83-.67 3.18-2 4.04-1.34.87-3.53 1.34-6.58 1.41-.49 2.21-1.8 3.93-3.92 5.19-2.12 1.25-4.68 1.98-7.69 2.16l-1.2-2.88c2.6-.14 4.8-.63 6.58-1.46ZM10.38 5.66l.11 3.31-3.2.28-.46-3.31 3.55-.28Zm25.1 10.83c.88.28 1.81.42 2.8.42h1.93c-.16-1.67-.55-3.08-1.16-4.26-.61-1.17-1.38-1.76-2.32-1.76-.75 0-1.42.45-2.02 1.34-.6.89-1.11 1.92-1.53 3.1.66.49 1.42.88 2.3 1.16ZM43.64.21C45.06.07 46.43 0 47.74 0c.96 0 1.67.02 2.11.07l-.21 2.81c-.42-.05-1.08-.07-1.97-.07-1.2 0-2.44.07-3.73.21s-2.44.32-3.45.53L39.86.81c1.1-.26 2.36-.46 3.78-.6Z'
                                             data-name='Layer 1'
                                          ></path>
                                       </svg>
                                       <span className='text-slate-800 text-2xl ml-2 md:text-xl'>
                                          {(design.price - design.discount).toLocaleString('per')}
                                       </span>
                                    </div>
                                 </div>

                                 {design.discount ? (
                                    <div className='flex gap-5 items-center'>
                                       <div>
                                          <span className='text-gray-400 line-through text-lg ml-2 md:text-xl'>
                                             {design.price.toLocaleString('per')}
                                          </span>
                                       </div>
                                       <div className='bg-rose-500 shadow-md shadow-rose-300 px-3 rounded-full'>
                                          <span className='text-white text-lg md:text-xl'>
                                             {Math.round(
                                                (design.discount / design.price) * 100,
                                             ).toLocaleString('per')}
                                             {'٪'}
                                          </span>
                                       </div>
                                    </div>
                                 ) : (
                                    ''
                                 )}
                              </>
                           ) : (
                              <span className='text-rose-900 text-xl mx-auto'>
                                 !طرح موجود نمی‌باشد
                              </span>
                           )}
                        </div>

                        <div className='text-right flex items-center justify-between bg-white border border-green-700/10 shadow-green-700/30 shadow-lg rounded-lg px-3 py-5'>
                           <div className='flex flex-col space-y-2 mx-5'>
                              <a
                                 aria-label='شماره تماس'
                                 id='phone_call'
                                 rel='noreferrer'
                                 className='text-green-600 text-base font-semibold tracking-widest'
                                 href='tel:+989128530920'
                              >
                                 09128530920
                              </a>
                              <a
                                 aria-label='شماره تماس'
                                 id='phone_call'
                                 rel='noreferrer'
                                 className='text-green-600 text-base font-semibold tracking-widest'
                                 href='tel:+989109960802'
                              >
                                 09109960802
                              </a>
                           </div>
                           <p className='text-right rtl text-green-600 font-semibold'>
                              برای خرید با ما تماس بگیرید
                           </p>
                        </div>

                        <div className='text-right space-y-5 bg-white shadow shadow-slate-200 rounded-lg px-3 py-5 rtl'>
                           <span className='doranExtraBold text-xl'>توضیحات</span>
                           <p className='whitespace-break-spaces text-justify leading-8 text-slate-500'>
                              {design.description}
                           </p>
                        </div>
                     </div>

                     <Images
                        params={{
                           thumbnail: design.thumbnail,
                           name: design.name,
                           images: design.images,
                        }}
                     />
                  </div>

                  <DesignSuggestion designs={designsByBrand} />
               </div>
            ) : (
               <div className='space-y-10 m-10'>
                  <span style={{ fontSize: '1.5rem' }} className='text-center doranExtraBold'>
                     این طرح در حال حاضر در دسترس نمی‌باشد
                  </span>
                  <div className='flex'>
                     <svg width='646' height='244' viewBox='0 0 646 244' fill='none'>
                        <path
                           d='M296.438 179.499C297.299 177.007 298.637 173.763 300.872 170.29C301.981 168.548 303.309 166.752 304.839 164.947C306.396 163.16 308.155 161.373 310.125 159.641C314.092 156.205 318.92 153.034 324.417 150.505C329.914 147.985 336.079 146.097 342.621 145.153C355.877 143.229 369.784 145.886 382.243 150.367C394.749 154.885 405.898 161.135 415.389 166.816C426.374 173.433 436.909 180.461 447.839 186.629C458.741 192.787 470.074 198.111 481.983 201.034C487.929 202.482 493.985 203.38 500.095 203.499C506.197 203.646 512.326 203.133 518.354 202.051C530.42 199.834 542.064 195.288 552.773 189.13C563.474 182.945 573.35 175.238 582.026 166.367C586.368 161.941 590.436 157.231 594.192 152.292C595.135 151.064 596.024 149.79 596.94 148.544L599.551 144.667C600.403 143.357 601.329 142.111 602.116 140.754L604.553 136.759L605.772 134.761L606.908 132.709L609.18 128.612C610.655 125.863 612.029 123.041 613.44 120.255C614.732 117.405 616.106 114.592 617.333 111.705C618.534 108.809 619.825 105.95 620.925 103.009C625.524 91.3248 629.399 79.3385 632.871 67.2147C637.259 52.0761 643.361 25.8492 645.266 26.8481C646.247 27.3704 646.027 32.0898 644.689 40.044C643.343 47.989 640.942 59.1964 637.085 72.5481C634.74 80.6214 632.221 88.6673 629.335 96.594C626.467 104.53 623.353 112.392 619.734 120.053C616.133 127.714 612.231 135.256 607.696 142.431C607.137 143.33 606.615 144.255 606.019 145.135L604.242 147.774C603.042 149.524 601.924 151.32 600.641 153.025C598.159 156.489 595.502 159.815 592.726 163.041C581.613 175.907 568.366 186.968 553.479 195.206C538.619 203.417 521.945 208.75 504.823 209.318C498.584 209.529 492.299 209.135 486.133 208.008C479.968 206.917 473.949 205.185 468.131 203.014C456.469 198.661 445.649 192.622 435.205 186.29C424.743 179.948 414.638 173.231 404.13 167.385C393.649 161.529 382.747 156.415 371.305 153.428C365.597 151.934 359.761 151 353.907 150.771C348.108 150.496 342.3 151.201 336.675 152.677C331.059 154.161 325.645 156.461 320.734 159.513C315.833 162.564 311.417 166.404 307.981 170.949C304.537 175.476 302.109 180.727 301.092 186.262C300.029 191.797 300.497 197.561 302.081 203.014C302.246 203.71 302.503 204.37 302.741 205.039L303.474 207.046L304.363 208.998L304.802 209.969L305.315 210.913L306.351 212.791C306.717 213.405 307.129 213.992 307.514 214.597C308.256 215.825 309.172 216.933 310.034 218.088C313.606 222.597 318.05 226.4 322.942 229.36C324.05 230.019 325.205 230.578 326.332 231.192C327.523 231.706 328.686 232.274 329.895 232.741C332.314 233.667 334.788 234.491 337.325 235.059C342.392 236.269 347.623 236.801 352.872 236.736C358.122 236.645 363.371 235.985 368.52 234.83C371.094 234.271 373.641 233.538 376.151 232.732C377.415 232.338 378.643 231.852 379.889 231.421C381.107 230.917 382.317 230.377 383.535 229.854C393.228 225.648 402.151 219.664 409.883 212.406C417.643 205.158 424.102 196.553 429.15 187.215C434.179 177.868 437.725 167.724 439.456 157.277C441.188 146.839 441.096 136.108 438.934 125.735C434.665 104.97 423.176 85.799 407.245 71.8333C399.751 65.2812 391.249 59.8837 382.088 56.0715L375.107 53.5056L371.515 52.4976L369.72 51.9936C369.124 51.8195 368.52 51.6546 367.906 51.5446C363.05 50.4724 358.131 49.6019 353.156 49.217C343.207 48.3372 333.139 48.7679 323.162 50.0967C313.185 51.4255 303.309 53.6981 293.552 56.4381C274.029 61.918 255.111 69.6981 235.744 76.6718C226.06 80.1632 216.258 83.4805 206.254 86.2389C196.249 89.0063 186.025 91.2148 175.609 92.3695C166.64 93.3775 157.533 93.7257 148.418 92.8735C139.33 92.0396 130.232 89.9869 121.722 86.2755C113.211 82.6008 105.396 76.9559 99.322 69.8356C93.2205 62.7428 88.878 53.8997 87.6046 44.4243C86.945 39.6499 87.2473 34.7839 88.31 30.147C89.3727 25.501 91.2142 21.029 93.7702 16.9878C96.3079 12.9374 99.6426 9.33598 103.628 6.55934L105.139 5.54216C105.643 5.2031 106.193 4.94651 106.724 4.6441C107.265 4.36002 107.787 4.05762 108.337 3.7827L110.022 3.06792C112.267 2.10572 114.713 1.51924 117.132 1.16185C122.006 0.47456 126.934 1.11603 131.506 2.62806C136.077 4.16758 140.347 6.65098 143.874 10.0233C147.401 13.3864 150.067 17.8034 151.258 22.651C152.522 27.4254 152.266 32.5296 150.836 37.2032C149.508 41.6293 147.016 45.7989 143.92 49.4644C140.823 53.1574 137.085 56.3556 133.073 59.1506C129.06 61.9547 124.717 64.3098 120.274 66.3075C118.048 67.3064 115.785 68.1861 113.504 68.9742C111.213 69.7898 108.941 70.4038 106.724 71.0361C99.3495 73.1254 89.3636 75.398 79.2586 76.7818C69.1536 78.2205 58.9661 78.7703 51.3805 78.7153C50.5652 78.7153 49.7406 78.7153 48.9161 78.7153C48.0916 78.6879 47.2671 78.6695 46.4334 78.642C44.7752 78.5871 43.117 78.5321 41.4588 78.4863C38.1515 78.2846 34.8534 78.1564 31.6561 77.8814C27.9824 77.6615 24.6568 77.2308 21.6702 76.9009C18.6836 76.4794 16.036 76.0762 13.709 75.6546C11.3912 75.1964 9.40314 74.7749 7.72661 74.39C6.05924 73.9685 4.70336 73.5653 3.65896 73.2262C-0.536948 71.8425 0.186794 71.2102 5.19806 71.1002C6.29743 71.0727 6.2791 70.7611 6.85627 70.6054C7.14027 70.5229 7.57085 70.4862 8.36789 70.532C9.16493 70.5595 10.3193 70.6603 12.0508 70.8894C12.3348 70.9261 12.912 70.9994 13.1685 71.0361C23.6857 72.2182 34.3221 73.0613 45.0684 73.2629C55.8055 73.4553 66.68 73.0704 77.4538 71.5309C84.0775 70.6603 90.6279 69.3316 97.1233 67.8195L101.979 66.6008C103.591 66.1792 105.185 65.6844 106.798 65.2354C110.041 64.3556 113.082 63.2926 116.133 62.0555C122.189 59.5629 127.997 56.3923 133.091 52.4152C138.175 48.4655 142.582 43.5904 144.964 37.918C145.559 36.5067 145.981 35.0405 146.311 33.5652C146.567 32.0806 146.778 30.5777 146.732 29.0657C146.75 28.3143 146.659 27.5537 146.613 26.8022C146.485 26.06 146.448 25.2719 146.228 24.5754C146.027 23.8607 145.908 23.1184 145.651 22.4219L144.827 20.3417C142.206 14.9351 137.195 10.7289 131.478 8.41044C125.725 6.18363 119.202 5.70711 113.485 7.71399C107.723 9.77585 102.684 13.8721 99.2121 19.0955C95.7582 24.3097 93.5595 30.4769 93.193 36.7542C92.7533 42.9947 94.1275 49.3636 96.8393 55.1185C98.186 58.0051 99.8442 60.7542 101.75 63.3293C103.683 65.886 105.863 68.2686 108.227 70.4496C112.954 74.8482 118.488 78.2755 124.452 80.8414C130.407 83.4347 136.792 85.0659 143.269 86.0739C149.765 87.0636 156.379 87.3385 162.994 87.1369C169.617 86.862 176.232 86.193 182.8 85.1484C189.36 84.0304 195.883 82.61 202.351 80.9055C218.209 76.6718 233.719 70.9352 249.266 65.1712C257.044 62.2846 264.831 59.3797 272.738 56.6763C280.635 53.973 288.633 51.4896 296.74 49.3728C304.848 47.2651 313.075 45.4965 321.43 44.351C329.776 43.2147 338.241 42.6557 346.707 42.9306C355.172 43.2055 363.655 44.3327 371.9 46.4862L374.979 47.3476C376.005 47.6408 377.04 47.8974 378.038 48.2914L384.067 50.4907C386.018 51.3613 387.951 52.2685 389.893 53.1574C390.379 53.3865 390.864 53.5973 391.341 53.8447L392.733 54.6236L395.527 56.1907C411.688 65.5469 425.394 79.2927 434.408 96.035L434.243 95.7509C439.044 104.411 442.663 113.758 444.77 123.481C446.895 133.194 447.445 143.293 446.336 153.19C444.257 171.93 436.653 190.047 425.009 205.094C419.145 212.59 412.265 219.316 404.561 224.961C402.71 226.473 400.63 227.664 398.633 228.975L397.122 229.946C396.627 230.276 396.114 230.597 395.582 230.862L392.422 232.558C391.368 233.117 390.324 233.703 389.252 234.226L385.963 235.655L382.674 237.076C381.566 237.525 380.43 237.9 379.312 238.313C370.279 241.401 360.751 243.096 351.177 243.005C341.622 242.913 331.984 240.915 323.354 236.663C314.651 232.365 307.386 225.685 302.21 217.721C297.061 209.776 294.01 200.292 294.459 190.752C294.487 190.001 294.587 189.195 294.661 188.324C294.743 187.453 294.798 186.528 294.981 185.584C295.064 185.107 295.146 184.622 295.229 184.118C295.339 183.623 295.458 183.128 295.577 182.615C295.76 181.579 296.127 180.562 296.438 179.499Z'
                           fill='gray'
                        />
                     </svg>
                  </div>
               </div>
            )}
         </div>
      </>
   )
}

export default DesignPage
