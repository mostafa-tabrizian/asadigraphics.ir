import { NextResponse } from 'next/server'

import Design from '@/models/design'
import dbConnect from '@/lib/dbConnect'

interface BodyType {
   type: string
   imageKey: string
   imageDimention: [number, number]
   _id: string
}

export async function POST(req: Request) {
   const { type, imageKey, imageDimention, _id }: BodyType = await req.json()

   await dbConnect()

   let design

   if (type == 'front') {
      design = await Design.findOneAndUpdate(
         {
            _id: _id,
         },
         {
            frontSrc: imageKey,
            width: imageDimention[0],
            height: imageDimention[1],
         },
      ).exec()
   } else if (type == 'back') {
      design = await Design.findOne({ _id: _id }).exec()

      if (!design.frontSrc.length) {
         return NextResponse.json({ message: 'please upload front design first' })
      }

      if (
         Math.round((design.width / design.height) * 10) / 10
         !==
         Math.round((imageDimention[0] / imageDimention[1]) * 10) / 10
      ) {
         return NextResponse.json({ message: 'dimention not equal to front design' })
      }

      design.backSrc = imageKey
      design.save()

   } else if (type == 'gallery') {
      design = await Design.findOne({ _id: _id }).exec()
      design.gallery.push(imageKey)
      design.save()
   }

   return NextResponse.json({ design })
}

export async function DELETE(req: Request) {
   const { type, imageKey, _id }: BodyType = await req.json()

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
   } else if (type == 'gallery') {
      res = await Design.findOne({ _id: _id }).exec()
      const galleryAfterDelete = res.gallery.filter((item: string) => item !== imageKey)
      res.gallery = galleryAfterDelete
      res.save()
   }

   return NextResponse.json({ res })
}
