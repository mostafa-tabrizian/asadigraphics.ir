const LoadingSearch = () => {
   return (
      <div className='mx-6 md:mx-auto my-16 animate-pulse max-w-screen-lg space-y-8'>
         <div className='w-1/2 h-12 mx-auto rounded bg-gray-200'></div>

         <div className='grid grid-cols-2 md:col-span-3 md:grid-cols-3 gap-3'>
            <div className='h-60 md:h-80 rounded bg-gray-200'></div>
            <div className='h-60 md:h-80 rounded bg-gray-200'></div>
            <div className='h-60 md:h-80 rounded bg-gray-200'></div>
            <div className='h-60 md:h-80 rounded bg-gray-200'></div>
            <div className='h-80 hidden md:block rounded bg-gray-200'></div>
            <div className='h-80 hidden md:block rounded bg-gray-200'></div>
         </div>
      </div>
   )
}

export default LoadingSearch
