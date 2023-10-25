'use client'

import { useEffect } from 'react'

const OnSubmittingPreventExit = ({ isSubmitting }: { isSubmitting: boolean }) => {
   useEffect(() => {
      const beforeUnloadHandler = (e: BeforeUnloadEvent) => {
         if (isSubmitting) {
            e.preventDefault()
            e.returnValue = 'در حال انجام عملیاتی هستید. لطفا تا پایان عملیات از صفحه خارج نشوید.'
         }
      }

      window.addEventListener('beforeunload', beforeUnloadHandler)

      return () => window.removeEventListener('beforeunload', beforeUnloadHandler)
   }, [isSubmitting])

   return <span></span>
}

export default OnSubmittingPreventExit
