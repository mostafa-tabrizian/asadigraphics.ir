import mongoose from 'mongoose'

export interface ISlide {
   _id: string
   src: string
   alt: string
   link: string
   active: boolean
   createdAt: Date
   updatedAt: Date
}

const SlideSchema = new mongoose.Schema({
   src: String,
   alt: String,
   link: String,
   active: Boolean,
})

SlideSchema.set('timestamps', true)

export default mongoose.models.Slide || mongoose.model('Slide', SlideSchema)
