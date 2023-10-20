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
      changeFrequency: 'weekly',
      priority: 0.8,
   }))

   const home = {
      url: `${URL}`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 1,
   }

   const allDesigns = {
      url: `${URL}/search/all?type=all&amp;name=تمامی+طرح+ها`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
   }

   return [home, allDesigns, ...categories]
}
