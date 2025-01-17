import TakeNotes from "./pages/TakeNotes";
import AddTask from "./pages/AddTask";
import Home from "./pages/Home";
import AskAITab from "./pages/AskToAi";
import SignIn from "./pages/SignIn";
import Login from "./pages/LogIn";
import BuyMeACoffee from "./pages/BuyMeACoffee";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PrivateRoute from "./components/layouts/Lauyout";
import LoggedOutHome from "./components/layouts/LoggedOut";
const App = () => {
  return (

    <Router basename="/">
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<LoggedOutHome />} />
        <Route path="/log-in" element={<Login />} />
        <Route path="/sign-up" element={<SignIn />} />

        {/* Private Routes */}
        <Route element={<PrivateRoute />}>
          <Route path="/home" element={<Home />} />
        <Route path="/add-task" element={<AddTask />} />
        <Route path="/take-notes" element={<TakeNotes />} />
          <Route path="/ask-ai" element={<AskAITab />} />
        <Route path="/buy-me-coffee" element={<BuyMeACoffee />} />
        </Route>
      </Routes>
    </Router>


  )
}
export default App;