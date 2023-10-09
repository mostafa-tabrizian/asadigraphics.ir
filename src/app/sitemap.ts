import Design from '@/models/design'
import Category from '@/models/category'
import dbConnect from '@/lib/dbConnect'
import hyphen from '@/lib/hyphen'

const URL = 'https://asadidesigns.ir'

async function getAllPages() {
   await dbConnect()
   const designsData = await Design.find()
   const categoriesData = await Category.find()

   return { designsData, categoriesData }
}

export default async function sitemap() {
   const { designsData, categoriesData } = await getAllPages()

   const designs = designsData.map(({ name, updatedAt }) => ({
      url: `${URL}/design/${hyphen(name)}`,
      lastModified: updatedAt,
   }))

   const categories = categoriesData.map(({ name, slug, updatedAt }) => ({
      url: `${URL}/search/${hyphen(slug)}?type=category&amp;name=${name}`,
      lastModified: updatedAt,
   }))

   const routes = [''].map((route) => ({
      url: `${URL}${route}`,
      lastModified: new Date().toISOString(),
   }))

   return [...routes, ...designs, ...categories]
}
