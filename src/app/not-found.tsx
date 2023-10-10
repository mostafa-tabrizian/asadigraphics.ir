import Link from 'next/link'

export default function NotFound() {
   return (
      <div className='px-3 md:max-w-screen-lg h-screen text-center mx-5 md:mx-auto'>
         <div className='grid h-screen items-center'>
            <div className='relative'>
               <h2 className='text-center text-[6rem] font-bold'>
                  خطای <span className='text-orange-400 text-[7rem] font-bold'>۴۰۴</span>
               </h2>
               <span className='h-[40rem] w-[40rem] absolute -top-[14rem] right-0 bg-gradient-radial from-orange-200 via-transparent to-transparent -z-10'></span>
               <p className='text-[2rem] font-semibold'>صفحه مورد نظر شما یافت نشد !</p>
               <div>
                  <p className='text-lg'>
                     احتمالا این صفحه به آدرس دیگری تغییر کرده یا حذف شده است.
                  </p>
               </div>

               <div className='mt-10'>
                  <Link
                     href='/'
                     className='text-lg text-white bg-orange-400 shadow-xl shadow-orange-200 py-2 px-4 rounded-2xl'
                  >
                     بازگشت به صفحه ی اصلی
                  </Link>
               </div>
            </div>
         </div>
      </div>
   )
}
