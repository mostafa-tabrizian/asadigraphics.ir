const LoadingDesign = () => {
   return (
      <div className='mx-6 md:mx-auto my-16 animate-pulse max-w-screen-lg space-y-8'>
         <div className='w-full h-16 rounded bg-gray-200'></div>

         <div className='md:grid flex flex-col-reverse grid-cols-2 md:gap-12'>
            <div className='space-y-6'>
               <div className='w-full h-40 rounded bg-gray-200'></div>
               <div className='w-full h-60 rounded bg-gray-200'></div>
               <div className='w-full h-32 rounded bg-gray-200'></div>
               <div className='w-full h-32 rounded bg-gray-200'></div>
            </div>

            <div>
               <div className='w-full h-80 rounded bg-gray-200'></div>

               <div className='flex justify-center gap-5 my-6'>
                  <div className='w-20 h-20 rounded bg-gray-200'></div>
                  <div className='w-20 h-20 rounded bg-gray-200'></div>
                  <div className='w-20 h-20 rounded bg-gray-200'></div>
               </div>
            </div>
         </div>
      </div>
   )
}

export default LoadingDesign
