import { NextResponse } from 'next/server'

import Design from '@/models/design'
import dbConnect from '@/lib/dbConnect'

interface BodyType {
   type: string
   key: string
   imageDimention: [number, number]
   _id: string
}

export async function POST(req: Request) {
   const { type, key, imageDimention, _id }: BodyType = await req.json()

   await dbConnect()

   let res

   if (type == 'front') {
      res = await Design.findOneAndUpdate(
         {
            _id: _id,
         },
         {
            frontSrc: key,
            width: imageDimention[0],
            height: imageDimention[1]
         },
      ).exec()
   } else if (type == 'back') {
      res = await Design.findOneAndUpdate(
         {
            _id: _id,
         },
         {
            backSrc: key,
            width: imageDimention[0],
            height: imageDimention[1]
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
            frontSrc: '',
         },
      ).exec()
   } else if (type == 'back') {
      res = await Design.findOneAndUpdate(
         {
            _id: _id,
         },
         {
            backSrc: '',
         },
      ).exec()
   }

   return NextResponse.json({ res })
}
