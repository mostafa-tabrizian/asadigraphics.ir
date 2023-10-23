import * as yup from 'yup'

export const DesignEditForm = yup.object().shape({
   name: yup
      .string()
      .min(3, 'عنوان حداقل باید ۳ کارکتر باشد')
      .required('عنوان طرح را وارد کنید')
      .matches(/^[^-]*$/, { message: 'نباید علامت - در نام طرح باشد' }),
   category: yup.object().required('دسته را وارد کنید'),
})

export const NameSlugValidation = yup.object().shape({
   name: yup
      .string()
      .min(3, 'حداقل ۳ کارکتر')
      .required('عنوان را وارد کنید')
      .matches(/^[^-]*$/, { message: 'نباید علامت - در نام طرح باشد' }),
})