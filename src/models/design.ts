import mongoose from 'mongoose'

export interface IDesign {
   active: boolean
   _id: string
   name: string
   category: string
   frontSrc: string
   backSrc: string
   width: number
   height: number
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
   frontSrc: String,
   backSrc: String,
   width: Number,
   height: Number
})

DesignSchema.set('timestamps', true)

DesignSchema.index({ name: 'text' })

export default mongoose.models.Design || mongoose.model('Design', DesignSchema)
