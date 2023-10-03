import { NextResponse } from 'next/server'

import Design from '@/models/design'
import dbConnect from '@/lib/dbConnect'

interface BodyType {
   type: string
   key: string
   _id: string
}

export async function POST(req: Request) {
   const { type, key, _id }: BodyType = await req.json()

   await dbConnect()

   let res

   if (type == 'front') {
      res = await Design.findOneAndUpdate(
         {
            _id: _id,
         },
         {
            designFront: key,
         },
      ).exec()
   } else if (type == 'back') {
      res = await Design.findOneAndUpdate(
         {
            _id: _id,
         },
         {
            designBack: key,
         },
      ).exec()
   }

   return NextResponse.json({ res })
}

export async function DELETE(req: Request) {
   const { type, _id }: BodyType = await req.json()

   await dbConnect()

   let res

   if (type == 'front') {
      res = await Design.findOneAndUpdate(
         {
            _id: _id,
         },
         {
            designFront: '',
         },
      ).exec()
   } else if (type == 'back') {
      res = await Design.findOneAndUpdate(
         {
            _id: _id,
         },
         {
            designBack: '',
         },
      ).exec()
   }

   return NextResponse.json({ res })
}
