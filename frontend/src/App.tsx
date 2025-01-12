 import TakeNotes from "./pages/TakeNotes";
import Navbar from "./components/layouts/Navigation/NavBar";
import AddTask from "./pages/AddTask";
import Home from "./pages/Home";
import AskAITab from "./pages/AskToAi";
import SignIn from "./pages/SignIn";
import Login from "./pages/LogIn";
import BuyMeACoffee from "./pages/BuyMeACoffee";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
const App = () => {
  return (
   
     <Router basename="/">
      {/* Your app components go here */}
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/add-task" element={<AddTask />} />
        <Route path="/take-notes" element={<TakeNotes />} />
        <Route path="/ask-ai" element={<AskAITab />} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/log-in" element={<Login />} />
        <Route path="/buy-me-coffee" element={<BuyMeACoffee />} />
        <Route path="/" element={<Home />} />
      </Routes>
   </Router> 
       
   
  )
}
export default App;