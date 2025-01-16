
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import Navbar from './global/components/Navbar'
import Home from './pages/home/Home'
import EventDetails from './pages/eventDetails/EventDetails'
import Register from './pages/auth/Register'
import Login from './pages/auth/Login'
import ForgotPassword from './pages/auth/ForgetPassword'
import ResetPassword from './pages/auth/ResetPassword'
import TeacherDashboard from './pages/TeacherDashboard'



function App() {
 

  return (
    <>
  
    <BrowserRouter>
    <Navbar />
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/event/:id" element={<EventDetails />} />
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route path="/forget-password" element={<ForgotPassword />} />
      <Route path="/reset-password" element={<ResetPassword />} />
      <Route path="/teacher-dashboard" element={<TeacherDashboard />} />

    </Routes>
      
    
    
    </BrowserRouter>
    
    </>


      
    
  )
}

export default App