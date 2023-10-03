/* eslint-disable camelcase */

'use client'

import { IDesign } from '@/models/design'
import { useEffect } from 'react'

const GTMViewDesign = ({
   params: { design, category, brand },
}: {
   params: { design: IDesign; category: string; brand: string }
}) => {
   useEffect(() => {
      // @ts-ignore
      window.dataLayer = window.dataLayer || []

      // @ts-ignore
      window.dataLayer.push({
         event: 'view_item',
         ecommerce: {
            currency: 'TRY',
            value: design.price - design.discount,
            items: [
               {
                  item_id: design.barcode,
                  item_name: design.name,
                  discount: design.discount,
                  item_brand: brand,
                  item_category: category,
                  price: design.price,
                  quantity: design.inStock ? 1 : 0,
               },
            ],
         },
      })

      return () => {}
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [])

   return <span></span>
}

export default GTMViewDesign
