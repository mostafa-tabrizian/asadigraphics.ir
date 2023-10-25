const uploadErrorDeleteData = async (_id: string) => {
    try {
        const res = await fetch('/api/--admin--/slide', {
            method: 'DELETE',
            body: JSON.stringify({
                _id,
            }),
        })

        if (!res.ok) throw new Error()

        return res
    } catch (err) {
        const toast = await import('react-toastify').then(mod => mod.toast)
        toast.error('در حذف عکس خطایی رخ داد. لطفا مجدد تلاش کنید.')
        return console.error(err)
    }
}

export default uploadErrorDeleteData
