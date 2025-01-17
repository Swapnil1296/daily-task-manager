
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
  }),
  validationSchemaTakeNotes : yup.object({
    title: yup.string()
      .required('Title is required')
      .max(100, 'Title must be 100 characters or less'),
    content: yup.string()
      .required('Note content is required')
      .max(1000, 'Note must be 1000 characters or less'),
    tags: yup.array().of(yup.string()),
    newTag: yup.string().max(20, 'Tag must be 20 characters or less')
  }),

}


function formatDateToDDMMYYYY(isoDate: string): string {
  const date = new Date(isoDate);

  // Ensure the date is valid
  if (isNaN(date.getTime())) {
    return "Invalid Date";
  }

  const day = String(date.getDate()).padStart(2, "0"); // Add leading zero if needed
  const month = String(date.getMonth() + 1).padStart(2, "0"); // Add leading zero if needed
  const year = date.getFullYear();

  return `${day}/${month}/${year}`;
}

export default formatDateToDDMMYYYY;
