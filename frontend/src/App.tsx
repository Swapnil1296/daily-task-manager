 import TakeNotes from "./pages/TakeNotes";
import Navbar from "./components/layouts/Navigation/NavBar";
import AddTask from "./pages/AddTask";
import Home from "./pages/Home";
import AskAITab from "./pages/AskToAi";
import SignIn from "./pages/SignIn";
import Login from "./pages/LogIn";
import BuyMeACoffee from "./pages/BuyMeACoffee";
import { BrowserRouter as Router } from "react-router-dom";
const App = () => {
  return (
   
     <Router basename="/">
      {/* Your app components go here */}
      <Navbar />
   
      <Home />
      {/* <AddTask /> */}
      {/* <TakeNotes /> */}
      {/* <AskAITab /> */}
      {/* <SignIn />
      <Login /> */}
        {/* <BuyMeACoffee /> */}
        </Router> 
       
   
  )
}
export default App;