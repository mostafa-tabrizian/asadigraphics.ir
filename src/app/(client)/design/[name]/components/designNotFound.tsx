import Link from 'next/link'

const DesignNotFound = () => {
   return (
      <div className='mx-5 h-[50rem] px-3 text-center md:mx-auto md:max-w-screen-lg'>
         <div className='grid h-[50rem] items-center'>
            <div className='relative'>
               <h2 className='text-center text-[3rem] font-bold md:text-[6rem]'>
                  خطای{' '}
                  <span className='text-[4rem] font-bold text-orange-400 md:text-[7rem]'>۴۰۴</span>
               </h2>
               <span className='absolute -top-[14rem] right-0 -z-10 h-[40rem] w-[40rem] bg-gradient-radial from-orange-200 via-transparent to-transparent'></span>
               <p className='text-[1.4rem] font-semibold md:text-[2rem]'>
                  طرح مورد نظر شما یافت نشد !
               </p>
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

export default DesignNotFound
