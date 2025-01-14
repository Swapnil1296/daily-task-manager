import { Formik, Form, Field, FieldArray } from "formik";
import { motion } from "framer-motion";
import { useState } from "react";
import * as Yup from 'yup';
import { validationSchemas } from "../utils/helper";

interface AddTaskProps {
  title: string;
  description: string;
  dueDate: string;
  priority: string;
  tags: string[];
  subtasks: string[];
}

const AddTask = () => {
  const initialValues: AddTaskProps = {
    title: "",
    description: "",
    dueDate: "",
    priority: "Medium",
    tags: [],
    subtasks: [],
  };



  return (
    <motion.div
      className="flex mt-20 justify-center items-center min-h-screen"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      <motion.div
        className="w-2/3 p-8 bg-white rounded-lg shadow-2xl"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", stiffness: 200, damping: 20 }}
      >
        <motion.h2
          className="text-3xl font-bold text-gray-800 mb-6 text-center"
          initial={{ y: -30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          Add New Task
        </motion.h2>

        <Formik
          initialValues={initialValues}
          validationSchema={validationSchemas.validationSchemaAddTask}
          onSubmit={(values, { setSubmitting }) => {
            console.log(values);
            setSubmitting(false);
          }}
        >
          {({ values, errors, touched, isSubmitting }) => (
            <Form className="space-y-6">
              {/* Task Title */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Task Title
                </label>
                <Field
                  name="title"
                  type="text"
                  placeholder="Enter task title"
                  className={`w-full px-4 py-3 border rounded-md focus:ring focus:ring-blue-300 focus:border-blue-500 bg-gray-100 shadow-sm text-zinc-900
                    ${touched.title && errors.title ? 'border-red-500' : 'border-gray-300'}`}
                />
                {touched.title && errors.title && (
                  <div className="text-red-500 text-sm mt-1">{errors.title}</div>
                )}
              </div>

              {/* Task Description */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Description
                </label>
                <Field
                  as="textarea"
                  name="description"
                  rows="4"
                  placeholder="Enter task description"
                  className={`w-full px-4 py-3 border rounded-md focus:ring focus:ring-blue-300 focus:border-blue-500 bg-gray-100 shadow-sm text-zinc-700
                    ${touched.description && errors.description ? 'border-red-500' : 'border-gray-300'}`}
                />
                {touched.description && errors.description && (
                  <div className="text-red-500 text-sm mt-1">{errors.description}</div>
                )}
              </div>

              {/* Due Date */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Due Date
                </label>
                <Field
                  name="dueDate"
                  type="date"
                  className={`w-full px-4 py-3 border rounded-md focus:ring focus:ring-blue-300 focus:border-blue-500 bg-gray-100 shadow-sm  text-zinc-900
                    ${touched.dueDate && errors.dueDate ? 'border-red-500' : 'border-gray-300'}`}
                />
                {touched.dueDate && errors.dueDate && (
                  <div className="text-red-500 text-sm mt-1">{errors.dueDate}</div>
                )}
              </div>

              {/* Priority */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Priority
                </label>
                <Field
                  as="select"
                  name="priority"
                  className="w-full px-4 py-3 bg-gray-100 border border-gray-300 rounded-md focus:ring focus:ring-blue-300 focus:border-blue-500 shadow-sm text-zinc-800"
                >
                  <option value="High">High</option>
                  <option value="Medium">Medium</option>
                  <option value="Low">Low</option>
                </Field>
              </div>

              {/* Tags */}
              <FieldArray name="tags">
                {({ push, remove }) => (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Tags
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {values.tags.map((tag, index) => (
                        <motion.div
                          key={index}
                          className="flex items-center gap-2"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                        >
                          <span className="px-3 py-1 bg-blue-100 text-blue-600 rounded-full text-sm">
                            {tag}
                          </span>
                          <button
                            type="button"
                            onClick={() => remove(index)}
                            className="text-red-500 hover:text-red-700"
                          >
                            ×
                          </button>
                        </motion.div>
                      ))}
                    </div>
                    <div className="flex items-center gap-3 mt-2">
                      <Field
                        name="newTag"
                        type="text"
                        placeholder="Add a tag"
                        className="flex-1 px-4 py-3 bg-gray-100 border border-gray-300 rounded-md focus:ring focus:ring-blue-300 focus:border-blue-500 shadow-sm text-zinc-900"
                      />
                      <button
                        type="button"
                        onClick={() => {
                          const newTag = values.newTag;
                          if (newTag && !values.tags.includes(newTag)) {
                            push(newTag);
                            // Reset the newTag field
                            values.newTag = '';
                          }
                        }}
                        className="px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600"
                      >
                        Add Tag
                      </button>
                    </div>
                  </div>
                )}
              </FieldArray>

              {/* Subtasks */}
              <FieldArray name="subtasks">
                {({ push, remove }) => (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Subtasks
                    </label>
                    <div className="space-y-2">
                      {values.subtasks.map((subtask, index) => (
                        <motion.div
                          key={index}
                          className="flex items-center gap-3"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                        >
                          <Field
                            name={`subtasks.${index}`}
                            type="text"
                            className="flex-1 px-4 py-3 bg-gray-100 border border-gray-300 rounded-md focus:ring focus:ring-blue-300 focus:border-blue-500 shadow-sm text-zinc-900"
                          />
                          <motion.button
                            type="button"
                            onClick={() => remove(index)}
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            className="px-4 py-2 text-sm font-medium text-white bg-red-500 rounded-md shadow hover:bg-red-600"
                          >
                            Remove
                          </motion.button>
                        </motion.div>
                      ))}
                    </div>
                    <motion.button
                      type="button"
                      onClick={() => push("")}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      className="mt-3 px-4 py-2 text-sm font-medium text-white bg-green-500 rounded-md shadow hover:bg-green-600"
                    >
                      Add Subtask
                    </motion.button>
                  </div>
                )}
              </FieldArray>

              {/* Submit Button */}
              <motion.div
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 200, damping: 10 }}
              >
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full px-4 py-3 text-white bg-blue-500 rounded-md shadow-lg hover:bg-blue-600 disabled:bg-gray-400 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? 'Adding Task...' : 'Add Task'}
                </button>
              </motion.div>
            </Form>
          )}
        </Formik>
      </motion.div>
    </motion.div>
  );
};

export default AddTask;