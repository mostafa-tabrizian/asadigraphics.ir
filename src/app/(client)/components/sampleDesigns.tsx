'use client'

import Image from 'next/image'

import PhotoAlbum from 'react-photo-album'

const SampleDesigns = () => {
   const photos = [
      {
         src: 'https://images.unsplash.com/photo-1608481337062-4093bf3ed404?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=240&q=80',
         width: 9,
         height: 16,
      },
      {
         src: 'https://images.unsplash.com/photo-1605973029521-8154da591bd7?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=240&q=80',
         width: 900,
         height: 1600,
      },
      {
         src: 'https://images.unsplash.com/photo-1418065460487-3e41a6c84dc5?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=240&q=80',
         width: 1600,
         height: 900,
      },
      {
         src: 'https://images.unsplash.com/photo-1505820013142-f86a3439c5b2?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=240&q=80',
         width: 700,
         height: 700,
      },
      {
         src: 'https://images.unsplash.com/photo-1610448721566-47369c768e70?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=240&q=80',
         width: 900,
         height: 1600,
      },
      {
         src: 'https://images.unsplash.com/photo-1476842384041-a57a4f124e2e?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=240&q=80',
         width: 900,
         height: 600,
      },
      {
         src: 'https://images.unsplash.com/photo-1585338447937-7082f8fc763d?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=240&q=80',
         width: 900,
         height: 1600,
      },
      {
         src: 'https://images.unsplash.com/photo-1596370743446-6a7ef43a36f9?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=240&q=80',
         width: 900,
         height: 600,
      },
   ]

   return (
      <div className='border-t-2 border-black/25 rounded-2xl bg-gradient-to-b from-[#ff7b005f] via-transparent to-transparent'>
         <h2 className='my-10 text-center'>نمونه طراحی ها</h2>
         <div className='mx-5 relative'>
            <PhotoAlbum
               layout='columns'
               columns={2}
               photos={photos}
               //    renderPhoto={({
               //       photo,
               //       imageProps: { alt, title, sizes, className, onClick },
               //       wrapperStyle,
               //    }) => {
               //       return (
               //          <div style={{ ...wrapperStyle, position: 'relative' }}>
               //             <Image
               //                fill
               //                src={photo}
               //                placeholder={'blurDataURL' in photo ? 'blur' : undefined}
               //                {...{ alt, title, sizes, className, onClick }}
               //             />
               //          </div>
               //       )
               //    }}
            />
            <span className='bg-gradient-to-t from-[#F2F2F2] rounded-xl via-transparent to-transparent absolute bottom-0 h-screen w-full'></span>
            <button className='flex w-full justify-center'>
               <span className='border-2 border-black rounded-full yekanBold px-3 py-1 absolute bottom-0 bg-[#F2F2F2]'>
                  نمایش بیشتر
               </span>
            </button>
         </div>
      </div>
   )
}

export default SampleDesigns
