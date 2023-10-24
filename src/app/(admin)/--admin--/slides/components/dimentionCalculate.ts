const dimentionCalculate = (file: File) => {
    return new Promise((resolve) => {
        const reader = new FileReader()

        const ratio169 = 1.8

        reader.readAsDataURL(file)

        reader.onload = (e) => {
            const img = new Image()
            // @ts-ignore
            img.src = e.target.result as string

            img.onload = () => {
                const slideRatio = Math.round((img.width / img.height) * 10) / 10

                if (slideRatio == ratio169) resolve(true)
                else resolve(false)
            }
        }
    })
}

export default dimentionCalculate