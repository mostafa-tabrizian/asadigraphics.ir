import Link from 'next/link'

export default function NotFound() {
   return (
      <div className='px-3 md:max-w-screen-lg h-screen text-center mx-5 md:mx-auto'>
         <div className='grid h-screen items-center'>
            <div>
               <h2 className='text-center text-[6rem] font-bold'>خطای ۴۰۴</h2>
               <p className='text-[2rem] font-semibold'>! صفحه مورد نظر شما یافت نشد</p>
               <div>
                  <p className='text-xl'>
                     .احتمالا این صفحه به آدرس دیگری تغییر کرده یا حذف شده است
                  </p>
               </div>

               <div className='mt-10'>
                  <Link
                     href='/'
                     className='text-lg text-white bg-blue-700 shadow-xl shadow-blue-400 p-2 rounded-2xl'
                  >
                     بازگشت به صفحه ی اصلی
                  </Link>
               </div>
            </div>
         </div>
      </div>
   )
}
