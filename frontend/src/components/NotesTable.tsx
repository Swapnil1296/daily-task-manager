
const NotesTable = () => {
    return (
        <div className="mb-8">
            <h2 className="text-xl font-semibold text-gray-700 mb-4">Notes 📝</h2>
            <div className="overflow-x-auto shadow-lg rounded-lg">
                <table className="min-w-full border-collapse border border-gray-200">
                    <thead className="bg-gray-100">
                        <tr>
                            <th className="border border-gray-200 px-4 py-2 text-left font-medium text-gray-700">Title</th>
                            <th className="border border-gray-200 px-4 py-2 text-left font-medium text-gray-700">Date</th>
                            <th className="border border-gray-200 px-4 py-2 text-left font-medium text-gray-700">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr className="bg-white">
                            <td className="border border-gray-200 px-4 py-2 text-gray-800">Meeting Notes</td>
                            <td className="border border-gray-200 px-4 py-2 text-gray-800">Jan 12, 2025</td>
                            <td className="border border-gray-200 px-4 py-2">
                                <button className="px-3 py-1 text-sm font-medium text-white bg-blue-500 rounded hover:bg-blue-600">
                                    Edit ✏️
                                </button>
                            </td>
                        </tr>
                        <tr className="bg-gray-50">
                            <td className="border border-gray-200 px-4 py-2 text-gray-800">Project Plan</td>
                            <td className="border border-gray-200 px-4 py-2 text-gray-800">Jan 10, 2025</td>
                            <td className="border border-gray-200 px-4 py-2">
                                <button className="px-3 py-1 text-sm font-medium text-white bg-blue-500 rounded hover:bg-blue-600">
                                    Edit ✏️
                                </button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    )
};


export default NotesTable
