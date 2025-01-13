import React from 'react';
import { motion } from "framer-motion";
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { validationSchemas } from '../utils/helper';

// Define the type for a single tag
type Tag = string;

// Define the form values interface
interface NoteFormValues {
  title: string;
  content: string;
  tags: Tag[];
  newTag: string;
}



const TakeNotes: React.FC = () => {
  const initialValues: NoteFormValues = {
    title: '',
    content: '',
    tags: [],
    newTag: ''
  };

  const handleSubmit = (values: NoteFormValues, { resetForm }: { resetForm: () => void }) => {
    // Remove the newTag field from final submission
    const { newTag, ...submitData } = values;
    console.log('Submitting note:', submitData);
    // Add your submission logic here
    resetForm();
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchemas.validationSchemaTakeNotes}
      onSubmit={handleSubmit}
    >
      {({ values, setFieldValue }) => (
        <Form>
          <motion.div
            className="max-w-xl mx-auto p-6 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-lg shadow-lg"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-2xl font-bold text-white mb-4">Take a Note</h2>

            <motion.div
              whileHover={{ scale: 1.02 }}
              className="space-y-4 bg-white p-4 rounded-md shadow-md"
            >
              {/* Title */}
              <div>
                <label className="block text-sm font-medium text-gray-700">Title</label>
                <Field
                  type="text"
                  name="title"
                  placeholder="Enter note title"
                  className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-300 focus:border-indigo-400"
                />
                <ErrorMessage name="title" component="div" className="text-red-500 text-sm mt-1" />
              </div>

              {/* Note Content */}
              <div>
                <label className="block text-sm font-medium text-gray-700">Note</label>
                <Field
                  as="textarea"
                  name="content"
                  placeholder="Write your note here..."
                  rows="6"
                  className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-300 focus:border-indigo-400"
                />
                <ErrorMessage name="content" component="div" className="text-red-500 text-sm mt-1" />
              </div>

              {/* Tag Section */}
              <div>
                <label className="block text-sm font-medium text-gray-700">Tags</label>
                <div className="flex items-center flex-wrap gap-2 mt-1">
                  <Field
                    type="text"
                    name="newTag"
                    placeholder="Add a tag"
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-300 focus:border-indigo-400"
                    onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        if (values.newTag.trim()) {
                          setFieldValue('tags', [...values.tags, values.newTag.trim()]);
                          setFieldValue('newTag', '');
                        }
                      }
                    }}
                  />
                  <ErrorMessage name="newTag" component="div" className="text-red-500 text-sm" />

                  {values.tags.map((tag, index) => (
                    <motion.span
                      key={index}
                      className="px-3 py-1 text-sm text-white bg-indigo-500 rounded-full cursor-pointer"
                      whileHover={{ scale: 1.1, backgroundColor: "#4F46E5" }}
                      transition={{ type: "spring", stiffness: 300 }}
                      onClick={() => {
                        setFieldValue(
                          'tags',
                          values.tags.filter((_, i) => i !== index)
                        );
                      }}
                    >
                      {tag}
                    </motion.span>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Save Button */}
            <motion.button
              type="submit"
              whileHover={{ scale: 1.05, backgroundColor: "#4C1D95" }}
              className="w-full mt-6 px-4 py-2 text-white bg-purple-700 rounded-md shadow-lg hover:bg-purple-800 focus:outline-none"
            >
              Save Note
            </motion.button>
          </motion.div>
        </Form>
      )}
    </Formik>
  );
};

export default TakeNotes;