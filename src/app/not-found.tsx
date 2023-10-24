import Link from 'next/link'

export default function NotFound() {
   return (
      <div className='mx-5 h-screen px-3 text-center md:mx-auto md:max-w-screen-lg'>
         <div className='grid h-screen items-center'>
            <div className='relative'>
               <h2 className='text-center text-[6rem] font-bold'>
                  خطای <span className='text-[7rem] font-bold text-orange-400'>۴۰۴</span>
               </h2>
               <span className='absolute -top-[14rem] right-0 -z-10 h-[40rem] w-[40rem] bg-gradient-radial from-orange-200 via-transparent to-transparent'></span>
               <p className='text-[2rem] font-semibold'>صفحه مورد نظر شما یافت نشد !</p>
               <div>
                  <p className='text-lg'>
                     احتمالا این صفحه به آدرس دیگری تغییر کرده یا حذف شده است.
                  </p>
               </div>

               <div className='mt-10'>
                  <Link
                     href='/'
                     className='rounded-2xl bg-orange-400 px-4 py-2 text-lg text-white shadow-xl shadow-orange-200'
                  >
                     بازگشت به صفحه ی اصلی
                  </Link>
               </div>
            </div>
         </div>
      </div>
   )
}
