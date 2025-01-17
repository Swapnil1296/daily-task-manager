import TaskTable from "../components/TaskTable";
import NotesTable from '../components/NotesTable.js'
import ChatHistory from "../components/ChatHistory.js";
const Home = () => {



  return (
    <div className="container mx-auto px-4 py-6">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">Home</h1>

      {/* Notes Table */}
      <NotesTable />

      {/* Tasks Table */}
      <TaskTable />

      {/* Recent Chat History Table */}
      <ChatHistory />
    </div>
  );
};

export default Home;
