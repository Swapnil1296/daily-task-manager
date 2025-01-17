import { Field, Formik, Form, ErrorMessage } from "formik";
import { motion } from "framer-motion";
import { useState } from "react";
import { validationSchemas } from "../utils/helper";
import { Link, useNavigate } from "react-router-dom";
import axiosInstance from "../services/api/AxiosInterceptor";
import { showErrorAlert } from "../utils/alertUtils";


interface LoginProps {
  // Define the props for this component
  email: string;
  password: string;
}

type FieldNames = keyof LoginProps;

interface FormField {
  // Define the form fields
  id: FieldNames;
  name: FieldNames;
  type: string;
  label: string;
  placeholder: string;
}


const Login = () => {


  const [initialState] = useState<LoginProps>({
    email: "",
    password: "",
  })
  const formFields: FormField[] = [
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
    }
  ];
  const navigate = useNavigate()
  const handleSubmit = async (values: LoginProps) => {
    try {
      const { email, password } = values;
      const payload = {

        email,
        password,
      };

      const res = await axiosInstance.post('/auth/signin', payload);

      if (res?.data?.success === 200) {
        const accessToken = res?.data?.data?.accesToken;
        sessionStorage.setItem('accessToken', accessToken);
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
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-green-300 via-blue-300 to-indigo-300">
      <motion.div
        className="w-full max-w-md p-8 bg-white rounded-lg shadow-lg"
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Log In</h2>
        <Formik
          initialValues={initialState}
          validationSchema={validationSchemas?.validationSchemaLoginForm}
          enableReinitialize
          onSubmit={(values) => {
            handleSubmit(values);
          }
          }>
          {({ isSubmitting, isValid, dirty }) => (
            <Form className="space-y-6">
              {formFields.map((field) =>
              (
                <div key={field.id}>
                  <label className="block text-sm font-medium text-gray-600">{field?.label}</label>
                  <Field
                    id={field?.id}
                    name={field?.name}
                    type={field?.type}
                    placeholder={field?.placeholder}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring focus:ring-green-200 focus:border-green-400"
                  />
                  <ErrorMessage name={field?.name} component="div" className="text-red-500" />
                </div>
              ))}




              {/* Login Button */}
              <button type="submit" disabled={!(isValid && dirty) || isSubmitting}
                className={`px-4 py-2 rounded-md text-white 
                  ${!(isValid && dirty) || isSubmitting ? 'w-full py-3 text-white rounded-md shadow-md bg-gray-400 cursor-not-allowed' : "w-full py-3 text-white bg-green-500 rounded-md hover:bg-green-600 shadow-md"}`}>
                Log In
              </button>
            </Form>
          )}
        </Formik>
        <p className="text-sm text-center text-gray-600 mt-6">
          Don’t have an account?{" "}
          <Link to='/sign-up' className="text-green-500 hover:underline">
            Sign Up
          </Link>
        </p>
      </motion.div>
    </div>
  );
};

export default Login;
