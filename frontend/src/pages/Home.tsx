import React from "react";
import LoggedOutHome from "../components/layouts/LoggedOut";

const Home = () => {


  return (
   <LoggedOutHome />
 )
  // return (
  //   <div className="container mx-auto px-4 py-6">
  //     <h1 className="text-3xl font-bold text-gray-800 mb-8">Home</h1>

  //     {/* Notes Table */}
  //     <div className="mb-8">
  //       <h2 className="text-xl font-semibold text-gray-700 mb-4">Notes 📝</h2>
  //       <div className="overflow-x-auto shadow-lg rounded-lg">
  //         <table className="min-w-full border-collapse border border-gray-200">
  //           <thead className="bg-gray-100">
  //             <tr>
  //               <th className="border border-gray-200 px-4 py-2 text-left font-medium text-gray-700">Title</th>
  //               <th className="border border-gray-200 px-4 py-2 text-left font-medium text-gray-700">Date</th>
  //               <th className="border border-gray-200 px-4 py-2 text-left font-medium text-gray-700">Action</th>
  //             </tr>
  //           </thead>
  //           <tbody>
  //             <tr className="bg-white">
  //               <td className="border border-gray-200 px-4 py-2 text-gray-800">Meeting Notes</td>
  //               <td className="border border-gray-200 px-4 py-2 text-gray-800">Jan 12, 2025</td>
  //               <td className="border border-gray-200 px-4 py-2">
  //                 <button className="px-3 py-1 text-sm font-medium text-white bg-blue-500 rounded hover:bg-blue-600">
  //                   Edit ✏️
  //                 </button>
  //               </td>
  //             </tr>
  //             <tr className="bg-gray-50">
  //               <td className="border border-gray-200 px-4 py-2 text-gray-800">Project Plan</td>
  //               <td className="border border-gray-200 px-4 py-2 text-gray-800">Jan 10, 2025</td>
  //               <td className="border border-gray-200 px-4 py-2">
  //                 <button className="px-3 py-1 text-sm font-medium text-white bg-blue-500 rounded hover:bg-blue-600">
  //                   Edit ✏️
  //                 </button>
  //               </td>
  //             </tr>
  //           </tbody>
  //         </table>
  //       </div>
  //     </div>

  //     {/* Tasks Table */}
  //     <div className="mb-8">
  //       <h2 className="text-xl font-semibold text-gray-700 mb-4">Tasks ✅</h2>
  //       <div className="overflow-x-auto shadow-lg rounded-lg">
  //         <table className="min-w-full border-collapse border border-gray-200">
  //           <thead className="bg-gray-100">
  //             <tr>
  //               <th className="border border-gray-200 px-4 py-2 text-left font-medium text-gray-700">Task</th>
  //               <th className="border border-gray-200 px-4 py-2 text-left font-medium text-gray-700">Priority</th>
  //               <th className="border border-gray-200 px-4 py-2 text-left font-medium text-gray-700">Status</th>
  //               <th className="border border-gray-200 px-4 py-2 text-left font-medium text-gray-700">Due Date</th>
  //             </tr>
  //           </thead>
  //           <tbody>
  //             <tr className="bg-white">
  //               <td className="border border-gray-200 px-4 py-2 text-gray-800">Complete UI Design</td>
  //               <td className="border border-gray-200 px-4 py-2 text-gray-800">High</td>
  //               <td className="border border-gray-200 px-4 py-2 text-green-600">Completed ✅</td>
  //               <td className="border border-gray-200 px-4 py-2 text-gray-800">Jan 20, 2025</td>
  //             </tr>
  //             <tr className="bg-gray-50">
  //               <td className="border border-gray-200 px-4 py-2 text-gray-800">Fix Bugs</td>
  //               <td className="border border-gray-200 px-4 py-2 text-gray-800">Medium</td>
  //               <td className="border border-gray-200 px-4 py-2 text-yellow-600">In Progress ⚙️</td>
  //               <td className="border border-gray-200 px-4 py-2 text-gray-800">Jan 25, 2025</td>
  //             </tr>
  //           </tbody>
  //         </table>
  //       </div>
  //     </div>

  //     {/* Recent Chat History Table */}
  //     <div className="mb-8">
  //       <h2 className="text-xl font-semibold text-gray-700 mb-4">Recent Chat History 💬</h2>
  //       <div className="overflow-x-auto shadow-lg rounded-lg">
  //         <table className="min-w-full border-collapse border border-gray-200">
  //           <thead className="bg-gray-100">
  //             <tr>
  //               <th className="border border-gray-200 px-4 py-2 text-left font-medium text-gray-700">User</th>
  //               <th className="border border-gray-200 px-4 py-2 text-left font-medium text-gray-700">Message</th>
  //               <th className="border border-gray-200 px-4 py-2 text-left font-medium text-gray-700">Time</th>
  //             </tr>
  //           </thead>
  //           <tbody>
  //             <tr className="bg-white">
  //               <td className="border border-gray-200 px-4 py-2 text-gray-800">John Doe</td>
  //               <td className="border border-gray-200 px-4 py-2 text-gray-800">Hello, how are you?</td>
  //               <td className="border border-gray-200 px-4 py-2 text-gray-800">10:30 AM</td>
  //             </tr>
  //             <tr className="bg-gray-50">
  //               <td className="border border-gray-200 px-4 py-2 text-gray-800">Jane Smith</td>
  //               <td className="border border-gray-200 px-4 py-2 text-gray-800">The project is looking great!</td>
  //               <td className="border border-gray-200 px-4 py-2 text-gray-800">11:00 AM</td>
  //             </tr>
  //           </tbody>
  //         </table>
  //       </div>
  //     </div>
  //   </div>
  // );
};

export default Home;
