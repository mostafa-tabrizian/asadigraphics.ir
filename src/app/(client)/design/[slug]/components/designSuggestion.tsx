import { IDesign } from '@/models/design'

import DesignSwiper from '@/components/design/swiper'

const DesignSuggestion = ({ designs }: { designs: IDesign[] }) => {
   return (
      <div className='bg-white shadow text-right shadow-slate-200 rounded-lg mt-6 px-3 p-5 space-y-5'>
         <span className='doranExtraBold text-xl'>طرح ها مشابه</span>
         {designs.length ? (
            <DesignSwiper designs={JSON.parse(JSON.stringify(designs))} />
         ) : (
            <span className='block mt-1 text-center yekan1'>هیچ طرح مشابهی موجود نمی‌باشد</span>
         )}
      </div>
   )
}

export default DesignSuggestion
