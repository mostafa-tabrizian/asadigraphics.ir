/* eslint-disable camelcase */

'use client'

import { IDesign } from '@/models/design'
import { useEffect } from 'react'

const GTMViewDesign = ({
   params: { designList, query },
}: {
   params: { designList: IDesign[]; query: string }
}) => {
   const suitableList = designList.map((design) => {
      return {
         item_id: design.barcode,
         item_name: design.name,
         discount: design.discount,
         price: design.price,
         quantity: design.inStock ? 1 : 0,
      }
   })

   useEffect(() => {
      ;() => {
         return {}
      }
   })

   useEffect(() => {
      // @ts-ignore
      window.dataLayer = window.dataLayer || []

      // @ts-ignore
      window.dataLayer.push({
         event: 'view_item_list',
         ecommerce: {
            item_list_name: query,
            items: suitableList,
         },
      })

      return () => {}
   }, [query, suitableList])

   return <span></span>
}

export default GTMViewDesign
