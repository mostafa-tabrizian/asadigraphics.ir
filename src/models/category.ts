import mongoose from 'mongoose'

export interface ICategory {
   _id: string
   slug: string
   name: string
   cover: string
   createdAt: Date
   updatedAt: Date
}

const CategorySchema = new mongoose.Schema({
   slug: {
      type: String,
      unique: true,
   },
   name: {
      type: String,
      unique: true,
   },
   cover: String,
})

CategorySchema.set('timestamps', true)

CategorySchema.index({ name: 'text', slug: 'text' })

export default mongoose.models.Category || mongoose.model('Category', CategorySchema)
