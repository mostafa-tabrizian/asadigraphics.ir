import { NextResponse } from 'next/server'

import dbConnect from '@/lib/dbConnect'
import Design from '@/models/design'

export async function POST(request: Request) {
   const {
      name,

      category,

      active,
   }: {
      name: string
      category: object
      active: boolean
   } = await request.json()

   try {
      await dbConnect()
      const design = await Design.create({
         name,
         category,
         active: active,
      })

      return NextResponse.json(design)
   } catch (error) {
      return NextResponse.json({ status: 500, message: error })
   }
}

export async function PATCH(request: Request) {
   const {
      _id,
      name,
      category,
      active,
   }: {
      _id: string
      name: string
      category: object
      active: boolean
   } = await request.json()

   try {
      await dbConnect()
      const design = await Design.findOneAndUpdate(
         {
            _id: _id,
         },
         {
            name,
            category,
            active: active,
         },
      )

      return NextResponse.json(design)
   } catch (error) {
      // @ts-ignore
      if (error.code == 11000) {
         return NextResponse.json({ message: 'notUnique' })
      } else {
         return NextResponse.json({ status: 500, message: error })
      }
   }
}
