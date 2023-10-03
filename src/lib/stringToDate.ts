const stringtoDate = (stringDate: Date) => {
   return new Date(stringDate)?.getDate()
}

export default stringtoDate
