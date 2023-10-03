'use client'

import { useSearchParams } from 'next/navigation'

const SearchTitle = () => {
   const searchParams = useSearchParams()

   const name = searchParams.get('name')

   return <h1 className='text-center font-bold'>{name}</h1>
}

export default SearchTitle
