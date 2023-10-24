const LoadingSearch = () => {
   return (
      <div className='mx-6 my-16 max-w-screen-lg animate-pulse space-y-8 md:mx-auto'>
         <div className='mx-auto h-12 w-1/2 rounded bg-gray-200'></div>

         <div className='grid grid-cols-2 gap-3 md:col-span-3 md:grid-cols-3'>
            <div className='h-60 rounded bg-gray-200 md:h-80'></div>
            <div className='h-60 rounded bg-gray-200 md:h-80'></div>
            <div className='h-60 rounded bg-gray-200 md:h-80'></div>
            <div className='h-60 rounded bg-gray-200 md:h-80'></div>
            <div className='hidden h-80 rounded bg-gray-200 md:block'></div>
            <div className='hidden h-80 rounded bg-gray-200 md:block'></div>
         </div>
      </div>
   )
}

export default LoadingSearch
