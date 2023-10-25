const DesignLoading = () => {
   return (
      <div className='mx-2 my-4 animate-pulse space-y-4 md:mx-auto md:mt-20 md:grid md:min-h-[80vh] md:grid-cols-2'>
         <div className='md:m-l-8 mx-auto h-[408px] w-screen rounded-lg bg-gray-200 md:w-full'></div>

         <div>
            <div className='w-[96vw] space-y-6 bg-gray-200 p-4 md:ml-4 md:w-full'>
               <div className='mb-3 mr-3 h-10 w-full rounded-lg bg-gray-300'></div>
               <div className='flex justify-between'>
                  <div className='h-4 w-40 rounded-lg bg-gray-300'></div>
                  <div className='h-4 w-12 rounded-lg bg-gray-300'></div>
               </div>
               <div className='h-4 w-12 rounded-lg bg-gray-300'></div>
               <div className='mt-1 h-24 w-full rounded-lg bg-gray-300 md:h-48'></div>
               <div className='flex justify-between'>
                  <div className='h-4 w-40 rounded-lg bg-gray-300'></div>
                  <div className='h-4 w-12 rounded-lg bg-gray-300'></div>
               </div>
            </div>
         </div>
      </div>
   )
}

export default DesignLoading
