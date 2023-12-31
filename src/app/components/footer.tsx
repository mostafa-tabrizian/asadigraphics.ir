import Link from 'next/link'
import Image from 'next/image'

const Footer = () => {
   return (
      <footer className='rtl mt-10 rounded-t-3xl border-t-2 border-t-gray-200 bg-gray-200 px-4 py-3 pb-40 text-slate-600 md:py-8'>
         <div className='grid-row-2 container mx-auto grid max-w-screen-lg grid-cols-5 gap-10'>
            <div className='col-span-5 flex flex-col justify-start'>
               <div className='text-center'>
                  <div className='mb-7 grid w-full justify-center'>
                     <Link aria-label='صفحه اصلی' href='/'>
                        <Image
                           className='mix-blend-multiply'
                           src={
                              'https://tabrizian.storage.iran.liara.space/asadi_designs/logo/logo_2.jpg'
                           }
                           alt='لوگو اسدی گرافیک'
                           width={154}
                           height={104}
                           loading='lazy'
                        />
                     </Link>
                  </div>

                  <div className='mb-5 flex items-center justify-around'>
                     <ul className='flex items-center gap-10'>
                        <li className='block'>
                           <a
                              aria-label='ایتا'
                              id='eitaa'
                              rel='noreferrer'
                              href='https://eitaa.com/asadigraphics'
                              target='_blank'
                           >
                              <svg
                                 className='h-6 w-6 transition hover:text-orange-600'
                                 viewBox='0 0 24 24'
                                 fill='none'
                                 stroke='currentColor'
                                 strokeWidth='2'
                                 strokeLinecap='round'
                                 strokeLinejoin='round'
                              >
                                 <path d='m5.968 23.942a6.624 6.624 0 0 1 -2.332-.83c-1.62-.929-2.829-2.593-3.217-4.426-.151-.717-.17-1.623-.15-7.207.019-6.009.005-5.699.291-6.689.142-.493.537-1.34.823-1.767 1.055-1.57 2.607-2.578 4.53-2.943.384-.073.94-.08 6.056-.08 6.251 0 6.045-.009 7.066.314a6.807 6.807 0 0 1 4.314 4.184c.33.937.346 1.087.369 3.555l.02 2.23-.391.268c-.558.381-1.29 1.06-2.316 2.15-1.182 1.256-2.376 2.42-2.982 2.907-1.309 1.051-2.508 1.651-3.726 1.864-.634.11-1.682.067-2.302-.095-.553-.144-.517-.168-.726.464a6.355 6.355 0 0 0 -.318 1.546l-.031.407-.146-.03c-1.215-.241-2.419-1.285-2.884-2.5a3.583 3.583 0 0 1 -.26-1.219l-.016-.34-.309-.284c-.644-.59-1.063-1.312-1.195-2.061-.212-1.193.34-2.542 1.538-3.756 1.264-1.283 3.127-2.29 4.953-2.68.658-.14 1.818-.177 2.403-.075 1.138.198 2.067.773 2.645 1.639.182.271.195.31.177.555a.812.812 0 0 1 -.183.493c-.465.651-1.848 1.348-3.336 1.68-2.625.585-4.294-.142-4.033-1.759.026-.163.04-.304.031-.313-.032-.032-.293.104-.575.3-.479.334-.903.984-1.05 1.607-.036.156-.05.406-.034.65.02.331.053.454.192.736.092.186.275.45.408.589l.24.251-.096.122a4.845 4.845 0 0 0 -.677 1.217 3.635 3.635 0 0 0 -.105 1.815c.103.461.421 1.095.739 1.468.242.285.797.764.886.764.024 0 .044-.048.044-.106.001-.23.184-.973.326-1.327.423-1.058 1.351-1.96 2.82-2.74.245-.13.952-.47 1.572-.757 1.36-.63 2.103-1.015 2.511-1.305 1.176-.833 1.903-2.065 2.14-3.625.086-.57.086-1.634 0-2.207-.368-2.438-2.195-4.096-4.818-4.37-2.925-.307-6.648 1.953-8.942 5.427-1.116 1.69-1.87 3.565-2.187 5.443-.123.728-.169 2.08-.093 2.75.193 1.704.822 3.078 1.903 4.156a6.531 6.531 0 0 0 1.87 1.313c2.368 1.13 4.99 1.155 7.295.071.996-.469 1.974-1.196 3.023-2.25 1.02-1.025 1.71-1.88 3.592-4.458 1.04-1.423 1.864-2.368 2.272-2.605l.15-.086-.019 3.091c-.018 2.993-.022 3.107-.123 3.561-.6 2.678-2.54 4.636-5.195 5.242l-.468.107-5.775.01c-4.734.008-5.85-.002-6.19-.056z' />
                              </svg>
                           </a>
                        </li>
                        <li className='block'>
                           <a
                              aria-label='اینستاگرام'
                              id='instagram'
                              rel='noreferrer'
                              href='https://www.instagram.com/asadigraphics.ir'
                              target='_blank'
                           >
                              <svg
                                 stroke='currentColor'
                                 fill='currentColor'
                                 strokeWidth='0'
                                 role='img'
                                 viewBox='0 0 24 24'
                                 className='h-6 w-6 transition hover:text-orange-600'
                                 height='1em'
                                 width='1em'
                                 xmlns='http://www.w3.org/2000/svg'
                              >
                                 <title></title>
                                 <path d='M12 0C8.74 0 8.333.015 7.053.072 5.775.132 4.905.333 4.14.63c-.789.306-1.459.717-2.126 1.384S.935 3.35.63 4.14C.333 4.905.131 5.775.072 7.053.012 8.333 0 8.74 0 12s.015 3.667.072 4.947c.06 1.277.261 2.148.558 2.913.306.788.717 1.459 1.384 2.126.667.666 1.336 1.079 2.126 1.384.766.296 1.636.499 2.913.558C8.333 23.988 8.74 24 12 24s3.667-.015 4.947-.072c1.277-.06 2.148-.262 2.913-.558.788-.306 1.459-.718 2.126-1.384.666-.667 1.079-1.335 1.384-2.126.296-.765.499-1.636.558-2.913.06-1.28.072-1.687.072-4.947s-.015-3.667-.072-4.947c-.06-1.277-.262-2.149-.558-2.913-.306-.789-.718-1.459-1.384-2.126C21.319 1.347 20.651.935 19.86.63c-.765-.297-1.636-.499-2.913-.558C15.667.012 15.26 0 12 0zm0 2.16c3.203 0 3.585.016 4.85.071 1.17.055 1.805.249 2.227.415.562.217.96.477 1.382.896.419.42.679.819.896 1.381.164.422.36 1.057.413 2.227.057 1.266.07 1.646.07 4.85s-.015 3.585-.074 4.85c-.061 1.17-.256 1.805-.421 2.227-.224.562-.479.96-.899 1.382-.419.419-.824.679-1.38.896-.42.164-1.065.36-2.235.413-1.274.057-1.649.07-4.859.07-3.211 0-3.586-.015-4.859-.074-1.171-.061-1.816-.256-2.236-.421-.569-.224-.96-.479-1.379-.899-.421-.419-.69-.824-.9-1.38-.165-.42-.359-1.065-.42-2.235-.045-1.26-.061-1.649-.061-4.844 0-3.196.016-3.586.061-4.861.061-1.17.255-1.814.42-2.234.21-.57.479-.96.9-1.381.419-.419.81-.689 1.379-.898.42-.166 1.051-.361 2.221-.421 1.275-.045 1.65-.06 4.859-.06l.045.03zm0 3.678c-3.405 0-6.162 2.76-6.162 6.162 0 3.405 2.76 6.162 6.162 6.162 3.405 0 6.162-2.76 6.162-6.162 0-3.405-2.76-6.162-6.162-6.162zM12 16c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm7.846-10.405c0 .795-.646 1.44-1.44 1.44-.795 0-1.44-.646-1.44-1.44 0-.794.646-1.439 1.44-1.439.793-.001 1.44.645 1.44 1.439z'></path>
                              </svg>
                           </a>
                        </li>
                        <li className='block'>
                           <a
                              aria-label='تلگرام'
                              id='telegram'
                              rel='noreferrer'
                              href='https://t.me/asadigraphics'
                              target='_blank'
                           >
                              <svg
                                 className='h-6 w-6 transition hover:text-orange-600'
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
                                 <path stroke='none' d='M0 0h24v24H0z' />{' '}
                                 <path d='M15 10l-4 4l6 6l4 -16l-18 7l4 2l2 6l3 -4' />
                              </svg>
                           </a>
                        </li>
                     </ul>
                  </div>
                  <span className='yekan mb-6 text-center text-sm font-bold text-slate-600'>
                     دید خود را بالا ببرید، <br /> با اطمینان سفارش دهید، <br /> طرح را در آغوش
                     بگیرید.
                  </span>
                  <div id='about-us' className='space-y-5'>
                     <p className='yekan rtl text-justify text-sm leading-7 text-slate-600'>
                        <span className='yekanBold text-base text-slate-700'>با سلام</span> 👋{' '}
                        <br />
                        من <span className='yekanBold text-base text-slate-700'>علی اسدی</span>{' '}
                        هستم، یک طراح با تجربه در زمینه گرافیک و طراحی. تجربه‌ی چندین ساله‌ام در این
                        حوزه به من این امکان را داده تا به عنوان{' '}
                        <span className='yekanBold text-base text-slate-700'>
                           یک هنرمند و طراح مستقل
                        </span>{' '}
                        در خدمت شما باشم. <br />
                        <br />
                        در کارهایم، تمام تلاشم را می‌کنم تا{' '}
                        <span className='yekanBold text-base text-slate-700'>
                           طرح‌هایی منحصر به فرد و اختصاصی
                        </span>{' '}
                        ارائه دهم که{' '}
                        <span className='yekanBold text-base text-slate-700'>
                           بازتابی از شخصیت و سلیقه‌ی شما
                        </span>{' '}
                        داشته باشند.{' '}
                        <span className='yekanBold text-base text-slate-700'>نمونه کارهای من</span>{' '}
                        در این وبسایت{' '}
                        <span className='yekanBold text-base text-slate-700'>
                           نمایانگر سبک و توانایی‌های من
                        </span>{' '}
                        در زمینه طراحی هستند و به عنوان نمونه‌های آماده برای اشنایی با کارهای من
                        ارائه شده‌اند. این{' '}
                        <span className='yekanBold text-base text-slate-700'>
                           نمونه کارها به صورت غیر قابل فروش
                        </span>{' '}
                        می‌باشند. <br />
                        <br />
                        فرآیند همکاری با من به این صورت است که ابتدا نمونه کارهای موجود در وبسایت را
                        بررسی می‌کنید. اگر از سبک و کیفیت کارهای من راضی شدید،{' '}
                        <span className='yekanBold text-base text-slate-700'>
                           با من به شکل مستقیم از طریق تلگرام و ایتا
                        </span>
                        ، نیازها و توقعات خود را مطرح می‌کنید. سپس من{' '}
                        <span className='yekanBold text-base text-slate-700'>
                           با دقت به تمام جزئیات
                        </span>
                        ، طراحی اختصاصی شما را انجام می‌دهم تا به بهترین نتیجه برسید. <br />
                        <br />
                        من در خدمت شما هستم تا در هر مرحله از پروژه‌هایتان، شما را راهنمایی کنم و در{' '}
                        <span className='yekanBold text-base text-slate-700'>
                           ایجاد برندی بی‌نظیر
                        </span>{' '}
                        همراه شما باشم.
                     </p>
                  </div>
               </div>
            </div>
            {/* <div className='col-span-5 md:col-span-1 rtl'>
               <h4 className='text-xl Doran mb-4 text-orange-600'>دسترسی سریع</h4>
               <nav>
                  <ul className='text-sm'>
                     <li className='list-disc py-2 list-inside'>
                        <a
                           className='py-2 transition-all duration-300 text-slate-500 hover:text-orange-500'
                           href='#'
                        >
                           قوانین و مقررات
                        </a>
                     </li>
                  </ul>
               </nav>
            </div> */}
            <div className='col-span-5'>
               <p className='mb-2 text-center text-xs text-orange-600'>
                  © تمامی حقوق این وب سایت برای اسدی گرافیک محفوظ است
               </p>
               <a href='https://mostafatabrizian.ir/fa' target='_blank' rel='noreferrer'>
                  <p className='text-center text-xs text-purple-400'>
                      ساخته شده با 💜 توسط mostafatabrizian.ir
                  </p>
               </a>
            </div>
         </div>
      </footer>
   )
}

export default Footer
