const ActivityTable = () => {
    return (
      <div className="overflow-x-auto">
        <table className="min-w-full border-collapse border border-gray-200 shadow-lg">
          <thead className="bg-gray-100">
            <tr>
              <th className="border border-gray-200 px-4 py-2 text-left font-medium text-gray-700">Task</th>
              <th className="border border-gray-200 px-4 py-2 text-left font-medium text-gray-700">Date</th>
              <th className="border border-gray-200 px-4 py-2 text-left font-medium text-gray-700">Action</th>
              <th className="border border-gray-200 px-4 py-2 text-left font-medium text-gray-700">Status</th>
            </tr>
          </thead>
          <tbody>
            <tr className="bg-white">
              <td className="border border-gray-200 px-4 py-2 text-amber-600">Complete UI Design</td>
              <td className="border border-gray-200 px-4 py-2 text-gray-600">2025-01-01</td>
              <td className="border border-gray-200 px-4 py-2">
                <button className="px-3 py-1 text-sm font-medium text-white bg-blue-500 rounded hover:bg-blue-600">
                  Edit
                </button>
              </td>
              <td className="border border-gray-200 px-4 py-2">
                <span className="px-2 py-1 text-xs font-semibold text-green-700 bg-green-100 rounded">
                  Completed
                </span>
              </td>
            </tr>
            <tr className="bg-gray-50">
              <td className="border border-gray-200 px-4 py-2 text-amber-600">Update Documentation</td>
              <td className="border border-gray-200 px-4 py-2 text-gray-600">2025-01-03</td>
              <td className="border border-gray-200 px-4 py-2">
                <button className="px-3 py-1 text-sm font-medium text-white bg-blue-500 rounded hover:bg-blue-600">
                  Edit
                </button>
              </td>
              <td className="border border-gray-200 px-4 py-2">
                <span className="px-2 py-1 text-xs font-semibold text-yellow-700 bg-yellow-100 rounded">
                  In Progress
                </span>
              </td>
            </tr>
            <tr className="bg-white">
              <td className="border border-gray-200 px-4 py-2 text-amber-600">Fix Bugs</td>
              <td className="border border-gray-200 px-4 py-2 text-gray-600">2025-01-05</td>
              <td className="border border-gray-200 px-4 py-2">
                <button className="px-3 py-1 text-sm font-medium text-white bg-blue-500 rounded hover:bg-blue-600">
                  Edit
                </button>
              </td>
              <td className="border border-gray-200 px-4 py-2">
                <span className="px-2 py-1 text-xs font-semibold text-red-700 bg-red-100 rounded">
                  Pending
                </span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  };
  
  export default ActivityTable;
  