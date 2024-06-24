import "bootstrap/dist/css/bootstrap.min.css"
import { Route, Routes } from "react-router-dom"
import LoginScreen from "./pages/common/login"
import RegisterScreen from "./pages/common/register"
import ViewUserList from "./pages/admin/viewUsers"
import Home from "./pages/common/home"
import Courses from "./pages/common/courses"
import PurchasePage from "./pages/common/purchase"
import Dashboard from "./pages/common/dashboard"
import TakeQuiz from "./pages/admin/takeQuiz"
import CustomerChat from "./pages/common/customerChat"
import AdminDashboard from "./pages/admin/adminDashboard"
import InstructorChat from "./pages/common/InstructorChat"
import ViewChats from "./pages/common/viewchats"


function App() {
 
  return (
    <>
     <Routes>
    
     <Route path="/" element={<Home/>}/>
     <Route path="/purchase" element={<PurchasePage/>}/>
     <Route path="/course" element={<Courses/>}/>
      <Route path="/login" element={<LoginScreen/>}/>
      <Route path="/register" element={<RegisterScreen/>}/>
      <Route path="/dashboard" element={<Dashboard/>}/>
      <Route path="/viewUser" element={<ViewUserList/>}/>"
      <Route path="/takeQuiz" element={<TakeQuiz/>}/>"
      <Route path="/customerChat" element={<CustomerChat/>}/>"
      <Route path="/instructor" element={<AdminDashboard/>}/>"
      <Route path="/instructorChat" element={<InstructorChat/>}/>"
      <Route path="/viewChats" element={<ViewChats/>}/>"
     </Routes>
    </>
  )
}

export default App
