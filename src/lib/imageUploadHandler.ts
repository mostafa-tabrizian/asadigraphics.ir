import { toast } from 'react-toastify'
import createS3Presign from './createS3Presign'
import putInS3Bucket from './PutInS3Bucket'
import deleteFromS3Bucket from './deleteFromS3Bucket'

const imageUploadHandler = async (imageFile: File, folder: string) => {
   const deleteLeftOvers = async (imageKey: string) => {
      try {
         await deleteFromS3Bucket(imageKey, folder)
      } catch (err) {
         console.error('deleteLeftOvers', err)
      }
   }

   try {
      const imageName = imageFile.name.replace(' ', '-')

      const s3SignedUrl = await createS3Presign(imageName, folder)

      if (!s3SignedUrl) throw new Error('s3 signed url')

      const { imageKey, uploadUrl } = await s3SignedUrl.json()

      const fileUploadResult = await putInS3Bucket(uploadUrl, imageFile)

      if (!fileUploadResult) {
         await deleteLeftOvers(imageKey)
         throw new Error('file upload to s3')
      }

      return { imageKey, imageName }
   } catch (err) {
      toast.error(
         'در آپلود تصویر خطایی رخ داد. (اگر از VPN استفاده می‌کنید لطفا ابتدا آن را خاموش کنید)',
      )
      console.error(err)

      return false
   }
}

export default imageUploadHandler
