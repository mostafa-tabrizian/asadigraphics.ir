export default function toFarsiNumber(number: string | number) {
   const farsiDigits = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹']

   return number.toString().replace(/\d/g, (x) => farsiDigits[parseInt(x)])
}
