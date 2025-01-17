import { ErrorMessage, Field, Formik, Form } from "formik";
import { motion } from "framer-motion";
import { useState } from "react";
import { validationSchemas } from "../utils/helper";
import axios, { AxiosError } from "../services/api/AxiosInterceptor";
import { showErrorAlert } from "../utils/alertUtils";
import { useNavigate } from "react-router-dom";

interface SignUpProps {
  fullname: string;
  email: string;
  password: string;
  confirmPassword: string;
}

type FieldNames = keyof SignUpProps;

interface FormField {
  id: FieldNames;
  name: FieldNames;
  type: string;
  label: string;
  placeholder: string;
}

const SignUp = () => {
  const [initialValues] = useState<SignUpProps>({
    fullname: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const formFields: FormField[] = [
    {
      id: "fullname",
      name: "fullname",
      type: "text",
      label: "Full Name",
      placeholder: "Enter your name"
    },
    {
      id: "email",
      name: "email",
      type: "email",
      label: "Email",
      placeholder: "Enter your email"
    },
    {
      id: "password",
      name: "password",
      type: "password",
      label: "Password",
      placeholder: "Enter your password"
    },
    {
      id: "confirmPassword",
      name: "confirmPassword",
      type: "password",
      label: "Confirm Password",
      placeholder: "Confirm your password"
    }
  ];
  const navigate = useNavigate()

  const handleSubmit = async (values: SignUpProps) => {
    try {
      const { fullname, email, password } = values;
      const payload = {
        name: fullname,
        email,
        password,
      };

      const res = await axios.post('/auth/signup', payload);

      if (res?.data?.success) {
        navigate('/');
      }
    } catch (err) {
      const error = err as AxiosError;

      if (error.response && error.response.data) {
        const { success, message } = error.response.data as { success: boolean; message: string };

        if (!success) {
          showErrorAlert("Error!", message, "Try again");
        }
      } else {
        console.error("Unexpected error:", error);
        showErrorAlert("Error!", "An unexpected error occurred. Please try again.", "Try again");
      }
    }
  };


  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-indigo-300 via-purple-300 to-pink-300">
      <motion.div
        className="w-full max-w-md mt-20 p-8 bg-white rounded-lg shadow-lg"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
          Create an Account
        </h2>

        <Formik
          initialValues={initialValues}
          validationSchema={validationSchemas.validationSchemaSignUpForm}
          validateOnBlur={true}
          validateOnChange={true}
          enableReinitialize
          onSubmit={(values, { setSubmitting }) => {
            handleSubmit(values)
            setSubmitting(false);
          }}
        >
          {({ isSubmitting, isValid, dirty, touched, errors }) => (
            <Form className="space-y-6">
              {formFields.map((field) => (
                <div key={field.id}>
                  <label className="block text-sm font-medium text-gray-600">
                    {field.label}
                  </label>
                  <Field
                    type={field.type}
                    placeholder={field.placeholder}
                    name={field.name}
                    id={field.id}
                    className={`w-full px-4 py-2 border rounded-md focus:ring focus:ring-indigo-200 focus:border-indigo-400 ${touched[field.name] && errors[field.name]
                      ? 'border-red-500'
                      : 'border-gray-300'
                      }`}
                  />
                  <ErrorMessage
                    name={field.name}
                    render={msg => (
                      <div className="text-red-500 text-sm mt-1">{msg}</div>
                    )}
                  />
                </div>
              ))}

              <button
                type="submit"
                disabled={!dirty || !isValid || isSubmitting}
                className={`w-full py-3 px-4 rounded-md text-white shadow-md transition-colors ${!dirty || !isValid || isSubmitting
                  ? 'bg-gray-400 cursor-not-allowed'
                  : 'bg-indigo-500 hover:bg-indigo-600'
                  }`}
              >
                {isSubmitting ? 'Signing up...' : 'Sign Up'}
              </button>
            </Form>
          )}
        </Formik>

        <p className="text-sm text-center text-gray-600 mt-6">
          Already have an account?{" "}
          <a href="#" className="text-indigo-500 hover:underline">
            Log In
          </a>
        </p>
      </motion.div>
    </div>
  );
};

export default SignUp;