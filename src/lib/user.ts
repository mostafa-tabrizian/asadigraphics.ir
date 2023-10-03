import { getServerSession } from 'next-auth'
import User from '@/models/user'
import dbConnect from '@/lib/dbConnect'
import nowDate from '@/lib/nowDate'

import authOptions from './auth'

const UserDetail = async () => {
   const session: { username: string } | null = await getServerSession(authOptions)

   if (!session) return null

   await dbConnect()
   const user = await User.findOne({
      username: session.username,
   }).exec()

   user.lastVisit = nowDate()
   user.save()

   // eslint-disable-next-line @typescript-eslint/no-unused-vars
   const { password: _, ...filteredUser } = user._doc
   return filteredUser
}

export default UserDetail
