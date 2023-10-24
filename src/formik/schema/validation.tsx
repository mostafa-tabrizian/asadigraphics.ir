import * as yup from 'yup'

export const DesignEditForm = yup.object().shape({
   name: yup
      .string()
      .min(3, 'عنوان حداقل باید ۳ کارکتر باشد')
      .required('عنوان طرح را وارد کنید')
      .matches(/^[^-]*$/, { message: 'نباید علامت - در نام طرح باشد' }),
   category: yup.object().required('دسته را وارد کنید'),
   client: yup
      .string()
      .min(3, 'عنوان سفارش دهنده بیش از حد کوتاه است')
      .required('عنوان سفارش دهنده می‌بایست ثبت شود'),
   description: yup
      .string()
      .min(40, 'توضیحات بیش از حد کوتاه است')
      .required('توضیحات می‌بایست ثبت شود'),
   designedAt: yup
      .string()
      .min(9, 'تاریخ طراحی بیشت از حد کوتاه است')
      .required('تاریخ طراحی می‌بایست ثبت شود'),
   colorPalettes: yup
      .string()
      .min(7, 'حداقل یک پالت رنگی می‌بایست ثبت گردد')
      .required('پالت رنگ می‌بایست ثبت شود'),
})

export const NameSlugValidation = yup.object().shape({
   name: yup
      .string()
      .min(3, 'حداقل ۳ کارکتر')
      .required('عنوان را وارد کنید')
      .matches(/^[^-]*$/, { message: 'نباید علامت - در نام طرح باشد' }),
})
