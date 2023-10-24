const LoadingHome = () => {
   return (
      <div className='mx-6 my-16 max-w-screen-md animate-pulse space-y-4 md:mx-auto'>
         {/* <div className='w-full md:w-5/6 md:mx-auto h-80 bg-gray-200 rounded'></div> */}

         <div className='grid grid-cols-1 gap-3 md:grid-cols-2'>
            <div className='h-32 w-full rounded bg-gray-200'></div>
            <div className='h-32 w-full rounded bg-gray-200'></div>
            <div className='h-32 w-full rounded bg-gray-200'></div>
            <div className='h-32 w-full rounded bg-gray-200'></div>
            <div className='h-32 w-full rounded bg-gray-200'></div>
            <div className='h-32 w-full rounded bg-gray-200'></div>
         </div>

         <div className='mx-auto h-20 w-4/6 rounded bg-gray-200'></div>

         <div className='grid grid-cols-2'>
            <div className='w-45 mb-3 mr-3 h-40 rounded bg-gray-200'></div>
            <div className='w-45 mb-3 h-40 rounded bg-gray-200'></div>
            <div className='w-45 mr-3 h-40 rounded bg-gray-200'></div>
            <div className='w-45 h-40 rounded bg-gray-200'></div>
         </div>
      </div>
   )
}

export default LoadingHome
