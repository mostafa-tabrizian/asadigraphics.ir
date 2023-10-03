import mongoose from 'mongoose'

export interface IUser {
   _id: string
   username: string
   password: string
   createdAt: Date
   updatedAt: Date
   lastVisit: Date
}

const UserSchema = new mongoose.Schema({
   name: String,
   password: String,
   lastVisit: Date,
})

UserSchema.set('timestamps', true)

export default mongoose.models.User || mongoose.model('User', UserSchema)
