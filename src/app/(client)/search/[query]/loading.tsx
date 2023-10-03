const LoadingSearch = () => {
   return (
      <div className='mx-6 md:mx-auto my-16 animate-pulse max-w-screen-lg space-y-8'>
         <div className='w-1/2 h-12 mx-auto rounded bg-gray-200'></div>

         <div className='flex md:hidden justify-center gap-5 '>
            <div className='w-full h-10 rounded bg-gray-200'></div>
            <div className='w-full h-10 rounded bg-gray-200'></div>
         </div>

         <div className='md:grid md:grid-cols-4 md:gap-3'>
            <div className='grid grid-cols-2 md:col-span-3 md:grid-cols-3 gap-3'>
               <div className='h-60 rounded bg-gray-200'></div>
               <div className='h-60 rounded bg-gray-200'></div>
               <div className='h-60 rounded bg-gray-200'></div>
               <div className='h-60 rounded bg-gray-200'></div>
               <div className='h-60 hidden md:block rounded bg-gray-200'></div>
               <div className='h-60 hidden md:block rounded bg-gray-200'></div>
            </div>

            <div className='col-span-1 hidden md:block space-y-5'>
               <div className='h-12 rounded bg-gray-200'></div>
               <div className='h-32 rounded bg-gray-200'></div>
               <div className='h-12 rounded bg-gray-200'></div>
               <div className='h-12 rounded bg-gray-200'></div>
               <div className='h-12 rounded bg-gray-200'></div>
            </div>
         </div>
      </div>
   )
}

export default LoadingSearch
