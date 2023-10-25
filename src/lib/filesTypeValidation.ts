const filesTypeValidation = async (files: File[]) => {
   let invalidFile: undefined | { name: string; valid: boolean }

   files.map((file) => {
      if (!['image/jpeg', 'image/webp', 'image/avif'].includes(file.type)) {
         invalidFile = { valid: false, name: file.name }
      }
   })

   if (invalidFile) {
      const toast = await import('react-toastify').then((mod) => mod.toast)
      toast.warning(`تایپ فایل ${invalidFile.name} می‌بایست jpeg webp یا avif باشد`)
      return false
   } else return true
}

export default filesTypeValidation
