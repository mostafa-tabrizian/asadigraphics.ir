import { NextResponse } from 'next/server'

import Slide, { ISlide } from '@/models/slide'
import dbConnect from '@/lib/dbConnect'

interface BodyType {
   values: { alt: string; link: string; active: boolean }
   key: string
}

export async function POST(req: Request) {
   const { values, key }: BodyType = await req.json()

   await dbConnect()

   const newSlide = await Slide.create({
      src: key,
      alt: values.alt,
      link: values.link,
      active: values.active,
   })

   return NextResponse.json({ newSlide })
}

export async function PATCH(req: Request) {
   const { _id } = await req.json()

   try {
      await dbConnect()
      const slide: ISlide | null = await Slide.findOne({
         _id,
      })

      if (slide) {
         slide.active = !slide.active
         // @ts-ignore
         slide.save()
      } else throw new Error()

      return NextResponse.json({
         slide,
      })
   } catch (err) {
      return NextResponse.json({
         statue: 500,
         message: err,
      })
   }
}

export async function DELETE(req: Request) {
   const { _id }: { _id: string } = await req.json()

   await dbConnect()
   const res = await Slide.findOneAndDelete({ _id })

   return NextResponse.json({ res })
}
