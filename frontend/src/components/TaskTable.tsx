import { useEffect, useState } from "react";
import axios from '../services/api/AxiosInterceptor';
import formatDateToDDMMYYYY from "../utils/helper";
import { AxiosError } from "axios";
type Task = {
    title: string;
    priority: string;
    status: string;
    due_date: string;
};

const TaskTable = () => {
    const [getTask, setTask] = useState<Task[]>([]);


    const fetchTask = async () => {
        try {

            const response = await axios.get('/task/get-all-task')
            if (response?.data?.status === 200) {
                setTask(response?.data?.tasks)

            }

        } catch (err) {
            const error = err as AxiosError;


            const { message } = error?.response?.data as { success: boolean; message: string };

            console.error('Unexpected error:', message);

        }
    };
    useEffect(() => { fetchTask() }, [])

    return (
        <div className="mb-8">
            <h2 className="text-xl font-semibold text-gray-700 mb-4">Tasks ✅</h2>
            <div className="overflow-x-auto shadow-lg rounded-lg">
                <table className="min-w-full border-collapse border border-gray-200">
                    <thead className="bg-gray-100">
                        <tr>
                            <th className="border border-gray-200 px-4 py-2 text-left font-medium text-gray-700">Task</th>
                            <th className="border border-gray-200 px-4 py-2 text-left font-medium text-gray-700">Priority</th>
                            <th className="border border-gray-200 px-4 py-2 text-left font-medium text-gray-700">Status</th>
                            <th className="border border-gray-200 px-4 py-2 text-left font-medium text-gray-700">Due Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        {Array.isArray(getTask) && getTask.length > 0 ? (
                            getTask.map((task, index) => (
                                <tr key={index} className="bg-white">
                                    <td className="border border-gray-200 px-4 py-2 text-gray-800">{task.title}</td>
                                    <td className="border border-gray-200 px-4 py-2 text-gray-800">{task.priority}</td>
                                    <td className="border border-gray-200 px-4 py-2 text-green-600">Completed ✅</td>
                                    <td className="border border-gray-200 px-4 py-2 text-gray-800">{formatDateToDDMMYYYY(task.due_date)}</td>
                                </tr>
                            ))
                        ) : (
                            <tr><td colSpan={4}>No tasks available</td></tr>
                        )}


                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default TaskTable;