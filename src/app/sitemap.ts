import Category from '@/models/category'
import dbConnect from '@/lib/dbConnect'
import hyphen from '@/lib/hyphen'

const URL = 'https://asadigraphics.ir'

async function getAllPages() {
   await dbConnect()
   const categoriesData = await Category.find()

   return { categoriesData }
}

export default async function sitemap() {
   const { categoriesData } = await getAllPages()

   const categories = categoriesData.map(({ name, slug, updatedAt }) => ({
      url: `${URL}/search/${hyphen(slug)}?type=category&amp;name=${name}`,
      lastModified: updatedAt,
   }))

   const routes = ['', '/search/all?type=all&name=تمامی+طرح+ها'].map((route) => ({
      url: `${URL}${route}`,
      lastModified: new Date().toISOString(),
   }))

   return [...routes, ...categories]
}
