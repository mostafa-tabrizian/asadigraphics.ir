const nowDate: () => Date = () => {
   return new Date(new Date().getTime() + 3.5 * 60 * 60 * 1000)
}

export default nowDate
