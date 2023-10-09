// /* eslint-disable camelcase */

// 'use client'

// import { useEffect } from 'react'
// import { useSearchParams } from 'next/navigation'

// const GTMSearch = ({ query }: { query: string }) => {
//    const searchParams = useSearchParams()
//    const type = searchParams.get('type')

//    useEffect(() => {
//       if (type !== 'search') return

//       // @ts-ignore
//       window.dataLayer = window.dataLayer || []

//       // @ts-ignore
//       window.dataLayer.push({
//          event: 'search',
//          search_term: query,
//       })

//       return () => {}
//    }, [query, type])

//    return <span></span>
// }

// export default GTMSearch
