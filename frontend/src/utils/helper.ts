
import * as yup from 'yup';

export const validationSchemas = {
    
    validationSchemaLoginForm:yup.object().shape({
      email: yup.string().email().required("Email is required"),
      password: yup.string().required("Password is required"),
    }),

}