import mongoose from 'mongoose'

export interface IDesign {
   active: boolean
   _id: string
   name: string
   category: string
   frontSrc: string
   backSrc: string
   gallery: [string]
   width: number
   height: number
   client: string
   designedAt: string
   description: string
   colorPalettes: string
   createdAt: Date
   updatedAt: Date
}

const DesignSchema = new mongoose.Schema({
   active: {
      type: Boolean,
      default: true,
   },
   name: {
      type: String,
      unique: true,
   },
   category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Category',
      required: true,
   },
   frontSrc: String,
   backSrc: String,
   gallery: [String],
   width: Number,
   height: Number,
   client: String,
   designedAt: String,
   description: String,
   colorPalettes: String,
})

DesignSchema.set('timestamps', true)

DesignSchema.index({ name: 'text' }, { unique: true })

export default mongoose.models.Design || mongoose.model('Design', DesignSchema)
