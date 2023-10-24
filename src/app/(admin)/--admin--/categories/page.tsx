import Link from 'next/link'

import CategoryNewInput from './create'
import DeleteButton from './delete'
import NameAndSlug from './nameAndSlug'

import Category from '@/models/category'
import Design from '@/models/design'

import dynamic from 'next/dynamic'
const Breadcrumbs = dynamic(() => import('@mui/material/Breadcrumbs'), { ssr: false })

import dbConnect from '@/lib/dbConnect'
import hyphen from '@/lib/hyphen'
import Cover from './cover'

export const metadata = {
   title: '‌اسدی گرافیک | پنل ادمین | دسته بندی ها',
}

export const revalidate = 0

const getCategories = async () => {
   await dbConnect()
   return await Category.find()
}

const getCategoriesDesignsCount = async () => {
   const categoriesDesignCount: { [key: string]: number } = {}

   await dbConnect()
   const designs = await Design.find()

   designs.map((design) => {
      const categoryId = design.category
      if (categoriesDesignCount[categoryId]) {
         categoriesDesignCount[categoryId] += 1
      } else {
         categoriesDesignCount[categoryId] = 1
      }
   })

   return categoriesDesignCount
}

const AdminCategories = async () => {
   const categories = await getCategories()
   const categoriesDesignCount = await getCategoriesDesignsCount()

   return (
      <div className='mx-6 my-16 max-w-screen-md space-y-10 md:mx-auto'>
         <>
            <Breadcrumbs aria-label='breadcrumb'>
               <Link className='text-gray-400' href='/'>
                  صفحه اصلی
               </Link>
               <Link className='text-gray-400' href='/--admin--'>
                  ادمین
               </Link>
               <h5 className='fondnt-semibold'>دسته بندی ها</h5>
            </Breadcrumbs>

            <CategoryNewInput />

            <div className='rtl'>
               <div className='mb-3 grid grid-cols-7 items-center justify-between rounded-lg bg-white p-5 py-2 text-center'>
                  <div className='col-span-4 grid grid-cols-2'>
                     <p className='flex'>نام</p>
                     <p className='flex'>اسلاگ</p>
                  </div>
                  <p className='col-span-1'>کاور</p>
                  <p className='col-span-1'>طرح ها</p>
               </div>

               <div className='space-y-3'>
                  {categories.length ? (
                     categories.map((category) => {
                        const designsLength = categoriesDesignCount[category._id] | 0
                        return (
                           <div
                              key={category._id}
                              className='grid grid-cols-7 items-center justify-between rounded-lg bg-white p-2 text-center'
                           >
                              <NameAndSlug params={JSON.parse(JSON.stringify({ ...category }))} />
                              <Cover
                                 params={JSON.parse(
                                    JSON.stringify({
                                       _id: category._id,
                                       name: category.name,
                                       cover: category?.cover,
                                    }),
                                 )}
                              />
                              <Link
                                 href={`/search/${hyphen(category.slug)}?type=category&name=${
                                    category.name
                                 }`}
                                 target='_blank'
                              >
                                 <p>{designsLength}</p>
                              </Link>
                              <DeleteButton
                                 params={JSON.parse(
                                    JSON.stringify({
                                       _id: category._id,
                                       ableToDelete: designsLength ? false : true,
                                    }),
                                 )}
                              />
                           </div>
                        )
                     })
                  ) : (
                     <h3 className='text-center'>هیچ دسته بندی ثبت نشده است</h3>
                  )}
               </div>
            </div>
         </>
      </div>
   )
}

export default AdminCategories
