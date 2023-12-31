const putInS3Bucket = async (uploadUrl: string, imageFile: File) => {
   try {
      const res = await fetch(uploadUrl, {
         method: 'PUT',
         body: imageFile,
      })

      if (!res.ok) throw new Error()

      return res
   } catch (err) {
      const toast = await import('react-toastify').then((mod) => mod.toast)
      toast.error('در آپلود عکس خطایی رخ داد. لطفا مجدد تلاش کنید.')
      console.error(err)
      return false
   }
}

export default putInS3Bucket
