const LoadingHome = () => {
   return (
      <div className='mx-6 my-16 md:mx-auto animate-pulse max-w-screen-md space-y-4'>
         {/* <div className='w-full md:w-5/6 md:mx-auto h-80 bg-gray-200 rounded'></div> */}

         <div className='grid grid-cols-1 md:grid-cols-2 gap-3'>
            <div className='w-full h-32 bg-gray-200 rounded'></div>
            <div className='w-full h-32 bg-gray-200 rounded'></div>
            <div className='w-full h-32 bg-gray-200 rounded'></div>
            <div className='w-full h-32 bg-gray-200 rounded'></div>
            <div className='w-full h-32 bg-gray-200 rounded'></div>
            <div className='w-full h-32 bg-gray-200 rounded'></div>
         </div>

         <div className='w-4/6 mx-auto h-20 bg-gray-200 rounded'></div>

         <div className='grid grid-cols-2'>
            <div className='w-45 h-40 bg-gray-200 mr-3 mb-3 rounded'></div>
            <div className='w-45 h-40 bg-gray-200 mb-3 rounded'></div>
            <div className='w-45 h-40 bg-gray-200 mr-3 rounded'></div>
            <div className='w-45 h-40 bg-gray-200 rounded'></div>
         </div>
      </div>
   )
}

export default LoadingHome
