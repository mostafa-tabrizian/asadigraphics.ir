import { toast } from 'react-toastify'

const createS3Presign = async (imageName: string, folder: string) => {
   try {
      const res = await fetch('/api/--admin--/design/image/s3', {
         method: 'POST',
         body: JSON.stringify({
            folder,
            imageName,
         }),
      })

      if (!res.ok) throw new Error()

      return res
   } catch (err) {
      toast.error('در ایجاد لینک باکِت خطایی رخ داد. لطفا مجدد تلاش کنید.')
      console.error(err)
      return false
   }
}

export default createS3Presign
