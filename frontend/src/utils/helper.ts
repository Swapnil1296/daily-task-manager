
import * as yup from 'yup';

export const validationSchemas = {
    
    validationSchemaLoginForm:yup.object().shape({
      email: yup.string().email().required("Email is required"),
      password: yup.string().required("Password is required"),
    }),
  validationSchemaSignUpForm: yup.object().shape({
    fullname: yup.string()
      .required('Full name is required')
      .min(2, 'Name must be at least 2 characters').matches(/^[A-Za-z\s.']+$/, 'Invalid name').max(50, 'Name must be less than 50 characters'),
    email: yup.string()
      .email('Invalid email address')
      .required('Email is required'),
    password: yup.string()
      .required('Password is required')
      .min(8, 'Password must be at least 8 characters')
      // .matches(
      //   /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
      //   'Password must contain at least one uppercase letter, one lowercase letter, and one number'
    // ),
    ,
    confirmPassword: yup.string()
      .required('Please confirm your password')
      .oneOf([yup.ref('password')], 'Passwords must match')
  }),

  validationSchemaAddTask: yup.object().shape({
    title: yup.string().required('Title is required'),
    description: yup.string().required('Description is required'),
    dueDate: yup.string().required('Due date is required'),
    priority: yup.string().required('Priority is required'),
    tags: yup.array().of(yup.string()),
    subtasks: yup.array().of(yup.string()),
  });

}