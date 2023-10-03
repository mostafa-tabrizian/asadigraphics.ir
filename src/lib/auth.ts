import type { NextAuthOptions } from 'next-auth'
import bcrypt from 'bcrypt'
import CredentialsProvider from 'next-auth/providers/credentials'
import User, { IUser } from '@/models/user'
import dbConnect from './dbConnect'

interface Credential {
   username: string
   password: string
}

const authOptions: NextAuthOptions = {
   secret: process.env.NEXTAUTH_SECRET,

   providers: [
      CredentialsProvider({
         name: 'Credentials',

         credentials: {
            username: {
               label: 'نام کاربری',
               type: 'text',
            },
            password: {
               label: 'رمز عبور',
               type: 'password',
            },
         },

         // @ts-ignore
         async authorize(credentials: Credential | undefined) {
            if (!credentials) return null

            const { username, password } = credentials

            await dbConnect()
            const user = await User.findOne({
               username: username,
            })

            if (!user) return null

            const passwordsMatch = bcrypt.compareSync(password, user.password)
            if (!passwordsMatch) return null

            user.lastVisit = new Date()
            user.save()

            const {
               // eslint-disable-next-line @typescript-eslint/no-unused-vars
               _doc: { password: _, ...filteredUser },
            } = user as { _doc: IUser } & {
               password: string
            }

            return filteredUser
         },
      }),
   ],
   callbacks: {
      // @ts-ignore
      async jwt({ token, user }) {
         return { ...token, ...user }
      },
      // @ts-ignore
      async session({ session, token }) {
         session.user = token

         delete token.password
         delete token.iat
         delete token.exp
         delete token.jti

         return token
      },
   },
}

export default authOptions
