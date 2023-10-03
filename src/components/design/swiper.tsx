'use client'

import DesignCards from '@/components/design/cards'
import { IDesign } from '@/models/design'

import { useKeenSlider } from 'keen-slider/react'
import 'keen-slider/keen-slider.min.css'

const DesignSwiper = ({ designs }: { designs: IDesign[] }) => {
   const [ref] = useKeenSlider<HTMLDivElement>({
      rtl: true,
      slides: {
         perView: 2.2,
      },
      breakpoints: {
         '(min-width: 640px)': {
            slides: {
               perView: 4.2,
               spacing: 5,
            },
         },
      },
   })

   return (
      <div ref={ref} className='keen-slider'>
         {designs.map((design, idx) => {
            if (design.active) {
               return (
                  <div key={idx} className='keen-slider__slide py-3 px-2 !h-auto ltr rounded-xl'>
                     <DesignCards key={design._id} design={design} />
                  </div>
               )
            }
            return
         })}
      </div>
   )
}

export default DesignSwiper
