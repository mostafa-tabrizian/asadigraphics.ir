import dbConnect from '@/lib/dbConnect'
import Category from '@/models/category'
import Design from '@/models/design'
import hyphen from '@/lib/hyphen'

const URL = 'https://asadigraphics.ir'

async function fetchData() {
   await dbConnect()
   const categoriesData = await Category.find()
   const designsData = await Design.find()

   return { categoriesData, designsData }
}

export default async function sitemap() {
   const { categoriesData, designsData } = await fetchData()

   const categories = categoriesData.map(({ name, slug, updatedAt }) => ({
      url: `${URL}/search/${hyphen(slug)}?type=category&amp;name=${name}`,
      lastModified: updatedAt,
      changeFrequency: 'weekly',
      priority: 0.7,
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

   const designsDetail = designsData.map(({ name, updatedAt }) => ({
      url: `${URL}/design/${hyphen(name)}`,
      lastModified: updatedAt,
      changeFrequency: 'weekly',
      priority: 0.9,
   }))

   return [home, allDesigns, ...categories, ...designsDetail]
}
