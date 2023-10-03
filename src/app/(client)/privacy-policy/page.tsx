const PrivacyPolicy = () => {
   return (
      <div className='px-5 md:px-0 text-right md:mx-auto my-6'>
         <div>
            <svg
               className='h-8 w-8 ml-auto mb-2 flex justify-end text-blue-600'
               width='24'
               height='24'
               viewBox='0 0 24 24'
               strokeWidth='2'
               stroke='currentColor'
               fill='none'
               strokeLinecap='round'
               strokeLinejoin='round'
            >
               {' '}
               <path stroke='none' d='M0 0h24v24H0z' /> <path d='M9 12l2 2l4 -4' />{' '}
               <path d='M12 3a12 12 0 0 0 8.5 3a12 12 0 0 1 -8.5 15a12 12 0 0 1 -8.5 -15a12 12 0 0 0 8.5 -3' />
            </svg>

            <h1>حریم خصوصی</h1>
         </div>

         <p className='tracking-wide leading-8 mt-5'></p>
      </div>
   )
}

export default PrivacyPolicy
