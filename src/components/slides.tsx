'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'

import 'keen-slider/keen-slider.min.css'
import { useKeenSlider } from 'keen-slider/react'

import { ISlide } from '@/models/slide'

const Slides = ({ slides }: { slides: ISlide[] }) => {
   const [opacities, setOpacities] = useState<number[]>([])

   // const [currentSlide, setCurrentSlide] = useState(0)
   // const [loaded, setLoaded] = useState(false)

   const [sliderRef, instanceRef] = useKeenSlider<HTMLDivElement>(
      {
         initial: 0,
         slides: slides.length,
         rtl: true,
         loop: true,
         detailsChanged(s) {
            const newOpacities = s.track.details.slides.map((slide) => slide.portion)
            setOpacities(newOpacities)
         },
         // slideChanged(slider) {
         //    setCurrentSlide(slider.track.details.rel)
         // },
         // created() {
         //    setLoaded(true)
         // },
      },
      [
         (slider) => {
            let timeout: ReturnType<typeof setTimeout>
            let mouseOver = false
            function clearNextTimeout() {
               clearTimeout(timeout)
            }
            function nextTimeout() {
               clearTimeout(timeout)
               if (mouseOver) return
               timeout = setTimeout(() => {
                  slider.next()
               }, 3500)
            }
            slider.on('created', () => {
               slider.container.addEventListener('mouseover', () => {
                  mouseOver = true
                  clearNextTimeout()
               })
               slider.container.addEventListener('mouseout', () => {
                  mouseOver = false
                  nextTimeout()
               })
               nextTimeout()
            })
            slider.on('dragStarted', clearNextTimeout)
            slider.on('animationEnded', nextTimeout)
            slider.on('updated', nextTimeout)
         },
      ],
   )

   return (
      <div className='mx-auto w-full px-3 md:w-4/6 rtl relative space-y-3'>
         <div ref={sliderRef} className='h-full aspect-video relative'>
            {slides.map((slide, idx) => {
               if (!slide.active) return

               return (
                  <div
                     key={idx}
                     className='absolute top-0 w-full'
                     style={{ zIndex: (opacities[idx] * 10) | 0 }}
                  >
                     <Link
                        aria-label='لینک به اسلاید'
                        id='slide'
                        key={slide._id}
                        href={slide.link}
                        style={{ opacity: opacities[idx] }}
                     >
                        <Image
                           className='rounded-xl object-fit'
                           src={`https://tabrizian.storage.iran.liara.space/asadi_designs/slides/${slide.src}`}
                           alt={slide.alt}
                           sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
                           width={600}
                           height={337}
                           priority
                        />
                     </Link>
                  </div>
               )
            })}
         </div>
         {/* {loaded && instanceRef.current && (
            <div className='dots rtl'>
               {[...Array(instanceRef.current.track.details.slides.length).keys()].map((idx) => {
                  return (
                     <button
                        aria-label='slides dots'
                        key={idx}
                        onClick={() => {
                           instanceRef.current?.moveToIdx(idx)
                        }}
                        className={'dot' + (currentSlide === idx ? ' active' : '')}
                     ></button>
                  )
               })}
            </div>
         )} */}
      </div>
   )
}

export default Slides
