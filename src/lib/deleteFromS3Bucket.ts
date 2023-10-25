const deleteFromS3Bucket = async (imageKey: string, folder: string) => {
   try {
      const res = await fetch('/api/--admin--/design/image/s3', {
         method: 'DELETE',
         body: JSON.stringify({
            folder,
            imageKey,
         }),
      })

      if (!res.ok) throw new Error()

      return res
   } catch (err) {
      const toast = await import('react-toastify').then((mod) => mod.toast)
      toast.error('در حذف عکس خطایی رخ داد. لطفا مجدد تلاش کنید.')
      return console.error(err)
   }
}

export default deleteFromS3Bucket
