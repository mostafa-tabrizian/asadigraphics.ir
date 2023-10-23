import { toast } from 'react-toastify'

const uploadErrorDeleteData = async (type: string, imageKey: string, _id: string) => {
   try {
      const res = await fetch('/api/--admin--/design/image/db', {
         method: 'DELETE',
         body: JSON.stringify({
            type,
            imageKey,
            _id
         }),
      })

      if (!res.ok) throw new Error()

      return res
   } catch (err) {
      toast.error('در حذف عکس خطایی رخ داد. لطفا مجدد تلاش کنید.')
      return console.error(err)
   }
}

export default uploadErrorDeleteData
