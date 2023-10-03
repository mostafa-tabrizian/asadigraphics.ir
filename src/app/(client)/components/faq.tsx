'use client'

import { useState, useEffect, useRef, Dispatch, SetStateAction } from 'react'

import Collapse from '@mui/material/Collapse'

const FAQ = () => {
   const previousCollapse = useRef(null) as unknown as
      | {
           current: Dispatch<SetStateAction<boolean>>
        }
      | { current: null }

   const [q1, setQ1] = useState(false)
   const [q2, setQ2] = useState(false)
   const [q3, setQ3] = useState(false)
   const [q4, setQ4] = useState(false)
   const [q5, setQ5] = useState(false)
   const [q6, setQ6] = useState(false)
   const [q7, setQ7] = useState(false)
   const [q8, setQ8] = useState(false)
   const [q9, setQ9] = useState(false)
   const [q10, setQ10] = useState(false)

   const setFalsePrevious = () => {
      if (previousCollapse.current !== null) previousCollapse.current(false)
   }

   useEffect(() => {
      return () => {
         setFalsePrevious()
      }
   }, [])

   const collapseStatus = (questionCollapse: Dispatch<SetStateAction<boolean>>) => {
      if (previousCollapse.current === questionCollapse) {
         questionCollapse((prev) => !prev)
      } else {
         setFalsePrevious()
         previousCollapse.current = questionCollapse
         questionCollapse(true)
      }
   }

   return (
      <div className='border-t-2 px-7 space-y-3 border-black/25 rounded-2xl text-center bg-gradient-to-b from-[#ff7b005f] via-orange-200 to-transparent'>
         <div className='mb-5'>
            <h2 className='mt-10'>سوالات متداول</h2>
            <span className='yekanBold'>سوالاتی که شاید برای شما هم پیش آمده باشد</span>
         </div>

         <div className='border border-black px-3 rounded-xl'>
            <button
               className='flex justify-between w-full items-center'
               aria-label='categories'
               onClick={() => collapseStatus(setQ1)}
            >
               <svg
                  className={`h-8 w-8 transition-transform text-black ${
                     q1 ? 'rotate-45' : 'rotate-0'
                  }`}
                  fill='none'
                  viewBox='0 0 24 24'
                  stroke='currentColor'
               >
                  <path
                     strokeLinecap='round'
                     strokeLinejoin='round'
                     strokeWidth='2'
                     d='M12 4v16m8-8H4'
                  />
               </svg>

               <span className='yekanBold text-base text-right'>
                  چطور میتوانم سفارش خود را ثبت کنم؟
               </span>
            </button>

            <Collapse unmountOnExit in={q1}>
               <p className='yekanBold text-base text-right pb-3'>
                  بعد از مشاهده نمونه‌های طرح، لطفاً دکمه &quot;ثبت سفارش&quot; را در پایین سمت چپ
                  صفحه فشار داده و درخواست خود را ثبت نمایید
               </p>
            </Collapse>
         </div>

         <div className='border border-black px-3 rounded-xl'>
            <button
               className='flex justify-between w-full items-center'
               aria-label='categories'
               onClick={() => collapseStatus(setQ2)}
            >
               <svg
                  className={`h-8 w-8 transition-transform text-black ${
                     q2 ? 'rotate-45' : 'rotate-0'
                  }`}
                  fill='none'
                  viewBox='0 0 24 24'
                  stroke='currentColor'
               >
                  <path
                     strokeLinecap='round'
                     strokeLinejoin='round'
                     strokeWidth='2'
                     d='M12 4v16m8-8H4'
                  />
               </svg>

               <span className='yekanBold text-base text-right'>
                  چطور مطمئن باشم که میتونید طرحی رو طراحی کنید <br /> که مطابق سلیقه من باشد؟
               </span>
            </button>

            <Collapse unmountOnExit in={q2}>
               <p className='yekanBold text-base text-right pb-3'>
                  می‌توانید به اطمینان از تطابق طرح با سلیقه خود برسید. تیم ما در طراحی طرح‌های
                  متنوع برای افراد با سلایق مختلف تجربه زیادی دارد. ما سال‌های زیادی را در ارتقاء
                  سلایق و نیازهای مختلف افراد و کسب رضایت آن‌ها گذرانده‌ایم. برای اطمینان بیشتر،
                  پیشنهاد می‌کنیم نمونه‌های طراحی‌های ما را مشاهده کنید <br />
                  <br /> اگر در هنگام مشاهده طرح احساس کنید که تطابق کافی با سلیقه شما ندارد، نگران
                  نباشید. ما آماده‌ایم تغییرات مورد نیاز را اعمال کنیم تا طرح به نحوی تغییر یابد که
                  به تمامی انتظارات شما بپردازد <br />
                  <br /> اعتماد به تیم ما بسیار مهم است و ما در ایجاد طرح‌هایی منحصر به فرد و مطابق
                  با سلیقه‌ی شما تمرکز داریم. بنابراین، با اطمینان می‌توانید به ما اعتماد کنید تا
                  طرح مورد نظرتان را به بهترین شکل ممکن ایجاد کنیم
               </p>
            </Collapse>
         </div>

         <div className='border border-black px-3 rounded-xl'>
            <button
               className='flex justify-between w-full items-center'
               aria-label='categories'
               onClick={() => collapseStatus(setQ3)}
            >
               <svg
                  className={`h-8 w-8 transition-transform text-black ${
                     q3 ? 'rotate-45' : 'rotate-0'
                  }`}
                  fill='none'
                  viewBox='0 0 24 24'
                  stroke='currentColor'
               >
                  <path
                     strokeLinecap='round'
                     strokeLinejoin='round'
                     strokeWidth='2'
                     d='M12 4v16m8-8H4'
                  />
               </svg>

               <span className='yekanBold text-base text-right'>
                  آیا فایل لایه باز طرح رو دریافت می‌کنم؟
               </span>
            </button>

            <Collapse unmountOnExit in={q3}>
               <p className='yekanBold text-base text-right pb-3'>
                  خیر، مطابق با یکی از قوانین جهانی طراحی گرافیک، فایل لایه باز طراحی به مشتری ارائه
                  نمی‌شود. این اقدام به منظور حفظ مسئولیت و جلوگیری از سوء استفاده احتمالی از طرح
                  توسط شخصیت‌های غیرمجاز انجام می‌شود. پس از اتمام هر طراحی و دریافت تأیید از سوی
                  مشتری، فایل لایه بسته با کیفیت اصلی به مشتری تحویل داده می‌شود. این فایل لایه بسته
                  اختیار کامل برای استفاده در هر ابعاد و مقاصدی که مشتری انتخاب کند را به او می‌دهد.
                  بنابراین، مشتری می‌تواند این فایل را برای چاپ در هر ابعادی که نیاز دارد، استفاده
                  کند، و نیازی به نگرانی در مورد داشتن فایل لایه باز نخواهد بود.
               </p>
            </Collapse>
         </div>

         <div className='border border-black px-3 rounded-xl'>
            <button
               className='flex justify-between w-full items-center'
               aria-label='categories'
               onClick={() => collapseStatus(setQ8)}
            >
               <svg
                  className={`h-8 w-8 transition-transform text-black ${
                     q8 ? 'rotate-45' : 'rotate-0'
                  }`}
                  fill='none'
                  viewBox='0 0 24 24'
                  stroke='currentColor'
               >
                  <path
                     strokeLinecap='round'
                     strokeLinejoin='round'
                     strokeWidth='2'
                     d='M12 4v16m8-8H4'
                  />
               </svg>

               <span className='yekanBold text-base text-right'>
                  به فایل لایه باز طراحیم نیاز دارم آیا امکانش هست داشته باشمش؟
               </span>
            </button>

            <Collapse unmountOnExit in={q8}>
               <p className='yekanBold text-base text-right pb-3'>
                  به طور کلی ارسال فایل لایه باز مقدور نیست. اگر قصد دارید به عنوان آرشیو فایلتون رو
                  نگهداری کنید فایل لایه بسته با کیفیت مناسب براتون ارسال میشه اما اگر واقعا نیاز به
                  فایل لایه باز طرح دارید میتونید با پرداخت مبلغ ۵۰٪ مازاد بر رقم اصلی فایل لایه باز
                  رو هم از ما دریافت کنید.
               </p>
            </Collapse>
         </div>

         <div className='border border-black px-3 rounded-xl'>
            <button
               className='flex justify-between w-full items-center'
               aria-label='categories'
               onClick={() => collapseStatus(setQ4)}
            >
               <svg
                  className={`h-8 w-8 transition-transform text-black ${
                     q4 ? 'rotate-45' : 'rotate-0'
                  }`}
                  fill='none'
                  viewBox='0 0 24 24'
                  stroke='currentColor'
               >
                  <path
                     strokeLinecap='round'
                     strokeLinejoin='round'
                     strokeWidth='2'
                     d='M12 4v16m8-8H4'
                  />
               </svg>

               <span className='yekanBold text-base text-right'>
                  چطور میتونم هزینه سفارشاتم رو پرداخت کنم؟
               </span>
            </button>

            <Collapse unmountOnExit in={q4}>
               <p className='yekanBold text-base text-right pb-3'>
                  شما می‌توانید هزینه سفارشات خود را به یکی از روش‌های زیر پرداخت کنید
                  <br />
                  <br />
                  انتقال کارت به کارت از دستگاه‌های خودپرداز عضو شبکه شتاب
                  <br />
                  می‌توانید از دستگاه‌های خودپرداز عضو شبکه شتاب برای انتقال وجه استفاده کنید. برای
                  این کار، شماره کارت مقصد و مبلغ مورد نظر را وارد کرده و تراکنش را انجام دهید
                  <br />
                  <br />
                  واریز وجه نقد به شماره حساب بانکی
                  <br />
                  شماره حساب بانکی مقصد را دریافت کرده و می‌توانید وجه را به شماره حساب مذکور واریز
                  کنید. لطفاً توجه داشته باشید که قبل از واریز هر مبلغی، از دریافت پیش فاکتور یا
                  فاکتور اطمینان حاصل کنید
                  <br />
                  <br />
                  ارتباط با تیم ما:
                  <br />
                  پس از واریز یا انتقال وجه، حتماً رسید پرداخت خود را از طریق یکی از روش‌های ارتباطی
                  (مانند تلگرام و ایتا) به ما اطلاع دهید. این اطلاعات به ما کمک می‌کند تراکنش شما را
                  تایید و سفارش را پردازش کنیم.
                  <br />
                  <br />
                  با رعایت این نکات، می‌توانید به راحتی هزینه سفارشات خود را پرداخت کرده و فرآیند
                  خرید خود را به پایان برسانید
               </p>
            </Collapse>
         </div>

         <div className='border border-black px-3 rounded-xl'>
            <button
               className='flex justify-between w-full items-center'
               aria-label='categories'
               onClick={() => collapseStatus(setQ5)}
            >
               <svg
                  className={`h-8 w-8 transition-transform text-black ${
                     q5 ? 'rotate-45' : 'rotate-0'
                  }`}
                  fill='none'
                  viewBox='0 0 24 24'
                  stroke='currentColor'
               >
                  <path
                     strokeLinecap='round'
                     strokeLinejoin='round'
                     strokeWidth='2'
                     d='M12 4v16m8-8H4'
                  />
               </svg>

               <span className='yekanBold text-base text-right'>
                  ،بعد از پایان طراحی و چاپ <br /> متوجه شدم شماره تلفن آدرس یا متن طرحم غلط املایی
                  دارد <br />
                  مسئولیتش با کیست؟
               </span>
            </button>

            <Collapse unmountOnExit in={q5}>
               <p className='yekanBold text-base text-right pb-3'>
                  تمامی طرح‌ها پس از اتمام مرحله طراحی به منظور بررسی جزییات دقیق به اختیار مشتری
                  قرار می‌گیرند. مشتری موظف است در این مرحله تمام جزئیات را با دقت بررسی کند، از
                  جمله متن‌ها، شماره‌ها، تلفن‌ها، سریال‌ها و سایر جزئیات. در صورتی که نیاز به
                  تغییراتی داشته باشد، باید این تغییرات را به ما اعلام کند تا برایشان اصلاح شود
                  <br />
                  <br />
                  اگر درخواست تغییرات توسط مشتری کتباً اعلام شده باشد و به آن اصلاحات اعمال نشود،
                  مسئولیت اشتباهات مربوط به این درخواست بر عهده تیم ما می‌باشد و هر هزینه‌ای مرتبط
                  با چاپ مجدد به عهده ما خواهد بود. <br />
                  <br /> بعد از بررسی و تایید نهایی توسط مشتری، هر اشتباه املایی، تایپی و دیگر
                  ایرادات مشابه در طرح تحت مسئولیت مشتری قرار دارند و تیم ما در این مورد هیچ
                  مسئولیتی ندارد. این اقدامات با هماهنگی و تایید نهایی مشتری انجام می‌شوند. <br />
                  <br /> با این رویکرد دقیق و همکاری مشتری، می‌توانیم اطمینان حاصل کنیم که طرح نهایی
                  تمامی انتظارات شما را برآورده می‌کند.
               </p>
            </Collapse>
         </div>

         <div className='border border-black px-3 rounded-xl'>
            <button
               className='flex justify-between w-full items-center'
               aria-label='categories'
               onClick={() => collapseStatus(setQ6)}
            >
               <svg
                  className={`h-8 w-8 transition-transform text-black ${
                     q6 ? 'rotate-45' : 'rotate-0'
                  }`}
                  fill='none'
                  viewBox='0 0 24 24'
                  stroke='currentColor'
               >
                  <path
                     strokeLinecap='round'
                     strokeLinejoin='round'
                     strokeWidth='2'
                     d='M12 4v16m8-8H4'
                  />
               </svg>

               <span className='yekanBold text-base text-right'>روز کاری یعنی چه؟</span>
            </button>

            <Collapse unmountOnExit in={q6}>
               <p className='yekanBold text-base text-right pb-3'>
                  با توجه به تعاریف عمومی، روزهای کاری به معنای روزهایی هستند که در تقویم رسمی کشور
                  به جز روزهای تعطیل (مثل جمعه‌ها و روزهای تعطیلات رسمی مانند نوروز) به کار می‌روند.
                  شمارش روزهای کاری برای سفارش شما از روز ثبت سفارش و پرداخت شما شروع می‌شود. <br />
                  <br /> تعریف دقیق روزهای کاری ممکن است در هر ارگان، سازمان یا مجموعه متفاوت باشد.{' '}
                  <br />
                  <br /> در هر صورت، ما تلاش خواهیم کرد تا تحویل سفارش شما در موعد تعیین شده و با
                  رعایت تعریف عمومی روزهای کاری انجام شود
               </p>
            </Collapse>
         </div>

         <div className='border border-black px-3 rounded-xl'>
            <button
               className='flex justify-between w-full items-center'
               aria-label='categories'
               onClick={() => collapseStatus(setQ7)}
            >
               <svg
                  className={`h-8 w-8 transition-transform text-black ${
                     q7 ? 'rotate-45' : 'rotate-0'
                  }`}
                  fill='none'
                  viewBox='0 0 24 24'
                  stroke='currentColor'
               >
                  <path
                     strokeLinecap='round'
                     strokeLinejoin='round'
                     strokeWidth='2'
                     d='M12 4v16m8-8H4'
                  />
               </svg>

               <span className='yekanBold text-base text-right'>
                  فایلهای طراحی شده رو چطور به دستم میرسونید؟
               </span>
            </button>

            <Collapse unmountOnExit in={q7}>
               <p className='yekanBold text-base text-right pb-3'>
                  فایل‌های طراحی شده به شما از طریق تلگرام، واتساپ یا ایتا ارسال می‌شوند <br />
                  <br /> این روش‌های ارتباطی معمولاً برای ارسال فایل‌های کوچک و مستندات مناسب هستند.
                  به همین دلیل، پس از اتمام طراحی و آماده‌سازی فایل‌ها، تیم ما آن‌ها را به شما از
                  طریق یکی از این پلتفرم‌ها ارسال خواهد کرد <br />
                  <br /> پس از دریافت فایل‌های طراحی، شما می‌توانید آن‌ها را دانلود کنید و بررسی
                  کنید. در صورتی که نیاز به تغییراتی دارید یا تایید نهایی را ارائه می‌دهید،
                  می‌توانید با تیم ما از طریق همین پلتفرم‌های ارتباطی ارتباط برقرار کرده و تغییرات
                  را اعلام کنید. این روش کاری ساده و موثری برای ارتباط با تیم طراحی می‌باشد.
               </p>
            </Collapse>
         </div>

         <div className='border border-black px-3 rounded-xl'>
            <button
               className='flex justify-between w-full items-center'
               aria-label='categories'
               onClick={() => collapseStatus(setQ9)}
            >
               <svg
                  className={`h-8 w-8 transition-transform text-black ${
                     q9 ? 'rotate-45' : 'rotate-0'
                  }`}
                  fill='none'
                  viewBox='0 0 24 24'
                  stroke='currentColor'
               >
                  <path
                     strokeLinecap='round'
                     strokeLinejoin='round'
                     strokeWidth='2'
                     d='M12 4v16m8-8H4'
                  />
               </svg>

               <span className='yekanBold text-base text-right'>
                  فرمت نهایی سفارش طرح گرافیکی که در اختیار من قرار میگیره چیه؟
               </span>
            </button>

            <Collapse unmountOnExit in={q9}>
               <p className='yekanBold text-base text-right pb-3'>
                  فایل نهایی سفارش شما پس از تایید شما به صورت فرمت TIFF یا JPEG خواهد بود و حاوی
                  حداکثر کیفیت ممکن برای چاپ می‌باشد. <br />
                  <br /> این فرمت‌ها مناسب ترین فرمت‌ها برای چاپ حرفه‌ای هستند. در مورد ارسال فایل
                  لایه باز به چاپخانه، شما با اطلاعات صحیح تأکید می‌کنیم که در بسیاری از موارد برای
                  چاپ، فایل لایه باز لازم نیست. این کار به عنوان یک تدابیر امنیتی انجام می‌شود تا از
                  دزدیده شدن یا سوء استفاده از طراحی جلوگیری شود. <br />
                  <br /> در صورتی که شما نیاز به ارسال فایل لایه باز دارید، این امکان با درخواست
                  مجزا و با پرداخت 50٪ اضافی به شما ارائه می‌شود. این مسأله به منظور حفظ امنیت
                  فایل‌های طراحی و حقوق مالکیت فکری از اهمیت بالایی برخوردار است.
               </p>
            </Collapse>
         </div>

         <div className='border border-black px-3 rounded-xl'>
            <button
               className='flex justify-between w-full items-center'
               aria-label='categories'
               onClick={() => collapseStatus(setQ10)}
            >
               <svg
                  className={`h-8 w-8 transition-transform text-black ${
                     q10 ? 'rotate-45' : 'rotate-0'
                  }`}
                  fill='none'
                  viewBox='0 0 24 24'
                  stroke='currentColor'
               >
                  <path
                     strokeLinecap='round'
                     strokeLinejoin='round'
                     strokeWidth='2'
                     d='M12 4v16m8-8H4'
                  />
               </svg>

               <span className='yekanBold text-base text-right'>
                  برآورد قیمت طراحی برای طرح ها چگونه انجام میشه؟
               </span>
            </button>

            <Collapse unmountOnExit in={q10}>
               <p className='yekanBold text-base text-right pb-3'>
                  برآورد قیمت طراحی آیتم‌ها و پروژه‌های گرافیکی عموماً بر اساس عوامل زیر انجام
                  می‌شود: <br />
                  <br /> 1.میزان پیچیدگی طراحی: <br /> پیچیدگی طراحی، از جمله تعداد المان‌ها، جزئیات
                  و تعقیب‌پذیری طراحی، تاثیر مستقیمی بر قیمت دارد. طراحی‌هایی که نیاز به ایجاد
                  المان‌های پیچیده، افکت‌های ویژه و یا توجه دقیق به جزئیات دارند، ممکن است قیمت
                  بالاتری داشته باشند. <br />
                  <br /> 2.سطح ایده‌پردازی و تخصص: <br /> تخصص طراح یا تیم طراحی نیز تأثیر مهمی بر
                  قیمت دارد. طراحان با تجربه و مهارت‌های بالا معمولاً قیمت بیشتری دارند، زیرا طراحی
                  با کیفیت و حرفه‌ای را ارائه می‌دهند. <br />
                  <br /> 3.زمان مورد نیاز: <br /> مدت زمانی که برای انجام طراحی نیاز است نیز به صورت
                  مستقیم بر قیمت تأثیر می‌گذارد. اگر طراحی شما نیاز به تحویل سریع دارد، قیمت بالاتری
                  برای انجام آن در کمترین زمان ممکن در نظر گرفته می‌شود. <br />
                  <br /> 4.اندازه پروژه: <br /> معمولاً اندازه پروژه نیز نقشی در تعیین قیمت دارد.
                  پروژه‌های بزرگ‌تر ممکن است به دلیل پیچیدگی بیشتر و نیاز به زمان بیشتر، قیمت
                  بالاتری داشته باشند. <br />
                  <br /> 5.نوع فایل‌های خروجی: <br /> نوع فایل‌هایی که در نهایت به مشتری تحویل داده
                  می‌شوند نیز تأثیر دارد. برای مثال، اگر مشتری نیاز به فایل‌های لایه باز دارد، این
                  است هزینه اضافی داشته باشد.
               </p>
            </Collapse>
         </div>
      </div>
   )
}

export default FAQ
