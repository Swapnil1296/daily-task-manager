
const ChatHistory = () => {
    return (
        <div className="mb-8">
            <h2 className="text-xl font-semibold text-gray-700 mb-4">Recent Chat History 💬</h2>
            <div className="overflow-x-auto shadow-lg rounded-lg">
                <table className="min-w-full border-collapse border border-gray-200">
                    <thead className="bg-gray-100">
                        <tr>
                            <th className="border border-gray-200 px-4 py-2 text-left font-medium text-gray-700">User</th>
                            <th className="border border-gray-200 px-4 py-2 text-left font-medium text-gray-700">Message</th>
                            <th className="border border-gray-200 px-4 py-2 text-left font-medium text-gray-700">Time</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr className="bg-white">
                            <td className="border border-gray-200 px-4 py-2 text-gray-800">John Doe</td>
                            <td className="border border-gray-200 px-4 py-2 text-gray-800">Hello, how are you?</td>
                            <td className="border border-gray-200 px-4 py-2 text-gray-800">10:30 AM</td>
                        </tr>
                        <tr className="bg-gray-50">
                            <td className="border border-gray-200 px-4 py-2 text-gray-800">Jane Smith</td>
                            <td className="border border-gray-200 px-4 py-2 text-gray-800">The project is looking great!</td>
                            <td className="border border-gray-200 px-4 py-2 text-gray-800">11:00 AM</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default ChatHistory