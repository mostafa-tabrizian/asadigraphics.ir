'use client'

import { useEffect, useState, memo } from 'react'
import CircularProgress from '@mui/material/CircularProgress'

import { IDesign } from '@/models/design'
import stringtoDate from '@/lib/stringToDate'
import DesignCards from '@/components/design/cards'
import FilterComponent, { FilterOptions } from './filter'
import SortComponent, { SortOptions } from './sort'
import { IBrand } from '@/models/brand'
import { IModel } from '@/models/model'

const Contents = memo(
   ({
      params: { dbDesigns, brands, models },
   }: {
      params: {
         dbDesigns: IDesign[]
         brands: IBrand[]
         models: IModel[]
      }
   }) => {
      const [loading, setLoading] = useState(true)
      const [initDesigns, setInitDesigns] = useState<IDesign[]>(dbDesigns)
      const [filteredDesigns, setFilteredDesigns] = useState<IDesign[]>([])

      const [filters, setFilters] = useState<{
         type: null | string
         priceRange: number[]
         brand: null | string
         model: null | string
      }>({
         type: null,
         priceRange: [0, 100],
         brand: null,
         model: null,
      })

      const [sortValue, setSortValue] = useState<string>('latest')

      useEffect(() => {
         return () => {
            setInitDesigns([])
            setFilteredDesigns([])
         }
      }, [])

      useEffect(() => {
         dbDesigns?.sort((a, b) => stringtoDate(b.createdAt) - stringtoDate(a.createdAt))
         setInitDesigns(dbDesigns)
         setFilteredDesigns(dbDesigns)
         setLoading(false)
      }, [dbDesigns])

      useEffect(() => {
         const handleSort = (designs: IDesign[]) => {
            let newSort

            switch (sortValue) {
               case 'latest':
                  newSort = [...designs].sort(
                     (a, b) => stringtoDate(b.createdAt) - stringtoDate(a.createdAt),
                  )
                  break
               case 'oldest':
                  newSort = [...designs].sort(
                     (a, b) => stringtoDate(a.createdAt) - stringtoDate(b.createdAt),
                  )
                  break

               case 'expensive':
                  newSort = [...designs].sort((a, b) => b.price - a.price)
                  break
               case 'cheap':
                  newSort = [...designs].sort((a, b) => a.price - b.price)
                  break
               default:
                  break
            }

            if (newSort) setFilteredDesigns(newSort)
         }

         const handleFilter = () => {
            let designs = initDesigns

            if (filters.type) {
               switch (filters.type) {
                  case 'discounted':
                     designs = designs.filter((design) => design.discount && design.inStock)
                     break
                  case 'available':
                     designs = designs.filter((design) => design.inStock)
                     break
               }
            }

            if (filters.priceRange[0] !== 0 || filters.priceRange[1] !== 100) {
               designs = designs.filter(
                  (design) =>
                     filters.priceRange[0] * 200_000 <= design.price &&
                     design.price <= filters.priceRange[1] * 200_000,
               )
            }

            if (filters.brand) {
               designs = designs.filter((design) => design.brand == filters.brand)
            }

            if (filters.model) {
               designs = designs.filter((design) => design.model == filters.model)
            }

            setFilteredDesigns(designs)
            handleSort(designs)
         }

         handleFilter()
      }, [filters, initDesigns, sortValue])

      return (
         <div>
            <div>
               <div className='flex md:hidden gap-x-4 text-gray-400 mb-8'>
                  <FilterComponent
                     filters={filters}
                     setFilters={setFilters}
                     brands={brands}
                     models={models}
                  />
                  <SortComponent sortValue={sortValue} setSortValue={setSortValue} />
               </div>
            </div>
            <div className='md:grid md:grid-cols-4 md:gap-3 items-start'>
               {filteredDesigns.length ? (
                  <div className='py-5 grid grid-cols-2 md:col-span-3 md:grid-cols-3 gap-3'>
                     {filteredDesigns.map((design) => {
                        if (design.active) {
                           return <DesignCards key={design._id} design={design} />
                        }
                        return
                     })}
                  </div>
               ) : (
                  <span className='grid-cols-2 md:col-span-3 text-lg font-medium text-center mt-5'>
                     {loading ? (
                        <CircularProgress color='primary' size={40} />
                     ) : (
                        '💢 با این فیلتر ها هیچ طرحی موجود نمی‌باشد'
                     )}
                  </span>
               )}

               <div className='col-span-1 hidden md:block'>
                  <SortOptions sortValue={sortValue} setSortValue={setSortValue} />
                  <FilterOptions
                     filters={filters}
                     setFilters={setFilters}
                     brands={brands}
                     models={models}
                  />
               </div>
            </div>
         </div>
      )
   },
)

Contents.displayName = 'Contents'

export default Contents
