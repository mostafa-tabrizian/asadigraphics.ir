import mongoose from 'mongoose'

export interface IDesign {
   active: boolean
   _id: string
   name: string
   category: string
   designFront: string
   designBack: string

   createdAt: Date
   updatedAt: Date
}

const DesignSchema = new mongoose.Schema({
   active: {
      type: Boolean,
      default: true,
   },
   name: String,
   category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Category',
      required: true,
   },
   designFront: String,
   designBack: String,

})

DesignSchema.set('timestamps', true)

DesignSchema.index({ name: 'text', slug: 'text', description: 'text' })

export default mongoose.models.Design || mongoose.model('Design', DesignSchema)
