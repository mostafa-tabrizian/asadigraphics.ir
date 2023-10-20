import { getSignedUrl } from '@aws-sdk/s3-request-presigner'
import { S3Client, DeleteObjectCommand, PutObjectCommand } from '@aws-sdk/client-s3'
import { NextResponse } from 'next/server'

const s3Client = new S3Client({
   region: 'me-central-1',
   endpoint: process.env.LIARA_ENDPOINT,
   credentials: {
      accessKeyId: process.env.LIARA_ACCESS_KEY || '',
      secretAccessKey: process.env.LIARA_SECRET_KEY || '',
   },
})

export async function POST(req: Request) {
   const { imageName, folder } = await req.json()

   const uniqueId = Math.random().toString(36).substring(2, 7)
   const imageKey = `${uniqueId}-${imageName}`
   const Key = `/asadi_designs/${folder}/${imageKey}`

   const params = {
      Bucket: process.env.LIARA_BUCKET_NAME,
      Key,
   }

   const uploadUrl = await getSignedUrl(s3Client, new PutObjectCommand(params), {
      expiresIn: 3600,
   })

   return NextResponse.json({ imageKey, uploadUrl })
}

export async function DELETE(req: Request) {
   const { imageKey, folder } = await req.json()

   const Key = `/asadi_designs/${folder}/${imageKey}`

   const params = {
      Bucket: process.env.LIARA_BUCKET_NAME,
      Key,
   }

   const resDelete = await s3Client.send(new DeleteObjectCommand(params))

   return NextResponse.json({ resDelete })
}
