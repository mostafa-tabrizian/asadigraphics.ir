import { toast } from 'react-toastify'

const sizeCalculator = (size: number) => (size / 1024 / 1024) * 1000 // ex: 400 KB

const filesSizeValidation = (files: File[]) => {
   let invalidFile: undefined | { name: string; size: number; valid: boolean }

   files.map((file) => {
      const size = sizeCalculator(file.size)

      if (size > 1000) {
         const size = Math.round(sizeCalculator(file.size))
         invalidFile = { valid: false, size, name: file.name }
      }
   })

   if (invalidFile) {
      toast.warning(
         `سایز فایل ${invalidFile.name} برابر با ${invalidFile.size} کیلوبایت می‌باشد. حداکثر هر فایل می‌بایست 1000 کیلوبایت معادل 1 مگابایت باشد`,
      )
      return false
   } else return true
}

export default filesSizeValidation
